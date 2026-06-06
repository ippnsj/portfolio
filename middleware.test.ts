import { NextRequest } from 'next/server';
import { describe, expect, test } from 'vitest';
import { LANGUAGE_COOKIE } from '@/lib/language/types';
import { middleware } from './middleware';

describe('middleware', () => {
  test('redirects to clean URL and sets cookie when ?lang=ko is present', () => {
    const request = new NextRequest('http://localhost/?lang=ko');
    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/');
    expect(response.cookies.get(LANGUAGE_COOKIE)?.value).toBe('ko');
  });

  test('redirects to clean URL and sets cookie when ?lang=en is present', () => {
    const request = new NextRequest('http://localhost/?lang=en');
    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.cookies.get(LANGUAGE_COOKIE)?.value).toBe('en');
  });

  test('passes through when ?lang= value is invalid', () => {
    const request = new NextRequest('http://localhost/?lang=invalid');
    const response = middleware(request);

    expect(response.status).toBe(200);
    expect(response.cookies.get(LANGUAGE_COOKIE)).toBeUndefined();
  });

  test('passes through when no ?lang= is present', () => {
    const request = new NextRequest('http://localhost/');
    const response = middleware(request);

    expect(response.status).toBe(200);
    expect(response.cookies.get(LANGUAGE_COOKIE)).toBeUndefined();
  });

  test('preserves other query params when redirecting', () => {
    const request = new NextRequest('http://localhost/?lang=ko&color=FF3B30');
    const response = middleware(request);

    expect(response.status).toBe(307);
    const location = response.headers.get('location');
    expect(location).toContain('color=FF3B30');
    expect(location).not.toContain('lang=');
  });
});
