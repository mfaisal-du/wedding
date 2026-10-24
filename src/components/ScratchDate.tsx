import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Hand, CalendarPlus } from "lucide-react";
import { Reveal, Ornament, SparkleGlyph } from "./Reveal";
import { CornerVine, Paisley, MandalaRing } from "./Ornaments";
import { icsUtcStamp, type WeddingConfig } from "../config/wedding";

const CONFETTI_COLORS = ["#b98f5c", "#e0b3a0", "#9aa88d", "#f3ddba", "#c9a06b"];

export function ScratchDate({ config }: { config: WeddingConfig }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scratching = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const multipleDates = config.events.filter((event) => event.enabled).length > 1;

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#d9b383");
    g.addColorStop(0.25, "#c39a63");
    g.addColorStop(0.5, "#e8cca0");
    g.addColorStop(0.75, "#bd9259");
    g.addColorStop(1, "#dcb887");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < width * height * 0.012; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,245,225,0.16)" : "rgba(120,85,45,0.12)";
      ctx.fillRect(Math.random() * width, Math.random() * height, 1.4, 1.4);
    }

    const sheen = ctx.createLinearGradient(0, height, width, 0);
    sheen.addColorStop(0, "rgba(255,250,238,0)");
    sheen.addColorStop(0.5, "rgba(255,250,238,0.28)");
    sheen.addColorStop(1, "rgba(255,250,238,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(90,64,34,0.55)";
    ctx.font = `italic 15px "Cormorant Garamond", serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("gently scratch the foil", width / 2, height / 2);
  }, []);

  useEffect(() => {
    paintFoil();
    const onResize = () => {
      if (!revealedRef.current) paintFoil();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paintFoil]);

  const fireConfetti = useCallback(() => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    const opts = { colors: CONFETTI_COLORS, ticks: 220, gravity: 0.85, scalar: 0.9 };
    confetti({ ...opts, particleCount: 90, spread: 75, origin: { x, y } });
    window.setTimeout(() => confetti({ ...opts, particleCount: 50, angle: 60, spread: 60, origin: { x: x - 0.12, y } }), 180);
    window.setTimeout(() => confetti({ ...opts, particleCount: 50, angle: 120, spread: 60, origin: { x: x + 0.12, y } }), 320);
  }, []);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    const stride = 32;
    const total = Math.ceil(data.length / stride);
    for (let i = 3; i < data.length; i += stride) {
      if (data[i] === 0) cleared++;
    }
    const ratio = cleared / total;
    setProgress(ratio);
    if (ratio > 0.42) {
      revealedRef.current = true;
      setRevealed(true);
      fireConfetti();
    }
  }, [fireConfetti]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 54 * dpr;
    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, 27 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPos.current = { x, y };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    scratching.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!scratching.current) return;
    scratchAt(e.clientX, e.clientY);
  };
  const onPointerUp = () => {
    if (!scratching.current) return;
    scratching.current = false;
    lastPos.current = null;
    checkProgress();
  };

  const manualReveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    fireConfetti();
  };

  return (
    <section className="relative py-24 sm:py-28 bg-cream texture-grain overflow-hidden">
      <CornerVine className="pointer-events-none absolute -top-2 -left-10 w-40 opacity-50 float-soft sm:-left-6 sm:w-72 sm:opacity-70" />
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <h2 className="font-script text-5xl sm:text-6xl text-goldrich">
            {multipleDates ? "The Dates" : "The Date"}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Ornament className="w-56 sm:w-64 mx-auto mt-4" />
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 font-serif italic text-lg sm:text-xl text-ink-soft flex items-center justify-center gap-3">
            <motion.span
              className="inline-flex text-goldrich"
              animate={{ rotate: [0, -12, 0, 10, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Hand className="w-5 h-5" strokeWidth={1.5} />
            </motion.span>
            Scratch to reveal {multipleDates ? "the dates" : "the date"}
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-10">
          <div
            ref={wrapRef}
            className="relative mx-auto w-full max-w-md aspect-[3.2/1.55] rounded-[26px] overflow-hidden shadow-[0_24px_60px_-24px_rgba(120,85,45,0.5)] gold-frame select-none"
          >
            {/* ------- the hidden, revealed date panel ------- */}
            <div className="absolute inset-0 paper-card">
              {/* faint mandala watermark */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] aspect-square opacity-[0.08] pointer-events-none">
                <MandalaRing className="w-full h-full" />
              </div>

              {/* corner paisleys */}
              <div className="absolute left-1 bottom-1 w-6 opacity-55 pointer-events-none sm:left-1.5 sm:w-11 sm:opacity-80">
                <Paisley className="w-full" />
              </div>
              <div className="absolute right-1 top-1 w-6 rotate-180 opacity-55 pointer-events-none sm:right-1.5 sm:w-11 sm:opacity-80">
                <Paisley className="w-full" />
              </div>

              <motion.div
                className="relative h-full flex flex-col items-center justify-center px-6"
                animate={revealed ? { scale: [0.88, 1.06, 1], opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], times: [0, 0.55, 1] }}
              >
                {/* weekday */}
                <p className="font-sans text-[9px] sm:text-[11px] tracking-[0.5em] uppercase text-ink-soft">
                  {config.weekday}
                </p>

                {/* arch with the date */}
                <div className="relative mt-6 flex items-center justify-center sm:mt-7">
                  <div
                    className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-0 sm:gap-x-6"
                  >
                    <span
                      className={`font-script leading-none shimmer-text pr-1 ${
                        multipleDates ? "text-[10vw] sm:text-5xl" : "text-[15vw] sm:text-7xl"
                      }`}
                    >
                      {config.day}
                    </span>
                    <span
                      className={`font-script leading-none text-goldrich ${
                        multipleDates ? "text-[10vw] sm:text-5xl" : "text-[11vw] sm:text-6xl"
                      }`}
                    >
                      {config.month}
                    </span>
                    <span
                      className={`font-serif leading-none text-ink ${
                        multipleDates ? "text-[6.5vw] sm:text-3xl" : "text-[7vw] sm:text-4xl"
                      }`}
                    >
                      {config.year}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2 sm:gap-3">
                  <span className="hidden h-px w-6 bg-gold/60 sm:block sm:w-9" />
                  <SparkleGlyph className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.24em] sm:tracking-[0.4em] uppercase text-goldrich whitespace-nowrap">
                    {config.startTime} onwards
                  </span>
                  <SparkleGlyph className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  <span className="hidden h-px w-6 bg-gold/60 sm:block sm:w-9" />
                </div>

                {/* golden sheen sweep on reveal */}
                {revealed && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f4e2c466] to-transparent pointer-events-none"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.35 }}
                  />
                )}
              </motion.div>
            </div>

            <canvas
              ref={canvasRef}
              className={`absolute inset-0 touch-none transition-opacity duration-1000 ${
                revealed ? "opacity-0 pointer-events-none" : "opacity-100"
              } ${scratching.current ? "cursor-grabbing" : "cursor-grab"}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            />
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-6 font-sans text-[10px] tracking-[0.3em] uppercase text-ink-soft/80">
            {revealed ? (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1"
              >
                {multipleDates ? "Save the dates" : "Save the date"} ·
                <button
                  onClick={() => {
                    const ics = [
                      "BEGIN:VCALENDAR",
                      "VERSION:2.0",
                      ...config.events
                        .filter((ev) => ev.enabled)
                        .flatMap((ev, index) => [
                          "BEGIN:VEVENT",
                          `UID:${icsUtcStamp(ev.isoDate)}-${index}@uzair-rahma`,
                          `DTSTART:${icsUtcStamp(ev.isoDate)}`,
                          `DTEND:${icsUtcStamp(ev.isoDate, 5)}`,
                          `SUMMARY:${config.groom} weds ${config.bride} — ${ev.name}`,
                          `LOCATION:${ev.venue.replace(/,/g, "\\,")}`,
                          "END:VEVENT",
                        ]),
                      "END:VCALENDAR",
                    ].join("\r\n");
                    const blob = new Blob([ics], { type: "text/calendar" });
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = `${config.groom}-${config.bride}-wedding.ics`.toLowerCase();
                    a.click();
                  }}
                  className="inline-flex items-center gap-2 underline underline-offset-4 decoration-gold/60 text-goldrich hover:text-ink transition-colors"
                >
                  <CalendarPlus className="w-3.5 h-3.5" strokeWidth={1.6} />
                  Add to calendar
                </button>
              </motion.span>
            ) : progress > 0.04 ? (
              "keep scratching…"
            ) : (
              <button onClick={manualReveal} className="underline underline-offset-4 decoration-gold/50 hover:text-goldrich transition-colors">
                or tap here to reveal instantly
              </button>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
