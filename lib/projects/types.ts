import type { Language } from '@/lib/language/types';

export interface Media {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectSection {
  content: string[];
  media?: Media[];
}

export interface KeyDecision {
  title: string;
  description: string[];
  media?: Media[];
}

export type ProjectStatus = 'in-progress' | 'done';

export interface ProjectShared {
  slug: string;
  status: ProjectStatus;
  stack: string[];
}

export interface Project extends ProjectShared {
  title: string;
  period: string;
  role: string;
  summary: string;
  background: ProjectSection;
  problem: ProjectSection;
  keyDecisions: KeyDecision[];
  result: ProjectSection;
}

export type ProjectGroup = Record<Language, Project>;
