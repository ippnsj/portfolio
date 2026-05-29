import { CONTACT_LINKS } from '@/lib/contact';
import type { Translations } from '@/lib/translations';

export function Hero({ translations }: { translations: Translations }) {
  return (
    <section className="pt-24 pb-4">
      <h1 className="text-5xl font-bold tracking-tight">
        {translations.hero.name}
      </h1>
      <p className="mt-4 text-xl text-muted">{translations.hero.headline}</p>
      <nav
        className="mt-3 flex flex-wrap gap-x-6 gap-y-2"
        aria-label="Contact links"
      >
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-1.5 text-brand underline-offset-4 hover:underline"
            {...(link.href.startsWith('http') && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
          >
            <link.icon size={16} />
            {link.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
