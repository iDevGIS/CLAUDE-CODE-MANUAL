---
description: Update README + inline docs to match current code (uses docs-writer subagent)
allowed-tools: Read, Edit, Bash(git diff:*), Task
---

Use the `docs-writer` subagent to keep documentation in sync with the code.

Process:
1. Diff `README.md` against the current state of `src/` (commands, routes, env vars).
2. For each drift, propose an Edit. Show the diff, don't apply yet.
3. Confirm with the user, then apply edits.

Focus areas:
- CLI command list (synced with `src/cli/commands.js` `COMMANDS` map)
- HTTP route table (synced with `src/server/routes.js`)
- Environment variables (synced with `.env.example`)
- "Don't" section in `CLAUDE.md` (must reflect current architecture rules)

If `$ARGUMENTS` mentions a specific section, scope the work to that section only.
