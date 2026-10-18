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
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled
          ? 'border-line/70 bg-bg/70 border-b backdrop-blur-md'
          : 'border-b border-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <a
          href="#topo"
          aria-label={site.name}
          className="group drop-shadow-[0_0_10px_var(--accent-glow)]"
        >
          {/* símbolo em azul via máscara: a cor vem do token --accent */}
          <span
            aria-hidden
            className="bg-accent block size-8 transition-transform duration-500 [mask:url(/brand/mark.png)_center/contain_no-repeat] group-hover:rotate-[-8deg]"
          />
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
