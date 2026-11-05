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
const CURRENT_ISSUE_PATH = '/issue/current';

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

type IssueSummary = {
  id: number;
  title: string;
  volume?: number;
  number?: string;
  year?: number;
  description?: string;
  coverImageUrl?: string;
};

function parseIssuePage(html: string, fallback: IssueSummary) {
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
      ...fallback,
      title: headingMatch ? decodeHtml(headingMatch[1]) : fallback.title,
      datePublished: publishedMatch?.[1],
      description: description || fallback.description,
      coverImageUrl: coverMatch?.[1] || fallback.coverImageUrl,
    },
    articles,
  };
}

function parseIssueArchive(html: string): IssueSummary[] {
  const issueBlocks = html.match(/<div[^>]*class="[^"]*issue-summary[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi) ?? [];

  return issueBlocks.flatMap((block) => {
    const linkMatch = block.match(/href="[^"]*\/issue\/view\/(\d+)"/i);
    const titleMatch = block.match(/<a[^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
    const seriesMatch = block.match(/<div[^>]*class="[^"]*series[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const descriptionMatch = block.match(/<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const coverMatch = block.match(/<img[^>]*src="([^"]+)"/i);
    if (!linkMatch || !titleMatch) return [];

    const series = seriesMatch ? decodeHtml(seriesMatch[1]) : '';
    const volumeMatch = series.match(/Vol\.\s*(\d+)/i);
    const numberMatch = series.match(/No\.\s*([^\s(]+)/i);
    const yearMatch = series.match(/\((\d{4})\)/);

    return [{
      id: Number(linkMatch[1]),
      title: decodeHtml(titleMatch[1]),
      volume: volumeMatch ? Number(volumeMatch[1]) : undefined,
      number: numberMatch?.[1],
      year: yearMatch ? Number(yearMatch[1]) : undefined,
      description: descriptionMatch ? decodeHtml(descriptionMatch[1]) : undefined,
      coverImageUrl: coverMatch?.[1],
    }];
  });
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
      // OJS /issue/current always renders the latest published issue.
      const idMatch = html.match(/\/issue\/view\/(\d+)/i);
      const headMatch = html.match(/Vol\.\s*(\d+)\s*No\.\s*([^\s(<]+)\s*\((\d{4})\)/i);
      let parsed = parseIssuePage(html, {
        id: idMatch ? Number(idMatch[1]) : 0,
        title: 'Current Issue',
        volume: headMatch ? Number(headMatch[1]) : undefined,
        number: headMatch?.[2],
        year: headMatch ? Number(headMatch[3]) : undefined,
      });
      if (!parsed.hasContent) {
        // Fallback: newest issue listed in the OJS archive.
        const archiveRes = await fetch(`${OJS_BASE_URL}/issue/archive`, { cache: 'no-store', headers: { 'Accept': 'text/html' } });
        if (archiveRes.ok) {
          const latest = parseIssueArchive(await archiveRes.text()).sort((a, b) => b.id - a.id)[0];
          if (latest) {
            const r = await fetch(`${OJS_BASE_URL}/issue/view/${latest.id}`, { cache: 'no-store', headers: { 'Accept': 'text/html' } });
            if (r.ok) parsed = parseIssuePage(await r.text(), latest);
          }
        }
      }
      result = parsed;
    } else {
      const issueSummaries = parseIssueArchive(html);
      const issueResults = await Promise.all(issueSummaries.map(async (issue) => {
        const issueResponse = await fetch(`${OJS_BASE_URL}/issue/view/${issue.id}`, {
          cache: 'no-store',
          headers: { 'Accept': 'text/html' },
        });
        if (!issueResponse.ok) return { issue, articles: [] };
        const issueHtml = await issueResponse.text();
        const parsed = parseIssuePage(issueHtml, issue);
        return { issue: parsed.issue, articles: parsed.articles };
      }));
      result = {
        hasContent: issueResults.some((item) => item.articles.length > 0),
        syncedAt: new Date().toISOString(),
        issues: issueResults,
      };
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
