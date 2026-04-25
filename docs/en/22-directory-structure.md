---
title: "Directory Structure"
section: 22
lang: en
tags:
  - claude-code
  - directory-structure
  - reference
aliases:
  - "Directory Structure"
related:
  - "[[21-special-features]]"
  - "[[23-environment-variables]]"
---

# Directory Structure

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

---

## Navigation

- ⬅️ Previous: [[21-special-features]]
- ➡️ Next: [[23-environment-variables]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/22-directory-structure]]
