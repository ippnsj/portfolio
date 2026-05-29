export const LANGUAGES = ['en', 'ko'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';
export const LANGUAGE_COOKIE = 'language';

export function isLanguage(value: string | undefined): value is Language {
  return (LANGUAGES as readonly string[]).includes(value ?? '');
}
