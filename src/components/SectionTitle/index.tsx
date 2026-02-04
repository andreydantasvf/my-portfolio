import Image from 'next/image';

type SectionTitleProps = {
  title: string;
  imageUrl?: string;
};

export const SectionTitle = ({ title, imageUrl }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-6">
      {imageUrl && (
        <Image
          width={64}
          height={64}
          src={imageUrl}
          alt="Símbolo de um Deus Grego"
          className="h-12 w-12 md:h-16 md:w-16"
          quality={100}
        />
      )}
      <h2 className="text-primaryColor font-Cinzel text-center text-3xl font-bold md:text-5xl">
        {title}
      </h2>
      {imageUrl && (
        <Image
          width={64}
          height={64}
          src={imageUrl}
          alt="Símbolo de um Deus Grego"
          className="h-12 w-12 md:h-16 md:w-16"
          quality={100}
        />
      )}
    </div>
  );
};
