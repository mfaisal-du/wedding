import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Ornament } from "./Reveal";
import { DEFAULT_EVENTS, pakistanDate } from "../config/wedding";

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
      <div className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-md border border-[#d9b98d55] bg-[#2b1f14] sm:h-20 sm:w-20">
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#00000066]" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={text}
            className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-[#f6e4d3] sm:text-5xl"
            initial={{ y: "-60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "60%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sans text-xs text-[#f0dfc7]">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const target = useMemo(() => {
    const t = pakistanDate(DEFAULT_EVENTS[0].times[0].isoDate).getTime();
    return Number.isNaN(t) ? 0 : t;
  }, []);

  const [now, setNow] = useState(Date.now);
  const [t, setT] = useState(() => parts(target, Date.now()));
  const finalDate = useMemo(
    () => new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(pakistanDate(DEFAULT_EVENTS[2].times[1].isoDate)),
    []
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      setT(parts(target, current));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const celebrationsComplete = today > finalDate;
  const mehndiStarted = now >= target;

  return (
    <section aria-labelledby="countdown-heading" className="relative overflow-hidden bg-[#241a10] py-12 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(217,179,131,0.16),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_110%,rgba(224,179,160,0.1),transparent_70%)]" />
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b98d66] to-transparent" />
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d9b98d66] to-transparent" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 id="countdown-heading" className="font-serif text-2xl font-medium text-[#f6e4d3] sm:text-3xl">
            {celebrationsComplete ? "Thank you for celebrating with us." : mehndiStarted ? "The celebrations have begun." : "Countdown to the Mehndi"}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Ornament tone="#c9a06b" className="w-56 mx-auto mt-4 opacity-90" />
        </Reveal>

        {!celebrationsComplete && !mehndiStarted && (
          <Reveal delay={0.3}>
            <div role="timer" aria-live="off" aria-label="Time remaining until Mehndi begins" className="mt-7 flex items-start justify-center gap-1.5 sm:gap-4">
              <Digit value={t.d} label="Days" pad={t.d > 99 ? 3 : 2} />
              <span aria-hidden className="pt-3 font-serif text-2xl text-[#eacd9f] sm:pt-5 sm:text-4xl">:</span>
              <Digit value={t.h} label="Hours" />
              <span aria-hidden className="pt-3 font-serif text-2xl text-[#eacd9f] sm:pt-5 sm:text-4xl">:</span>
              <Digit value={t.m} label="Minutes" />
              <span aria-hidden className="pt-3 font-serif text-2xl text-[#eacd9f] sm:pt-5 sm:text-4xl">:</span>
              <Digit value={t.s} label="Seconds" />
            </div>
            <p className="mt-5 font-sans text-sm text-[#f0dfc7]">
              6 November 2026 at 6:00 PM · Pakistan Standard Time
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
