import { type NextRequest, NextResponse } from 'next/server';
import { BRAND_PARAMS } from '@/lib/brand';
import {
  isLanguage,
  LANG_PARAM,
  LANGUAGE_COOKIE,
} from '@/lib/language/types';

export const COMPANY_HEADER = 'x-company';

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

  const company = request.nextUrl.searchParams.get(BRAND_PARAMS.company);
  if (!company) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(COMPANY_HEADER, company);
  return NextResponse.next({ request: { headers: requestHeaders } });
}
