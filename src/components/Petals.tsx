/** soft drifting petals shared across screens */
export function PetalField({ count = 14, tone = "bg-blush/45" }: { count?: number; tone?: string }) {
  const petals = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((_, i) => {
        const left = (i * 71) % 100;
        const size = 7 + ((i * 13) % 11);
        const delay = (i * 1.7) % 8;
        const dur = 9 + ((i * 5) % 7);
        return (
          <span
            key={i}
            className={`absolute rounded-[60%_40%_55%_45%] ${tone}`}
            style={{
              left: `${left}%`,
              top: "105%",
              width: size,
              height: size * 0.8,
              animation: `drift ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
