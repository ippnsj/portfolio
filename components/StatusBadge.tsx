import type { ProjectStatus } from '@/lib/projects';
import type { Translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ProjectStatus;
  translations: Translations;
}

export function StatusBadge({ status, translations }: StatusBadgeProps) {
  const label =
    status === 'in-progress'
      ? translations.status.inProgress
      : translations.status.done;

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-muted">
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'in-progress' ? 'bg-amber-500' : 'bg-emerald-500',
        )}
      />
      {label}
    </span>
  );
}
