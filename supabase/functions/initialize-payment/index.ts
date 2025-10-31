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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { manuscriptId, amount, currency = 'NGN' } = await req.json();

    // Validate required fields
    if (!manuscriptId || !amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: manuscriptId, amount' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount: must be a positive number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Define expected processing fee (adjust this based on your journal's policy)
    const EXPECTED_FEE_NGN = 50000; // 50,000 NGN as per typical processing fee
    const EXPECTED_FEE_USD = 100; // $100 USD equivalent
    const TOLERANCE = 0.01; // Allow 1% tolerance for currency conversion variations

    // Validate amount is within expected range
    let isValidAmount = false;
    if (currency === 'NGN') {
      isValidAmount = Math.abs(numericAmount - EXPECTED_FEE_NGN) / EXPECTED_FEE_NGN <= TOLERANCE;
    } else if (currency === 'USD') {
      isValidAmount = Math.abs(numericAmount - EXPECTED_FEE_USD) / EXPECTED_FEE_USD <= TOLERANCE;
    }

    if (!isValidAmount) {
      console.warn(`Invalid payment amount attempted: ${numericAmount} ${currency} by user ${user.id}`);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid payment amount for manuscript processing fee',
          expected: currency === 'NGN' ? EXPECTED_FEE_NGN : EXPECTED_FEE_USD,
          currency
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate currency
    const ALLOWED_CURRENCIES = ['NGN', 'USD', 'GHS', 'ZAR', 'KES'];
    if (!ALLOWED_CURRENCIES.includes(currency)) {
      return new Response(
        JSON.stringify({ 
          error: `Invalid currency. Allowed currencies: ${ALLOWED_CURRENCIES.join(', ')}` 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user profile for email
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('email, full_name')
      .eq('id', user.id)
      .single();

    if (!profile?.email) {
      console.error('User profile not found');
      return new Response(
        JSON.stringify({ error: 'User profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        manuscript_id: manuscriptId,
        amount,
        currency,
        status: 'pending',
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment record' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: profile.email,
        amount: amount * 100, // Paystack expects amount in kobo/cents
        currency,
        reference: payment.id,
        callback_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/verify-payment`,
        metadata: {
          manuscript_id: manuscriptId,
          user_id: user.id,
          user_name: profile.full_name,
        },
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error('Paystack initialization error:', paystackData);
      return new Response(
        JSON.stringify({ error: paystackData.message || 'Failed to initialize payment' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update payment with Paystack reference and access code
    await supabaseClient
      .from('payments')
      .update({
        paystack_reference: paystackData.data.reference,
        paystack_access_code: paystackData.data.access_code,
      })
      .eq('id', payment.id);

    console.log('Payment initialized successfully:', {
      payment_id: payment.id,
      reference: paystackData.data.reference,
    });

    return new Response(
      JSON.stringify({
        authorization_url: paystackData.data.authorization_url,
        access_code: paystackData.data.access_code,
        reference: paystackData.data.reference,
        payment_id: payment.id,
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
