import { About } from '@/components/About';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { parseBrandParams, resolveBrandColor } from '@/lib/brand';
import { getCurrentLanguage } from '@/lib/language';
import { getAllProjects } from '@/lib/projects';
import { getTranslations } from '@/lib/translations';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { color } = parseBrandParams(await searchParams);
  const brandColor = resolveBrandColor({ color });
  const language = await getCurrentLanguage();
  const translations = getTranslations(language);
  const projects = getAllProjects(language);

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
      <Projects projects={projects} color={color} translations={translations} />
      <Skills translations={translations} />
    </main>
  );
}
