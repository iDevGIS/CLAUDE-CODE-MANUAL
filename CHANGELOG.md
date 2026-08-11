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

## [1.34.0] — 2026-08-11

### Compatibility
- **Claude Code:** `v2.1.227+`

### Changed
- **Version strings** bumped `2.1.226` → `2.1.227` (current-version references only; historical sections kept)

### Why
- `2.1.227` ไม่มีอะไรที่คู่มือ track: ทั้งหมดเป็น bug fix (feature flag ตอน login token หมดอายุ, Bash ใต้ `claude-code-action` + `allowed_non_write_users`, `/tui` ดึงบทสนทนาที่ rewind ไปแล้วกลับมา) กับงาน polish (เมนู slash command ทำสีเฉพาะแถวที่เลือก + ตัวหนาตรงตัวอักษรที่ match, ลด event-loop stall) — จึงเป็นการ sync เลขเวอร์ชันอย่างเดียว ไม่มี section "New in" ใหม่

---

## [1.33.0] — 2026-08-08

### Compatibility
- **Claude Code:** `v2.1.226+`

### Added
- **`SendMessage` can start a conversation with a Remote Control session** — message a Remote Control session on another machine *by name* instead of only replying after it messaged you first; `ListAgents` lists them as `name [ref]` (`v2.1.225`) — chapter 12
- **Workspace trust prompt in `claude agents`** — starting it in an untrusted directory now shows the same trust prompt `claude` does (`v2.1.225`) — chapter 02
- **Gateway spend limits in the usage warning** — behind an LLM gateway, the limit-reached message names the cap, its reset time, and the operator's message (requires the gateway on `2.1.225`) (`v2.1.225`) — chapter 31

### Changed
- **A confirmed Remote Control recipient is never swapped** — `SendMessage` no longer substitutes a same-named session on this machine when the remote list can't be checked (`v2.1.225`) — chapter 12
- **Version strings** bumped `2.1.224` → `2.1.226` (current-version references only; historical sections kept)

### Why
- Catch-up sync for the `2.1.225`–`2.1.226` delta: `2.1.226` is bug fixes and reliability only, so everything documentable here comes from `2.1.225` — two `SendMessage`/Remote Control refinements (chapter 12), the `claude agents` workspace-trust prompt (chapter 02), and gateway spend-limit detail in the usage warning (chapter 31). The rest of `2.1.225` is fixes (OAuth token handling, MCP keychain 401s, auto-mode block counting, headless cross-session parking) and Remote Control/VS Code polish, which the manual does not track

---

## [1.32.0] — 2026-08-07

### Compatibility
- **Claude Code:** `v2.1.224+`

### Added
- **`claude self-hosted-runner`** — turn your own machines or containers into self-hosted environments where Claude Code web, mobile, and desktop sessions run (Team and Enterprise plans) (ch 02)
- **`archive` plugin source** — install a plugin from a zip served over HTTPS, without git or npm, with optional SHA-256 pinning (ch 18)
- **Cross-session `SendMessage`** — Claude Code sessions can message each other, including across your machines, with `ListAgents` to discover them (macOS and Linux) (ch 12)
- **`crossSessionInbound` and `dialogExpiry` settings** — cross-session messages sent to a session running with bypassed permissions are held for your approval; messages to other sessions auto-deliver (ch 06)
- **More sandbox credential-masking options** — `extract` + `onExtractNoMatch` for structured env values, `decode: "jwt"` with `maskClaims` for JWT-aware masking, and `awsPairs` / `sigv4` for AWS SigV4 re-signing; all require `network.tlsTerminate` and are honored only from user, managed, or `--settings` settings (ch 05 & 06)
- **`ANTHROPIC_BEDROCK_REGION_PREFIX`** — on Bedrock, prefer a specific cross-region inference profile instead of the `AWS_REGION`-derived one (ch 23)

### Changed
- **Sandbox violations reach the Bash tool result** — a denied command now reports which file or network access was blocked and why, instead of the details never surfacing (ch 05)
- **Managed-settings approval stops re-prompting** — the prompt no longer re-appears after re-login or an organization switch when the org's settings are unchanged (ch 06)

### Removed
- **The 200-subagent-per-session spawn cap** — long-running sessions no longer refuse new agents; the concurrency cap and spawn-depth limit still apply, so the `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` entry was updated (ch 12 & 23)

### Version
- **Version strings** bumped `2.1.223` → `2.1.224` (current-version references only; historical sections kept)

### Why
- Claude Code `v2.1.224` opens up where sessions can run (self-hosted runners), how they talk to each other (cross-session `SendMessage` + `ListAgents`, with the old 200-agent ceiling gone), and how secrets are masked inside the sandbox — all of which change what readers install, configure, and can rely on

---

## [1.31.0] — 2026-08-06

### Compatibility
- **Claude Code:** `v2.1.223+`

