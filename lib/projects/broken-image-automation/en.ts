import type { Project } from "../types";
import { brokenImageAutomationShared } from "./shared";

export const brokenImageAutomationEn: Project = {
  ...brokenImageAutomationShared,
  title: "Automated Broken-Image Reporting & Content-Team Workflow",
  period: "February – March 2025",
  role: "Problem discovery, automation pipeline design and implementation, establishing the content-team fix workflow",
  summary:
    "An automation system that weekly collects and reports broken images so the Content team can fix them proactively. Issues that used to be observed but never acted on are now reported and fixed every week. Spotted the disconnect between the data and the team that fixes it, and connected them with a pipeline.",
  background: {
    content: [
      "When product, banner, or vendor images break (e.g. with a 404) in the app, the missing visuals directly hurt the user experience. Content without images struggles to draw user attention and engagement.",
      "Broken images were already observed in New Relic, but there was no flow to deliver that data to the Content team — the team that actually fixes them — so the problem stayed visible yet unaddressed.",
    ],
  },
  problem: {
    content: [
      "The core problem was a disconnect: the observability data kept accumulating but never led to fixes. There was no existing way to regularly deliver this data to the Content team in a form they could actually use, so it had to be built from the scratch.",
    ],
  },
  keyDecisions: [
    {
      title: "Connecting data and fixers with an automated pipeline",
      description: [
        "Spotted that there was no delivery flow at all between the observability data and the team that fixes the issues. Decided to build that delivery flow from scratch and automate it, so it wouldn't depend on someone remembering to do it each time.",
        "Built it as a pipeline that runs automatically every week, so the items to fix arrive at the Content team on a regular basis.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/broken-image-automation/en/pipeline.svg",
          alt: "Automated pipeline: a GitHub Actions scheduler weekly collects broken images from New Relic, records them to a Google Sheet, and notifies the Content team on Slack",
        },
      ],
    },
    {
      title: "Meeting the Content team's request — injecting branch_id without duplicated logic",
      description: [
        "To identify what to fix, the Content team needed to know which store an image belonged to (branch_id). But images are used across countless screens in the app, so making every usage carry its own logic to fetch branch_id would have been a heavy burden.",
        "I weighed two alternatives. (1) Provider injection — only works when the route already carries branch_id; on screens that don't, there's simply no value to inject. (2) Injecting the same branch_id-fetching UseCase into each screen's BLoC — possible, but the same domain-fetching logic would be duplicated across many BLoCs, widening the change footprint.",
        "Instead, I wrapped the entire route once with an Inherited Widget, and had only that widget fetch branch_id from the domain layer. Child screens don't carry the fetching logic themselves — they just read the value from context: branch_id is returned anywhere it exists, and null where it doesn't. This value is attached to the image observability data, providing the identifier the Content team asked for without any duplicated logic.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/broken-image-automation/en/branch-id-injection.svg",
          alt: "branch_id injection design: Provider only works when the route carries branch_id, a per-BLoC UseCase duplicates logic — an Inherited Widget wraps the whole route so a single place fetches from the domain and children read from context",
        },
      ],
    },
    {
      title: "Reusable design — spreading to other verticals",
      description: [
        "Designed to be adopted by other verticals (e.g. Food) in mind from the start, separating scripts, queries, and config. Swapping only the values that differ per vertical (target screens, the team to notify, etc.) is enough to establish the same system quickly and easily.",
        "Documented how to build and set up the system in a guide, so other teams could adopt it quickly.",
      ],
    },
  ],
  result: {
    content: [
      "Established a regular fix routine for the Content team through weekly automated reporting, still in operation today.",
      "Spread within the organization to the point of drawing adoption requests from other teams.",
    ],
  },
};
