import { type NextRequest, NextResponse } from 'next/server';
import { BRAND_PARAMS } from '@/lib/brand';

export const COMPANY_HEADER = 'x-company';

export function middleware(request: NextRequest) {
  const company = request.nextUrl.searchParams.get(BRAND_PARAMS.company);
  if (!company) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(COMPANY_HEADER, company);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
