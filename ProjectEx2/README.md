# ProjectEx2 — Advanced Claude Code Showcase

> โปรเจกต์ตัวอย่าง **ขั้นสูง** สำหรับ [CLAUDE-CODE-MANUAL](../README.md) — ครอบคลุม **ทุก feature** ของ Claude Code ด้วย codebase ที่รันได้จริง

[![Made with Claude Code](https://img.shields.io/badge/Made%20with-Claude%20Code-7B61FF)](https://docs.claude.com/claude-code)
[![Tests: 25 passing](https://img.shields.io/badge/tests-25%20passing-brightgreen)](#)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-blue)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey)](#)

> 🇬🇧 English version: [`README.EN.md`](./README.EN.md)

---

## ทำไมต้อง ProjectEx2

**ProjectEx** (เดิม) แสดง Claude Code ระดับ "เริ่มต้น" — Todo CLI + 1 hook + 1 subagent

**ProjectEx2** ขยายให้เห็น **ทุก feature ที่ใช้งานได้จริง** ในโปรเจกต์ขนาดกลาง — CLI + HTTP API + 7 hooks + 4 subagents + 6 slash commands + skill + plugin + headless mode + scheduled tasks

> ดู [`FEATURE-MATRIX.md`](./FEATURE-MATRIX.md) สำหรับ map ของทุก feature → ไฟล์

---

## โครงสร้าง

```
ProjectEx2/
├── README.md  /  README.EN.md  /  FEATURE-MATRIX.md
│
├── taskflow/                              ← แอปหลัก: Task Management (CLI + HTTP API)
│   ├── package.json                       (zero dependencies)
│   ├── .env.example                       (env vars demo)
│   ├── CLAUDE.md                          ← root memory
│   ├── src/
│   │   ├── CLAUDE.md                      ← nested memory (subtree rules)
│   │   ├── core/   {store, task, validate}.js   ← pure logic
│   │   ├── cli/    {index, commands, format}.js ← CLI adapter
│   │   └── server/ {index, routes}.js           ← HTTP adapter
│   ├── tests/   25 tests, node:test
│   ├── scripts/
│   │   ├── headless-review.sh             ← claude -p (CI-friendly)
│   │   ├── scheduled-summary.sh           ← cron-driven
│   │   ├── setup-cron.sh                  ← crontab installer
│   │   └── lint.js                        ← project linter
│   └── .claude/
│       ├── settings.json                  ← permissions + 7 hook types + statusLine + outputStyle
│       ├── settings.local.json.example
│       ├── mcp.json                       ← 4 MCP servers
│       ├── commands/  test, lint, review, security-scan, release, docs
│       ├── agents/    reviewer, tester, security, docs-writer
│       ├── skills/    commit-formatter/SKILL.md
│       ├── output-styles/ senior-engineer.md
│       └── hooks/     7 shell scripts (one per event type) + statusline.sh
│
├── plugin-example/                        ← Standalone Claude Code plugin
│   ├── plugin.json
│   ├── commands/ping.md
│   └── agents/helper.md
│
└── walkthroughs/                          ← 13 atomic guides (Obsidian-friendly)
    ├── 01-getting-started.md
    ├── 02-claude-md-hierarchy.md
    ├── 03-permissions-deep-dive.md
    ├── 04-hooks-lifecycle.md
    ├── 05-skills-vs-subagents.md
    ├── 06-mcp-servers.md
    ├── 07-plugins.md
    ├── 08-headless-mode.md
    ├── 09-scheduled-tasks.md
    ├── 10-output-styles-statusline.md
    ├── 11-agent-teams.md
    ├── 12-real-world-flow.md
    └── 13-scaling-beyond-single-process.md  ← NEW: เมื่อ JSON store พังและวิธี migrate
```

---

## เริ่มต้น 30 วินาที

```bash
cd ProjectEx2/taskflow

# 1. รัน CLI
node src/cli/index.js help
node src/cli/index.js add "อ่าน Claude Code manual" --priority high --tag learn
node src/cli/index.js list
node src/cli/index.js stats

# 2. รัน HTTP API
node src/server/index.js                  # terminal 1
curl http://localhost:3000/health         # terminal 2

# 3. รัน test + lint
npm test                                  # 25 tests
npm run lint                              # lint: ok

# 4. เปิด Claude Code ในโปรเจกต์ (ดู hooks/output-style ทำงาน)
claude
```

---

## Feature Coverage

| หมวด | จำนวน | ที่อยู่ |
|------|------|--------|
| **CLAUDE.md** | 2 (root + nested) | `taskflow/CLAUDE.md`, `taskflow/src/CLAUDE.md` |
| **Hooks** | 7 events ครบ lifecycle | `taskflow/.claude/hooks/` |
| **Slash commands** | 6 (test, lint, review, security-scan, release, docs) | `taskflow/.claude/commands/` |
| **Subagents** | 4 (reviewer, tester, security, docs-writer) | `taskflow/.claude/agents/` |
| **Skills** | 1 (commit-formatter) | `taskflow/.claude/skills/` |
| **Output style** | 1 (senior-engineer) | `taskflow/.claude/output-styles/` |
| **Status line** | 1 (custom bash) | `taskflow/.claude/hooks/statusline.sh` |
| **MCP servers** | 4 (filesystem, github, sqlite, fetch) | `taskflow/.claude/mcp.json` |
| **Plugin** | 1 standalone (taskflow-tools) | `plugin-example/` |
| **Headless mode** | 1 script (CI review) | `taskflow/scripts/headless-review.sh` |
| **Scheduled tasks** | 2 scripts (summary + installer) | `taskflow/scripts/scheduled-summary.sh` |
| **Permissions** | allow + deny + ask + defaultMode | `taskflow/.claude/settings.json` |
| **Walkthroughs** | 13 atomic notes | `walkthroughs/` |

→ เต็ม map ใน [`FEATURE-MATRIX.md`](./FEATURE-MATRIX.md)

---

## Walkthrough Path

อ่านตามลำดับนี้ถ้าเพิ่งมาใหม่:

1. [01 — Getting Started](walkthroughs/01-getting-started.md) — รัน TaskFlow + เปิด Claude
2. [02 — CLAUDE.md Hierarchy](walkthroughs/02-claude-md-hierarchy.md) — ทำไมมี 2 ไฟล์
3. [03 — Permissions Deep Dive](walkthroughs/03-permissions-deep-dive.md) — allow/deny/ask 3 ชั้น
4. [04 — Hooks Lifecycle](walkthroughs/04-hooks-lifecycle.md) — 7 events ทำงานเมื่อไหร่
5. [05 — Skills vs Subagents](walkthroughs/05-skills-vs-subagents.md) — เลือกตัวไหน
6. [06 — MCP Servers](walkthroughs/06-mcp-servers.md) — เชื่อม external tools
7. [07 — Plugins](walkthroughs/07-plugins.md) — bundle ทุกอย่างเป็น unit เดียว
8. [08 — Headless Mode](walkthroughs/08-headless-mode.md) — Claude ใน CI / scripts
9. [09 — Scheduled Tasks](walkthroughs/09-scheduled-tasks.md) — cron + Claude
10. [10 — Output Styles & Status Line](walkthroughs/10-output-styles-statusline.md) — ปรับ UI
11. [11 — Agent Teams](walkthroughs/11-agent-teams.md) — orchestrate หลาย subagent
12. [12 — Real-world Flow](walkthroughs/12-real-world-flow.md) — เพิ่ม feature ตั้งแต่ idea จนถึง release
13. [13 — Scaling Beyond Single-Process](walkthroughs/13-scaling-beyond-single-process.md) — เมื่อ JSON store พัง + migrate ไป file lock / SQLite / Postgres

---

## ใช้กับโปรเจกต์ของคุณ

```bash
# Copy config pack ไปไว้ในโปรเจกต์ของคุณ
cp -r ProjectEx2/taskflow/.claude /path/to/your-project/
cp ProjectEx2/taskflow/CLAUDE.md  /path/to/your-project/

# แก้ CLAUDE.md ให้ตรงกับ stack/conventions ของคุณ
# แก้ permissions ให้ตรงกับ tool ที่คุณใช้
# พอแล้ว — เปิด claude แล้วใช้ได้เลย
```

แนะนำให้:
1. **อ่าน CLAUDE.md ก่อน** — adapt ให้ตรงกับโปรเจกต์ตัวเอง (ไม่ใช่ copy ดิบ)
2. **เริ่มจาก hook น้อย ๆ** — `PostToolUse` (test) คือตัวที่ ROI สูงสุด
3. **ค่อยเพิ่ม subagent** เมื่อเริ่มเห็น pattern ที่ทำซ้ำ
4. **plugin ทีหลัง** — ทำเมื่อมี ≥2 โปรเจกต์ที่ใช้ pattern เดียวกัน

---

## Compatibility

- **Claude Code:** `v2.1.114+` (บางอย่างเช่น output style ใช้ได้กับ version ใหม่กว่า)
- **Node.js:** `>= 20`
- **Shell:** Bash (script ทั้งหมด)
- **OS:** macOS / Linux (Windows ใช้ WSL)

---

## License

MIT — ใช้ได้เสรี รวมทั้ง copy เข้าโปรเจกต์งาน
