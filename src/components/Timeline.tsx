import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  CarFront, Crown, Flower2, HeartHandshake, MapPin, UtensilsCrossed,
} from "lucide-react";
import { Reveal, Ornament } from "./Reveal";
import { CornerVine } from "./Ornaments";
import type { WeddingConfig } from "../config/wedding";

const ICONS = {
  mehndi: Flower2,
  sehra: Crown,
  barat: CarFront,
  reception: HeartHandshake,
  lunch: UtensilsCrossed,
};
const EASE = [0.22, 1, 0.36, 1] as const;

export function Timeline({ config }: { config: WeddingConfig }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.65"],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });
  const glowPos = useTransform(spine,(v) => `${v * 100}%`);
  const nodeGlow = useTransform(spine, [0, 1], ["20%", "80%"]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      {/* ambient glow travelling with scroll */}
      <motion.div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[70vmin] h-[70vmin] rounded-full bg-[radial-gradient(closest-side,rgba(217,179,131,0.22),transparent)]"
        style={{ top: glowPos, y: "-50%" }}
      />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
        <div className="text-center">
          <Reveal>
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.55em] uppercase text-ink-soft">
              The order of celebrations
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-script text-5xl sm:text-6xl text-goldrich mt-3">Celebration Schedule</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Ornament className="w-56 mx-auto mt-4" />
          </Reveal>
        </div>

        <div className="relative mt-16 sm:mt-20 pb-2">
          {/* spine — faint track + scroll-drawn golden stroke */}
          <span className="absolute left-[26px] sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2 bg-gold/25" />
          <motion.span
            className="absolute left-[26px] sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2 bg-gradient-to-b from-goldrich via-gold to-goldrich origin-top shadow-[0_0_12px_rgba(185,143,92,0.65)]"
            style={{ scaleY: spine }}
          />

          <ol className="relative space-y-8 sm:space-y-14">
            {config.timeline.map((ev, i) => {
              const left = i % 2 === 0; // desktop alternation
              const Icon = ICONS[ev.icon];
              return (
                <motion.li
                  key={`${ev.date}-${ev.title}-${i}`}
                  className="relative"
                  initial={{ opacity: 0, y: 44, x: left ? -28 : 28, rotate: left ? -1.4 : 1.4 }}
                  whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 70, damping: 16, delay: i * 0.06 }}
                >
                  {/* --- node on the spine --- */}
                  <span className="absolute left-[26px] sm:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 grid place-items-center">
                    <motion.span
                      className="absolute h-12 w-12 rounded-full bg-gold/25"
                      style={{ scale: nodeGlow, opacity: 0.0 }}
                    />
                    <motion.span
                      className="absolute h-11 w-11 rounded-full bg-gold/20"
                      initial={false}
                      style={{ animation: `pulse-ring 3s ease-out ${i * 0.5}s infinite` }}
                    />
                    <motion.span
                      className="relative grid h-11 w-11 place-items-center"
                      whileInView={{ rotate: [45, 45] }}
                      viewport={{ once: true }}
                    >
                      <motion.span
                        className="absolute inset-0 rotate-45 rounded-[10px] border border-gold/70 paper-card shadow-[0_10px_24px_-10px_rgba(120,85,45,0.65)]"
                        whileHover={{ rotate: 135 }}
                        transition={{ duration: 0.9, ease: EASE }}
                      />
                      <Icon className="relative z-10 h-4 w-4 text-goldrich" strokeWidth={1.7} />
                    </motion.span>
                  </span>

                  {/* --- card --- */}
                  <div
                    className={`pl-[62px] sm:pl-0 ${
                      left
                        ? "sm:pr-[calc(50%+3.2rem)] sm:text-right"
                        : "sm:pl-[calc(50%+3.2rem)] sm:ml-auto"
                    }`}
                  >
                    {left ? (
                      <span className="hidden sm:block absolute right-[calc(50%+0.9rem)] top-1/2 h-px w-[2.3rem] bg-gradient-to-l from-gold/60 to-transparent" />
                    ) : (
                      <span className="hidden sm:block absolute left-[calc(50%+0.9rem)] top-1/2 h-px w-[2.3rem] bg-gradient-to-r from-gold/60 to-transparent" />
                    )}

                    <motion.div
                      whileHover={{ y: -5, rotate: left ? 0.5 : -0.5 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="group relative overflow-hidden rounded-2xl border border-cream-line paper-card px-5 py-4 sm:px-7 sm:py-5 shadow-[0_20px_45px_-24px_rgba(120,85,45,0.55)]"
                    >
                      {/* watermark number */}
                      <span
                        className={`pointer-events-none absolute -bottom-4 select-none font-serif text-[3.6rem] sm:text-[5.4rem] leading-none text-gold/15 transition-all duration-700 group-hover:text-gold/25 group-hover:-translate-y-1 ${
                          left ? "-right-1 sm:-left-2 sm:right-auto" : "-right-1 sm:-right-2"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <p
                        className={`relative font-sans text-[9px] tracking-[0.3em] uppercase text-ink-soft/80 ${
                          left ? "sm:text-right" : ""
                        }`}
                      >
                        {ev.date}
                      </p>
                      <div className={`relative mt-1.5 flex items-baseline gap-2.5 sm:gap-3 ${left ? "sm:flex-row-reverse" : ""}`}>
                        <p className="min-w-0 font-serif text-xl sm:text-[1.7rem] text-goldrich leading-tight">
                          {ev.title}. <span className="text-goldrich/90">{ev.time}</span>
                        </p>
                        <span className="h-px flex-1 self-center bg-gradient-to-r from-gold/50 to-transparent" />
                      </div>
                      <a
                        href={ev.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${ev.venue} in Google Maps`}
                        className={`relative mt-2.5 flex items-start gap-2 font-sans text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-ink-soft leading-relaxed transition-colors hover:text-goldrich ${
                          left ? "sm:flex-row-reverse sm:text-right" : ""
                        }`}
                      >
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-goldrich" strokeWidth={1.7} />
                        <span>{ev.venue}</span>
                      </a>

                      {/* shimmer line on hover */}
                      <span
                        className={`pointer-events-none absolute bottom-0 h-[2px] w-0 bg-gradient-to-r from-goldrich via-gold to-transparent transition-all duration-700 group-hover:w-full ${
                          left ? "sm:right-0 sm:bg-gradient-to-l right-0 left-0" : "left-0"
                        }`}
                      />
                    </motion.div>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* finale flourish */}
          <motion.div
            className="relative mt-12 flex items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="w-10 h-px bg-gold/50" />
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-goldrich" fill="currentColor">
              <path d="M12 1c.7 5.8 4.5 9.6 11 11-6.5 1.4-10.3 5.2-11 11-.7-5.8-4.5-9.6-11-11C7.5 10.6 11.3 6.8 12 1Z" />
            </svg>
            <span className="w-10 h-px bg-gold/50" />
          </motion.div>
        </div>
      </div>

      <CornerVine className="pointer-events-none absolute bottom-0 -left-8 w-56 sm:w-72 opacity-40" />
    </section>
  );
}
