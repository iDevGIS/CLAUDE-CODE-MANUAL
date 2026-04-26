# ProjectEx2 — Advanced Claude Code Showcase

> An **advanced** companion project for [CLAUDE-CODE-MANUAL](../README.EN.md) — covering **every feature** of Claude Code in a runnable codebase.

[![Made with Claude Code](https://img.shields.io/badge/Made%20with-Claude%20Code-7B61FF)](https://docs.claude.com/claude-code)
[![Tests: 25 passing](https://img.shields.io/badge/tests-25%20passing-brightgreen)](#)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-blue)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey)](#)

> 🇹🇭 ภาษาไทย: [`README.md`](./README.md)

---

## Why ProjectEx2

The original **ProjectEx** demonstrates Claude Code at the "starter" level — a Todo CLI with 1 hook and 1 subagent.

**ProjectEx2** scales that up to show **every practical feature** in a mid-sized project — CLI + HTTP API + 7 hooks + 4 subagents + 6 slash commands + a skill + a plugin + headless mode + scheduled tasks.

See [`FEATURE-MATRIX.md`](./FEATURE-MATRIX.md) for a feature → file map.

---

## Layout

```
ProjectEx2/
├── README.md / README.EN.md / FEATURE-MATRIX.md
│
├── taskflow/                              # The runnable app: Task Management (CLI + HTTP API)
│   ├── package.json                       # zero dependencies
│   ├── .env.example                       # env vars demo
│   ├── CLAUDE.md                          # root memory
│   ├── src/
│   │   ├── CLAUDE.md                      # nested memory (subtree rules)
│   │   ├── core/   {store, task, validate}.js   # pure logic
│   │   ├── cli/    {index, commands, format}.js # CLI adapter
│   │   └── server/ {index, routes}.js           # HTTP adapter
│   ├── tests/   25 tests, node:test
│   ├── scripts/   headless-review.sh, scheduled-summary.sh, setup-cron.sh, lint.js
│   └── .claude/
│       ├── settings.json                  # permissions + 7 hook types + statusLine + outputStyle
│       ├── mcp.json                       # 4 MCP servers
│       ├── commands/  6 slash commands
│       ├── agents/    4 subagents
│       ├── skills/    commit-formatter/SKILL.md
│       ├── output-styles/ senior-engineer.md
│       └── hooks/     7 shell scripts + statusline.sh
│
├── plugin-example/                        # Standalone Claude Code plugin
│   ├── plugin.json
│   ├── commands/ping.md
│   └── agents/helper.md
│
└── walkthroughs/                          # 13 atomic guides (Obsidian-friendly)
    └── 01..13-*.md
```

---

## Quick start (30 seconds)

```bash
cd ProjectEx2/taskflow

# 1. Run the CLI
node src/cli/index.js help
node src/cli/index.js add "read Claude Code manual" --priority high --tag learn
node src/cli/index.js list
node src/cli/index.js stats

# 2. Run the HTTP API
node src/server/index.js                  # terminal 1
curl http://localhost:3000/health         # terminal 2

# 3. Tests + lint
npm test                                  # 25 tests
npm run lint                              # lint: ok

# 4. Open Claude Code in the project (see hooks/output-style/statusline in action)
claude
```

---

## Feature coverage

| Area | Count | Where |
|------|------|--------|
| **CLAUDE.md** | 2 (root + nested) | `taskflow/CLAUDE.md`, `taskflow/src/CLAUDE.md` |
| **Hooks** | 7 events (full lifecycle) | `taskflow/.claude/hooks/` |
| **Slash commands** | 6 | `taskflow/.claude/commands/` |
| **Subagents** | 4 | `taskflow/.claude/agents/` |
| **Skills** | 1 | `taskflow/.claude/skills/` |
| **Output style** | 1 | `taskflow/.claude/output-styles/` |
| **Status line** | 1 | `taskflow/.claude/hooks/statusline.sh` |
| **MCP servers** | 4 | `taskflow/.claude/mcp.json` |
| **Plugin** | 1 standalone | `plugin-example/` |
| **Headless mode** | 1 script | `taskflow/scripts/headless-review.sh` |
| **Scheduled tasks** | 2 scripts | `taskflow/scripts/` |
| **Permissions** | allow + deny + ask + defaultMode | `taskflow/.claude/settings.json` |
| **Walkthroughs** | 13 atomic notes | `walkthroughs/` |

Full map: [`FEATURE-MATRIX.md`](./FEATURE-MATRIX.md)

---

## Walkthrough path

Read in order if you're new:

1. [01 — Getting Started](walkthroughs/01-getting-started.md)
2. [02 — CLAUDE.md Hierarchy](walkthroughs/02-claude-md-hierarchy.md)
3. [03 — Permissions Deep Dive](walkthroughs/03-permissions-deep-dive.md)
4. [04 — Hooks Lifecycle](walkthroughs/04-hooks-lifecycle.md)
5. [05 — Skills vs Subagents](walkthroughs/05-skills-vs-subagents.md)
6. [06 — MCP Servers](walkthroughs/06-mcp-servers.md)
7. [07 — Plugins](walkthroughs/07-plugins.md)
8. [08 — Headless Mode](walkthroughs/08-headless-mode.md)
9. [09 — Scheduled Tasks](walkthroughs/09-scheduled-tasks.md)
10. [10 — Output Styles & Status Line](walkthroughs/10-output-styles-statusline.md)
11. [11 — Agent Teams](walkthroughs/11-agent-teams.md)
12. [12 — Real-world Flow](walkthroughs/12-real-world-flow.md)
13. [13 — Scaling Beyond Single-Process](walkthroughs/13-scaling-beyond-single-process.md) — when the JSON store breaks and how to migrate (file lock → SQLite → Postgres)

---

## Adapt to your project

```bash
cp -r ProjectEx2/taskflow/.claude /path/to/your-project/
cp ProjectEx2/taskflow/CLAUDE.md  /path/to/your-project/
# Edit CLAUDE.md and permissions to match your stack/tools
```

Recommendation:
1. **Read `CLAUDE.md` first** — adapt to your project, don't copy verbatim.
2. **Start small** — `PostToolUse` (test on edit) gives the highest ROI.
3. **Add subagents** when you spot a recurring specialist task.
4. **Plugins last** — only when ≥2 projects share the same pattern.

---

## Compatibility

- **Claude Code:** `v2.1.114+`
- **Node.js:** `>= 20`
- **Shell:** Bash
- **OS:** macOS / Linux (Windows via WSL)

---

## License

MIT — free to use, including copying into your work projects.
