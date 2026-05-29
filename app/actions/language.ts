'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { type Language, LANGUAGE_COOKIE } from '@/lib/language';

export async function setLanguage(language: Language): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(LANGUAGE_COOKIE, language, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  revalidatePath('/', 'layout');
}
