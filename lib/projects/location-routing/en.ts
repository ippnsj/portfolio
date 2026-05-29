import type { Project } from '../types';
import { locationRoutingShared } from './shared';

export const locationRoutingEn: Project = {
  ...locationRoutingShared,
  title: 'Reusable Location-Routing Component for Deeplink Recovery',
  period: 'May – June 2025',
  role: 'Component design and implementation',
  summary:
    'A reusable Flutter component that prevents deeplink failures caused by missing location data — turning ~15,000 weekly errors into successful flows by routing users to the appropriate location-selection screen instead of an error page.',
  background: {
    content: [
      'Many pages in the grocery app require location context (country, area, address) to function. Users arriving via deeplinks without their location set would land in an error state.',
    ],
  },
  problem: {
    content: [
      'Missing-location errors were one of the top three deeplink failure categories — ~15,000 per week.',
      'That category itself broke down into three sub-causes: country missing, area missing, or invalid area.',
    ],
    media: [
      {
        type: 'image',
        src: '/projects/location-routing/en/deeplink-error-top-three.png',
        alt: 'Top three deep-link error categories with missing-location errors highlighted',
        caption: 'Top 3 Deeplink Errors',
      },
      {
        type: 'image',
        src: '/projects/location-routing/en/location-missing-deeplink-errors.png',
        alt: 'Sub-causes of missing-location errors: country null and area null',
        caption: 'Deeplink Errors Related to Missing Location Cases',
      },
    ],
  },
  keyDecisions: [
    {
      title: 'Case-specific routing',
      description: [
        'Detect which field is missing / invalid — country, area, or address — and route the user to the matching selection screen (country selector / address list / map screen) instead of an error page.',
        'After selection, the user auto-resumes the originally intended page.',
      ],
      media: [
        {
          type: 'image',
          src: '/projects/location-routing/en/validation-flow.svg',
          alt: 'Location validation flowchart: detects which field is missing and routes to the matching selection screen',
        },
      ],
    },
    {
      title: 'Wrappable, reusable component',
      description: [
        'Built as a LocationRequired component in a separate package — consuming teams wrap any route needing location, no per-route boilerplate.',
        'Configurable scope via mode (country-only or country+area), so each team validates exactly what their route needs.',
        'Per-team feature flags: each consuming team injects a kill switch and A/B experiment flag. Teams can roll out gradually, A/B test, or disable instantly. Each team owns their integration risk.',
      ],
    },
  ],
  result: {
    content: [
      'User impact: users now reach the location-selection flow instead of the error page; after selection, they auto-resume the originally intended page.',
      'Team impact: another team adopted the component by wrapping their routes, and the same category of error dropped to near zero in their measurements.',
    ],
    media: [
      {
        type: 'video',
        src: '/projects/location-routing/demo.mp4',
        alt: 'Demo: deeplink with missing location triggers location selection flow then resumes the intended page',
        caption: 'Demo — user is routed to the map screen to select a location, then auto-resumes the intended page',
      },
      {
        type: 'image',
        src: '/projects/location-routing/en/result.png',
        alt: 'Error count graph showing drop from ~20,000 to near zero over one month',
        caption: 'Missing-location errors dropped to near zero after adoption',
      },
    ],
  },
};
