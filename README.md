# Portfolio

Personal portfolio site for Sojung Lee.

**[🔗 Live site](https://sojunglee.vercel.app)**

## About

A minimal, code-first portfolio focused on the work itself.

Supports lightweight per-recipient customization via URL params: an arbitrary brand color (`?color=`) and an initial language hint (`?lang=`). Visitors can also switch the display language from the header.

## Features

- **Dynamic brand color** via `?color=` URL param
- **Initial language hint** via `?lang=` URL param (one-shot — sets cookie and redirects to a clean URL)
- **Language switcher** in the header (English / Korean)
- **Light mode only** — consistent with resume and cover letter
- **Static-first** — all content lives in code, rendered as Server Components

## Tech stack

- [React](https://react.dev/) 19
- [Next.js](https://nextjs.org/) 16 (App Router)
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

## URL params

```
/?color=2EB85A     # custom brand color (hex without #; # is also accepted)
/?lang=ko          # initial language hint — sets cookie, redirects to clean URL
```

Once `?lang=` is consumed, the cookie persists. Switching language via the header updates the cookie. Subsequent `?lang=` visits overwrite it.
