import { Reveal, SparkleGlyph } from "./Reveal";
import { Paisley } from "./Ornaments";
import type { WeddingConfig } from "../config/wedding";

export function Footer({ config }: { config: WeddingConfig }) {
  return (
    <footer className="relative bg-cream overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* swaying paisleys echoing the invitation's corners */}
      <div className="pointer-events-none absolute bottom-0 -left-8 w-24 opacity-50 sway-l sm:-left-6 sm:w-60 sm:opacity-80">
        <Paisley />
      </div>
      <div className="pointer-events-none absolute bottom-0 -right-8 w-24 -scale-x-100 opacity-50 sway-r sm:-right-6 sm:w-60 sm:opacity-80">
        <Paisley />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20 text-center">
        <Reveal>
          <SparkleGlyph className="w-4 h-4 mx-auto mb-6 float-soft" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-2xl leading-relaxed text-goldrich sm:text-3xl">
            We look forward to celebrating with you.
          </h2>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-5 flex max-w-full flex-wrap items-baseline justify-center gap-x-2 font-script text-2xl leading-tight text-ink sm:flex-nowrap sm:text-4xl">
            <span className="whitespace-nowrap">{config.groom}</span>
            <span className="whitespace-nowrap text-goldrich">weds</span>
            <span className="whitespace-nowrap">{config.bride}</span>
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 mt-8">
            <span className="w-10 sm:w-14 h-px bg-gold/50 shrink-0" />
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase text-ink-soft text-center">
              {config.day} · {config.month} · {config.year}
            </p>
            <span className="w-10 sm:w-14 h-px bg-gold/50 shrink-0" />
          </div>
        </Reveal>
        <Reveal delay={0.38}>
          <p className="mt-8 font-sans text-xs text-ink-soft/70">
            Designed by 3BS
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
