import { ArrowUpRight } from 'lucide-react';
import { site } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ContactForm } from './ContactForm';

export function Contact() {
  const socials = [
    { label: 'GitHub', href: site.social.github },
    { label: 'LinkedIn', href: site.social.linkedin },
    { label: 'Instagram', href: site.social.instagram }
  ];

  return (
    <Section id="contato" particles="orb">
      <div className="container-site grid items-start gap-16 lg:grid-cols-2">
        <div>
          <SectionHeader
            index={5}
            label="Contato"
            title={
              <>
                Vamos construir <em>algo</em>?
              </>
            }
            lead="Aberto a novas oportunidades e a conversar sobre projetos. E-mail é o caminho mais rápido."
          />
          <Reveal className="mt-10 space-y-8">
            <a
              href={`mailto:${site.email}`}
              className="group font-display inline-flex items-center gap-3 text-[clamp(22px,3vw,36px)] font-semibold tracking-tight break-all"
            >
              <span className="ease-out-expo bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {site.email}
              </span>
              <ArrowUpRight className="text-accent ease-out-expo shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <ul className="flex flex-wrap gap-3">
              {socials.map(s => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label border-line hover:border-accent hover:text-fg inline-flex items-center gap-1.5 rounded-full border px-4 py-2 transition-colors"
                  >
                    {s.label} <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
