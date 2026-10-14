import { cn } from '@/lib/utils';

/** Faixa diagonal com texto correndo; pausa no hover. */
export function MarqueeBand({
  items,
  reverse = false,
  tilt = -2,
  className
}: {
  items: readonly string[];
  reverse?: boolean;
  tilt?: number;
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div
      aria-hidden
      className={cn(
        'group relative -mx-10 overflow-hidden border-y py-4',
        className
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee 36s linear infinite ${reverse ? 'reverse' : ''}`
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-14 pr-14 font-mono text-sm tracking-[0.14em] whitespace-nowrap uppercase"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
