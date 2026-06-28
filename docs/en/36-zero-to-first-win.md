---
title: "Zero to First Win (Absolute Beginner)"
section: 36
lang: en
tags:
  - claude-code
  - beginner
  - tutorial
  - getting-started
aliases:
  - "Zero to First Win"
  - "Absolute Beginner"
  - "First Win"
related:
  - "[[01-installation]]"
  - "[[27-tutorial-day1-hello-world]]"
  - "[[35-glossary]]"
  - "[[37-beginner-faq]]"
---

# Zero to First Win (Absolute Beginner)

> **Goal:** From knowing nothing → seeing your first result in 15 minutes. Follow each step exactly, no thinking required.

This page is written for **someone who has never touched coding at all**. If you can use a phone, browse Facebook, or shop online — you can absolutely do this. 🙂

We won't use scary jargon. Just **read one step → do what you see → click what it says**. That's it.

Something on your screen doesn't match the picture? Don't panic — scroll to the nearest **💡 Common confusion** box next to that step.

---

## Step 0: Check what you need before starting

First, let's make sure you have everything. It's just 2 things:

- ✅ **A computer** — any one works: Windows (laptop/PC) or Mac (MacBook/iMac)
- ✅ **Internet** — a normal connection (home Wi-Fi is fine)

**You do NOT need:**
- ❌ to be good with computers
- ❌ to have ever written a program
- ❌ perfect English (you can give commands in plain language)

> 💡 **Common confusion: "Will my computer handle it?"**
> Yes. Claude Code runs on Anthropic's servers, so it won't strain your machine. It just needs to get online. Even a 5-6 year old computer works fine.

Ready? Let's go. 👇

---

## Step 1: Install Node.js (the base program Claude needs)

Claude Code needs a small helper called **Node.js** first (install it once, never again). Here's how:

1. Open your web browser (Chrome / Edge / Safari — any is fine)
2. Type this web address and press Enter:

```
nodejs.org
```

3. The page has a **big green button** in the middle that says **"LTS"** — click it. (LTS = the most stable version, recommended for everyone.)
4. A file downloads to your computer. Wait until it finishes, then **double-click** it to open.
5. An installer window pops up — **keep clicking "Next"**. Don't check any extra boxes. If you see "Agree/Accept," accept it. Finally click **"Install" / "Finish"**.

👀 **What you'll see (the nodejs.org page):**

```
┌─────────────────────────────────────────────┐
│              Node.js                         │
│                                              │
│   Download Node.js (LTS)   ← click green     │
│   [  ⬇  v22.x.x  LTS  ]                       │
│                                              │
│   Recommended for most users                 │
└─────────────────────────────────────────────┘
```

### Check it installed correctly

After installing, let's confirm it works. For this you need to open the **command window** first:

- **Windows:** Click Start (the Windows logo, bottom-left) → type `PowerShell` → open **Windows PowerShell**.
- **Mac:** Press `Command (⌘) + Spacebar` together → type `Terminal` → press Enter.

A dark (or blue) window appears. Type this line and press Enter:

```bash
node -v
```

👀 **What you'll see:**

```
PS C:\Users\YourName> node -v
v22.11.0
```

If it shows a number like `v22.x.x` (the exact digits don't matter) = **success!** ✅

> 💡 **Common confusion: it says `node : command not found` or `node is not recognized`**
> This means Node.js didn't finish installing, or you haven't **closed and reopened** the PowerShell/Terminal window. Fix: close that dark window, open a fresh one, and type `node -v` again. Still nothing? Reinstall Node.js by repeating Step 1.

---

## Step 2: Install Claude Code

Now that we have Node.js, let's install **Claude Code**. In the **same window** (PowerShell on Windows / Terminal on Mac), type this long line and press Enter:

```bash
npm install -g @anthropic-ai/claude-code
```

> Tip: Afraid of a typo on a long line? **Copy the whole line** from this page and paste it into the window (Windows: right-click to paste / Mac: press `⌘ + V`).

Wait a moment (10-60 seconds depending on your internet). Text will scroll across the screen — **that's normal, don't panic**. Wait until it stops and returns to the prompt line.

👀 **What you'll see:**

```
PS C:\Users\YourName> npm install -g @anthropic-ai/claude-code

added 254 packages in 23s

PS C:\Users\YourName> _
```

When you see `added ... packages` and the cursor blinks on a new line = **installed!** ✅

> 💡 **Common confusion: lots of red / yellow text appears**
> Yellow text (warnings) can mostly **be ignored** — not a problem. But if it's red and ends with `permission denied` or `EACCES`:
> - **Mac:** type this instead → `sudo npm install -g @anthropic-ai/claude-code`. It will ask for your computer password (type it — the screen won't show dots, that's normal) and press Enter.
> - **Windows:** close PowerShell and reopen it as **"Run as Administrator"** (right-click the PowerShell icon → Run as administrator), then run the same command again.

---

## Step 3: Open Claude Code for the first time

Before opening, let's make a **folder** to hold your work (like creating an empty folder for documents). In the **same window**, type one line at a time (type the first line, press Enter, then type the next):

```bash
mkdir my-first-claude
cd my-first-claude
```

- `mkdir my-first-claude` = create a folder named `my-first-claude`
- `cd my-first-claude` = step into that folder (cd stands for "change directory")

Then type the magic word and press Enter:

```bash
claude
```

👀 **What you'll see (the very first time):**

```
┌────────────────────────────────────────────┐
│  ✻ Welcome to Claude Code                    │
│                                              │
│  Let's get you logged in.                    │
│                                              │
│  Open this URL in your browser to login:     │
│  https://claude.ai/oauth/authorize?...       │
│                                              │
│  Waiting for authentication...               │
└────────────────────────────────────────────┘
```

See the login message with a long link? Great — on to the next step. 👇

> 💡 **Common confusion: typing `claude` says `command not found`**
> Close the dark window and open a fresh one (your computer needs to "notice" the newly installed program). Then type `cd my-first-claude` followed by `claude` again. This usually fixes it.

---

## Step 4: Log in

The first time you open Claude, it asks you to log in to confirm it's really you. Here's how:

1. The window shows a long link starting with `https://claude.ai/oauth/...`
   - **Click that link** (on some setups: hold `Ctrl` and click / on Mac, hold `⌘` and click).
   - If you can't click it, drag to **copy the whole link** and paste it into your browser's address bar yourself, then Enter.
2. Your browser opens Claude's login page — **sign in with your email** (or click "Continue with Google" if you use Gmail — that's easiest).
3. Once logged in, the page shows an **"Authorize"** button — click it.
4. The page says it succeeded. Now **go back to the dark window (PowerShell/Terminal)**.

