---
title: "Tutorial Day 2: Build a Todo App in 1 Hour"
section: 28
lang: en
tags:
  - claude-code
  - tutorial
  - project
  - beginner
aliases:
  - "Day 2 Tutorial"
  - "First Project"
related:
  - "[[27-tutorial-day1-hello-world]]"
  - "[[29-tutorial-day3-power-user]]"
  - "[[07-claude-md]]"
  - "[[15-git-integration]]"
---

# Tutorial Day 2: Build a Todo App in 1 Hour

> **Goal:** Build a real project from scratch → have a professional-looking file structure → push it to GitHub
>
> Use this tutorial as a **template** for your own projects

## Prerequisites

- Finished [[27-tutorial-day1-hello-world|Day 1]]
- Have Node.js installed (`node --version`)
- Have a GitHub account (in case you push)

## Phase 1: Start the project (10 minutes)

```bash
mkdir my-todo
cd my-todo
claude
```

In chat, type:

```
I want to build a todo web app using plain HTML+CSS+JS — no framework.
I need:
- add tasks
- check off / uncheck completed
- delete tasks
- save data in localStorage (won't disappear on refresh)

Before starting, lay out the project structure first. Don't write code yet.
```

> **Tip:** Asking it to "lay out the structure first" → Claude will respond with a plan instead of jumping into code — letting you steer the direction

Claude will propose a structure like this:

```
my-todo/
├── index.html
├── style.css
├── app.js
├── README.md
└── .gitignore
```

If that looks good, reply:

```
Go ahead, create all the files
```

Claude will create them one by one — press **Yes** through each.

## Phase 2: Try it out (5 minutes)

```bash
# Mac
open index.html

# Windows
start index.html
```

Try adding, deleting, and checking off tasks → refresh and see if they persist (they should).

**If you find a bug:** don't fix it yourself! Just tell Claude:

```
When I check something off and refresh, it goes back to its original state. Please fix this.
```

Claude will:
1. Read the code it just wrote
2. Spot the bug
3. Propose a fix
4. Apply it

## Phase 3: Add features (15 minutes)

Try one feature at a time:

### 3.1 Add categories
```
Add a category feature for each task. Three options: Work, Home, Personal.
Different colors for each.
```

### 3.2 Search
```
Add a search box at the top — typing filters todos in real-time
```

### 3.3 Counter
```
Show remaining/total task count at the top of the page, e.g. "3/10 left to do"
```

> Add one feature at a time → check the result → then ask for the next. Better than asking for 5 things at once.

## Phase 4: Write CLAUDE.md (10 minutes)

This is a **professional trick** — have Claude create a memory file for the project.

```
Create a CLAUDE.md describing this project. Include:
- what the project is
- file structure
- features
- code style used
- common commands
```

Claude will create `CLAUDE.md` — next time you open chat in this folder, Claude will read it automatically → it **remembers** what the project is, no need to re-explain!

> See more: [[07-claude-md|07. CLAUDE.md]]

## Phase 5: Git + GitHub (15 minutes)

### 5.1 Initial commit

```
Create a .gitignore for a basic web project,
then init git and make the first commit with the message "Initial todo app"
```

### 5.2 Create the repo on GitHub

In your browser:
1. Go to github.com → New repository → name it `my-todo`
2. **Don't click "Add README"** (we already have one)
3. Create

GitHub will show you commands — **copy just the `git remote add` and `git push` parts**

### 5.3 Have Claude push

Back in chat:

```
push to GitHub remote: <paste URL>
```

Claude will run:
- `git remote add origin ...`
- `git branch -M main`
- `git push -u origin main`

## Phase 6: A nice README (5 minutes)

```
Write a nice README.md including:
- screenshot placeholder
- features list
- demo link
- how to run
- tech stack
```

Refresh the repo on GitHub → you've got a beautiful README!

## Day 2 Recap

You've got:
- [x] A working project
- [x] A professional file structure
- [x] A CLAUDE.md so Claude remembers the project
- [x] Git + GitHub setup
- [x] A nice README

## Key Lessons from Day 2

| What you learned | Why it matters |
|------------------|----------------|
| **Plan before coding** | Prevents Claude from going off track |
| **CLAUDE.md** | Next time, you don't start from zero |
| **One feature at a time** | Easier to debug |
| **Don't fix it yourself** | Just tell Claude in plain language |

## Troubleshooting

| Problem | What to do |
|---------|-----------|
| Claude wrote a wall of code that's too long | Say "don't write yet, explain the plan first" |
| Made a mistake and want to roll back | `git checkout .` or ask Claude to roll back |
| Context lost / going in circles | `/clear` and start fresh |
| Don't know what it changed | Say "show me the git diff" |

## What's Next

Day 3 covers **slash commands, subagents, scoped sessions** — turning you into a **Power User**

➡️ [[29-tutorial-day3-power-user|Day 3: Power User Tricks]]

---

🌐 TH: [[../th/28-tutorial-day2-first-project]]
