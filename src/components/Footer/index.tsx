import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SocialMediaLink } from '../SocialMediaLink';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto py-10">
      <div className="flex items-center justify-center gap-4">
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

      <p className="text-center text-sm text-gray-500 mt-6">
        &copy; {year} Andrey Dantas. Criado com as bênçãos dos deuses da
        codificação.
      </p>
    </footer>
  );
};
