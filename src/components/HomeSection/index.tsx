import Image from 'next/image';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SocialMediaLink } from '../SocialMediaLink';
import AnimatedBackground from '../AnimatedBackground';

export const HomeSection = () => {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col-reverse items-center justify-center gap-5 overflow-hidden md:flex-row md:justify-around md:gap-0 2xl:h-[620px]"
    >
      {/* Container dos SVGs Animados */}
      <div className="pointer-events-none absolute inset-0 z-[-1]">
        <AnimatedBackground />
      </div>

      <div className="flex flex-col items-center md:gap-5">
        <h1 className="font-CormorantGaramond text-5xl font-semibold tracking-wider md:text-8xl">
          ANDREY <br /> DANTAS
        </h1>

        <span
          className="content-title font-CormorantGaramond relative text-center opacity-70 md:text-3xl"
          data-text="Full-Stack Developer"
        >
          Full-Stack Developer
        </span>

        <div className="mt-4 flex items-center gap-4 md:mt-0">
          <SocialMediaLink
            href="https://www.linkedin.com/in/andreydantasvf"
            icon={<FaLinkedin className="text-primaryColor" />}
            ariaLabel="Perfil do LinkedIn de Andrey Dantas"
          />

          <SocialMediaLink
            href="https://github.com/andreydantasvf"
            icon={<FaGithub className="text-primaryColor" />}
            ariaLabel="Perfil do GitHub de Andrey Dantas"
          />

          <SocialMediaLink
            href="https://www.instagram.com/andreydantasvf"
            icon={<FaInstagram className="text-primaryColor" />}
            ariaLabel="Perfil do Instagram de Andrey Dantas"
          />
        </div>
      </div>

      <div className="h-fit w-fit">
        <Image
          src={'/section-images/statue-poseidon.png'}
          alt="Escultura de Poseidon com tridente"
          width={700}
          height={700}
          className="h-[250px] w-[250px] opacity-80 md:h-[450px] md:w-full"
          quality={100}
          priority
        />
      </div>
    </section>
  );
};
