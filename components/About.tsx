import type { Translations } from '@/lib/translations';

export function About({ translations }: { translations: Translations }) {
  return (
    <section className="pt-10 pb-4">
      <h2 className="text-2xl font-semibold">{translations.sections.about}</h2>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
        {translations.about.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
