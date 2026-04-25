---
title: "Permission System"
section: 5
lang: en
tags:
  - claude-code
  - permissions
  - security
aliases:
  - "Permission System"
related:
  - "[[06-configuration]]"
  - "[[23-environment-variables]]"
---

# Permission System

### Benefits and Use Cases

> **Why have permissions?**
>
> Claude Code can run shell commands, edit files, and delete data. The permission system prevents Claude from doing things you **didn't intend**. You can choose your level of autonomy — from "ask about everything" to "do anything".

**Use Cases by Role:**

| Role/Scenario | Recommended Mode | Reason |
|---------------|------------------|--------|
| **Beginner developer** | `default` | Asks before everything — you learn what Claude does |
| **General-purpose coding** | `acceptEdits` | Can read/edit files freely; only asks for risky shell commands. Smooth without approving every step |
| **Exploring a project before editing** | `plan` | Claude can only read and propose plans, no actual edits — perfect for understanding a codebase first |
| **Long-running tasks, hands-off** | `auto` | Claude decides on its own with automatic safety checks. Good for big tasks you'll review later |
| **CI/CD pipeline** | `dontAsk` | Locked to approved tools, no prompts mid-run — runs without anyone needing to approve |
| **Secure container/VM** | `bypassPermissions` | Anything goes — only use in environments isolated from production |
| **Working with customer data** | `default` + `deny` rules | Block dangerous commands like `rm -rf` or `curl` — prevents data leaks |

**Real-world examples:**

```
Scenario: You're fixing a bug in production code
Recommendation: Start with "plan" to analyze, then switch to "acceptEdits" when ready to fix
How: Press Shift+Tab to switch modes instantly

Scenario: Have Claude refactor 50 files
Recommendation: Use "auto" mode because there are many files; with default you'd hit Approve hundreds of times
How: claude --permission-mode auto

Scenario: Run Claude in GitHub Actions
Recommendation: Use "dontAsk" + allowedTools to limit it to safe commands
How: claude --permission-mode dontAsk --allowedTools "Read,Bash(npm test)"
```

### Permission Modes

| Mode | What runs without asking | Best for |
|------|--------------------------|----------|
| `default` | File reading only | Getting started, sensitive work |
| `acceptEdits` | Read + edit files + common FS commands | General coding |
| `plan` | Read only (planning mode) | Exploring before changing anything |
| `auto` | Everything + automatic safety checks | Long-running tasks (experimental) |
| `dontAsk` | Only pre-approved tools | CI/CD with locked permissions |
| `bypassPermissions` | Everything except protected paths | Use only in containers/VMs |

### Switching Modes

- Press `Shift+Tab` in interactive mode
- Use the `--permission-mode <mode>` flag
- Configure in `settings.json`

### Permission Rules

**Match all uses of a tool:**
```
Bash             # All Bash commands
Read             # Read every file
Edit             # Edit every file
```

**Add additional conditions:**
```
Bash(npm run build)              # Specific command
Bash(npm run *)                  # Wildcard
Read(./.env)                     # Specific file
Read(src/**)                     # Every file in a directory
WebFetch(domain:github.com)      # Specific domain only
Agent(Explore)                   # Specific subagent
Skill(commit)                    # Specific skill
```

### Rule Priority

1. **Deny** (highest) — always block
2. **Ask** — prompt before doing
3. **Allow** (lowest) — always allow

### Configure in settings.json

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": ["Bash(npm run *)", "Bash(git *)"],
    "deny": ["Bash(rm -rf *)"],
    "ask": ["Bash"]
  }
}
```

### Protected Paths (always protected files/folders)

- `.git/`
- `.claude/` (except commands, agents, skills, worktrees)
- `.vscode/`, `.idea/`, `.husky/`
- `.gitconfig`, `.bashrc`, shell config files

---

---

## Navigation

- ⬅️ Previous: [[04-keyboard-shortcuts]]
- ➡️ Next: [[06-configuration]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/05-permissions]]
