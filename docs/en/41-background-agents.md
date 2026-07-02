---
title: "Background Sessions & claude agents (Deep Dive)"
section: 41
lang: en
tags:
  - claude-code
  - background
  - agents
  - sessions
  - deep-dive
aliases:
  - "Background Agents"
  - "claude agents"
related:
  - "[[19-session-management]]"
  - "[[16-headless-mode]]"
  - "[[20-scheduled-tasks]]"
  - "[[39-dynamic-workflows]]"
---

# Background Sessions & claude agents (Deep Dive)

> **Goal:** send work to the background, run many sessions at once, and drive the whole fleet from a single screen — all the way to draft PRs opened for you automatically.

Some work shouldn't need babysitting — a big refactor, a test suite that runs for an hour, or a bug you'd rather let Claude chase across a whole repo. A **background session** keeps running detached from your current screen, and **`claude agents`** is the command center: dispatch new work, watch progress, answer questions, and harvest results from every session in one place.

## Sending work to the background

There are three entry points:

| Entry point | How | Best for |
|-------------|-----|----------|
| **Start a new session detached** | `claude --bg` — name it with `--name <n>`, or use `--bg --exec "<cmd>"` to run a shell command in the background | Work you know up front will run long |
| **Push the current turn to the background** | `/bg` or `Ctrl+B` (or `←` `←` after a turn) | A turn that turns out to be slow — no need to cancel and restart |
| **Background a running subagent** | Send an already-running subagent to the background without restarting it | Long subagent work you don't want to wait on in the main session |

```bash
claude --bg --name nightly-refactor      # start a named background session
claude --bg --exec "npm run test:e2e"    # run a shell command as a background job
```

## Driving the fleet with claude agents

`claude agents` opens the **agent view** — a session manager for many concurrent sessions:

- **Dispatch new sessions from inside it** — respects the `agent` field in settings, overridable with `--agent <name>`
- **Attach / reply** to any session — or attach directly from the terminal with `claude attach <id>`
- **Fast search** — typing a URL filters to the session whose first prompt contained it (PR-URL search works too)
- **Rows show progress** as `done/total`
- A **single** `←` press opens the agent view (since v2.1.196)

### Scripting: `--json`

```bash
claude agents --json          # session state as JSON
claude agents --json --all    # include completed sessions
```

The output includes `id`, `state`, and `waitingFor` fields — the last one tells you what a blocked session is waiting on.

## Lifecycle & resilience

- **Pinned background sessions stay alive** — they restart in place and shed gracefully under memory pressure
- **Long-running commands and workflows survive the session process being stopped, restarted, or updated** — including on Windows, where background shells are handed off instead of killed (v2.1.196)
- **Workers killed by a daemon restart auto-resume** the next time the agents view opens (v2.1.196)
- **Background agent sessions update to a new Claude Code version in the background** (v2.1.163)

## Finishing the job: auto draft-PR (v2.1.198)

Background agents launched from `claude agents` that finish code work in a worktree now **commit → push → open a draft PR automatically** instead of stopping to ask.

- Results that mention a PR show a **clickable link**
- Stalled agents are labeled **"Needs attention"**

## Notifications via the Notification hook (v2.1.198)

Sessions that **need input** or **finish** fire the `Notification` hook with the events `agent_needs_input` / `agent_completed` — so you can pipe alerts anywhere (hook details in [[10-hooks]]).

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "curl -s -d 'Claude Code: agent update' ntfy.sh/my-agents"
          }
        ]
      }
    ]
  }
}
```

## Good to know

- **Permission prompts surface in the MAIN session** — a background subagent asking for permission shows a dialog there, labeled with which agent is asking; `Esc` denies just that tool (v2.1.186)
- `claude agents --dangerously-skip-permissions` shows the bypass disclaimer and applies bypass to spawned agents (v2.1.196)
- **Idle background shell commands are reaped under memory pressure** — disable with `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` (v2.1.193)
- **`claude --bg` cannot be combined with `-p`/`--print`** — rejected up front (v2.1.198); for headless runs see [[16-headless-mode]]
- Come back to a background session later via `/resume` — look for the `bg` marker in the list

## Use cases

- Let a long refactor or a heavy test suite run in the background while you keep coding
- Dispatch one session per repo or per bug, then watch them all from the agent view
- Overnight jobs — pair with [[20-scheduled-tasks]]
- Review many PRs in parallel, then find each session again by its PR URL

---

---

## Navigation

- ⬅️ Previous: [[40-claude-in-chrome]]
- ➡️ Next: [[README]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/41-background-agents]]
