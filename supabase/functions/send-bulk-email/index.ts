import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BulkEmailRequest {
  subject: string;
  message: string;
  emails: string[];
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
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
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
    const { data: hasRole, error: roleError } = await supabase.rpc(
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

    const { subject, message, emails }: BulkEmailRequest = await req.json();

    // Validate input
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MAX_RECIPIENTS = 100;
    const MAX_SUBJECT_LENGTH = 255;
    const MAX_MESSAGE_LENGTH = 10000;

    // Validate subject
    if (!subject || subject.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Subject is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (subject.length > MAX_SUBJECT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Subject must be less than ${MAX_SUBJECT_LENGTH} characters` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Check for newline injection in subject
    if (subject.includes('\n') || subject.includes('\r')) {
      return new Response(
        JSON.stringify({ error: "Subject cannot contain newline characters" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Validate message
    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Message must be less than ${MAX_MESSAGE_LENGTH} characters` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Validate emails array
    if (!Array.isArray(emails) || emails.length === 0) {
      return new Response(
        JSON.stringify({ error: "At least one email address is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (emails.length > MAX_RECIPIENTS) {
      return new Response(
        JSON.stringify({ error: `Cannot send to more than ${MAX_RECIPIENTS} recipients at once` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Validate each email address
    const invalidEmails = emails.filter(email => !EMAIL_REGEX.test(email));
    if (invalidEmails.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid email addresses found",
          invalid: invalidEmails.slice(0, 5) // Show first 5 invalid emails
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Escape HTML entities in message to prevent XSS
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const sanitizedMessage = escapeHtml(message);
    const sanitizedSubject = escapeHtml(subject);

    console.log(`Sending bulk email to ${emails.length} recipients`);
    console.log(`Subject: ${subject}`);
    
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    // Send emails using Resend API
    const emailPromises = emails.map(email => 
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AJVS <noreply@ajvs.org>",
          to: [email],
          subject: sanitizedSubject,
          html: `
            <!DOCTYPE html>
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
                    <h2>${sanitizedSubject}</h2>
                  </div>
                  <div style="padding: 20px; background: #f9fafb;">
                    ${sanitizedMessage.replace(/\n/g, '<br>')}
                  </div>
                  <div style="padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                    <p>African Journal of Veterinary Sciences</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        }),
      })
    );
    
    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    console.log(`Sent ${successful} emails successfully, ${failed} failed`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Email queued for ${emails.length} recipient(s)` 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error sending bulk email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});