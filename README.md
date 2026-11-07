# Beekay Precision website

Static site for Beekay Precision, an industrial switch manufacturer in Pune. Served by GitHub Pages from `main` (domain in `CNAME`).

- Pages are plain HTML in the repo root. `js/main.js` injects the shared header and footer and handles the catalogue filter and enquiry form.
- Styles: `css/style.css`. Product concepts and supporting imagery are in `images/`.
- Enquiry form opens a `mailto:` (no backend on Pages).
- Bump the `?v=` query on CSS/JS links after changes to bust caches.
- Retired product and section URLs are redirect stubs that preserve old links.
- Previous site: git tag `backup-pre-switch-redesign`.
