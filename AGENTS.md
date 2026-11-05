OJS is the source of truth for issue and article metadata; expose only sanitized structured fields through the public proxy so publication content stays current without duplication.
Current-issue responses include the live retrieval time for internal use; readers see an issue header (volume, issue, date, article count) rather than sync details, plus a direct OJS fallback whenever refresh fails.
- Visual system follows a ScienceDirect-style pattern: tokens in index.css (navy primary, teal accent for links/buttons, orange only for the open access label, 4px radius, hairline borders instead of shadows); inner pages use the compact PageHero band, the photo stays on the homepage only.
The AJVS archive is a live OJS-backed index with title/author search, year/issue filters, and 12-result pagination; never duplicate publication records locally.
The homepage follows a scholarly metadata-hub pattern: search and verified publication facts lead, while unverified metrics, decorative motion, and generic marketing claims are excluded to preserve academic credibility.
- AI article finder (research-finder function) reads publications live via ojs-proxy and only returns articles whose IDs exist in that data — prevents invented citations.
- The dedicated `/journal-overview` page is the primary journal profile for mission, scope, leadership, and verified impact; detailed About and Editorial Board pages remain separate.
- Frontend analytics events go through `src/lib/analytics.ts`; route views and Author Portal submission intent use consistent GA4 event names and source labels.
- Author-interest analytics are stored without personal identifiers; only journal administrators can read the dashboard data.
- RSS and OAI-PMH feeds (generate-rss-feed, generate-oai-pmh) read live from OJS via ojs-proxy — never from local publication tables, which were removed with the legacy local submission flow.
- ojs-proxy supports `abstracts=1` to fetch article abstracts from OJS article pages (capped at 24 per issue); research-finder uses it for relevance matching.
- Reader alert subscribers and reviewer interest sign-ups are stored in `alert_subscribers` and `reviewer_interests`; anon can insert, only admin roles can read. Admins send alerts from /admin/analytics via send-bulk-email.
