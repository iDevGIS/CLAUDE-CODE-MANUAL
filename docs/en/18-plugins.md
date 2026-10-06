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

### New in v2.1.239

- **Plugins synced from claude.ai show as `name@synced`** — in cloud sessions they work with `claude plugin enable/disable <name>@synced`, and never override a same-named plugin you installed yourself.

### New in v2.1.259

- **`--json` on `claude plugin validate`** — prints a machine-readable validation report, handy for scripts and CI. See [[02-cli-commands]].

### New in v2.1.260

- **`/reload-plugins` works in headless sessions** — it now appears in the Claude Code Desktop and SDK command lists. See [[16-headless-mode]].

### New in v2.1.265

- **`--plugin-dir` accepts a folder of plugins** — point it at a parent folder and every child folder with a manifest loads; children added or removed while Claude is running are picked up. See [[02-cli-commands]].

### New in v2.1.273

- **Signing in asks for your claude.ai plugins too** — signing in with a Claude account now also requests access to the plugins on your claude.ai account.

### New in v2.1.275

- **Plugins enabled on claude.ai sync to the terminal** — a session signed in with that Claude account picks up the plugins turned on in your claude.ai account; opt out with `syncClaudeAiPlugins: false`. See [[06-configuration]].
- **`/plugin install <plugin> --marketplace <source>`** — installs a plugin from a named marketplace, offering to add that marketplace first when it isn't added yet. See [[03-slash-commands]].

### New in v2.1.280

- **Marketplace names that imitate a reserved one are refused** — a marketplace whose name imitates a reserved marketplace name is rejected when added, and stops loading if it was already added.
- **A plugin's recorded commit survives an update** — updating a plugin from a GitHub repository or git URL that tracks a branch or tag no longer leaves `installed_plugins.json` pinned to the install-time commit, and `claude plugin update` no longer moves a plugin to version "unknown" when the official marketplace's snapshot file is a link or too large.
- **An off skill is no longer shown as broken** — a skill you switched off shows a dim ◯ in `/plugin` and `/skills`, instead of the red ✘ used for a plugin that failed to load. See [[11-skills]].

### New in v2.1.281

- **`claude plugin validate` checks MCP servers** — it reports `.mcp.json` entries that would be silently dropped at load, undeclared `${user_config.*}` references, and insecure URLs. See [[09-mcp-servers]].
- **Unquoted `${CLAUDE_PLUGIN_ROOT}` warning** — `claude plugin validate` warns when a shell-form hook leaves `${CLAUDE_PLUGIN_ROOT}` unquoted (it breaks on plugin paths with spaces), and plugin hook-failure errors now name the offending plugin.

### New in v2.1.285

- **`claude plugin configure <plugin>`** — shows a plugin's options and which are unset, or saves new values read from stdin with `--values-stdin`. See [[02-cli-commands]].
- **`claude plugin install --config <server>.<key>=<value>`** — sets a bundled `.mcpb` MCP server's own settings at install time, so it starts without visiting `/plugin` → Configure. See [[09-mcp-servers]].
- **Unconfigured `.mcpb` servers are no longer skipped silently** — `/plugin`, the install message and `claude plugin install` say when a bundled `.mcpb` MCP server still needs configuration and point to Configure.

### New in v2.1.286

- **Stricter npm plugin sources** — plugin installs refuse npm sources that are git repositories or folders, and install plugin dependencies only from registry packages.
- **Clearer errors for a refused marketplace** — plugin errors for a marketplace Claude Code refuses to load now say why and how to fix it instead of "not found".

### New in v2.1.287

- **Claude Mods** — plugins may now modify deeper behavior.
- **"You should know" built-in mod** — a side agent watches your back and flags things you or Claude might miss; turn it on with `/plugin enable cc-plugin-you-should-know@builtin` (first-party sessions with telemetry on).
- **Plugin listings note missing dependencies** — and updating a plugin now retries an install that did not finish; marketplace errors say in plain words why a marketplace was ignored or refused and what to do.

### New in v2.1.288

- **`$.ui.selection()` for mods** — returns the text you last selected in fullscreen mode and, when the selection lies within one transcript row, that row.
- **Plugin LSP `requestTimeout`** — LSP tool calls now time out after 60s instead of hanging when a language server uses dynamic capability registration or stops responding; set a per-server `requestTimeout` to change it.
- **GitHub-source installs fall back to HTTPS** — `claude plugin install` on macOS and Linux machines with no GitHub SSH key now clones over HTTPS and prints a notice.

### New in v2.1.289

- **`agent.spawn` for teammates** — a mod can now spawn teammates through `agent.spawn`.
- **One agent id across plugin hook events** — a plugin sees the same agent id for a given agent in every hook event, so it can correlate events instead of matching by name.
- **`idle` and `waiting` states in `$.agent.list()`** — the agent list now reports when an agent is idle or waiting, alongside the states it already returned.

### New in v2.1.290

- **`serverToolUses` in a mod's `turn.step` result** — the tool calls the API ran itself (the advisor), each with its id, name, input, start and end.
- **`agentId` on the plugin hooks `tool.check` event** — a hook can tell a subagent's permission check from the main session's.
- **`ceiling` in `tool.check`** — the question and verdict a mod's `tool.check` hook reads now name the approval an organization requires for a tool.
- **`ThemeKey` and `Color` types** in the plugin hooks typings, so an editor lists the theme colors a mod's drawing can name.
- **`claude plugin validate` lists gating hooks** — each hook a mod registers at a gating site is listed with whether it has a `.catch` (`gatingHooks` under `--json`).
- **Plugin hooks clip long text** — long text is now clipped and logged instead of being refused or dropped silently; a `$.process.spawn` denied by another mod after the child ran now says the call ran and a plugin withheld its result.

### New in v2.1.292

- **`claude plugin install --marketplace <source>`** — adds the marketplace if needed, under the same policy checks as `claude plugin marketplace add`, then installs the plugin from it.
- **`prompt.autocomplete` event** — a mod hooks it to add its own rows to the prompt box's autocomplete list.
- **Prompt caching in `$.model.complete`** — `prompt` and `system` take blocks of text, and `cache: true` on a block caches the request up to it.
- **Workflow agents in `agent.spawn`** — the mod hook now sees workflow agents, with their run and index, so a mod can refuse them.
- **`claude plugin test` no longer passes silently** — a failed `expect` inside a hook the test registered, or a stub answer the engine refuses, now fails the test.

---

---

## Navigation

- ⬅️ Previous: [[17-ide-integration]]
- ➡️ Next: [[19-session-management]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/18-plugins]]
