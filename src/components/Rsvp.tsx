import { MessageCircle } from "lucide-react";
import { Reveal, Ornament } from "./Reveal";
import { CornerVine, HeartFlourish } from "./Ornaments";
import { LOOKING_FORWARD, RSVP_NAMES, RSVP_PHONES } from "../config/wedding";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("0") ? `92${digits.slice(1)}` : digits}`;
}

export function Rsvp() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 texture-grain sm:py-28">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <CornerVine className="pointer-events-none absolute -right-10 -top-2 w-40 -scale-x-100 opacity-35 sm:-right-6 sm:w-64 sm:opacity-50" />
      <HeartFlourish className="pointer-events-none absolute -left-6 bottom-10 hidden w-24 opacity-30 lg:block" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
        <div className="text-center">
          <Reveal>
            <p className="font-sans text-[9px] uppercase tracking-[0.55em] text-ink-soft sm:text-[10px]">
              With warm regards
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-script text-5xl text-goldrich sm:text-6xl">Looking Forward</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Ornament className="mx-auto mt-4 w-56" />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-[26px] border border-cream-line paper-card px-6 py-8 text-left shadow-[0_26px_55px_-28px_rgba(120,85,45,0.45)] sm:px-8">
              <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-ink-soft">
                Family &amp; Friends
              </p>
              <p className="mt-2 font-serif text-xl italic text-ink-soft">
                With love and gratitude
              </p>
              <span className="mt-4 block h-px w-16 bg-gold/50" />
              <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {LOOKING_FORWARD.map((name) => (
                  <li
                    key={name}
                    className="flex items-start gap-2.5 font-serif text-[15px] leading-relaxed text-ink-soft"
                  >
                    <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-gold" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="h-full">
            <div className="relative h-full overflow-hidden rounded-[26px] border border-cream-line paper-card px-6 py-8 text-center shadow-[0_26px_55px_-28px_rgba(120,85,45,0.45)] sm:px-8">
              <p className="font-sans text-[9px] uppercase tracking-[0.45em] text-ink-soft">
                R.S.V.P.
              </p>
              <h3 className="mt-2 font-script text-4xl text-goldrich">Join Us</h3>
              <span className="mx-auto mt-4 block h-px w-16 bg-gold/50" />

              <div className="mt-6 space-y-2">
                {RSVP_NAMES.map((name) => (
                  <p key={name} className="font-serif text-base leading-relaxed text-ink">
                    {name}
                  </p>
                ))}
              </div>

              <div className="mt-6 space-y-2.5">
                <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-ink-soft">
                  Contact
                </p>
                {RSVP_PHONES.map((phone) => (
                  <div key={phone} className="flex items-center justify-center gap-2.5">
                    <a
                      href={telHref(phone)}
                      className="font-serif text-lg text-ink transition-colors hover:text-goldrich"
                    >
                      {phone}
                    </a>
                    <a
                      href={whatsappHref(phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Message ${phone} on WhatsApp`}
                      className="grid h-7 w-7 place-items-center rounded-full border border-gold/40 text-goldrich transition-colors hover:bg-gold/10"
                    >
                      <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.7} />
                    </a>
                  </div>
                ))}
              </div>

              <p className="mt-6 font-serif text-sm italic leading-relaxed text-ink-soft">
                We look forward to celebrating with you.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
