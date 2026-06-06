import { type NextRequest, NextResponse } from 'next/server';
import {
  isLanguage,
  LANG_PARAM,
  LANGUAGE_COOKIE,
} from '@/lib/language/types';

export function middleware(request: NextRequest) {
  // URL ?lang= is a one-shot signal: set cookie, then redirect to a clean URL
  // so cookie wins on every subsequent render.
  const urlLang = request.nextUrl.searchParams.get(LANG_PARAM);
  if (urlLang && isLanguage(urlLang)) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete(LANG_PARAM);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(LANGUAGE_COOKIE, urlLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
