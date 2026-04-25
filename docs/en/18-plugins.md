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

---

## Navigation

- ⬅️ Previous: [[17-ide-integration]]
- ➡️ Next: [[19-session-management]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/18-plugins]]
