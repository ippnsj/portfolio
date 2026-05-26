import { describe, expect, test } from 'vitest';
import { getCompanyConfig } from './companies';

describe('getCompanyConfig', () => {
  test('returns config for registered company', () => {
    expect(getCompanyConfig('fieldguide')).toBeDefined();
  });

  test('is case-insensitive', () => {
    const expected = getCompanyConfig('fieldguide');
    expect(getCompanyConfig('Fieldguide')).toEqual(expected);
    expect(getCompanyConfig('FIELDGUIDE')).toEqual(expected);
  });

  test('returns undefined for unknown company', () => {
    expect(getCompanyConfig('unknown')).toBeUndefined();
  });
});
