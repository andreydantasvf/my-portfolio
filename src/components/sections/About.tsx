import { projects } from '@/data/projects';
import { getContributionsLastYear } from '@/lib/github';
import { SectionObject } from '@/components/three/lazy';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';

export async function About() {
  const contributions = await getContributionsLastYear();

  const stats = [
    {
      value: projects.filter(p => p.kind === 'Produção').length,
      label: 'produtos em produção'
    },
    {
      value: projects.filter(p => p.kind === 'Cliente').length,
      label: 'clientes atendidos'
    },
    ...(contributions
      ? [
          {
            value: contributions,
            label: 'contribuições no GitHub no último ano'
          }
        ]
      : [])
  ];

  return (
    <Section id="sobre" particles="field">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <SectionHeader
            index={1}
            label="Sobre"
            title={
              <>
                Construo os sistemas <em>por trás</em> do produto.
              </>
            }
          />
          <Reveal className="text-fg-muted mt-8 max-w-2xl space-y-5 text-lg leading-relaxed">
            <p>
              Sou desenvolvedor full stack em Patos, na Paraíba. Gosto de pegar
              um problema real e levar até produção: modelagem do banco, API,
              interface, deploy e o que acontece depois que o primeiro usuário
              chega.
            </p>
            <p>
              No <strong className="text-fg font-medium">Patos Empregos</strong>
              , empresas pagam via PIX e a vaga sai sozinha no site e no
              WhatsApp de centenas de pessoas. No{' '}
              <strong className="text-fg font-medium">Racing of Legends</strong>
              , filas com BullMQ e Redis processam partidas em segundo plano.
              Também atendo negócios locais com sites rápidos e bem posicionados
              no Google.
            </p>
          </Reveal>

          <Reveal
            as="dl"
            className="mt-12 grid gap-4 sm:grid-cols-3"
            stagger={0.12}
          >
            {stats.map(s => (
              <div
                key={s.label}
                className="energy-border bg-navy-900/70 rounded-2xl p-6 backdrop-blur-sm"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-accent text-5xl font-semibold tracking-tight">
                  <CountUp value={s.value} />
                </dd>
                <dd className="text-fg-muted mt-3 text-sm leading-relaxed">
                  {s.label}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="bg-accent/10 absolute inset-[15%] rounded-full blur-3xl" />
          <SectionObject kind="rack" className="h-full w-full" />
          <p className="label absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-accent">●</span> server.rack — online
          </p>
        </div>
      </div>
    </Section>
  );
}
