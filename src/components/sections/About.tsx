import { getContributionsLastYear } from '@/lib/github';
import { SectionObject } from '@/components/three/lazy';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';

export async function About() {
  const contributions = await getContributionsLastYear();

  // primeiro emprego na área: mai 2023 (ver data/experience.ts)
  const years = Math.floor(
    (Date.now() - new Date(2023, 4).getTime()) / (365.25 * 24 * 3600 * 1000)
  );

  const stats = [
    { value: years, suffix: '+', label: 'anos de experiência no mercado' },

    ...(contributions
      ? [
          {
            value: contributions,
            suffix: '',
            label: 'contribuições no GitHub no último ano'
          }
        ]
      : [])
  ];

  return (
    <Section id="sobre" particles="field">
      <div className="container grid items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <SectionHeader
            index={1}
            label="Sobre"
            title={
              <>
                Do banco de dados à <em>interface</em>.
              </>
            }
          />
          <Reveal className="text-fg-muted mt-8 max-w-2xl space-y-5 text-lg leading-relaxed">
            <p>
              Sou desenvolvedor full stack JavaScript/TypeScript e estudante de
              Ciência da Computação na UEPB. Trabalho com React, Next.js,
              Node.js, NestJS e Python, e gosto de entender cada problema de
              ponta a ponta: da modelagem do banco à última animação da tela.
            </p>
            <p>
              A IA faz parte do meu fluxo de trabalho. Uso{' '}
              <strong className="text-fg font-medium">Claude Code</strong> e{' '}
              <strong className="text-fg font-medium">Codex</strong> no dia a
              dia, com agentes que me ajudam a explorar o código, implementar e
              testar. Trabalho com desenvolvimento orientado por especificação:
              primeiro defino o que precisa ser feito, depois a IA executa. LLMs
              também entram na revisão de código, mas toda mudança passa pela
              minha revisão antes de entrar no projeto.
            </p>
          </Reveal>

          <Reveal
            as="dl"
            className="mt-12 grid gap-4 sm:grid-cols-2"
            stagger={0.12}
          >
            {stats.map(s => (
              <div
                key={s.label}
                className="energy-border bg-navy-900/70 rounded-2xl p-6 backdrop-blur-sm"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-accent text-5xl font-semibold tracking-tight">
                  <CountUp value={s.value} suffix={s.suffix} />
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
