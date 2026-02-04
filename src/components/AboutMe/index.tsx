import Image from 'next/image';
import { SectionTitle } from '../SectionTitle';

export const AboutMe = () => {
  return (
    <section id="about" className="md:mt-20">
      <SectionTitle title="Sobre Mim" imageUrl="/title-icons/trident.svg" />

      <div className="relative mt-5 flex flex-col items-center gap-6 md:mt-10 md:flex-row md:justify-between md:pr-5 md:pb-5">
        <Image
          width={360}
          height={360}
          src="/section-images/statue-zeus.png"
          alt="Estátua de Zeus"
          quality={100}
          className="h-40 w-40 md:h-auto md:w-auto"
        />

        <div className="space-y-3 text-justify md:max-w-[60%]">
          <p>
            Olá! Meu nome é <span className="font-bold">Andrey Dantas</span> e
            sou um Engenheiro de Software com foco na contrução e otimização de
            aplicações Full-Stack robustas e escaláveis.
          </p>

          <p>
            Meu trabalho é transformar requisitos complexos em soluções digitais
            eficientes, utilizando stacks modernas como{' '}
            <span className="font-bold">
              JavaScript/Typescript, React, Next.js, Tailwind, Node.js, Python,
              Flask
            </span>
            . Além disso, tenho proficiência em{' '}
            <span className="font-bold">
              Docker, bancos de dados SQL/NoSQL (Postgres, Mongo DB) e
              certificação AWS Certified Cloud Practitioner
            </span>{' '}
            , estou preparado para atuar em todo o ciclo de vida do
            desenvolvimento, desde o design de UI/UX até a implementação segura
            e o deployment em ambientes cloud.
          </p>

          <p>
            Busco desafios que exijam excelência técnica e um compromisso com a
            escalabilidade do produto.
          </p>
        </div>

        <div className="border-primaryColor border-anim absolute top-0 right-0 hidden h-8 w-8 border-t-8 border-r-8 xl:block" />
        <div className="border-primaryColor border-anim absolute bottom-0 left-0 hidden h-8 w-8 border-b-8 border-l-8 xl:block" />
      </div>
    </section>
  );
};
