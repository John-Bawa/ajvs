OJS is the source of truth for issue and article metadata; expose only sanitized structured fields through the public proxy so publication content stays current without duplication.
Current-issue responses include the live retrieval time, and the interface must visibly show it with a direct OJS fallback whenever refresh fails.
The AJVS archive is a live OJS-backed index with title/author search, year/issue filters, and 12-result pagination; never duplicate publication records locally.
The homepage follows a scholarly metadata-hub pattern: search and verified publication facts lead, while unverified metrics, decorative motion, and generic marketing claims are excluded to preserve academic credibility.
- AI article finder (research-finder function) reads publications live via ojs-proxy and only returns articles whose IDs exist in that data — prevents invented citations.
- The dedicated `/journal-overview` page is the primary journal profile for mission, scope, leadership, and verified impact; detailed About and Editorial Board pages remain separate.
- Frontend analytics events go through `src/lib/analytics.ts`; route views and Author Portal submission intent use consistent GA4 event names and source labels.
- Author-interest analytics are stored without personal identifiers; only journal administrators can read the dashboard data.
