-- Fix payment receipt storage policies and add validation

-- Drop overlapping storage policies
DROP POLICY IF EXISTS "Users can view own payment receipts" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view all payment receipts" ON storage.objects;

-- Create consolidated SELECT policy
CREATE POLICY "Payment receipts access control"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'payment-receipts' 
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR has_any_role(auth.uid(), ARRAY['super_admin'::app_role, 'secretary'::app_role])
  )
);

-- Add UPDATE policy for user's own receipts
CREATE POLICY "Users can update own payment receipts"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'payment-receipts' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add validation function to ensure receipt_path matches user_id
CREATE OR REPLACE FUNCTION public.validate_receipt_path()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If receipt_path is provided, validate it starts with user_id
  IF NEW.receipt_path IS NOT NULL THEN
    IF NOT (NEW.receipt_path LIKE NEW.user_id::text || '/%') THEN
      RAISE EXCEPTION 'Invalid receipt path: must be within user folder';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Add trigger to validate receipt_path on payments table
DROP TRIGGER IF EXISTS validate_receipt_path_trigger ON public.payments;
CREATE TRIGGER validate_receipt_path_trigger
BEFORE INSERT OR UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.validate_receipt_path();