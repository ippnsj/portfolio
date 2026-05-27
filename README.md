# Portfolio

Personal portfolio site for Sojung Lee.

**[🔗 Live site](https://sojunglee.vercel.app)**

## About

A minimal, code-first site focused on the work itself.

Supports per-recipient customization via URL params: a registered company name maps to a curated brand color and a filtered set of projects, while an arbitrary color param applies a custom color with all projects shown.

## Features

- **Dynamic theming** via URL params (`?company=` or `?color=`)
- **Light mode** — consistent with resume and cover letter
- **Static-first** — all content lives in code, rendered as Server Components
- **English only** in this iteration

## Tech stack

- [Next.js 15+](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config via `@theme`)
- [Vitest](https://vitest.dev/) (testing)
- [Claude Code](https://claude.com/claude-code) with skills (see `.claude/skills/`)
- [Vercel](https://vercel.com/) (hosting)

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Customization

Default: royal blue brand color, all projects shown.

```
/?company=companyName     # registered company → mapped color + curated projects
/?color=hexColor          # arbitrary color → all projects shown
```

Currently the project set is the same across all params — the filtering infrastructure is in place for future expansion as new projects are added.
