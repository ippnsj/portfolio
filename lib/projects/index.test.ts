import { describe, expect, test } from 'vitest';
import { aiRecipeSearch } from './ai-recipe-search';
import { locationRouting } from './location-routing';
import { oncallAutomation } from './oncall-automation';
import { getAllProjects, getProjectBySlug, getProjectsBySlugs } from './index';

describe('getAllProjects', () => {
  test('returns all projects', () => {
    const slugs = getAllProjects().map((p) => p.slug);
    expect(slugs).toEqual([
      aiRecipeSearch.slug,
      oncallAutomation.slug,
      locationRouting.slug,
    ]);
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

describe('getProjectsBySlugs', () => {
  test('returns matching projects in requested order', () => {
    const projects = getProjectsBySlugs([
      locationRouting.slug,
      aiRecipeSearch.slug,
    ]);
    expect(projects).toEqual([locationRouting, aiRecipeSearch]);
  });

  test('skips unknown slugs', () => {
    const projects = getProjectsBySlugs([
      aiRecipeSearch.slug,
      'nonexistent',
      locationRouting.slug,
    ]);
    expect(projects).toEqual([aiRecipeSearch, locationRouting]);
  });
});
