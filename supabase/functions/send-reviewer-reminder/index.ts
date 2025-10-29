import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReminderRequest {
  reviewId: string;
  reviewerEmail: string;
  manuscriptTitle: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reviewId, reviewerEmail, manuscriptTitle }: ReminderRequest = await req.json();

    console.log(`Sending reminder for review ${reviewId} to ${reviewerEmail}`);
    
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
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
              <p>Dear Reviewer,</p>
              
              <p>This is a friendly reminder that your review for the following manuscript is pending:</p>
              
              <p><strong>${manuscriptTitle}</strong></p>
              
              <p>Please log in to your dashboard to complete the review at your earliest convenience.</p>
              
              <a href="${Deno.env.get("VITE_SUPABASE_URL")}/reviewer-dashboard" class="button">Complete Review</a>
              
              <p>If you need an extension or have any questions, please contact the editorial office.</p>
              
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

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AJVS Editorial <editorial@ajvs.org>",
        to: [reviewerEmail],
        subject: `Reminder: Review Pending for "${manuscriptTitle}"`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    console.log("Reminder sent successfully:", data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Reminder sent successfully" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error sending reminder:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});