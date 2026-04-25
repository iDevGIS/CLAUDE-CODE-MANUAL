---
title: "Keyboard Shortcuts"
section: 4
lang: en
tags:
  - claude-code
  - keyboard
  - shortcuts
aliases:
  - "Keyboard Shortcuts"
related:
  - "[[02-cli-commands]]"
  - "[[03-slash-commands]]"
---

# Keyboard Shortcuts

### Benefits and Use Cases

> **Why use keyboard shortcuts?**
>
> Shortcuts let you **control Claude Code quickly without taking your hands off the keyboard** — reducing the time spent switching modes, canceling work, or opening features.

**Use Cases:**

| Scenario | Shortcut | Description |
|----------|----------|-------------|
| **Claude is going down the wrong path** | `Ctrl+C` | Stop immediately — no need to wait. Saves time and money |
| **Want to see which tools Claude used** | `Ctrl+O` | Open the Transcript Viewer to see every tool call and every file read/edited |
| **Claude is running tests for a while; want to do something else** | `Ctrl+B` | Move the task to the background and start typing a new command |
| **Switch from safe mode to auto** | `Shift+Tab` | Switch permission mode immediately — no need to open settings |
| **Claude edited code wrong, want to undo** | `Esc + Esc` | Open the Rewind menu to roll back code and conversation |
| **Want to switch models mid-session** | `Cmd+P` / `Meta+P` | Open the model picker — switch from Opus to Sonnet or vice versa |
| **Hard problem, need deep thinking** | `Cmd+T` / `Meta+T` | Turn on Extended Thinking for deeper analysis |
| **Want a quick answer, not exhaustive** | `Meta+O` / `Alt+O` | Turn on Fast Mode for faster replies |
| **Want to paste a screenshot for Claude to see** | `Ctrl+V` / `Cmd+V` | Paste an image from the clipboard so Claude can analyze UI, error screens, etc. |
| **Want to type a multiline prompt** | `\ + Enter` or `Shift+Enter` | Add a newline instead of submitting — handy for long instructions |

### General Controls

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel the current input/generation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+L` | Clear the input field |
| `Ctrl+O` | Toggle the Transcript Viewer (see tool details) |
| `Ctrl+R` | Search command history |
| `Ctrl+V` / `Cmd+V` | Paste an image from the clipboard |
| `Ctrl+B` | Move the current task to the background |
| `Ctrl+T` | Toggle the task list |
| `Ctrl+X Ctrl+K` | Stop all background agents |
| `Shift+Tab` / `Alt+M` | Toggle permission mode |
| `Esc + Esc` | Open the Rewind/Checkpoint menu |

### Text Editing

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Delete from the cursor to the end of the line |
| `Ctrl+U` | Delete from the cursor to the start of the line |
| `Ctrl+Y` | Paste the most recently deleted text |
| `Alt+B` | Move the cursor back one word |
| `Alt+F` | Move the cursor forward one word |

### Switching Models and Modes

| Shortcut | Action |
|----------|--------|
| `Cmd+P` / `Meta+P` | Open the model picker |
| `Cmd+T` / `Meta+T` | Toggle Extended Thinking |
| `Meta+O` / `Alt+O` | Toggle Fast Mode |

### Multiline Input

| Method | Shortcut |
|--------|----------|
| Quick escape | `\ + Enter` |
| macOS | `Option+Enter` |
| iTerm2/WezTerm/Ghostty/Kitty | `Shift+Enter` |
| Readline | `Ctrl+J` |

### Special Input

| Key/Symbol | Action |
|------------|--------|
| `Space` (hold) | Push-to-talk: speak instead of typing |
| `@` | Auto-search files |
| `/` (start of line) | Show commands/skills |
| `!` (start of line) | Enter Bash mode |
| `Up/Down` | Browse command history |

### Vim Mode (enable via `/config`)

**Mode switching:** `Esc` (to NORMAL), `i/I/a/A/o/O` (to INSERT)

**Movement:** `h/j/k/l` (arrows), `w/e/b` (words), `0/$` (start/end of line), `gg/G` (start/end of document)

**Editing:** `x` (delete character), `dd/D` (delete line), `yy` (copy), `p/P` (paste), `>>/<<` (indent)

---

---

## Navigation

- ⬅️ Previous: [[03-slash-commands]]
- ➡️ Next: [[05-permissions]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/04-keyboard-shortcuts]]
