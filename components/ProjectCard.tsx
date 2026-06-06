import Link from 'next/link';
import { BRAND_PARAMS } from '@/lib/brand';
import type { Project } from '@/lib/projects';
import type { Translations } from '@/lib/translations';
import { StatusBadge } from './StatusBadge';
import { Tag } from './Tag';

interface ProjectCardProps {
  project: Project;
  color?: string;
  translations: Translations;
}

export function ProjectCard({
  project,
  color,
  translations,
}: ProjectCardProps) {
  const queryString = color
    ? `?${new URLSearchParams({ [BRAND_PARAMS.color]: color }).toString()}`
    : '';

  return (
    <Link
      href={`/projects/${project.slug}${queryString}`}
      className="block rounded-lg border border-gray-200 p-6 transition-colors hover:border-brand"
    >
      <StatusBadge status={project.status} translations={translations} />
      <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </Link>
  );
}
