import Image from 'next/image';
import { Link as LinkScroll } from 'react-scroll';

type NavLinkProps = {
  name: string;
  href: string;
  iconUrl?: string;
  iconSizer?: number;
  onClick?: () => void;
  ariaLabel?: string;
};

export const NavLink = ({
  name,
  href,
  iconUrl,
  iconSizer,
  onClick,
  ariaLabel
}: NavLinkProps) => {
  return (
    <li
      className="hover:text-primaryColor after:bg-primaryColor relative font-medium transition-all duration-300 after:absolute after:right-0 after:bottom-0 after:left-0 after:m-auto after:h-[2px] after:w-0 after:origin-center after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
      aria-label={ariaLabel}
    >
      <LinkScroll
        activeClass="active"
        to={href}
        spy={true}
        smooth={true}
        duration={1000}
        offset={-132}
        onClick={onClick}
        className="flex cursor-pointer items-center gap-2 px-2 py-2"
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
