# Display OJS Issue 1 as the Current Issue

## Goal
Show the published content from AJVS Issue 1 in the homepage **Latest scholarship → Current Issue** area, with the issue heading and article links sourced from the provided OJS publication page.

## Changes
- Update the OJS proxy to fetch and parse `https://journal.africanjournalvetsci.org/index.php/ajvs/issue/view/1` for the current issue.
- Return structured issue metadata and published articles, including authors, pages, article links, and PDF links where available.
- Update the site data handling so the homepage and Current Issue page render the returned publication instead of the existing unavailable-content message.
- Point “View Full Issue” directly to Issue 1.
- Keep a friendly fallback if the external journal page is temporarily unavailable.

## Validation
- Test the proxy response against the live OJS publication page.
- Verify the homepage on desktop and mobile, including article and full-issue links.
- Confirm the site finishes without errors.

## Technical details
- Sanitize scraped text and only expose the expected structured fields.
- Keep OJS as the source of truth; no duplicate local manuscript workflow or manually maintained article list.
