---
title: "Slash Commands"
section: 3
lang: en
tags:
  - claude-code
  - slash-commands
  - commands
aliases:
  - "Slash Commands"
related:
  - "[[02-cli-commands]]"
  - "[[11-skills]]"
  - "[[04-keyboard-shortcuts]]"
---

# Slash Commands

### Benefits and Use Cases

> **Why use slash commands?**
>
> Slash commands are **shortcuts for tasks you do often**. Just type `/` followed by the command name and Claude executes the predefined steps automatically — reducing the time spent typing long commands and the chance of mistakes.

**Use Cases:**

| Scenario | Slash Command | Description |
|----------|---------------|-------------|
| **Done coding, want to commit** | `/commit` | Claude analyzes the diff, writes a meaningful commit message, stages the right files, and commits — no message-writing required |
| **Send a PR for team review** | `/pr` | Claude summarizes all changes, writes a title/description, pushes, and creates the PR — clear, well-explained PRs |
| **Want AI to review the code first** | `/review` | Claude reads the changes, finds bugs, security issues, and code smells, and provides recommendations |
| **Complex code that needs planning first** | `/plan` | Claude analyzes the problem and proposes a step-by-step plan before acting — reducing the risk of going down the wrong path |
| **Very tough problem, need deep thinking** | `/think` | Claude uses Extended Thinking to analyze deeply before answering — perfect for complex bugs |
| **Conversation is long, context near full** | `/compact` | Summarize the conversation to free up space and keep working |
| **Want to ask a quick aside** | `/btw what is the Config File name?` | Ask small questions without using tools — saves context |
| **Need to check the system repeatedly** | `/loop 5m "check error log"` | Claude repeats every 5 minutes — good for monitoring tasks |
| **Editing many files, want to do them in parallel** | `/batch` | Claude splits the work into chunks and runs them in parallel — much faster than one file at a time |
| **New project with no CLAUDE.md** | `/init` | Claude analyzes the project and creates a CLAUDE.md containing build commands, naming conventions, architecture |

Press `/` in a session to see all available commands.

### Session Management

| Command | Description |
|---------|-------------|
| `/help` | Show usage instructions |
| `/clear` | Start a new session (clear context) |
| `/compact` | Summarize the conversation to save context |
| `/memory` | View and edit CLAUDE.md and Auto Memory |
| `/config` | Open the settings page |
| `/doctor` | Diagnose basic problems |
| `/keybindings` | Configure keyboard shortcuts |
| `/rename` | Rename the session |
| `/resume` | Pick a previous session to continue |

### Code and Git

| Command | Description |
|---------|-------------|
| `/commit` | Stage and commit changes |
| `/pr` | Create a pull request |
| `/review` | Review code |
| `/code-review` | Review the diff for bugs/quality at chosen effort level. `--fix` applies fixes; `--comment` posts inline PR comments. (Renamed from the old `/simplify`.) |
| `/simplify` | Re-introduced as a **cleanup-only** review (reuse/simplify/efficiency) that applies its fixes. |
| `/init` | Generate CLAUDE.md from project analysis |

### Workflow and Control

| Command | Description |
|---------|-------------|
| `/plan` | Enter plan mode |
| `/think` | Turn on Extended Thinking (deeper reasoning) |
| `/debug` | Turn on debug logging |
| `/btw` | Ask a side question without affecting context |
| `/loop 5m "command"` | Repeat the command on the given interval |
| `/batch` | Run large work in parallel |
| `/schedule` | Create a scheduled task |
| `/goal` | Set a completion condition Claude keeps working toward across turns |
| `/reload-skills` | Re-scan skill directories without restarting |

### Extensions and Settings

| Command | Description |
|---------|-------------|
| `/agents` | ~~View and configure subagents~~ **Removed in v2.1.198** — ask Claude to create/manage subagents, or edit `.claude/agents/` directly |
| `/mcp` | Configure MCP servers |
| `/permissions` | View and manage tool permissions |
| `/plugins` | Browse and manage plugins |
| `/claude-api` | Help build apps with the Claude API |
| `/scroll-speed` | Adjust scroll speed with live preview |
| `/chrome` | Pick the browser for "Claude in Chrome" |
| `/usage-credits` | Show usage credits (renamed from `/extra-usage`; old name still works). `/usage` now shows a per-category breakdown (skills, subagents, plugins, MCP). |