### Added
- **Owner wildcards for marketplace policy** — `strictKnownMarketplaces` and `blockedMarketplaces` managed settings accept `"owner/*"` entries to allow or block every marketplace repo under a GitHub org (ch 06)
- **`claude --teleport <session id>`** — cloud sessions show a `/teleport` hint for continuing the session locally (ch 02)
- **Restricted-subagent-model warning** — workflow agents, forked skills, slash commands, and resumed background agents warn when the requested model is restricted and the parent model runs instead (ch 12)
- **`CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT`** — set `1` to let sessions on unrecognized model IDs grow past the assumed context window again (ch 23)

### Changed
- **`/review` is an alias of `/code-review`** — one command reviews the current diff or a PR (`/code-review <level> <pr#>`); `/code-review ultra` runs the deep cloud review, and calling it with no level reuses the level typed last (ch 03)
- **`CLAUDE_CODE_DISABLE_1M_CONTEXT` covers every native-1M model** — it now holds all of them to 200K via auto-compaction instead of a fixed list, with a startup warning when auto-compaction isn't holding the session to 200K (ch 23)
- **Auto-compact bounds unknown model IDs** — sessions on unrecognized model IDs stay inside the assumed context window by default (ch 23)
- **`modelOverrides` ignores unknown keys** — keys that aren't Anthropic model IDs are no longer treated as the session's canonical model ID (ch 06)
- **Admin `env` merges per key** — server-delivered managed settings no longer disable the `env` block of a machine-local `managed-settings.json` or MDM profile (ch 06)

### Why
- Claude Code `v2.1.223` reshapes review into a single `/code-review` surface, tightens context-window enforcement across model IDs, and gives admins org-wide marketplace policy — all of which change what readers should type and configure

---

## [1.30.0] — 2026-08-05

### Compatibility
- **Claude Code:** `v2.1.222+`

### Changed
- **Remote Control auto-start is user-scope only** — repo-local settings (`.claude/settings.json`, `.claude/settings.local.json`) can no longer turn it **on** (they can still turn it **off**); enable it at user scope via `/config` (ch 06)
- **Auto mode screens agent-to-agent messages** — messages sent to other agent sessions via `SendMessage` now pass through the permission classifier before dispatch (ch 05)
- **Diffs read raw git blobs** — the `/diff` view, the Remote Control workspace diff, and file-edit diffs in Claude Code on the web ignore workspace-configured diff drivers and `textconv` (ch 03)
- **`disable-model-invocation` skills aren't reimplemented** — Claude is now told to ask the user to run such a skill instead of replicating its workflow (ch 11)

### Removed
- **ultraplan** — the ultraplan feature (`/ultraplan`, "Refine with Ultraplan" in plan mode) was removed from Claude Code; the manual never documented it, so no content had to be pulled (ch 03 notes the removal)

### Version
- **Version strings** bumped `2.1.221` → `2.1.222` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.222` is mostly a fix release; the documentable delta is four behavior changes (Remote Control scope, auto-mode `SendMessage` screening, raw-blob diffs, `disable-model-invocation` handling) plus the ultraplan removal — bug fixes and UI polish were skipped per the sync policy

---

## [1.29.0] — 2026-08-04

### Compatibility
- **Claude Code:** `v2.1.221+`

### Added
- **Sandbox credential masking** — `sandbox.credentials` gained `mode: "mask"` (Linux/WSL): sandboxed commands read a sentinel copy (whole file, or only the spans an `extract` regex captures) while the sandbox proxy substitutes the real value on egress; macOS falls back to `deny` (ch 05 & 06)
- **VS Code Focus view** — chat-menu toggle that hides tool activity behind an expandable per-turn summary with a live running-tool indicator; `Ctrl+Alt+F` or "Claude Code: Toggle Focus view" (ch 17)
- **`claude-api` skill `prompt-audit` subcommand** — audits prompts and tool descriptions for older-model patterns (ch 11)
- **`CLAUDE_CODE_RESUME_INTERRUPTED_TURN`** documented — set `0` to disable interrupted-turn auto-resume; falsy values honored since 2.1.221 (ch 19 & 23)

### Changed
- **Background sessions wrap up differently** — commit and push to preserve work, open a draft PR **only when the task calls for one**, follow `CLAUDE.md` git instructions, and always report where the work lives (ch 19 & 41, refines the v2.1.198 behavior)
- **`/fork` creates its own worktree** instead of working in the original session's checkout (ch 03, 19 & 41)
- **`/status` shows the session kind** — `interactive`, or a background job that is `attached` / `unattended` (ch 03, 19 & 41)
- **Plugins** — installs from `/plugin` activate immediately when safe (no forced `/reload-plugins`); `/plugin install` refreshes a stale marketplace catalog and retries; `skills` path accepts `"."`; `claude plugin validate` warns about names Claude Desktop's managed marketplace sync would reject (ch 03, 11 & 18)
- **Permission checks tightened** — commands hidden in zsh `[[ ]]` regex conditionals and Windows paths containing quote characters now prompt; auto-mode checks for parallel tool calls reuse the cached conversation prefix and re-prompt when the mode changes mid-check (ch 05)
- **MCP** — tool search re-enabled on Google Vertex AI for Claude 4.5-generation and newer models; `--mcp-config` servers connect before the first turn in print mode (ch 09)
- **Claude in Chrome closes the tabs it opens** once they're no longer needed (ch 40)
- **Skills named after terminal-only built-ins** (e.g. `/help`, `/feedback`) are invocable in non-interactive sessions again (ch 11)
- **Version strings** bumped `2.1.220` → `2.1.221` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.221` is a large release: new sandbox credential masking, a VS Code Focus view, reworked background-session wrap-up, plugin activation/validation changes, and permission-check hardening — all of which change documented behavior in this manual

