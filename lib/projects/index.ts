import { getCompanyConfig } from '@/lib/companies';
import { aiRecipeSearch } from './ai-recipe-search';
import { locationRouting } from './location-routing';
import { oncallAutomation } from './oncall-automation';

export interface Media {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectSection {
  content: string[];
  media?: Media[];
}

export interface KeyDecision {
  title: string;
  description: string[];
  media?: Media[];
}

export interface Project {
  slug: string;
  title: string;
  period: string;
  stack: string[];
  role: string;
  summary: string;
  background: ProjectSection;
  problem: ProjectSection;
  keyDecisions: KeyDecision[];
  result: ProjectSection;
}

const PROJECTS: Project[] = [
  aiRecipeSearch,
  locationRouting,
  oncallAutomation,
];

const PROJECT_MAP = new Map<string, Project>(
  PROJECTS.map((p) => [p.slug, p]),
);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECT_MAP.get(slug);
}

function getProjectsBySlugs(slugs: string[]): Project[] {
  return slugs
    .map((slug) => PROJECT_MAP.get(slug))
    .filter((p): p is Project => p !== undefined);
}

export function getProjectsForCompany(company?: string): Project[] {
  const config = company ? getCompanyConfig(company) : undefined;
  return config ? getProjectsBySlugs(config.projectSlugs) : PROJECTS;
}
