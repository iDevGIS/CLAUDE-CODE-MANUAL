---
title: "Beginner FAQ — Stuck? Start Here"
section: 37
lang: en
tags:
  - claude-code
  - beginner
  - faq
  - troubleshooting
aliases:
  - "Beginner FAQ"
  - "Stuck Start Here"
  - "First-timer FAQ"
related:
  - "[[24-troubleshooting]]"
  - "[[36-zero-to-first-win]]"
  - "[[05-permissions]]"
  - "[[31-cost-management]]"
---

# Beginner FAQ — Stuck? Start Here

> **Goal:** The stumbles first-timers hit most often, answered in plain language — don't worry, every one of these is fixable.

> Take a breath 🙂 Everything on this page has happened to everyone who started out, and every one has an easy fix. There is nothing you can press that breaks things beyond repair. Skim the questions, find the one that matches you, and follow the steps.

## Section 1 — Install & Launch

### ❓ I typed `claude` and got "command not found" / "not recognized"

This just means your computer **can't find the program yet** — it doesn't mean you broke anything. Usually it's because it isn't installed, or you just installed it and haven't opened a fresh window.

Try this, in order:

1. **Close the old terminal window and open a new one.** Surprisingly often that's all it takes — the old window doesn't know about a program you just installed.
2. If it's still missing, it isn't installed yet. Install it with:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
3. If `npm` is *also* "not recognized," you don't have Node.js yet — install Node.js first (see [[01-installation]] for step-by-step).

Open a new window and type `claude` again.

### ❓ Nothing prompts me to log in / login won't go through

The first time you open Claude Code it sends you to log in via your web browser. If that doesn't appear or hangs:

- Trigger the login directly:
  ```bash
  claude auth login
  ```
- Check whether you're already logged in:
  ```bash
  claude auth status
  ```
- If the browser opened but stalls, finish signing in there with your Claude/Anthropic account, then return to the terminal window.

Still no luck? Type `/doctor` inside the program — it checks what's wrong. See [[24-troubleshooting]] for more.

### ❓ Do I have to pay before I can even start?

You need an account that can use Claude Code (a Claude plan or an API account). Once login succeeds, you can start typing right away. For cost questions, see the "Money & Time" section below.

## Section 2 — While You're Using It

### ❓ I typed something and it just sits there / hangs / spins for a long time

Most of the time it's **actually thinking or working** — it isn't frozen — especially if you asked it to read lots of files or do something big. Give it a moment; there's usually a spinner or a status line.

- If it's been far too long and feels stuck, press `Ctrl+C` once to stop the current task, then try again.
- Want to see what it's doing under the hood? Press `Ctrl+O` to open the detail view (which files it's reading/editing).
- If it's a network issue, see "It's slow / my internet dropped" below.

### ❓ It popped up a permission box — what's the difference between y / n / a, and which should I pick?

That's Claude **asking your permission before doing something that could touch your files** (like editing a file or running a command). It's a good thing that it asks. The main choices:

| Press | Means | Use when |
|-------|-------|----------|
| **y** (yes) | Allow it **this one time** | You looked and it's fine |
| **n** (no) | **Refuse** — don't do it | Not sure / don't want this one |
| **a** (always / yes, allow) | Allow **this kind of thing from now on** — won't ask again | Something you're confident about repeatedly, e.g. reading files |

**Which should a beginner pick?** When in doubt, choose **y** (just this once) so you can see what it does — safer than "always" before you're comfortable. If you read it and don't understand or it feels off, choose **n**. Nothing is lost. More on permissions in [[05-permissions]].

### ❓ I want it to answer in my language

Just tell it. Type something like:

```
Please reply in English from now on.
```

To make it stick every time without repeating yourself, put it in your project's memory — type `/memory` and add a line like "Always reply in English," or see [[07-claude-md]] / [[08-memory]].

## Section 3 — Safety & Fear

### ❓ I'm scared it'll delete files or break my project — how safe is this?

Totally understandable — but Claude Code is **built to be careful**, with several layers protecting you:

- **It always asks first.** Before editing a file or running a command that could affect your stuff, it pops the permission box for you to press y/n (see Section 2). You're in control at every step.
- **Plan Mode.** If you want it to only "read and propose a plan" **without touching real files**, press `Shift+Tab` to switch to plan mode. Great for starting out — you see what it intends to do first.
- **Use git.** If your project is in git, every change is reversible — like a permanent undo button (see [[15-git-integration]]).
- **Important files are guarded.** Certain system files (like `.git/`) are specially protected.

Bottom line: answer the prompts + start in Plan Mode + keep git on = peace of mind.

### ❓ It made a wrong change — how do I undo it?

You can roll back, no panic needed:

- Press `Esc` twice (`Esc Esc`) to open the **Rewind** menu — it rewinds both code and conversation to an earlier point.
- Or type the `/rewind` command.
- If your project is in git, that's another way to revert.

### ❓ How do I stop it mid-task?

Press `Ctrl+C` once — it stops what it's doing immediately, and you can type a new instruction. You'll use this a lot when it starts heading the wrong way.

## Section 4 — Money & Time

### ❓ What are tokens / costs — is this expensive?

A **token** is the unit used to measure how much text you exchange with the AI (what you type, what it replies, plus files it reads). The longer the conversation and the more files it reads, the more tokens — which means more cost.

Don't stress; there are easy ways to watch and save:

- Type `/cost` to see how much you've used this session.
- Type `/clear` when you start a new task or change topics — it clears the old, unrelated conversation and saves a lot (sometimes cuts usage in half).
- More saving tips in [[31-cost-management]].

### ❓ It's slow / my internet dropped mid-task

Normally Claude Code **tries to reconnect on its own automatically.** Wait a moment and it usually comes back — no need to close the program.

- If it's genuinely stuck for a while, press `Ctrl+C` to stop the current task and try again.
- If problems persist, check that your internet is connected, then see [[24-troubleshooting]].

## Section 5 — Quit / Start Over

### ❓ How do I exit the program?

Press `Ctrl+D` or type `/exit`. Next time, just type `claude` again to reopen.

### ❓ I want to start fresh / clear the chat's memory

Type `/clear` — it clears the conversation in the current session so you start fresh, like opening a new chat. Great when you move to something unrelated, and it saves tokens too (see Section 4).

> Note: `/clear` only clears the **chat conversation** — it does not delete your work or code. Everything in your project stays intact.

### ❓ How do I update to a new version?

Run this outside the program (in your terminal):

```bash
claude update
```

If that doesn't work, try:

```bash
npm install -g @anthropic-ai/claude-code@latest
```

To check your current version, type `claude --version`.

---

> **Still stuck?** Type `/doctor` inside the program — it diagnoses problems across the board — and see [[24-troubleshooting]] for deeper issues. Remember, **no question is too basic.** Everyone was a first-timer once 💪

---

---

## Navigation

- ⬅️ Previous: [[36-zero-to-first-win]]
- ➡️ Next: [[38-cheat-sheet]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/37-beginner-faq]]
