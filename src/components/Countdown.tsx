import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Ornament } from "./Reveal";
import { pakistanDate, type WeddingConfig } from "../config/wedding";

function parts(target: number, now: number) {
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor(diff / 3_600_000) % 24,
    m: Math.floor(diff / 60_000) % 60,
    s: Math.floor(diff / 1_000) % 60,
  };
}

function Digit({ value, label, pad = 2 }: { value: number; label: string; pad?: number }) {
  const text = String(value).padStart(pad, "0");
  return (
    <div className="flex flex-col items-center gap-2.5 sm:gap-3">
      <div className="relative w-12 h-16 sm:w-24 sm:h-28 rounded-lg sm:rounded-xl border border-[#d9b98d33] bg-[#2b1f14] shadow-[inset_0_1px_0_#ffffff14,0_24px_50px_-24px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#00000066]" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={text}
            className="absolute inset-0 flex items-center justify-center font-serif text-3xl sm:text-6xl text-[#eacd9f]"
            initial={{ y: "-60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "60%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.4em] uppercase text-[#c9b190]">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ config }: { config: WeddingConfig }) {
  const target = useMemo(() => {
    const t = pakistanDate(config.isoDate).getTime();
    return Number.isNaN(t) ? Date.now() : t;
  }, [config.isoDate]);

  const [t, setT] = useState(() => parts(target, Date.now()));

  useEffect(() => {
    const id = window.setInterval(() => setT(parts(target, Date.now())), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-[#241a10]">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(217,179,131,0.16),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_110%,rgba(224,179,160,0.1),transparent_70%)]" />
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b98d66] to-transparent" />
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9b98d66] to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-script text-5xl sm:text-6xl text-[#eacd9f]">The Celebration Begins</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Ornament tone="#c9a06b" className="w-56 mx-auto mt-4 opacity-90" />
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 sm:mt-12 flex items-start justify-center gap-1.5 sm:gap-6">
            <Digit value={t.d} label="Days" pad={t.d > 99 ? 3 : 2} />
            <span className="font-serif text-2xl sm:text-5xl text-[#d9b98d99] pt-3.5 sm:pt-7">:</span>
            <Digit value={t.h} label="Hours" />
            <span className="font-serif text-2xl sm:text-5xl text-[#d9b98d99] pt-3.5 sm:pt-7">:</span>
            <Digit value={t.m} label="Minutes" />
            <span className="font-serif text-2xl sm:text-5xl text-[#d9b98d99] pt-3.5 sm:pt-7">:</span>
            <Digit value={t.s} label="Seconds" />
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-10 font-serif italic text-lg text-[#c9b190]">
            {config.countdownLine}
          </p>
          <p className="mt-2 font-sans text-[8px] uppercase tracking-[0.3em] text-[#c9b190]/65">
            Pakistan Standard Time (PKT)
          </p>
        </Reveal>
      </div>
    </section>
  );
}