---

## [1.28.0] — 2026-07-25

### Compatibility
- **Claude Code:** `v2.1.220+`

### Changed
- **Version strings** bumped `2.1.219` → `2.1.220` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.220` ships only bug fixes and reliability improvements — no new commands, flags, settings, models, or behavior changes to document, so this release is a version-reference sync only

---

## [1.27.0] — 2026-07-25

### Compatibility
- **Claude Code:** `v2.1.219+`

### Added
- **Claude Opus 5** (`claude-opus-5`) — the new **default Opus model**: 1M context, fast mode at $10/$50 per Mtok (`v2.1.219`) — chapters 2, 6, 21, 25 + READMEs
- **`sandbox.network.strictAllowlist` setting** — deny non-allowlisted hosts for sandboxed commands without prompting (`v2.1.219`) — chapter 6
- **`workflowSizeGuideline` setting** — set the advisory Dynamic-workflow size guideline from any settings file; the `/config` row hides while set (`v2.1.219`) — chapters 6 & 39
- **`DirectoryAdded` hook** — fires after `/add-dir` or the SDK `register_repo_root` control request registers a new working directory mid-session (`v2.1.219`) — chapter 10
- **`mcp_server_errors` in the headless init event** — `stream-json` init lists `--mcp-config` entries skipped by config validation; terminal runs print a startup warning (`v2.1.219`) — chapter 9
- **Nested subagents in `stream-json`** — depth-2+ subagents appear under `--forward-subagent-text`, keyed by the spawning Agent `tool_use` id (`v2.1.219`) — chapter 12

### Changed
- **Nested subagent spawning on by default** — subagents can spawn nested subagents up to depth 3 (was off by default since `v2.1.217`); set `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=1` to disable (`v2.1.219`) — chapters 12 & 23
- **Fast mode lineup** — `/fast` now applies to Opus 5 and Opus 4.8; Opus 4.7 removed from fast mode (`v2.1.219`) — chapters 6 & 21
- **Dynamic workflows default to a medium size guideline** (aim for fewer than 15 agents); the running-workflow status line shows the current size with a pointer to `/config` (`v2.1.219`) — chapter 39
- **Managed MCP allowlist/denylist `${VAR}` entries** now resolve from the startup environment and managed-settings env instead of settings-file env (`v2.1.219`) — chapter 9
- **Version strings** bumped `2.1.218` → `2.1.219` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.219` ships **Claude Opus 5** as the new default Opus model (lineup + fast-mode references updated across the manual) plus several documentable platform changes: new sandbox/workflow settings (chapters 6 & 39), the `DirectoryAdded` hook (chapter 10), headless MCP diagnostics and managed `${VAR}` resolution (chapter 9), and nested-subagent spawning on by default (chapters 12 & 23)

---

## [1.26.0] — 2026-07-23

### Compatibility
- **Claude Code:** `v2.1.218+`

### Added
- **MCP connection diagnostics** — `claude mcp list` and `/mcp` show the HTTP status and error text when a server fails to connect, plus a warning for MCP config values with hidden leading/trailing whitespace (`v2.1.218`) — chapter 9
- **Flexible frontmatter booleans** — skill and plugin frontmatter booleans accept `yes`/`no`/`on`/`off`/`1`/`0` (case-insensitive) alongside `true`/`false` (`v2.1.218`) — chapter 11

