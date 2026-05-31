import { describe, expect, test } from 'vitest';
import { aiRecipeSearch } from './ai-recipe-search';
import { locationRouting } from './location-routing';
import { oncallAutomation } from './oncall-automation';
import { vlpDynamicBottomNavBar } from './vlp-bottom-nav-bar';
import { vlpTabNavigation } from './vlp-tab-navigation';
import {
  getProjectBySlug,
  getProjectsForCompany,
} from './index';

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

describe('getProjectsForCompany', () => {
  test('returns all projects in the requested language when no company', () => {
    expect(
      getProjectsForCompany({ company: undefined, language: 'en' }),
    ).toEqual(ALL_PROJECTS_EN);
    expect(
      getProjectsForCompany({ company: undefined, language: 'ko' }),
    ).toEqual(ALL_PROJECTS_KO);
  });

  test('returns filtered projects in the requested language for registered company', () => {
    expect(
      getProjectsForCompany({ company: 'fieldguide', language: 'en' }),
    ).toEqual([aiRecipeSearch.en, oncallAutomation.en, locationRouting.en]);
    expect(
      getProjectsForCompany({ company: 'fieldguide', language: 'ko' }),
    ).toEqual([aiRecipeSearch.ko, oncallAutomation.ko, locationRouting.ko]);
  });

  test('returns all projects for unknown company', () => {
    expect(
      getProjectsForCompany({ company: 'unknown', language: 'en' }),
    ).toEqual(ALL_PROJECTS_EN);
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
