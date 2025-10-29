import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BulkReminderRequest {
  reviewIds: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reviewIds }: BulkReminderRequest = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch review details
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select(`
        id,
        manuscript_id,
        reviewer_id
      `)
      .in("id", reviewIds);

    if (error) throw error;

    console.log(`Sending bulk reminders to ${reviews?.length || 0} reviewers`);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    // Send emails to all reviewers using Resend
    const emailPromises = [];
    
    for (const review of reviews || []) {
      const { data: manuscript } = await supabase
        .from("manuscripts")
        .select("title")
        .eq("id", review.manuscript_id)
        .single();
      
      const { data: reviewer } = await supabase
        .from("profiles")
        .select("email, full_name")
        .eq("id", review.reviewer_id)
        .single();

      if (!reviewer?.email) continue;

      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9fafb; }
              .footer { padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
              .button { display: inline-block; padding: 12px 24px; background: #f59e0b; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>⏰ Review Reminder</h2>
              </div>
              <div class="content">
                <p>Dear ${reviewer.full_name},</p>
                
                <p>This is a friendly reminder that your review for the following manuscript is pending:</p>
                
                <p><strong>${manuscript?.title}</strong></p>
                
                <p>Please log in to your dashboard to complete the review at your earliest convenience.</p>
                
                <a href="${Deno.env.get("VITE_SUPABASE_URL")}/reviewer-dashboard" class="button">Complete Review</a>
                
                <p>Best regards,<br>
                <strong>Editorial Team</strong><br>
                African Journal of Veterinary Sciences</p>
              </div>
              <div class="footer">
                <p>This is an automated reminder.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      emailPromises.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "AJVS Editorial <editorial@ajvs.org>",
            to: [reviewer.email],
            subject: `Reminder: Review Pending`,
            html: emailHtml,
          }),
        })
      );
    }
    
    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter(r => r.status === 'fulfilled').length;
    
    console.log(`Sent ${successful} reminder emails`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Reminders sent to ${reviews?.length || 0} reviewer(s)` 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error sending bulk reminders:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});