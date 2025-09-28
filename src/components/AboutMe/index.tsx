import Image from 'next/image';
import { SectionTitle } from '../SectionTitle';

export const AboutMe = () => {
  return (
    <section id="about" className="md:mt-20">
      <SectionTitle title="Sobre Mim" imageUrl="/title-icons/trident.svg" />

      <div className="flex flex-col md:flex-row gap-6 md:justify-between items-center mt-5 md:mt-10 md:pb-5 md:pr-5 relative">
        <Image
          width={360}
          height={360}
          src="/section-images/statue-zeus.png"
          alt="Estátua de Zeus"
          quality={100}
          className="w-40 h-40 md:w-auto md:h-auto"
        />

        <div className="md:max-w-[60%] space-y-3 text-justify">
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

        <div className="w-8 h-8 border-t-8 border-r-8 border-primaryColor absolute right-0 top-0 hidden xl:block border-anim" />
        <div className="w-8 h-8 border-l-8 border-b-8 border-primaryColor absolute bottom-0 left-0 hidden xl:block border-anim" />
      </div>
    </section>
  );
};
