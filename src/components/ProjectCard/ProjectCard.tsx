import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  imgURL: string;
  details: string;
  githubLink?: string;
  webLink?: string;
}

export function ProjectCard({
  title,
  imgURL,
  details,
  githubLink,
  webLink
}: ProjectCardProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-700 bg-black/50 shadow-md backdrop-blur-md">
      {/* Imagem */}
      <div className="h-52">
        <Image
          src={imgURL}
          width={500}
          height={208}
          alt={title}
          loading="lazy"
          quality={100}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-grow flex-col p-6">
        <header>
          <h3 className="border-primaryColor border-b-2 pb-4 text-center">
            {title}
          </h3>
        </header>
        <p className="mt-4 flex-grow text-lg break-words">{details}</p>
        <div className="mt-6 flex justify-center gap-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Repositório do projeto ${title}`}
              className="border-primaryColor hover:bg-secondaryColor hover:border-secondaryColor hover:text-primaryColor flex items-center justify-center gap-2 rounded-md border px-4 py-2 transition-all duration-300"
            >
              <FaGithub />
              Code
            </a>
          )}
          {webLink && (
            <a
              href={webLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Web site do projeto ${title}`}
              className="border-primaryColor hover:bg-secondaryColor hover:border-secondaryColor hover:text-primaryColor flex items-center justify-center gap-2 rounded-md border px-4 py-2 transition-all duration-300"
            >
              <FaExternalLinkAlt />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
