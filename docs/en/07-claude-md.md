---
title: "CLAUDE.md - Persistent Project Instructions"
section: 7
lang: en
tags:
  - claude-code
  - claude-md
  - project-config
aliases:
  - "CLAUDE.md"
related:
  - "[[06-configuration]]"
  - "[[08-memory]]"
---

# CLAUDE.md - Persistent Project Instructions

### Benefits and Use Cases

> **Why have CLAUDE.md?**
>
> CLAUDE.md is **the "brain" Claude uses for your project** — every session, Claude reads it first, so it **knows your project from the first second**. No re-explaining each time.

**Use Cases:**

| Scenario | What to put in CLAUDE.md | Result |
|----------|--------------------------|--------|
| **Team uses a specific naming convention** | `Components: PascalCase, Utils: camelCase` | Claude names variables/files according to your team's convention automatically — no need to repeat |
| **The project has complex build commands** | `Build: npm run build:prod`, `Test: npm run test:ci` | Claude runs the right commands every time, no confusion between dev/prod |
| **Domain-specific architecture** | `Use Repository Pattern, API lives in src/api/` | Claude writes code following the prescribed architecture instead of going freestyle |
| **Security rules** | `Never use eval(); always sanitize input` | Claude automatically avoids vulnerable code |
| **Dev environment setup** | `Run docker-compose up before testing` | Claude knows the prep steps before running tests |
| **New team members onboarding** | A complete CLAUDE.md | New members can ask Claude to explain the project right away — onboarding time drops dramatically |
| **Project with multiple modules** | Split into `.claude/rules/` files | API rules don't bleed into Frontend; reduces context usage |

**Real-world example:**

```
Without CLAUDE.md:
  You: "Fix the bug in the login function"
  Claude: "What framework do you use? How is it built? How is it tested?"
  → Have to explain every time — wastes time

With CLAUDE.md:
  You: "Fix the bug in the login function"
  Claude: (reads CLAUDE.md → knows the framework, build cmd, test cmd)
  → Goes straight to fixing
```

### What is CLAUDE.md?

A Markdown file that gives Claude instructions and context every session — like a "project handbook" Claude reads each time it starts work.

### Loading Locations (highest to lowest)

| Location | Scope |
|----------|-------|
| `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Managed (IT deployment) |
| `./CLAUDE.md` or `./.claude/CLAUDE.md` | Project (committed with the team) |
| `~/.claude/CLAUDE.md` | Personal across all projects |
| `./CLAUDE.local.md` | Personal project-only (gitignored) |

### Example CLAUDE.md

```markdown
# Project Setup

## Build Commands
- Build: `npm run build`
- Test: `npm test`
- Dev server: `npm run dev`
- Lint: `npm run lint`

## Naming Conventions
- React Components: PascalCase in `src/components/`
- Utilities: camelCase in `src/utils/`
- Types: PascalCase in `src/types/`
- CSS files: kebab-case

## Code Style
- Use 2-space indentation
- Always use TypeScript types
- Add JSDoc to public functions

## Architecture
- Use the Repository pattern for the database layer
- API routes live in `src/api/`
- Middleware lives in `src/middleware/`

## Testing
- Always write a test before fixing a bug
- Minimum coverage: 80%
- Use vitest for unit tests
```

### Importing Additional Files

```markdown
# See @README for an overview
# Workflow: @docs/workflow.md
# API Patterns: @src/api/patterns.md
```

### .claude/rules/ — Topic-Scoped Rules

Create instruction files split by subtopic:

```
.claude/rules/
├── testing.md        # Testing rules
├── api-design.md     # API rules
├── security.md       # Security rules
└── frontend/
    └── components.md # Frontend component rules
```

**Path-scoped rules (apply only to certain files):**

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules

- Always include input validation
- Use a standard error response format
- Every endpoint must have rate limiting
```

### Generate CLAUDE.md Automatically

```bash
# Use /init to have Claude analyze the project and generate it
/init
```

---

---

## Navigation

- ⬅️ Previous: [[06-configuration]]
- ➡️ Next: [[08-memory]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/07-claude-md]]
