import { cookies } from 'next/headers';
import { getCompanyConfig } from '@/lib/companies';
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  type Language,
  LANGUAGE_COOKIE,
} from './types';

export {
  DEFAULT_LANGUAGE,
  type Language,
  LANGUAGE_COOKIE,
  LANGUAGES,
} from './types';

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
