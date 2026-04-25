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
| `/simplify` | Review changed code to improve quality |
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

### Extensions and Settings

| Command | Description |
|---------|-------------|
| `/agents` | View and configure subagents |
| `/mcp` | Configure MCP servers |
| `/permissions` | View and manage tool permissions |
| `/plugins` | Browse and manage plugins |
| `/claude-api` | Help build apps with the Claude API |

---

---

## Navigation

- ⬅️ Previous: [[02-cli-commands]]
- ➡️ Next: [[04-keyboard-shortcuts]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/03-slash-commands]]
