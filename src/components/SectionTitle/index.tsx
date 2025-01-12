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
          className="w-12 h-12 md:w-16 md:h-16"
        />
      )}
      <h2 className="text-center text-3xl md:text-5xl text-primaryColor font-Cinzel font-bold">
        {title}
      </h2>
      {imageUrl && (
        <Image
          width={64}
          height={64}
          src={imageUrl}
          alt="Símbolo de um Deus Grego"
          className="w-12 h-12 md:w-16 md:h-16"
        />
      )}
    </div>
  );
};
