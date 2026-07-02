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

---

---

## Navigation

- ⬅️ Previous: [[18-plugins]]
- ➡️ Next: [[20-scheduled-tasks]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/19-session-management]]
