# Comprehensive Claude Code User Guide (English)

> **Claude Code** is the official CLI (Command Line Interface) tool from Anthropic
> designed to help developers write code, fix bugs, refactor, and manage projects using AI.

---

## Table of Contents

1. [Installation and Getting Started](#1-installation-and-getting-started)
2. [CLI Commands and Flags](#2-cli-commands-and-flags)
3. [Slash Commands](#3-slash-commands)
4. [Keyboard Shortcuts](#4-keyboard-shortcuts)
5. [Permission System](#5-permission-system)
6. [Configuration](#6-configuration)
7. [CLAUDE.md - Persistent Project Instructions](#7-claudemd---persistent-project-instructions)
8. [Memory System](#8-memory-system)
9. [MCP Servers (Model Context Protocol)](#9-mcp-servers-model-context-protocol)
10. [Hooks (Event Handler System)](#10-hooks-event-handler-system)
11. [Skills (Custom Commands)](#11-skills-custom-commands)
12. [Subagents (Specialized Helpers)](#12-subagents-specialized-helpers)
13. [Agent Teams](#13-agent-teams)
14. [Context Management](#14-context-management)
15. [Git Integration](#15-git-integration)
16. [Headless Mode (Automation Mode)](#16-headless-mode-automation-mode)
17. [IDE Integration](#17-ide-integration)
18. [Plugins](#18-plugins)
19. [Session Management](#19-session-management)
20. [Scheduled Tasks](#20-scheduled-tasks)
21. [Other Special Features](#21-other-special-features)
22. [Directory Structure](#22-directory-structure)
23. [Environment Variables](#23-environment-variables)
24. [Basic Troubleshooting](#24-basic-troubleshooting)
25. [Tips and Best Practices](#25-tips-and-best-practices)
26. [Real-World Workflow Simulations](#26-real-world-workflow-simulations)

---

## 1. Installation and Getting Started

### Benefits and Use Cases

> **Why use Claude Code?**
>
> Claude Code completely transforms the way software developers work. Instead of writing every line of code yourself, searching Stack Overflow, asking ChatGPT, then copy-pasting back, Claude Code works **directly inside your project**. It can read files, edit code, run commands, and manage Git just like a teammate sitting next to you.

**Main Use Cases:**

| Scenario | Example Usage |
|----------|---------------|
| **New developers** | Joining a new project: have Claude explain the code structure, teach build steps, explain complex functions |
| **Urgent bug fixes** | Paste an error message and let Claude find the cause and fix the code |
| **Writing new features** | Describe what you need and Claude will create files, write code, and write tests in full |
| **Refactoring legacy code** | Have Claude analyze redundant code and clean it up |
| **Writing tests** | Have Claude read your code and write unit tests / integration tests |
| **Code review** | Have Claude review PRs to find bugs, security issues, and performance problems |
| **Generating documentation** | Have Claude read the code and write docs automatically |
| **Code conversion** | Migrate JavaScript to TypeScript, REST to GraphQL, classes to functional components |
| **DevOps** | Write Dockerfiles, CI/CD pipelines, and Infrastructure as Code |
| **Learning new technologies** | Ask Claude about frameworks/libraries you haven't used, with real examples from your project |

### Installation

**macOS / Linux / WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Homebrew (macOS):**
```bash
brew install --cask claude-code
```

**WinGet (Windows):**
```powershell
winget install Anthropic.ClaudeCode
```

### Getting Started

```bash
# Enter your project directory
cd your-project

# Start Claude Code
claude

# Log in (first time)
claude auth login

# Log in with an API key from the Anthropic Console
claude auth login --console

# Check authentication status
claude auth status
```

### Supported Platforms

| Platform | Details |
|----------|---------|
| Terminal CLI | Most fully featured |
| VS Code Extension | Use directly within VS Code |
| JetBrains IDEs | IntelliJ, PyCharm, WebStorm, etc. |
| Desktop App | macOS, Windows |
| Web | claude.ai/code |
| iOS App | Use on mobile |
| Slack Integration | Use through Slack |
| GitHub Actions / GitLab CI | Use in CI/CD pipelines |

---

## 2. CLI Commands and Flags

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

## 3. Slash Commands

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

## 4. Keyboard Shortcuts

### Benefits and Use Cases

> **Why use keyboard shortcuts?**
>
> Shortcuts let you **control Claude Code quickly without taking your hands off the keyboard** — reducing the time spent switching modes, canceling work, or opening features.

**Use Cases:**

| Scenario | Shortcut | Description |
|----------|----------|-------------|
| **Claude is going down the wrong path** | `Ctrl+C` | Stop immediately — no need to wait. Saves time and money |
| **Want to see which tools Claude used** | `Ctrl+O` | Open the Transcript Viewer to see every tool call and every file read/edited |
| **Claude is running tests for a while; want to do something else** | `Ctrl+B` | Move the task to the background and start typing a new command |
| **Switch from safe mode to auto** | `Shift+Tab` | Switch permission mode immediately — no need to open settings |
| **Claude edited code wrong, want to undo** | `Esc + Esc` | Open the Rewind menu to roll back code and conversation |
| **Want to switch models mid-session** | `Cmd+P` / `Meta+P` | Open the model picker — switch from Opus to Sonnet or vice versa |
| **Hard problem, need deep thinking** | `Cmd+T` / `Meta+T` | Turn on Extended Thinking for deeper analysis |
| **Want a quick answer, not exhaustive** | `Meta+O` / `Alt+O` | Turn on Fast Mode for faster replies |
| **Want to paste a screenshot for Claude to see** | `Ctrl+V` / `Cmd+V` | Paste an image from the clipboard so Claude can analyze UI, error screens, etc. |
| **Want to type a multiline prompt** | `\ + Enter` or `Shift+Enter` | Add a newline instead of submitting — handy for long instructions |

### General Controls

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel the current input/generation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+L` | Clear the input field |
| `Ctrl+O` | Toggle the Transcript Viewer (see tool details) |
| `Ctrl+R` | Search command history |
| `Ctrl+V` / `Cmd+V` | Paste an image from the clipboard |
| `Ctrl+B` | Move the current task to the background |
| `Ctrl+T` | Toggle the task list |
| `Ctrl+X Ctrl+K` | Stop all background agents |
| `Shift+Tab` / `Alt+M` | Toggle permission mode |
| `Esc + Esc` | Open the Rewind/Checkpoint menu |

### Text Editing

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Delete from the cursor to the end of the line |
| `Ctrl+U` | Delete from the cursor to the start of the line |
| `Ctrl+Y` | Paste the most recently deleted text |
| `Alt+B` | Move the cursor back one word |
| `Alt+F` | Move the cursor forward one word |

### Switching Models and Modes

| Shortcut | Action |
|----------|--------|
| `Cmd+P` / `Meta+P` | Open the model picker |
| `Cmd+T` / `Meta+T` | Toggle Extended Thinking |
| `Meta+O` / `Alt+O` | Toggle Fast Mode |

### Multiline Input

| Method | Shortcut |
|--------|----------|
| Quick escape | `\ + Enter` |
| macOS | `Option+Enter` |
| iTerm2/WezTerm/Ghostty/Kitty | `Shift+Enter` |
| Readline | `Ctrl+J` |

### Special Input

| Key/Symbol | Action |
|------------|--------|
| `Space` (hold) | Push-to-talk: speak instead of typing |
| `@` | Auto-search files |
| `/` (start of line) | Show commands/skills |
| `!` (start of line) | Enter Bash mode |
| `Up/Down` | Browse command history |

### Vim Mode (enable via `/config`)

**Mode switching:** `Esc` (to NORMAL), `i/I/a/A/o/O` (to INSERT)

**Movement:** `h/j/k/l` (arrows), `w/e/b` (words), `0/$` (start/end of line), `gg/G` (start/end of document)

**Editing:** `x` (delete character), `dd/D` (delete line), `yy` (copy), `p/P` (paste), `>>/<<` (indent)

---

## 5. Permission System

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

## 6. Configuration

### Benefits and Use Cases

> **Why configure?**
>
> Configuration helps Claude Code **work the way you and your team work** without repeating yourself every session. Set it once, use it forever.

**Use Cases:**

| Scenario | Setting | Result |
|----------|---------|--------|
| **A team of 10 wants the same standard** | `.claude/settings.json` (committed with Git) | Everyone on the team uses the same permissions, hooks, and MCP — no per-user setup |
| **A solo dev who likes Vim mode** | `~/.claude/settings.json` | Personal settings that don't affect anyone else, applied to every project |
| **This project requires Node 20 specifically** | `.claude/settings.local.json` | Project-only settings, gitignored, never mixed with others |
| **An organization needs a locked policy** | Managed settings | IT sets it for everyone — no overrides allowed |
| **Want Claude to auto-run lint** | `hooks.PostEdit` | Every time Claude edits a file, lint runs automatically |
| **Want to connect to Slack/Notion** | `mcpServers` | Claude can reach Slack and Notion directly |
| **Want to use Opus on a critical project** | `model: "claude-opus-4-6"` | Lock the model per project |

### Settings Hierarchy (highest to lowest)

1. **Managed** — system level (deployed by IT), affects all users
2. **User** (`~/.claude/`) — personal, applies to all projects
3. **Project** (`.claude/`) — shared via Git with the team
4. **Local** (`.claude/settings.local.json`) — personal, project-specific (gitignored)

### Settings Files

| File | Scope |
|------|-------|
| `~/.claude/settings.json` | General personal settings |
| `.claude/settings.json` | Project settings (committed with the team) |
| `.claude/settings.local.json` | Personal project settings (gitignored) |

### Example settings.json

```json
{
  "theme": "dark",
  "model": "claude-opus-4-6",
  "effort": "high",
  "autoMemoryEnabled": true,

  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  },

  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"]
    }
  },

  "env": {
    "NODE_ENV": "development"
  },

  "additionalDirectories": [
    "../shared-lib"
  ]
}
```

### Important Settings

| Key | Description |
|-----|-------------|
| `theme` | UI theme (light/dark) |
| `model` | Model to use |
| `effort` | Effort level |
| `autoMemoryEnabled` | Enable/disable Auto Memory |
| `permissions.defaultMode` | Default permission mode |
| `permissions.allow/ask/deny` | Tool permission rules |
| `mcpServers` | MCP server configuration |
| `hooks` | Hook configuration |
| `env` | Environment variables |
| `additionalDirectories` | Extra directories to access |
| `enabledPlugins` | Enabled plugins |
| `codeIntelligence` | Toggle Code Intelligence |
| `claudeMdExcludes` | Skip specific CLAUDE.md files |

---

## 7. CLAUDE.md - Persistent Project Instructions

### Benefits and Use Cases

> **Why have CLAUDE.md?**
>
> CLAUDE.md is **the "brain" Claude uses for your project** — every session, Claude reads it first, so it **knows your project from the first second**. No re-explaining each time.

**Use Cases:**

| Scenario | What to put in CLAUDE.md | Result |
|----------|--------------------------|--------|
| **Team uses a specific naming convention** | `Components: PascalCase, Utils: camelCase` | Claude names variables/files according to your team's convention automatically — no need to repeat |
| **The project has complex build commands** | `Build: npm run build:prod`, `Test: npm run test:ci` | Claude runs the right commands every time, no confusion between dev/prod |
| **Domain-specific architecture** | `Use Repository Pattern, API lives in src/api/` | Claude writes code following the prescribed architecture instead of going freestyle |
| **Security rules** | `Never use eval(); always sanitize input` | Claude automatically avoids vulnerable code |
| **Dev environment setup** | `Run docker-compose up before testing` | Claude knows the prep steps before running tests |
| **New team members onboarding** | A complete CLAUDE.md | New members can ask Claude to explain the project right away — onboarding time drops dramatically |
| **Project with multiple modules** | Split into `.claude/rules/` files | API rules don't bleed into Frontend; reduces context usage |

**Real-world example:**

```
Without CLAUDE.md:
  You: "Fix the bug in the login function"
  Claude: "What framework do you use? How is it built? How is it tested?"
  → Have to explain every time — wastes time

With CLAUDE.md:
  You: "Fix the bug in the login function"
  Claude: (reads CLAUDE.md → knows the framework, build cmd, test cmd)
  → Goes straight to fixing
```

### What is CLAUDE.md?

A Markdown file that gives Claude instructions and context every session — like a "project handbook" Claude reads each time it starts work.

### Loading Locations (highest to lowest)

| Location | Scope |
|----------|-------|
| `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Managed (IT deployment) |
| `./CLAUDE.md` or `./.claude/CLAUDE.md` | Project (committed with the team) |
| `~/.claude/CLAUDE.md` | Personal across all projects |
| `./CLAUDE.local.md` | Personal project-only (gitignored) |

### Example CLAUDE.md

```markdown
# Project Setup

## Build Commands
- Build: `npm run build`
- Test: `npm test`
- Dev server: `npm run dev`
- Lint: `npm run lint`

## Naming Conventions
- React Components: PascalCase in `src/components/`
- Utilities: camelCase in `src/utils/`
- Types: PascalCase in `src/types/`
- CSS files: kebab-case

## Code Style
- Use 2-space indentation
- Always use TypeScript types
- Add JSDoc to public functions

## Architecture
- Use the Repository pattern for the database layer
- API routes live in `src/api/`
- Middleware lives in `src/middleware/`

## Testing
- Always write a test before fixing a bug
- Minimum coverage: 80%
- Use vitest for unit tests
```

### Importing Additional Files

```markdown
# See @README for an overview
# Workflow: @docs/workflow.md
# API Patterns: @src/api/patterns.md
```

### .claude/rules/ — Topic-Scoped Rules

Create instruction files split by subtopic:

```
.claude/rules/
├── testing.md        # Testing rules
├── api-design.md     # API rules
├── security.md       # Security rules
└── frontend/
    └── components.md # Frontend component rules
```

**Path-scoped rules (apply only to certain files):**

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules

- Always include input validation
- Use a standard error response format
- Every endpoint must have rate limiting
```

### Generate CLAUDE.md Automatically

```bash
# Use /init to have Claude analyze the project and generate it
/init
```

---

## 8. Memory System

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

## 9. MCP Servers (Model Context Protocol)

### Benefits and Use Cases

> **Why use MCP?**
>
> MCP lets Claude Code **connect to external tools** — beyond reading and writing files in your project, it can access databases, send Slack messages, read documents from Google Drive, and control browsers.

**Use Cases:**

| MCP Server | Use Case | Real-World Example |
|------------|----------|--------------------|
| **Puppeteer** | Automated UI testing | "Open the login page, fill in email/password, click submit, then take a screenshot" — Claude does it all in a real browser |
| **Slack** | Team notifications | "Send a message to #dev-channel saying the deploy is done" — Claude sends the Slack message right away |
| **GitHub** | Manage PRs/Issues | "List the open issues in project X and summarize them" — Claude reads issues straight from GitHub |
| **Google Drive** | Read spec documents | "Read the Google Doc with the API spec and create endpoints to match" — Claude reads the doc and writes the code |
| **Linear/Jira** | Manage tasks | "Create a ticket in Linear for the bug we just found" — Claude creates the ticket with details |
| **Notion** | Read/write documents | "Update the meeting notes in Notion with the code review summary" — Claude writes to Notion |
| **Database MCP** | Query real data | "How many users registered today?" — Claude queries the database and answers |
| **Custom MCP** | Connect to internal tools | Build your own MCP server that connects to internal systems |

**Real-world example:**

```
Scenario: The team reports that the Submit button doesn't work on the login page

Without MCP:
  1. Open the browser yourself
  2. Go to the login page
  3. Test it yourself
  4. Take a screenshot
  5. Come back and tell Claude

With Puppeteer MCP:
  You: "Open the login page and test the submit button"
  Claude: (opens browser → fills form → clicks button → screenshots → analyzes error)
  Claude: "Found it — the submit button has an event handler that throws because..."
  → Claude does it all without leaving the terminal
```

### What is MCP?

A protocol that connects Claude Code to external tools and data sources such as databases, APIs, and cloud services.

### Available MCP Servers

- **Google Drive** — access documents
- **Slack** — read/write messages
- **GitHub** — access repos, PRs, issues
- **Linear** — project management
- **Jira** — issue tracking
- **Notion** — notes and databases
- **Puppeteer** — browser control
- And many more

### Configuring an MCP Server

**In settings.json:**
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
```

**In .mcp.json (project level):**
```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"]
    }
  }
}
```

**Via the CLI:**
```bash
claude mcp add <server-name>
```

**Via a CLI flag:**
```bash
claude --mcp-config ./mcp.json
```

### Using MCP in a Session

- MCP tools appear as available commands
- Use the `mcp__<server>__<tool>` format to call them
- Use `/mcp` to see server status
- MCP permissions are configured under `permissions.allow/deny`

### Example: Configuring Puppeteer MCP

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"],
      "env": {
        "HEADLESS": "true"
      }
    }
  }
}
```

Usage: Claude can open web pages, take screenshots, click buttons, etc.

---

## 10. Hooks (Event Handler System)

### Benefits and Use Cases

> **Why use hooks?**
>
> Hooks let you **build automated workflows** that run whenever Claude does certain things — no need to repeat "remember to run lint after editing" because the hook does it for you.

**Use Cases:**

| Hook | Use Case | Real-World Example |
|------|----------|--------------------|
| **PostEdit + Prettier** | Auto-format after editing | Every time Claude edits a `.ts` file, Prettier formats it automatically — code is always clean |
| **PostEdit + ESLint** | Auto-lint after editing | Every time Claude edits a file, ESLint checks it; if there are errors, Claude sees them immediately and fixes |
| **PostWrite + Test runner** | Auto-test after creating files | Every time Claude creates a new file, tests run automatically; if they fail, Claude fixes them |
| **PreCommit + Lint** | Check before committing | Prevents commits with lint errors from going into Git |
| **PostCommit + Slack** | Notify after commit | Sends a notification to Slack each time Claude commits |
| **Init + Setup** | Set up when starting a session | Run `docker-compose up`, check dependencies, configure environment |
| **PreToolUse + Custom logic** | Custom permission checks | Block Claude from accessing certain file types or running specific commands |
| **TaskCompleted + Verify** | Verify the result | When Claude finishes a task, run the test suite to confirm nothing broke |

**Real-world example:**

```
Without hooks:
  Claude edits file → code isn't formatted → you say "run Prettier too"
  Claude edits another file → forgets to format again → you repeat
  → Wastes time repeating yourself

With a PostEdit hook:
  Claude edits file → Prettier runs automatically → properly formatted
  Claude edits another file → Prettier runs automatically → properly formatted
  → No repetition; every file is formatted automatically
```

### What are Hooks?

Event handlers that run shell commands automatically when events happen in Claude Code.

### Available Hooks

| Hook | When | Used For |
|------|------|----------|
| `Init` | Session starts | Initial setup |
| `Maintenance` | Maintenance mode | Clean up temp files |
| `PreToolUse` | Before using a tool | Custom permission checks |
| `PostToolUse` | After using a tool | Auto-format, validate |
| `PostWrite` | After writing a file | Lint, format |
| `PostEdit` | After editing a file | Auto-test |
| `PreCommit` | Before a Git commit | Pre-commit checks |
| `PostCommit` | After a Git commit | Notifications |
| `PermissionRequest` | When permission is requested | Auto-approve |
| `PermissionDenied` | When permission is denied | Logging |
| `TaskCreated` | A task is created | Inspect the task |
| `TaskCompleted` | A task is completed | Verify the result |
| `TeammateIdle` | A teammate is idle | Quality gates |

### Configuring Hooks

**In `.claude/settings.json`:**

```json
{
  "hooks": {
    "PostWrite": [
      {
        "matcher": "Edit(src/**/*.ts)",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $FILE"
          }
        ]
      }
    ],
    "PostEdit": [
      {
        "matcher": "Edit(src/**/*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "black $FILE"
          }
        ]
      }
    ],
    "PreCommit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint"
          }
        ]
      }
    ]
  }
}
```

### Example: Auto-Format TypeScript After Editing

```json
{
  "hooks": {
    "PostEdit": [
      {
        "matcher": "Edit(src/**/*.{ts,tsx})",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $FILE && npx eslint --fix $FILE"
          }
        ]
      }
    ]
  }
}
```

---

## 11. Skills (Custom Commands)

### Benefits and Use Cases

> **Why use skills?**
>
> Skills let you **teach Claude how to do repeated tasks consistently** — instead of typing long instructions every time, create the skill once and call it with `/skill-name` forever.

**Use Cases:**

| Skill | Scenario | Result |
|-------|----------|--------|
| **`/deploy`** | Deploying the app weekly | Type `/deploy staging` → Claude runs tests, builds, deploys, and runs health checks end to end — no missed steps |
| **`/new-component`** | Creating React components often | Type `/new-component UserCard` → Claude creates the component, style, test, and story files based on the team's template |
| **`/db-migrate`** | Creating database migrations | Type `/db-migrate add_email_to_users` → Claude creates a migration file, writes up/down, and runs it |
| **`/hotfix`** | Urgent production bug fixes | Type `/hotfix` → Claude branches from main, fixes the bug, runs tests, and creates a PR automatically |
| **`/api-endpoint`** | Creating new API endpoints | Type `/api-endpoint GET /users/:id` → Claude creates route, controller, service, validator, and tests in full |
| **`/changelog`** | Generating release notes | Type `/changelog v2.1.0` → Claude reads the Git log and produces a categorized changelog |
| **`/status`** | Quick project status | Type `/status` → see branch, latest commit, number of changed files, CI status |
| **`/translate`** | Translating files for i18n projects | Type `/translate th` → Claude translates all language files into Thai |

**Real-world example:**

```
Before the "/deploy" skill:
  1. npm run test           ← run yourself
  2. npm run build:prod     ← memorize the command
  3. aws s3 sync ...        ← memorize the bucket
  4. aws cloudfront ...     ← memorize the distribution ID
  5. curl health-check      ← memorize the URL
  → 5 steps, ~15 minutes, easy to mistake

After the "/deploy" skill:
  1. Type /deploy production
  → Claude does all 5 steps in 2 minutes, no mistakes
```

### What are Skills?

User-defined commands invoked with `/skill-name`, or that Claude can invoke automatically.

### Skill Storage Locations

| Location | Scope |
|----------|-------|
| `~/.claude/skills/<name>/SKILL.md` | Personal — works in every project |
| `.claude/skills/<name>/SKILL.md` | Project (committed with the team) |
| `<plugin>/skills/<name>/SKILL.md` | From a plugin |

### Creating a Basic Skill

**File `.claude/skills/deploy/SKILL.md`:**

```markdown
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
---

Follow these steps:

1. Run the test suite and make sure everything passes
2. Build the application
3. Deploy to production
4. Verify health checks
```

Usage: type `/deploy` in a session.

### Frontmatter Options

```yaml
---
name: skill-name                    # Command name
description: "what it does"         # When Claude should use it
when_to_use: "additional triggers"  # Extra trigger phrases
argument-hint: "[file] [action]"    # Argument hint
disable-model-invocation: true      # Only invokable by the user (Claude can't auto-call)
user-invocable: false               # Only Claude can call it
allowed-tools: "Read,Bash"          # Pre-approved tools
model: claude-opus-4-6              # Override the model
effort: high                        # Override the effort
context: fork                       # Run inside a subagent
agent: Explore                      # Agent type
paths:                              # Restrict to certain files
  - "src/**/*.ts"
---
```

### Skill with Arguments

```markdown
---
name: deploy
description: Deploy to the specified environment
---

Deploy to $ARGUMENTS:

1. Build the app
2. Deploy to $ARGUMENTS
3. Verify health checks

Environment used: $0
Additional options: $1
```

Usage: `/deploy staging --verbose` → `$0` = staging, `$1` = --verbose

### Shell Injection in Skills

```markdown
---
name: status
---

Current status:
- Branch: !`git rev-parse --abbrev-ref HEAD`
- Latest commit: !`git log -1 --oneline`
- Changed files: !`git status --short | wc -l`
```

The shell commands run before Claude sees the content.

### Supporting Files

```
my-skill/
├── SKILL.md          # Main file
├── template.md       # Template
├── examples.md       # Output examples
└── scripts/
    └── validate.sh   # Helper script
```

Reference inside SKILL.md: `See examples in [examples.md](examples.md)`

---

## 12. Subagents (Specialized Helpers)

### Benefits and Use Cases

> **Why use subagents?**
>
> Subagents are **AI specialists** with isolated context — when a task needs multiple specialties, the main Claude "delegates" to the right subagent, then aggregates the results, like a team lead with specialist team members.

**Use Cases:**

| Subagent | Use Case | Real-World Example |
|----------|----------|--------------------|
| **Explore Agent** | Surveying a large codebase | You ask "How does authentication work?" → Claude sends the Explore Agent to find relevant files, read multiple files, and report back — without burning the main Claude's context |
| **Plan Agent** | Planning complex work | You say "Migrate from REST to GraphQL" → the Plan Agent analyzes every endpoint and proposes a step-by-step plan with dependencies |
| **Security Reviewer** | Security review | Claude delegates to a Security Agent to scan code for OWASP vulnerabilities and report findings with severity |
| **Test Writer** | Specialized test writing | Claude delegates to a Test Agent that writes tests covering every edge case |
| **Performance Analyzer** | Performance analysis | The agent finds N+1 queries, memory leaks, and slow paths, and proposes fixes |
| **Documentation Writer** | Writing documentation | The agent reads the code and produces API docs, READMEs, and architecture docs |

**Real-world example:**

```
Scenario: You want to refactor a large project (500+ files)

Without a subagent:
  Claude reads all the files itself → context fills quickly → forgets earlier reads
  → Poor results

With subagents:
  1. Claude sends an Explore Agent → returns a project structure summary
  2. Claude sends a Plan Agent → returns a phased refactor plan
  3. Claude executes the plan → sends a Security Agent to verify
  → Better results because each agent has its own context
```

### What are Subagents?

AI assistants that work in a separate context window — ideal for tasks that need a specific specialty.

### Built-in Types

| Type | Description |
|------|-------------|
| `Explore` | Survey, search, read files only |
| `Plan` | Plan, analyze strategy |
| `general-purpose` | General agent (default) |

### Creating a Custom Subagent

**File `.claude/agents/security-reviewer/agent.md`:**

```markdown
---
description: "Specialized security code review"
model: claude-opus-4-6
tools:
  - Read
  - Grep
  - Glob
  - Bash(npm audit *)
---

You are a specialized Security Reviewer.

When reviewing code:
1. Look for OWASP Top 10 vulnerabilities
2. Check input validation
3. Look for hardcoded secrets
4. Check for SQL injection, XSS, CSRF
5. Report findings with severity ratings
```

### Frontmatter Options

```yaml
---
description: "..."              # When Claude should delegate to this agent
model: claude-sonnet-4-6        # Model to use
tools:                          # Allowed tools
  - Read
  - Bash
  - Edit
permissionMode: plan            # Override permission mode
skills:                         # Skills to load
  - my-skill
mcpServers:                     # MCP servers to load
  - puppeteer
preloadSkills: true             # Load skills at startup
---
```

### Usage

Claude delegates to the subagent automatically when a task matches its description, or list them with:

```
/agents
```

---

## 13. Agent Teams

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

## 14. Context Management

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

## 15. Git Integration

### Benefits and Use Cases

> **Why use Git integration?**
>
> Git integration lets Claude handle Git **like a professional developer** — meaningful commit messages, well-described PRs, thorough code reviews, and parallel work across branches.

**Use Cases:**

| Use Case | How to Use | Result |
|----------|-----------|--------|
| **Better commit messages** | `/commit` | Claude reads the diff and writes a message that explains "why", not just "what" — better than "fix bug" or "update" |
| **Easy-to-understand PRs** | `/pr` | Claude summarizes all branch changes and writes a thorough description; reviewers understand the work right away |
| **Code review before pushing** | `/review` | Claude finds bugs, security issues, and code smells before others see — fewer review rounds |
| **Two features in parallel** | `claude -w feature-a` + `claude -w feature-b` | Each worktree has its own branch — Claude works in parallel without conflicts |
| **Check PR status** | Look at the status bar | See PR status (Approved/Pending/Changes Requested) without opening GitHub |
| **Roll back a bad commit** | `Esc + Esc` → Restore code | Roll back instantly — no manual `git reflog` needed |

**Real-world example:**

```
Scenario: You fixed a bug across 3 files and want to make a PR

Without Git integration:
  1. git add src/auth.ts src/middleware.ts src/utils.ts   ← remember files
  2. git commit -m "..."                                  ← think up a message
  3. git push -u origin fix/login-bug                     ← remember branch
  4. gh pr create --title "..." --body "..."              ← write PR description
  → 10 minutes; PR description usually too short

With Git integration:
  1. Type /commit → Claude analyzes the diff and writes a message
  2. Type /pr → Claude writes a complete title + description, pushes, creates PR
  → 1 minute; PR description is detailed and clear
```

### Common Git Commands

| Command | Description |
|---------|-------------|
| `/commit` | Stage + commit with a Claude-generated message |
| `/pr` | Create a pull request |
| `/review` | Review code |

### Git Worktrees (Parallel Work)

```bash
# Create a separate worktree
claude -w feature-auth

# Claude works in .claude/worktrees/feature-auth
# without disturbing the main working directory
```

Benefits:
- Run multiple Claude sessions at once
- Each session edits its own files
- No conflicts

### GitHub Integration

- Show PR status on the current branch
- Color-coded by state: green (Approved), yellow (Pending), red (Changes Requested)
- `Cmd+Click` / `Ctrl+Click` to open the PR in your browser
- Requires the `gh` CLI

### Example Commit

```
/commit
```

Claude will:
1. Look at `git status` and `git diff`
2. Write an appropriate commit message
3. Stage the relevant files
4. Create the commit

### Example PR Creation

```
/pr
```

Claude will:
1. Analyze every change since the branch diverged
2. Write the title and description
3. Push to the remote (if needed)
4. Create the PR with `gh pr create`

---

## 16. Headless Mode (Automation Mode)

### Benefits and Use Cases

> **Why use headless mode?**
>
> Headless mode lets Claude Code run **without anyone watching** — perfect for automation, CI/CD pipelines, scheduled scripts, or processing lots of data.

**Use Cases:**

| Use Case | Command | Result |
|----------|---------|--------|
| **Automatic code review on every PR** | `claude --bare -p "review $(git diff main)"` in GitHub Actions | Every PR gets reviewed by AI automatically — no waiting for a reviewer |
| **Auto-generated release notes** | `claude -p "create a changelog from the Git log"` | Every release gets a polished changelog automatically |
| **Error log analysis** | `cat error.log \| claude -p "analyze"` | Analyze logs immediately without reading them yourself |
| **Batch processing many files** | `for f in *.ts; do claude -p "edit $f"; done` | Apply the same pattern across many files automatically |
| **JSON output for pipelines** | `claude -p "..." --output-format json --json-schema '{...}'` | Output is parseable, ready to hand off to other programs |
| **Daily code quality check** | A cron job + `claude --bare -p "check code quality"` | A code quality report every morning |
| **Migration script** | `claude -p "migrate v1 → v2" --max-turns 50` | Claude performs the migration automatically |
| **Generate test data** | `claude -p "create 100 seed records" --output-format json` | Receive test data as JSON immediately |

**GitHub Actions example:**

```yaml
name: AI Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: AI Review
        run: |
          git diff origin/main | claude --bare -p "Review this code, find bugs, security issues, performance problems" \
            --allowedTools "Read" \
            --output-format json \
            --max-turns 5
```

### Non-Interactive Usage

```bash
# Run a command and print the result
claude -p "find bugs in auth.py"

# Receive output as JSON
claude -p --output-format json "analyze this code"

# Bare mode (faster)
claude -p --bare "question"
```

### Structured Output (JSON)

```bash
claude -p "list all functions in the file" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}}}'
```

### Streaming Output

```bash
claude -p "write code" \
  --output-format stream-json \
  --include-partial-messages | \
  jq -rj 'select(.type == "stream_event") | .event.delta.text'
```

### Use in CI/CD

```bash
# GitHub Actions example
claude --bare -p "review changed code" \
  --allowedTools "Read,Bash(npm test),Edit" \
  --output-format json \
  --max-turns 10
```

### Pipe Data Into Claude

```bash
# Send a file for Claude to analyze
cat error.log | claude -p "analyze the errors in this log"

# Send command output
git diff | claude -p "review these changes"

# Send multiple files
cat src/*.ts | claude -p "find bugs"
```

---

## 17. IDE Integration

### Benefits and Use Cases

> **Why use IDE integration?**
>
> IDE integration lets you **use Claude Code without leaving your editor** — visual diffs, clickable file links, select-and-send code to Claude. Smoother than CLI alone.

**Use Cases:**

| Use Case | IDE | Description |
|----------|-----|-------------|
| **Highlight code and have Claude explain it** | VS Code | Select code you don't understand → Claude explains it instantly, no copy-paste needed |
| **See visual diffs before approving** | VS Code / Desktop | See red/green changes Claude made before you accept |
| **Reference files with @** | VS Code | Type `@src/auth.ts` → Claude reads that file instantly without copy-pasting contents |
| **Watch the task list while working** | VS Code / Desktop | See the tasks Claude is working on and follow progress |
| **Multiple tabs at once** | Desktop | Open many sessions in tabs to work on multiple things in parallel |
| **Use Claude during debugging** | JetBrains | Claude sees IDE context like variable values and stack traces |

### VS Code Extension

**Install:**
1. Open Extensions (`Ctrl+Shift+X`)
2. Search for "Claude Code"
3. Click Install

**Features:**
- Visual diff view
- Use `@` to reference files
- Review plans before execution
- Conversation history
- Click file links to open them directly

**VS Code settings:**
- `claudeCode.initialPermissionMode` — initial permission mode

### JetBrains IDEs

**Install:**
1. Open Settings > Plugins
2. Search for "Claude Code" in the Marketplace
3. Click Install

**Features:**
- Run Claude in the integrated terminal
- Same shortcuts as the CLI
- Access to IDE context

### Desktop App

**Additional features:**
- Visual diff review
- Multiple sessions in tabs
- UI for scheduled tasks
- PR status display
- Git isolation

---

## 18. Plugins

### Benefits and Use Cases

> **Why use plugins?**
>
> Plugins let you **share custom tooling** (skills, agents, hooks, MCP) as a single package — easy to install, easy to distribute, easy to update from one place.

**Use Cases:**

| Plugin | Scenario | Result |
|--------|----------|--------|
| **Company standard plugin** | A 50-person team needs the same skills + hooks | Build a plugin bundling the deploy skill, lint hook, and security agent → everyone installs the same |
| **Framework plugin** | Use Next.js across all projects | Build a plugin with skills for creating pages, API routes, components → reuse in every project |
| **DevOps plugin** | Manage K8s, Docker, Terraform | A plugin with DevOps skills + agents → use across every project |
| **Community plugin** | Use a plugin someone else built | Install from the marketplace immediately |
| **Language-specific plugin** | A Go / Rust / Python team | Language-specific plugin bundling linter, test runner, code generator |

### Plugin Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json       # Manifest
├── skills/                # Plugin skills
│   └── skill-name/
│       └── SKILL.md
├── agents/                # Plugin agents
│   └── agent.md
├── hooks/                 # Plugin hooks
│   └── hooks.json
└── .mcp.json              # Plugin MCP config
```

### Plugin Manifest

```json
{
  "name": "my-plugin",
  "description": "A plugin for...",
  "version": "1.0.0",
  "author": { "name": "Author Name" },
  "homepage": "https://example.com",
  "repository": "https://github.com/user/repo"
}
```

### Loading a Plugin

```bash
# From a local directory
claude --plugin-dir ./my-plugin

# Install from the marketplace
/plugins install <plugin-name>
```

### Managing Plugins

```
/plugins              # Browse and manage
/reload-plugins       # Reload plugins without restarting
```

---

## 19. Session Management

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

## 20. Scheduled Tasks

### Benefits and Use Cases

> **Why use scheduled tasks?**
>
> Scheduled tasks let Claude **work automatically on a schedule** — no need to remember what to run when. Claude does it for you.

**Use Cases:**

| Scheduled Task | Frequency | Result |
|----------------|-----------|--------|
| **Daily Code Review** | Every morning at 9:00 | Claude reviews yesterday's commits, hunts for bugs/security issues, and reports each morning |
| **Weekly Dependency Check** | Every Monday | Claude checks for outdated dependencies or vulnerabilities and alerts you weekly |
| **Hourly Health Check** | Every hour | Claude scans error logs; if a new error pattern appears, it notifies you immediately |
| **Daily Documentation Update** | Every evening at 18:00 | Claude updates API docs to match the latest code |
| **Monthly Performance Report** | First of every month | Claude analyzes code quality metrics and produces a monthly report |
| **Monitor Deployment** | `/loop 5m` | Health-check every 5 minutes after a deployment |

**Real-world example:**

```
Scenario: The team forgets to update dependencies, accumulating vulnerabilities

Without scheduled tasks:
  → Forget to check for 3 months → audit finds 47 vulnerabilities → fix everything at once

With scheduled tasks:
  → Claude checks every Monday → finds 2-3 vulnerabilities → fixes immediately, no buildup
  → The team stays safe without remembering to do it
```

### Scheduled Tasks in the Desktop App

| Frequency | Description |
|-----------|-------------|
| Manual | Run on demand |
| Hourly | Every hour |
| Daily | Every day |
| Weekdays | Monday–Friday |
| Weekly | Every week |

**Create via the Desktop UI or:**
```
Set up Daily Code Review to run at 9 AM
```

### /loop — Repeat Within a Session

```
/loop 5m "check errors in the log"
```

Repeats every 5 minutes within the current session.

### /schedule — Cloud Routines

```
/schedule
```

Creates a scheduled task on Anthropic's infrastructure:
- Runs even when your computer is off
- Can be triggered from an API or GitHub event
- Clones the repo fresh every time

---

## 21. Other Special Features

### Benefits and Use Cases

> **What do these special features help with?**
>
> They're **add-on capabilities that broaden Claude's reach** — from deep analysis to controlling browsers and accepting voice input.

**Use Cases:**

| Feature | Use Case | Description |
|---------|----------|-------------|
| **Extended Thinking** | Designing software architecture | Claude takes longer to think, weighs trade-offs of each option, and produces noticeably more detailed output |
| **Fast Mode** | Quick fixes for small bugs | Faster answers for simple tasks — saves time |
| **Code Intelligence** | Catch type errors while coding | Claude sees type errors in real time like an IDE — catch bugs as you write |
| **Voice Dictation** | Describe what you need by speaking | Hold Space and talk — faster than typing for long descriptions |
| **Remote Control** | Share a session with a teammate | A teammate opens a browser and watches your session — great for pair programming |
| **Computer Use** | UI testing on macOS | Claude controls the mouse/keyboard to test real apps |
| **Side Questions** | Quick asides without affecting context | `/btw` lets you ask without disturbing the main context |

### Extended Thinking

```
/think
```

Or press `Cmd+T` / `Meta+T`.

Claude spends more time thinking on hard problems such as:
- Software architecture
- Hard bugs
- Security analysis

### Fast Mode

Press `Meta+O` / `Alt+O`, or use `/fast`.

Same Opus 4.6, but with faster output.

### Code Intelligence

Real-time type/error checking via LSP servers.

Supported: TypeScript, Python, Rust.

### Voice Dictation

Hold `Space` for push-to-talk.

### Remote Control

```bash
claude remote-control --name "My Project"
```

Control Claude Code from a browser.

### Computer Use (macOS)

```bash
claude --chrome
```

Claude can control the mouse/keyboard and interact with web apps.

### Side Questions

```
/btw where is the config file?
```

Ask side questions without affecting the main context.

---

## 22. Directory Structure

### Benefits and Use Cases

> **Why know the directory structure?**
>
> Knowing where Claude Code stores its files helps you **troubleshoot faster, manage configs correctly, and back up important data** — for example, knowing where sessions live so you can clear them when full, or where memory lives so you can edit it by hand.

**Use Cases:**

| Scenario | File/Folder | Description |
|----------|-------------|-------------|
| **Edit memory by hand** | `~/.claude/projects/<project>/memory/` | Edit/delete incorrect memory files directly |
| **Back up sessions** | `~/.claude/projects/<project>/sessions/` | Copy session files for safekeeping |
| **Share settings with the team** | `.claude/settings.json` | Commit it; the team uses the same settings |
| **Keep personal settings** | `.claude/settings.local.json` | gitignored, never mixed with others |
| **Share skills with the team** | `.claude/skills/` | Commit the folder; the team uses the same skills |
| **Use skills across all projects** | `~/.claude/skills/` | Personal skills available everywhere |

### Project Folder (.claude/)

```
your-project/
├── CLAUDE.md                    # Main project instructions
├── CLAUDE.local.md              # Personal instructions (gitignored)
├── .claude/
│   ├── CLAUDE.md                # Alternate location
│   ├── CLAUDE.local.md          # Personal instructions (gitignored)
│   ├── settings.json            # Project settings
│   ├── settings.local.json      # Personal settings (gitignored)
│   ├── rules/                   # Topic-specific rules
│   │   ├── testing.md
│   │   └── api-design.md
│   ├── skills/                  # Custom skills
│   │   └── deploy/
│   │       └── SKILL.md
│   ├── agents/                  # Custom subagents
│   │   └── security-reviewer/
│   │       └── agent.md
│   ├── worktrees/               # Git worktree sessions
│   └── .mcp.json                # MCP config
└── .mcp.json                    # MCP config (alternate location)
```

### User Folder (~/.claude/)

```
~/.claude/
├── settings.json                # Personal settings
├── CLAUDE.md                    # Personal instructions for every project
├── keybindings.json             # Custom keyboard shortcuts
├── skills/                      # Personal skills
├── agents/                      # Personal agents
├── rules/                       # Personal rules
├── projects/                    # Stored sessions
│   └── <project>/
│       ├── sessions/            # Conversation files
│       └── memory/              # Auto Memory
│           ├── MEMORY.md
│           └── *.md
├── teams/                       # Agent team configs
└── scheduled-tasks/             # Desktop scheduled tasks
```

---

## 23. Environment Variables

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

## 24. Basic Troubleshooting

### Benefits and Use Cases

> **Why know how to troubleshoot?**
>
> When Claude Code misbehaves — CLAUDE.md doesn't load, hooks don't run, MCP doesn't connect — knowing how to diagnose lets you **fix things quickly without waiting for help**.

**Use Cases:**

| Problem | Diagnosis | Fix |
|---------|-----------|-----|
| **Claude doesn't recognize the project** | `/memory` → check whether CLAUDE.md is loaded | Verify the file location, check `claudeMdExcludes` in settings |
| **Hooks aren't running** | `claude --debug "hooks"` | Check syntax in settings.json, check the matcher pattern |
| **MCP server errors** | `/mcp` → view status | Check command/args, ensure `npx` works |
| **Context fills abnormally fast** | `/context` → see the breakdown | Move content from CLAUDE.md to `.claude/rules/` |
| **Skill doesn't show up** | Check the description in SKILL.md | Make the description more specific |
| **Cannot log in** | `claude auth status` | `claude auth login` again |
| **Everything looks broken** | `/doctor` | Diagnoses problems across the board |

### Diagnose Problems

```
/doctor
```

Shows:
- Installation status
- Authentication status
- Configuration problems
- Keybinding problems
- Missing dependencies

### Debug Logging

```bash
claude --debug "api,hooks"
claude --debug-file /tmp/claude-debug.log
```

### Common Problems

| Problem | Fix |
|---------|-----|
| Permissions don't work | Check rule syntax, use `/permissions` |
| CLAUDE.md doesn't load | Use `/memory` to verify the location |
| Skills don't trigger | Make the description more specific |
| Context fills quickly | Move content to `.claude/rules/`, use a subagent |
| Hooks don't run | Check syntax in settings.json |
| Cannot log in | `claude auth login` again |
| MCP server doesn't work | `/mcp` to see status, check command and args |

### Inspect a Session

```bash
# View the session file
cat ~/.claude/projects/<project>/sessions/<session-id>.jsonl | jq '.'
```

### Update Claude Code

```bash
claude update
# or
claude --version  # check the version
```

---

## 25. Tips and Best Practices

### Benefits and Use Cases

> **Why read this section?**
>
> These tips come from **the real experiences of developers** who use Claude Code daily — they help you get better results faster and at lower cost.

### Write Effective CLAUDE.md

- Keep it under ~200 lines
- Use clear headings (`#`) and bullet points
- Be specific: "Use 2-space indentation", not "format nicely"
- Use `@import` for long reference documents
- Split topics into `.claude/rules/`

### Write Effective Prompts

| Approach | Good Example | Poor Example |
|----------|--------------|--------------|
| **Be specific** | "Fix the bug that causes login to fail when the password contains special characters in src/auth.ts" | "Fix the login bug" |
| **Specify how to verify** | "After fixing, run `npm test src/auth.test.ts` and make sure it passes" | "After fixing, test it" |
| **Explore first** | "Analyze how the authentication flow works, then propose a plan before fixing" | "Fix the auth for me" |
| **Delegate, don't dictate steps** | "Build a REST API for CRUD on Users following the project's pattern" | "First create the route file, then..." |

### Manage Permissions

- Approve frequently used commands: `Bash(npm test *)`
- Deny dangerous commands: `Bash(rm -rf *)`
- Switch modes by task: Plan → acceptEdits → auto

### Work in Parallel

- Use `--worktree` for parallel sessions
- Use agent teams for collaborative work
- Use subagents for specialized work

### CI/CD Integration

```bash
# GitHub Actions example
- name: Claude Code Review
  run: |
    claude --bare -p "review the changed code" \
      --allowedTools "Read,Bash(npm test)" \
      --output-format json \
      --max-turns 5
```

### Use the Context Window Wisely

1. Use `/compact` when the conversation is long
2. Use `/clear` when you switch topics
3. Use a subagent for search-heavy work
4. Use `/btw` for small questions
5. Periodically check `/context`

### Pick the Right Model for the Job

| Task | Recommended Model | Why |
|------|-------------------|-----|
| Architecture, complex bugs | Opus 4.6 | Deep thought, strong analysis |
| General coding, ordinary bugs | Sonnet 4.6 | Fast and economical |
| Boilerplate, data generation | Haiku 4.5 | Very fast and very cheap |

### Save Money

- Use `--effort low` for simple tasks
- Use `--model sonnet` when you don't need Opus
- Use `--max-budget-usd` to cap spend
- Use `/compact` to reduce tokens sent

---

## 26. Real-World Workflow Simulations

> **This section simulates real-world Claude Code usage from start to finish.**
> Each flow shows the steps a developer actually takes during a day, with commands and Claude's responses.

---

### Flow 1: First Day on a New Project (Onboarding)

> **Scenario:** You're a new developer who just joined the team and was given a repository you've never seen. You need to understand the project as quickly as possible.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Clone the project and open Claude Code                 │
└─────────────────────────────────────────────────────────────────┘

$ git clone https://github.com/company/ecommerce-api.git
$ cd ecommerce-api
$ claude

  ┌──────────────────────────────────────┐
  │  Claude Code v1.x                    │
  │  Model: Claude Opus 4.6              │
  │  Permission: default                 │
  │  Project: ecommerce-api              │
  └──────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Have Claude generate CLAUDE.md                         │
└─────────────────────────────────────────────────────────────────┘

You: /init

Claude: Analyzing the project...
  ✓ Read package.json → Node.js + TypeScript + Express
  ✓ Read tsconfig.json → strict mode, ESNext
  ✓ Read docker-compose.yml → PostgreSQL + Redis
  ✓ Surveyed the directory tree → 156 files in 23 folders
  ✓ Read .eslintrc → Airbnb style
  ✓ Read jest.config.ts → Test framework: Jest

  CLAUDE.md created ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Ask Claude about the project                           │
└─────────────────────────────────────────────────────────────────┘

You: Explain the architecture of this project. I just joined the team.

Claude: (uses Explore Agent to survey the codebase)

  This project is an E-commerce REST API using Clean Architecture:

  📁 src/
  ├── controllers/     ← receive request, call service
  ├── services/        ← main business logic
  ├── repositories/    ← database layer (TypeORM)
  ├── entities/        ← database models
  ├── middleware/      ← auth, logging, error handler
  ├── routes/          ← Express routes
  ├── validators/      ← Zod schemas
  └── utils/           ← helper functions

  Main flow:
  Route → Middleware → Controller → Service → Repository → Database

  Key entities: User, Product, Order, Payment, Cart
  Auth: JWT + refresh token
  Payment: Stripe integration
  Cache: Redis for the product catalog
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 4: Try running the project                                │
└─────────────────────────────────────────────────────────────────┘

You: Help me set up the development environment.

Claude: Checking prerequisites...
  ✓ Node.js v20 — installed
  ✓ Docker — installed
  ✗ .env file — not present

  Generating .env from .env.example...
  [edit .env] ✓

  Running docker-compose up -d...
  [run Bash: docker-compose up -d] ✓ PostgreSQL + Redis started

  Installing dependencies...
  [run Bash: npm install] ✓

  Running migrations...
  [run Bash: npm run db:migrate] ✓

  Running seed data...
  [run Bash: npm run db:seed] ✓

  Starting the dev server...
  [run Bash: npm run dev] ✓ Server running on http://localhost:3000

  ✅ Ready! Try opening http://localhost:3000/api/health
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 5: Save personal info to memory                           │
└─────────────────────────────────────────────────────────────────┘

You: Remember that I'm a backend developer who specializes in
     Python/Django and is just starting my first TypeScript project.

Claude: Saved ✓
  From now on, when I explain TypeScript, I'll relate it to Python/Django.
```

**Flow Summary:** `/init` → ask about architecture → set up dev → save memory
**Time spent:** ~10 minutes (normally 1–2 days to understand a new project)

---

### Flow 2: Fixing a Production Bug Report

> **Scenario:** You receive a bug report saying "Customers click Place Order and end up with two duplicate orders." You need to find the cause and fix it.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Open a session and describe the bug                    │
└─────────────────────────────────────────────────────────────────┘

$ claude

You: There's a production bug — customers click "Place Order" and end up with
     two duplicate orders. It happens when their internet is slow and they
     click the button multiple times. Help me find the cause and fix it.
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Claude analyzes the problem (Plan Mode)                │
└─────────────────────────────────────────────────────────────────┘

Claude: Got it — this is an idempotency issue in order creation.
  Let me analyze first.

  [read src/controllers/order.controller.ts]
  [read src/services/order.service.ts]
  [read src/routes/order.routes.ts]
  [read src/middleware/]

  🔍 Found the cause:

  File src/services/order.service.ts:45
  The createOrder() function has no protection against duplicate requests:

  1. ❌ No idempotency key — duplicate requests create new orders every time
  2. ❌ No database lock — race condition when two requests arrive together
  3. ❌ No frontend disable after click — frontend can resubmit easily

  📋 Fix plan:
  1. Add idempotency key to the Order API (backend — actual fix)
  2. Add a database unique constraint (prevents race conditions)
  3. Add a Redis lock for order creation (prevents concurrent creation)
  4. Write thorough tests

  Should I start fixing now?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Switch to acceptEdits and let Claude fix it            │
└─────────────────────────────────────────────────────────────────┘

You: Go ahead.

  [press Shift+Tab → switch to acceptEdits]

Claude: Starting the fix.

  📝 Edit 1/4: src/middleware/idempotency.middleware.ts (new file)
  [create file] ✓ Idempotency middleware that uses Redis to store keys

  📝 Edit 2/4: src/services/order.service.ts
  [edit createOrder()] ✓ Add Redis lock + idempotency check

  📝 Edit 3/4: src/routes/order.routes.ts
  [edit] ✓ Add idempotency middleware to POST /orders

  📝 Edit 4/4: src/entities/order.entity.ts
  [edit] ✓ Add unique constraint on the idempotencyKey column

  🗄️ Create migration:
  [run Bash: npm run db:migration:create AddIdempotencyKey] ✓
  [edit migration file] ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 4: Claude writes tests                                    │
└─────────────────────────────────────────────────────────────────┘

Claude: Writing tests...

  📝 Create src/__tests__/order-idempotency.test.ts
  [create file] ✓

  Test cases:
  ✓ Normal order submission → creates 1 order
  ✓ Duplicate request with the same idempotency key → returns the same order
  ✓ Concurrent duplicate requests → only 1 order created
  ✓ New order with a different key → creates a new order
  ✓ Idempotency key expires after 24h → can create a new order

  Running tests...
  [run Bash: npm test src/__tests__/order-idempotency.test.ts]

  ✅ Tests: 5 passed, 0 failed
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 5: Commit and create a PR                                 │
└─────────────────────────────────────────────────────────────────┘

You: /commit

Claude: Analyzing changes...
  4 files edited, 2 new files, 1 migration

  Commit message:
  "fix: prevent duplicate order creation with idempotency key

   Add Redis-based idempotency middleware to prevent duplicate orders
   when customers submit multiple requests. Includes database unique
   constraint and distributed lock for race condition prevention."

  [git add + git commit] ✓

You: /pr

Claude: Creating pull request...
  Branch: fix/duplicate-order-creation
  Title: "Fix: Prevent duplicate order creation"
  Description: ## Summary
  - Add idempotency middleware using Redis
  - Add distributed lock on order creation
  - Add unique constraint on idempotency_key column
  ...

  ✅ PR #142 created → https://github.com/company/ecommerce-api/pull/142
```

**Flow Summary:** describe bug → Claude analyzes → fix 6 files → write 5 tests → commit + PR
**Time spent:** ~15 minutes (normally 2–4 hours)

---

### Flow 3: Building a New Feature From Scratch

> **Scenario:** A product manager wants a "Wishlist" feature that lets customers save products they're interested in. You need to build the entire new API.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Plan before building                                   │
└─────────────────────────────────────────────────────────────────┘

$ claude

You: /plan
     Build a Wishlist system that lets customers save products.
     - Customers can add/remove items from their wishlist
     - View their own wishlist
     - Notify when items in the wishlist go on sale
     - Limit 50 items per user

Claude: 📋 Wishlist development plan

  Step 1 — Database Layer
  ├── Create entity: WishlistItem (userId, productId, addedAt, notifyOnSale)
  ├── Create migration
  └── Create repository: WishlistRepository

  Step 2 — Business Logic
  ├── Create WishlistService
  │   ├── addToWishlist() — add an item (limit 50)
  │   ├── removeFromWishlist() — remove an item
  │   ├── getWishlist() — list items (pagination)
  │   ├── isInWishlist() — check whether an item is in the wishlist
  │   └── notifyPriceDrop() — sale notifications
  └── Create Zod validators

  Step 3 — API Layer
  ├── POST   /api/wishlist          — add an item
  ├── DELETE /api/wishlist/:productId — remove an item
  ├── GET    /api/wishlist          — list items
  ├── GET    /api/wishlist/check/:productId — check
  └── Create controller + routes

  Step 4 — Price Drop Notification
  ├── Create event listener for product price changes
  ├── Wire to email service
  └── Create notification queue (Bull)

  Step 5 — Testing
  ├── Unit tests: service layer (8 tests)
  ├── Integration tests: API endpoints (6 tests)
  └── Edge cases: 50 limit, duplicate, deleted product

  Files to create/edit: 12 files
  Should I start now?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Approve the plan and start                              │
└─────────────────────────────────────────────────────────────────┘

You: Sounds good — start. But hold off on Step 4 (price drop notifications);
     do steps 1–3 and 5 first.

  [press Shift+Tab → switch to auto]

Claude: Got it — I'll do steps 1–3 + 5 first.

  ━━━ Step 1: Database Layer ━━━

  📝 Create src/entities/wishlist-item.entity.ts ✓
  📝 Create src/repositories/wishlist.repository.ts ✓
  📝 Create migration: CreateWishlistTable ✓
  🗄️ Run migration ✓

  ━━━ Step 2: Business Logic ━━━

  📝 Create src/validators/wishlist.validator.ts ✓
  📝 Create src/services/wishlist.service.ts ✓
     - addToWishlist() with limit check (50 items)
     - removeFromWishlist() with not-found check
     - getWishlist() with pagination
     - isInWishlist() for the frontend toggle

  ━━━ Step 3: API Layer ━━━

  📝 Create src/controllers/wishlist.controller.ts ✓
  📝 Create src/routes/wishlist.routes.ts ✓
  📝 Edit src/routes/index.ts ✓ (add wishlist routes)

  ━━━ Step 5: Testing ━━━

  📝 Create src/__tests__/wishlist.service.test.ts ✓ (8 tests)
  📝 Create src/__tests__/wishlist.api.test.ts ✓ (6 tests)

  Running all tests...
  [run Bash: npm test]

  ✅ Tests: 14 passed, 0 failed
  ✅ Lint: no errors
  ✅ TypeScript: no errors

  Created 9 files, edited 1 file ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Review the code before committing                      │
└─────────────────────────────────────────────────────────────────┘

You: /review

Claude: 🔍 Reviewing the changes...

  ✅ Looks good:
  - Uses the Repository pattern matching the existing codebase
  - Input validation with Zod on every endpoint
  - Pagination uses cursor-based pagination (project standard)
  - Error handling is complete

  ⚠️ Recommendations:
  - wishlist.service.ts:23 — consider adding an index on (userId, productId)
    for the frequent query
  - wishlist.controller.ts:45 — consider adding rate limiting on the POST
    endpoint

  Should I apply the recommendations?

You: Apply them.

Claude:
  📝 Edit migration file → add composite index ✓
  📝 Edit wishlist.routes.ts → add rate limiter (10 req/min) ✓
  📝 Re-run tests → 14 passed ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 4: Commit and create a PR                                  │
└─────────────────────────────────────────────────────────────────┘

You: /commit

Claude: Commit message:
  "feat: add wishlist API for customers to save favorite products

   - CRUD endpoints for wishlist items with 50-item limit
   - Cursor-based pagination, rate limiting, input validation
   - 14 tests covering service and API layers"

  [git add + git commit] ✓

You: /pr

Claude: ✅ PR #143 created
  → https://github.com/company/ecommerce-api/pull/143
```

**Flow Summary:** `/plan` → approve plan → create 10 files → `/review` → apply suggestions → `/commit` + `/pr`
**Time spent:** ~20 minutes (normally 1–2 days)

---

### Flow 4: Refactoring a Large Legacy File

> **Scenario:** The project has a 2,000-line `utils.ts` file that bundles everything together. You need to split it into smaller modules.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Analyze the file to refactor                            │
└─────────────────────────────────────────────────────────────────┘

$ claude

You: src/utils.ts is 2,000 lines. I want to split it into smaller modules.
     Don't break any of the existing tests.

Claude: Let me analyze first.

  [read src/utils.ts — 2,147 lines]
  [find files importing from utils.ts — 47 files]
  [read src/__tests__/utils.test.ts — 89 tests]

  📊 Analysis:

  src/utils.ts contains 6 groups of functions:

  1. 📅 Date utilities (12 functions, 340 lines)
     → formatDate, parseDate, getRelativeTime, ...

  2. 💰 Currency/Price (8 functions, 210 lines)
     → formatPrice, calculateDiscount, convertCurrency, ...

  3. ✅ Validation (15 functions, 420 lines)
     → isValidEmail, isValidPhone, isStrongPassword, ...

  4. 🔤 String manipulation (10 functions, 280 lines)
     → slugify, truncate, capitalize, sanitizeHtml, ...

  5. 📦 Object/Array helpers (9 functions, 350 lines)
     → deepClone, pick, omit, groupBy, chunk, ...

  6. 🔒 Crypto/Auth (6 functions, 290 lines)
     → hashPassword, generateToken, encryptData, ...

  Files needing import updates: 47
  Existing tests: 89

  📋 Plan:
  1. Create 6 new files in src/utils/
  2. Move functions to the appropriate file
  3. Create src/utils/index.ts that re-exports everything (backward compatible)
  4. Update imports in 47 files (point at the specific module)
  5. Run tests to verify nothing breaks
  6. Delete the old src/utils.ts

  Start now?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Let Claude work (Auto Mode)                             │
└─────────────────────────────────────────────────────────────────┘

You: Start.

  [press Shift+Tab → switch to auto]

Claude: Starting the refactor...

  ━━━ Create new modules ━━━
  📝 src/utils/date.ts ✓ (12 functions)
  📝 src/utils/currency.ts ✓ (8 functions)
  📝 src/utils/validation.ts ✓ (15 functions)
  📝 src/utils/string.ts ✓ (10 functions)
  📝 src/utils/collection.ts ✓ (9 functions)
  📝 src/utils/crypto.ts ✓ (6 functions)
  📝 src/utils/index.ts ✓ (re-exports everything)

  ━━━ Update imports (47 files) ━━━
  📝 src/controllers/user.controller.ts ✓
  📝 src/controllers/product.controller.ts ✓
  📝 src/controllers/order.controller.ts ✓
  ... (44 more files)
  📝 47/47 files updated ✓

  ━━━ Delete the old file ━━━
  🗑️ src/utils.ts ✓

  ━━━ Run tests ━━━
  [run Bash: npm test]

  ✅ Tests: 89 passed, 0 failed
  ✅ TypeScript: no errors
  ✅ Lint: no errors

  Summary: 7 new files, 47 edited, 1 deleted
  60 total functions migrated successfully
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Verify and commit                                       │
└─────────────────────────────────────────────────────────────────┘

You: /simplify

Claude: Reviewing the refactored code...

  ✅ No duplicate functions
  ✅ Imports are all correct
  ✅ No circular dependencies
  ⚠️ src/utils/collection.ts: groupBy() and chunk() could be replaced
     with lodash equivalents
     → Suggestion: keep them for now and migrate later (no need to change now)

You: /commit

Claude: Commit message:
  "refactor: split monolithic utils.ts into 6 focused modules

   Split 2,147-line utils.ts into date, currency, validation, string,
   collection, and crypto modules. Updated imports across 47 files.
   All 89 existing tests pass without modification."

  ✅ Committed
```

**Flow Summary:** analyze → create 7 modules → update 47 files → 89 tests pass → commit
**Time spent:** ~10 minutes (normally 4–8 hours)

---

### Flow 5: Using Agent Teams to Review a Large PR

> **Scenario:** A teammate sends a PR that touches 45 files and changes the entire payment system. You need to review it thoroughly.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Create an agent team for the review                     │
└─────────────────────────────────────────────────────────────────┘

$ claude

You: Review PR #156 that overhauls the payment system.
     Create a 3-member agent team to review it in parallel:
     - Member 1: security (payment data, PCI compliance)
     - Member 2: business logic (pricing, tax, refund)
     - Member 3: test coverage + error handling
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Agent teams work in parallel                            │
└─────────────────────────────────────────────────────────────────┘

Claude: Agent team created. Reviewing PR #156...

  ┌─ Agent "Security" ──────────────────────────┐
  │ Checking: payment data flow, PCI, secrets   │
  │ Status: reading 15/45 files...              │
  └─────────────────────────────────────────────┘

  ┌─ Agent "Business Logic" ────────────────────┐
  │ Checking: pricing, tax, discount, refund    │
  │ Status: reading 22/45 files...              │
  └─────────────────────────────────────────────┘

  ┌─ Agent "Quality" ───────────────────────────┐
  │ Checking: tests, error handling, edge cases │
  │ Status: reading 8/45 files...               │
  └─────────────────────────────────────────────┘

  ... (5 minutes pass) ...
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Receive reports from every agent                        │
└─────────────────────────────────────────────────────────────────┘

Claude: ✅ Review complete. Summary from the 3 agents:

  ═══ 🔒 Security Agent ═══

  🔴 Critical (1):
  - payment.service.ts:89 — credit card number is logged to console
    Remove console.log(cardNumber) before merging

  🟡 Warning (2):
  - stripe.adapter.ts:34 — webhook secret should live in ENV, not hardcoded
  - refund.service.ts:67 — no rate limiting on the refund API

  ✅ Pass:
  - ✓ No SQL injection
  - ✓ Input validation on every endpoint
  - ✓ PCI data not stored in the database

  ═══ 💼 Business Logic Agent ═══

  🔴 Critical (1):
  - tax.calculator.ts:120 — EU tax calculation is wrong
    Uses US VAT rates instead of EU (15% vs. 20–27%)

  🟡 Warning (1):
  - discount.service.ts:45 — discount + coupon has no maximum cap
    Could result in a negative price

  ✅ Pass:
  - ✓ Pricing logic correct for US/UK
  - ✓ Refund logic correct
  - ✓ Currency conversion uses real-time rates

  ═══ ✅ Quality Agent ═══

  🟡 Warning (2):
  - Test coverage: 72% (below 80% standard)
    Missing tests for: EU tax, partial refund, currency edge cases
  - payment.controller.ts — catch block only logs, doesn't return the error
    to the client

  ✅ Pass:
  - ✓ Happy-path tests are complete
  - ✓ Stripe mock is correct
  - ✓ Transaction rollback tests exist

  ═══════════════════════════════════════

  📊 Overall summary:
  🔴 Critical: 2 (must fix before merge)
  🟡 Warning: 5 (recommended to fix)
  ✅ Pass: 9

  Should I post this as a comment on PR #156?

You: Yes, comment.

Claude: ✅ Comment posted on PR #156
```

**Flow Summary:** create 3 agent teams → review 45 files in parallel → consolidated report → comment on the PR
**Time spent:** ~5 minutes (normally 2–3 hours of solo review)

---

### Flow 6: Debugging a Production Issue via Log Analysis

> **Scenario:** The website slowed down this morning — response time jumped from 200ms to 2s. You need to find the cause urgently.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Pipe the log to Claude for analysis                    │
└─────────────────────────────────────────────────────────────────┘

$ cat /var/log/app/error.log | tail -500 | claude -p "
  The website got very slow this morning — response time jumped
  from 200ms to 2s. Analyze this log and find the cause.
"
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Claude analyzes and identifies the cause               │
└─────────────────────────────────────────────────────────────────┘

Claude:
  🔍 Analysis of the last 500 log lines:

  📊 Patterns observed:
  1. [08:15:03] "SLOW QUERY: SELECT * FROM products WHERE ... — 1,847ms"
     → This query repeated 342 times in 1 hour
  2. [08:15:03] "Redis connection timeout" — 28 times
  3. [08:22:45] "Pool exhausted, waiting for connection" — 156 times

  🎯 Causes (sorted by likelihood):

  1. 🔴 N+1 query in product listing (90% likely the main cause)
     - Query "SELECT * FROM products WHERE category_id = ?" runs 342 times
     - Should be a single query with JOIN or WHERE IN
     - Fills the connection pool → other requests have to wait

  2. 🟡 Redis connection timeout (likely a side effect)
     - Cache misses send every request to the database → even slower

  3. 🟡 No index on products.category_id
     - The query falls back to a full table scan

  💡 Quick fixes:
  1. Add an index on products.category_id (immediate fix)
  2. Fix the N+1 query in product.repository.ts (~10 minutes)
  3. Investigate Redis connections (might be memory related)
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Open Claude interactive to apply the fix               │
└─────────────────────────────────────────────────────────────────┘

$ claude -c

You: Fix the N+1 query and add the index. Urgent.

Claude:
  [read src/repositories/product.repository.ts]

  Found it on line 78:

  ❌ Old code (N+1 query):
  async getByCategory(categoryId: string) {
    const products = await this.find({ categoryId });
    for (const product of products) {
      product.reviews = await this.reviewRepo.find({ productId: product.id });
      //                ^^^^^^^^ query inside a loop! ← cause
    }
  }

  ✅ New code (1 query):
  async getByCategory(categoryId: string) {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'review')
      .where('product.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  📝 Edit product.repository.ts ✓
  📝 Create migration: AddIndexOnProductCategoryId ✓
  📝 Run tests → 89 passed ✓

You: /commit

Claude: "fix: resolve N+1 query in product listing causing 2s response time

   Replace loop-based review loading with JOIN query.
   Add index on products.category_id for faster lookups.
   Reduces product listing from ~1,800ms to ~50ms."

  ✅ Committed + pushed
```

**Flow Summary:** pipe log → Claude analyzes → identifies N+1 query → fix → commit + push
**Time spent:** ~8 minutes (normally 1–3 hours of debugging)

---

### Flow 7: A Full Day's Work (Daily Workflow)

> **Scenario:** A simulated full workday for a developer using Claude Code.

```
┌──────────────────────────────────────────────────────────────────────┐
│  🌅 09:00 — Power on, start the day                                 │
└──────────────────────────────────────────────────────────────────────┘

$ cd ~/projects/ecommerce-api
$ claude -c                           ← resume yesterday's session

Claude: Hello! Yesterday we fixed the order duplication bug.
  What can I help with today?        ← Claude remembers thanks to session + memory

You: Three things today:
     1. Fix a bug QA reported — items can't be removed from the cart
     2. Build a feature to export orders as CSV
     3. Review PR #160 from a junior teammate

┌──────────────────────────────────────────────────────────────────────┐
│  🐛 09:15 — Fix the cart bug                                        │
└──────────────────────────────────────────────────────────────────────┘

You: Start with the cart bug — QA says clicking delete on a cart item
     doesn't remove it from the screen, but a refresh does.

Claude: Sounds like the API is returning the wrong response. Let me look.

  [read src/controllers/cart.controller.ts]
  [read src/services/cart.service.ts]

  Found it! cart.controller.ts:67
  The DELETE endpoint returns status 200 but doesn't include the updated
  cart, so the frontend doesn't know to update its state.

  📝 Edit → return the updated cart in the response body ✓
  📝 Write a test ✓
  📝 Run tests → passed ✓

You: /commit
Claude: ✅ Committed: "fix: return updated cart after item deletion"

┌──────────────────────────────────────────────────────────────────────┐
│  🆕 10:00 — Build the CSV export feature                            │
└──────────────────────────────────────────────────────────────────────┘

You: Next — build an API to export orders as CSV.
     - Admins only
     - Filter by date range
     - Support 100,000+ orders

  [press Cmd+T → enable Extended Thinking]

Claude: (Extended Thinking: needs to stream the CSV because 100K records
  shouldn't be loaded into memory all at once...)

  📋 Plan:
  1. Create GET /api/admin/orders/export?from=&to=&format=csv
  2. Use a streaming response (don't load it all into memory)
  3. Cursor-based pagination for the query
  4. Admin auth middleware
  5. Tests

  📝 Create src/services/order-export.service.ts ✓
  📝 Create src/controllers/admin/order-export.controller.ts ✓
  📝 Edit src/routes/admin.routes.ts ✓
  📝 Create tests (4 cases) ✓
  📝 Run tests → passed ✓

You: /commit
Claude: ✅ Committed: "feat: add CSV export for orders with streaming support"

┌──────────────────────────────────────────────────────────────────────┐
│  🔍 11:00 — Review the junior's PR                                  │
└──────────────────────────────────────────────────────────────────────┘

You: Review PR #160 from K — adding the coupon system.

Claude: Reviewing PR #160...

  [read PR diff — 12 files, +450/-23 lines]

  📋 Review summary:

  ✅ Strong points:
  - Coupon model design is good — has expiry, usage limit, minimum order
  - Tests cover 12 cases
  - Uses a transaction for coupon redemption

  ⚠️ Should fix:
  1. coupon.service.ts:34 — race condition: if two people redeem the same
     coupon simultaneously, usage_count may be wrong → recommend a
     database-level atomic increment
  2. coupon.validator.ts:12 — discount percentage has no max cap
     Setting discount: 200 produces a negative price

  💡 Minor:
  3. coupon.routes.ts:8 — no rate limiting on POST /coupons/apply

  Should I comment on the PR?

You: Yes, comment, and include suggested code.

Claude: ✅ Comment posted on PR #160
  → Includes code suggestions for all three points

┌──────────────────────────────────────────────────────────────────────┐
│  🍔 12:00 — Lunch                                                   │
└──────────────────────────────────────────────────────────────────────┘

  [shut down / leave it running]

┌──────────────────────────────────────────────────────────────────────┐
│  ☕ 13:00 — Resume work                                             │
└──────────────────────────────────────────────────────────────────────┘

$ claude -c                           ← resume; Claude remembers everything

Claude: Welcome back! This morning you finished:
  ✅ Cart bug — committed
  ✅ CSV export — committed
  ✅ PR #160 review — commented

  What's next?

┌──────────────────────────────────────────────────────────────────────┐
│  📝 13:30 — Add tests requested by tech lead                        │
└──────────────────────────────────────────────────────────────────────┘

You: Tech lead asked for integration tests for the entire payment flow.
     Right now we only have unit tests.

Claude: Got it. Let me look at what the payment flow includes...

  [survey payment-related files]

  Payment flows to test:
  1. Create order → process payment → confirm order
  2. Create order → payment failed → order cancelled
  3. Create order → payment → partial refund
  4. Create order → payment → full refund
  5. Create order → payment → dispute → refund

  📝 Create src/__tests__/integration/payment-flow.test.ts ✓
  📝 Create src/__tests__/integration/helpers/payment-mock.ts ✓
  📝 5 integration tests written
  📝 Run tests → 5 passed ✓

You: /commit
Claude: ✅ Committed: "test: add integration tests for complete payment flow"

┌──────────────────────────────────────────────────────────────────────┐
│  📊 15:00 — Open a PR for today's work                              │
└──────────────────────────────────────────────────────────────────────┘

You: /pr

Claude: Creating a PR for today's work...

  Branch: feature/daily-improvements-apr-16
  PR #161: "Fix cart deletion, add CSV export, payment integration tests"

  ## Summary
  - Fix: cart item deletion now returns the updated cart
  - Feat: admin CSV export for orders (streaming, 100K+ support)
  - Test: 5 integration tests for the complete payment flow

  ## Changes
  - 8 files changed, +680 lines, -12 lines
  - 3 commits

  ✅ PR #161 created

┌──────────────────────────────────────────────────────────────────────┐
│  🔄 16:00 — Schedule a task for tomorrow                             │
└──────────────────────────────────────────────────────────────────────┘

You: Schedule Claude to scan the error log every morning at 8:00
     and summarize anything unusual.

Claude: ✅ Scheduled task created
  → Every day at 08:00, will analyze the error log and summarize for you

┌──────────────────────────────────────────────────────────────────────┐
│  🌙 17:00 — End of day                                              │
└──────────────────────────────────────────────────────────────────────┘

You: End of day. Summarize what we did.

Claude: 📊 Today's summary:

  ✅ Completed:
  1. 🐛 Fix cart deletion bug — PR #161 (10 min)
  2. 🆕 Build CSV export — PR #161 (30 min)
  3. 🔍 Review PR #160 coupon system — commented (15 min)
  4. 📝 Write integration tests — PR #161 (20 min)
  5. ⏰ Set up daily error log check — scheduled

  📈 Stats:
  - Commits: 3
  - New files: 5
  - Edited files: 6
  - New tests: 11
  - PRs created: 1
  - PRs reviewed: 1

  See you tomorrow! 👋
```

**Daily Workflow Summary:**

| Time | Task | Actual time | Normal time (without Claude) |
|------|------|-------------|------------------------------|
| 09:15 | Fix cart bug | 10 min | 1 hour |
| 10:00 | Build CSV export feature | 30 min | 3–4 hours |
| 11:00 | Review PR #160 | 15 min | 1–2 hours |
| 13:30 | Write integration tests | 20 min | 2–3 hours |
| 15:00 | Create PR | 2 min | 15 min |
| **Total** | | **~1.5 hours** | **~8–10 hours** |

---

### Flow 8: CI/CD Pipeline With Headless Mode

> **Scenario:** You want Claude Code to review every PR automatically and to generate release notes for every release.

```
┌─────────────────────────────────────────────────────────────────┐
│  File .github/workflows/ai-review.yml                           │
└─────────────────────────────────────────────────────────────────┘

name: AI Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: curl -fsSL https://claude.ai/install.sh | bash

      - name: AI Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Pull the PR diff
          DIFF=$(git diff origin/main...HEAD)

          # Send it to Claude for analysis
          REVIEW=$(echo "$DIFF" | claude --bare -p "
            Review this code:
            1. Find bugs and security issues
            2. Check for performance problems
            3. Score it from 1 to 10
            4. Summarize as Markdown

            Reply in JSON format:
            {score, bugs, security, performance, summary}
          " --output-format json \
            --allowedTools "Read" \
            --max-turns 5 \
            --model sonnet)

          # Post a comment on the PR
          echo "$REVIEW" | jq -r '.result.summary' | \
            gh pr comment ${{ github.event.pull_request.number }} --body -

      - name: Block if Critical Issues
        run: |
          SCORE=$(echo "$REVIEW" | jq -r '.result.score')
          if [ "$SCORE" -lt 5 ]; then
            echo "❌ AI Review Score: $SCORE/10 — must fix before merging"
            exit 1
          fi
```

```
┌─────────────────────────────────────────────────────────────────┐
│  File .github/workflows/release-notes.yml                       │
└─────────────────────────────────────────────────────────────────┘

name: Auto Release Notes
on:
  release:
    types: [created]

jobs:
  generate-notes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate Release Notes
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Pull commits since the previous release
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD~1 2>/dev/null || echo "")
          COMMITS=$(git log ${PREV_TAG}..HEAD --oneline)

          # Have Claude generate release notes
          NOTES=$(echo "$COMMITS" | claude --bare -p "
            Create release notes from this commit list.
            Group into: Features, Bug Fixes, Improvements, Breaking Changes.
            Use English aimed at end users (not developers).
            Format: Markdown
          " --model sonnet --max-turns 3)

          # Update the release notes
          gh release edit ${{ github.event.release.tag_name }} \
            --notes "$NOTES"
```

**Result:**
- Every PR is automatically reviewed by AI and given a score
- PRs that score below 5 are blocked from merging
- Every release gets polished release notes automatically
- The team no longer has to do manual review/notes

---

### Side-by-Side Summary: Before vs. After Claude Code

| Task | Before (manual) | After (Claude Code) | Time saved |
|------|-----------------|---------------------|------------|
| Onboarding to a new project | 1–2 days | 10 min | 95% |
| General bug fix | 1–3 hours | 10–15 min | 85% |
| Building a new feature (CRUD) | 4–8 hours | 20–30 min | 90% |
| Refactoring a large file | 4–8 hours | 10 min | 95% |
| Code review on a big PR | 1–3 hours | 5 min | 90% |
| Production debugging | 1–3 hours | 8 min | 90% |
| Writing tests | 2–4 hours | 15–20 min | 85% |
| Creating a PR + description | 15–30 min | 1–2 min | 90% |
| Automated CI/CD review | Manual on every PR | 100% automated | 100% |
| **Daily total** | **8–10 hours** | **~1.5 hours** | **~85%** |

---

## Conclusion

Claude Code is a feature-complete AI tool for developers:

- **A powerful CLI** — 50+ commands and flags
- **Permission system** — from read-only to fully autonomous
- **Extensible** — via Skills, Hooks, Subagents, MCP, Plugins
- **Persistent context** — CLAUDE.md and Auto Memory
- **Parallel work** — Agent Teams and Worktrees
- **Cross-platform** — Terminal, Desktop, VS Code, JetBrains, Web, Mobile
- **Schedulable** — Scheduled Tasks and Cloud Routines
- **Git integration** — PRs, commits, reviews built in
- **Secure** — sandboxing, permissions, protected paths
- **Code Intelligence** — real-time type/error checking

---

> **Document version:** Last updated April 15, 2026
> **Applies to:** Latest Claude Code version (Claude Opus 4.6 / Sonnet 4.6 / Haiku 4.5)
