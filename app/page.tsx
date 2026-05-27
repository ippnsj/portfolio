import { Hero } from '@/components/Hero';
import { resolveBrandColor } from '@/lib/brand';

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
    </main>
  );
}
