import Image from 'next/image';
import { Link as LinkScroll } from 'react-scroll';

type NavLinkProps = {
  name: string;
  href: string;
  iconUrl?: string;
  iconSizer?: number;
  onClick?: () => void;
};

export const NavLink = ({
  name,
  href,
  iconUrl,
  iconSizer,
  onClick
}: NavLinkProps) => {
  return (
    <li className="hover:text-primaryColor transition-all duration-300 relative font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:m-auto after:h-[2px] after:w-0 after:bg-primaryColor after:transition-all after:duration-300 after:origin-center hover:after:w-full">
      <LinkScroll
        activeClass="active"
        to={href}
        spy={true}
        smooth={true}
        duration={1000}
        offset={-132}
        onClick={onClick}
        className="flex items-center gap-2 cursor-pointer px-2 py-2"
      >
        {iconUrl && (
          <Image
            src={iconUrl}
            alt="Ícone de Link"
            width={iconSizer ?? 24}
            height={iconSizer ?? 24}
          />
        )}
        {name}
      </LinkScroll>
    </li>
  );
};