### Changed
- **`/code-review` runs as a background subagent** — review work no longer fills the conversation; stacked slash commands stay as its review target (`v2.1.218`) — chapter 3
- **`/deep-research` is manual-only** — it starts only when invoked; Claude no longer launches it on its own (`v2.1.218`) — chapter 3
- **Auto mode opens fewer dialogs** — the dangerous-rm, background-`&`, and suspicious-Windows-path checks are adjudicated by the auto-mode classifier instead of permission dialogs; plan mode with auto no longer prompts for Bash commands the static analyzer can't prove read-only (`v2.1.218`) — chapter 5
- **Server-managed settings prompt less** — benign feature and cost toggles no longer trigger the settings-approval prompt (`v2.1.218`) — chapter 6
- **`context: fork` skills run in the background by default** — opt out per skill with `background: false` (`v2.1.218`) — chapter 11
- **Agent names reject `:`** — reserved for plugin namespacing (`v2.1.218`) — chapter 12
- **Version strings** bumped `2.1.217` → `2.1.218` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.218` — a large batch of bug fixes plus several behavior changes worth documenting: `/code-review` backgrounding and `/deep-research` manual-only (chapter 3), quieter auto/plan-mode permission flow (chapter 5), MCP connection diagnostics (chapter 9), forked-skill backgrounding + boolean frontmatter (chapter 11), and the `:` restriction in agent names (chapter 12)

---

## [1.25.0] — 2026-07-22

### Compatibility
- **Claude Code:** `v2.1.217+`

### Added
- **`emojiCompletionEnabled` setting** — emoji shortcode autocomplete in the prompt input: type `:heart:` to insert ❤️, or a partial like `:hea` for suggestions; set `false` to disable (`v2.1.217`) — chapter 6
- **Concurrent subagent cap** — at most 20 subagents run at the same time; override with `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` (`v2.1.217`) — chapters 12 & 23
- **`FORCE_HYPERLINK`** — footer PR badge links render as clickable hyperlinks even when terminal support can't be detected (e.g. over ssh/tmux); set `0` to opt out (`v2.1.217`) — chapter 23

### Changed
- **Nested subagent spawning off by default** — subagents no longer spawn their own subagents unless `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` allows deeper nesting (`v2.1.217`) — chapters 12 & 23
- **Version strings** bumped `2.1.216` → `2.1.217` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.217` — mostly bug fixes; the documentable changes are the emoji autocomplete setting (chapter 6) plus new subagent fan-out guards and the `FORCE_HYPERLINK` env var (chapters 12 & 23)

---

## [1.24.0] — 2026-07-21

### Compatibility
- **Claude Code:** `v2.1.216+`

### Added
- **`sandbox.filesystem.disabled` setting** — skip filesystem isolation for sandboxed commands while keeping network egress control (`v2.1.216`) — chapter 6

### Changed
- **Version strings** bumped `2.1.215` → `2.1.216` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.216` — a fixes-heavy release; the only documentable change is the new `sandbox.filesystem.disabled` setting (chapter 6). Everything else is bug fixes and UI polish

---

## [1.23.0] — 2026-07-20

### Compatibility
- **Claude Code:** `v2.1.215+`

### Changed
- **`/verify` and `/code-review` are no longer auto-invoked** — Claude no longer runs these skills on its own; invoke them explicitly with `/verify` or `/code-review` when you want them (`v2.1.215`) — chapter 3
- **Version strings** bumped `2.1.214` → `2.1.215` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.215` — a single-item release: the `/verify` and `/code-review` skills stop being auto-invoked by Claude and become manual-only (chapter 3); everything else in the release notes is unchanged behavior

---

## [1.22.0] — 2026-07-18

### Compatibility
- **Claude Code:** `v2.1.214+`

### Added
- **EndConversation tool** — Claude can end a session outright with highly abusive users or jailbreak attempts, as on claude.ai since 2025 (`v2.1.214`) — chapter 19
- **`CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH`** — configure the 60 KB truncation limit on OpenTelemetry content attributes (`v2.1.214`) — chapter 23
- **OTel log attributes** — `message.uuid`, `client_request_id`, and `tool_source` added to OpenTelemetry log events for message-level correlation and tool provenance (`v2.1.214`) — chapter 23
- **`modified` timestamp in memory frontmatter** — memory files now carry an ISO `modified` timestamp (`v2.1.214`) — chapter 8
- **Reasoning effort in `subagentStatusLine`** — the payload now includes each subagent's reasoning effort (`v2.1.214`) — chapter 12
- **Permission prompts for `docker` daemon-redirect flags** — `--url`, `--connection`, `--identity`, and Podman's remote mode now prompt (`v2.1.214`) — chapter 5

### Changed
- **Hook `if:` single-segment `dir/**` conditions** now match only `<cwd>/dir`; write `**/dir/**` for any-depth matching (`deny`/`ask` permission rules keep any-depth match) (`v2.1.214`) — chapter 10
- **SessionStart hooks report source `"fork"`** when a session begins as a fork instead of `"resume"` (`v2.1.214`) — chapter 10
- **`file` with `-m`/`--magic-file` or `-f`/`--files-from`** now requires permission instead of being auto-allowed as read-only (`v2.1.214`) — chapter 5
- **Version strings** bumped `2.1.212` → `2.1.214` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.214` — a security/observability-heavy release: the new EndConversation tool (chapter 19), a batch of permission-check hardenings with two documentable behavior changes (`docker` daemon-redirect flags and `file` magic/list flags, chapter 5), the hook `if:` glob-scope change and SessionStart `"fork"` source (chapter 10), plus OpenTelemetry additions (`CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` + new log attributes, chapter 23), a memory-frontmatter `modified` timestamp (chapter 8), and reasoning effort in `subagentStatusLine` (chapter 12); there is no 2.1.213 entry in the official changelog

---

## [1.21.0] — 2026-07-17

### Compatibility
- **Claude Code:** `v2.1.212+`

### Added
- **`claude auto-mode reset`** — restore the default auto-mode configuration, with a confirmation prompt (`--yes` to skip) (`v2.1.212`) — chapter 2
- **`/subtask`** — new command carrying the old in-session `/fork` behavior (launch a subagent inside the session) (`v2.1.212`) — chapter 3
- **`/resume` in the agent view** — opens a picker of past sessions (including ones deleted from the list) and resumes the pick as a background session (`v2.1.212`) — chapter 3
- **Runaway-loop guards** — session-wide WebSearch limit (`CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`, default 200) and per-session subagent cap (`CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`, default 200; `/clear` resets) (`v2.1.212`) — chapters 12 & 23
- **Long MCP calls auto-background** — MCP tool calls over 2 minutes move to the background automatically; threshold/disable via `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` (`v2.1.212`) — chapters 9 & 23

### Changed
- **`/fork` now forks into a background session** — copies the conversation into a new background session (its own row in `claude agents`) while you keep working; the in-session subagent role moved to `/subtask` (`v2.1.212`) — chapter 3
- **Bare `/btw` reopens the side-question panel** on the most recent exchange (`v2.1.212`) — chapter 3
- **Task tool `mode` parameter deprecated** (now ignored) — subagents inherit the parent session's permission mode by default (`v2.1.212`) — chapter 12
- **Version strings** bumped `2.1.211` → `2.1.212` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.212` — headline change is `/fork` becoming a background-session fork with the new `/subtask` taking over the in-session role (chapter 3); plus a `claude auto-mode reset` subcommand (chapter 2), three new env vars for runaway-loop guards and MCP auto-backgrounding (chapters 9, 12 & 23), an agent-view `/resume` picker and bare-`/btw` panel (chapter 3), and the Task tool `mode` deprecation (chapter 12)

