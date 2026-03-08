export interface OJSArticle {
  id: number;
  title: string;
  abstract?: string;
  authors?: Array<{
    fullName: string;
    orcid?: string;
  }>;
  datePublished?: string;
  doi?: string;
  pages?: string;
  urlPath?: string;
  galleys?: Array<{
    file: {
      url: string;
    };
    label: string;
  }>;
}

export interface OJSIssue {
  id: number;
  title?: string;
  volume?: number;
  number?: string;
  year?: number;
  datePublished?: string;
  description?: string;
  coverImageUrl?: string;
}

export interface OJSAnnouncement {
  id: number;
  title: string;
  description: string;
  datePosted: string;
  url?: string;
}

const OJS_BASE_URL = 'https://journal.africanjournalvetsci.org';

/**
 * Fetch OJS data via backend proxy to bypass CORS
 */
const fetchViaProxy = async (type: string): Promise<Response> => {
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const url = `https://${projectId}.supabase.co/functions/v1/ojs-proxy?type=${encodeURIComponent(type)}`;
  
  return fetch(url, {
    headers: { 'Accept': 'application/json' },
  });
};

/**
 * Fetch current issue info from OJS
 */
export const fetchCurrentIssue = async (): Promise<{ issue: OJSIssue; articles: OJSArticle[] } | null> => {
  try {
    const response = await fetchViaProxy('current-issue');
    
    if (!response.ok) {
      throw new Error('Failed to fetch current issue');
    }
    
    const data = await response.json();
    
    if (!data.hasContent) {
      return null;
    }
    
    return null; // No issues published yet
  } catch (error) {
    console.error('Error fetching current issue:', error);
    return null;
  }
};

/**
 * Fetch all published issues from OJS
 */
export const fetchAllIssues = async (): Promise<OJSIssue[]> => {
  try {
    const response = await fetchViaProxy('issues');
    
    if (!response.ok) {
      throw new Error('Failed to fetch issues');
    }
    
    const data = await response.json();
    if (!data.hasContent) return [];
    return [];
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
};

/**
 * Fetch articles for a specific issue (not used via proxy currently)
 */
export const fetchIssueArticles = async (issueId: number): Promise<OJSArticle[]> => {
  return [];
};

/**
 * Fetch announcements from OJS via proxy
 */
export const fetchAnnouncements = async (): Promise<OJSAnnouncement[]> => {
  try {
    const response = await fetchViaProxy('announcements');
    
    if (response.ok) {
      const data = await response.json();
      return data.items || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

/**
 * Get article URL for canonical linking
 */
export const getArticleUrl = (article: OJSArticle): string => {
  if (article.urlPath) {
    return `${OJS_BASE_URL}/index.php/ajvs/article/view/${article.urlPath}`;
  }
  return `${OJS_BASE_URL}/index.php/ajvs/article/view/${article.id}`;
};

/**
 * Get PDF URL for article
 */
export const getArticlePdfUrl = (article: OJSArticle): string | null => {
  const pdfGalley = article.galleys?.find(g => g.label?.toLowerCase().includes('pdf'));
  return pdfGalley?.file?.url || null;
};
