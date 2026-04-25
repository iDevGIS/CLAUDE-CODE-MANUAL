---
title: "Scheduled Tasks"
section: 20
lang: en
tags:
  - claude-code
  - scheduled-tasks
  - automation
aliases:
  - "Scheduled Tasks"
related:
  - "[[16-headless-mode]]"
  - "[[19-session-management]]"
---

# Scheduled Tasks

### Benefits and Use Cases

> **Why use scheduled tasks?**
>
> Scheduled tasks let Claude **work automatically on a schedule** — no need to remember what to run when. Claude does it for you.

**Use Cases:**

| Scheduled Task | Frequency | Result |
|----------------|-----------|--------|
| **Daily Code Review** | Every morning at 9:00 | Claude reviews yesterday's commits, hunts for bugs/security issues, and reports each morning |
| **Weekly Dependency Check** | Every Monday | Claude checks for outdated dependencies or vulnerabilities and alerts you weekly |
| **Hourly Health Check** | Every hour | Claude scans error logs; if a new error pattern appears, it notifies you immediately |
| **Daily Documentation Update** | Every evening at 18:00 | Claude updates API docs to match the latest code |
| **Monthly Performance Report** | First of every month | Claude analyzes code quality metrics and produces a monthly report |
| **Monitor Deployment** | `/loop 5m` | Health-check every 5 minutes after a deployment |

**Real-world example:**

```
Scenario: The team forgets to update dependencies, accumulating vulnerabilities

Without scheduled tasks:
  → Forget to check for 3 months → audit finds 47 vulnerabilities → fix everything at once

With scheduled tasks:
  → Claude checks every Monday → finds 2-3 vulnerabilities → fixes immediately, no buildup
  → The team stays safe without remembering to do it
```

### Scheduled Tasks in the Desktop App

| Frequency | Description |
|-----------|-------------|
| Manual | Run on demand |
| Hourly | Every hour |
| Daily | Every day |
| Weekdays | Monday–Friday |
| Weekly | Every week |

**Create via the Desktop UI or:**
```
Set up Daily Code Review to run at 9 AM
```

### /loop — Repeat Within a Session

```
/loop 5m "check errors in the log"
```

Repeats every 5 minutes within the current session.

### /schedule — Cloud Routines

```
/schedule
```

Creates a scheduled task on Anthropic's infrastructure:
- Runs even when your computer is off
- Can be triggered from an API or GitHub event
- Clones the repo fresh every time

---

---

## Navigation

- ⬅️ Previous: [[19-session-management]]
- ➡️ Next: [[21-special-features]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/20-scheduled-tasks]]
