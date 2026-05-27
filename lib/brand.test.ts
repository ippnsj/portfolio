import { describe, expect, test } from 'vitest';
import { parseBrandParams, resolveBrandColor } from './brand';

describe('parseBrandParams', () => {
  test('extracts company and color strings', () => {
    expect(parseBrandParams({ company: 'fieldguide', color: 'FF3B30' }))
      .toEqual({ company: 'fieldguide', color: 'FF3B30' });
  });

  test('returns undefined for missing params', () => {
    expect(parseBrandParams({})).toEqual({ company: undefined, color: undefined });
  });

  test('ignores array values', () => {
    expect(parseBrandParams({ company: ['a', 'b'], color: 'FF3B30' }))
      .toEqual({ company: undefined, color: 'FF3B30' });
  });
});

describe('resolveBrandColor', () => {
  test('returns company color for registered company', () => {
    expect(resolveBrandColor({ company: 'fieldguide' })).toBe('#2EB85A');
  });

  test('company takes precedence over color', () => {
    expect(resolveBrandColor({ company: 'fieldguide', color: 'FF3B30' })).toBe(
      '#2EB85A',
    );
  });

  test('falls back to color when company is unknown', () => {
    expect(resolveBrandColor({ company: 'unknown', color: 'FF3B30' })).toBe(
      '#FF3B30',
    );
  });

  test('accepts color without leading #', () => {
    expect(resolveBrandColor({ color: 'FF3B30' })).toBe('#FF3B30');
  });

  test('accepts color with leading #', () => {
    expect(resolveBrandColor({ color: '#FF3B30' })).toBe('#FF3B30');
  });

  test('returns undefined for invalid color', () => {
    expect(resolveBrandColor({ color: 'banana' })).toBeUndefined();
  });

  test('returns undefined when no params', () => {
    expect(resolveBrandColor({})).toBeUndefined();
  });
});
