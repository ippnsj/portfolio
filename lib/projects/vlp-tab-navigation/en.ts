import type { Project } from "../types";
import { vlpTabNavigationShared } from "./shared";

export const vlpTabNavigationEn: Project = {
  ...vlpTabNavigationShared,
  title:
    "Vendor Landing Page Tab Navigation — Improving Category-Based Store Browsing",
  period: "May 2026 – Present",
  role: "PoC design & implementation, reusable tab component design, key architecture decisions & edge-case handling, RFC co-authoring",
  summary:
    "Introduced category-based tab navigation to the Vendor Landing Page (VLP) so users can jump straight to the area they want. Designed it to keep components reusable while syncing colors across the UI on each tab switch, and anticipated key edge cases before implementation. With PoC and RFC review complete, currently preparing a gradual rollout via experiment.",
  background: {
    content: [
      "The VLP is the first screen a user lands on after selecting a vendor. Category browsing is the highest-converting flow, but its entry point sat far down the scroll, making browsing inefficient.",
      "A prior dynamic bottom-navigation-bar experiment showed that just raising the category entry point wasn't enough — the number of steps a user takes to reach the category page had to be reduced. That led to category-based tab navigation, letting users jump straight into a category area.",
    ],
  },
  problem: {
    content: [
      "Implementing the tab navigation surfaced problems that had to be handled.",
      "First, a color-synchronization requirement: on each tab switch, the header, tab bar, and some child components had to recolor together, with text color flipping automatically based on background brightness.",
      "Second, concurrency, performance, and cache-consistency issues that arise when handling fast tab switching, pagination, and caching.",
    ],
  },
  keyDecisions: [
    {
      title:
        "Color synchronization on tab switch — isolating subscription responsibility in a wrapper widget",
      description: [
        "On a tab switch, the header and tab bar background, the text color, and the background/text color of some child components (such as chips) all had to change together. Text color had to flip automatically — black on a light background, white on a dark one.",
        "The two approaches we first considered both had drawbacks. (1) Each component subscribing to the tab color directly — this made the component hard to reuse where color subscription isn't needed. (2) The backend sending the color value to each component separately — the same color scattered across components, hurting data consistency.",
        "Rather than settling for either, I kept driving the team discussion by pointing out the drawbacks of each. Together, the team landed on a wrapper widget that subscribes to the tab color/type and injects the values into each component. The component itself stays unaware of color subscription and only uses the injected values, so it remains reusable even where color isn't needed, and the backend no longer has to send color per component — resolving both drawbacks.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/vlp-tab-navigation/en/color-sync.svg",
          alt: "Color synchronization on tab switch: the header, tab bar, and some child components recolor per tab while text color flips by background brightness. A wrapper widget subscribes to color and injects it into the component.",
        },
      ],
    },
    {
      title:
        "Anticipating and defending against fast-switch, pagination, and caching edge cases before implementation",
      description: [
        "Before implementing, I anticipated problems users could actually hit while handling fast tab switching, pagination, and caching, and built a defense for each into the design.",
        "**(1) A stale response overwrites the current tab on fast switching:** when a user switches tabs rapidly, a previous tab-switch response may arrive late and overwrite the current tab. On a new tab-switch event, the previous event and its request are canceled, so the stale response is never applied.",
        "**(2) A previous tab's pagination response is applied after switching:** Tab switch and pagination are separate events, so one can't cancel the other — switching tabs cancels neither the pagination event nor its in-flight request, so its response can arrive late. To handle this, before applying a pagination response, we check whether the current state is still waiting for pagination, and discard the response if it isn't.",
        "**(3) Home-tab content cache grows unbounded, slowing restoration:** the Home tab caches the first VLP response and shows it without re-calling the API, but stacking every paginated result into that cache makes it grow without bound, causing frame drops on restore. Only the first page is cached, and the rest are fetched again as the user scrolls.",
        "**(4) A stale cached tab list shows first and doesn't work when tapped:** the VLP caches a previous response to show quickly, but if the cached tab list differs from the newly arrived real response, tapping that tab doesn't work. The tab list is excluded from caching so tabs are shown only after the real response arrives.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/vlp-tab-navigation/en/edge-cases.svg",
          alt: "Anticipated edge cases and defenses: block stale responses on fast tab switching, cache only the first page of Home-tab content, and exclude the tab list from caching.",
        },
      ],
    },
  ],
  result: {
    content: [
      "Completed implementing the PoC and a reusable tab component, and wrote up the design direction as an RFC that passed team review.",
      "Currently preparing a gradual rollout via an A/B experiment.",
    ],
  },
};
