import type { Language } from '@/lib/language/types';
import { aiRecipeSearch } from './ai-recipe-search';
import { locationRouting } from './location-routing';
import { oncallAutomation } from './oncall-automation';
import type { Project, ProjectGroup } from './types';
import { vlpDynamicBottomNavBar } from './vlp-bottom-nav-bar';
import { vlpTabNavigation } from './vlp-tab-navigation';

export type { KeyDecision, Media, Project, ProjectSection, ProjectStatus } from './types';

const PROJECT_GROUPS: ProjectGroup[] = [
  aiRecipeSearch,
  locationRouting,
  oncallAutomation,
  vlpDynamicBottomNavBar,
  vlpTabNavigation,
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

export function getAllProjects(language: Language): Project[] {
  return PROJECTS_BY_LANGUAGE[language];
}
