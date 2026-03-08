import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const OJS_BASE_URL = 'https://journal.africanjournalvetsci.org/index.php/ajvs';

/**
 * Parse announcements from OJS HTML page
 */
function parseAnnouncements(html: string): Array<{ id: number; title: string; description: string; datePosted: string; url: string }> {
  const announcements: Array<{ id: number; title: string; description: string; datePosted: string; url: string }> = [];

  // Match announcement blocks: link with title, then date, then description
  const linkRegex = /<a[^>]*href="([^"]*\/announcement\/view\/(\d+))"[^>]*>\s*([\s\S]*?)\s*<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const url = match[1];
    const id = parseInt(match[2], 10);
    const title = match[3].replace(/<[^>]*>/g, '').trim();

    // Find the date near this announcement (look for date pattern after the link)
    const afterMatch = html.substring(match.index + match[0].length, match.index + match[0].length + 500);
    const dateMatch = afterMatch.match(/(\d{4}-\d{2}-\d{2})/);
    const datePosted = dateMatch ? dateMatch[1] : '';

    // Find description text
    const descMatch = afterMatch.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : '';

    if (title) {
      announcements.push({ id, title, description, datePosted, url });
    }
  }

  return announcements;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type');

    if (!type) {
      return new Response(JSON.stringify({ error: 'Missing type parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const allowedTypes = ['announcements', 'current-issue', 'issues'];
    if (!allowedTypes.includes(type)) {
      return new Response(JSON.stringify({ error: 'Type not allowed' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let ojsUrl: string;
    switch (type) {
      case 'announcements':
        ojsUrl = `${OJS_BASE_URL}/announcement`;
        break;
      case 'current-issue':
        ojsUrl = `${OJS_BASE_URL}/issue/current`;
        break;
      case 'issues':
        ojsUrl = `${OJS_BASE_URL}/issue/archive`;
        break;
      default:
        ojsUrl = OJS_BASE_URL;
    }

    const response = await fetch(ojsUrl, {
      headers: { 'Accept': 'text/html' },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'OJS returned an error', status: response.status }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const html = await response.text();

    let result: unknown;

    if (type === 'announcements') {
      result = { items: parseAnnouncements(html) };
    } else {
      // For issues, return raw indicator
      const hasNoIssues = html.includes('has not published any issues');
      result = { hasContent: !hasNoIssues, html_snippet: hasNoIssues ? null : 'Content available on OJS' };
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Proxy request failed', details: error.message }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
