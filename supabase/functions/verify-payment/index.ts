import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    );

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { reference } = await req.json();

    if (!reference) {
      return new Response(
        JSON.stringify({ error: 'Missing payment reference' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Verifying payment with reference:', reference);

    // Verify transaction with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error('Paystack verification error:', paystackData);
      return new Response(
        JSON.stringify({ 
          error: 'Payment verification failed. Please contact support if the issue persists.',
          code: 'PAYMENT_VERIFICATION_FAILED'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const transaction = paystackData.data;

    // Update payment record
    const { error: updateError } = await supabaseClient
      .from('payments')
      .update({
        status: transaction.status === 'success' ? 'completed' : 'failed',
        payment_date: transaction.paid_at ? new Date(transaction.paid_at).toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('paystack_reference', reference);

    if (updateError) {
      console.error('Error updating payment:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update payment record' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If payment successful, update manuscript status
    if (transaction.status === 'success') {
      const { data: payment, error: paymentError } = await supabaseClient
        .from('payments')
        .select('manuscript_id, user_id')
        .eq('paystack_reference', reference)
        .single();

      if (paymentError || !payment) {
        console.error('Payment not found:', paymentError);
        return new Response(
          JSON.stringify({ 
            error: 'Payment record not found. Please contact support.',
            code: 'PAYMENT_NOT_FOUND'
          }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify the payment belongs to the authenticated user
      if (payment.user_id !== user.id) {
        console.error('Payment ownership mismatch:', {
          payment_user_id: payment.user_id,
          authenticated_user_id: user.id
        });
        return new Response(
          JSON.stringify({ 
            error: 'You do not have permission to access this payment.',
            code: 'PAYMENT_UNAUTHORIZED'
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update manuscript status (only if still in draft)
      const { error: manuscriptError } = await supabaseClient
        .from('manuscripts')
        .update({
          status: 'submitted',
          submission_date: new Date().toISOString(),
        })
        .eq('id', payment.manuscript_id)
        .eq('status', 'draft');

      if (manuscriptError) {
        console.error('Error updating manuscript:', manuscriptError);
      } else {
        console.log('Payment verified and manuscript submitted:', {
          reference,
          manuscript_id: payment.manuscript_id,
          user_id: user.id
        });
      }
    }

    return new Response(
      JSON.stringify({
        status: transaction.status,
        amount: transaction.amount / 100,
        currency: transaction.currency,
        paid_at: transaction.paid_at,
        message: transaction.status === 'success' ? 'Payment verified successfully' : 'Payment failed',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
