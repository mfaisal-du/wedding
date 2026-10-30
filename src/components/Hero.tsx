import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Ornament } from "./Reveal";
import { Paisley, JasmineString, MandalaRing, Bismillah } from "./Ornaments";
import { PetalField } from "./Petals";
import type { WeddingConfig } from "../config/wedding";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ config }: { active: boolean; config: WeddingConfig }) {
  return (
    <header id="welcome" aria-labelledby="welcome-heading" className="relative min-h-screen overflow-hidden bg-cream texture-grain">
      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_18%,rgba(217,179,131,0.32),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_105%,rgba(143,160,125,0.2),transparent_70%)]" />

      {/* slowly turning mandala halo */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vmin] h-[130vmin] opacity-[0.16]"
        animate={{ rotate: 360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      >
        <MandalaRing className="w-full h-full" />
      </motion.div>

      {/* hanging jasmine strings at the crown */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-[2%] sm:px-[14%] lg:px-[18%] opacity-70 sm:opacity-100" aria-hidden>
        {[
          { h: "h-24 sm:h-36", d: 0, y: 0 },
          { h: "h-20 sm:h-28 md:h-36", d: 0.8, y: -56 },
          { h: "h-24 sm:h-36", d: 1.6, y: 0 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={`origin-top ${s.h}`}
            initial={{ y: s.y - 64, opacity: 0 }}
            animate={{ y: s.y, opacity: 1, rotate: [i % 2 ? 2.5 : -2.5, i % 2 ? -2.5 : 2.5] }}
            transition={{
              y: { delay: 0.5 + s.d * 0.3, duration: 1.4, ease },
              opacity: { delay: 0.5 + s.d * 0.3, duration: 1.4 },
              rotate: { delay: 1.8 + s.d * 0.3, duration: 7 + i, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
            }}
          >
            <JasmineString className="h-full w-auto" />
          </motion.div>
        ))}
      </div>

      <PetalField count={16} />

      {/* swaying paisleys — lower corners, echoing the original's corner pieces */}
      <motion.div
        className="pointer-events-none absolute -left-4 sm:left-10 bottom-20 sm:bottom-14 w-20 sm:w-56 md:w-64 z-0 sm:z-10 opacity-60 sm:opacity-100"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.3, ease }}
      >
        <div className="sway-l">
          <Paisley className="w-full drop-shadow-[0_18px_30px_rgba(151,115,64,0.28)]" />
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -right-4 sm:right-10 bottom-20 sm:bottom-14 w-20 sm:w-56 md:w-64 z-0 sm:z-10 -scale-x-100 opacity-60 sm:opacity-100"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 1.3, ease }}
      >
        <div className="sway-r">
          <Paisley className="w-full drop-shadow-[0_18px_30px_rgba(151,115,64,0.28)]" />
        </div>
      </motion.div>

      {/* centre piece */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <motion.div
          className="w-full max-w-sm sm:max-w-xl"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.2, ease }}
        >
          <Bismillah />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1.3, ease }}
          className="mt-7 sm:mt-9"
        >
          <p className="font-sans text-sm font-medium text-ink-soft sm:text-base">
            Together with their families
          </p>
          <h1 id="welcome-heading" tabIndex={-1} className="mt-5 break-words font-script text-5xl leading-tight text-goldrich drop-shadow-[0_10px_24px_rgba(151,115,64,0.25)] focus:outline-none sm:mt-6 sm:text-7xl md:text-8xl">
            <span className="block">{config.groom}</span>
            <span className="my-1 inline-block font-script text-3xl text-gold sm:my-2 sm:text-5xl">weds</span>
            <span className="block">{config.bride}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 1.1, ease }}
          className="mt-7 sm:mt-9 flex flex-col items-center gap-3"
        >
          <Ornament className="w-44 sm:w-56 opacity-80" />
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {config.inviteMessage}
          </p>
          {config.showUrdu && config.inviteMessageUr && (
            <p lang="ur" dir="rtl" className="urdu mx-auto mt-3 max-w-xl text-base text-ink-soft sm:text-lg">
              {config.inviteMessageUr}
            </p>
          )}
          <blockquote className="mx-auto mt-5 max-w-xl font-serif text-base italic leading-relaxed text-ink-soft sm:text-lg">
            “{config.verse}”
            <cite className="mt-1 block font-sans text-sm not-italic text-ink-soft">
              {config.verseRef}
            </cite>
          </blockquote>
          <div
            aria-hidden="true"
            className="mt-4 flex flex-col items-center gap-1.5 text-ink-soft"
          >
            <span className="font-serif text-base italic sm:text-lg">Scroll down</span>
            <span className="relative flex h-9 w-6 justify-center rounded-full border border-gold/70 bg-cream/40 pt-1.5 backdrop-blur-sm">
              <span className="h-2 w-1 rounded-full bg-goldrich" style={{ animation: "scroll-pill 1.8s ease-in-out infinite" }} />
            </span>
            <ChevronDown className="h-4 w-4 text-goldrich animate-bounce" />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
