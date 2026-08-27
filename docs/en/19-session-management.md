---
title: "Session Management"
section: 19
lang: en
tags:
  - claude-code
  - sessions
  - workflow
aliases:
  - "Session Management"
related:
  - "[[14-context-management]]"
  - "[[20-scheduled-tasks]]"
---

# Session Management

### Benefits and Use Cases

> **Why manage sessions?**
>
> Session management lets you **pick up right where you left off** — like reopening a browser tab. Claude remembers everything you discussed, no re-explaining, and you can roll back if something goes wrong.

**Use Cases:**

| Use Case | How to Use | Description |
|----------|-----------|-------------|
| **Shut down the computer and resume later** | `claude -c` | Claude remembers everything; resume work immediately, no re-explaining |
| **Many tasks, want to switch between them** | `/resume` → pick a session | Jump to any session; each task has its own context |
| **Name sessions for easy lookup** | `/rename auth-refactor` | Find sessions easily when you have many |
| **Claude edited code wrong, want to roll back** | `Esc + Esc` → Restore | Roll back code and conversation, or pick just one to restore |
| **Want to try something new without losing the existing session** | `claude --fork-session` | Branch off the current session; if it goes badly, return to the original |
| **Share a session with a teammate** | `claude --remote` | Create a cloud session viewable in a browser |

### Rewind

Press `Esc + Esc` or use `/rewind`:

| Option | Description |
|--------|-------------|
| Restore code and conversation | Roll back both the code and the conversation |
| Restore conversation | Roll back the conversation, keep current code |
| Restore code | Roll back the code, keep current conversation |
| Summarize from here | Summarize the conversation from this point |

### Resume Session

```bash
claude --continue                    # Latest session
claude --resume auth-refactor        # By name
claude --resume <session-id>         # By ID
claude --fork-session                # Branch into a new session
```

### List Sessions

```
/resume
```

Shows an interactive picker to choose a session.

### Session File Locations

```
~/.claude/projects/<project>/sessions/<session-id>.jsonl
```

### Background Sessions & Agent View

**Background sessions** let work continue detached from the foreground: start with `claude --bg` or push the current task to the background with `/bg` (or `Ctrl+B`). Pinned background sessions stay alive, restart in place, and shed gracefully under memory pressure; resume them with `/resume` (look for the `bg` marker). **Agent view** (`claude agents`) is a session manager for many concurrent sessions — `claude agents --json` for scripting.

### New in v2.1.191

- `claude agents --json` now supports `--all` (include completed sessions) and adds `id`, `state`, and `waitingFor` fields (what a blocked session is waiting on, e.g. a permission prompt).
- `--agent <name>` selects the agent a dispatched session runs as.

### New in v2.1.198

- **Background agents finish the job** — code work done in a worktree now ends with an automatic commit, push, and **draft PR** instead of stopping to ask.
- Background sessions that need input or finish now fire the `Notification` hook (`agent_needs_input` / `agent_completed`).

### New in v2.1.214

- **EndConversation tool** — Claude can end a session outright with highly abusive users or jailbreak attempts, as on claude.ai since 2025.

### New in v2.1.221

- **`/fork` gets its own worktree** — a forked session no longer works in the original session's checkout.
- **`/status` shows the session kind** — `interactive`, or a background job that is `attached` or `unattended`.
- **Background sessions wrap up differently** — they commit and push to preserve work, open a **draft PR only when the task calls for one**, follow your `CLAUDE.md` git instructions, and always end by reporting where the work lives (refines the v2.1.198 behavior above).
- **`CLAUDE_CODE_RESUME_INTERRUPTED_TURN=0` is honored** — falsy values now actually disable interrupted-turn auto-resume.
- **Session renames sync both ways** — renaming a session from Claude Code Desktop or claude.ai updates the CLI's session name too.

### New in v2.1.232

- **Type `@` to mention another session** — mention another Claude session by name in the prompt and Claude reaches it directly with `SendMessage`.
- **`SendMessage` accepts a bare name** — a bare name that exactly matches one live session is delivered straight away, instead of asking you to confirm with a ref first.
- **Session names stay unique on one machine** — starting or renaming an interactive session to a name another live session already uses gives it a `name-word-word` variant and tells you.
- **Cross-session inbound is configurable from `/config`** — the new "Messages from your other sessions" row accepts, holds, or refuses them. See [[06-configuration]].

### New in v2.1.236

- **`notify_when_idle` on cross-session `SendMessage`** — ask another Claude Code session on this machine to send one notice when it next goes idle. Opt-in, one-shot, no polling (macOS and Linux).
- **`SendMessage` refuses an oversized burst up front** — once a rapid burst would exceed what the target session's inbox accepts, further messages are refused immediately instead of being reported as sent while they were dropped.
- **Remote Control marks a session offline within seconds** when the CLI exits or its terminal closes.

### New in v2.1.238

- **A refused cross-session message says so** — sending to a session on this machine that refuses inbound messages (e.g. `crossSessionInbound: "refuse"`) now reports "refused" to the sender instead of a silent success. See [[06-configuration]].
- **A dropped cross-session message says so too** — a session whose inbox drops your messages (rate limit or full queue) now tells your session, instead of the messages vanishing silently.

### New in v2.1.239

- **Cross-session messaging arrives on Windows** — Claude Code sessions across your machines can now message each other with `SendMessage` and find each other with `ListAgents`, as on macOS and Linux.
- **`ListAgents` tells a session its own name** — the one peers use to message it, and `SendMessage` to your own name says so instead of "no agent named …".
- **`ListAgents` and `/list-agents` list live teammates** — previously only subagents and other sessions appeared, so a reachable teammate looked absent.

> 🔎 Full deep-dive: [[41-background-agents]]

### New in v2.1.247

- **Sonnet 5 auto-compacts at its full 1M context** — its default auto-compact window now covers the whole 1M window, so sessions on the 1M window auto-compact at about 967K tokens instead of about 934K.
- **Cross-session peer messages collapse by default** — an incoming message shows as a one-line `Message from @<sender>: <first line>` preview; press Ctrl+O to expand the full body.

### New in v2.1.248

- **Cross-session messaging works everywhere** — `SendMessage` / `ListAgents` between sessions on the same machine now also work on Bedrock, Vertex, and Foundry, and when telemetry is disabled.

---

---

## Navigation

- ⬅️ Previous: [[18-plugins]]
- ➡️ Next: [[20-scheduled-tasks]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/19-session-management]]
