---
title: "Environment Variables"
section: 23
lang: en
tags:
  - claude-code
  - environment-variables
  - reference
aliases:
  - "Environment Variables"
related:
  - "[[06-configuration]]"
  - "[[05-permissions]]"
---

# Environment Variables

### Benefits and Use Cases

> **Why know about environment variables?**
>
> Environment variables let you **control Claude Code via env vars** — useful in CI/CD, Docker, or any environment where editing a config file is awkward.

**Use Cases:**

| Variable | Use Case | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Use in CI/CD | Set the API key in GitHub Secrets and Claude can use it directly in Actions |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Use in shared environments | Disable memory when several people share one machine — prevents data mixing |
| `CLAUDE_CODE_SIMPLE` | Use in scripts | Auto-enable bare mode for clean output and no UI |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | Try out agent teams | Enable the experimental agent teams feature |
| `CLAUDE_CONFIG_DIR` | Use multiple configs | Point at a different config directory — handy for testing |

### Important Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for authentication |
| `CLAUDE_CONFIG_DIR` | Override the config directory |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | Directory for debug logs |
| `CLAUDE_CODE_SIMPLE` | Enable bare mode |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Disable Auto Memory |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Disable background tasks |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | Enable agent teams |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | Use PowerShell instead of Bash |
| `CLAUDE_SESSION_ID` | Specify a session ID |
| `CLAUDE_CODE_TASK_LIST_ID` | Name a task list |

### Configure in settings.json

```json
{
  "env": {
    "NODE_ENV": "development",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

---

## Navigation

- ⬅️ Previous: [[22-directory-structure]]
- ➡️ Next: [[24-troubleshooting]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/23-environment-variables]]
