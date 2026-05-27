---
name: code-quality-standards
description: Use this skill whenever writing or reviewing React, Next.js, TypeScript, or Tailwind CSS code in this project. Trigger this skill before implementing any commit's code (especially when invoked via the task-orchestrator skill), or when reviewing existing code for quality. Covers up-to-date 2026 conventions across React 19 (Server Components default, React Compiler, new hooks), Next.js 15+ App Router (params as Promises, file conventions, metadata), Tailwind CSS v4 (CSS-first @theme configuration, no JS config file), TypeScript 5+ strict mode, and Vitest + React Testing Library for testing.
---

# Code Quality Standards

A set of conventions to follow when writing or reviewing code in this project. Organized into general principles followed by stack-specific sections. Read the sections relevant to the code being written.

## General Principles

1. **Names communicate intent**: prefer descriptive names over comments. `getUserById` > `get` + `// gets user`.
2. **Single Responsibility**: each function, component, or module does one thing well. If you find yourself writing "and" in the description, split it.
3. **DRY (Don't Repeat Yourself) — applied differently by category**:
   - **Utilities, helpers, hooks**: extract from the first duplication. The input/output is clear, so the abstraction risk is near zero, and updating logic in one place is safer than chasing duplicates.
   - **Components**: wait until the third occurrence ("rule of three"). Early component extraction tends to produce wrong abstractions that grow props until they're worse than the duplication. Three real uses make the shared shape clear.
   - **Data shapes / interfaces**: prefer rule of three. Early abstraction tends to constrain future requirements.
4. **Composition over inheritance**: prefer combining small pieces over deep inheritance hierarchies.
5. **Explicit over implicit**: prefer named parameters, explicit return types, explicit imports. No "magic".
6. **File names match exports**: `Button.tsx` exports `Button`. `useScrollSpy.ts` exports `useScrollSpy`.
7. **Absolute imports via aliases**: use `@/components/Button` not `../../../components/Button`.
8. **One component per file** (with exception for tightly-coupled sub-components).

## TypeScript 5+

Project assumes `strict: true` (already enabled by `create-next-app`).

### Type definitions

- **Use `interface` for object shapes** (extensible, supports declaration merging): `interface UserProps { ... }`
- **Use `type` for unions, intersections, mapped types**: `type Status = 'idle' | 'loading' | 'success'`
- **Avoid `any`. Use `unknown` with type guards** when type is truly unknown.
- **No `React.FC`**. Just write function components with typed props:
  ```tsx
  // ❌ Outdated
  const Button: React.FC<ButtonProps> = ({ label }) => <button>{label}</button>;

  // ✅ Current
  function Button({ label }: ButtonProps) {
    return <button>{label}</button>;
  }
  ```
- **Use `satisfies` for inferring narrow types** while still type-checking:
  ```tsx
  const palette = {
    primary: '#2EB85A',
    secondary: '#1a1a1a',
  } satisfies Record<string, string>;
  ```
- **Explicit return types on all functions, except React components**. Refactoring safety: when a function's export status or its callers change, the return contract stays stable. Components are the exception — they almost always return JSX/ReactNode and TypeScript infers this accurately:
  ```tsx
  // ✅ Regular functions — explicit return type
  export function formatDate(date: Date): string { ... }
  function calculateTotal(items: Item[]): number { ... }
  async function fetchUser(id: string): Promise<User> { ... }

  // ✅ Components — return type inferred (no annotation)
  function Button({ label }: ButtonProps) {
    return <button>{label}</button>;
  }
  ```

### Type imports

- Use `import type` for type-only imports (smaller bundles, clearer intent):
  ```tsx
  import type { ReactNode } from 'react';
  import { useState } from 'react';
  ```

## React 19

### Server vs Client Components

**Server Components are the default in Next.js App Router.** Don't add `"use client"` unless the component actually needs:
- React hooks (`useState`, `useEffect`, etc.)
- Event handlers (`onClick`, `onChange`, etc.)
- Browser-only APIs (`window`, `document`, etc.)

**Push `"use client"` to leaf components.** Don't mark a whole tree as client when only one button needs interactivity. Wrap that button in its own client component, keep the parent server.

### Hooks and patterns

- **Don't reach for `useMemo`/`useCallback` first.** React Compiler (enabled by default in React 19+ projects) handles most memoization automatically. Use manual memo only after measuring and confirming a problem.
- **Custom hooks for shared logic**: any logic used in 2+ components → extract to `useX` hook.
- **`useEffect` is for syncing with external systems**, not for derived state. If you can compute it from props/state, do that instead.
- **Avoid `useEffect` for data fetching in Server Components**. Just `await` the data directly in the Server Component.

### Component structure

```tsx
// 1. Imports (external, then internal)
import { useState } from 'react';
import type { ReactNode } from 'react';

import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

// 2. Types
interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

// 3. Component
export function Card({ title, children, className }: CardProps) {
  return (
    <div className={cn('rounded-lg p-4', className)}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

## Next.js 15+ App Router

### File conventions (in `src/app/`)

- `page.tsx` — route UI
- `layout.tsx` — persistent wrapper for a segment
- `loading.tsx` — Suspense fallback (streaming)
- `error.tsx` — error boundary
- `not-found.tsx` — 404 UI
- `route.ts` — API route handler

### Critical gotcha: `params` and `searchParams` are Promises

In Next.js 15+, these are async. Always `await` them:

```tsx
// ❌ Outdated (Next.js 14)
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>{params.slug}</h1>;
}

