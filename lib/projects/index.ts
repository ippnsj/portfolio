import { getCompanyConfig } from '@/lib/companies';
import type { Language } from '@/lib/language/types';
import { aiRecipeSearch } from './ai-recipe-search';
import { locationRouting } from './location-routing';
import { oncallAutomation } from './oncall-automation';
import type { Project, ProjectGroup } from './types';
import { vlpDynamicBottomNavBar } from './vlp-bottom-nav-bar';

export type { KeyDecision, Media, Project, ProjectSection } from './types';

const PROJECT_GROUPS: ProjectGroup[] = [
  aiRecipeSearch,
  locationRouting,
  oncallAutomation,
  vlpDynamicBottomNavBar,
];

const PROJECTS_BY_LANGUAGE: Record<Language, Project[]> = {
  en: PROJECT_GROUPS.map((g) => g.en),
  ko: PROJECT_GROUPS.map((g) => g.ko),
};

const PROJECT_MAP_BY_LANGUAGE: Record<Language, Map<string, Project>> = {
  en: new Map(PROJECTS_BY_LANGUAGE.en.map((p) => [p.slug, p])),
  ko: new Map(PROJECTS_BY_LANGUAGE.ko.map((p) => [p.slug, p])),
};

export function getProjectBySlug({
  slug,
  language,
}: {
  slug: string;
  language: Language;
}): Project | undefined {
  return PROJECT_MAP_BY_LANGUAGE[language].get(slug);
}

function getProjectsBySlugs({
  slugs,
  language,
}: {
  slugs: string[];
  language: Language;
}): Project[] {
  const map = PROJECT_MAP_BY_LANGUAGE[language];
  return slugs
    .map((slug) => map.get(slug))
    .filter((p): p is Project => p !== undefined);
}

export function getProjectsForCompany({
  company,
  language,
}: {
  company: string | undefined;
  language: Language;
}): Project[] {
  const config = company ? getCompanyConfig(company) : undefined;
  return config
    ? getProjectsBySlugs({ slugs: config.projectSlugs, language })
    : PROJECTS_BY_LANGUAGE[language];
}
