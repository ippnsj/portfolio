import Link from 'next/link';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  brandColor?: string;
}

export function ProjectCard({ project, brandColor }: ProjectCardProps) {
  const colorParam = brandColor?.replace(/^#/, '');
  const href = colorParam
    ? `/projects/${project.slug}?color=${colorParam}`
    : `/projects/${project.slug}`;

  return (
    <Link
      href={href}
      className="block rounded-lg border border-gray-200 p-6 transition-colors hover:border-brand"
    >
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
