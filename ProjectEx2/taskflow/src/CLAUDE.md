# `src/` — Source-tree Instructions

> Nested memory file. Inherits from the root `CLAUDE.md` and adds rules that only apply when working inside `src/`.

## Layout reminder

```
src/
├── core/      ← pure domain logic (no I/O side effects beyond store)
│   ├── store.js      — file persistence (only place that touches fs)
│   ├── task.js       — task operations (calls store + validate)
│   └── validate.js   — input validators (zero side effects)
├── cli/       ← CLI adapter
│   ├── index.js      — entry / argv parsing / exit code
│   ├── commands.js   — dispatch table + per-command handlers
│   └── format.js     — pretty printers
└── server/    ← HTTP adapter
    ├── index.js      — node:http server + listen
    └── routes.js     — request → core → response
```

## Local rules

- **`core/`**: imports allowed = node builtins + sibling `core/*` files. No imports from `cli/` or `server/`.
- **`cli/`** and **`server/`**: may import from `core/`, never from each other.
- New core function = new test file in `tests/`. CI's PostToolUse hook will fail commits otherwise.
- Adapters return *primitives*: CLI returns exit codes (0/1), routes return `(status, body)`. Side-effecting I/O (writing response, printing) happens at the entry layer only.

## When adding a feature

1. Add validator in `validate.js` (with tests)
2. Add core operation in `task.js` (with tests)
3. Wire CLI command in `commands.js`
4. Wire HTTP route in `routes.js`
5. Update root `CLAUDE.md` workflow section if a new convention emerges
