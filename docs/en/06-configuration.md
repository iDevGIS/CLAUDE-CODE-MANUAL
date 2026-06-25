---
title: "Configuration"
section: 6
lang: en
tags:
  - claude-code
  - configuration
  - settings
aliases:
  - "Configuration"
related:
  - "[[05-permissions]]"
  - "[[07-claude-md]]"
  - "[[23-environment-variables]]"
---

# Configuration

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
| **Want to use Opus on a critical project** | `model: "claude-opus-4-8"` | Lock the model per project |

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

### Model Lineup

Set the `model` key to any of these (newest → cheapest):

- **Fable 5** (`claude-fable-5`) — Anthropic's newest **Mythos-class** model and the most capable model generally available; introduced in Claude Code **2.1.170**. Ships with a **1M-token context window by default**. Best for the hardest reasoning, large-context, and agentic work.
- **Opus 4.8** (`claude-opus-4-8`) — flagship **Opus**; top-tier coding and complex-bug analysis; defaults to **high effort** on demanding tasks.
- **Sonnet 4.6** (`claude-sonnet-4-6`) — balanced, fast; recommended default for general coding.
- **Haiku 4.5** (`claude-haiku-4-5`) — fastest, cheapest; for easy/boilerplate tasks.
- Fast mode still uses **Opus 4.7** (and now works on Opus 4.8 too).

### Example settings.json

```json
{
  "theme": "dark",
  "model": "claude-opus-4-8",
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
| `fallbackModel` | Up to 3 fallback models tried in order when the primary is overloaded/unavailable |
| `availableModels` + `enforceAvailableModels` (managed) | Allowlist of selectable models; when enforced, even the Default falls back to the first allowed model and user/project settings can't widen it |
| `requiredMinimumVersion` / `requiredMaximumVersion` (managed) | Refuse to start outside an allowed Claude Code version range |
| `respondToBashCommands` | Whether `!` bash output is auto-answered (default true) |
| `language` | Pin the language used for generated session titles |
| `attribution.sessionUrl` | Omit the claude.ai session link from commits/PRs |
| `disableBundledSkills` | Hide bundled skills/workflows/built-in slash commands |
| `teammateMode: "iterm2"`, `footerLinksRegexes`, `wheelScrollAccelerationEnabled` | Terminal/UX options |
| `sandbox.credentials` | Block sandboxed commands from reading credential files / secret env vars |
| `sandbox.allowAppleEvents` | Opt-in to let sandboxed commands send Apple Events (macOS) |

### `/config` and `/model` Persistence

`/config` changes now persist to `~/.claude/settings.json` and participate in the project/local/policy override precedence. `/model` changes apply to the **current session only** (press `d` to set the default); the selection is remembered as the default for new sessions. The `/effort` slider is labelled **Faster / Smarter**.

---

---

## Navigation

- ⬅️ Previous: [[05-permissions]]
- ➡️ Next: [[07-claude-md]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/06-configuration]]
