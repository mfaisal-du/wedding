/**
 * Hand-drawn South-Asian / Mughal inspired SVG ornamentation:
 * paisleys (keri), jasmine strings, corner vines, mandala rings, ogee arch.
 */

export function Paisley({
  className = "",
  tone = "#b98f5c",
  fill = false,
}: {
  className?: string;
  tone?: string;
  fill?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 130" className={className} aria-hidden>
      <path
        d="M50 6c22 8 38 24 38 50 0 34-22 64-50 68C16 128 2 108 8 88c5-17 22-26 36-20-16-3-30-24-24-44C26 10 38 4 50 6Z"
        fill={fill ? tone : "none"}
        fillOpacity={fill ? 0.14 : 0}
        stroke={tone}
        strokeWidth="1.6"
      />
      <path
        d="M48 22c14 6 23 18 22 34-1 16-14 28-28 28-10 0-17-7-16-15 1-7 9-11 15-8-9-4-14-14-11-23 3-10 11-16 18-16Z"
        fill="none"
        stroke={tone}
        strokeWidth="1.1"
        opacity="0.75"
      />
      <circle cx="41" cy="70" r="4.5" fill="none" stroke={tone} strokeWidth="1" />
      <circle cx="41" cy="70" r="1.4" fill={tone} />
      <g fill={tone}>
        <circle cx="60" cy="34" r="1.5" />
        <circle cx="68" cy="46" r="1.5" />
        <circle cx="70" cy="60" r="1.5" />
        <circle cx="66" cy="74" r="1.5" />
        <circle cx="56" cy="84" r="1.5" />
      </g>
      <path d="M30 96c6 8 16 12 26 10" fill="none" stroke={tone} strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function CornerVine({ className = "", tone = "#b98f5c" }: { className?: string; tone?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g fill="none" stroke={tone} strokeWidth="1.4" strokeLinecap="round">
        <path d="M6 6C60 30 96 62 106 108c6 30 22 52 52 64" />
        <path d="M40 22c4 14 2 26-7 36M72 44c8 10 10 22 4 34M96 78c10 6 16 16 14 28" opacity="0.8" />
      </g>
      {[
        { x: 33, y: 60, r: -30 },
        { x: 78, y: 80, r: 15 },
        { x: 112, y: 108, r: 40 },
      ].map((l, i) => (
        <path
          key={i}
          d="M0 0c10-8 24-8 32 2C22 10 8 9 0 0Z"
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
          fill={tone}
          fillOpacity="0.25"
          stroke={tone}
          strokeWidth="1"
        />
      ))}
      <g fill={tone}>
        <circle cx="158" cy="172" r="3" />
        <circle cx="168" cy="178" r="2.2" />
        <circle cx="150" cy="181" r="2.2" />
        <circle cx="160" cy="186" r="1.6" />
      </g>
      <circle cx="8" cy="8" r="4" fill="none" stroke={tone} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="1.3" fill={tone} />
    </svg>
  );
}

export function JasmineString({
  className = "",
  tone = "#8fa07d",
  bloom = "#fdf6ec",
}: {
  className?: string;
  tone?: string;
  bloom?: string;
}) {
  const buds = [26, 52, 78, 104, 130];
  return (
    <svg viewBox="0 0 40 170" className={className} aria-hidden>
      <path d="M20 0v150" stroke={tone} strokeWidth="1.4" strokeLinecap="round" />
      {[34, 70, 106].map((y, i) => (
        <g key={i}>
          <path
            d="M20 0c-9-2-15 3-17 10 8 1 15-2 17-10Z"
            transform={`translate(20 ${y}) rotate(${i % 2 ? 12 : -8}) scale(-1 1)`}
            fill={tone}
            fillOpacity="0.55"
          />
          <path
            d="M20 0c-9-2-15 3-17 10 8 1 15-2 17-10Z"
            transform={`translate(20 ${y}) rotate(${i % 2 ? -10 : 8})`}
            fill={tone}
            fillOpacity="0.55"
          />
        </g>
      ))}
      {buds.map((y, i) => (
        <g key={i} transform={`translate(20 ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-4.4" rx="2.1" ry="3.4" transform={`rotate(${a})`} fill={bloom} stroke={tone} strokeWidth="0.5" />
          ))}
          <circle r="2" fill="#d9b98d" />
        </g>
      ))}
      <path d="M20 150c-3 5-3 9 0 13 3-4 3-8 0-13Z" fill={bloom} stroke={tone} strokeWidth="0.8" />
    </svg>
  );
}

export function MandalaRing({ className = "", tone = "#b98f5c" }: { className?: string; tone?: string }) {
  const petals = Array.from({ length: 16 });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <circle cx="100" cy="100" r="97" fill="none" stroke={tone} strokeWidth="0.8" opacity="0.6" />
      <circle cx="100" cy="100" r="64" fill="none" stroke={tone} strokeWidth="0.8" strokeDasharray="2 5" opacity="0.7" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${(360 / 16) * i} 100 100)`}>
          <path d="M100 12c7 12 7 24 0 36-7-12-7-24 0-36Z" fill="none" stroke={tone} strokeWidth="1" opacity="0.85" />
          <circle cx="100" cy="56" r="1.6" fill={tone} opacity="0.8" />
        </g>
      ))}
      <circle cx="100" cy="100" r="40" fill="none" stroke={tone} strokeWidth="1" opacity="0.9" />
    </svg>
  );
}

/** twin hearts entwined with a vine — used as a side flourish */
export function HeartFlourish({
  className = "",
  tone = "#b98f5c",
  blush = "#e0b3a0",
}: {
  className?: string;
  tone?: string;
  blush?: string;
}) {
  return (
    <svg viewBox="0 0 80 160" className={className} aria-hidden>
      <path
        d="M40 8c34 22 30 48 6 62-20 12-26 30-14 44 10 12 30 16 44 8"
        fill="none"
        stroke={tone}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      {[
        { x: 40, y: 40, s: 1.15 },
        { x: 30, y: 96, s: 0.85 },
        { x: 50, y: 128, s: 0.6 },
      ].map((h, i) => (
        <g key={i} transform={`translate(${h.x} ${h.y}) scale(${h.s})`}>
          <path
            d="M0 12C-14 2-18-10-9-16c5-3 9 0 9 4 0-4 4-7 9-4 9 6 5 18-9 28Z"
            fill={i === 0 ? blush : "none"}
            fillOpacity={i === 0 ? 0.35 : 0}
            stroke={tone}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </g>
      ))}
      {[22, 58, 112, 140].map((y, i) => (
        <path
          key={y}
          d="M0 0c8-5 16-3 18 4-8 4-15 2-18-4Z"
          transform={`translate(${i % 2 ? 46 : 20} ${y}) rotate(${i % 2 ? 24 : -24}) ${i % 2 ? "" : "scale(-1 1)"}`}
          fill={tone}
          fillOpacity="0.22"
          stroke={tone}
          strokeWidth="0.9"
        />
      ))}
    </svg>
  );
}

/** a small rose-and-leaf sprig */
export function FlowerSprig({
  className = "",
  tone = "#b98f5c",
  petal = "#e0b3a0",
}: {
  className?: string;
  tone?: string;
  petal?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M32 58V30" stroke={tone} strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M32 46c-8 0-13-4-14-11 8-1 13 3 14 11Z"
        fill={tone}
        fillOpacity="0.2"
        stroke={tone}
        strokeWidth="1"
      />
      <path
        d="M32 39c8-1 13-5 13-12-8 0-13 4-13 12Z"
        fill={tone}
        fillOpacity="0.2"
        stroke={tone}
        strokeWidth="1"
      />
      {/* rose head */}
      <g transform="translate(32 20)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-7.5"
            rx="4.6"
            ry="7"
            transform={`rotate(${a})`}
            fill={petal}
            fillOpacity="0.55"
            stroke={tone}
            strokeWidth="0.8"
          />
        ))}
        <circle r="3.6" fill={petal} stroke={tone} strokeWidth="0.9" />
        <circle r="1.3" fill={tone} />
      </g>
    </svg>
  );
}

