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

The existing query links (`?invite=all`, `?invite=mehndi`, `?invite=barat`, `?invite=walima`, and `?invite=valima`) continue to work. The production `.htaccess` maps event query links internally to their static metadata pages while leaving the visible URL unchanged. Equivalent `/invite/<event>/` paths are also available.

## Deployment notes

The current build is deployed to `https://3bs.io`. The root page, shared thumbnail, query links, and event paths were checked over HTTPS. Event pages use the supplied wedding thumbnail with event-specific titles and descriptions. Social platforms may cache old previews; after a deployment, allow time for refresh or request a rescrape using the platform's sharing debugger.

When deploying future builds, publish `index.html`, `wedding-share.jpg`, all four nested `invite` pages, and the scoped root `.htaccess` rules. Do not overwrite or modify sibling projects in the Hostinger document root.

The compressed soundtrack is bundled at `public/audio/TMRD-BG-final.mp3` and served from `/audio/TMRD-BG-final.mp3`. The envelope tap attempts playback directly through one persistent HTML audio element; browser autoplay policies can still block sound, in which case the footer control offers a retry.
