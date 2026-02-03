import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    // Validate identifier format
    if (!identifier.match(/^oai:ajvs\.org:article\/[a-f0-9-]+$/)) {
      return { valid: false, error: "Invalid identifier format" };
    }
  }
  
  const metadataPrefix = url.searchParams.get("metadataPrefix");
  if (metadataPrefix && metadataPrefix !== "oai_dc") {
    return { valid: false, error: "Only oai_dc metadata format is supported" };
  }
  
  return { valid: true };
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
    const metadataPrefix = url.searchParams.get("metadataPrefix") || "oai_dc";

    console.log(`OAI-PMH request: verb=${verb}, ip=${ip}`);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let xmlResponse = "";

    switch (verb) {
      case "Identify":
        xmlResponse = generateIdentify();
        break;
      case "ListRecords":
        xmlResponse = await generateListRecords(supabase);
        break;
      case "GetRecord":
        if (identifier) {
          xmlResponse = await generateGetRecord(supabase, identifier);
        }
        break;
      case "ListIdentifiers":
        xmlResponse = await generateListIdentifiers(supabase);
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
  <request verb="Identify">https://ajvs.org/oai</request>
  <Identify>
    <repositoryName>African Journal of Veterinary Sciences</repositoryName>
    <baseURL>https://ajvs.org/oai</baseURL>
    <protocolVersion>2.0</protocolVersion>
    <adminEmail>editor@africanjournalvetsci.org</adminEmail>
    <earliestDatestamp>2020-01-01T00:00:00Z</earliestDatestamp>
    <deletedRecord>no</deletedRecord>
    <granularity>YYYY-MM-DDThh:mm:ssZ</granularity>
    <description>
      <oai-identifier xmlns="http://www.openarchives.org/OAI/2.0/oai-identifier"
                      xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai-identifier
                      http://www.openarchives.org/OAI/2.0/oai-identifier.xsd">
        <scheme>oai</scheme>
        <repositoryIdentifier>ajvs.org</repositoryIdentifier>
        <delimiter>:</delimiter>
        <sampleIdentifier>oai:ajvs.org:article/12345</sampleIdentifier>
      </oai-identifier>
    </description>
  </Identify>
</OAI-PMH>`;
}

async function generateListRecords(supabase: any) {
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
        subject_area,
        manuscript_authors (full_name, institution)
      ),
      issues (volume, number, year)
    `)
    .order("published_date", { ascending: false })
    .limit(1000);

  if (error) throw error;

  let records = "";
  for (const article of articles || []) {
    records += generateRecord(article);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="ListRecords" metadataPrefix="oai_dc">https://ajvs.org/oai</request>
  <ListRecords>
    ${records}
  </ListRecords>
</OAI-PMH>`;
}

async function generateGetRecord(supabase: any, identifier: string) {
  const articleId = identifier.replace("oai:ajvs.org:article/", "");
  
  const { data: article, error } = await supabase
    .from("published_articles")
    .select(`
      *,
      manuscripts (
        id,
        title,
        abstract,
        keywords,
        doi,
        subject_area,
        manuscript_authors (full_name, institution)
      ),
      issues (volume, number, year)
    `)
    .eq("id", articleId)
    .single();

  if (error || !article) {
    return generateError("idDoesNotExist", "The identifier does not exist");
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="GetRecord" identifier="${identifier}" metadataPrefix="oai_dc">https://ajvs.org/oai</request>
  <GetRecord>
    ${generateRecord(article)}
  </GetRecord>
</OAI-PMH>`;
}

async function generateListIdentifiers(supabase: any) {
  const { data: articles, error } = await supabase
    .from("published_articles")
    .select("id, created_at")
    .order("published_date", { ascending: false })
    .limit(1000);

  if (error) throw error;

  let identifiers = "";
  for (const article of articles || []) {
    identifiers += `
    <header>
      <identifier>oai:ajvs.org:article/${article.id}</identifier>
      <datestamp>${article.created_at}</datestamp>
      <setSpec>journal:ajvs</setSpec>
    </header>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<OAI-PMH xmlns="http://www.openarchives.org/OAI/2.0/"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/
         http://www.openarchives.org/OAI/2.0/OAI-PMH.xsd">
  <responseDate>${new Date().toISOString()}</responseDate>
  <request verb="ListIdentifiers" metadataPrefix="oai_dc">https://ajvs.org/oai</request>
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
  <request verb="ListMetadataFormats">https://ajvs.org/oai</request>
  <ListMetadataFormats>
    <metadataFormat>
      <metadataPrefix>oai_dc</metadataPrefix>
      <schema>http://www.openarchives.org/OAI/2.0/oai_dc.xsd</schema>
      <metadataNamespace>http://www.openarchives.org/OAI/2.0/oai_dc/</metadataNamespace>
    </metadataFormat>
  </ListMetadataFormats>
</OAI-PMH>`;
}

function generateRecord(article: any) {
  const manuscript = article.manuscripts;
  const issue = article.issues;
  const authors = manuscript?.manuscript_authors || [];

  return `
    <record>
      <header>
        <identifier>oai:ajvs.org:article/${article.id}</identifier>
        <datestamp>${article.created_at}</datestamp>
        <setSpec>journal:ajvs</setSpec>
      </header>
      <metadata>
        <oai_dc:dc xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/"
                   xmlns:dc="http://purl.org/dc/elements/1.1/"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/
                   http://www.openarchives.org/OAI/2.0/oai_dc.xsd">
          <dc:title>${escapeXml(manuscript?.title || "")}</dc:title>
          ${authors.map((a: any) => `<dc:creator>${escapeXml(a.full_name)} (${escapeXml(a.institution)})</dc:creator>`).join("")}
          <dc:subject>${escapeXml(manuscript?.subject_area || "")}</dc:subject>
          ${manuscript?.keywords?.map((k: string) => `<dc:subject>${escapeXml(k)}</dc:subject>`).join("") || ""}
          <dc:description>${escapeXml(manuscript?.abstract || "")}</dc:description>
          <dc:publisher>African Journal of Veterinary Sciences</dc:publisher>
          <dc:date>${article.published_date}</dc:date>
          <dc:type>text</dc:type>
          <dc:format>application/pdf</dc:format>
          ${manuscript?.doi ? `<dc:identifier>https://doi.org/${manuscript.doi}</dc:identifier>` : ""}
          <dc:identifier>https://ajvs.org/article/${article.id}</dc:identifier>
          <dc:source>African Journal of Veterinary Sciences, Vol ${issue?.volume}, No ${issue?.number} (${issue?.year})</dc:source>
          <dc:language>en</dc:language>
          <dc:rights>Copyright (c) ${issue?.year} African Journal of Veterinary Sciences</dc:rights>
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
  <request>https://ajvs.org/oai</request>
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