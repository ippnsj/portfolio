import type { Project } from "../types";
import { oodFallbackUXShared } from "./shared";

export const oodFallbackUXEn: Project = {
  ...oodFallbackUXShared,
  title: "Fallback UX to Retain Users in Non-Deliverable Areas",
  period: "November 2025",
  role: "Data-driven hotspot analysis, fallback flow design and implementation, success-measurement design",
  summary:
    "A fallback UX that gives users an alternative vendor-selection screen instead of an error page when their nearest store can't be found — recovering the purchase flow. Pinpointed the highest-leverage fix through data analysis, designed the recovery flow, and designed the success metric so the gain could be measured accurately.",
  background: {
    content: [
      "The Vendor Landing Page (VLP) renders only when all of its dependency APIs succeed. One of them, the Vendor Session API, finds the user's nearest store (Nearest Darkstore); if that call fails, the user can't enter the store and hits an error page instead.",
    ],
  },
  problem: {
    content: [
      "With VLP SLI below its reliability target, the first task was to pinpoint — with data — which fix would have the biggest impact.",
      "At the same time, users who couldn't find a store were dropping off at the error page and had to be guided back into the purchase flow.",
    ],
  },
  keyDecisions: [
    {
      title:
        "Data-driven hotspot analysis — pinpointing the highest-leverage fix",
      description: [
        "I broke down VLP's dependency APIs by path to compute directly where reliability was degrading. Splitting the Vendor Session API into the Branch ID path and the Nearest Darkstore path, I converted RPM metrics into daily request volumes and compared request volume and error rate per path.",
        "Nearest Darkstore was only ~5% of all traffic, but its per-request error rate was ~18 times higher than the other path — making it ~47% of all Vendor Session failures. It's a segment easy to overlook by traffic share alone, surfaced only by breaking down per-request error rate.",
        "~90% of those errors were a single type — `vendor not present in the map`. I calculated that fully eliminating this one error could lift VLP SLI by up to ~0.4%p — proving with data that it was the highest-leverage, lowest-effort fix.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/ood-fallback-ux/en/hotspot-analysis.svg",
          alt: "Hotspot analysis: breaking down Vendor Session by path shows Nearest Darkstore is ~5% of traffic but ~18× the error rate, driving ~47% of failures",
        },
      ],
    },
    {
      title:
        "Accurate success measurement — not mistaking recovery for success",
      description: [
        "Since fallback routes a failed user to an alternative vendor-selection screen, naively counting 'the fallback screen was shown' as a success would inflate the real impact. SLI is measured as `(valid − failures) / valid` (valid is the total set of valid events — both successes and failures).",
        "To prevent that, when the first attempt (Vendor Session) fails, the failure is recorded and never erased after the fact. Switching the screen to vendor selection does not overwrite the original failure — if the user leaves the fallback screen without selecting a branch, the original failure simply remains.",
        "When the user enters the VLP after branch selection, valid is counted again: if the user actually renders the VLP successfully, the failure's weight is naturally diluted; if it fails again for another reason, that failure accumulates accurately. This structure guarantees that any SLI gain comes from real user recovery, not from gaming the metric.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/ood-fallback-ux/en/success-measurement.svg",
          alt: "Success measurement: the first failure is never erased; valid is counted again on re-entry, so SLI recovers only on real success and accumulates failures accurately otherwise",
        },
      ],
    },
  ],
  result: {
    content: [
      "Showed users in non-deliverable areas an alternative vendor-selection screen instead of an error page, preventing drop-off and restoring the entry path.",
      "Through data analysis, identified up to ~0.4%p of VLP SLI improvement headroom from recovering the `vendor not present in the map` error.",
    ],
  },
};
