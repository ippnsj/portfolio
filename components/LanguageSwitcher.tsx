'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { setLanguage } from '@/app/actions/language';
import {
  type Language,
  LANGUAGE_LABELS,
  LANGUAGES,
} from '@/lib/language/types';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ current }: { current: Language }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleSelect = (language: Language) => {
    setOpen(false);
    if (language === current) return;
    startTransition(() => {
      setLanguage(language);
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <FiGlobe size={16} />
        <span>{LANGUAGE_LABELS[current]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-32 rounded-md border border-gray-200 bg-white py-1 shadow-md">
          {LANGUAGES.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => handleSelect(language)}
              disabled={isPending}
              className={cn(
                'block w-full px-3 py-1.5 text-left text-sm',
                language === current
                  ? 'font-medium text-foreground'
                  : 'text-muted hover:bg-gray-50 hover:text-foreground',
              )}
            >
              {LANGUAGE_LABELS[language]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
