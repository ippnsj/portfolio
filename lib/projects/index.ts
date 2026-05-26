import { aiRecipeSearch } from './ai-recipe-search';
import { locationRouting } from './location-routing';
import { oncallAutomation } from './oncall-automation';

export interface KeyDecision {
  title: string;
  description: string[];
}

export interface Project {
  slug: string;
  title: string;
  period: string;
  stack: string[];
  role: string;
  summary: string;
  background: string[];
  problem: string[];
  keyDecisions: KeyDecision[];
  result: string[];
}

const PROJECTS: Project[] = [
  aiRecipeSearch,
  oncallAutomation,
  locationRouting,
];

const PROJECT_MAP = new Map<string, Project>(
  PROJECTS.map((p) => [p.slug, p]),
);

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECT_MAP.get(slug);
}

export function getProjectsBySlugs(slugs: string[]): Project[] {
  return slugs
    .map((slug) => PROJECT_MAP.get(slug))
    .filter((p): p is Project => p !== undefined);
}
