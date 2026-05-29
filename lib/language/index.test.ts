import { beforeEach, describe, expect, test, vi } from 'vitest';

const cookieStore = { get: vi.fn() };

vi.mock('next/headers', () => ({
  cookies: () => Promise.resolve(cookieStore),
}));

import { DEFAULT_LANGUAGE, getCurrentLanguage } from './index';

describe('getCurrentLanguage', () => {
  beforeEach(() => {
    cookieStore.get.mockReset();
  });

  test('returns language from cookie when valid', async () => {
    cookieStore.get.mockReturnValue({ value: 'ko' });
    expect(await getCurrentLanguage()).toBe('ko');
  });

  test('ignores invalid cookie value', async () => {
    cookieStore.get.mockReturnValue({ value: 'invalid' });
    expect(await getCurrentLanguage()).toBe(DEFAULT_LANGUAGE);
  });

  test('falls back to company language when no cookie', async () => {
    cookieStore.get.mockReturnValue(undefined);
    expect(await getCurrentLanguage('fieldguide')).toBe('en');
  });

  test('falls back to default when no cookie and unknown company', async () => {
    cookieStore.get.mockReturnValue(undefined);
    expect(await getCurrentLanguage('unknown')).toBe(DEFAULT_LANGUAGE);
  });

  test('falls back to default when no cookie and no company', async () => {
    cookieStore.get.mockReturnValue(undefined);
    expect(await getCurrentLanguage()).toBe(DEFAULT_LANGUAGE);
  });

  test('cookie takes precedence over company language', async () => {
    cookieStore.get.mockReturnValue({ value: 'ko' });
    expect(await getCurrentLanguage('fieldguide')).toBe('ko');
  });
});
