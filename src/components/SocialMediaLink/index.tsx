type SocialMediaLinkProps = {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
};

export const SocialMediaLink = ({
  icon,
  href,
  ariaLabel
}: SocialMediaLinkProps) => {
  return (
    <div className="border-primaryColor hover:bg-secondaryColor flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:text-white">
      <a
        className="flex h-full w-full items-center justify-center"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
      >
        {icon}
      </a>
    </div>
  );
};
