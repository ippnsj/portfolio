export const LANGUAGES = ['en', 'ko'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';
export const LANGUAGE_COOKIE = 'language';
export const LANG_PARAM = 'lang';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  ko: '한국어',
};

export function isLanguage(value: string | undefined): value is Language {
  return (LANGUAGES as readonly string[]).includes(value ?? '');
}
