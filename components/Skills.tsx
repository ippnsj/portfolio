import { SKILL_CATEGORIES } from '@/lib/skills';

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
                <span
                  key={item}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
