import Link from 'next/link';
import { BRAND_PARAMS } from '@/lib/brand';
import type { Project } from '@/lib/projects';
import type { Translations } from '@/lib/translations';
import { StatusBadge } from './StatusBadge';
import { Tag } from './Tag';

interface ProjectCardProps {
  project: Project;
  company?: string;
  color?: string;
  translations: Translations;
}

export function ProjectCard({
  project,
  company,
  color,
  translations,
}: ProjectCardProps) {
  const queryEntries = [
    company && [BRAND_PARAMS.company, company],
    color && [BRAND_PARAMS.color, color],
  ].filter((entry): entry is [string, string] => Boolean(entry));
  const queryString = queryEntries.length
    ? `?${new URLSearchParams(queryEntries).toString()}`
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
