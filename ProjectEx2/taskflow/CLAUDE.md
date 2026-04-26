# TaskFlow — Project Instructions

> Root-level memory for Claude Code. This file is read at the start of every session in this project. Nested `CLAUDE.md` files (e.g. `src/CLAUDE.md`) extend these instructions for their subtree.

## Project context

- **Stack:** Node.js 20+, **zero runtime dependencies** (only Node built-ins)
- **Two surfaces:**
  - CLI — `src/cli/` (entry: `src/cli/index.js`, dispatch in `commands.js`)
  - HTTP API — `src/server/` (uses `node:http`, no Express)
- **Domain core:** `src/core/` — pure logic, stable, easy to test
- **Storage:** flat JSON file (`.taskflow.json`, gitignored), path overridable via `TASKFLOW_DB`
- **Tests:** `node:test` (built-in), no Jest/Mocha/Vitest

## Architecture rules

1. **`src/core/` stays pure.** No `console.*`, no `process.exit`, no `process.env` reads inside the function bodies. Throw on invalid input — let callers translate to UX (CLI string / HTTP JSON).
2. **CLI and server are thin adapters.** They translate input → call core → format output. They don't contain business logic.
3. **Validation lives in `src/core/validate.js`.** Both CLI and server reuse it. Don't duplicate checks at the edges.
4. **No new dependencies.** If a problem really needs a package, raise it first — odds are a 30-line built-in solution exists.

## Conventions

- **Style:** 2-space indent, single quotes, semicolons, no tabs
- **Naming:** filenames kebab-case, functions camelCase, env vars `TASKFLOW_*`
- **CLI output prefixes:** `+` add, `*` complete, `-` remove, `!` error (parsed by hooks/scripts)
- **HTTP errors:** always `{ error: <message> }` with appropriate status code
- **Tests:** one `*.test.js` per module under `tests/`, use `tmpDb()` from `_helpers.js` for isolation

## Workflow

- Run `npm test` before committing. The PostToolUse hook runs it automatically after edits.
- Run `npm run lint` to check zero-dep + style rules.
- Use **Plan Mode** (Shift+Tab) for any change touching ≥2 files or any cross-cutting concern.
- For new commands: add to `commands.js`, expose in CLI help, mirror in HTTP routes if applicable, write tests.
- Use the `/release` slash command to bump version + changelog.
- Use the `reviewer` subagent on the pending diff before commit; the `security` agent before merging anything that touches `routes.js` or input handling.

## Don't

- Don't add a database (sqlite, postgres). Flat JSON is intentional — switching engines is a different project.
- Don't add CLI parsing libs (yargs, commander) or HTTP frameworks (express, fastify).
- Don't `console.log` from `src/core/` — that breaks testability and library usage.
- Don't widen permissions in `.claude/settings.json` casually. Use `.claude/settings.local.json` for personal/temporary loosening.
- Don't commit `.taskflow.json` or `.env`.
