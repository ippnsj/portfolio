import type { Project } from "../types";
import { brokenImageAutomationShared } from "./shared";

export const brokenImageAutomationEn: Project = {
  ...brokenImageAutomationShared,
  title: "Automated Broken-Image Reporting & Content-Team Workflow",
  period: "February – March 2025, June 2026",
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
      title:
        "Meeting the Content team's request — injecting branch_id without duplicated logic",
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
      title:
        "Isolating each observability source so it can be swapped by editing one workflow",
      description: [
        "The broken-image data originally came from New Relic. When the organization later moved its observability stack toward Sentry, the reporting pipeline had to be able to switch sources without disrupting the weekly reports — so I designed the structure to make that switch a configuration change rather than a rewrite.",
        "Each source (New Relic, Sentry) owns its own fetch, query config, and parse-and-upload logic, kept in a self-contained folder. They can't share one implementation because the query styles and response formats differ — New Relic is a single GraphQL query that curl can handle, while Sentry's REST API needs the field parameters built up dynamically, and the differing response shapes mean the upload step has to parse each one differently.",
        "Within that upload step, though, the parts that genuinely are identical — like the Google Sheet read/write utilities — are pulled out into a shared utility file and reused by both sources, rather than duplicated. Each source only implements what's actually source-specific.",
        "Each source has its own reusable workflow that runs that source's fetch, parse, and upload steps. Each team's entry workflow can switch sources easily — by pointing its `uses` line at one reusable workflow and passing that source's two secrets.",
        "The Slack-notification step is shared at the workflow level: both reusable workflows call the same single notification file. And because each source lives in its own folder, decommissioning the old one after the migration is just deleting that folder and its reusable workflow — without modifying shared code.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/broken-image-automation/en/observability-source-swap.svg",
          alt: "Switching the observability source: each team's entry workflow selects a source-specific reusable workflow (New Relic active, Sentry as migration target); each source owns its fetch, config, and parse-and-upload, while shared utilities and Slack notification are reused",
        },
      ],
    },
    {
      title:
        "Letting any team build the same pipeline by adding just two files",
      description: [
        "It was initially built for q-commerce only, but this time I refactored it so other teams (e.g. Food) could build the same pipeline more easily and quickly. The key was making sure the shared script code never has to be touched when a team sets up its pipeline.",
        "Every script is driven by the `-v {vertical}` parameter. The fetch step reads that team's config to filter target screens (routes), the upload step uses the same config to decide which metadata to collect and the sheet headers, and the notification step pulls the mention target from the config. In other words, everything that varies per team lives in a single config file, while the scripts themselves are shared.",
        "As a result, a team can build the same pipeline by creating just two files — its config file (target screens, metadata, mention target), and an entry workflow that specifies which source and which secrets to use and schedules when it runs. No script code changes at all.",
        "If a new team's config is missing a required field or has a wrong type, it's caught immediately as a clear error during the step that merges and validates the configs (base + source + team) with Pydantic. A misconfiguration surfaces right at onboarding rather than slipping through silently.",
      ],
      media: [
        {
          type: "image",
          src: "/projects/broken-image-automation/en/vertical-extensibility.svg",
          alt: "Vertical extensibility: the entry workflow runs the shared scripts while passing the vertical, and the shared scripts read that vertical's config to operate. Adding a new vertical takes just two files — an entry workflow and a config — with no change to the shared scripts",
        },
      ],
    },
  ],
  result: {
    content: [
      "Established a regular fix routine for the Content team through weekly automated reporting, still in operation today.",
      "Now being adopted by other teams as well, with the rollout currently underway.",
    ],
  },
};
