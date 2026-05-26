import type { Project } from './index';

export const locationRouting: Project = {
  slug: 'location-routing',
  title: 'Reusable Location-Routing Component for Deep-Link Recovery',
  period: 'May – June 2025',
  stack: ['Flutter', 'BLoC'],
  role: 'Component design and implementation',
  summary:
    'A reusable Flutter component that prevents deep-link failures caused by missing location data — turning ~15,000 weekly errors into successful flows by routing users to the appropriate location-selection screen instead of an error page.',
  background: [
    'Many pages in the grocery app require location context (country, area, address) to function. Users arriving via deep links without their location set would land in an error state.',
  ],
  problem: [
    'Deep-link failures had three top error categories; one of them was missing-location errors at ~15,000 per week.',
    'That category itself broke down into three sub-causes: country missing, area missing, or invalid area.',
  ],
  keyDecisions: [
    {
      title: 'Wrappable, mode-aware component',
      description: [
        'Built a LocationRequired component, packaged separately, that wraps any route needing location. Configurable scope via mode — country-only or country+area. Case-specific routing detects which field is missing and sends the user to the matching selection screen (country selector / address list / map screen) instead of an error page.',
        'Per-team feature-flag control: kill switch and A/B experiment flag injected by each consuming team, so adoption stays safe.',
      ],
    },
  ],
  result: [
    'User impact: users now reach the location-selection flow instead of the error page; after selection, they auto-resume the originally intended page.',
    'Team impact: another team adopted the component by wrapping their routes, and the same category of error dropped to near zero in their measurements.',
  ],
};
