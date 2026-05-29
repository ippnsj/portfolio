import { cookies } from 'next/headers';
import { getCompanyConfig } from '@/lib/companies';

export const LANGUAGES = ['en', 'ko'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';
export const LANGUAGE_COOKIE = 'language';

function isLanguage(value: string | undefined): value is Language {
  return (LANGUAGES as readonly string[]).includes(value ?? '');
}

export async function getCurrentLanguage(company?: string): Promise<Language> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LANGUAGE_COOKIE)?.value;
  if (isLanguage(cookieValue)) {
    return cookieValue;
  }

  const companyConfig = company ? getCompanyConfig(company) : undefined;
  if (companyConfig) {
    return companyConfig.language;
  }

  return DEFAULT_LANGUAGE;
}
