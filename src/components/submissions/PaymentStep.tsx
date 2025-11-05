import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CreditCard, CheckCircle, AlertCircle, Building2, Upload } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PaymentStepProps {
  manuscriptId: string;
  amount?: number;
  currency?: string;
  onPaymentComplete: () => void;
}

export function PaymentStep({ manuscriptId, amount = 30000, currency = "NGN", onPaymentComplete }: PaymentStepProps) {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "completed" | "failed">("pending");
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "bank_transfer">("paystack");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const initializePayment = async () => {
    setLoading(true);
    setPaymentStatus("processing");

    try {
      const { data, error } = await supabase.functions.invoke("initialize-payment", {
        body: {
          manuscriptId,
          amount,
          currency,
        },
      });

      if (error) throw error;

      if (data.authorization_url) {
        // Open Paystack payment page
        const paymentWindow = window.open(data.authorization_url, "Paystack Payment", "width=600,height=700");

        // Poll for payment completion
        const pollInterval = setInterval(async () => {
          if (paymentWindow?.closed) {
            clearInterval(pollInterval);
            await verifyPayment(data.reference);
          }
        }, 1000);
      }
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      toast.error(error.message || "Failed to initialize payment");
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("verify-payment", {
        body: { reference },
      });

      if (error) throw error;

      if (data.status === "success") {
        setPaymentStatus("completed");
        toast.success("Payment successful! Your manuscript has been submitted.");
        setTimeout(() => {
          onPaymentComplete();
        }, 2000);
      } else {
        setPaymentStatus("failed");
        toast.error("Payment was not completed. Please try again.");
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
      toast.error("Failed to verify payment");
      setPaymentStatus("failed");
    }
  };

  const handleBankTransfer = async () => {
    if (!receiptFile) {
      toast.error("Please upload your payment receipt");
      return;
    }

    // 1. File size validation (5MB max)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (receiptFile.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // 2. File type validation (check MIME type, not extension)
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!ALLOWED_TYPES.includes(receiptFile.type)) {
      toast.error("Only JPEG, PNG, and PDF files are allowed");
      return;
    }

    // 3. Amount validation against expected fees
    const EXPECTED_FEE_NGN = 50000;
    const EXPECTED_FEE_USD = 100;
    const expectedAmount = currency === 'NGN' ? EXPECTED_FEE_NGN : EXPECTED_FEE_USD;
    
    if (Math.abs(amount - expectedAmount) > 1) {
      toast.error(`Invalid amount. Expected ${currency} ${expectedAmount.toLocaleString()}`);
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // 4. Sanitize filename (remove special characters)
      const fileExt = receiptFile.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'pdf';
      const fileName = `${user.id}/${manuscriptId}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('payment-receipts')
        .upload(fileName, receiptFile);

      if (uploadError) throw uploadError;

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          manuscript_id: manuscriptId,
          user_id: user.id,
          amount,
          currency,
          payment_method: 'bank_transfer',
          receipt_path: fileName,
          status: 'pending'
        });

      if (paymentError) throw paymentError;

      setPaymentStatus("completed");
      toast.success("Payment receipt submitted! Your manuscript is under review.");
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    } catch (error: any) {
      console.error("Bank transfer error:", error);
      toast.error(error.message || "Failed to submit payment receipt");
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Article Processing Charge (APC)
        </CardTitle>
        <CardDescription>Complete payment to submit your manuscript for review</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-secondary/20 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Processing Fee:</span>
            <span className="text-2xl font-bold text-primary">
              {currency} {amount.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            This fee covers the peer review process, editing, and publication of your article.
          </p>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Select Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/10 transition-colors">
              <RadioGroupItem value="paystack" id="paystack" />
              <Label htmlFor="paystack" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="w-4 h-4" />
                <div>
                  <div className="font-medium">Paystack Payment</div>
                  <div className="text-sm text-muted-foreground">Pay securely with card or bank transfer</div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/10 transition-colors">
              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
              <Label htmlFor="bank_transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                <Building2 className="w-4 h-4" />
                <div>
                  <div className="font-medium">Direct Bank Transfer</div>
                  <div className="text-sm text-muted-foreground">Transfer to our account and upload receipt</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {paymentMethod === "bank_transfer" && (
          <div className="space-y-4 p-4 border rounded-lg bg-secondary/5">
            <div className="space-y-2">
              <h4 className="font-medium">Bank Account Details</h4>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p><span className="font-medium text-foreground">Bank Name:</span> First Bank of Nigeria</p>
                <p><span className="font-medium text-foreground">Account Name:</span> Journal Publishing Services</p>
                <p><span className="font-medium text-foreground">Account Number:</span> 1234567890</p>
                <p><span className="font-medium text-foreground">Amount:</span> {currency} {amount.toLocaleString()}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="receipt">Upload Payment Receipt</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="receipt"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  disabled={loading || paymentStatus === "completed"}
                />
                {receiptFile && (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Upload a clear image or PDF of your payment receipt
              </p>
            </div>
          </div>
        )}

        {paymentStatus === "completed" && (
          <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-800 dark:text-green-200">Payment completed successfully!</span>
          </div>
        )}

        {paymentStatus === "failed" && (
          <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-800 dark:text-red-200">Payment failed. Please try again.</span>
          </div>
        )}

        <Button
          onClick={paymentMethod === "paystack" ? initializePayment : handleBankTransfer}
          disabled={loading || paymentStatus === "completed" || (paymentMethod === "bank_transfer" && !receiptFile)}
          className="w-full"
          size="lg"
        >
          {loading || uploading ? (
            <>Processing...</>
          ) : paymentStatus === "completed" ? (
            <>Payment Submitted</>
          ) : paymentMethod === "paystack" ? (
            <>Proceed to Paystack</>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Submit Payment Receipt
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          {paymentMethod === "paystack" 
            ? "Secured by Paystack. Your payment information is encrypted and secure."
            : "Your receipt will be verified by our team within 24-48 hours."}
        </p>
      </CardContent>
    </Card>
  );
}
