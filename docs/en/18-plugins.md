---
title: "Plugins"
section: 18
lang: en
tags:
  - claude-code
  - plugins
  - extensibility
aliases:
  - "Plugins"
related:
  - "[[11-skills]]"
  - "[[09-mcp-servers]]"
---

# Plugins

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
# From a local directory (also accepts a .zip archive)
claude --plugin-dir ./my-plugin

# Straight from a URL
claude --plugin-url <url>

# Install from the marketplace
/plugins install <plugin-name>
```

### Managing Plugins

```
/plugins              # Browse and manage (the Discover tab suggests plugins matching the current directory)
/reload-plugins       # Reload plugins without restarting
```

```bash
claude plugin prune              # Remove orphaned auto-installed plugin dependencies
claude plugin uninstall --prune  # Uninstall and cascade-remove its orphaned deps
```

### New in v2.1.191

- `claude plugin init <name>` scaffolds a plugin under `.claude/skills`; plugins there auto-load (no marketplace).
- `/plugin list` lists installed plugins (`--enabled` / `--disabled`).

### New in v2.1.221

- **Installs activate immediately when safe** — a plugin installed from `/plugin` starts working right away instead of always waiting for `/reload-plugins`.
- **`/plugin install` retries on a stale catalog** — it refreshes the marketplace catalog and tries again before reporting a plugin as not found.
- **`skills` accepts `"."`** — point a plugin's `skills` path at the plugin root; the root-level `SKILL.md` validation error now suggests it too.
- **`claude plugin validate` warns about unusable names** — it flags a marketplace or plugin name that Claude Desktop's managed marketplace sync would reject.

### New in v2.1.224

- **`archive` plugin source** — install a plugin from a zip served over HTTPS, with no git and no npm involved; pin the download to an expected SHA-256 to verify what you install.

> **Manifest note:** a plugin manifest can declare `"defaultEnabled": false` to ship disabled by default.

### New in v2.1.229

- **`command` marketplace source** — a marketplace can point at a local command (for example an IDE) that prints the plugin directory. The path is re-resolved at the start of every session and applied without restarting Claude Code; with `mode: "link"` the directory is used in place instead of being copied.

### New in v2.1.232

- **GitLab marketplaces** — bare `gitlab.com` repo URLs, including nested subgroups, now clone the same way `github.com` URLs do, and a clone auth failure names your actual git host in the hint.
- **`additionalMarketplaces` / `allowedMarketplaces`** — friendlier aliases for the `extraKnownMarketplaces` and `strictKnownMarketplaces` settings.
- **`/plugin install plugin@marketplace` refreshes the marketplace first** — a plugin published after your last refresh installs without a manual marketplace update.

### New in v2.1.238

- **`headersHelper` on a url marketplace or a catalog entry** — it runs a command that mints HTTP headers (for example a short-lived token) used for catalog fetches and same-origin archive fetches.
- **A catalog entry's `headersHelper` runs only on install or update** — of that one plugin, and only after its command is shown to you; `claude plugin install` / `claude plugin update` ask `[y/N]` first (or pass `-y`). See [[02-cli-commands]].

---

---

## Navigation

- ⬅️ Previous: [[17-ide-integration]]
- ➡️ Next: [[19-session-management]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/18-plugins]]
