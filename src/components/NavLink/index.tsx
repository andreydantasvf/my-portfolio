import Image from 'next/image';

type NavLinkProps = {
  name: string;
  href: string;
  iconUrl?: string;
  iconSizer?: number;
};

export const NavLink = ({ name, href, iconUrl, iconSizer }: NavLinkProps) => {
  return (
    <li
      className="px-2 lg:px-4 py-2
     hover:text-primaryColor transition-all duration-300 relative font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:m-auto after:h-[2px] after:w-0 after:bg-primaryColor after:transition-all after:duration-300 after:origin-center hover:after:w-full"
    >
      <a href={href} className="flex items-center gap-2">
        {iconUrl && (
          <Image
            src={iconUrl}
            alt="Ícone de Link"
            width={iconSizer ?? 24}
            height={iconSizer ?? 24}
          />
        )}
        {name}
      </a>
    </li>
  );
};
