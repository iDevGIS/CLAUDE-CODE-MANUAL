# taskflow-tools — Claude Code Plugin Example

A minimal plugin showing the standard structure: `plugin.json` + `commands/` + `agents/`.

## Install (locally)

```bash
mkdir -p ~/.claude/plugins
ln -s "$(pwd)" ~/.claude/plugins/taskflow-tools
claude
> /plugins
# enable taskflow-tools
```

After enabling, the following are available in any project:
- Slash command: `/ping [url]` — health-check the TaskFlow server
- Subagent: `taskflow-helper` — general helper for zero-dep Node projects

## Layout

```
plugin-example/
├── plugin.json          # plugin manifest
├── commands/
│   └── ping.md          # /ping slash command
└── agents/
    └── helper.md        # taskflow-helper subagent
```

## Why a plugin (vs. project-local config)

- **Reuse across projects** — drop the same agent into 10 services without copying files.
- **Versioning** — share via git, pin per-project via `~/.claude/settings.json`.
- **Distribution** — bundle slash commands + subagents + skills + MCP server config in one unit.

## Don't

- Don't put project-specific rules here. Those belong in the project's `CLAUDE.md`.
- Don't request broad permissions. Plugin commands inherit user permissions; keep `allowed-tools` narrow.
