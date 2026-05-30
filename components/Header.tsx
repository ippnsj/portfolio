import Link from 'next/link';
import type { Language } from '@/lib/language/types';
import type { Translations } from '@/lib/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  language: Language;
  translations: Translations;
}

export function Header({ language, translations }: HeaderProps) {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-medium hover:text-brand transition-colors"
        >
          {translations.header.title}
        </Link>
        <LanguageSwitcher current={language} />
      </div>
    </header>
  );
}
