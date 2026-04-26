# Changelog

บันทึกการเปลี่ยนแปลงทั้งหมดของ **CLAUDE-CODE-MANUAL** จะถูก track ที่ไฟล์นี้

รูปแบบยึดตาม [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
และ versioning ใช้ [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

> **Versioning Policy**
> - **MAJOR** — ปรับโครงสร้างใหญ่ / เปลี่ยนชื่อไฟล์หลัก / breaking ของผู้อ่าน (link เก่าใช้ไม่ได้)
> - **MINOR** — เพิ่มหัวข้อใหม่ / เพิ่มไฟล์ guide / เพิ่ม feature ใหม่ของคู่มือ
> - **PATCH** — แก้ typo / ปรับสำนวน / อัปเดตตัวอย่างเล็กน้อย / fix link

---

## [Unreleased]

### Planned
- ใส่ภาพประกอบ / diagram สำหรับ Hooks lifecycle และ Agent Team flow
- Sync เนื้อหา TH ↔ EN เมื่อมี Claude Code version ใหม่
- เพิ่ม CI/CD integration recipes (GitHub Actions, GitLab CI)
- ขยายหัวข้ออื่น ๆ ให้อธิบายระดับเดียวกับ chapter 02 (per-flag deep-dive + examples + pitfalls)
- ถ่าย screenshot ของ Claude session จริงเพื่อแทน mockup ใน ProjectEx
- ProjectEx2: ทำ walkthrough deck (.pptx) เหมือน ProjectEx + ถ่าย screenshot จริงของ session
- ตัวอย่าง MCP server ใน slash command (เช่น `/docs` ใช้ `mcp__github__get_pull_request`)

---

## [1.7.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- **`ProjectEx2/` — Advanced Claude Code showcase project** (companion to ProjectEx)
  - **`taskflow/`** — runnable Task Management app (CLI + HTTP API), zero deps, 25 tests
    - `src/core/` (pure logic: store/task/validate), `src/cli/` (commands/format), `src/server/` (node:http routes)
    - `tests/` (5 test files) + `scripts/` (lint, headless-review, scheduled-summary, setup-cron)
  - **CLAUDE.md hierarchy** — root + nested `src/CLAUDE.md` (subtree rules for import boundaries)
  - **`.claude/settings.json`** — permissions (allow/deny/ask) + defaultMode + env + 7 hook types + statusLine + outputStyle + model
  - **Hooks (7, full lifecycle)** — `SessionStart`, `UserPromptSubmit`, `PreToolUse` (Edit|Write & Bash), `PostToolUse`, `Notification`, `Stop`, `SubagentStop` + statusline script
  - **Slash commands × 6** — `/test`, `/lint`, `/review`, `/security-scan`, `/release`, `/docs`
  - **Subagents × 4** — `reviewer`, `tester`, `security`, `docs-writer` (each with focused tool list + system prompt)
  - **Skill** — `commit-formatter` (Conventional Commits playbook)
  - **Output Style** — `senior-engineer` (concise, evidence-first voice)
  - **MCP config** — `.claude/mcp.json` with 4 example servers (filesystem, github, sqlite-readonly, fetch)
  - **Plugin example** — standalone `plugin-example/` (`taskflow-tools`) with `plugin.json`, slash command, subagent
  - **13 Walkthroughs** — atomic notes (Obsidian-friendly): getting-started → CLAUDE.md hierarchy → permissions → hooks lifecycle → skills vs subagents → MCP → plugins → headless mode → scheduled tasks → output styles & status line → agent teams → real-world end-to-end flow → **scaling beyond single-process**
  - **`FEATURE-MATRIX.md`** — explicit map of each Claude Code feature → file in the project
  - **`README.md` / `README.EN.md`** — TH + EN landing pages
- Both root `README.md` and `README.EN.md` now have a **🚀 Advanced Showcase (ProjectEx2)** section after ProjectEx

### Polished (post-review)
- **Concurrency model documented** in `ProjectEx2/taskflow/CLAUDE.md` — explicit "single-process only" constraint with safe/unsafe matrix; pointer to migration walkthrough; aligns with `security` subagent so the JSON-store race is treated as a design choice, not a bug
- **Plugin install scripts** in `ProjectEx2/plugin-example/` — `setup.sh` (Bash) + `setup.ps1` (PowerShell), supporting symlink, copy fallback, custom target, and uninstall; replaces the manual `ln -s` instructions
- **Walkthrough 13 — Scaling Beyond Single-Process** — when the JSON store breaks (with reproducer), 3-step migration ladder (file lock + atomic rename → SQLite + WAL → Postgres), per-step Plan Mode prompts, anti-patterns, concurrent test scaffolding

### Why
- ProjectEx (v1.6.0) is a great starter, but readers asked for a more substantial example showing how every Claude Code feature actually composes — multi-file architecture, multiple hook types, agent teams, MCP, plugins, headless CI, scheduled tasks
- ProjectEx2 fills that gap with one runnable, opinionated reference project
- Post-review polish addresses three gaps a code review caught: implicit concurrency assumption, missing install path for the plugin, and no migration story when the JSON store outgrows its design

---

## [1.6.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- **`ProjectEx/` — Hands-on example project** demonstrating Claude Code end-to-end (from first `claude` to `git commit`)
  - **`todo-app/`** — runnable Todo CLI with zero dependencies
    - `index.js` (CLI dispatcher: add/list/done/rm/help)
    - `lib/todo.js` (pure logic, easy to test)
    - `tests/todo.test.js` (5 tests using built-in `node:test`)
    - `package.json` with `npm test` script
  - **`claude-config/`** — copy-paste-ready Claude Code configuration pack
    - `CLAUDE.md` — project instructions (stack, conventions, workflow, don't-do list)
    - `.claude/settings.json` — permissions (allow Bash/git/Edit, deny `rm -rf` and force push) + **PostToolUse hook** that auto-runs `npm test` after edits
    - `.claude/commands/test-all.md` — slash command `/test-all`
    - `.claude/agents/reviewer.md` — subagent code reviewer (`model: sonnet`, tools: Read/Grep/git diff)
  - **Walkthrough decks** — 12-slide presentations in both languages (`ProjectEx-Walkthrough-TH.pptx` 256 KB · `EN.pptx` 258 KB) covering Cover → Stack → Start session → CLAUDE.md → Plan Mode → Implement → Test → Subagent review → Commit → Hooks/Skills → Lessons → Links
  - **`screenshots/`** — 7 mockup images (rendered with Python/PIL) used in the slides
  - **`_build/`** — Python scripts to regenerate screenshots and rebuild both decks (`make_screenshots.py`, `make_pptx.py`)
  - **`ProjectEx/README.md`** — full instructions for running the example, copying the config pack into a project, and trying it with `claude`
- Both root `README.md` and `README.EN.md` now feature a **🎯 Example Project (ProjectEx)** section between the Quick Start and Table of Contents, with a 5-row capability table and a 30-second try-it-now snippet

### Why
- Documentation alone wasn't enough — readers asked for a concrete, runnable starting point that shows how Claude Code, `CLAUDE.md`, hooks, slash commands, and subagents all fit together in one project
- ProjectEx is the missing piece that takes someone from "I read the manual" to "I've used Claude Code on something real"

---

## [1.5.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- **Chapter 02 (CLI Commands and Flags) — Beginner-friendly deep-dive rewrite** (TH + EN)
  - **Per-flag detailed explanations** — every flag now has a "What it does / When to use / Example" structure, replacing the previous one-line table descriptions that beginners found too terse
  - **Real Examples section** — 7 hands-on examples with mock output (quick Q&A, git log analysis, Plan Mode, CI/CD code review, batch processing, parallel worktrees, subagent + plan mode combo)
  - **Combo Patterns section** — 7 production-grade multi-flag recipes with rationale (CI/CD review, long-running refactor, quick Q&A alias, multi-project analysis, structured pipeline, safe sandbox exploration, headless cron job)
  - **Common Pitfalls section** — 10 traps beginners commonly fall into (`-p` vs `--bare` confusion, dangerous use of `--dangerously-skip-permissions`, missing prompt quotes, binary pipe gotchas, `-c` directory binding, model overuse, max-budget cache caveat, allowedTools Bash patterns, `claude update` in CI/CD, `--bare` ≠ no-network)
  - **Beginner Cheat Sheet** — 3+3+3 quick-start commands at the bottom
  - **Car-and-buttons analogy** in the intro to make CLI flags approachable
  - **Model analogies** — Opus = professor / Sonnet = researcher / Haiku = quick-witted student

### Changed
- `docs/th/02-cli-commands.md`: 124 → 700+ lines
- `docs/en/02-cli-commands.md`: 124 → 700+ lines
- `Claude-Code-Guide-TH.md`: chapter 2 expanded with new sections (Real Examples, Combo Patterns, Pitfalls, Cheat Sheet)
- `Claude-Code-Guide-EN.md`: chapter 2 expanded with the same new sections
- All four files synchronized 1:1

### Why
- User feedback: original tables were too terse for newcomers — flags didn't show usage context, common combos, or the gotchas seasoned users learn the hard way
- This sets the template for expanding the rest of the chapters in future minor releases

---

## [1.4.1] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Fixed
- **Sync monolithic guides with atomic notes** — chapters 27-34 (Tutorial Path, Cookbook, Cost, Security, Use Cases, Comparison) were added to `docs/{th,en}/` in v1.4.0 but not appended to the single-file guides. Now mirrored:
  - `Claude-Code-Guide-TH.md`: 3,317 → 5,619 lines (TOC + 8 chapters added)
  - `Claude-Code-Guide-EN.md`: 3,321 → 5,623 lines (TOC + 8 chapters added)
- Both monolithic guides now contain all **34 chapters** matching the atomic-note collection 1:1.
- Wikilinks stripped to plain text (monolithic version doesn't use Obsidian linking).
- Heading levels demoted by one to nest correctly under each chapter.

---

## [1.4.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- **Tutorial Path** — 3-day onboarding for absolute beginners (TH + EN)
  - `27-tutorial-day1-hello-world.md` — install → first chat → create files (30 min)
  - `28-tutorial-day2-first-project.md` — build a real Todo app + git/GitHub setup (1 hr)
  - `29-tutorial-day3-power-user.md` — slash commands, subagents, plan mode, headless, hooks
- **Cookbook** — `30-cookbook-recipes.md` with 40+ ready-to-use prompts across 14 categories (TH + EN)
  - Code reading, bug fixing, refactoring, testing, code review, docs, migration, performance, git, devops, security, productivity, learning, emergency
  - Plus a "prompt template" + power keywords cheat-sheet
- **Production-Ready Section** (TH + EN)
  - `31-cost-management.md` — token economy, model selection (Haiku/Sonnet/Opus), `/clear` discipline, prompt caching, cost workflow, before/after savings examples (9-14× reduction)
  - `32-security-best-practices.md` — secret management, permissions hardening, prompt injection defense, sensitive data handling, MCP/skill safety, incident response playbook, production checklist
- **Use Cases & Comparisons** (TH + EN)
  - `33-use-cases-analogies.md` — explains Claude Code with everyday analogies (private chef, contractor, senior coworker), 15 detailed real-world use cases, "ChatGPT vs Claude Code" head-to-head examples, "when NOT to use" guidance
  - `34-comparison-tools.md` — side-by-side comparisons with Cursor, GitHub Copilot, Aider, Codex CLI; pricing, combos developers actually use, 30-second cheat sheet
- 8 new atomic notes per language → **52 atomic notes total** (16 new files)
- TH and EN MOC (`docs/{th,en}/README.md`) reorganized into **7 categories** (added: Tutorial / Cookbook & Use Cases / Production Ready)
- Root `README.md` and `README.EN.md` updated with bonus topics tables

### Changed
- README documentation modes table updated: 26 → 34 atomic notes per language
- About section updated: 3,300+ lines → 5,000+ lines, mentions bonus topics

---

## [1.3.2] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `README.EN.md` — full English version of the landing-page README (mirrors structure of TH `README.md`)
- Cross-language switcher: both `README.md` and `README.EN.md` link to each other at the top

### Changed
- `README.md` language badges now link to the language-specific README (not the long guide), so the "Thai/English" badge acts as a language toggle

---

## [1.3.1] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `.obsidian/` shared vault config — clone แล้วเปิดเป็น Obsidian vault ได้ทันที โดยไม่ต้อง setup ใหม่
  - `app.json`, `appearance.json` — base settings
  - `core-plugins.json` — เปิด Graph, Backlinks, Outline, Tag pane, Properties, Bookmarks ที่จำเป็น
  - `graph.json` — graph view ปรับแต่งไว้สำหรับโครงสร้างคู่มือ (linkDistance/repelStrength/scale)
- README section "🪨 เปิดเป็น Obsidian Vault ทันที" พร้อมขั้นตอน clone → open vault

### Changed
- `.gitignore` exclude เฉพาะ `workspace.json` / `workspace-mobile.json` / `cache` (state ส่วนตัวของผู้ใช้แต่ละคน) — ส่วน config ที่ใช้ร่วมกันได้ commit ขึ้น repo แล้ว

---

## [1.3.0] — 2026-04-26

### Added
- `docs/th/` and `docs/en/` directories with 26 atomic notes per language (52 files total)
- YAML frontmatter (title, tags, aliases, related, lang) on every atomic note for Obsidian compatibility
- Wikilink-based navigation (prev/next/index/cross-language) at the bottom of every note
- MOC (Map of Content) index at `docs/th/README.md` and `docs/en/README.md`, grouped into 5 categories
- "📚 Documentation Modes" section in root README explaining single-page vs atomic reading modes
- `Obsidian: Ready` badge in root README

### Compatibility
- Claude Code: `v2.1.114`

### Notes
- The original `Claude-Code-Guide-TH.md` and `Claude-Code-Guide-EN.md` remain at the repo root for single-page reading.
- Atomic notes mirror the same 26-section structure 1:1 — no content was rewritten, only restructured.

---

## [1.2.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `Claude-Code-Guide-EN.md` — **English translation** ของคู่มือเต็ม (1:1 จากฉบับ TH)
- README: badge และ link สำหรับ EN guide
- README: ระบุ Claude Code version (`2.1.114`) ที่เนื้อหาคู่มืออ้างอิง
- README: link ไป `CHANGELOG.md` ใต้หมวด "ลิงก์ที่เกี่ยวข้อง"

### Changed
- README หัวข้อ "เกี่ยวกับ" — อัปเดตเป็น "คู่มือภาษาไทยและอังกฤษ"

---

## [1.1.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `README.md` — landing page ของ repo พร้อม:
  - Quick Start สำหรับติดตั้ง
  - สารบัญแบ่ง 5 หมวด (พื้นฐาน / ตั้งค่า / ขั้นสูง / ใช้งานจริง / Reference)
  - Badge และลิงก์ deep-link ไปแต่ละ section ของ guide เต็ม
- `CHANGELOG.md` — ไฟล์นี้ สำหรับ track version

---

## [1.0.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `Claude-Code-Guide-TH.md` — คู่มือภาษาไทยฉบับเต็ม **3,317 บรรทัด** ครอบคลุม **26 หัวข้อใหญ่**:
  1. แนะนำ Claude Code
  2. การติดตั้งและตั้งค่าเริ่มต้น
  3. คำสั่ง CLI พื้นฐาน
  4. Slash Commands
  5. การทำงานกับไฟล์และโปรเจกต์
  6. Configuration & Settings
  7. Permissions System
  8. Hooks
  9. Skills
  10. MCP (Model Context Protocol)
  11. Subagents
  12. Agent Teams
  13. Custom Slash Commands
  14. Memory และ CLAUDE.md
  15. Plan Mode
  16. Background Tasks
  17. Git Integration
  18. GitHub Actions
  19. IDE Integration
  20. Headless Mode
  21. Cost & Usage Monitoring
  22. Best Practices
  23. Troubleshooting
  24. Tips & Tricks
  25. การประยุกต์ใช้งานจริง (Use Cases)
  26. Reference & Resources

### Notes
- เริ่มต้น repo ด้วย initial commit `dfdccf9`
- รองรับ Claude Code เวอร์ชันล่าสุด (Opus 4.7 / Sonnet 4.6 / Haiku 4.5)

---

## รูปแบบ Entry

แต่ละ version ใช้หัวข้อย่อยเหล่านี้ตามที่จำเป็น:

- **Added** — สิ่งที่เพิ่มใหม่
- **Changed** — สิ่งที่เปลี่ยนพฤติกรรม
- **Deprecated** — สิ่งที่จะถูกลบใน version ถัดไป
- **Removed** — สิ่งที่ถูกลบออก
- **Fixed** — แก้ bug / typo / link เสีย
- **Security** — ปิดช่องโหว่ (ถ้ามี)

---

[Unreleased]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.5.0...HEAD
[1.5.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.2...v1.4.0
[1.3.2]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/releases/tag/v1.0.0
