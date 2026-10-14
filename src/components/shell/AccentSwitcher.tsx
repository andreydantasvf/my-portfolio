'use client';

import { accents, setAccent, useAccentId } from '@/lib/accent';
import { cn } from '@/lib/utils';

/** Bolinhas que trocam a cor de destaque do site inteiro. */
export function AccentSwitcher() {
  const current = useAccentId();

  return (
    <div
      role="radiogroup"
      aria-label="Cor de destaque"
      className="flex items-center gap-1.5"
    >
      {accents.map(a => (
        <button
          key={a.id}
          role="radio"
          aria-checked={current === a.id}
          aria-label={a.label}
          onClick={() => setAccent(a.id)}
          className={cn(
            'ring-offset-bg size-3.5 rounded-full ring-offset-2 transition-transform duration-300 hover:scale-125',
            current === a.id && 'ring-fg/70 ring-1'
          )}
          style={{ backgroundColor: a.hex }}
        />
      ))}
    </div>
  );
}
