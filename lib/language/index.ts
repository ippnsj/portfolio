import { cookies } from 'next/headers';
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

export async function getCurrentLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LANGUAGE_COOKIE)?.value;
  if (isLanguage(cookieValue)) {
    return cookieValue;
  }
  return DEFAULT_LANGUAGE;
}
