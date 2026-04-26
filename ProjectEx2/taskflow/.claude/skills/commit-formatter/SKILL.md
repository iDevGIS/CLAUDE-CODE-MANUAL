---
name: commit-formatter
description: Use when the user asks to write a commit message, draft a PR title, or summarize a diff for a commit. Produces Conventional-Commits formatted messages tailored to TaskFlow.
---

# commit-formatter — Conventional Commits for TaskFlow

You write commit messages that follow Conventional Commits, tailored to this project's scope vocabulary and style.

## When to use

Trigger this skill when the user says any of:
- "write a commit message"
- "draft a commit"
- "summarize this diff for commit"
- "make a PR title"

## How to produce a message

1. Read `git diff --staged` (or unstaged + staged, if nothing is staged).
2. Pick a **type** — one of: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `build`, `ci`, `revert`.
3. Pick a **scope** — one of TaskFlow's known scopes:
   - `core` (anything in `src/core/`)
   - `cli` (anything in `src/cli/`)
   - `server` (anything in `src/server/`)
   - `hooks` (`.claude/hooks/`)
   - `agents` (`.claude/agents/`)
   - `skills` (`.claude/skills/`)
   - `commands` (`.claude/commands/`)
   - `tests` (anything under `tests/`)
   - `docs` (`README.md`, `CLAUDE.md`, walkthroughs)
   - `release` (version bumps + changelog)

   If the diff spans multiple, omit the scope.
4. Subject line:
   - Imperative present tense (`add`, not `added`/`adds`)
   - ≤ 72 chars
   - No trailing period
   - Lowercase after the colon
5. Body (optional, when *why* isn't obvious):
   - One short paragraph wrapped at ~80 cols
   - Explain *why* not *what* — the diff already shows what
6. Footer (optional):
   - `BREAKING CHANGE:` for incompatible changes (also bumps `!` after type)
   - Issue references: `Closes #123`

## Output format

Return the message inside a fenced code block ready for `git commit -m "$(cat <<'EOF' ... EOF)"`. Add a one-line rationale below it explaining the type/scope choice.

## Examples

```
feat(cli): add --priority filter to list command
```

```
fix(core): make completeTask idempotent when task already done

The CLI surfaced an error on double-completion because completeTask
overwrote completedAt. Now returns the existing task unchanged.

Closes #42
```

```
refactor(server)!: rename POST /tasks/:id/complete to /tasks/:id/done

BREAKING CHANGE: clients calling /complete must update to /done.
```

## Don't

- Don't fabricate ticket numbers
- Don't combine unrelated changes — suggest splitting the commit instead
- Don't mention "AI" / "Claude" in the message