> Note: `/effort` slider labels are now **"Faster" / "Smarter"** (was Speed/Intelligence).

### New in v2.1.191

| Command | Description |
|---------|-------------|
| `/rewind` | Resume a conversation from a point **before `/clear`** was run. |
| `/cd <dir>` | Move the session to a new working directory without breaking the prompt cache. |
| `/config key=value` | Set any setting from the prompt (e.g. `/config thinking=false`); `/config --help` lists shorthand keys. Works in interactive, `-p`, and Remote Control. |
| `/plugin list` | List installed plugins (`--enabled` / `--disabled` filters). |

Note: `!<cmd>` now makes Claude **respond to the command's output automatically**; set `respondToBashCommands: false` in `settings.json` to keep the old context-only behavior.
- **Bash mode (`!`)** now has live file-path autocomplete. *(v2.1.193)*

### New in v2.1.198

| Command | Description |
|---------|-------------|
| `/dataviz` | Chart & dashboard design guidance, with a runnable color-palette validator. |

### New in v2.1.201
- **Stacked skill invocations** — `/skill-a /skill-b do XYZ` now loads *all* leading skills (up to 5), not just the first *(v2.1.199)*.

### New in v2.1.205
- **`/doctor` is now a full setup checkup** that can diagnose *and fix* issues; `/checkup` is an alias.
- `/review <pr>` is a fast single-pass review again — use `/code-review <level> <pr#>` for the multi-agent review at a chosen effort level *(v2.1.202)*.

### New in v2.1.207
- `/cd` now suggests directory paths as you type, matching `/add-dir` *(v2.1.206)*.
- `/doctor` gained a check that proposes trimming checked-in `CLAUDE.md` files by cutting content Claude could derive from the codebase itself *(v2.1.206)*.

### New in v2.1.211
- `/usage-credits` now asks for confirmation before sending a request to organization admins.

### New in v2.1.212
- `/fork` now copies the conversation into a **new background session** (its own row in `claude agents`) while you keep working — the old in-session subagent behavior moved to the new **`/subtask`** command.
- Typing `/resume` in the agent view opens a picker of past sessions (including ones deleted from the list) and resumes your pick as a background session.
- Bare `/btw` reopens the side-question panel on your most recent exchange so you can browse earlier answers.

### New in v2.1.215
- **`/verify` and `/code-review` are manual-only now** — Claude no longer runs these skills on its own; invoke them with `/verify` or `/code-review` when you want them.

### New in v2.1.218
- **`/code-review` runs as a background subagent** — review work no longer fills your conversation, and stacked slash commands stay as its review target.
- **`/deep-research` is manual-only now** — it starts only when you invoke it; Claude no longer launches it on its own.

### New in v2.1.221
- **`/status` shows the session kind** — `interactive`, or a background job that is `attached` or `unattended`.
- **`/fork` creates its own worktree** — a forked session now works in a fresh worktree instead of the original session's checkout.
- **`/plugin install` retries on a stale catalog** — it refreshes the marketplace catalog and tries again before reporting a plugin as not found; plugins installed from `/plugin` also activate immediately when it's safe, instead of always needing `/reload-plugins`.

### New in v2.1.222
- **Diffs read raw git blobs** — the `/diff` view, the Remote Control workspace diff, and file-edit diffs in Claude Code on the web now use raw git blob content, ignoring workspace-configured diff drivers and `textconv`.
- **ultraplan is gone** — the ultraplan feature (`/ultraplan`, and "Refine with Ultraplan" in plan mode) has been removed.

### New in v2.1.223
- **`/review` is now an alias of `/code-review`** — one command reviews the current diff or a PR (`/code-review <level> <pr#>`); use `/code-review ultra` for a deep cloud review.
- **`/code-review` remembers your effort level** — calling it with no level reuses the level you typed last; type a level like `/code-review high` to change it.

### New in v2.1.229
- **`/commit-push-pr` no longer auto-approves dangerous flags** — git/gh commands carrying flags like `--force`, `--amend`, or `--no-verify` now go through the normal permission prompt instead of being approved for you.
- **`/login` repeats the token-override warning** — after a successful login it reminds you again that `CLAUDE_CODE_OAUTH_TOKEN` overrides the credentials you just created.

