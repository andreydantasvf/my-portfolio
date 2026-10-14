import type { MarqueeItem } from '@/data/stack';
import { cn } from '@/lib/utils';

/** Faixa diagonal com tecnologias correndo; pausa no hover. */
export function MarqueeBand({
  items,
  reverse = false,
  tilt = -2,
  className
}: {
  items: MarqueeItem[];
  reverse?: boolean;
  tilt?: number;
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div
      aria-hidden
      className={cn(
        'group relative -mx-10 overflow-hidden border-y py-5',
        className
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee 40s linear infinite ${reverse ? 'reverse' : ''}`
        }}
      >
        {loop.map(({ label, icon: Icon }, i) => (
          <span
            key={i}
            className="flex items-center gap-3 pr-14 font-mono text-sm tracking-[0.14em] whitespace-nowrap uppercase"
          >
            <Icon className="size-5 shrink-0" />
            {label}
            <span className="text-accent/70 pl-11">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
