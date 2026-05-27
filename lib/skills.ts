interface SkillCategory {
  name: string;
  items: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  { name: 'Languages', items: ['Dart', 'Kotlin', 'Python', 'Bash', 'C#'] },
  { name: 'Mobile', items: ['Flutter', 'Native Android'] },
  {
    name: 'Observability',
    items: ['New Relic', 'NRQL', 'Grafana', 'Feature Flags (Kill-switch, A/B)'],
  },
  { name: 'Automation', items: ['n8n', 'GitHub Actions', 'LLM APIs'] },
  {
    name: 'Architecture',
    items: ['Clean Architecture', 'SOLID', 'MVVM', 'MVI'],
  },
];
