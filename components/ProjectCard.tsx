import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { Tag } from './Tag';

interface ProjectCardProps {
  project: Project;
  company?: string;
  color?: string;
}

export function ProjectCard({ project, company, color }: ProjectCardProps) {
  const queryEntries = [
    company && ['company', company],
    color && ['color', color],
  ].filter((entry): entry is [string, string] => Boolean(entry));
  const queryString = queryEntries.length
    ? `?${new URLSearchParams(queryEntries).toString()}`
    : '';

  return (
    <Link
      href={`/projects/${project.slug}${queryString}`}
      className="block rounded-lg border border-gray-200 p-6 transition-colors hover:border-brand"
    >
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </Link>
  );
}
