import type { Project } from '@/lib/projects';
import type { Translations } from '@/lib/translations';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  projects: Project[];
  company?: string;
  color?: string;
  translations: Translations;
}

export function Projects({
  projects,
  company,
  color,
  translations,
}: ProjectsProps) {
  return (
    <section className="pt-10 pb-4">
      <h2 className="text-2xl font-semibold">
        {translations.sections.projects}
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            company={company}
            color={color}
            translations={translations}
          />
        ))}
      </div>
    </section>
  );
}
