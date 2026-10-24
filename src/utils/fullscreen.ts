/**
 * Immersive full-screen helpers.
 * Requesting fullscreen from inside a user gesture hides the mobile
 * browser's address bar so the invitation fills the whole screen.
 */

interface FsElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
}

interface FsDocument extends Document {
  webkitExitFullscreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
}

export function requestFullscreen() {
  try {
    const el = document.documentElement as FsElement;
    if (document.fullscreenElement) return;
    const fn =
      el.requestFullscreen?.bind(el) ??
      el.webkitRequestFullscreen?.bind(el) ??
      el.msRequestFullscreen?.bind(el);
    // iOS Safari has no Fullscreen API on <html>; the scroll-to-hide
    // behaviour plus `viewport-fit=cover` handles that case instead.
    void fn?.();
  } catch {
    /* fullscreen unavailable — page still displays normally */
  }
}

export function exitFullscreen() {
  try {
    const doc = document as FsDocument;
    if (!document.fullscreenElement && !doc.webkitFullscreenElement) return;
    const fn =
      doc.exitFullscreen?.bind(doc) ??
      doc.webkitExitFullscreen?.bind(doc) ??
      doc.msExitFullscreen?.bind(doc);
    void fn?.();
  } catch {
    /* ignore */
  }
}

export function isFullscreen(): boolean {
  const doc = document as FsDocument;
  return Boolean(document.fullscreenElement ?? doc.webkitFullscreenElement);
}
