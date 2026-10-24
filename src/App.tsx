import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Lenis from "lenis";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { Hero } from "./components/Hero";
import { ScratchDate } from "./components/ScratchDate";
import { InviteCard, Dua } from "./components/InviteCard";
import { Events } from "./components/Events";
import { Timeline } from "./components/Timeline";
import { Countdown } from "./components/Countdown";
import { Rsvp } from "./components/Rsvp";
import { Footer } from "./components/Footer";
import YoutubeMusic, { type MusicHandle } from "./audio/YoutubeMusic";
import { buildInvitationConfig } from "./config/wedding";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [config] = useState(buildInvitationConfig);
  const musicRef = useRef<MusicHandle | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // the soundtrack begins the instant the seal is tapped (inside the user gesture)
  const handleFirstTap = () => {
    musicRef.current?.play();
  };

  const handleOpened = () => setOpened(true);

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
    const update = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 220;
      setShowScrollTop(nearBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [opened]);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 2.8,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    }
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative bg-cream text-ink antialiased overflow-x-clip">
      <EnvelopeIntro config={config} onOpened={handleOpened} onFirstTap={handleFirstTap} />

      <Hero active={opened} config={config} />
      <ScratchDate config={config} />
      <InviteCard config={config} />
      <Events config={config} />
      <Dua config={config} />
      <Timeline config={config} />
      <Countdown config={config} />
      <Rsvp />
      <Footer config={config} />

      <YoutubeMusic ref={musicRef} />

      <AnimatePresence>
        {opened && showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="safe-dock-left fixed z-[95] grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-cream/90 text-goldrich shadow-[0_16px_36px_-16px_rgba(120,85,45,0.7)] backdrop-blur-md transition-colors hover:bg-goldrich hover:text-cream"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.8} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
