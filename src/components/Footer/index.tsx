import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SocialMediaLink } from '../SocialMediaLink';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto py-10">
      <div className="flex items-center justify-center gap-4">
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

      <p className="text-center text-sm text-gray-500 mt-6">
        &copy; {year} Andrey Dantas. Criado com as bênçãos dos deuses da
        codificação.
      </p>
    </footer>
  );
};
