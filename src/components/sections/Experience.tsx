import { Section, SectionHeader } from '@/components/ui/Section';
import { GitTimeline } from './GitTimeline';

export function Experience() {
  return (
    // overflow-x-clip: os cards entram deslizando da direita e, no celular,
    // passariam da borda da tela antes de aparecer
    <Section id="experiencia" particles="helix" className="overflow-x-clip">
      <div className="container">
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
