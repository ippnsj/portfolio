import type { Project } from './index';

export const aiRecipeSearch: Project = {
  slug: 'ai-recipe-search',
  title: 'AI-Powered Recipe + Bulk Ingredient Search PoC',
  period: 'October 2025',
  stack: ['Flutter', 'n8n', 'LLM', 'Google Custom Search API'],
  role: 'UX gap identification, design, implementation, internal demo',
  summary:
    'A self-initiated PoC that unifies a fragmented user flow — switching between external recipe apps and the grocery app to look up ingredients one by one — into a single in-app flow: recipe search → automatic ingredient extraction → multi-search entry.',
  background: [
    'Grocery users typically decide on a recipe first, then shop for ingredients. The app had multi-search functionality, but users still had to manually look up each ingredient by jumping between external recipe apps and the grocery app — repeated copy-paste, no central tracking of what was added.',
  ],
  problem: [
    'The friction was quietly accepted: users went outside the app for recipes, then came back to search ingredients one at a time. Each round-trip risked dropping the user out of the funnel.',
  ],
  keyDecisions: [
    {
      title: 'Cost-efficient LLM use',
      description: [
        'Instead of routing every task through an LLM, the system uses the right tool for each job: recipe generation via LLM with structured JSON output (named ingredients, quantities, steps), and recipe images via Google Custom Search API (instead of expensive LLM image generation).',
        'PoC kept cost and latency manageable while still feeling AI-native.',
      ],
    },
    {
      title: 'Multi-search entry over auto-cart',
      description: [
        "Once ingredients are extracted, the system routes the user into multi-search rather than auto-adding everything to the cart. Auto-cart removes the user's ability to choose specific brands and options. Users still want to make the product-level decision.",
        'Multi-search keeps the convenience (no manual lookup) while preserving choice.',
      ],
    },
  ],
  result: [
    'Cross-team endorsement: positive feedback from product and design teams, followed by a collaboration meeting with the ML team.',
    'Limitation: production deferred due to lack of sponsorship.',
    'Benefits demonstrated: single in-app flow with no dependency on external apps; user focuses on product selection instead of repetitive ingredient lookups.',
  ],
};