---

## [1.20.0] — 2026-07-16

### Compatibility
- **Claude Code:** `v2.1.211+`

### Added
- **`--forward-subagent-text` flag + `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT` env var** — include subagent text and thinking in `stream-json` output (`v2.1.211`) — chapters 2 & 23
- **"Always allow" rules now save at the repository root** — approvals granted in a git worktree persist across sessions and other worktrees of the same repo (`v2.1.211`) — chapter 5
- **`/usage-credits` asks for confirmation** before sending a request to organization admins (`v2.1.211`) — chapter 3
- **Integer env vars accept `1e6` / `64_000` spellings** — scientific notation and digit separators for timeouts, token budgets, retry counts (`v2.1.211`) — chapter 23

### Changed
- **Version strings** bumped `2.1.210` → `2.1.211` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.211` (16 Jul 2026) — mostly a bug-fix release; documentable items are the new stream-json subagent-text flag/env var (chapters 2 & 23), worktree-persistent "always allow" rules (chapter 5), a `/usage-credits` confirmation step (chapter 3), and relaxed integer env-var spellings (chapter 23)

---

## [1.19.0] — 2026-07-15

### Compatibility
- **Claude Code:** `v2.1.210+`

### Added
- **Startup warning for misnamed permission rules** — `Write(path)` / `NotebookEdit(path)` / `Glob(path)` rules now warn at startup; use `Edit(path)` or `Read(path)` instead (`v2.1.210`) — chapter 5
- **Auto mode classifier defaults to Sonnet 5** for external sessions — validated on the session's first request and pinned for the session (`v2.1.210`) — chapter 5

### Changed
- **Version strings** bumped `2.1.209` → `2.1.210` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.210` (15 Jul 2026) — mostly a bug-fix release; the two documentable items are both permission-related (rule-name startup warning + Auto mode classifier default), added to chapter 5 in both languages

---

## [1.18.0] — 2026-07-14

### Compatibility
- **Claude Code:** `v2.1.209+`

