import type { Project } from '@/lib/projects';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  projects: Project[];
  company?: string;
  color?: string;
}

export function Projects({ projects, company, color }: ProjectsProps) {
  return (
    <section className="pt-10 pb-4">
      <h2 className="text-2xl font-semibold">Projects</h2>
      <div className="mt-6 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            company={company}
            color={color}
          />
        ))}
      </div>
    </section>
  );
}
