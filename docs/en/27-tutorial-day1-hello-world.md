---
title: "Tutorial Day 1: Hello World (Your First 30 Minutes)"
section: 27
lang: en
tags:
  - claude-code
  - tutorial
  - getting-started
  - beginner
aliases:
  - "Day 1 Tutorial"
  - "Hello World"
related:
  - "[[01-installation]]"
  - "[[28-tutorial-day2-first-project]]"
  - "[[33-use-cases-analogies]]"
---

# Tutorial Day 1: Hello World (Your First 30 Minutes)

> **Goal:** Install → talk to Claude → have it create your first file — all within 30 minutes
>
> If you make it through this, you'll have already "felt the power" of Claude Code

## What is Claude Code? (Explained for non-programmers)

Imagine you've hired a **computer-savvy coworker** to sit next to you all the time:

| You say | Claude Code does |
|---------|------------------|
| "Read the `app.js` file for me" | Opens the file, reads it, explains it |
| "Fix the bug in the login function" | Finds the bug, fixes it, saves the file |
| "Build a todo list website" | Creates the entire project for you |
| "Commit and push" | Runs the git commands for you |

**How is this different from ChatGPT?**
- ChatGPT: Just chat → you have to copy-paste code yourself
- Claude Code: **Lives on your machine** → can actually read/write/run

## Step 1: Install (5 minutes)

### Mac/Linux

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows

```powershell
irm https://claude.ai/install.ps1 | iex
```

### Verify the install

```bash
claude --version
```

If you see a version number (e.g. `2.1.114`) → success! If not, see [[01-installation|01. Installation]] for more details.

## Step 2: Your first conversation (5 minutes)

Create a test folder and open Claude:

```bash
mkdir hello-claude
cd hello-claude
claude
```

You'll enter chat mode — try typing:

```
Hi! Can you tell me what folder we're currently in?
```

Claude will:
1. Ask for permission to run `pwd` (press **Yes** or `1`)
2. Actually run the command
3. Reply with the folder you're in

**You just chatted with an AI that can actually run commands for the first time!**

> **Tip:** To exit, type `/exit` or press `Ctrl+D`

## Step 3: Have Claude create a file for you (10 minutes)

Try typing:

```
Please create a file called hello.html with:
- title "My First Claude Page"
- an h1 heading saying "I built this site with Claude Code"
- light blue background
- a "Click me" button that pops up an alert "Hello!"
```

Claude will:
1. Ask permission to create the file
2. Write the HTML/CSS/JS for you
3. Show you the content it's about to add

**Press Yes** → the `hello.html` file will be created

Try opening the file:

```bash
# Mac
open hello.html

# Windows
start hello.html
```

**You just told an AI to build a webpage for you in 10 seconds.**

## Step 4: Make edits (5 minutes)

While still in the chat, type:

```
Change the background color to pink and add a placeholder cat image
```

Claude will:
1. **Read the existing file**
2. Edit only what changes
3. Show you the diff

**Press Yes** → the file is updated. Refresh your browser and you're done.

> **See that?** Claude **remembers** what you talked about — no need to re-explain every time

## Step 5: Try running commands (5 minutes)

```
Create a git repo and commit the hello.html file
```

Claude will run:
- `git init`
- `git add hello.html`
- `git commit -m "..."`

**Press Yes** through each step → done! Your project now has version control.

## Day 1 Recap

In 30 minutes, you've:
- [x] Installed Claude Code
- [x] Talked to an AI that can run commands on your machine
- [x] Created your first web file
- [x] Edited a file by letting Claude read and update it on its own
- [x] Used git through Claude

## Day 1 Cautions

| Watch out for | Why |
|---------------|-----|
| Don't put passwords/api keys in chat | Claude may retain this context |
| Don't hit "Yes to all" on day one | See [[05-permissions]] |
| Don't let it delete uncommitted files | Hard to recover |

## Day 1 Quick Reference

| When you want to | Type |
|------------------|------|
| Start chat | `claude` |
| Exit | `/exit` or `Ctrl+D` |
| See help | `/help` |
| Clear context | `/clear` |
| Change mode | `/permissions` |
| See cost | `/cost` |

## What's Next

Now that you can **hold a conversation** — on Day 2 we'll **build a real project**

➡️ [[28-tutorial-day2-first-project|Day 2: Build a Todo App in 1 Hour]]

---

🌐 TH: [[../th/27-tutorial-day1-hello-world]]