### Changed
- **Version strings** bumped `2.1.208` → `2.1.209` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.209` (14 Jul 2026) — single bug-fix release (reverts an overly broad dialog guard in `claude agents` background sessions); no documentable features, so this is a version-reference sync only

---

## [1.17.0] — 2026-07-14

### Compatibility
- **Claude Code:** `v2.1.208+`

### Added
- **Screen reader mode** — flag `--ax-screen-reader` / env `CLAUDE_AX_SCREEN_READER=1` / setting `axScreenReader` for plain-text rendering (`v2.1.208`) — chapters 2, 6 + env-var table
- `vimInsertModeRemaps` setting — map two-key insert-mode sequences (e.g. `jj`) to Escape in vim mode (`v2.1.208`) — chapter 6
- `CLAUDE_CODE_PROCESS_WRAPPER` env var — corporate launcher wrapper for every Claude Code self-spawn (`v2.1.208`) — env-var table
- **Hidden catastrophic removals always prompt** — e.g. `rm -rf ~` wrapped in `$(…)`, backticks, or `<(…)` now asks for confirmation even in `--dangerously-skip-permissions` / Auto mode (`v2.1.208`) — chapter 5

### Changed
- **Version strings** bumped `2.1.207` → `2.1.208` (current-version references only; historical sections kept)

### Why
- Claude Code `2.1.208` (14 Jul 2026) — accessibility milestone (screen reader mode) plus a hardened catastrophic-removal guard; the rest of the release is bug fixes / performance work, which the manual skips per policy

---

## [1.16.0] — 2026-07-13

### Compatibility
- **Claude Code:** `v2.1.207+`

### Added
- **Auto mode on by default on Bedrock / Vertex AI / Foundry** — the `CLAUDE_CODE_ENABLE_AUTO_MODE` opt-in is no longer required; disable with the `disableAutoMode` setting (`v2.1.207`) — chapter 5 + env-var table
- `/cd` directory path suggestions (matching `/add-dir`) and a `/doctor` check that proposes trimming checked-in `CLAUDE.md` files (`v2.1.206`) — chapter 3

### Changed
- **Version strings** bumped `2.1.205` → `2.1.207` (current-version references only; historical sections kept)
- Auto mode config no longer read from repo-resident `.claude/settings.local.json` — documented pointer to `~/.claude/settings.json` (`v2.1.207`)
- `CLAUDE_CODE_ENABLE_AUTO_MODE` env-var description annotated as not required since `v2.1.207`

### Why
- Catch-up sync for the `2.1.206`–`2.1.207` delta (the scheduled autosync missed its slots while the machine slept over the weekend); mostly reliability fixes upstream, with the Auto-mode default change being the one doc-impacting item

---

## [1.15.0] — 2026-07-10

### Compatibility
- **Claude Code:** `v2.1.205+`

### Added
- **`/doctor` is now a full setup checkup** that can diagnose *and fix* issues, with `/checkup` as an alias (`v2.1.205`) — chapter 3
- **Manual-mode footer badge** — a grey ⏸ badge shows while in Manual permission mode (`v2.1.203`) — chapter 5
- **Auto mode hardening** — blocks session-transcript tampering; asks before `rm -rf` on unresolved variables (`v2.1.205`) — chapter 5
- **"Dynamic workflow size" setting** in `/config` (small/medium/large agent counts, advisory) (`v2.1.202`) — chapter 39

### Changed
- **Version strings** bumped `2.1.201` → `2.1.205` (current-version references only; historical sections kept)
- **`/review <pr>`** documented as a fast single-pass review again — `/code-review <level> <pr#>` for the multi-agent review (`v2.1.202`) — chapter 3

### Why
- Track Claude Code `v2.1.205` — a reliability-heavy stretch (`2.1.202`–`2.1.205`) with a handful of documentable features, captured as targeted edits

---

## [1.14.0] — 2026-06-28

### Compatibility
- **Claude Code:** `v2.1.201+`

### Added
- **Stacked skill invocations** — `/skill-a /skill-b do XYZ` loads all leading skills, up to 5 (`v2.1.199`) — noted in chapter 3
- **Permission mode rename** — the "default" mode is now labeled **"Manual"**; `--permission-mode manual` / `"defaultMode": "manual"` accepted alongside `default` (`v2.1.200`) — noted in chapter 5, plus the `AskUserQuestion` no-auto-continue change

### Changed
- **Version strings** bumped `2.1.198` → `2.1.201` (current-version references only; historical `New in v2.1.198` sections and the ch.40 GA note kept)
- **`CLAUDE_CODE_RETRY_WATCHDOG`** description updated — now raises default retries for transient errors to 300 and lifts the 15-cap on `CLAUDE_CODE_MAX_RETRIES` (`v2.1.199`)

### Why
- Track Claude Code `v2.1.201` — a small delta (mostly reliability fixes), captured as targeted edits without a full refresh

---

## [1.13.0] — 2026-06-28

### Compatibility
- **Claude Code:** `v2.1.198+`

### Added
- **🔎 Deep Dives — 3 new atomic notes per language (TH + EN):**
  - `39-dynamic-workflows` — Dynamic Workflows & `ultracode` in depth: triggering, script anatomy (`agent`/`parallel`/`pipeline`/`phase`/`budget`), a worked review-workflow example, `/workflows` monitoring, limits (~16 concurrent / 1000 agents per run), and cost guidance
  - `40-claude-in-chrome` — Claude in Chrome (GA in `2.1.198`): setup + `/chrome`, capabilities (navigate/read/click/forms/screenshots/console/network), real use cases, safety practices
  - `41-background-agents` — Background sessions & `claude agents` in depth: `--bg`/`/bg`/`Ctrl+B`, the agents view + `--json`, lifecycle & resilience, auto commit/push/draft-PR, `Notification` hook events, permissions & reaping
- **Mermaid diagrams** embedded in chapters 5 / 10 / 13 (both languages, atomic + single-page): permission decision flow, hooks lifecycle in a turn, agent-team fan-out
- New **🔎 Deep Dives** category in both MOC indexes and both root-README TOCs

### Changed
- Atomic-note count 38 → **41 per language** (9 categories); chapter-19 notes link to the new deep-dive

### Why
- The three fastest-moving feature areas (workflows, browser automation, background agents) deserved more than a paragraph each — and the long-planned lifecycle/flow diagrams make chapters 5/10/13 much easier to grasp

---

## [1.12.0] — 2026-06-28

### Compatibility
- **Claude Code:** `v2.1.198+`

