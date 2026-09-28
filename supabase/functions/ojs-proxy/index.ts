import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const responseHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
};

const OJS_BASE_URL = 'https://journal.africanjournalvetsci.org/index.php/ajvs';
const CURRENT_ISSUE_PATH = '/issue/view/1';

function decodeHtml(value: string): string {
  const entities: Record<string, string> = {
    amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '"',
  };

  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_match, entity: string) => {
      if (entity.startsWith('#x') || entity.startsWith('#X')) {
        return String.fromCodePoint(parseInt(entity.slice(2), 16));
      }
      if (entity.startsWith('#')) {
        return String.fromCodePoint(parseInt(entity.slice(1), 10));
      }
      return entities[entity.toLowerCase()] ?? `&${entity};`;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCurrentIssue(html: string) {
  const descriptionMatch = html.match(/<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const description = descriptionMatch ? decodeHtml(descriptionMatch[1]) : '';
  const publishedMatch = html.match(/<p[^>]*class="[^"]*published[^"]*"[^>]*>[\s\S]*?(\d{4}-\d{2}-\d{2})[\s\S]*?<\/p>/i);
  const headingMatch = html.match(/<li[^>]*class="active"[^>]*>[\s\S]*?(Vol\.[\s\S]*?)<\/li>/i);
  const coverMatch = html.match(/<img[^>]*class="[^"]*img-responsive[^"]*"[^>]*src="([^"]*cover_issue_[^"]*)"/i);
  const articleBlocks = html.match(/<div[^>]*class="[^"]*article-summary[^"]*"[^>]*>[\s\S]*?<\/div>\s*<!-- \.article-summary -->/gi) ?? [];

  const articles = articleBlocks.flatMap((block) => {
    const articleMatch = block.match(/<h3[^>]*class="[^"]*media-heading[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]*\/article\/view\/(\d+))"[^>]*>([\s\S]*?)<\/a>/i);
    if (!articleMatch) return [];

    const authorsMatch = block.match(/<div[^>]*class="[^"]*authors[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const pagesMatch = block.match(/<p[^>]*class="[^"]*pages[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const pdfMatch = block.match(/<a[^>]*class="[^"]*galley-link[^"]*pdf[^"]*"[^>]*href="([^"]+)"/i);
    const id = Number(articleMatch[2]);
    const authorText = authorsMatch ? decodeHtml(authorsMatch[1]).replace(/\s*\(Author\)\s*$/i, '') : '';

    return [{
      id,
      title: decodeHtml(articleMatch[3]),
      authors: authorText ? [{ fullName: authorText }] : [],
      datePublished: publishedMatch?.[1],
      pages: pagesMatch ? decodeHtml(pagesMatch[1]) : undefined,
      urlPath: String(id),
      galleys: pdfMatch ? [{ label: 'PDF', file: { url: pdfMatch[1] } }] : [],
    }];
  });

  return {
    hasContent: articles.length > 0,
    syncedAt: new Date().toISOString(),
    issue: {
      id: 1,
      title: headingMatch ? decodeHtml(headingMatch[1]) : 'Vol. 1 No. 1 (2026): Issue 1',
      volume: 1,
      number: '1',
      year: 2026,
      datePublished: publishedMatch?.[1],
      description,
      coverImageUrl: coverMatch?.[1],
    },
    articles,
  };
}

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
        headers: responseHeaders,
      });
    }

    const allowedTypes = ['announcements', 'current-issue', 'issues'];
    if (!allowedTypes.includes(type)) {
      return new Response(JSON.stringify({ error: 'Type not allowed' }), {
        status: 403,
        headers: responseHeaders,
      });
    }

    let ojsUrl: string;
    switch (type) {
      case 'announcements':
        ojsUrl = `${OJS_BASE_URL}/announcement`;
        break;
      case 'current-issue':
        ojsUrl = `${OJS_BASE_URL}${CURRENT_ISSUE_PATH}`;
        break;
      case 'issues':
        ojsUrl = `${OJS_BASE_URL}/issue/archive`;
        break;
      default:
        ojsUrl = OJS_BASE_URL;
    }

    const response = await fetch(ojsUrl, {
      cache: 'no-store',
      headers: { 'Accept': 'text/html' },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'OJS returned an error', status: response.status }), {
        status: response.status,
        headers: responseHeaders,
      });
    }

    const html = await response.text();

    let result: unknown;

    if (type === 'announcements') {
      result = { items: parseAnnouncements(html) };
    } else if (type === 'current-issue') {
      result = parseCurrentIssue(html);
    } else {
      // For issues, return raw indicator
      const hasNoIssues = html.includes('has not published any issues');
      result = { hasContent: !hasNoIssues, html_snippet: hasNoIssues ? null : 'Content available on OJS' };
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Proxy request failed', details: error.message }), {
      status: 502,
      headers: responseHeaders,
    });
  }
});
