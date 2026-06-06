import { describe, expect, test } from 'vitest';
import { aiRecipeSearch } from './ai-recipe-search';
import { locationRouting } from './location-routing';
import { oncallAutomation } from './oncall-automation';
import { vlpDynamicBottomNavBar } from './vlp-bottom-nav-bar';
import { vlpTabNavigation } from './vlp-tab-navigation';
import { getAllProjects, getProjectBySlug } from './index';

const ALL_PROJECTS_EN = [
  aiRecipeSearch.en,
  locationRouting.en,
  oncallAutomation.en,
  vlpDynamicBottomNavBar.en,
  vlpTabNavigation.en,
];

const ALL_PROJECTS_KO = [
  aiRecipeSearch.ko,
  locationRouting.ko,
  oncallAutomation.ko,
  vlpDynamicBottomNavBar.ko,
  vlpTabNavigation.ko,
];

describe('getAllProjects', () => {
  test('returns all projects in the requested language', () => {
    expect(getAllProjects('en')).toEqual(ALL_PROJECTS_EN);
    expect(getAllProjects('ko')).toEqual(ALL_PROJECTS_KO);
  });
});

describe('getProjectBySlug', () => {
  test('returns project in the requested language', () => {
    expect(
      getProjectBySlug({ slug: aiRecipeSearch.en.slug, language: 'en' }),
    ).toBe(aiRecipeSearch.en);
    expect(
      getProjectBySlug({ slug: aiRecipeSearch.ko.slug, language: 'ko' }),
    ).toBe(aiRecipeSearch.ko);
  });

  test('returns undefined for unknown slug', () => {
    expect(
      getProjectBySlug({ slug: 'nonexistent', language: 'en' }),
    ).toBeUndefined();
  });
});
