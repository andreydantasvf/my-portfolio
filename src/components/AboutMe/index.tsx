import Image from 'next/image';
import { SectionTitle } from '../SectionTitle';

export const AboutMe = () => {
  return (
    <section className="md:mt-20">
      <SectionTitle title="Sobre Mim" imageUrl="/trident.svg" />

      <div className="flex flex-col md:flex-row gap-6 md:justify-between items-center mt-5 md:mt-10 md:pb-5 md:pr-5 relative">
        <Image
          width={360}
          height={360}
          src="/statue-zeus.png"
          alt="Estátua de Zeus"
          quality={100}
          className="w-40 h-40 md:w-auto md:h-auto"
        />

        <div className="md:max-w-[60%] space-y-3 text-justify">
          <p>
            Olá! Meu nome é <span className="font-bold">Andrey Dantas</span> e
            sou um desenvolvedor de software full-stack apaixonado por construir
            soluções que unem funcionalidade e design. Assim como os grandes
            heróis da mitologia grega, encaro cada desafio no desenvolvimento de
            software como uma oportunidade de superar limites e alcançar novas
            conquistas.
          </p>

          <p>
            Com experiência em tecnologias como{' '}
            <span className="font-bold">
              JavaScript, Next.js, React, TypeScript, Tailwind, Node.js, Python
            </span>
            , e bancos de dados modernos, domino tanto o front-end quanto o
            back-end, criando aplicações robustas e escaláveis. Além disso,
            possuo conhecimentos em AWS e outras ferramentas de infraestrutura,
            o que me permite trabalhar com arquiteturas na nuvem e otimizar
            sistemas para alto desempenho.
          </p>

          <p>
            Minha jornada na tecnologia é guiada pela curiosidade e pela vontade
            de aprender constantemente. Seja desenvolvendo uma interface
            intuitiva, implementando uma lógica complexa no back-end ou
            garantindo que cada componente funcione perfeitamente em conjunto,
            eu me dedico a entregar resultados que agreguem valor real.
          </p>

          <p>
            Assim como os mitos gregos contam histórias de inovação e evolução,
            busco transformar ideias em realidades digitais, colaborando para
            criar produtos que fazem a diferença.
          </p>
        </div>

        <div className="w-8 h-8 border-t-8 border-r-8 border-primaryColor absolute right-0 top-0 hidden xl:block" />
        <div className="w-8 h-8 border-l-8 border-b-8 border-primaryColor absolute bottom-0 left-0 hidden xl:block" />
      </div>
    </section>
  );
};
