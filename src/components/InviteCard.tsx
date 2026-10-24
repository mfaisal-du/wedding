import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal, Ornament, SparkleGlyph } from "./Reveal";
import { Paisley, ArchFrame, CornerVine, Bismillah, HeartFlourish, FlowerSprig } from "./Ornaments";
import type { WeddingConfig } from "../config/wedding";

/** one block of copy that gently floats upward while the section scrolls */
function ParallaxLine({
  progress,
  range,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  range: number;
  children: React.ReactNode;
  className?: string;
}) {
  const y = useTransform(progress, [0, 1], [range, -range]);
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** ornamental medallion shown where a photograph would sit */
function ArchMedallion({ groom, bride }: { groom: string; bride: string }) {
  return (
    <div className="relative mx-auto w-[74%] sm:w-[66%]">
      <motion.div
        className="absolute inset-0 -translate-y-1.5"
        animate={{ rotate: [0.6, -0.6, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArchFrame className="w-full h-auto opacity-60" />
      </motion.div>
      <ArchFrame className="relative w-full h-auto" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span className="font-script text-[13vw] sm:text-6xl leading-none text-goldrich drop-shadow-[0_6px_16px_rgba(151,115,64,0.3)]">
          {groom.charAt(0)}&nbsp;·&nbsp;{bride.charAt(0)}
        </span>
        <span className="w-10 h-px bg-gold/60" />
        <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.45em] uppercase text-ink-soft">
          mubarak
        </span>
      </div>
      <div className="pointer-events-none absolute -left-4 -bottom-4 w-11 -rotate-12 opacity-80 sm:-left-6 sm:-bottom-5 sm:w-20 sm:opacity-90">
        <Paisley className="w-full sway-l" />
      </div>
      <div className="pointer-events-none absolute -right-4 -bottom-4 w-11 rotate-12 -scale-x-100 opacity-80 sm:-right-6 sm:-bottom-5 sm:w-20 sm:opacity-90">
        <Paisley className="w-full sway-r" />
      </div>
    </div>
  );
}

export function InviteCard({ config }: { config: WeddingConfig }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 bg-cream overflow-hidden">
      <CornerVine className="pointer-events-none absolute -bottom-6 -right-8 w-60 sm:w-80 opacity-60 rotate-180" />

      {/* loving flourishes flanking the card */}
      <HeartFlourish className="pointer-events-none absolute left-2 top-1/4 hidden w-20 opacity-45 float-soft lg:block xl:w-24" />
      <FlowerSprig className="pointer-events-none absolute left-6 bottom-24 hidden w-14 opacity-60 sway-l lg:block" />
      <HeartFlourish className="pointer-events-none absolute right-2 top-1/3 hidden w-20 -scale-x-100 opacity-45 float-soft lg:block xl:w-24" />
      <FlowerSprig className="pointer-events-none absolute right-6 bottom-32 hidden w-14 -scale-x-100 opacity-60 sway-r lg:block" />

      <div className="relative max-w-md sm:max-w-lg mx-auto px-4 sm:px-6">
        <motion.div
          style={{ scale: cardScale }}
          className="relative paper-card arch gold-frame shadow-[0_45px_90px_-40px_rgba(120,85,45,0.5)] px-5 sm:px-10 pt-9 sm:pt-10 pb-10 sm:pb-12 text-center overflow-hidden"
        >
          {/* inner corner sprigs — visible on every screen size */}
          <FlowerSprig className="pointer-events-none absolute left-1.5 top-1.5 w-7 opacity-50 sm:left-2 sm:top-2 sm:w-11" />
          <FlowerSprig className="pointer-events-none absolute right-1.5 top-1.5 w-7 -scale-x-100 opacity-50 sm:right-2 sm:top-2 sm:w-11" />
          <div className="absolute inset-0 texture-grain pointer-events-none rounded-[inherit]" />

          <Reveal>
            <div className="pb-2">
              <Bismillah compact />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ArchMedallion groom={config.groom} bride={config.bride} />
          </Reveal>

          <div className="relative mt-9 space-y-1.5">
            <ParallaxLine progress={scrollYProgress} range={14}>
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-ink-soft">
                You are warmly invited
                <br />
                to the {config.eventLabel.toLowerCase()} of
              </p>
              {config.showUrdu && config.invitedLineUr && (
                <p className="urdu mt-2 text-[13px] text-ink-soft sm:text-sm">{config.invitedLineUr}</p>
              )}
            </ParallaxLine>

            <ParallaxLine progress={scrollYProgress} range={26} className="pt-4">
              <h3 className="font-script text-6xl sm:text-7xl text-goldrich leading-[0.9]">{config.groom}</h3>
              {config.showUrdu && config.groomUr && (
                <p className="urdu mt-1 text-2xl text-ink sm:text-3xl">{config.groomUr}</p>
              )}
            </ParallaxLine>

            {config.groomParents && (
              <ParallaxLine progress={scrollYProgress} range={20} className="pt-2">
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-ink-soft/90">son of</p>
                <p className="font-serif text-lg sm:text-xl text-ink mt-0.5">{config.groomParents}</p>
              </ParallaxLine>
            )}

            <ParallaxLine progress={scrollYProgress} range={10} className="py-3">
              <div className="flex items-center justify-center gap-3">
                <span className="w-12 h-px bg-gold/50" />
                <SparkleGlyph className="w-3 h-3" />
                <span className="font-script text-2xl sm:text-3xl text-gold">weds</span>
                <SparkleGlyph className="w-3 h-3" />
                <span className="w-12 h-px bg-gold/50" />
              </div>
            </ParallaxLine>

            <ParallaxLine progress={scrollYProgress} range={30}>
              <h3 className="font-script text-6xl sm:text-7xl text-goldrich leading-[0.9]">{config.bride}</h3>
              {config.showUrdu && config.brideUr && (
                <p className="urdu mt-1 text-2xl text-ink sm:text-3xl">{config.brideUr}</p>
              )}
            </ParallaxLine>

            {config.brideParents && (
              <ParallaxLine progress={scrollYProgress} range={22} className="pt-2">
                <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-ink-soft/90">
                  daughter of
                </p>
                <p className="font-serif text-lg sm:text-xl text-ink mt-0.5">{config.brideParents}</p>
              </ParallaxLine>
            )}

            <ParallaxLine progress={scrollYProgress} range={12} className="pt-6">
              <Ornament className="w-44 mx-auto opacity-90" />
              <p className="font-serif italic text-base sm:text-lg text-ink-soft leading-relaxed mt-4 max-w-[320px] mx-auto">
                {config.inviteMessage}
              </p>
              {config.showUrdu && config.inviteMessageUr && (
                <p className="urdu mx-auto mt-3 max-w-[330px] text-[13px] text-ink-soft sm:text-sm">
                  {config.inviteMessageUr}
                </p>
              )}
            </ParallaxLine>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** blessing verse section that follows the card */
export function Dua({ config }: { config: WeddingConfig }) {
  return (
    <section className="relative pb-24 pt-10 bg-cream-deep texture-grain overflow-hidden sm:pt-12">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      <CornerVine className="pointer-events-none absolute top-4 -right-12 w-40 -scale-x-100 opacity-35 sm:-right-8 sm:w-72 sm:opacity-50" />
      <div className="relative max-w-2xl mx-auto px-5 sm:px-6 text-center">
        <Reveal>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-ink-soft">
            With the blessings of their families
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-script text-5xl sm:text-6xl text-goldrich mt-5">Dear Friends &amp; Family</h2>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 inline-flex flex-col items-center">
            <SparkleGlyph className="w-4 h-4 opacity-80 float-soft" />
            <blockquote className="font-serif italic text-2xl sm:text-[1.9rem] text-ink leading-snug mt-4 max-w-xl">
              “{config.verse}”
            </blockquote>
            <cite className="not-italic font-sans text-[10px] tracking-[0.4em] uppercase text-ink-soft mt-4">
              {config.verseRef}
            </cite>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
