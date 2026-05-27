import { describe, expect, test } from 'vitest';
import { isValidHexColor } from './utils';

describe('isValidHexColor', () => {
  test('accepts #-prefixed 3-digit hex', () => {
    expect(isValidHexColor('#fff')).toBe(true);
  });

  test('accepts #-prefixed 6-digit hex', () => {
    expect(isValidHexColor('#FF3B30')).toBe(true);
  });

  test('accepts #-prefixed 8-digit hex (with alpha)', () => {
    expect(isValidHexColor('#FF3B30CC')).toBe(true);
  });

  test('is case-insensitive', () => {
    expect(isValidHexColor('#aAbBcC')).toBe(true);
  });

  test('rejects values without # prefix', () => {
    expect(isValidHexColor('FF3B30')).toBe(false);
  });

  test('rejects non-hex characters', () => {
    expect(isValidHexColor('#banana')).toBe(false);
    expect(isValidHexColor('#GGGGGG')).toBe(false);
  });

  test('rejects too short values', () => {
    expect(isValidHexColor('#FF')).toBe(false);
  });

  test('rejects empty string', () => {
    expect(isValidHexColor('')).toBe(false);
  });
});
