---
title: "CLI Commands and Flags"
section: 2
lang: en
tags:
  - claude-code
  - cli
  - commands
aliases:
  - "CLI Commands"
related:
  - "[[01-installation]]"
  - "[[03-slash-commands]]"
  - "[[04-keyboard-shortcuts]]"
---

# CLI Commands and Flags

### Benefits and Use Cases

> **Why learn CLI flags?**
>
> CLI flags are the key to **tailoring Claude Code to specific situations** — for example, running automatically in CI/CD, capping the budget, choosing a suitable model, or running multiple tasks in parallel.

**Use Cases:**

| Use Case | Command | Description |
|----------|---------|-------------|
| **Quick question, no interactive session** | `claude -p "explain function X"` | Get an answer immediately and exit. Great for piping into scripts |
| **Resume yesterday's conversation** | `claude -c` | Pick up where you left off; Claude remembers all the context |
| **Work on two features simultaneously** | `claude -w feature-a` + `claude -w feature-b` | Each worktree has its own branch — no conflicts |
| **Cap costs** | `claude --max-budget-usd 5` | Prevent overspending — great for teams with limited budgets |
| **Use a cheaper model for simple tasks** | `claude --model sonnet` | Save money on tasks that aren't complex |
| **Run an automation script** | `claude --bare -p "..." --output-format json` | Clean output with no UI clutter — ideal for CI/CD |
| **Send an error log for analysis** | `cat error.log \| claude -p "analyze"` | Pipe data straight to Claude for analysis |
| **Work across projects** | `claude --add-dir ../other-project` | Access files from multiple projects at once |

### Session Commands

| Command | Description |
|---------|-------------|
| `claude` | Open an interactive session |
| `claude "question"` | Open a session with a starting question |
| `claude -p "question"` | Non-interactive mode (print result and exit) |
| `cat file \| claude -p "question"` | Send data from a pipe into Claude |
| `claude -c` | Continue the latest conversation |
| `claude -r "name"` | Return to a specific session |
| `claude -w branch-name` | Create a Git worktree for parallel work |
| `claude --fork-session` | Fork a new session from the current one |
| `claude --remote` | Create a session on claude.ai |

### Model and Effort Options

| Flag | Description |
|------|-------------|
| `--model <name>` | Select a model, e.g., `sonnet`, `opus`, `claude-sonnet-4-6` |
| `--effort low\|medium\|high\|max` | Effort level (`max` is only available on Opus 4.6) |
| `--fallback-model` | Enable a backup model when the primary is unavailable |

### Permission Options

| Flag | Description |
|------|-------------|
| `--permission-mode <mode>` | Set permission mode: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` |
| `--enable-auto-mode` | Enable Auto Mode in Shift+Tab |
| `--dangerously-skip-permissions` | Skip all permission prompts (caution!) |
| `--allowedTools "Tool1,Tool2"` | Pre-approve specific tools |
| `--disallowedTools "Tool1,Tool2"` | Block the specified tools |

### System Prompt Options

| Flag | Description |
|------|-------------|
| `--system-prompt "text"` | Replace the entire system prompt |
| `--system-prompt-file <path>` | Load the system prompt from a file |
| `--append-system-prompt "text"` | Append text to the system prompt |

### Output Options

| Flag | Description |
|------|-------------|
| `--output-format text\|json\|stream-json` | Output format |
| `--json-schema <schema>` | Force output to be JSON matching the schema |
| `--input-format text\|stream-json` | Input format |
| `--verbose` | Show detailed logs |
| `--debug <categories>` | Enable debug mode |

### Advanced Options

| Flag | Description |
|------|-------------|
| `--bare` | Bare mode: skip Hooks, Skills, Plugins, MCP, and Memory |
| `--max-turns <n>` | Limit the number of turns |
| `--max-budget-usd <amount>` | Cap the budget (USD) |
| `--config <file>` | Load an MCP config file |
| `--add-dir <path>` | Add an accessible directory |
| `--agent <name>` | Specify the subagent to use |
| `--init` | Run initialization hooks and start |
| `--version` | Show the version |

### Other Commands

```bash
claude auth login          # Log in
claude auth logout         # Log out
claude auth status         # Check status
claude setup-token         # Generate a token for CI
claude mcp                 # Manage MCP servers
claude plugin              # Manage plugins
claude update              # Update to the latest version
claude agents              # List subagents
claude remote-control      # Start the remote control server
```

---

---

## Navigation

- ⬅️ Previous: [[01-installation]]
- ➡️ Next: [[03-slash-commands]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/02-cli-commands]]