// ✅ Current (Next.js 15+)
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}
```

### Metadata for SEO

Use `generateMetadata` for dynamic or `metadata` export for static:

```tsx
// Static metadata
export const metadata = {
  title: 'Sojung Lee — Portfolio',
  description: 'Mobile software engineer...',
};

// Dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${slug} — Portfolio` };
}
```

### Data fetching

In Server Components, just `await` directly:

```tsx
// ✅ Server Component
export default async function ProjectsPage() {
  const projects = await fetchProjects();
  return <ProjectsList projects={projects} />;
}
```

No need for `useEffect`, `getServerSideProps`, or `getStaticProps`.

## Tailwind CSS v4

### CSS-first configuration (no JS config file)

Tailwind v4 has no `tailwind.config.js`. All theme tokens live in CSS:

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand: #2EB85A;
  --font-display: 'Carlito', sans-serif;
  --breakpoint-3xl: 120rem;
}
```

These generate utilities like `bg-brand`, `font-display`, `3xl:grid-cols-4` automatically.

### Class organization

- **Use `prettier-plugin-tailwindcss`** for automatic class sorting (already included by `create-next-app`).
- **Order matters less because of the plugin**, but the convention is: layout → spacing → typography → color → state → responsive. The plugin enforces this.
- **Conditional classes**: use a `cn` utility (combination of `clsx` and `tailwind-merge`):

  ```tsx
  // src/lib/utils.ts
  import { clsx, type ClassValue } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```

  Then in components:

  ```tsx
  <button className={cn('rounded px-4 py-2', isPrimary && 'bg-brand text-white')}>
  ```

### When to extract a component vs leave inline

- **Inline class strings are fine for 1-2 occurrences.**
- **Extract a component when the same class string repeats 3+ times.** Don't extract just because the class list is long — long class lists in a single-use component are fine.
- **Avoid `@apply` for everyday styling**. It hides the utility layer Tailwind is meant to expose. Reserve `@apply` for rare bridging cases.

## Testing

### When tests are required

Write tests for code that is **reusable** or carries **non-trivial logic**:
- Reusable components used in 3+ places (e.g., `Button`, `Card`, `Tag`)
- Custom hooks (e.g., `useScrollSpy`, `useTheme`)
- Utility functions (e.g., `formatDate`, `slugify`)
- Anything with conditional rendering, prop variants, or state transitions

### When tests are optional (skip)

- One-off section components (e.g., `HeroSection`, `AboutSection`)
- Pure layout components with no logic
- Visual-only changes (CSS, copy edits)

### Stack: Vitest + React Testing Library

Vitest is the modern replacement for Jest in Next.js projects (faster, native ESM, near-identical API).

### Test file location

**Co-locate**: place `Component.test.tsx` next to `Component.tsx` in the same folder.

```
src/components/Button/
├── Button.tsx
└── Button.test.tsx
```

### Test principles

- **Test behavior, not implementation.** Assert on what the user sees and does, not internal state.
- **Use accessible queries** in this order: `getByRole` > `getByLabelText` > `getByText` > `getByTestId` (last resort).
- **One assertion per test** when reasonable; multiple are OK if they describe one behavior.
- **Arrange / Act / Assert** structure:

  ```tsx
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import { Button } from './Button';

  test('calls onClick when clicked', async () => {
    // Arrange
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // Act
    await userEvent.click(screen.getByRole('button', { name: /click me/i }));

    // Assert
    expect(handleClick).toHaveBeenCalledOnce();
  });
  ```

### What NOT to do in tests

- ❌ Don't test framework internals (e.g., that `useState` works)
- ❌ Don't snapshot test entire components (brittle, low signal)
- ❌ Don't test private helpers — test through the public component API
- ❌ Don't use `data-testid` unless there's no accessible alternative

## Quick gotchas to avoid (commonly outdated patterns)

- ❌ Adding `tailwind.config.js` → v4 uses `@theme` in CSS
- ❌ Treating `params` as plain object → it's a Promise in Next.js 15+
- ❌ Adding `"use client"` to every component → only at the leaf where it's needed
- ❌ Manual `useMemo`/`useCallback` everywhere → React Compiler handles it
- ❌ `React.FC<Props>` → just `function Component({ ... }: Props)`
- ❌ `defaultProps` → use default parameter values
- ❌ Jest → use Vitest for new projects
- ❌ Class components → functional components with hooks
- ❌ `getServerSideProps`/`getStaticProps` → just `await` in Server Components
