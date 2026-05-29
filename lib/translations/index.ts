import type { Language } from '@/lib/language/types';
import { en } from './en';
import { ko } from './ko';
import type { Translations } from './types';

export type { Translations } from './types';

const TRANSLATIONS: Record<Language, Translations> = {
  en,
  ko,
};

export function getTranslations(language: Language): Translations {
  return TRANSLATIONS[language];
}
