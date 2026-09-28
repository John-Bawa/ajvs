# Searchable AJVS Archive

## Goal
Replace the current empty archive view with a live, searchable scholarly archive sourced from OJS.

## Reader experience
- Show all published OJS articles in a restrained journal list.
- Add one keyword search covering article titles and author names.
- Add separate Year and Issue filters, with a clear reset action.
- Display the active result count and selected filters.
- Paginate filtered results at 12 articles per page with numbered, Previous, and Next controls.
- Keep direct links to each official OJS article page and PDF when OJS provides one.
- Show issue, publication date, page range, DOI, and authors when available.
- Include a visible OJS last-synced time and a clear direct-to-OJS fallback if refresh fails.
- Make filters and pagination usable on both mobile and desktop.

## Technical details
- Extend the existing public OJS proxy to parse the archive issue list, fetch each published issue, and return only sanitized structured issue/article fields plus `syncedAt`.
- Keep OJS as the sole source of truth; do not copy publication records into the local database.
- Replace the placeholder archive service methods with a typed archive request.
- Rebuild `/archives` around client-side search, year/issue filtering, sorting, and pagination using existing semantic theme tokens and shared controls.
- Preserve existing archive SEO metadata and canonical URL.

## Verification
- Test live OJS results, title search, author search, year and issue filters, filter reset, pagination behavior, article/PDF links, fallback state, and responsive layout.
- Confirm no console errors and a successful project build.
