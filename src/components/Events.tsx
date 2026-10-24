import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin, Navigation } from "lucide-react";
import { Reveal, Ornament, SparkleGlyph } from "./Reveal";
import { HeartFlourish, FlowerSprig, Paisley } from "./Ornaments";
import type { EventKey, WeddingConfig, WeddingEvent } from "../config/wedding";

/** each ceremony gets its own accent so the cards read at a glance */
const ACCENT: Record<EventKey, { ring: string; glow: string; emoji: string }> = {
  mehndi: { ring: "#9aa88d", glow: "rgba(154,168,141,0.28)", emoji: "🌿" },
  barat: { ring: "#b98f5c", glow: "rgba(185,143,92,0.30)", emoji: "🐎" },
  walima: { ring: "#c08a72", glow: "rgba(192,138,114,0.28)", emoji: "🌹" },
};

function EventCard({
  ev,
  index,
  showUrdu,
}: {
  ev: WeddingEvent;
  index: number;
  showUrdu: boolean;
}) {
  const accent = ACCENT[ev.key];
  return (
    <motion.article
      initial={{ opacity: 0, y: 48, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 66, damping: 17, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col items-center overflow-hidden rounded-[26px] border border-cream-line paper-card px-5 py-8 text-center shadow-[0_26px_55px_-28px_rgba(120,85,45,0.6)] sm:px-6"
    >
      {/* accent halo */}
      <span
        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(closest-side, ${accent.glow}, transparent)` }}
      />
      {/* corner paisleys */}
      <Paisley className="pointer-events-none absolute -left-2 -bottom-2 w-10 opacity-35 sm:-left-3 sm:-bottom-3 sm:w-14 sm:opacity-40" tone={accent.ring} />
      <Paisley className="pointer-events-none absolute -right-2 -top-2 w-10 rotate-180 opacity-35 sm:-right-3 sm:-top-3 sm:w-14 sm:opacity-40" tone={accent.ring} />

      {/* medallion */}
      <span
        className="relative grid h-14 w-14 place-items-center rounded-full border text-2xl"
        style={{ borderColor: `${accent.ring}99`, background: `${accent.ring}1a` }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${accent.ring}55`, animation: `pulse-ring 3s ease-out ${index * 0.5}s infinite` }}
        />
        <span aria-hidden>{accent.emoji}</span>
      </span>

      <h3 className="relative mt-4 font-script text-4xl leading-none text-goldrich sm:text-5xl">
        {ev.name}
      </h3>
      {showUrdu && ev.nameUr && (
        <p className="urdu relative mt-1 text-xl text-ink sm:text-2xl">{ev.nameUr}</p>
      )}

      <span className="relative my-3 h-px w-16" style={{ background: `${accent.ring}80` }} />

      <p className="relative font-serif text-base italic leading-snug text-ink-soft">{ev.tagline}</p>
      {showUrdu && ev.taglineUr && (
        <p className="urdu relative mt-1 text-[13px] leading-[2.3] text-ink-soft sm:text-sm">
          {ev.taglineUr}
        </p>
      )}

      <dl className="relative mt-5 w-full space-y-2.5 text-left">
        {[
          { icon: CalendarDays, v: ev.date },
          ...(ev.times?.length
            ? ev.times.map((t) => ({ icon: Clock3, v: `${t.label}: ${t.value}` }))
            : [{ icon: Clock3, v: ev.time }]),
          { icon: MapPin, v: ev.venue },
        ].map(({ icon: Icon, v }) => (
          <div key={v} className="flex items-start gap-3">
            <span
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border"
              style={{ borderColor: `${accent.ring}66` }}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} style={{ color: accent.ring }} />
            </span>
            <dd className="font-sans text-[10px] uppercase leading-relaxed tracking-[0.2em] text-ink-soft">
              {v}
            </dd>
          </div>
        ))}
      </dl>

      {showUrdu && ev.venueUr && (
        <p className="urdu relative mt-3 text-[13px] leading-[2.2] text-ink-soft">{ev.venueUr}</p>
      )}

      {ev.note && (
        <p className="relative mt-3 font-serif text-sm italic leading-relaxed text-ink-soft">
          {ev.note}
        </p>
      )}
      {showUrdu && ev.noteUr && (
        <p className="urdu relative mt-2 text-[13px] leading-[2.2] text-ink-soft">{ev.noteUr}</p>
      )}

      <a
        href={ev.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${ev.name} venue in Google Maps`}
        className="relative mt-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-sans text-[9px] uppercase tracking-[0.22em] transition-colors hover:bg-gold/10 hover:text-ink"
        style={{ borderColor: `${accent.ring}80`, color: accent.ring }}
      >
        <Navigation className="h-3.5 w-3.5" strokeWidth={1.6} />
        Open in Google Maps
      </a>

      {/* bottom shimmer */}
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
        style={{ background: `linear-gradient(90deg, ${accent.ring}, transparent)` }}
      />
    </motion.article>
  );
}

export function Events({ config }: { config: WeddingConfig }) {
  const active = config.events.filter((e) => e.enabled);
  if (active.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-cream-deep pb-10 pt-24 texture-grain sm:pb-12 sm:pt-28">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
        <div className="text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <FlowerSprig className="hidden h-8 w-8 opacity-80 sm:block" />
              <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-ink-soft sm:text-[10px]">
                {active.length === 1 ? "You are invited to" : "Our celebrations"}
              </p>
              <FlowerSprig className="hidden h-8 w-8 -scale-x-100 opacity-80 sm:block" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-script text-5xl text-goldrich sm:text-6xl">
              {active.length === 1 ? active[0].name : "The Ceremonies"}
            </h2>
          </Reveal>
          {config.showUrdu && (
            <Reveal delay={0.16}>
              <p className="urdu mt-1 text-xl text-ink sm:text-2xl">
                {active.length === 1 ? active[0].nameUr : "تقریبات"}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.22}>
            <Ornament className="mx-auto mt-4 w-56" />
          </Reveal>
        </div>

        <div
          className={`mt-12 grid gap-5 sm:mt-14 sm:gap-7 ${
            active.length === 1
              ? "mx-auto max-w-sm"
              : active.length === 2
              ? "mx-auto max-w-2xl sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {active.map((ev, i) => (
            <EventCard key={ev.key} ev={ev} index={i} showUrdu={config.showUrdu} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-2">
            <span className="hidden h-px w-12 bg-gold/50 sm:block" />
            <SparkleGlyph className="h-3 w-3 shrink-0" />
            <p className="font-sans text-[9px] uppercase tracking-[0.24em] text-ink-soft sm:text-[10px] sm:tracking-[0.34em]">
              Your presence is our greatest blessing
            </p>
            <SparkleGlyph className="h-3 w-3 shrink-0" />
            <span className="hidden h-px w-12 bg-gold/50 sm:block" />
          </div>
        </Reveal>
      </div>

      <HeartFlourish className="pointer-events-none absolute -left-6 top-1/3 hidden w-24 opacity-30 lg:block" />
      <HeartFlourish className="pointer-events-none absolute -right-6 bottom-1/4 hidden w-24 -scale-x-100 opacity-30 lg:block" />
    </section>
  );
}
