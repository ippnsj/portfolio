import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { resolveBrandColor } from '@/lib/brand';
import { getProjectsForCompany } from '@/lib/projects';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const company =
    typeof params.company === 'string' ? params.company : undefined;
  const color =
    typeof params.color === 'string' ? params.color : undefined;

  const brandColor = resolveBrandColor({ company, color });
  const projects = getProjectsForCompany(company);

  return (
    <main
      className="mx-auto max-w-3xl px-6"
      style={
        brandColor
          ? ({ '--color-brand': brandColor } as React.CSSProperties)
          : undefined
      }
    >
      <Hero />
      <Projects projects={projects} brandColor={brandColor} />
      <Skills />
      <Footer />
    </main>
  );
}
