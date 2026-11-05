import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://africanjournalvetsci.org";
const OJS_BASE_URL = "https://journal.africanjournalvetsci.org/index.php/ajvs";
const OAI_BASE_URL = `${SITE_URL}/oai`;

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 100;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

function validateOaiParams(url: URL): { valid: boolean; error?: string } {
  const verb = url.searchParams.get("verb");
  const validVerbs = ["Identify", "ListRecords", "GetRecord", "ListIdentifiers", "ListMetadataFormats"];

  if (!verb) {
    return { valid: false, error: "Missing required parameter: verb" };
  }

  if (!validVerbs.includes(verb)) {
    return { valid: false, error: `Invalid verb: ${verb}` };
  }

  if (verb === "GetRecord") {
    const identifier = url.searchParams.get("identifier");
    if (!identifier) {
      return { valid: false, error: "GetRecord requires identifier parameter" };
    }
    // OJS article IDs are numeric
    if (!identifier.match(/^oai:ajvs\.org:article\/\d+$/)) {
      return { valid: false, error: "Invalid identifier format" };
    }
  }

  const metadataPrefix = url.searchParams.get("metadataPrefix");
  if (metadataPrefix && metadataPrefix !== "oai_dc") {
    return { valid: false, error: "Only oai_dc metadata format is supported" };
  }

  return { valid: true };
}

type FeedArticle = {
  id: number;
  title: string;
  abstract?: string;
  authors?: { fullName: string }[];
  datePublished?: string;
  pages?: string;
};

type FeedIssue = {
  issue: { id: number; title?: string; volume?: number; number?: string; year?: number; datePublished?: string };
  articles: FeedArticle[];
};

type FeedEntry = { article: FeedArticle; issue: FeedIssue["issue"] };

async function loadFeedEntries(): Promise<FeedEntry[]> {
  // Read live publication data from OJS through the sanitized proxy.
  // OJS remains the single source of truth — nothing is stored locally.
  const proxyRes = await fetch(
    `${Deno.env.get("SUPABASE_URL")}/functions/v1/ojs-proxy?type=issues&abstracts=1`,
    { headers: { apikey: Deno.env.get("SUPABASE_ANON_KEY") ?? "" } }
  );
  if (!proxyRes.ok) throw new Error(`ojs-proxy returned ${proxyRes.status}`);
  const data = await proxyRes.json();
  const issues: FeedIssue[] = Array.isArray(data?.issues) ? data.issues : [];
  return issues.flatMap(({ issue, articles }) => articles.map((article) => ({ article, issue })));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        generateError("badRequest", "Rate limit exceeded. Maximum 100 requests per hour."),
        {
          headers: { ...corsHeaders, "Content-Type": "text/xml" },
          status: 429,
        }
      );
    }

    const url = new URL(req.url);

    // Validate parameters
    const validation = validateOaiParams(url);
    if (!validation.valid) {
      console.warn(`Invalid OAI-PMH request: ${validation.error}`);
      return new Response(
        generateError("badArgument", validation.error || "Invalid request parameters"),
        {
          headers: { ...corsHeaders, "Content-Type": "text/xml" },
          status: 400,
        }
      );
    }

    const verb = url.searchParams.get("verb")!;
    const identifier = url.searchParams.get("identifier");

    console.log(`OAI-PMH request: verb=${verb}, ip=${ip}`);

    let xmlResponse = "";

    switch (verb) {
      case "Identify":
        xmlResponse = generateIdentify();
        break;
      case "ListRecords":
        xmlResponse = generateListRecords(await loadFeedEntries());
        break;
      case "GetRecord":
        if (identifier) {
          xmlResponse = generateGetRecord(await loadFeedEntries(), identifier);
        }
        break;
      case "ListIdentifiers":
        xmlResponse = generateListIdentifiers(await loadFeedEntries());
        break;
      case "ListMetadataFormats":
        xmlResponse = generateListMetadataFormats();
        break;
      default:
        xmlResponse = generateError("badVerb", "Illegal OAI verb");
    }

    return new Response(xmlResponse, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/xml",
      },
    });
  } catch (error: any) {
    console.error("Error in OAI-PMH handler:", error);
    return new Response(
      generateError("badRequest", "Internal server error"),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/xml",
        },
        status: 500,
      }
    );
  }
});

