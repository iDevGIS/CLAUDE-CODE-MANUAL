---
title: "Other Special Features"
section: 21
lang: en
tags:
  - claude-code
  - features
  - reference
aliases:
  - "Special Features"
related:
  - "[[22-directory-structure]]"
  - "[[23-environment-variables]]"
---

# Other Special Features

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

---

## Navigation

- ⬅️ Previous: [[20-scheduled-tasks]]
- ➡️ Next: [[22-directory-structure]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/21-special-features]]
