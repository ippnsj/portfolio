interface CompanyConfig {
  color: string;
  projectSlugs: string[];
}

const COMPANY_MAP = new Map<string, CompanyConfig>([
  [
    'fieldguide',
    {
      color: '#2EB85A',
      projectSlugs: ['ai-recipe-search', 'oncall-automation', 'location-routing'],
    },
  ],
]);

export type { CompanyConfig };

export function getCompanyConfig(name: string): CompanyConfig | undefined {
  return COMPANY_MAP.get(name.toLowerCase());
}