function generateIdentify() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="Identify">${OAI_BASE_URL}</request>
  <Identify>
    <repositoryName>African Journal of Veterinary Sciences</repositoryName>
    <baseURL>${OAI_BASE_URL}</baseURL>
    <protocolVersion>2.0</protocolVersion>
    <adminEmail>editor@africanjournalvetsci.org</adminEmail>
    <earliestDatestamp>2026-01-01T00:00:00Z</earliestDatestamp>
    <deletedRecord>no</deletedRecord>
    <granularity>YYYY-MM-DDThh:mm:ssZ</granularity>
    <description>
      <oai-identifier xmlns="http://www.openarchives.org/OAI/2.0/oai-identifier"
                      xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai-identifier
                      http://www.openarchives.org/OAI/2.0/oai-identifier.xsd">
        <scheme>oai</scheme>
        <repositoryIdentifier>ajvs.org</repositoryIdentifier>
        <delimiter>:</delimiter>
        <sampleIdentifier>oai:ajvs.org:article/1</sampleIdentifier>
      </oai-identifier>
    </description>
  </Identify>
</OAI-PMH>`;
}

function generateListRecords(entries: FeedEntry[]) {
  const records = entries.map(generateRecord).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="ListRecords" metadataPrefix="oai_dc">${OAI_BASE_URL}</request>
  <ListRecords>
    ${records}
  </ListRecords>
</OAI-PMH>`;
}

function generateGetRecord(entries: FeedEntry[], identifier: string) {
  const articleId = Number(identifier.replace("oai:ajvs.org:article/", ""));
  const entry = entries.find((e) => e.article.id === articleId);

  if (!entry) {
    return generateError("idDoesNotExist", "The identifier does not exist");
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="GetRecord" identifier="${identifier}" metadataPrefix="oai_dc">${OAI_BASE_URL}</request>
  <GetRecord>
    ${generateRecord(entry)}
  </GetRecord>
</OAI-PMH>`;
}

function generateListIdentifiers(entries: FeedEntry[]) {
  const identifiers = entries.map(({ article, issue }) => `
    <header>
      <identifier>oai:ajvs.org:article/${article.id}</identifier>
      <datestamp>${article.datePublished || issue.datePublished || new Date().toISOString()}</datestamp>
      <setSpec>journal:ajvs</setSpec>
    </header>`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="ListIdentifiers" metadataPrefix="oai_dc">${OAI_BASE_URL}</request>
  <ListIdentifiers>
    ${identifiers}
  </ListIdentifiers>
</OAI-PMH>`;
}

function generateListMetadataFormats() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="ListMetadataFormats">${OAI_BASE_URL}</request>
  <ListMetadataFormats>
    <metadataFormat>
      <metadataPrefix>oai_dc</metadataPrefix>
      <schema>http://www.openarchives.org/OAI/2.0/oai_dc.xsd</schema>
      <metadataNamespace>http://www.openarchives.org/OAI/2.0/oai_dc/</metadataNamespace>
    </metadataFormat>
  </ListMetadataFormats>
</OAI-PMH>`;
}

function generateRecord({ article, issue }: FeedEntry) {
  const authors = article.authors ?? [];
  const articleUrl = `${OJS_BASE_URL}/article/view/${article.id}`;
  const datestamp = article.datePublished || issue.datePublished || new Date().toISOString();
  const source = `African Journal of Veterinary Sciences${issue.volume ? `, Vol. ${issue.volume}` : ""}${issue.number ? `, No. ${issue.number}` : ""}${issue.year ? ` (${issue.year})` : ""}`;

  return `
    <record>
      <header>
        <identifier>oai:ajvs.org:article/${article.id}</identifier>
        <datestamp>${datestamp}</datestamp>
        <setSpec>journal:ajvs</setSpec>
      </header>
      <metadata>
        <oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/"
                   xmlns:dc="http://purl.org/dc/elements/1.1/"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/
                   http://www.openarchives.org/OAI/2.0/oai_dc.xsd">
          <dc:title>${escapeXml(article.title)}</dc:title>
          ${authors.map((a) => `<dc:creator>${escapeXml(a.fullName)}</dc:creator>`).join("")}
          ${article.abstract ? `<dc:description>${escapeXml(article.abstract)}</dc:description>` : ""}
          <dc:publisher>African Journal of Veterinary Sciences, University of Jos</dc:publisher>
          ${article.datePublished ? `<dc:date>${article.datePublished}</dc:date>` : ""}
          <dc:type>text</dc:type>
          <dc:identifier>${articleUrl}</dc:identifier>
          <dc:source>${escapeXml(source)}</dc:source>
          <dc:language>en</dc:language>
          ${issue.year ? `<dc:rights>Copyright (c) ${issue.year} African Journal of Veterinary Sciences</dc:rights>` : ""}
        </oai_dc:dc>
      </metadata>
    </record>`;
}

function generateError(code: string, message: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request>${OAI_BASE_URL}</request>
  <error code="${code}">${escapeXml(message)}</error>
</OAI-PMH>`;
}

function escapeXml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
