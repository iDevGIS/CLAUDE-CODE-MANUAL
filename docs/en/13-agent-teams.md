---
title: "Agent Teams"
section: 13
lang: en
tags:
  - claude-code
  - agent-teams
  - agents
aliases:
  - "Agent Teams"
related:
  - "[[12-subagents]]"
  - "[[11-skills]]"
---

# Agent Teams

### Benefits and Use Cases

> **Why use agent teams?**
>
> Agent teams let **multiple AIs work simultaneously** — like a real dev team. Each agent has a clear role, they can message each other, share a single task list, and finish big work much faster.

**Use Cases:**

| AI Team | Scenario | Result |
|---------|----------|--------|
| **Code Review Team** | A large PR with 50+ changed files | Agent 1 checks security, Agent 2 checks performance, Agent 3 checks test coverage → review finishes in parallel, ~3× faster |
| **Migration Team** | Migrating from monolith to microservices | Each agent owns one service → migrate code in parallel |
| **Full-Stack Team** | Build a new feature spanning frontend + backend | Agent 1 writes the API, Agent 2 writes the UI, Agent 3 writes tests → parallel work |
| **Bug Hunting Team** | Find bugs across a large project | Each agent searches a different part of the codebase → broader coverage |
| **Refactoring Team** | Refactor 100+ files | Split modules across agents → done in parallel |
| **Documentation Team** | Document the entire project | Agent 1 writes API docs, Agent 2 writes the user guide, Agent 3 writes architecture docs |

**Real-world example:**

```
Scenario: Need to review a large PR with 80 changed files

Without agent teams:
  Claude reviews file by file → 30 minutes → forgets early issues

With agent teams:
  Agent "Security": checks injection, auth, data leaks
  Agent "Performance": checks N+1, memory, complexity
  Agent "Quality": checks test coverage, code style, DRY
  → All agents run in parallel → done in 10 minutes → consolidated report covers every angle
```

### What are Agent Teams?

Multiple Claude Code sessions running simultaneously, sharing a task list and able to message each other.

### Enabling (Experimental)

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Or in settings.json:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### Creating a Team

```
Create an agent team to review this PR with 3 members:
- Member 1 checks security
- Member 2 checks performance
- Member 3 checks test coverage
```

### Controlling the Team

- **Delegate work:** "Delegate the security review to the Security teammate"
- **Switch teammates:** `Shift+Down` in in-process mode
- **Display mode:** `--teammate-mode in-process` (default) or `tmux` (separate panes)
- **Stop the team:** "Have the Researcher stop"

### Limitations

- Cannot resume sessions with in-process teammates
- Task status may have some lag
- Nested teams aren't supported
- One team per session

---

---

## Navigation

- ⬅️ Previous: [[12-subagents]]
- ➡️ Next: [[14-context-management]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/13-agent-teams]]
