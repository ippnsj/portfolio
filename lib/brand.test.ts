import { describe, expect, test } from 'vitest';
import { parseBrandParams, resolveBrandColor } from './brand';

describe('parseBrandParams', () => {
  test('extracts color string', () => {
    expect(parseBrandParams({ color: 'FF3B30' })).toEqual({ color: 'FF3B30' });
  });

  test('returns undefined for missing color', () => {
    expect(parseBrandParams({})).toEqual({ color: undefined });
  });

  test('ignores array values', () => {
    expect(parseBrandParams({ color: ['a', 'b'] })).toEqual({ color: undefined });
  });
});

describe('resolveBrandColor', () => {
  test('accepts color without leading #', () => {
    expect(resolveBrandColor({ color: 'FF3B30' })).toBe('#FF3B30');
  });

  test('accepts color with leading #', () => {
    expect(resolveBrandColor({ color: '#FF3B30' })).toBe('#FF3B30');
  });

  test('returns undefined for invalid color', () => {
    expect(resolveBrandColor({ color: 'banana' })).toBeUndefined();
  });

  test('returns undefined when no color', () => {
    expect(resolveBrandColor({})).toBeUndefined();
  });
});
