---
title: "Tutorial Day 3: Power User Tricks"
section: 29
lang: en
tags:
  - claude-code
  - tutorial
  - advanced
  - power-user
aliases:
  - "Day 3 Tutorial"
  - "Power User"
related:
  - "[[28-tutorial-day2-first-project]]"
  - "[[03-slash-commands]]"
  - "[[12-subagents]]"
  - "[[14-context-management]]"
  - "[[30-cookbook-recipes]]"
---

# Tutorial Day 3: Power User Tricks

> **Goal:** Take you from "I can use it" → "I'm good with it" in a single day
>
> These are the tricks 10x developers use every day

## Trick 1: Slash Commands you'll actually use

Instead of typing long instructions, use `/` shortcuts.

| Slash | What it does | When to use |
|-------|--------------|-------------|
| `/clear` | Clear the entire context | Switching to a big new task → start fresh |
| `/compact` | Condense the context | Long-running work → context is filling up |
| `/cost` | View token usage | Check how much you've spent |
| `/permissions` | Edit tool permissions | Tired of pressing Yes every time |
| `/model` | Switch model | Easy task → use Haiku to save money |
| `/exit` | Exit | Done for the day |

> See every command: [[03-slash-commands]]

## Trick 2: Subagents (delegate work to a team)

Instead of having Claude do everything itself → **have it spin up sub-teams**, each specialized in something different.

### Real example

```
I have a big Next.js project. I need to:
1. Find every place that uses a deprecated API
2. Write a migration plan
3. Start fixing the most important files

Use subagents in parallel.
```

Claude will:
- Spawn agent A → grep for the deprecated API
- Spawn agent B → read migration docs
- Combine results → propose a plan

> **Result:** 3-5x faster + a cleaner main context
>
> See more: [[12-subagents]] / [[13-agent-teams]]

## Trick 3: Great CLAUDE.md files

A good CLAUDE.md = Claude understands the project the moment it opens.

### Recommended template

```markdown
# Project: My App

## What this is
[1-2 sentences]

## Tech Stack
- Frontend: React 18 + TypeScript
- Backend: Bun + Elysia
- DB: PostgreSQL + Drizzle ORM

## Architecture
- src/api/ → REST endpoints
- src/lib/ → shared utilities
- src/web/ → React app

## Code Style
- Use TypeScript strict mode
- No default exports
- Prefer functional components
- Test files next to source: foo.ts + foo.test.ts

## Commands
- `bun dev` — start dev server
- `bun test` — run tests
- `bun build` — production build

## Don't
- Don't use `any` type
- Don't add comments unless asked
- Don't commit .env files

## Active Tasks
[optional — e.g. "currently migrating from Prisma to Drizzle"]
```

> Claude reads this file every time it opens → it always remembers your project's rules

## Trick 4: Plan Mode (don't jump straight to code)

Before a big task use:

```
/plan
[describe the task]
```

Claude will:
1. Not touch any files
2. Think through the plan
3. Show it to you
4. Only start once you approve

**Great for:**
- Major refactors
- Migrations
- Adding features that touch many files

## Trick 5: Headless Mode (use Claude in scripts)

Claude Code doesn't have to be in chat — you can run it inside scripts.

```bash
claude -p "review this code: $(cat app.js)" > review.txt
```

Or in CI:

```yaml
# .github/workflows/review.yml
- run: |
    claude -p "review the diff: $(git diff origin/main)" \
      > review.md
```

> See more: [[16-headless-mode]]

## Trick 6: Hooks (Auto-trigger)

Make Claude react to events automatically:

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "npm run lint --silent"
        }]
      }
    ]
  }
}
```

→ Every time Claude edits a file, lint runs automatically

> See more: [[10-hooks]]

## Trick 7: Memory Banking

Save things you want Claude to **remember across sessions**.

```
Remember: our team uses pnpm, not npm
```

Claude will write it to a memory file → next session knows.

> See more: [[08-memory]]

## Trick 8: Reference files with @

```
explain the logic in @src/auth/login.ts
```

`@` = have Claude read that file immediately — no need to ask "please open the file"

## Trick 9: Pipe commands

```bash
git diff | claude -p "summarize this diff in 3 bullets"
```

```bash
cat error.log | claude -p "find the root cause"
```

## Trick 10: Scoped Sessions

Separate sessions per task → contexts don't get tangled

```bash
# Session A: for frontend
cd web && claude

# Session B: for backend
cd api && claude
```

Each session reads its own CLAUDE.md → 100% focus.

## Power User Workflow

A real workday:

```
Morning:
1. cd project && claude
2. Claude reads CLAUDE.md → knows what we're picking up from yesterday
3. /plan "implement user notifications"
4. Approve plan → Claude splits into subagents
5. Review diff → /commit

Evening:
6. /cost → check today's usage
7. /clear → tidy up before closing
8. exit
```

## Day 3 Recap

You now know:
- [x] Common slash commands
- [x] Subagents → parallel sub-teams
- [x] Powerful CLAUDE.md files
- [x] Plan mode
- [x] Headless mode + Hooks
- [x] Memory + @reference
- [x] Professional workflow

## Tutorial Done — What Next?

You now have all the basics. Next steps:

| If you want | Look at |
|-------------|---------|
| Quick fixes for specific problems | [[30-cookbook-recipes]] |
| Use it seriously in production | [[31-cost-management]], [[32-security-best-practices]] |
| See lots of real use cases | [[33-use-cases-analogies]] |
| Compare with other tools | [[34-comparison-tools]] |
| Deep reference | Back to sections 1-26 |

---

🌐 TH: [[../th/29-tutorial-day3-power-user]]
