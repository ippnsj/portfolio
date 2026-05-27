import { describe, expect, test } from 'vitest';
import { aiRecipeSearch } from './ai-recipe-search';
import { locationRouting } from './location-routing';
import { oncallAutomation } from './oncall-automation';
import {
  getProjectBySlug,
  getProjectsForCompany,
} from './index';

const ALL_SLUGS = [
  aiRecipeSearch.slug,
  oncallAutomation.slug,
  locationRouting.slug,
];

describe('getProjectsForCompany', () => {
  test('returns all projects when no company', () => {
    const slugs = getProjectsForCompany().map((p) => p.slug);
    expect(slugs).toEqual(ALL_SLUGS);
  });

  test('returns filtered projects for registered company', () => {
    const slugs = getProjectsForCompany('fieldguide').map((p) => p.slug);
    expect(slugs).toEqual([
      aiRecipeSearch.slug,
      oncallAutomation.slug,
      locationRouting.slug,
    ]);
  });

  test('returns all projects for unknown company', () => {
    const slugs = getProjectsForCompany('unknown').map((p) => p.slug);
    expect(slugs).toEqual(ALL_SLUGS);
  });
});

describe('getProjectBySlug', () => {
  test('returns correct project for valid slug', () => {
    expect(getProjectBySlug(aiRecipeSearch.slug)).toBe(aiRecipeSearch);
  });

  test('returns undefined for unknown slug', () => {
    expect(getProjectBySlug('nonexistent')).toBeUndefined();
  });
});
