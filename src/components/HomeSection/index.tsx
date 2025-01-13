import Image from 'next/image';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SocialMediaLink } from '../SocialMediaLink';
import AnimatedBackground from '../AnimatedBackground';

export const HomeSection = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-0 md:justify-around h-screen 2xl:h-[620px]"
    >
      {/* Container dos SVGs Animados */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <AnimatedBackground />
      </div>

      <div className="flex flex-col items-center md:gap-5">
        <h1 className="text-5xl tracking-wider md:text-8xl font-semibold font-CormorantGaramond">
          ANDREY <br /> DANTAS
        </h1>

        <span
          className="content-title md:text-3xl font-CormorantGaramond opacity-70 text-center relative"
          data-text="Full-Stack Developer"
        >
          Full-Stack Developer
        </span>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <SocialMediaLink
            href="#"
            icon={<FaLinkedin className="text-primaryColor" />}
          />

          <SocialMediaLink
            href="#"
            icon={<FaGithub className="text-primaryColor" />}
          />

          <SocialMediaLink
            href="#"
            icon={<FaInstagram className="text-primaryColor" />}
          />
        </div>
      </div>

      <div className="w-fit h-fit">
        <Image
          src={'/statue-poseidon.png'}
          alt="Estátua de Poseidon"
          width={700}
          height={700}
          className="opacity-80 w-[250px] h-[250px] md:h-[450px] md:w-full"
          quality={100}
          priority
        />
      </div>
    </section>
  );
};
