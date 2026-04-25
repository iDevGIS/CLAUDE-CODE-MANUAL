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

---

---

## Navigation

- ⬅️ Previous: [[18-plugins]]
- ➡️ Next: [[20-scheduled-tasks]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/19-session-management]]