### Added
- **New model — Claude Sonnet 5** (`claude-sonnet-5`): the **new default model in Claude Code** (introduced in `2.1.197`), with a **native 1M-token context window** and promotional pricing of $2/$10 per Mtok through Aug 31, 2026. Documented lineup is now **Fable 5 / Opus 4.8 / Sonnet 5 / Haiku 4.5**
- **Hooks** — `Notification` hook now fires for background agents (`agent_needs_input` / `agent_completed`)
- **Slash** — `/dataviz` skill (chart/dashboard design guidance + color-palette validator)
- **Settings** — organization default models (shows as "Org default" in `/model`); streaming idle watchdog on by default (`CLAUDE_ENABLE_STREAM_WATCHDOG=0` to disable)
- **Background agents** — finish code work in a worktree by committing, pushing, and opening a **draft PR** automatically
- **Claude in Chrome** — now generally available

### Changed
- **Version strings** bumped `2.1.195` → `2.1.198` (current-version references only; historical `New in v2.1.19x` sections kept)
- **`/agents` wizard removed** (Claude Code `2.1.198`) — create/manage subagents by asking Claude or editing `.claude/agents/` directly; chapter 12 and the slash-command tables updated
- **Explore agent** now inherits the main session's model (capped at Opus) instead of running on Haiku; subagents/compaction inherit extended-thinking config
- **Security** — `claude mcp list`/`get` no longer auto-spawn `.mcp.json` servers self-approved via committed settings (`⏸ Pending approval` in untrusted workspaces)

### Why
- Track the Claude Code `v2.1.198` release — headlined by **Sonnet 5 becoming the default model**, which changes the recommended-model guidance throughout the manual

---

## [1.11.0] — 2026-06-26

### Compatibility
- **Claude Code:** `v2.1.195+`

### Added
- **🔰 Absolute-Beginners pack** — 4 new atomic notes per language (TH + EN) aimed at complete non-technical newcomers:
  - `35-glossary` — plain-language glossary (45 terms) with everyday/household analogies
  - `36-zero-to-first-win` — hand-held "zero to first win" walkthrough (install → first success) with on-screen mockups and "common confusion" callouts
  - `37-beginner-faq` — beginner FAQ (14 common stumbles) with reassuring, plain answers
  - `38-cheat-sheet` — one-page pocket cheat sheet (launch commands, slash commands, shortcuts, example prompts, emergency moves)
- New **🔰 Absolute Beginners** category in both atomic-note MOC indexes (`docs/{th,en}/README.md`), plus a beginner on-ramp callout and a TOC group in both root READMEs

### Changed
- Atomic-note count bumped 34 → **38 notes per language** (now 8 categories)

### Why
- The manual was strong for developers but assumed terminal/Git familiarity; this pack lets a true beginner ("ระดับแม่บ้าน") follow along and reach a first win without prior command-line experience

---

## [1.10.0] — 2026-06-26

### Compatibility
- **Claude Code:** `v2.1.195+`

### Added
- **Env vars** — `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` (disable mouse click/drag/hover in fullscreen, keep wheel scroll), `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP` (disable idle background-shell memory-pressure reaping), `OTEL_LOG_ASSISTANT_RESPONSES` (log model response text via OpenTelemetry)
- **Setting** — `autoMode.classifyAllShell` (route all Bash/PowerShell through the Auto-mode classifier); Auto-mode denial reasons now surfaced in the transcript, denial toast, and `/permissions`
- **Hooks** — matchers now exact-match hyphenated identifiers (`code-reviewer`, `mcp__brave-search`); use `mcp__brave-search__.*` to match all tools of a hyphenated MCP server
- **Bash mode (`!`)** — live file-path autocomplete

### Changed
- **Version strings** bumped `2.1.191` → `2.1.195` (current-version references in guides, atomic notes, and READMEs; the `New in v2.1.191` feature sections are kept as historical markers)

### Why
- Sync the manual with the Claude Code `v2.1.195` release — the `2.1.192`–`2.1.195` delta was mostly bug fixes, so this captures the handful of new settings, env vars, and hook behavior

---

## [1.9.0] — 2026-06-25

### Compatibility
- **Claude Code:** `v2.1.191+`

