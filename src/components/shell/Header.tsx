'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { nav, site } from '@/data/site';
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
          andrey dantas
        </a>

        <nav aria-label="Seções" className="hidden md:block">
          <ol className="flex items-center gap-8">
            {nav.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="label hover:text-fg transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <a
          href={site.resume}
          download
          className="label border-line text-fg hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors"
        >
          <Download size={13} /> Currículo
        </a>
      </div>
    </header>
  );
}
