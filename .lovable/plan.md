# AJVS Journal Overview

## Goal
Add a dedicated, polished journal overview page that presents verified AJVS information in a structured scholarly format inspired by established journal platforms.

## Page structure
- Use the shared faculty-building banner with AJVS identity and a concise journal description.
- Add a compact journal-information band for e-ISSN 3043-4246, open access, peer review, twice-yearly publication, and University of Jos.
- Present mission and aims in a clean editorial layout with a local section menu.
- Organize the verified scope into readable subject-area groups.
- Introduce editorial leadership with the current Editor-in-Chief and direct access to the full Editorial Board.
- Explain impact through verified research reach, open access, peer review, and current publication visibility only; omit invented metrics and unsupported claims.
- End with clear links for reading the current issue, viewing author guidance, and submitting through OJS.

## Site integration
- Add the page at `/journal-overview`.
- Make it the first destination under About in desktop and mobile navigation.
- Keep the existing About, Editorial Board, Policies, and author pages intact.
- Add page-specific search metadata and structured breadcrumbs.

## Technical details
- Build a focused React page using existing AJVS tokens, buttons, typography, header, footer, and shared banner.
- Use semantic light/dark colors and responsive grid constraints for phone and desktop layouts.
- Use only verified project facts; OJS remains the source for publication records.
- Validate the page in light and dark modes at desktop and mobile widths, and confirm the project builds cleanly.
