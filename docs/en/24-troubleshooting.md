---
title: "Basic Troubleshooting"
section: 24
lang: en
tags:
  - claude-code
  - troubleshooting
aliases:
  - "Troubleshooting"
related:
  - "[[25-tips-best-practices]]"
  - "[[05-permissions]]"
---

# Basic Troubleshooting

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

---

## Navigation

- ⬅️ Previous: [[23-environment-variables]]
- ➡️ Next: [[25-tips-best-practices]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/24-troubleshooting]]
