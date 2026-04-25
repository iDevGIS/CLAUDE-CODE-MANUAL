---
title: "Context Management"
section: 14
lang: en
tags:
  - claude-code
  - context
  - memory
aliases:
  - "Context Management"
related:
  - "[[08-memory]]"
  - "[[07-claude-md]]"
---

# Context Management

### Benefits and Use Cases

> **Why manage context?**
>
> The context window is Claude's "short-term memory" — when it fills, Claude forgets earlier parts of the conversation. Good context management lets Claude **work continuously for a long time** without losing important information.

**Use Cases:**

| Scenario | How to Manage | Result |
|----------|---------------|--------|
| **Long conversation, context filling up** | `/compact focus on auth` | Claude summarizes, keeping only what matters, freeing space to keep working |
| **Switching topics mid-session** | `/clear` | Start a fresh session — no leftover context interfering |
| **CLAUDE.md is long, fills context fast** | Move into `.claude/rules/` | Load only the rules that apply, not all of them every time |
| **Lots of code search, worried about context** | Use a subagent (Explore) | The subagent searches in its own context, saving the main one |
| **Want to ask something tiny without spending context** | `/btw question` | Ask without invoking tools — minimal context impact |
| **Want to see context usage** | `/context` | See the context split across components |

**Real-world example:**

```
Scenario: You've worked for 2 hours, fixed 5 bugs, and context is filling up

Not managing context:
  Claude starts forgetting the early bugs → you re-explain → wastes time

Managing context:
  1. After fixing 2-3 bugs, run /compact to keep only the key takeaways
  2. Context frees up → keep working on the next bug seamlessly
  3. If switching topic → /clear and start fresh
  → Work all day with no context issues
```

### What is the Context Window?

Claude's "memory" pool in a session, made up of:
- Conversation history
- The CLAUDE.md file
- Auto Memory
- Loaded tools
- Loaded skills

### View Context Usage

```
/context
```

### Auto-Compaction

When the context is nearly full, Claude summarizes the conversation automatically, keeping:
- The initial instructions (CLAUDE.md)
- Important code
- Recent work
- Task context

### Manual Summarization

```
/compact focus on the authentication fix
```

Claude summarizes the conversation, emphasizing the topic you specify.

### Context-Saving Techniques

| Technique | Detail |
|-----------|--------|
| Keep CLAUDE.md short | Stay under ~200 lines |
| Use `.claude/rules/` | Move long instructions out of CLAUDE.md |
| `disable-model-invocation` | Stop Claude auto-invoking rarely used skills |
| Use subagents | Delegate exploration to a subagent (separate context) |
| `/compact` | Summarize when context is getting heavy |

---

---

## Navigation

- ⬅️ Previous: [[13-agent-teams]]
- ➡️ Next: [[15-git-integration]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/14-context-management]]
