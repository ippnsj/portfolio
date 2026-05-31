import type { Language } from "@/lib/language/types";

interface CompanyConfig {
  color: string;
  projectSlugs: string[];
  language: Language;
}

const COMPANY_MAP = new Map<string, CompanyConfig>([
  [
    "fieldguide",
    {
      color: "#2EB85A",
      projectSlugs: [
        "ai-recipe-search",
        "oncall-automation",
        "location-routing",
      ],
      language: "en",
    },
  ],
  [
    "tumblbug",
    {
      color: "#EC6660",
      projectSlugs: [
        "ai-recipe-search",
        "location-routing",
        "oncall-automation",
        "vlp-dynamic-bottom-nav-bar",
      ],
      language: "ko",
    },
  ],
  [
    "medility",
    {
      color: "#58C074",
      projectSlugs: [
        "ai-recipe-search",
        "vlp-tab-navigation",
        "location-routing",
        "oncall-automation",
      ],
      language: "ko",
    },
  ],
]);

export type { CompanyConfig };

export function getCompanyConfig(name: string): CompanyConfig | undefined {
  return COMPANY_MAP.get(name.toLowerCase());
}
