import { About } from '@/components/About';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { parseBrandParams, resolveBrandColor } from '@/lib/brand';
import { getCurrentLanguage } from '@/lib/language';
import { getProjectsForCompany } from '@/lib/projects';
import { getTranslations } from '@/lib/translations';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { company, color } = parseBrandParams(await searchParams);
  const brandColor = resolveBrandColor({ company, color });
  const language = await getCurrentLanguage(company);
  const translations = getTranslations(language);
  const projects = getProjectsForCompany({ company, language });

  return (
    <main
      className="mx-auto max-w-3xl px-6"
      style={
        brandColor
          ? ({ '--color-brand': brandColor } as React.CSSProperties)
          : undefined
      }
    >
      <Hero translations={translations} />
      <About translations={translations} />
      <Projects projects={projects} company={company} color={color} translations={translations} />
      <Skills translations={translations} />
    </main>
  );
}
