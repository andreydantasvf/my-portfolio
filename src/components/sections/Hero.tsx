'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { site } from '@/data/site';
import { prefersReducedMotion } from '@/lib/motion';
import { Button } from '@/components/ui/Button';

function Typewriter({ words }: { words: readonly string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let word = 0;
    let i = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = words[word];
      setText(current.slice(0, i));
      if (!deleting && i === current.length) {
        deleting = true;
        timer = setTimeout(tick, 2200);
        return;
      }
      if (deleting && i === 0) {
        deleting = false;
        word = (word + 1) % words.length;
      }
      i += deleting ? -1 : 1;
      timer = setTimeout(tick, deleting ? 30 : 65);
    };
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span>
      {text}
      <span className="text-accent ml-0.5 inline-block w-[0.55em] animate-[pulse-dot_1s_steps(2)_infinite]">
        ▍
      </span>
    </span>
  );
}

/** Nome quebrado em letras para a entrada; leitores de tela recebem o nome inteiro. */
function SplitName({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={`block overflow-hidden pb-[0.06em] ${className ?? ''}`}
      aria-hidden
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="hero-char inline-block will-change-transform">
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.hero-char', {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.035,
        delay: 0.2
      })
        .from(
          '.hero-fade',
          { y: 24, opacity: 0, duration: 1.1, stagger: 0.09 },
          '-=1'
        )
        .from('.hero-scroll', { opacity: 0, duration: 1 }, '-=0.6');
    }, root);
    return () => ctx.revert();
  }, []);

  const [first, last] = site.name.split(' ');

  return (
    <section
      ref={root}
      id="topo"
      data-particles="face"
      className="relative z-10 flex min-h-svh items-end pt-28 pb-24 md:items-center md:pb-16"
    >
      <div className="container-site">
        <div className="max-w-4xl">
          <p className="hero-fade label flex items-center gap-2.5">
            <span className="bg-accent size-1.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full shadow-[0_0_10px_var(--accent)]" />
            {site.availability}
          </p>

          <h1
            aria-label={site.name}
            className="font-display mt-6 text-[clamp(64px,12.5vw,184px)] leading-[0.84] font-extrabold tracking-[-0.045em] uppercase"
          >
            <SplitName text={first} />
            <SplitName text={last} className="text-glow" />
          </h1>

          <p className="hero-fade text-fg-muted mt-8 font-mono text-sm tracking-wider md:text-base">
            <span className="text-accent">&gt;</span>{' '}
            <Typewriter words={site.roles} />
          </p>

          <p className="hero-fade text-fg-muted mt-5 max-w-xl text-lg leading-relaxed md:text-xl">
            Desenvolvedor full stack JavaScript/TypeScript. Crio aplicações web
            com React, Next.js, Node.js e NestJS, com atenção a performance,
            APIs bem desenhadas e interfaces cuidadas.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap gap-3">
            <Button href="#projetos">
              Ver projetos <ArrowDown size={14} />
            </Button>
            <Button href="#contato" variant="ghost">
              Fale comigo
            </Button>
          </div>

          <ul className="hero-fade label mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-fg flex items-center gap-2 transition-colors"
              >
                <Mail size={13} className="text-accent" /> E-mail
              </a>
            </li>
            <li>
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-fg flex items-center gap-2 transition-colors"
              >
                <Github size={13} /> GitHub
              </a>
            </li>
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-fg flex items-center gap-2 transition-colors"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hero-scroll label absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        Role
        <span className="bg-line relative h-12 w-px overflow-hidden">
          <span className="bg-accent absolute inset-x-0 top-0 h-1/2 animate-[scroll-line_1.8s_var(--ease-out-expo)_infinite]" />
        </span>
      </div>
    </section>
  );
}
