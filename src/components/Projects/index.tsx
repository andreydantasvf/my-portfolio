import { projects } from '@/utils/myProjects';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { SectionTitle } from '../SectionTitle';

export const Projects = () => {
  return (
    <section id="projects" className="mt-10 md:mt-20">
      <SectionTitle
        title="Projetos Lendarios"
        imageUrl="/title-icons/forge.svg"
      />

      <div className="relative mt-5 md:mt-10">
        <div className="h-full w-full md:w-[200vw] absolute left-0 md:left-[-100vw] background-projects opacity-5"></div>
        <div
          className="py-5 grid grid-cols-1 md:items-start md:justify-normal md:grid-cols-2 gap-10"
          role="list"
          aria-label="Lista de projetos lendários"
        >
          {[...projects].reverse().map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              imgURL={project.imgURL}
              details={project.details}
              githubLink={project.githubLink}
              webLink={project.webLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
