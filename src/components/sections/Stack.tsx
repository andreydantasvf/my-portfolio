import {
  coreStack,
  stackGroups,
  stackMarquee,
  toolsMarquee
} from '@/data/stack';
import { SectionObject } from '@/components/three/lazy';
import { MarqueeBand } from '@/components/ui/MarqueeBand';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';

export function Stack() {
  return (
    <Section id="stack" particles="wave" className="overflow-x-clip">
      {/* duas faixas em ângulos opostos; o espaço evita que se cruzem nas bordas em telas largas */}
      <div className="mb-24 flex flex-col gap-14 md:mb-32 md:gap-24">
        <MarqueeBand
          items={stackMarquee}
          className="border-accent/60 bg-accent/10 text-fg shadow-[0_0_40px_-12px_var(--accent)]"
        />
        <MarqueeBand
          items={toolsMarquee}
          reverse
          tilt={1.5}
          className="border-line bg-navy-950/90 text-fg-muted"
        />
      </div>

      <div className="container-site grid items-start gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <SectionHeader
            index={3}
            label="Stack"
            title={
              <>
                Ferramentas do <em>dia a dia</em>.
              </>
            }
            lead="TypeScript de ponta a ponta. O resto é escolhido pelo problema, não pela moda."
          />

          <Reveal className="mt-10 flex flex-wrap gap-3" stagger={0.05}>
            {coreStack.map(item => (
              <span
                key={item}
                className="energy-border bg-navy-900/80 font-display rounded-xl px-5 py-3 text-lg font-semibold tracking-tight backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </Reveal>

          <Reveal
            className="border-line bg-line mt-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 sm:[&>:last-child:nth-child(odd)]:col-span-2"
            stagger={0.06}
          >
            {stackGroups.map(group => (
              <div key={group.title} className="bg-bg/90 p-6 backdrop-blur-sm">
                <h3 className="label text-accent">{group.title}</h3>
                <ul className="text-fg-muted mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {group.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:sticky lg:top-24">
          <div className="bg-accent/10 absolute inset-[18%] rounded-full blur-3xl" />
          <SectionObject kind="database" className="h-full w-full" />
          <p className="label absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-accent">●</span> postgres — online
          </p>
        </div>
      </div>
    </Section>
  );
}
