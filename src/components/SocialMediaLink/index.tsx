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
    <div className="flex items-center justify-center w-8 h-8 border border-primaryColor rounded-full hover:bg-secondaryColor hover:text-white transition-all">
      <a
        className="w-full h-full flex items-center justify-center"
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
