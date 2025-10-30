/**
 * OJS Integration Configuration
 * Update OJS_BASE_URL once your OJS installation is complete
 */

// Placeholder URL - Update this with your actual OJS installation URL
export const OJS_BASE_URL = process.env.VITE_OJS_URL || 'https://your-ojs-installation.org';

// OJS Route paths
export const OJS_ROUTES = {
  // Author workflows
  SUBMIT_MANUSCRIPT: `${OJS_BASE_URL}/index.php/ajvs/author/submit`,
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
