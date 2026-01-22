import { Helmet } from "react-helmet-async";

interface ArticleAuthor {
  name: string;
  affiliation?: string;
  orcid?: string;
}

interface ArticleMeta {
  authors?: ArticleAuthor[];
  publishedDate?: string;
  doi?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  keywords?: string[];
  abstract?: string;
  pdfUrl?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
  articleMeta?: ArticleMeta;
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FAQItem[];
  noIndex?: boolean;
}

export const SEOHead = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = "https://africanjournalvetsci.org/og-image.jpg",
  ogType = "website",
  keywords = [],
  articleMeta,
  breadcrumbs,
  faqItems,
  noIndex = false
}: SEOHeadProps) => {
  const fullTitle = `${title} | African Journal of Veterinary Sciences`;
  const baseUrl = "https://africanjournalvetsci.org";
  
  // Default keywords for the journal
  const defaultKeywords = [
    "veterinary science",
    "veterinary research",
    "animal health",
    "veterinary medicine",
    "peer-reviewed journal",
    "open access",
    "AJVS",
    "University of Jos",
    "Nigeria",
    "Africa",
    "biomedical sciences",
    "veterinary journal"
  ];
  
  const allKeywords = [...new Set([...keywords, ...defaultKeywords])];
  
  // Journal structured data (Organization + Periodical)
  const journalSchema = {
    "@context": "https://schema.org",
    "@type": "Periodical",
    "@id": baseUrl,
    "name": "African Journal of Veterinary Sciences",
    "alternateName": "AJVS",
    "issn": "3043-4246",
    "url": baseUrl,
    "description": "A peer-reviewed, open access journal publishing original research in veterinary medicine, animal health, and biomedical sciences. Published by the Faculty of Veterinary Medicine, University of Jos, Nigeria.",
    "publisher": {
      "@type": "Organization",
      "name": "Faculty of Veterinary Medicine, University of Jos",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "PMB 2084",
        "addressLocality": "Jos",
        "addressRegion": "Plateau State",
        "addressCountry": "Nigeria"
      },
      "email": "ajvsc@unijos.edu.ng"
    },
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "license": "https://creativecommons.org/licenses/by/4.0/"
  };

  // Scholarly article structured data
  const articleSchema = articleMeta ? {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": title,
    "description": articleMeta.abstract || description,
    "url": canonicalUrl,
    "datePublished": articleMeta.publishedDate,
    "isPartOf": {
      "@type": "PublicationIssue",
      "issueNumber": articleMeta.issue,
      "isPartOf": {
        "@type": "PublicationVolume",
        "volumeNumber": articleMeta.volume,
        "isPartOf": {
          "@type": "Periodical",
          "name": "African Journal of Veterinary Sciences",
          "issn": "3043-4246"
        }
      }
    },
    "author": articleMeta.authors?.map(author => ({
      "@type": "Person",
      "name": author.name,
      "affiliation": author.affiliation ? {
        "@type": "Organization",
        "name": author.affiliation
      } : undefined,
      "identifier": author.orcid ? {
        "@type": "PropertyValue",
        "propertyID": "ORCID",
        "value": author.orcid
      } : undefined
    })),
    "publisher": {
      "@type": "Organization",
      "name": "Faculty of Veterinary Medicine, University of Jos"
    },
    "identifier": articleMeta.doi ? {
      "@type": "PropertyValue",
      "propertyID": "DOI",
      "value": articleMeta.doi
    } : undefined,
    "pagination": articleMeta.pages,
    "keywords": articleMeta.keywords?.join(", "),
    "isAccessibleForFree": true,
    "license": "https://creativecommons.org/licenses/by/4.0/"
  } : null;

  // Breadcrumb structured data
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  // FAQ Page structured data
  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Website search action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "African Journal of Veterinary Sciences",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/archives?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Site navigation structured data
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "url": baseUrl,
    "hasPart": [
      { "@type": "WebPage", "name": "Home", "url": baseUrl },
      { "@type": "WebPage", "name": "About", "url": `${baseUrl}/about` },
      { "@type": "WebPage", "name": "Editorial Board", "url": `${baseUrl}/editorial-board` },
      { "@type": "WebPage", "name": "Author Guidelines", "url": `${baseUrl}/author-guidelines` },
      { "@type": "WebPage", "name": "Archives", "url": `${baseUrl}/archives` },
      { "@type": "WebPage", "name": "Current Issue", "url": `${baseUrl}/current-issue` },
      { "@type": "WebPage", "name": "Submit Manuscript", "url": `${baseUrl}/submit` },
      { "@type": "WebPage", "name": "FAQ", "url": `${baseUrl}/faq` },
      { "@type": "WebPage", "name": "Contact", "url": `${baseUrl}/contact` }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={articleMeta ? "article" : ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="African Journal of Veterinary Sciences" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific OG tags */}
      {articleMeta?.publishedDate && (
        <meta property="article:published_time" content={articleMeta.publishedDate} />
      )}
      {articleMeta?.authors?.map((author, i) => (
        <meta key={i} property="article:author" content={author.name} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Google Scholar Meta Tags */}
      <meta name="citation_journal_title" content="African Journal of Veterinary Sciences" />
      <meta name="citation_journal_abbrev" content="AJVS" />
      <meta name="citation_publisher" content="Faculty of Veterinary Medicine, University of Jos" />
      <meta name="citation_issn" content="3043-4246" />
      <meta name="citation_language" content="en" />
      
      {/* Article-specific Google Scholar tags */}
      {articleMeta?.publishedDate && (
        <meta name="citation_publication_date" content={articleMeta.publishedDate} />
      )}
      {articleMeta?.volume && (
        <meta name="citation_volume" content={articleMeta.volume} />
      )}
      {articleMeta?.issue && (
        <meta name="citation_issue" content={articleMeta.issue} />
      )}
      {articleMeta?.pages && (
        <>
          <meta name="citation_firstpage" content={articleMeta.pages.split('-')[0]} />
          <meta name="citation_lastpage" content={articleMeta.pages.split('-')[1] || articleMeta.pages.split('-')[0]} />
        </>
      )}
      {articleMeta?.doi && (
        <meta name="citation_doi" content={articleMeta.doi} />
      )}
      {articleMeta?.authors?.map((author, i) => (
        <meta key={i} name="citation_author" content={author.name} />
      ))}
      {articleMeta?.authors?.map((author, i) => author.affiliation && (
        <meta key={`inst-${i}`} name="citation_author_institution" content={author.affiliation} />
      ))}
      {articleMeta?.pdfUrl && (
        <meta name="citation_pdf_url" content={articleMeta.pdfUrl} />
      )}
      {articleMeta?.keywords?.map((keyword, i) => (
        <meta key={i} name="citation_keywords" content={keyword} />
      ))}
      {articleMeta?.abstract && (
        <meta name="citation_abstract" content={articleMeta.abstract} />
      )}
      
      {/* Dublin Core Metadata */}
      <meta name="DC.title" content={title} />
      <meta name="DC.creator" content={articleMeta?.authors?.map(a => a.name).join("; ") || "African Journal of Veterinary Sciences"} />
      <meta name="DC.subject" content={allKeywords.slice(0, 5).join("; ")} />
      <meta name="DC.description" content={description} />
      <meta name="DC.publisher" content="Faculty of Veterinary Medicine, University of Jos" />
      <meta name="DC.type" content={articleMeta ? "Text.Article" : "Text"} />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content={canonicalUrl} />
      <meta name="DC.language" content="en" />
      <meta name="DC.rights" content="https://creativecommons.org/licenses/by/4.0/" />
      
      {/* PRISM (Publishing Requirements for Industry Standard Metadata) */}
      <meta name="prism.publicationName" content="African Journal of Veterinary Sciences" />
      <meta name="prism.issn" content="3043-4246" />
      {articleMeta?.volume && <meta name="prism.volume" content={articleMeta.volume} />}
      {articleMeta?.issue && <meta name="prism.number" content={articleMeta.issue} />}
      {articleMeta?.publishedDate && <meta name="prism.publicationDate" content={articleMeta.publishedDate} />}
      {articleMeta?.doi && <meta name="prism.doi" content={articleMeta.doi} />}
      
      {/* Highwire Press Tags (used by Google Scholar) */}
      <meta name="citation_title" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="publisher" content="Faculty of Veterinary Medicine, University of Jos" />
      <meta name="author" content="AJVS Editorial Team" />
      <meta name="geo.region" content="NG-PL" />
      <meta name="geo.placename" content="Jos, Plateau State, Nigeria" />
      
      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title="AJVS RSS Feed" href="https://journal.africanjournalvetsci.org/index.php/ajvs/gateway/plugin/WebFeedGatewayPlugin/rss2" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(journalSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(siteNavigationSchema)}
      </script>
    </Helmet>
  );
};
