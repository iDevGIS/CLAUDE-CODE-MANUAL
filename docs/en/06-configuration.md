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
| **Want to use Opus on a critical project** | `model: "claude-opus-5"` | Lock the model per project |

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
- **Opus 5** (`claude-opus-5`) — the **new default Opus model** (since Claude Code 2.1.219); **1M context**; fast mode at **$10/$50 per Mtok**.
- **Opus 4.8** (`claude-opus-4-8`) — previous **Opus** flagship; top-tier coding and complex-bug analysis; defaults to **high effort** on demanding tasks.
- **Sonnet 5** (`claude-sonnet-5`) — the **new default in Claude Code** (since 2.1.197); balanced and fast, with a **native 1M-token context window** (promo pricing $2/$10 per Mtok through Aug 31, 2026).
- **Haiku 4.5** (`claude-haiku-4-5`) — fastest, cheapest; for easy/boilerplate tasks.
- Fast mode runs on **Opus 5 and Opus 4.8** (Opus 4.7 was removed from fast mode in 2.1.219).

### Example settings.json

```json
{
  "theme": "dark",
  "model": "claude-opus-5",
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

### New in v2.1.198

- **Organization default models** — admins set an org-wide default in the console; it shows as "Org default" (or "Role default") in `/model` until you pick a model yourself.
- **Streaming idle watchdog on by default** — a response stream that produces no events for 5 minutes is aborted and retried automatically; set `CLAUDE_ENABLE_STREAM_WATCHDOG=0` to disable.

### New in v2.1.208

- `axScreenReader` — opt into screen reader mode (plain-text rendering); same as `claude --ax-screen-reader` or `CLAUDE_AX_SCREEN_READER=1`.
- `vimInsertModeRemaps` — map two-key insert-mode sequences (e.g. `jj`) to Escape in vim mode.

### New in v2.1.216

- `sandbox.filesystem.disabled` — skip filesystem isolation for sandboxed commands while keeping network egress control.

### New in v2.1.217

- `emojiCompletionEnabled` — emoji shortcode autocomplete in the prompt input: type `:heart:` to insert ❤️, or a partial like `:hea` for suggestions; set to `false` to disable.

### New in v2.1.218

- **Server-managed settings prompt less** — benign feature and cost toggles pushed by your organization no longer trigger the settings-approval prompt.

### New in v2.1.219

- **Claude Opus 5** (`claude-opus-5`) — the new **default Opus model**: 1M context, and fast mode at $10/$50 per Mtok. Fast mode now runs on Opus 5 and Opus 4.8 (Opus 4.7 was removed from fast mode).
- `sandbox.network.strictAllowlist` — deny non-allowlisted hosts for sandboxed commands outright instead of prompting.
- `workflowSizeGuideline` — set the advisory Dynamic-workflow size guideline from any settings file; the `/config` row is hidden while a settings file sets it.

### New in v2.1.221

- **`sandbox.credentials` gained `mode: "mask"`** (Linux and WSL) — instead of denying the read outright, a sandboxed command reads a **sentinel copy** of the credential file, and the sandbox proxy substitutes the real value on egress. Mask the whole file, or only the spans captured by an `extract` regex. On macOS, file masking falls back to `deny`.

### New in v2.1.222

- **Remote Control auto-start is user-scope only** — repo-local settings (`.claude/settings.json` and `.claude/settings.local.json`) can no longer turn Remote Control auto-start **on**; they can still turn it **off**. Enable it at user scope via `/config`.

### New in v2.1.223

- **Owner wildcards for marketplace policy** — the `strictKnownMarketplaces` and `blockedMarketplaces` managed settings accept `"owner/*"` entries, so one line allows or blocks every marketplace repo under a GitHub org.
- **`modelOverrides` ignores unknown keys** — keys that aren't Anthropic model IDs are no longer treated as the session's canonical model ID; they're ignored, as documented.
- **Admin `env` merges per key** — server-delivered managed settings no longer disable the `env` block of a machine-local `managed-settings.json` or MDM profile; the two merge key by key.

### New in v2.1.224

- **More sandbox credential-masking options** — `extract` plus `onExtractNoMatch` for structured env values, `decode: "jwt"` with `maskClaims` for JWT-aware masking, and `awsPairs` / `sigv4` for AWS SigV4 re-signing. All of these need `network.tlsTerminate`, and they are honored only from user settings, managed settings, or `--settings`.
- **`crossSessionInbound` and `dialogExpiry`** — cross-session messages sent **to** a session running with bypassed permissions are held for your approval; messages going **to other** sessions auto-deliver.
- **Managed-settings approval stops re-prompting** — the approval prompt no longer re-appears after re-login or an organization switch when the organization's settings are unchanged.

### New in v2.1.232

- **`/config` rows for "Dialog expiry" and "Messages from your other sessions"** — the `dialogExpiry` and `crossSessionInbound` settings are editable from `/config`; cross-session inbound can be set to accept, hold, or refuse.
- **`additionalMarketplaces` and `allowedMarketplaces`** — friendlier aliases accepted for `extraKnownMarketplaces` and `strictKnownMarketplaces`.
- **`blockedMarketplaces` url entries also block git clones** — an enterprise-policy url entry for a bare repo URL keeps blocking that URL when the CLI classifies it as a git clone.
- **The managed-settings approval dialog is clearer** — it shows endpoint URLs, words telemetry-only changes more plainly, skips routine OpenTelemetry options, and now requires approval for server-managed sandbox binary overrides (`sandbox.bwrapPath`, `sandbox.socatPath`, `sandbox.ripgrep`).

### New in v2.1.233

- **`modelOverrides` silences the unrecognized-model diagnostic** — print mode writes a `[claude-code:unrecognized_model]` line to stderr when a request goes out for a model ID Claude Code doesn't recognize; mapping that ID in `modelOverrides` stops the message.

---

---

## Navigation

- ⬅️ Previous: [[05-permissions]]
- ➡️ Next: [[07-claude-md]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/06-configuration]]
