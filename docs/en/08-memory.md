---
title: "Memory System"
section: 8
lang: en
tags:
  - claude-code
  - memory
  - context
aliases:
  - "Memory System"
related:
  - "[[07-claude-md]]"
  - "[[14-context-management]]"
---

# Memory System

### Benefits and Use Cases

> **Why have memory?**
>
> Memory lets Claude **remember things across sessions** — what you told it yesterday, it still remembers today. No need to repeat who you are, what you do, or what you prefer.

**Use Cases:**

| Scenario | Memory Type | Example |
|----------|-------------|---------|
| **You're a Data Scientist who isn't strong in frontend** | `user` | Claude explains frontend code in plain language relative to concepts you know |
| **You said "don't use any in TypeScript"** | `feedback` | Claude never uses `any` again, even in new sessions — no need to repeat |
| **Project is in code freeze on Friday** | `project` | Claude warns you if you try to merge after the cutoff |
| **Bug tracker is in Linear under project "INGEST"** | `reference` | When you ask about bugs, Claude points to Linear |
| **You like short answers without summary at the end** | `feedback` | Claude tunes its response style to your taste |
| **Team agreed to use Zod instead of Joi** | `project` | Claude always uses Zod for validation |
| **API docs live on Confluence page X** | `reference` | Claude points you to the correct documentation |

**Real-world example:**

```
Session 1 (Monday):
  You: "I'm a backend developer using Go primarily, just starting React"
  Claude: (saves Memory: user is a Backend Dev, expert in Go, new to React)

Session 2 (Wednesday):
  You: "Explain useEffect"
  Claude: "useEffect is similar to defer in Go in that it runs after the
          main function finishes, but it differs in that it re-runs when
          dependencies change. Think of it as a goroutine that re-fires
          when the channel receives new data."
  → Claude explains in Go terms because it remembers you know Go
```

### What is Auto Memory?

A system that lets Claude remember important information between sessions, stored in:

```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # Index file
├── user_role.md       # User information
├── feedback_style.md  # Feedback from the user
└── project_goals.md   # Project goals
```

### Memory Types

| Type | Description | Example |
|------|-------------|---------|
| `user` | Information about the user | Role, expertise, preferences |
| `feedback` | Feedback from the user | "Don't summarize at the end", "Reply in Thai" |
| `project` | Information about the current project | Deadlines, bugs in progress |
| `reference` | External information sources | Linear links, Slack channels |

### Memory File Format

```markdown
---
name: user_prefers_thai
description: User prefers replies in Thai
type: feedback
---

Always reply in Thai.

**Why:** The user said it makes their work easier
**How to apply:** Use Thai in every reply except for code and technical commands
```

### Memory Management Commands

| Command | Description |
|---------|-------------|
| `/memory` | View and edit CLAUDE.md and Memory |
| "Remember that..." | Tell Claude to remember a piece of information |
| "Forget..." | Tell Claude to remove a memory |

### Enable/Disable Auto Memory

```json
// In settings.json
{
  "autoMemoryEnabled": true
}
```

Or use `/memory` to toggle it.

---

---

## Navigation

- ⬅️ Previous: [[07-claude-md]]
- ➡️ Next: [[09-mcp-servers]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/08-memory]]