### New in v2.1.232
- **Fable 5 is an `/advisor` option again** — organizations with Fable access can pick Fable 5 as an advisor; the usage-credits consent is set up through `/model fable`.
- **`/feedback` and `/bug` open immediately** — invoking them while Claude is responding no longer waits for the turn to finish.
- **`/plugin install plugin@marketplace` refreshes the marketplace first** — a newly published plugin installs without you updating the marketplace by hand.
- **`/config` gained two rows** — "Dialog expiry" and "Messages from your other sessions" (accept / hold / refuse for cross-session inbound). See [[06-configuration]].

### New in v2.1.234
- **`/permissions` opens while Claude is working** — rule changes apply to the rest of the current turn. See [[05-permissions]].
- **More dialogs open mid-turn** — `/add-dir <path>` can be used while Claude is working, and the `/add-dir`, `/autocompact`, `/theme`, `/help`, `/config` and `/advisor` dialogs open mid-turn in the fullscreen TUI.
- **`/goal` clears itself on an unrecoverable error** — when a turn dies on something it can't recover from (revoked auth, an exhausted credit balance, a context overflow), the goal clears with a notice instead of staying armed.
- **`/goal` checks in on long-waiting background tasks** — when background tasks keep a goal waiting for 30+ minutes, Claude checks in on them instead of waiting indefinitely; set `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` to opt out. See [[23-environment-variables]].
- **`/config` gained "Continue automatically at usage limit" and lost "Default teammate model"** — see [[06-configuration]].
- **`/tui` no longer drops launch tool restrictions** — it used to lose `--allowed-tools` / `--disallowed-tools` rules when restarting; now it declines to switch, and says why, when the session has restrictions a restart can't carry over.

### New in v2.1.236
- **A slash-command typo is reported, not guessed** — pressing Enter on a misspelled command, or one that isn't available in this session, now tells you instead of running the closest fuzzy match; prefixes and aliases still run as before.
- **`/goal` checks in on its own while parked** — an idle session whose goal is waiting on long-running background work now checks in automatically after 30 minutes, then 1 hour, then 2 hours, instead of waiting for you to come back. See [[23-environment-variables]].
- **`/usage` shows usage-credits spend for Team and Enterprise** — the spend row now appears for Team and Enterprise members, and shows a capped row at 0% before anything has been spent.

### New in v2.1.239
- **`/claude-api upgrade`** — migrates a Python project from the `anthropic` SDK 0.x to 1.x, and the skill's Python reference is updated for 1.x (timeouts use `anthropic.Timeout`, not `httpx.Timeout`).
- **`/goal` check-ins back off** — repeat check-ins on long-running background work now wait 30 minutes, then 1 hour, then every 2 hours, instead of repeating every 30 minutes.
- **`/goal` survives the resume picker** — resuming a session from the `claude --resume` picker now restores its active goal.

### New in v2.1.243
- **`/usage` gains a Loops breakdown** — per-loop run count, total tokens, tokens per run, and last run, so runaway or chatty `/loop` tasks are easy to spot. See [[31-cost-management]].
- **Keyless Console sign-in in `/login`** — the Anthropic Console path now offers "Sign in with your Console account" (recommended) alongside creating an API key, so organizations that don't allow API keys can still sign in.
- **`/status` reports more** — a `Skipped sources` line lists managed settings sources that are present but not applied because a higher-precedence managed source is active, and a new line shows whether GitHub is connected for Claude Code on the web (Pro/Max), pointing to `/web-setup` when it isn't.
- **`/model`, `/fast` and `/effort` apply immediately everywhere** — on Bedrock, Vertex and Foundry, and when telemetry is disabled, they now run right away instead of queueing until the turn ends.

### New in v2.1.246
- **`/cd` applies the new directory's setup immediately** — project settings, hooks, `.mcp.json` servers (behind the usual approval prompt), skills, and agents take effect right after the move instead of waiting for `--resume`.
- **Claude can start `/code-review` on its own everywhere** — including on Bedrock, Vertex AI and Foundry, through the Claude apps gateway, and when telemetry or non-essential traffic is disabled.
- **`/goal` check-ins are capped** — idle sessions start at most three check-ins on long-running background work per goal; your next message allows three more.

---

---

## Navigation

- ⬅️ Previous: [[02-cli-commands]]
- ➡️ Next: [[04-keyboard-shortcuts]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/03-slash-commands]]
