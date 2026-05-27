---
name: task-orchestrator
description: Use this skill whenever the user wants to execute a coding task with explicit review at each commit. Trigger on short-form invocations like "task-orchestrator portfolio" or "task-orchestrator .claude/tasks/portfolio.md", natural-language invocations like "use task-orchestrator with the task at portfolio.md" or "let's plan and build [X] step by step", or any request to slice work into reviewable commits with progress tracking. Always start in planning mode (no code writing) before getting user approval of the plan, then implement commit-by-commit with mandatory user approval before each git commit. Track all progress in a task-specific progress file under .claude/progress/.
---

# Task Orchestrator

A skill for executing coding tasks as a series of small, reviewable commits with mandatory user approval gates.

## Core Principles

1. **Planning before coding**: Never write code until the plan is approved.
2. **User approval gate**: NEVER commit without an explicit `cm` from the user. This is the most important rule.
3. **Progress tracking**: Maintain `.claude/progress/{task-name}-PROGRESS.md` throughout — it's the single source of truth.
4. **Atomic commits**: Each commit should be reviewable independently and represent meaningful progress.
5. **Code quality**: Consult the `code-quality-standards` skill before implementing each commit.

## Workflow

### Step 1: Receive task

Task can come in three forms:
- **Short name**: `task-orchestrator portfolio` → resolve to `.claude/tasks/portfolio.md`
- **File path**: `task-orchestrator .claude/tasks/portfolio.md` or `task-orchestrator /absolute/path.md` → use as-is
- **Inline / natural language**: User describes the task in conversation or says "use task-orchestrator with the task at X"

**Resolution rules**:
- If the argument has no `/` and no `.md`, treat it as a short name → look in `.claude/tasks/{name}.md`
- If the argument ends in `.md` or contains `/`, treat it as a path
- If no file is referenced, treat as inline task — ask the user for a short task name (kebab-case) for the progress file

View the task file first. The file structure is flexible — extract goals, constraints, and deliverables from whatever's there.

### Step 2: Planning mode (NO code writing yet)

Slice the task into commit-sized chunks:

1. Identify main objectives from the task
2. Group work into atomic, reviewable commits
3. Order commits by dependency (foundation first, features after)
4. For each commit, capture two pieces of information:
   - **Goal**: what the commit aims to achieve (intent)
   - **Scope**: what files/components/areas will likely be affected
5. Do NOT propose commit messages yet — those come after the code is actually written

**Commit sizing guidance**:
- **Too small**: a single line tweak (combine with related work)
- **Too big**: multiple unrelated features (split)
- **Sweet spot**: one logical unit (e.g., "set up project structure", "implement Hero component", "configure Tailwind theme")

### Step 3: Write the progress file

Create `.claude/progress/{task-name}-PROGRESS.md` with the format below. Create the `.claude/progress/` directory if it doesn't exist.

Show the plan to the user.

**DO NOT proceed to implementation until the user explicitly approves the plan.** Approval signals at this stage can be flexible (e.g., "looks good", "approved", "ok"), but for git commits later, only `cm` will be accepted.

If the user requests plan changes, iterate on the progress file until approved.

### Step 4: Implement commit-by-commit

For each commit in order:

1. **Update progress file**: Mark current commit as `IN PROGRESS`
2. **Consult code quality skill**: View `.claude/skills/code-quality-standards.md` before writing code
3. **Implement**: Write the code following the standards
4. **Verify**: Run necessary checks (type check, lint, build) if applicable
5. **Show changes**: Present the diff or list of files modified to the user
6. **Propose commit message** (now that the actual code is written): Suggest a conventional commit message based on what was actually built. Add it to the progress file as `**Proposed message**`.
7. **Wait for explicit `cm`**:
   - User types `cm` → proceed to commit with the proposed message
   - User types `cm "custom message"` → commit with the custom message
   - ANY other input (questions, feedback, modifications, "ok", "looks good") → treat as iteration request, DO NOT commit. If the change affects the proposed message, update it.
   - If unsure → ASK explicitly: "Type `cm` to commit, or tell me what to change."
8. **Commit** (only after explicit `cm`):
   - Use conventional commit format: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `style:`, `test:`
9. **Update progress file**: Mark commit as `DONE`. Replace `Proposed message` with the final `Message`. Add the commit `Hash`.

### Step 5: Handle mid-flight plan changes

If during implementation the plan needs to change:

- **Commit needs splitting**: Update progress file to add a new commit slot; ask user
- **New commit needed**: Insert into progress file at the right position; ask user
- **Goal or scope drift**: Update Goal/Scope of the current commit before proceeding
- **Major restructure**: Pause implementation, revise plan, get re-approval

Always update the progress file before continuing.

### Step 6: Completion

When all commits are done:
1. Show final progress file state
2. Summarize what was built
3. Ask if there's any cleanup or follow-up work

## Progress File Format

Location: `.claude/progress/{task-name}-PROGRESS.md`

Each commit entry evolves through three states:

**After planning (TODO)** — intent only, no message yet:

```markdown
### Commit 2: [TODO] Hero section
**Goal**: Implement the hero section with name, tagline, and contact links
**Scope**: Create Hero component, integrate into the main page
```

**During implementation (IN PROGRESS)** — actual code written, message proposed:

```markdown
### Commit 2: [IN PROGRESS] Hero section
**Goal**: Implement the hero section with name, tagline, and contact links
**Scope**: Create Hero component, integrate into the main page
**Proposed message**: `feat: add Hero section with name and contact links`
```

**After commit (DONE)** — finalized record:

```markdown
### Commit 2: [DONE] Hero section
**Goal**: Implement the hero section with name, tagline, and contact links
**Scope**: Create Hero component, integrate into the main page
**Message**: `feat: add Hero section with name and contact links`
**Hash**: abc1234
```

Full file example:

```markdown
# Task Progress: Portfolio Site

## Task Reference
.claude/tasks/portfolio.md

## Plan

### Commit 1: [DONE] Initial project setup
**Goal**: Bootstrap a Next.js + TypeScript + Tailwind project
**Scope**: package.json, tsconfig, tailwind config, basic file structure
**Message**: `chore: initial project setup with Next.js, TypeScript, Tailwind`
**Hash**: a1b2c3d

### Commit 2: [IN PROGRESS] Hero section
**Goal**: Implement the hero section with name, tagline, and contact links
**Scope**: Create Hero component, integrate into the main page
**Proposed message**: `feat: add Hero section with name and contact links`

### Commit 3: [TODO] About section
**Goal**: Add the About section with engineering philosophy
**Scope**: Create About component, write content

### Commit 4: [TODO] Projects section
**Goal**: Implement the Projects section with 3 project cards
**Scope**: ProjectCard component, Projects section, project data
```

Status markers: `DONE` / `IN PROGRESS` / `TODO` / `SKIPPED`

## Critical Rules (Repeat for Emphasis)

- **NEVER commit without an explicit `cm` from the user.** Default to NOT committing if anything is unclear.
- **NEVER skip the planning step.** Always write the progress file before any code.
- **NEVER propose a commit message during planning.** Messages are proposed only AFTER actual code is written.
- **ALWAYS update the progress file** after each step transition (TODO → IN PROGRESS → DONE).
- **ALWAYS consult code-quality-standards** before writing each commit's code.
- If the user says "just do it" or "skip the review", politely remind them this skill is designed for review-heavy workflow. If they insist, defer to their explicit instruction but document the deviation in the progress file.
