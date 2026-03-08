/**
 * OJS Integration Configuration
 * Live OJS installation at https://journal.africanjournalvetsci.org
 */

// Live OJS URL
export const OJS_BASE_URL = import.meta.env.VITE_OJS_URL || 'https://journal.africanjournalvetsci.org';

// OJS Route paths
export const OJS_ROUTES = {
  // Home
  HOME: `${OJS_BASE_URL}/index.php/ajvs`,
  
  // Author workflows
  SUBMIT_MANUSCRIPT: `${OJS_BASE_URL}/index.php/ajvs/index`,
  AUTHOR_DASHBOARD: `${OJS_BASE_URL}/index.php/ajvs/author`,
  
  // Reviewer workflows
  REVIEWER_DASHBOARD: `${OJS_BASE_URL}/index.php/ajvs/reviewer`,
  
  // Editor workflows
  EDITOR_DASHBOARD: `${OJS_BASE_URL}/index.php/ajvs/editor`,
  
  // Authentication
  LOGIN: `${OJS_BASE_URL}/index.php/ajvs/login`,
  REGISTER: `${OJS_BASE_URL}/index.php/ajvs/user/register`,
  
  // Public pages
  CURRENT_ISSUE: `${OJS_BASE_URL}/index.php/ajvs/issue/current`,
  ARCHIVES: `${OJS_BASE_URL}/index.php/ajvs/issue/archive`,
  ANNOUNCEMENTS: `${OJS_BASE_URL}/index.php/ajvs/announcement`,
  
  // About pages
  ABOUT: `${OJS_BASE_URL}/index.php/ajvs/about`,
  SUBMISSION_GUIDELINES: `${OJS_BASE_URL}/index.php/ajvs/about/submissions`,
  EDITORIAL_TEAM: `${OJS_BASE_URL}/index.php/ajvs/about/editorialMasthead`,
  PRIVACY: `${OJS_BASE_URL}/index.php/ajvs/about/privacy`,
  CONTACT: `${OJS_BASE_URL}/index.php/ajvs/about/contact`,
} as const;

/**
 * Check if OJS is configured
 */
export const isOJSConfigured = () => {
  return OJS_BASE_URL !== 'https://your-ojs-installation.org';
};

/**
 * Generate OJS external link
 */
export const getOJSLink = (route: keyof typeof OJS_ROUTES): string => {
  return OJS_ROUTES[route];
};
