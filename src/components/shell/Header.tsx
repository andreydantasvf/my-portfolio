'use client';

import { useEffect, useState } from 'react';
import { nav } from '@/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0.5 z-40 transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled
          ? 'border-line/70 bg-bg/70 border-b backdrop-blur-md'
          : 'border-b border-transparent'
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <a href="#topo" className="text-fg font-mono text-sm tracking-wider">
          andrey<span className="text-accent">.</span>dev
        </a>

        <nav aria-label="Seções" className="hidden md:block">
          <ol className="flex items-center gap-8">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group label hover:text-fg flex items-center gap-2 transition-colors"
                >
                  <span className="text-accent/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="#contato"
            className="label border-line text-fg hover:border-accent hidden rounded-full border px-4 py-2 transition-colors sm:inline-block"
          >
            Contato
          </a>
        </div>
      </div>
    </header>
  );
}
