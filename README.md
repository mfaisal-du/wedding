# Uzair & Rahma Wedding Invitation

## Local preview

```powershell
npm install
npx tsc --noEmit
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

The build is static and self-contained. It writes the all-events invitation to `dist/index.html`, the optimized sharing artwork to `dist/wedding-share.jpg`, and event-specific pages to:

- `dist/invite/mehndi/index.html`
- `dist/invite/barat/index.html`
- `dist/invite/walima/index.html`
- `dist/invite/valima/index.html` (Walima spelling alias)

The existing query links (`?invite=all`, `?invite=mehndi`, `?invite=barat`, `?invite=walima`) continue to work. Use the `/invite/<event>/` paths when sharing an event-specific invitation so social crawlers receive matching static metadata.

## Deployment notes

This project has not been deployed by this workflow. A deployment must publish the root HTML, `wedding-share.jpg`, and the three nested `invite` pages while preserving the existing `.htaccess` and unrelated files in the Hostinger document root. Event-specific thumbnail variants were not supplied; those pages intentionally omit social preview images rather than reusing the all-events artwork.

The existing soundtrack remains the YouTube video ID configured in `src/audio/YoutubeMusic.tsx`. Browser/OS autoplay and codec support vary; playback status follows YouTube player events and offers an explicit retry and direct YouTube link.
