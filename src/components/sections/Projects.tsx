import { projects } from '@/data/projects';
import { SectionObject } from '@/components/three/lazy';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ProjectsRail } from './ProjectsRail';

export function Projects() {
  return (
    <Section id="projetos" particles="ring" className="overflow-x-clip">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <SectionHeader
          index={3}
          label="Projetos"
          title={
            <>
              Trabalho <em>selecionado</em>.
            </>
          }
          lead="Produtos próprios em produção, sites para clientes e projetos abertos. Cada um resolveu um problema real."
        />
        <div className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block">
          <SectionObject kind="network" className="h-full w-full" />
          <p className="label absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-accent">●</span> sistemas distribuídos
          </p>
        </div>
      </div>

      <div className="mt-12 lg:mt-4">
        <ProjectsRail projects={projects} />
      </div>
    </Section>
  );
}
