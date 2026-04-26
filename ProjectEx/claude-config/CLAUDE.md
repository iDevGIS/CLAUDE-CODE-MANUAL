# Todo CLI — Project Instructions

> ไฟล์นี้เป็นตัวอย่าง `CLAUDE.md` สำหรับโปรเจกต์ Todo CLI
> Claude Code จะอ่านไฟล์นี้ทุกครั้งที่เริ่ม session ในโปรเจกต์นี้

## Project context

- **Stack:** Node.js (no dependencies), `node --test` for testing
- **Entry point:** `index.js` (CLI dispatcher)
- **Core logic:** `lib/todo.js` (pure functions — easy to test)
- **Storage:** `todos.json` (flat-file, gitignored)

## Conventions

- Use **CommonJS** (`require` / `module.exports`) — not ESM
- Keep `lib/todo.js` **pure**: no `console.log`, no `process.exit` — return values, let `index.js` handle output
- Tests use `node:test` (built-in), no Jest/Mocha
- Filenames are kebab-case; functions are camelCase
- Error messages start with `!`, success with `+` / `*` / `-` (matches existing CLI output)

## Workflow

- Run tests with `npm test` before committing
- Use **Plan Mode** for any change that touches multiple files
- For new commands (e.g. `todo edit`), add to the `commands` map in `index.js` AND add a test in `tests/`

## Don't

- Don't add a database (sqlite, postgres) — flat-file is intentional
- Don't add CLI parsing libraries (yargs, commander) — keep it dependency-free
- Don't `console.log` from `lib/` — that breaks testability