/** refined calligraphy cartouche for the opening invocation */
export function Bismillah({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex w-full items-center justify-center gap-2.5 sm:gap-4">
        <span className="h-px min-w-3 flex-1 max-w-8 bg-gradient-to-l from-gold/70 to-transparent sm:max-w-16" />
        <svg viewBox="0 0 10 10" className="h-1.5 w-1.5 rotate-45 shrink-0" fill="#b98f5c">
          <rect x="1.8" y="1.8" width="6.4" height="6.4" />
        </svg>
        <div className="relative shrink-0 rounded-full border border-gold/60 bg-[radial-gradient(120%_140%_at_50%_0%,#52161f_0%,#45121a_55%,#380e15_100%)] px-4 py-2.5 shadow-[0_16px_34px_-18px_rgba(0,0,0,0.85)] sm:px-6 sm:py-3.5">
          <span className="pointer-events-none absolute inset-[3px] rounded-full border border-gold/30" />
          <span
            lang="ar"
            dir="rtl"
            className={`relative block whitespace-nowrap font-arabic text-goldrich drop-shadow-[0_2px_8px_rgba(151,115,64,0.35)] ${
              compact ? "text-base leading-[1.9] sm:text-lg" : "text-lg leading-[1.9] sm:text-2xl"
            }`}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        </div>
        <svg viewBox="0 0 10 10" className="h-1.5 w-1.5 rotate-45 shrink-0" fill="#b98f5c">
          <rect x="1.8" y="1.8" width="6.4" height="6.4" />
        </svg>
        <span className="h-px min-w-3 flex-1 max-w-8 bg-gradient-to-r from-gold/70 to-transparent sm:max-w-16" />
      </div>
      {!compact && (
        <p className="mt-3.5 text-center font-sans text-[8px] uppercase tracking-[0.42em] text-ink-soft/90 sm:text-[9px]">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
      )}
    </div>
  );
}

/** ogee (Mughal) arch frame used behind monograms */
export function ArchFrame({ className = "", tone = "#b98f5c" }: { className?: string; tone?: string }) {
  return (
    <svg viewBox="0 0 240 320" className={className} aria-hidden>
      <path
        d="M120 12c6 14 22 24 40 30 34 12 58 40 58 82v184H22V124c0-42 24-70 58-82 18-6 34-16 40-30Z"
        fill="none"
        stroke={tone}
        strokeWidth="1.6"
      />
      <path
        d="M120 30c5 12 19 20 34 26 30 10 50 34 50 68v166H36V124c0-34 20-58 50-68 15-6 29-14 34-26Z"
        fill="none"
        stroke={tone}
        strokeWidth="0.8"
        opacity="0.65"
      />
      <g fill={tone} opacity="0.9">
        <circle cx="120" cy="5" r="2" />
        <circle cx="22" cy="308" r="0" />
      </g>
      <path d="M120 0v14" stroke={tone} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="120" cy="4" r="2.4" fill={tone} />
    </svg>
  );
}
