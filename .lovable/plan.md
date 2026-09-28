# Keep Current Issue Synced and Paginated

## Goal
Keep **Latest scholarship → Current Issue** aligned with the live OJS Issue 1 page and make longer article lists easier to browse.

## Changes
- Fetch current issue data fresh from OJS instead of relying on a stale browser or proxy cache.
- Keep OJS as the source of truth for issue details, article metadata, links, and PDFs.
- Sort articles by the first printed page number so they appear in publication order.
- Display 12 articles at a time: 1–12, 13–24, and so on.
- Add clear Previous, numbered-page, and Next navigation below the article list when more than 12 articles exist.
- Reset the list to the first page whenever refreshed OJS content changes the available page count.
- Use the same behavior on the homepage and the dedicated Current Issue page.

## Validation
- Check the live proxy response reflects the latest OJS changes.
- Verify ordering and pagination behavior with more than 12 entries.
- Confirm mobile and desktop layouts remain clean and accessible.
- Confirm the site finishes without errors.

## Technical details
- Send no-cache request/response directives through the OJS data path.
- Parse the leading numeric value from each article's page range for stable ordering, with article ID as a fallback.
- Keep the proxy response limited to sanitized structured fields.
