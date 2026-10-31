import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { ArrowUp } from "lucide-react";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { Hero } from "./components/Hero";
import { ScratchDate } from "./components/ScratchDate";
import { Events } from "./components/Events";
import { Countdown } from "./components/Countdown";
import { Rsvp } from "./components/Rsvp";
import { Footer } from "./components/Footer";
import BackgroundMusic, { type MusicHandle } from "./audio/BackgroundMusic";
import { buildInvitationConfig } from "./config/wedding";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [config] = useState(buildInvitationConfig);
  const reduceMotion = useReducedMotion();
  const musicRef = useRef<MusicHandle | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // the soundtrack begins the instant the seal is tapped (inside the user gesture)
  const handleFirstTap = () => {
    musicRef.current?.play();
  };

  const handleOpened = () => setOpened(true);

  useEffect(() => {
    if (opened) {
      contentRef.current?.querySelector<HTMLElement>("#welcome-heading")?.focus({ preventScroll: true });
    }
  }, [opened]);

  // keep theme + tab title in sync with the saved details
  useEffect(() => {
    document.documentElement.dataset.theme = config.theme;
  }, [config.theme]);

  useEffect(() => {
    document.title = `${config.groom} weds ${config.bride} — ${config.eventLabel}`;
  }, [config.groom, config.bride, config.eventLabel]);

  // smooth wheel/touch scrolling once the invitation is revealed
  useEffect(() => {
    if (!opened) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1.05,
      respectReducedMotion: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) {
      setShowScrollTop(false);
      return;
    }
    const updateVisibility = () => {
      const nearBottom = window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 220;
      setShowScrollTop(nearBottom);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [opened]);

  const scrollToTop = () => {
    if (reduceMotion) {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      return;
    }
    const easing = (progress: number) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 3.2, easing });
      return;
    }
    const startY = window.scrollY;
    const startedAt = performance.now();
    const duration = 3200;
    const animateScroll = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      window.scrollTo(0, startY * (1 - easing(progress)));
      if (progress < 1) window.requestAnimationFrame(animateScroll);
    };
    window.requestAnimationFrame(animateScroll);
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative overflow-x-clip bg-cream text-ink antialiased">
        <EnvelopeIntro config={config} onOpened={handleOpened} onFirstTap={handleFirstTap} />
        <div
          ref={contentRef}
          aria-hidden={!opened}
          inert={!opened}
          className="min-h-screen"
        >
          <Hero active={opened} config={config} />
          <ScratchDate config={config} />
          <Events config={config} />
          <Countdown />
          <Rsvp />
          <BackgroundMusic ref={musicRef} />
          <Footer config={config} />
        </div>
        <AnimatePresence>
          {opened && showScrollTop && (
            <motion.button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              title="Scroll to top"
              className="safe-dock-left fixed z-[85] grid h-11 w-11 place-items-center rounded-full border border-gold/60 bg-cream/95 text-goldrich shadow-[0_16px_36px_-16px_rgba(70,25,30,0.65)] backdrop-blur-md transition-colors hover:bg-goldrich hover:text-cream"
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.92 }}
            >
              <ArrowUp className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