👀 **What you'll see (back in the command window):**

```
┌────────────────────────────────────────────┐
│  ✓ Login successful!                          │
│                                              │
│  ✻ Claude Code                                │
│                                              │
│  > _                                          │
│    Type anything here...                      │
└────────────────────────────────────────────┘
```

See the `>` symbol with a blinking cursor = **ready for your commands!** 🎉

> 💡 **Common confusion: the browser doesn't pop up on its own / no login page appears**
> No problem. Copy the long link in the command window (highlight the whole line → right-click copy), open your browser yourself, paste the link into the address bar at the top, and press Enter. That reaches the login page too.

---

## Step 5: Your first "win" — give a command in plain language

Now for the fun part! The cursor is blinking after `>`. Just **type in plain English** like you're asking an assistant. Try typing this and press Enter:

```bash
Please create a file hello.txt that says "Hello from Claude"
```

Claude reads what you typed, thinks for a second, and says it's about to create the file for you.

👀 **What you'll see:**

```
> Please create a file hello.txt that says "Hello from Claude"

  Sure! I'll create hello.txt for you.

  ● Write(hello.txt)
    Content: Hello from Claude
```

Here it will **pause and ask** "do you actually want to create this file?" — on to the next step. 👇

> 💡 **Common confusion: can I type in my own language?**
> 100% yes! Claude understands many languages very well. You can give commands in Thai, Spanish, Japanese — no need to translate to English. If characters look garbled, try the newer Windows Terminal, or Mac's Terminal, which fully support non-English text.

---

## Step 6: Answer the permission box

For safety, Claude **always asks first** before changing files on your computer — that's a good thing! You stay in control the whole time.

A box pops up asking something like "may I create/edit this file?" with options.

👀 **What you'll see:**

```
┌────────────────────────────────────────────┐
│  Claude wants to create hello.txt            │
│                                              │
│  Hello from Claude                           │
│                                              │
│  Do you want to proceed?                     │
│  ❯ 1. Yes                                     │
│    2. Yes, and don't ask again               │
│    3. No, tell Claude what to do differently  │
└────────────────────────────────────────────┘
```

Choose **option 1 (Yes)**. Two ways:
- Press `1` then Enter, **or**
- Use the up/down arrow keys to move the `❯` arrow in front of "Yes," then press Enter.

That's it — Claude goes ahead and actually creates the file. ✅

> 💡 **Common confusion: which option should I pick?**
> - **Option 1 (Yes)** = allow just this once — safest, recommended for beginners.
> - **Option 2 (Yes, and don't ask again)** = allow and stop asking — more convenient, but you might wave through other actions. Use it once you're comfortable.
> - **Option 3 (No)** = decline, then tell Claude what to do instead.
> Beginners: just **press 1 every time** for now.

---

## Step 7: See the result + open the file 🎉

Claude tells you it's done.

👀 **What you'll see:**

```
  ● Write(hello.txt) ✓
    Created hello.txt successfully. ✅

> _
```

**Let's open the real file!** Two ways — pick whichever you like:

**Way 1 — let Claude show it:** type this in the same window and Enter

```bash
Show me the contents of hello.txt
```

Claude reads the file and displays `Hello from Claude` right there for you.

**Way 2 — open it with your own eyes:** open your file manager (Windows = File Explorer / Mac = Finder), go to the `my-first-claude` folder (usually under C:\Users\YourName\ on Windows, or Home on Mac). You'll see the file **hello.txt** waiting there — double-click to open it and read what Claude wrote.

🎉🎉 **Congratulations! This is your first creation with Claude Code!** 🎉🎉

You just commanded an AI in plain language, and it created a real file on your computer. Fifteen minutes ago you knew nothing — well done! 👏

---

## What to do next?

If you're having fun, keep giving more commands, like:

- `Please create a file todo.txt with a shopping list of 5 items`
- `What files are in this folder?`
- `Please edit hello.txt and add a new line that says "Nice weather today"`

Want to quit Claude? Type `/exit` and Enter (or press `Ctrl + C` twice).

Then keep learning with these hand-held chapters:

- 📘 **[[27-tutorial-day1-hello-world]]** — the full Day 1 lesson; have Claude build you a tiny website
- 🃏 **[[38-cheat-sheet]]** — a cheat sheet of common commands you can type along with
- 📖 **[[35-glossary]]** — hit a word you don't know? Look it up here
- ❓ **[[37-beginner-faq]]** — the questions beginners ask most

> **Remember:** there are no dumb questions, and you can't "break your computer" just by typing commands to chat with Claude. Claude asks before changing anything — play around freely. 💪

---

---

## Navigation

- ⬅️ Previous: [[35-glossary]]
- ➡️ Next: [[37-beginner-faq]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/36-zero-to-first-win]]
