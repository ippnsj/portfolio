import type { Project } from "../types";
import { vlpDynamicBottomNavBarShared } from "./shared";

export const vlpDynamicBottomNavBarEn: Project = {
  ...vlpDynamicBottomNavBarShared,
  title: "Vendor Landing Page Dynamic Bottom Navigation Bar",
  period: "January 2026 – March 2026",
  role: "Architecture design, scroll-linked bottom bar animation proposal, PoC design and implementation",
  summary:
    "A BE-driven dynamic tab system on the Vendor Landing Page (VLP) — designed so the BE alone can add tabs, reorder them, or surface existing routes as tabs without a client release.",
  background: {
    content: [
      "The Vendor Landing Page (VLP) is the first screen a user lands on after picking a vendor. It is scroll-heavy by design — most users had to scroll past several promotional sections to reach category list.",
      "Internal data showed category browsing was the highest-converting funnel — but its entry sat below the fold on VLP.",
      "The team hypothesized that pinning category as a tab on a bottom bar could compress the time to purchase intent, and that the same bar could host future campaign tabs (e.g., a Ramadan Specials destination).",
    ],
  },
  problem: {
    content: [
      "Category PLPs accounted for 42.80% of all add-to-cart actions across G&R pages — making them the highest-converting pages on G&R. But the entry point — the Category List widget on VLP — sat below the fold and required scrolling to reach.",
      "A static bottom bar with hardcoded tabs would have been the simplest implementation, but every new tab (e.g., a campaign tab) would require an app release, and any tab change would have to ride the standard release cycle — a poor fit for marketing's iteration tempo.",
    ],
    media: [
      {
        type: "image",
        src: "/projects/vlp-bottom-nav-bar/en/before-after-structure.svg",
        alt: "Before and after page structure: Category List moves from below the fold into a pinned bottom-bar tab",
      },
    ],
  },
  keyDecisions: [
    {
      title: "BE-driven dynamic tab contract",
      description: [
        "The BE response defines both which tabs exist and what each one renders. Each tab in the contract is one of two types:",
        "`embedded_widget` — for content that exists as a widget but does not have (or need) its own deeplink/route. The Nav Bar embeds the widget directly. FE holds a `widget_type → Widget` mapping; BE specifies which widget to embed by sending a widget_type. Adding a brand-new embedded type still requires an FE release for the mapping. The category list widget is an example: it only ever appears inside VLP, so no standalone route was needed.",
        "`route` — for content that is already reachable via an existing route (e.g., a deeplink). The Nav Bar swaps VLP's content area for that route's content — VLP itself stays mounted (nested routing). No new widget code, no new route code, no FE release — just BE adding the existing route's deeplink to the contract. The category PLP fits here: it already had a deeplink.",
        "Together, the two types cover both shapes of pre-existing content. The real value of this contract — adding tabs without an FE release — comes from `route`.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/vlp-bottom-nav-bar/en/vlp-be-driven-tab-contract.svg",
          alt: "BE-driven tab contract: each tab is either an embedded_widget (FE-mapped widget) or a route (existing deeplink) — BE adds or reorders tabs without an FE release",
        },
      ],
    },
    {
      title:
        "Scroll-linked bottom bar: NotificationListener over ScrollController injection",
      description: [
        "The bottom bar was intended to hide on scroll-down and reveal on scroll-up — a common pattern for maximizing content area without losing navigation.",
        "The team's first instinct was for VLP (the parent of each tab) to create a ScrollController, inject it into the tab's child widget, and listen to scroll events to drive the Nav Bar animation. I pushed back for two reasons. First, ScrollController injection requires each child widget to be built to receive and wire a controller from parent — but `route` tabs reuse existing routes that weren't designed that way, so adopting this pattern would mean code changes to every route, breaking the contract's no-FE-release promise. Second, it would tightly couple VLP to each tab's internal scrollable — any change to how a tab handles scrolling would risk breaking the Nav Bar animation.",
        "I proposed using NotificationListener at the parent level instead — VLP wraps the page and listens to ScrollNotifications bubbling up. The Nav Bar receives a simple show/hide signal, not a controller reference. Tabs of either type need no modification: ScrollNotifications bubble up naturally from any Scrollable.",
        "**Performance concern:** NotificationListener fires on every scroll event by default, including unrelated ones (overscroll bounce, horizontal scrolls inside carousels, etc.). Introduced four guards filter notifications before animating the nav bar: ScrollUpdate events only, vertical axis only, valid scrollable range only, and significant movement only (filtering out minor noise below a pixel threshold).",
        "Guards 1 and 3 may look like duplicates, but they catch different cases. Guard 1 filters out OverscrollNotification — a separate notification type that fires only at the first moment of overscroll. Guard 3 picks up what comes after: during iOS bounce-back, ScrollUpdateNotifications keep firing with pixels outside minScrollExtent/maxScrollExtent, and Guard 3 filters those out.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/vlp-bottom-nav-bar/en/scroll-logic.svg",
          alt: "Scroll-linked bottom bar logic: VLP wraps the page with NotificationListener and forwards a show/hide signal to the Nav Bar after four guards filter out unrelated scroll events",
        },
      ],
    },
    {
      title: "Navigator scope handling, paired with Rider migration",
      description: [
        "When tabs use the `route` type, the destination is rendered inside the tab context. Overlays (bottom sheets, dialogs, snack bars) shown from descendant components default to the nearest navigator — now the tab's nested navigator — so they'd render inside the tab, causing unexpected interactions with the bottom nav bar. Each overlay call site needed to be audited and explicitly routed to the root navigator (via `rootNavigator: true`).",
        "Since this audit touched every overlay call site, there was a related decision riding on top: leave them as direct Navigator usages, or migrate to Rider — the company-standard navigation wrapper that centralizes navigator access and is the foundation for an eventual GoRouter migration.",
        "I proposed bundling the Rider migration in. It was already planned for later, and would have required auditing the same call sites — doing both at once avoided repeating the audit. To avoid delaying the project, I scoped the in-project migration to just the call sites touched by this audit. After the project shipped, I voluntarily completed the migration across the remaining G&R tribe screens — leaving the navigation layer consistent.",
      ],
    },
  ],
  result: {
    content: [
      "Shipped behind kill-switch and A/B testing. The BE-driven contract worked as designed — during the experiment window, the BE was able to change tab configurations without client releases.",
      "The A/B itself showed low tab interaction — the bottom-bar tab format wasn't a natural fit for this surface. Once the result was clear, the experiment was turned off via the feature flag, instantly reverting users to the original VLP — no code change or client release required.",
      "The learning was about the hypothesis itself: just lifting category access didn't help — users still went tab → list → PLP, the same steps as before. The real opportunity was to skip that middle step.",
      "A side outcome: the Rider migration standardized navigator access across G&R tribe screens, leaving the navigation layer consistent — not just for this feature.",
    ],
    media: [
      {
        type: "video",
        src: "/projects/vlp-bottom-nav-bar/demo.mp4",
        alt: "Demo: tapping the Category tab swaps the VLP scroll page for the Category List, and the bottom bar hides on scroll-down and reveals on scroll-up",
      },
    ],
  },
};
