import { Section, SectionHeader } from '@/components/ui/Section';
import { GitTimeline } from './GitTimeline';

export function Experience() {
  return (
    <Section id="experiencia" particles="helix">
      <div className="container-site">
        <SectionHeader
          index={2}
          label="Experiência"
          title={
            <>
              Minha trajetória em <em>commits</em>.
            </>
          }
          lead="Do curso técnico ao trabalho atual. Cada nó é um passo da carreira, e as branches mostram o que acontece em paralelo."
        />
        <div className="mt-14 max-w-3xl">
          <GitTimeline />
        </div>
      </div>
    </Section>
  );
}
