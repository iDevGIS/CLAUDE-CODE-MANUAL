# ProjectEx2 — Feature Matrix

> Map: Claude Code feature → ที่อยู่ในโปรเจกต์ + walkthrough ที่เกี่ยวข้อง

| Feature | ดูได้ที่ | Walkthrough |
|---------|---------|-------------|
| **CLAUDE.md (project)** | `taskflow/CLAUDE.md` | [02](walkthroughs/02-claude-md-hierarchy.md) |
| **CLAUDE.md (nested)** | `taskflow/src/CLAUDE.md` | [02](walkthroughs/02-claude-md-hierarchy.md) |
| **Permissions (allow/deny/ask)** | `taskflow/.claude/settings.json` `permissions` | [03](walkthroughs/03-permissions-deep-dive.md) |
| **Permissions (defaultMode)** | `taskflow/.claude/settings.json` `defaultMode: acceptEdits` | [03](walkthroughs/03-permissions-deep-dive.md) |
| **Local settings override** | `taskflow/.claude/settings.local.json.example` | [03](walkthroughs/03-permissions-deep-dive.md) |
| **Env vars (Claude-set)** | `taskflow/.claude/settings.json` `env` | [03](walkthroughs/03-permissions-deep-dive.md) |
| **Env vars (project app)** | `taskflow/.env.example` | [01](walkthroughs/01-getting-started.md) |
| **Hook: SessionStart** | `taskflow/.claude/hooks/session-start.sh` | [04](walkthroughs/04-hooks-lifecycle.md) |
| **Hook: UserPromptSubmit** | `taskflow/.claude/hooks/user-prompt-log.sh` | [04](walkthroughs/04-hooks-lifecycle.md) |
| **Hook: PreToolUse (Edit\|Write)** | `taskflow/.claude/hooks/pre-edit-validate.sh` | [04](walkthroughs/04-hooks-lifecycle.md) |
| **Hook: PreToolUse (Bash)** | `taskflow/.claude/hooks/pre-bash-guard.sh` | [04](walkthroughs/04-hooks-lifecycle.md) |
| **Hook: PostToolUse** | `taskflow/.claude/hooks/post-edit-test.sh` | [04](walkthroughs/04-hooks-lifecycle.md) |
| **Hook: Notification** | `taskflow/.claude/hooks/notify.sh` | [04](walkthroughs/04-hooks-lifecycle.md) |
| **Hook: Stop** | `taskflow/.claude/hooks/stop-summary.sh` | [04](walkthroughs/04-hooks-lifecycle.md) |
| **Hook: SubagentStop** | `taskflow/.claude/hooks/subagent-stop.sh` | [04](walkthroughs/04-hooks-lifecycle.md) |
| **Output Style** | `taskflow/.claude/output-styles/senior-engineer.md` | [10](walkthroughs/10-output-styles-statusline.md) |
| **Status Line** | `taskflow/.claude/hooks/statusline.sh` | [10](walkthroughs/10-output-styles-statusline.md) |
| **Slash command (basic)** | `taskflow/.claude/commands/test.md` `lint.md` | [12](walkthroughs/12-real-world-flow.md) |
| **Slash command (with subagent)** | `taskflow/.claude/commands/review.md` `security-scan.md` | [11](walkthroughs/11-agent-teams.md) |
| **Slash command (multi-step)** | `taskflow/.claude/commands/release.md` | [12](walkthroughs/12-real-world-flow.md) |
| **Subagent (reviewer)** | `taskflow/.claude/agents/reviewer.md` | [11](walkthroughs/11-agent-teams.md) |
| **Subagent (tester)** | `taskflow/.claude/agents/tester.md` | [11](walkthroughs/11-agent-teams.md) |
| **Subagent (security)** | `taskflow/.claude/agents/security.md` | [11](walkthroughs/11-agent-teams.md) |
| **Subagent (docs-writer)** | `taskflow/.claude/agents/docs-writer.md` | [11](walkthroughs/11-agent-teams.md) |
| **Skill (with SKILL.md)** | `taskflow/.claude/skills/commit-formatter/SKILL.md` | [05](walkthroughs/05-skills-vs-subagents.md) |
| **MCP server config** | `taskflow/.claude/mcp.json` | [06](walkthroughs/06-mcp-servers.md) |
| **Plugin (standalone)** | `plugin-example/plugin.json` | [07](walkthroughs/07-plugins.md) |
| **Plugin command** | `plugin-example/commands/ping.md` | [07](walkthroughs/07-plugins.md) |
| **Plugin agent** | `plugin-example/agents/helper.md` | [07](walkthroughs/07-plugins.md) |
| **Headless mode (`-p`)** | `taskflow/scripts/headless-review.sh` | [08](walkthroughs/08-headless-mode.md) |
| **Scheduled task (cron)** | `taskflow/scripts/scheduled-summary.sh` `setup-cron.sh` | [09](walkthroughs/09-scheduled-tasks.md) |
| **Plan Mode** | (interactive — Shift+Tab in session) | [12](walkthroughs/12-real-world-flow.md) §1 |
| **Agent Teams (sequential)** | `taskflow/.claude/commands/review.md` then `security-scan.md` | [11](walkthroughs/11-agent-teams.md) |
| **Agent Teams (parallel)** | (prompt pattern) | [11](walkthroughs/11-agent-teams.md) |

## Feature ที่ "interactive" — ไม่มีไฟล์ตัวอย่าง

| Feature | ใช้ใน session ยังไง |
|---------|----------------------|
| `/init` | สร้าง CLAUDE.md ครั้งแรก (ใน TaskFlow มีอยู่แล้ว) |
| `/clear` | ล้าง context ในระหว่าง session |
| `/compact` | ย่อ context ที่บานเกิน |
| `/memory` | ดูว่า CLAUDE.md อะไรถูกอ่านเข้า context |
| `/output-style` | สลับ output style |
| `/hooks` | list hook ที่ active |
| `/mcp` | list MCP server + status |
| `/plugins` | enable/disable plugin |
| `/cost` | ดู token usage / ค่าใช้จ่ายของ session |
| `/model` | สลับ model (opus/sonnet/haiku) |
| `/permissions` | open permissions UI |
| Plan Mode | Shift+Tab |
| `@<file>` | อ้าง file เข้า context แบบ explicit |
| `!<command>` | run shell command ตรง ๆ |

## Stats

- **67 ไฟล์** (โค้ด + config + docs)
- **0 dependencies** (Node built-ins ล้วน)
- **25 tests** (ทั้งหมด pass)
- **12 walkthroughs** (TH-first, มี EN ใน FEATURE-MATRIX header)
- **7 hook types** ครบทุก lifecycle event
- **6 slash commands** + **4 subagents** + **1 skill** + **1 output style** + **1 plugin**
