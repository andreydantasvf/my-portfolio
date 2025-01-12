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
    <div className="flex flex-col h-full w-full bg-black/50 backdrop-blur-md border border-gray-700 rounded-lg overflow-hidden shadow-md">
      {/* Imagem */}
      <div className="h-52">
        <img src={imgURL} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-center border-b-2 border-primaryColor pb-4">
          {title}
        </h3>
        <p className="mt-4 text-lg flex-grow break-words">{details}</p>
        <div className="flex justify-center gap-4 mt-6">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-primaryColor rounded-md transition-all duration-300 hover:bg-secondaryColor hover:border-secondaryColor hover:text-primaryColor"
            >
              Repo
            </a>
          )}
          {webLink && (
            <a
              href={webLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-primaryColor rounded-md transition-all duration-300 hover:bg-secondaryColor hover:border-secondaryColor hover:text-primaryColor"
            >
              View
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
