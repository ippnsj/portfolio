import { SKILL_CATEGORIES } from '@/lib/skills';
import { Tag } from './Tag';

export function Skills() {
  return (
    <section className="pt-10 pb-4">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <div className="mt-6 flex flex-col gap-4">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.name} className="flex items-baseline gap-3">
            <h3 className="w-32 shrink-0 text-sm font-medium text-muted">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
