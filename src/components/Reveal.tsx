import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: (d: number) => ({
    opacity: 0,
    y: d,
  }),
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function Reveal({
  children,
  delay = 0,
  distance = 44,
  duration = 1.1,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      custom={distance}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.35 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Ornamental flourish divider — lines, diamond and curls */
export function Ornament({ className = "", tone = "#b98f5c" }: { className?: string; tone?: string }) {
  return (
    <svg viewBox="0 0 320 24" className={className} fill="none" aria-hidden>
      <g stroke={tone} strokeWidth="1">
        <line x1="8" y1="12" x2="128" y2="12" opacity="0.7" />
        <line x1="192" y1="12" x2="312" y2="12" opacity="0.7" />
        <path d="M128 12c8-7 16-7 22 0-6 7-14 7-22 0Z" opacity="0.9" />
        <path d="M192 12c-8-7-16-7-22 0 6 7 14 7 22 0Z" opacity="0.9" />
      </g>
      <rect x="154.5" y="6.5" width="11" height="11" transform="rotate(45 160 12)" fill={tone} />
      <circle cx="8" cy="12" r="2" fill={tone} />
      <circle cx="312" cy="12" r="2" fill={tone} />
    </svg>
  );
}

/** Small four-point sparkle used as a decorative glyph */
export function SparkleGlyph({ className = "", tone = "#b98f5c" }: { className?: string; tone?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={tone} aria-hidden>
      <path d="M12 1c.7 5.8 4.5 9.6 11 11-6.5 1.4-10.3 5.2-11 11-.7-5.8-4.5-9.6-11-11C7.5 10.6 11.3 6.8 12 1Z" />
    </svg>
  );
}
