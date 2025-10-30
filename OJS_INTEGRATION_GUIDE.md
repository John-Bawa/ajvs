# OJS Integration Setup Guide

## Overview
This React site serves as the public-facing portal for AJVS, while Open Journal Systems (OJS) handles all backend manuscript workflows including submissions, peer review, and editorial management.

## Integration Architecture

### Current Setup
- **React Site (Public Portal)**: Displays published content, journal information, and archives
- **OJS Backend (Submission System)**: Handles manuscript submission, review, and editorial workflows
- **Integration Method**: Simple redirects/links between systems

### Authentication Strategy
- **Separate Authentication**: Users create separate accounts on OJS for manuscript submission
- **No SSO Required**: React site browsing doesn't require OJS authentication
- **Clear User Guidance**: Redirect notices inform users about external OJS system

## Configuration Steps

### 1. Install OJS
1. Set up PHP-enabled server (PHP 7.3+ recommended)
2. Install OJS 3.x from [https://pkp.sfu.ca/ojs/](https://pkp.sfu.ca/ojs/)
3. Configure OJS with journal settings:
   - Journal name: African Journal of Veterinary Sciences (AJVS)
   - Set up user roles (Author, Reviewer, Editor)
   - Configure submission workflow
   - Set up email templates

### 2. Configure OJS URL in React Site

**Option A: Environment Variable (Recommended)**
1. Add to `.env` file:
   ```
   VITE_OJS_URL=https://your-ojs-installation.org
   ```

**Option B: Update Config File**
1. Edit `src/config/ojs.ts`
2. Update `OJS_BASE_URL` constant:
   ```typescript
   export const OJS_BASE_URL = 'https://your-ojs-installation.org';
   ```

### 3. Verify OJS Routes
After OJS installation, verify these paths match your setup in `src/config/ojs.ts`:
- Author submission: `/index.php/ajvs/author/submit`
- Author dashboard: `/index.php/ajvs/author`
- Reviewer dashboard: `/index.php/ajvs/reviewer`
- Editor dashboard: `/index.php/ajvs/editor`
- Login: `/index.php/ajvs/login`

## Data Synchronization

### Published Articles
Published articles from OJS need to be displayed on the React site:

**Method 1: Manual Entry (Current)**
- Use React admin dashboard to add published articles
- Store article metadata in Supabase
- Link to OJS for full article PDFs

**Method 2: OJS REST API (Future Enhancement)**
- Use OJS REST API to fetch published articles
- Automatically sync article metadata
- Requires API key configuration

### Issue Information
- Create issues in React admin dashboard
- Match issue numbers with OJS publication issues
- Keep issue metadata synchronized manually

## User Workflows

### For Authors
1. Browse journal on React site
2. Click "Submit Manuscript" → Redirected to OJS
3. Create OJS account (one-time)
4. Submit manuscript through OJS
5. Track submission in OJS dashboard

### For Reviewers
1. Receive review invitation via email (from OJS)
2. Click email link → Login to OJS
3. Complete review in OJS system
4. Submit review through OJS

### For Editors
1. Access OJS editor dashboard directly
2. Manage submissions, reviews, and publication
3. Publish articles through OJS
4. Notify admin to update React site with published articles

## React Site Components

### Modified for OJS Integration
- `src/pages/SubmitManuscript.tsx` - Shows OJS redirect notice
- `src/components/layout/Header.tsx` - Links to OJS submission
- `src/config/ojs.ts` - OJS URL configuration

### Unchanged (Public Display)
- `src/pages/CurrentIssue.tsx` - Displays published articles
- `src/pages/Archives.tsx` - Shows past issues
- `src/pages/About.tsx` - Journal information
- `src/pages/EditorialBoard.tsx` - Editorial board members

### Current System (Keep for Admin Use)
- `src/pages/Dashboard.tsx` - Admin dashboard for content management
- `src/pages/EditorDashboard.tsx` - For managing published content display
- Database tables for published articles, issues, announcements

## Maintenance Tasks

### Regular Synchronization
1. **After Article Publication in OJS**:
   - Login to React admin dashboard
   - Add article to appropriate issue
   - Upload PDF to storage
   - Update article metadata

2. **Issue Management**:
   - Create new issue in React dashboard before OJS publication
   - Ensure issue numbers match between systems

3. **User Management**:
   - OJS handles all author/reviewer/editor accounts
   - React admin accounts separate (for content management only)

## Future Enhancements

### Potential API Integration
If you need automated sync in the future:
1. Enable OJS REST API
2. Create API key in OJS
3. Implement API client in React site
4. Add scheduled jobs for article sync

### Single Sign-On (SSO)
If you want unified authentication:
1. Implement OAuth/SAML provider
2. Configure OJS SSO plugin
3. Update React authentication to use same provider

## Troubleshooting

### OJS Links Not Working
- Verify OJS_BASE_URL is correctly set
- Check OJS installation is accessible
- Ensure OJS journal path matches configuration

### Users Confused About Separate Logins
- Add clear notices on React site about OJS authentication
- Include instructions in author guidelines
- Send welcome emails explaining dual system

### Article Metadata Mismatch
- Establish clear workflow for article publication
- Create checklist for syncing data between systems
- Consider API integration for automation

## Support Resources
- OJS Documentation: https://docs.pkp.sfu.ca/
- OJS Forum: https://forum.pkp.sfu.ca/
- React Site Repository: [Your GitHub URL]
