---
title: "Pocket Cheat Sheet"
section: 38
lang: en
tags:
  - claude-code
  - beginner
  - cheat-sheet
  - reference
aliases:
  - "Cheat Sheet"
  - "Pocket Cheat Sheet"
  - "Quick Reference"
related:
  - "[[02-cli-commands]]"
  - "[[03-slash-commands]]"
  - "[[04-keyboard-shortcuts]]"
  - "[[36-zero-to-first-win]]"
---

# Pocket Cheat Sheet

> **Goal:** Everything a beginner needs, on one page — print it and tape it next to your screen

## 🚀 Get Started in 4 Steps

| Step | Do this | Type |
|:--:|--------|------|
| 1️⃣ | Go into your work folder | `cd my-folder` |
| 2️⃣ | Open Claude | `claude` |
| 3️⃣ | Ask in **plain language** | `read the files in this folder for me` |
| 4️⃣ | It asks permission → approve | `y` then `Enter` |

> 💡 Remember just 3 things: `cd` → `claude` → type your task, then answer `y`

## 💻 Launch Commands

| Type in terminal | What you get |
|------|--------|
| `claude` | Start fresh (keep chatting back and forth) |
| `claude -c` | Continue where you left off — it remembers |
| `claude -p "question"` | Quick ask, answers, then exits — no session |
| `claude update` | Update to the latest version |

```bash
claude -p "summarize the README in 2 lines"
```

## ⚡ Common Slash Commands

> Type `/` at the start of a line to open the command menu

| Command | What it does |
|------|--------|
| `/help` | Get help / see every command |
| `/clear` | Wipe memory, start the chat over |
| `/compact` | Chat got long? Shrink it so you can keep going |
| `/model` | Switch brains (Opus / Sonnet / Haiku) |
| `/rewind` | Go back in time (code + conversation) |
| `/cost` | See how much you've spent so far |
| `/config` | Open settings |
| `/exit` | Quit the program |

## 🎹 Must-Know Keyboard Shortcuts

| Press | What you get |
|------|--------|
| `Ctrl + C` | **Stop!** Cancel what it's doing right now |
| `Esc` `Esc` | Go back (tap Esc twice) — opens the rewind menu |
| `Shift + Tab` | Switch safety mode (e.g. enter Plan Mode) |
| `Ctrl + D` | Quit the program |
| `@` | Attach a file (type `@`, filenames pop up) |
| `!` | Run a bash command directly (e.g. `!ls`) |

## 💬 "I want it to... so I type this"

> Just give the task in plain language — no commands to memorize

| You want | Type this | It will... |
|--------|-----------|---------|
| 📖 Understand code | `explain app.py to me` | Read it and explain in plain words |
| 🐞 Fix a bug | `I run it and get this error, please fix` | Find the cause and fix it |
| 📄 Create a file | `make a simple index.html homepage` | Write the new file for you |
| 🧪 Write tests | `write tests for this function` | Create a test file covering cases |
| 📝 Summarize git | `summarize what the last 10 commits did` | Read the git log and sum it up |
| 🌐 Translate | `translate the comments in this file to English` | Rewrite the comments for you |

## 🛟 Emergency

| Symptom | Do this |
|------|--------|
| 😱 It did the wrong thing | Press `Esc` `Esc` |
| 🧊 Frozen / slow / looping | Press `Ctrl + C` |
| 😵 Lost, no idea what to do | Type `/help` |
| 😨 Scared it'll break things | Enter **Plan Mode** first (`Shift + Tab`) — let it show a plan before acting |

> ✅ **Golden rule:** unsure about anything? Hit `Esc` `Esc` first — it's the safest move

---

---

## Navigation

- ⬅️ Previous: [[37-beginner-faq]]
- ➡️ Next: [[39-dynamic-workflows]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/38-cheat-sheet]]
