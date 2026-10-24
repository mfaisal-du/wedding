import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparkleGlyph } from "./Reveal";
import { PetalField } from "./Petals";
import { Paisley } from "./Ornaments";
import type { WeddingConfig } from "../config/wedding";

/**
 * Full-screen sealed envelope. One tap unseals it:
 * flap folds back, the invitation card rises, then the whole
 * veil dissolves into the hero — mirroring the reference opening.
 */
export function EnvelopeIntro({
  config,
  onOpened,
  onFirstTap,
}: {
  config: WeddingConfig;
  onOpened: () => void;
  onFirstTap?: () => void;
}) {
  const [stage, setStage] = useState<"sealed" | "opening" | "gone">("sealed");
  const [flapBehind, setFlapBehind] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    // fired within the same user gesture so the soundtrack may begin
    onFirstTap?.();
    window.setTimeout(() => {
      setStage("gone");
      document.body.style.overflow = "";
      onOpened();
    }, 2400);
  };

  const initials = `${config.groom.charAt(0)}·${config.bride.charAt(0)}`.toUpperCase();
  const monthShort = config.month.slice(0, 3);

  return (
    <AnimatePresence>
      {stage !== "gone" && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream texture-grain overflow-hidden"
          exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <PetalField />

          {/* ------ envelope ------ */}
          <motion.button
            onClick={open}
            aria-label="Open your invitation"
            className="relative block cursor-pointer outline-none"
            style={{ perspective: 1400 }}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{
              opacity: 1,
              y: stage === "opening" ? "100%" : 0,
              scale: stage === "opening" ? 1.04 : 1,
            }}
            transition={{
              opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              y:
                stage === "opening"
                  ? { delay: 0.9, duration: 1.05, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 1, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            }}
            whileHover={stage === "sealed" ? { y: -6 } : undefined}
          >
            <div className="relative w-[min(86vw,300px)] h-[min(60vw,210px)] sm:w-[380px] sm:h-[260px]">
              {/* invitation card — sits between the back wall and the front
                  folds, so it rises out of the envelope opening */}
              <motion.div
                className="pointer-events-none absolute left-1/2 top-[6%] z-[3] w-[86%] h-[88%] -translate-x-1/2 rounded-md paper-card gold-frame shadow-[0_18px_50px_-20px_rgba(70,53,39,0.45)] flex flex-col items-center justify-center gap-1 sm:gap-1.5 px-3"
                initial={{ opacity: 0 }}
                animate={
                  stage === "opening"
                    ? {
                        y: "-112%",
                        opacity: 1,
                        transition: {
                          y: { delay: 0.9, duration: 1.05, ease: [0.22, 1, 0.36, 1] },
                          opacity: { delay: 0.55, duration: 0.35 },
                        },
                      }
                    : { y: "0%", opacity: 0 }
                }
              >
                <SparkleGlyph className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-80" />
                <p className="font-sans text-[7px] sm:text-[9px] tracking-[0.34em] sm:tracking-[0.42em] uppercase text-ink-soft text-center leading-relaxed">
                  The {config.eventLabel} of
                </p>
                <p className="font-script text-lg sm:text-2xl text-goldrich leading-tight text-center max-w-full px-1 break-words">
                  {config.groom} <span className="font-serif text-sm italic sm:text-base">weds</span> {config.bride}
                </p>
                <div className="w-10 h-px bg-gold/60 my-0.5 sm:my-1" />
                <p className="font-sans text-[7px] sm:text-[9px] tracking-[0.26em] sm:tracking-[0.3em] uppercase text-ink-soft text-center">
                  {config.day} · {monthShort} · {config.year}
                </p>
              </motion.div>

              {/* envelope back wall — behind the card */}
              <div className="absolute inset-0 z-[1] overflow-hidden rounded-lg shadow-[0_30px_70px_-25px_rgba(70,53,39,0.55)]">
                <svg viewBox="0 0 380 260" preserveAspectRatio="none" className="w-full h-full" aria-hidden>
                  <defs>
                    <linearGradient id="env" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f3e2cd" />
                      <stop offset="100%" stopColor="#e8d0b4" />
                    </linearGradient>
                  </defs>
                  <rect width="380" height="260" fill="url(#env)" />
                </svg>
              </div>

              {/* envelope front folds — these cover the lower part of the card
                  so it reads as tucked inside the pocket, not behind it */}
              <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-lg">
                <svg viewBox="0 0 380 260" preserveAspectRatio="none" className="w-full h-full" aria-hidden>
                  <defs>
                    <linearGradient id="envside" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#eddbc3" />
                      <stop offset="100%" stopColor="#dfc4a3" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0 L150 130 L0 260 Z" fill="url(#envside)" />
                  <path d="M380 0 L230 130 L380 260 Z" fill="url(#envside)" />
                  <path d="M0 260 L190 96 L380 260 Z" fill="#f4e5cf" stroke="#b98f5c33" strokeWidth="1" />
                </svg>
                {/* "Open your invitation" lettered on the envelope, like the reference keepsake */}
                <div className="absolute inset-x-0 bottom-[9%] flex flex-col items-center gap-1">
                  <span className="font-script text-[22px] sm:text-[27px] leading-none text-[#8a6538] drop-shadow-[0_1px_0_rgba(255,248,235,0.7)]">
                    Open your invitation
                  </span>
                  <svg viewBox="0 0 120 10" className="w-24 opacity-70" aria-hidden>
                    <path d="M4 5c24-6 38-6 56 0s32 6 56 0" fill="none" stroke="#b98f5c" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* paisley flourishes tucked at the envelope corners */}
              <div className="absolute -left-4 -bottom-6 w-12 sm:-left-7 sm:-bottom-8 sm:w-20 z-[6] pointer-events-none">
                <Paisley className="w-full sway-l" tone="#a97f4b" />
              </div>
              <div className="absolute -right-4 -bottom-6 w-12 sm:-right-7 sm:-bottom-8 sm:w-20 z-[6] -scale-x-100 pointer-events-none">
                <Paisley className="w-full sway-r" tone="#a97f4b" />
              </div>

              {/* top flap */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[54%] origin-top"
                style={{ transformStyle: "preserve-3d", zIndex: flapBehind ? 2 : 8 }}
                animate={stage === "opening" ? { rotateX: -178 } : { rotateX: 0 }}
                transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
                onAnimationComplete={() => {
                  if (stage === "opening") setFlapBehind(true);
                }}
              >
                <svg viewBox="0 0 380 144" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_10px_16px_rgba(70,53,39,0.25)]">
                  <defs>
                    <linearGradient id="flap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#eeddc5" />
                      <stop offset="100%" stopColor="#e2c6a4" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0 H380 L190 144 Z" fill="url(#flap)" stroke="#b98f5c3d" strokeWidth="1" />
                </svg>
                <div
                  className="absolute inset-0 rounded-t-lg"
                  style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
                />
              </motion.div>

              {/* wax seal */}
              <motion.div
                className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 z-[9]"
                animate={
                  stage === "opening"
                    ? { scale: 0.4, opacity: 0, rotate: -30, transition: { duration: 0.4 } }
                    : { scale: 1, opacity: 1 }
                }
              >
                <div className="relative w-[72px] h-[72px] sm:w-24 sm:h-24">
                  <span className="absolute inset-0 rounded-full bg-goldrich/70" style={{ animation: "pulse-ring 2.4s ease-out infinite" }} />
                  <svg viewBox="0 0 100 100" className="relative w-full h-full drop-shadow-[0_6px_14px_rgba(70,53,39,0.4)]">
                    <defs>
                      <radialGradient id="wax" cx="35%" cy="30%" r="80%">
                        <stop offset="0%" stopColor="#caa06b" />
                        <stop offset="60%" stopColor="#a97f4b" />
                        <stop offset="100%" stopColor="#8a6538" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M50 4c10 0 14 5 23 7s16 1 20 9-1 13 1 22 6 13 1 22-12 8-18 15-6 15-16 17-15-4-24-4-16 6-24 1-4-14-9-21-11-9-9-19 9-12 11-21-1-16 8-21 15 1 24-2S40 4 50 4Z"
                      fill="url(#wax)"
                    />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#f4e2c480" strokeWidth="1.4" />
                    <text
                      x="50"
                      y="57.5"
                      textAnchor="middle"
                      textLength="40"
                      lengthAdjust="spacingAndGlyphs"
                      fontFamily="Great Vibes, cursive"
                      fontSize="21"
                      fill="#f7ead6"
                    >
                      {initials}
                    </text>
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.button>

          {/* tap hint */}
          <motion.div
            className="absolute inset-x-0 bottom-[12vh] flex flex-col items-center gap-4"
            animate={stage === "opening" ? { opacity: 0, y: 10 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="font-serif italic text-xl sm:text-2xl text-goldrich"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              Tap to open
            </motion.span>
            <div className="flex items-center gap-3 text-ink-soft">
              <span className="w-10 h-px bg-gold/50" />
              <SparkleGlyph className="w-3 h-3" />
              <span className="w-10 h-px bg-gold/50" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
