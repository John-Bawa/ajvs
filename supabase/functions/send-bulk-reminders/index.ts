import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to prevent XSS attacks
function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface BulkReminderRequest {
  reviewIds: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT and get user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Use anon key with JWT for auth check
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Check if user has admin/editor/secretary role
    const { data: hasRole, error: roleError } = await supabaseAuth.rpc(
      "has_any_role",
      { 
        _user_id: user.id, 
        _roles: ['super_admin', 'editor', 'secretary']
      }
    );

    if (roleError || !hasRole) {
      return new Response(
        JSON.stringify({ error: "Insufficient permissions. Admin, editor, or secretary role required." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403,
        }
      );
    }

    const { reviewIds }: BulkReminderRequest = await req.json();

    // Use service role key for data fetching
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
                <p>Dear ${escapeHtml(reviewer.full_name)},</p>
                
                <p>This is a friendly reminder that your review for the following manuscript is pending:</p>
                
                <p><strong>${escapeHtml(manuscript?.title || '')}</strong></p>
                
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