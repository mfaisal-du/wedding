import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SparkleGlyph, Ornament } from "./Reveal";
import { Paisley, JasmineString, MandalaRing, Bismillah } from "./Ornaments";
import { PetalField } from "./Petals";
import type { WeddingConfig } from "../config/wedding";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ config }: { active: boolean; config: WeddingConfig }) {
  return (
    <header className="relative h-[100svh] min-h-[640px] overflow-hidden bg-cream texture-grain">
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
      <div className="absolute inset-x-0 top-0 flex justify-between px-[6%] sm:px-[18%] pointer-events-none opacity-70 sm:opacity-100" aria-hidden>
        {[
          { h: "h-28 sm:h-36", d: 0 },
          { h: "h-40 sm:h-52", d: 0.8 },
          { h: "h-32 sm:h-44", d: 1.6 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={`origin-top ${s.h}`}
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1, rotate: [i % 2 ? 2.5 : -2.5, i % 2 ? -2.5 : 2.5] }}
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
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center py-20">
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
          <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.55em] uppercase text-ink-soft">
            Together with their families
          </p>
          <h1 className="font-script text-[15vw] sm:text-8xl md:text-9xl leading-[1.05] text-goldrich drop-shadow-[0_10px_24px_rgba(151,115,64,0.25)] mt-5 break-words sm:mt-6">
            {config.groom}
          </h1>
          <div className="flex items-center justify-center gap-4 my-1 sm:my-2">
            <span className="w-14 sm:w-20 h-px bg-gold/60" />
            <span className="font-script text-3xl sm:text-5xl text-gold breathe inline-block">weds</span>
            <span className="w-14 sm:w-20 h-px bg-gold/60" />
          </div>
          <h1 className="font-script text-[15vw] sm:text-8xl md:text-9xl leading-[1.05] text-goldrich drop-shadow-[0_10px_24px_rgba(151,115,64,0.25)] break-words">
            {config.bride}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 1.1, ease }}
          className="mt-7 sm:mt-9 flex flex-col items-center gap-3"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-ink-soft">
            <SparkleGlyph className="w-3 h-3" />
            <p className="font-sans text-[9px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.45em] uppercase text-center">
              {config.weekday} · {config.day} {config.month} {config.year}
            </p>
            <SparkleGlyph className="w-3 h-3" />
          </div>
          <Ornament className="w-44 sm:w-56 opacity-80" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20 flex flex-col items-center gap-1.5 sm:gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
      >
        <p className="font-serif italic text-lg sm:text-xl text-ink-soft">Scroll down</p>
        <div className="relative w-6 h-10 rounded-full border border-gold/70 flex justify-center pt-2 bg-cream/40 backdrop-blur-sm">
          <span className="w-1 h-2 rounded-full bg-goldrich" style={{ animation: "scroll-pill 1.8s ease-in-out infinite" }} />
        </div>
        <ChevronDown className="w-4 h-4 text-goldrich mt-0.5 animate-bounce" />
      </motion.div>
    </header>
  );
}
