---
title: "Git Integration"
section: 15
lang: en
tags:
  - claude-code
  - git
  - version-control
aliases:
  - "Git Integration"
related:
  - "[[16-headless-mode]]"
  - "[[17-ide-integration]]"
---

# Git Integration

### Benefits and Use Cases

> **Why use Git integration?**
>
> Git integration lets Claude handle Git **like a professional developer** — meaningful commit messages, well-described PRs, thorough code reviews, and parallel work across branches.

**Use Cases:**

| Use Case | How to Use | Result |
|----------|-----------|--------|
| **Better commit messages** | `/commit` | Claude reads the diff and writes a message that explains "why", not just "what" — better than "fix bug" or "update" |
| **Easy-to-understand PRs** | `/pr` | Claude summarizes all branch changes and writes a thorough description; reviewers understand the work right away |
| **Code review before pushing** | `/review` | Claude finds bugs, security issues, and code smells before others see — fewer review rounds |
| **Two features in parallel** | `claude -w feature-a` + `claude -w feature-b` | Each worktree has its own branch — Claude works in parallel without conflicts |
| **Check PR status** | Look at the status bar | See PR status (Approved/Pending/Changes Requested) without opening GitHub |
| **Roll back a bad commit** | `Esc + Esc` → Restore code | Roll back instantly — no manual `git reflog` needed |

**Real-world example:**

```
Scenario: You fixed a bug across 3 files and want to make a PR

Without Git integration:
  1. git add src/auth.ts src/middleware.ts src/utils.ts   ← remember files
  2. git commit -m "..."                                  ← think up a message
  3. git push -u origin fix/login-bug                     ← remember branch
  4. gh pr create --title "..." --body "..."              ← write PR description
  → 10 minutes; PR description usually too short

With Git integration:
  1. Type /commit → Claude analyzes the diff and writes a message
  2. Type /pr → Claude writes a complete title + description, pushes, creates PR
  → 1 minute; PR description is detailed and clear
```

### Common Git Commands

| Command | Description |
|---------|-------------|
| `/commit` | Stage + commit with a Claude-generated message |
| `/pr` | Create a pull request |
| `/review` | Review code |

### Git Worktrees (Parallel Work)

```bash
# Create a separate worktree
claude -w feature-auth

# Claude works in .claude/worktrees/feature-auth
# without disturbing the main working directory
```

Benefits:
- Run multiple Claude sessions at once
- Each session edits its own files
- No conflicts

### GitHub Integration

- Show PR status on the current branch
- Color-coded by state: green (Approved), yellow (Pending), red (Changes Requested)
- `Cmd+Click` / `Ctrl+Click` to open the PR in your browser
- Requires the `gh` CLI

### Example Commit

```
/commit
```

Claude will:
1. Look at `git status` and `git diff`
2. Write an appropriate commit message
3. Stage the relevant files
4. Create the commit

### Example PR Creation

```
/pr
```

Claude will:
1. Analyze every change since the branch diverged
2. Write the title and description
3. Push to the remote (if needed)
4. Create the PR with `gh pr create`

---

---

## Navigation

- ⬅️ Previous: [[14-context-management]]
- ➡️ Next: [[16-headless-mode]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/15-git-integration]]
