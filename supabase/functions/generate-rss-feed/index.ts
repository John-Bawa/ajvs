import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch latest published articles
    const { data: articles, error } = await supabase
      .from("published_articles")
      .select(`
        *,
        manuscripts (
          id,
          title,
          abstract,
          keywords,
          doi,
          manuscript_authors (full_name)
        ),
        issues (volume, number, year)
      `)
      .order("published_date", { ascending: false })
      .limit(50);

    if (error) throw error;

    const rss = generateRssFeed(articles || []);

    return new Response(rss, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml",
      },
    });
  } catch (error: any) {
    console.error("Error generating RSS feed:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

function generateRssFeed(articles: any[]): string {
  const buildDate = new Date().toUTCString();
  
  const items = articles.map(article => {
    const manuscript = article.manuscripts;
    const issue = article.issues;
    const authors = manuscript?.manuscript_authors?.map((a: any) => a.full_name).join(", ") || "";
    
    return `
    <item>
      <title>${escapeXml(manuscript?.title || "")}</title>
      <link>https://ajvs.org/article/${article.id}</link>
      <description>${escapeXml(manuscript?.abstract || "")}</description>
      <author>${escapeXml(authors)}</author>
      <pubDate>${new Date(article.published_date).toUTCString()}</pubDate>
      <guid isPermaLink="true">https://ajvs.org/article/${article.id}</guid>
      ${manuscript?.doi ? `<doi xmlns="http://www.crossref.org/schema/4.4.0">${manuscript.doi}</doi>` : ""}
      ${manuscript?.keywords?.map((k: string) => `<category>${escapeXml(k)}</category>`).join("") || ""}
      <source>
        <title>African Journal of Veterinary Sciences</title>
        <url>https://ajvs.org</url>
      </source>
    </item>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>African Journal of Veterinary Sciences</title>
    <link>https://ajvs.org</link>
    <description>Latest research articles from the African Journal of Veterinary Sciences</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>1440</ttl>
    <atom:link href="https://ajvs.org/feed/rss" rel="self" type="application/rss+xml" />
    <image>
      <url>https://ajvs.org/logo.png</url>
      <title>African Journal of Veterinary Sciences</title>
      <link>https://ajvs.org</link>
    </image>
    ${items}
  </channel>
</rss>`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
