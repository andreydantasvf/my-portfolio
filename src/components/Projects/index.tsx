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
        <div className="background-projects absolute left-0 h-full w-full opacity-5 md:left-[-100vw] md:w-[200vw]"></div>
        <div
          className="grid grid-cols-1 gap-10 py-5 md:grid-cols-2 md:items-start md:justify-normal"
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
