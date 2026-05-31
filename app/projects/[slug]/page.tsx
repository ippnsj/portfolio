import Image from 'next/image';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { StatusBadge } from '@/components/StatusBadge';
import { Tag } from '@/components/Tag';
import { parseBrandParams, resolveBrandColor } from '@/lib/brand';
import { DEFAULT_LANGUAGE, getCurrentLanguage } from '@/lib/language';
import type { Media, Project } from '@/lib/projects';
import { getProjectBySlug, getProjectsForCompany } from '@/lib/projects';
import { getTranslations, type Translations } from '@/lib/translations';

function ProjectHero({
  project,
  translations,
}: {
  project: Project;
  translations: Translations;
}) {
  return (
    <section className="pb-4">
      <StatusBadge status={project.status} translations={translations} />
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {project.summary}
      </p>
      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <div>
          <dt className="inline font-medium text-foreground">
            {translations.detail.period}
          </dt>{' '}
          <dd className="inline">{project.period}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-foreground">
            {translations.detail.role}
          </dt>{' '}
          <dd className="inline">{project.role}</dd>
        </div>
      </dl>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="pt-6 pb-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 text-lg leading-relaxed text-muted [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-base [&_code]:text-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
      {items.map((text, i) => (
        <ReactMarkdown key={i}>{text}</ReactMarkdown>
      ))}
    </div>
  );
}

function MediaItem({ media }: { media: Media }) {
  const content = (() => {
    switch (media.type) {
      case 'image':
        return (
          <Image
            src={media.src}
            alt={media.alt}
            width={800}
            height={400}
            className="rounded-lg"
          />
        );
      case 'video':
        return (
          <video src={media.src} controls className="w-full rounded-lg">
            <track kind="captions" />
          </video>
        );
    }
  })();

  return (
    <figure>
      {content}
      {media.caption && (
        <figcaption className="mt-2 text-center text-sm text-muted">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}

function MediaList({ items }: { items: Media[] }) {
  return (
    <div className="my-6 space-y-4">
      {items.map((media) => (
        <MediaItem key={media.src} media={media} />
      ))}
    </div>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return getProjectsForCompany({
    company: undefined,
    language: DEFAULT_LANGUAGE,
  }).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const { company } = parseBrandParams(await searchParams);
  const language = await getCurrentLanguage(company);
  const project = getProjectBySlug({ slug, language });
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Sojung Lee`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const brandParams = parseBrandParams(await searchParams);
  const language = await getCurrentLanguage(brandParams.company);
  const translations = getTranslations(language);
  const project = getProjectBySlug({ slug, language });
  if (!project) notFound();

  const brandColor = resolveBrandColor(brandParams);

  return (
    <main
      className="mx-auto max-w-3xl px-6 pt-16"
      style={
        brandColor
          ? ({ '--color-brand': brandColor } as React.CSSProperties)
          : undefined
      }
    >
      <ProjectHero project={project} translations={translations} />

      <Section title={translations.detail.background}>
        <Paragraphs items={project.background.content} />
        {project.background.media && <MediaList items={project.background.media} />}
      </Section>

      <Section title={translations.detail.problem}>
        <Paragraphs items={project.problem.content} />
        {project.problem.media && <MediaList items={project.problem.media} />}
      </Section>

      <Section title={translations.detail.keyDecisions}>
        <div className="space-y-8">
          {project.keyDecisions.map((decision) => (
            <SubSection key={decision.title} title={decision.title}>
              <Paragraphs items={decision.description} />
              {decision.media && <MediaList items={decision.media} />}
            </SubSection>
          ))}
        </div>
      </Section>

      <Section title={translations.detail.result}>
        {project.result.media && <MediaList items={project.result.media} />}
        <ul className="space-y-3 text-lg leading-relaxed text-muted [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-base [&_code]:text-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
          {project.result.content.map((item, i) => (
            <li key={i} className="border-l-2 border-brand pl-4">
              <ReactMarkdown
                components={{ p: ({ children }) => <>{children}</> }}
              >
                {item}
              </ReactMarkdown>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
