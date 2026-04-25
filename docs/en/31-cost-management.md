---
title: "Cost & Token Management (Use Claude Code Economically)"
section: 31
lang: en
tags:
  - claude-code
  - cost
  - tokens
  - production
  - optimization
aliases:
  - "Cost Management"
  - "Token Management"
related:
  - "[[14-context-management]]"
  - "[[32-security-best-practices]]"
  - "[[25-tips-best-practices]]"
---

# Cost & Token Management

> **Why this matters:** Use it wrong and you'll spend $500/month. Use it right and you'll spend $50/month — a 10x difference
>
> These recipes can save you **70-90%** without sacrificing productivity

## Where do Claude Code costs come from?

Every time you chat, the system sends data back and forth with the AI:

```
Input tokens (sent in) + Output tokens (sent back) = Cost
```

| Component | Example |
|-----------|---------|
| **System prompt** | Claude Code's rules (sent every time) |
| **CLAUDE.md** | sent every time in the session |
| **History** | the entire prior conversation |
| **File reads** | content of files Claude reads |
| **Tool results** | output from bash commands, search, etc. |

> **Note:** Most of the cost (60-80%) comes from **input tokens**, not output

## Pricing per Model (approximate)

| Model | Input | Output | When to use |
|-------|-------|--------|-------------|
| **Opus 4.x** | High | High | Hard work: large refactors, architecture, deep debugging |
| **Sonnet 4.x** | Medium | Medium | Default for general use — best value |
| **Haiku 4.x** | Lowest | Lowest | Easy work: rename, format, regex, short summaries |

> Prices change — check the latest at console.anthropic.com

## How to reduce cost — ranked by impact

### 1. Use `/clear` often (saves 50%+)

Every message accumulates in the context and gets resent each time.

```
Bad: Talking from morning to evening, context at 100K tokens — very expensive
Good: New task → /clear → fresh start with 5K tokens of context
```

**Rule:** Switching tasks → `/clear` immediately.

### 2. Use `/compact` mid-session

If a task is genuinely long and you don't want to start over:

```
/compact
```

→ Claude summarizes the history, dropping tokens by 70-80%

### 3. Pick the right model for the task (saves 30-70%)

```
/model haiku    # easy work
/model sonnet   # default
/model opus     # hard work
```

**Rule of thumb:**

| Task | Model | Why |
|------|-------|-----|
| rename a function | Haiku | fast, cheap, accurate |
| format code | Haiku | mechanical work |
| summarize a file | Haiku | short output |
| review a PR | Sonnet | needs context understanding |
| debug logic | Sonnet/Opus | needs joined-up reasoning |
| refactor architecture | Opus | deep thinking |
| design a system | Opus | needs creativity |

### 4. Avoid huge files (saves 40%+)

Every time Claude reads a big file → tokens balloon immediately.

```
Bad: "Read the whole project and tell me what it does"
   → Claude reads every file → context explodes

Good: "Read @package.json and @src/index.ts and tell me what the project does"
   → targeted, economical
```

**Tip:**
- Use `@` to specify the files you want
- Use Grep to find a keyword before reading the file
- Use a subagent to read big files → it sends back a summary (see [[12-subagents]])

### 5. Use a subagent to filter info first

```
Use a subagent to find files related to user authentication
Send back only the path + a 1-line summary each
```

→ The subagent's context blows up, the main context stays clean.

### 6. Don't let CLAUDE.md get too long

CLAUDE.md is sent every time → long = expensive

```
Bad: a 5000-line CLAUDE.md
Good: a 100-300 line CLAUDE.md — just the important rules
```

If you want to include details → put them in separate doc files and have Claude read them when needed.

### 7. Plan Mode before big edits

```
/plan
```

→ Claude thinks but doesn't act. If it goes off track, you can correct it before it starts editing — no tokens wasted on edits/rollbacks.

### 8. Headless mode for repetitive tasks

```bash
# Use headless in scripts you run frequently
claude -p "summarize this file: $(cat report.md)"
```

→ No accumulated history, fresh every time.

### 9. Cache via prompt caching

Anthropic's system has **prompt caching** — if you send the same content again → costs drop by up to 90%

Claude Code enables this automatically — but to get good cache hit rates:
- Keep talking continuously within 5 minutes (cache TTL)
- Don't change CLAUDE.md mid-session (invalidates cache)

> If your conversation pauses for > 5 minutes, the cache expires — you pay full price again.

### 10. Use `/cost` to check periodically

```
/cost
```

Shows:
- Tokens used today
- Cost
- Breakdown by model

If it's higher than expected → stop and review immediately.

## A frugal workflow

```
Morning:
1. cd project && claude
2. /model sonnet (default)
3. /cost (baseline check)

During work:
4. Finish task A → /clear → start task B
5. Easy work → /model haiku
6. Hard work → /model opus → finish → /model sonnet
7. Before big edits → /plan
8. Every 1-2 hours → /cost check

End of day:
9. /cost (review summary)
10. Over budget? → review where it went wrong
```

## Budget Alerts (for teams)

Set alerts in the Anthropic Console:

```
1. console.anthropic.com → Settings → Limits
2. Set a daily budget, e.g. $20/day
3. Alert at 80% of budget
4. Notify via email/Slack
```

## Real-world comparison

### Case A: Refactoring a medium-sized function

**Wrong way:**
```
Read the entire project for me
→ tell me how to change function getUser
→ chat back and forth for 30 minutes
→ /cost: $4.20
```

**Right way:**
```
@src/users.ts
→ /plan: "extract validation"
→ approve
→ /cost: $0.45
```

→ Saves **9x**

### Case B: PR Review

**Wrong way:**
```
Read the whole branch + main and compare
→ context 80K tokens
→ $2.10
```

**Right way:**
```bash
git diff main..HEAD | claude -p "review this diff for bugs"
→ context 5K tokens
→ $0.15
```

→ Saves **14x**

## Common Traps

| Trap | How to avoid |
|------|--------------|
| Chatting across days without /clear | New task → /clear |
| Adding every file as @reference | Only the necessary ones |
| Using Opus for everything | Default to Sonnet |
| Letting CLAUDE.md grow | Trim it down |
| Not checking /cost | Check every 1-2 hours |
| Forgetting an open session | Done with task → /exit |

## Personal Dashboard

Create a `~/.claude/cost-log.md`:

```markdown
# Cost Log

## 2026-04-26
- Morning session: $1.20 (refactor auth)
- Afternoon: $0.80 (review PR)
- Evening: $0.40 (docs)
- Total: $2.40 (budget $5/day)

## 2026-04-25
- ...
```

→ Spot your patterns → keep getting better.

## What's Next

Now you know how to save — let's read about security next.

➡️ [[32-security-best-practices|32. Security Best Practices]]

---

🌐 TH: [[../th/31-cost-management]]