### Added
- **New model — Claude Fable 5** (`claude-fable-5`): Anthropic's newest **Mythos-class** model and the most capable model generally available (introduced in Claude Code `2.1.170`), shipping with a **1M-token context window by default**. The documented lineup is now **Fable 5 / Opus 4.8 / Sonnet 4.6 / Haiku 4.5** (fast mode still uses Opus 4.7)
- **New subcommands** — `claude mcp login`/`logout <name>` (authenticate MCP servers from the CLI, `--no-browser` for SSH), `claude plugin init <name>` (scaffold a plugin under `.claude/skills`)
- **New flags** — `--safe-mode` (start with all customizations disabled for troubleshooting; env `CLAUDE_CODE_SAFE_MODE`), `--agent <name>` (pick the agent a dispatched/background session runs as), `--fallback-model` now applies to interactive sessions
- **New slash commands** — `/rewind` (resume from before `/clear`), `/cd <dir>` (move working dir without breaking the prompt cache), `/config key=value` (+ `/config --help`), `/plugin list`
- **New settings** — `fallbackModel` (≤3), `availableModels` + `enforceAvailableModels`, `requiredMinimumVersion`/`requiredMaximumVersion`, `respondToBashCommands`, `language`, `attribution.sessionUrl`, `disableBundledSkills`, `teammateMode: "iterm2"`, `sandbox.credentials`, `sandbox.allowAppleEvents`
- **Hooks** — `Stop`/`SubagentStop` can return `hookSpecificOutput.additionalContext`; self-hosted `post-session` lifecycle hook; comma-separated matchers (`"Bash,PowerShell"`); path-based `if` conditions (`Edit(src/**)`, `Read(.env)`)
- **Skills** — auto-load from `.claude/skills` (no marketplace); nested skills disambiguated as `<dir>:<name>`; frontmatter accepts kebab/snake/camelCase; `\$` literal-dollar escape
- **Subagents** — can spawn their own subagents, up to **5 levels deep**
- **Env vars** — `CLAUDE_CODE_SAFE_MODE`, `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS`, `CLAUDE_CLIENT_PRESENCE_FILE`, `CLAUDE_CODE_ENABLE_AUTO_MODE`, `CLAUDE_CODE_RETRY_WATCHDOG`, `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`

### Changed
- **Version strings** bumped `2.1.156` → `2.1.191` across the guides (EN/TH), atomic notes (`docs/{en,th}`), and READMEs
- **Model framing** — Opus 4.8 reframed from "the smartest/newest flagship" to "top Opus / strongest coding"; **Fable 5** is now the most capable model overall
- **Permissions** — new `Tool(param:value)` parameter-matching rules (e.g. `Agent(model:opus)`); `"*"` glob allowed in deny tool-name position; `SendMessage` cross-session relays no longer carry user authority
- **Auto mode** — now available on Bedrock/Vertex/Foundry (opt in with `CLAUDE_CODE_ENABLE_AUTO_MODE=1`); blocks destructive git (`reset --hard`, `clean -fd`, …) and `terraform/pulumi/cdk destroy` unless explicitly requested
- **Dynamic Workflows** — trigger keyword renamed **`workflow` → `ultracode`** (with `/effort ultracode`); agent-teams `TeamCreate`/`TeamDelete` tools removed in favor of an implicit team (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + the Agent tool's `name` parameter)
- **`!` bash commands** are now auto-answered by Claude (toggle with `respondToBashCommands`)

### Why
- Keep the manual aligned with the current Claude Code release (`v2.1.191`) and the new **Fable 5** model lineup, capturing ~35 releases of new commands, flags, settings, and hook/skill/subagent capabilities since `2.1.156`

---

## [1.8.0] — 2026-05-30

### Compatibility
- **Claude Code:** `v2.1.156+`

### Changed
- **docs: refresh manual for Claude Code `v2.1.156`** — version strings bumped `2.1.114` → `2.1.156` and model lineup updated to **Opus 4.8** (`claude-opus-4-8`, newest flagship, defaults to high effort) / **Sonnet 4.6** / **Haiku 4.5**; fast mode now uses **Opus 4.7**
- **`--effort max` note corrected** — now documented as the **Opus** family behavior (e.g. Opus 4.8 defaults to high effort on demanding tasks); models without an effort parameter fall back to their default

### Added
- **New subcommands** — `claude ultrareview [target]` (non-interactive CI review, `--json`, exit 0/1), `claude project purge [path]` (`--dry-run`, `-y`, `-i`, `--all`), `claude plugin prune` (`uninstall --prune` cascades)
- **New flags** — `--bg` / `--bg --exec "<cmd>"` (background sessions/exec), `--plugin-url <url>` (+ `--plugin-dir` accepts `.zip`), `--from-pr` now accepts GitHub Enterprise / GitLab MR / Bitbucket
- **New sections** — Dynamic Workflows (orchestrate tens–hundreds of agents from a script), Background Sessions & Agent View, Auto mode `hard_deny` rule type

### Why
- Keep the manual aligned with the current Claude Code release (`v2.1.156`) and the Opus 4.8 model lineup

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

[Unreleased]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.33.0...HEAD
[1.34.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.33.0...v1.34.0
[1.33.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.32.0...v1.33.0
[1.32.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.31.0...v1.32.0
[1.31.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.30.0...v1.31.0
[1.30.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.29.0...v1.30.0
[1.29.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.28.0...v1.29.0
[1.28.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.27.0...v1.28.0
[1.27.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.26.0...v1.27.0
[1.26.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.25.0...v1.26.0
[1.25.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.24.0...v1.25.0
[1.24.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.23.0...v1.24.0
[1.23.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.22.0...v1.23.0
[1.22.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.21.0...v1.22.0
[1.21.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.20.0...v1.21.0
[1.20.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.19.0...v1.20.0
[1.19.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.18.0...v1.19.0
[1.18.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.17.0...v1.18.0
[1.17.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.16.0...v1.17.0
[1.16.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.15.0...v1.16.0
[1.15.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.14.0...v1.15.0
[1.14.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.13.0...v1.14.0
[1.13.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.2...v1.4.0
[1.3.2]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/releases/tag/v1.0.0
