import type { Project } from './index';

export const locationRouting: Project = {
  slug: 'location-routing',
  title: 'Reusable Location-Routing Component for Deep-Link Recovery',
  period: 'May – June 2025',
  stack: ['Flutter', 'BLoC'],
  role: 'Component design and implementation',
  summary:
    'A reusable Flutter component that prevents deep-link failures caused by missing location data — turning ~15,000 weekly errors into successful flows by routing users to the appropriate location-selection screen instead of an error page.',
  background: {
    content: [
      'Many pages in the grocery app require location context (country, area, address) to function. Users arriving via deep links without their location set would land in an error state.',
    ],
  },
  problem: {
    content: [
      'Deep-link failures had three top error categories; one of them was missing-location errors at ~15,000 per week.',
      'That category itself broke down into three sub-causes: country missing, area missing, or invalid area.',
    ],
    media: [
      {
        type: 'image',
        src: '/projects/location-routing/deeplink-error-top-three.png',
        alt: 'Top three deep-link error categories with missing-location errors highlighted',
        caption: 'Top 3 Deeplink Errors',
      },
      {
        type: 'image',
        src: '/projects/location-routing/location-missing-deeplink-errors.png',
        alt: 'Sub-causes of missing-location errors: country null and area null',
        caption: 'ALL the Deeplink Errors Related to Location Missing Cases',
      },
    ],
  },
  keyDecisions: [
    {
      title: 'Wrappable, mode-aware component',
      description: [
        'Built a LocationRequired component, packaged separately, that wraps any route needing location. Configurable scope via mode — country-only or country+area. Case-specific routing detects which field is missing and sends the user to the matching selection screen (country selector / address list / map screen) instead of an error page.',
        'Per-team feature-flag control: kill switch and A/B experiment flag injected by each consuming team, so adoption stays safe.',
      ],
      media: [
        {
          type: 'image',
          src: '/projects/location-routing/validation-flow.svg',
          alt: 'Location validation flowchart: checks country, mode, and area to route users to the correct selection screen',
        },
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
        src: '/projects/location-routing/location-routing-demo.mp4',
        alt: 'Demo: deep-link with missing location triggers location selection flow then resumes the intended page',
        caption: 'Demo: invalid area case — user is routed to the map screen to select a location, then auto-resumes the intended page',
      },
      {
        type: 'image',
        src: '/projects/location-routing/location-routing-result.png',
        alt: 'Error count graph showing drop from ~20,000 to near zero over one month',
        caption: 'Missing-location errors dropped to near zero after adoption',
      },
    ],
  },
};
