---
title: "IDE Integration"
section: 17
lang: en
tags:
  - claude-code
  - ide
  - editor
aliases:
  - "IDE Integration"
related:
  - "[[09-mcp-servers]]"
  - "[[15-git-integration]]"
---

# IDE Integration

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

---

## Navigation

- ⬅️ Previous: [[16-headless-mode]]
- ➡️ Next: [[18-plugins]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/17-ide-integration]]
