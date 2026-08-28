---
title: "Subagents (Specialized Helpers)"
section: 12
lang: en
tags:
  - claude-code
  - subagents
  - agents
aliases:
  - "Subagents"
related:
  - "[[13-agent-teams]]"
  - "[[11-skills]]"
---

# Subagents (Specialized Helpers)

### Benefits and Use Cases

> **Why use subagents?**
>
> Subagents are **AI specialists** with isolated context — when a task needs multiple specialties, the main Claude "delegates" to the right subagent, then aggregates the results, like a team lead with specialist team members.

**Use Cases:**

| Subagent | Use Case | Real-World Example |
|----------|----------|--------------------|
| **Explore Agent** | Surveying a large codebase | You ask "How does authentication work?" → Claude sends the Explore Agent to find relevant files, read multiple files, and report back — without burning the main Claude's context |
| **Plan Agent** | Planning complex work | You say "Migrate from REST to GraphQL" → the Plan Agent analyzes every endpoint and proposes a step-by-step plan with dependencies |
| **Security Reviewer** | Security review | Claude delegates to a Security Agent to scan code for OWASP vulnerabilities and report findings with severity |
| **Test Writer** | Specialized test writing | Claude delegates to a Test Agent that writes tests covering every edge case |
| **Performance Analyzer** | Performance analysis | The agent finds N+1 queries, memory leaks, and slow paths, and proposes fixes |
| **Documentation Writer** | Writing documentation | The agent reads the code and produces API docs, READMEs, and architecture docs |

**Real-world example:**

```
Scenario: You want to refactor a large project (500+ files)

Without a subagent:
  Claude reads all the files itself → context fills quickly → forgets earlier reads
  → Poor results

With subagents:
  1. Claude sends an Explore Agent → returns a project structure summary
  2. Claude sends a Plan Agent → returns a phased refactor plan
  3. Claude executes the plan → sends a Security Agent to verify
  → Better results because each agent has its own context
```

### What are Subagents?

AI assistants that work in a separate context window — ideal for tasks that need a specific specialty.

### Built-in Types

| Type | Description |
|------|-------------|
| `Explore` | Survey, search, read files only |
| `Plan` | Plan, analyze strategy |
| `general-purpose` | General agent (default) |

### Creating a Custom Subagent

**File `.claude/agents/security-reviewer/agent.md`:**

```markdown
---
description: "Specialized security code review"
model: claude-opus-5
tools:
  - Read
  - Grep
  - Glob
  - Bash(npm audit *)
---

You are a specialized Security Reviewer.

When reviewing code:
1. Look for OWASP Top 10 vulnerabilities
2. Check input validation
3. Look for hardcoded secrets
4. Check for SQL injection, XSS, CSRF
5. Report findings with severity ratings
```

### Frontmatter Options

```yaml
---
description: "..."              # When Claude should delegate to this agent
model: claude-sonnet-5          # Model to use
tools:                          # Allowed tools
  - Read
  - Bash
  - Edit
permissionMode: plan            # Override permission mode
skills:                         # Skills to load
  - my-skill
mcpServers:                     # MCP servers to load
  - puppeteer
preloadSkills: true             # Load skills at startup
---
```

### Usage

Claude delegates to the subagent automatically when a task matches its description. (The old `/agents` wizard was removed in v2.1.198 — ask Claude in plain language, e.g. "create a code-reviewer subagent", or edit files under `.claude/agents/` directly.)

### New in v2.1.191

Subagents can now spawn their **own** subagents, up to **5 levels deep** (foreground and background share the same depth cap; resumed/forked subagents count toward it).

### New in v2.1.198

- **`/agents` wizard removed** — create or manage subagents by asking Claude in plain language, or by editing `.claude/agents/` directly.
- **Explore agent upgraded** — it now inherits the main session's model (capped at Opus) instead of always running on Haiku.
- Subagents and context compaction now inherit the session's **extended thinking** configuration.

### New in v2.1.212

- **Per-session subagent cap** — subagent spawns are limited to 200 per session by default (override with `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`) to stop runaway delegation loops; `/clear` resets the budget.
- **Task tool `mode` parameter deprecated** (now ignored) — subagents inherit the parent session's permission mode by default.

### New in v2.1.214

- **Reasoning effort in `subagentStatusLine`** — the payload now includes each subagent's reasoning effort, so custom agent rows can render both model and effort.

### New in v2.1.217

- **Concurrency cap** — at most 20 subagents run at the same time (override with `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`), so one message can't fan out unbounded background agents.
- **Nested spawning off by default** — subagents no longer spawn their own subagents; set `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` to allow deeper nesting.

### New in v2.1.218

- **No `:` in agent names** — agent markdown files now reject agent names containing `:`, which is reserved for plugin namespacing.

### New in v2.1.219

- **Nested spawning on by default** — subagents can now spawn their own subagents up to depth 3; set `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=1` to disable nesting.
- **Nested subagents in `stream-json`** — subagents spawned at depth 2+ now appear when `--forward-subagent-text` is set, keyed by the `tool_use` id of the Agent call that spawned them.

### New in v2.1.223

- **Warning when a requested subagent model is restricted** — workflow agents, forked skills, slash commands, and resumed background agents now warn you when the model they asked for is restricted and the parent model runs instead, so the substitution isn't silent.

### New in v2.1.224

- **Cross-session `SendMessage`** — Claude Code sessions can now message each other, including sessions on your other machines, and `ListAgents` discovers the ones you can reach (macOS and Linux).
- **The 200-subagent-per-session spawn cap is gone** — long-running sessions no longer refuse new agents. The concurrency cap (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`) and the spawn-depth limit still apply.

### New in v2.1.226

- **`SendMessage` can open a conversation with a Remote Control session** — you can now message a Remote Control session on another machine **by name**, instead of only being able to reply after it messaged you first. `ListAgents` lists these as `name [ref]` *(v2.1.225)*.
- **A confirmed Remote Control recipient is never swapped** — once you have confirmed a Remote Control recipient, `SendMessage` will not silently substitute a same-named session on this machine when the local session list can't be checked *(v2.1.225)*.

### New in v2.1.229

- **`ListAgents` shows reachability** — disconnected Remote Control sessions are marked `offline`, and your cloud sessions are labeled `cloud`, so you can tell at a glance which ones you can actually message.

### New in v2.1.232

- **Subagent forking is on by default** — a `subagent_type: "fork"` subagent inherits the full conversation and the prompt cache, so it starts with everything the parent knows instead of a fresh context.
- **Non-teammate agents run in the background by default** — in interactive sessions, agent spawns that aren't teammates now go to the background, so you keep working while they run.

### New in v2.1.235

- **A missing `subagent_type` gives a clear error** — in sessions where the general-purpose agent isn't available, the Agent tool no longer advertises it as the default; omitting `subagent_type` there returns an error listing the agents you can actually use.

### New in v2.1.246

- **Subagents that stop at `maxTurns` return partial output** — the result now comes back marked as partial, with a hint to continue the subagent via `SendMessage`, instead of appearing finished.

### New in v2.1.248

- **`experimental.cacheTtl` in agent frontmatter** — set a per-agent prompt cache TTL (`"5m"` or `"1h"`), used when no subagent cache TTL setting (`subagentPromptCacheTtl`) is configured. See [[06-configuration]].

### New in v2.1.251

- **Foreground subagent activity streams to Remote Control** — a foreground subagent's tool calls and results now stream live to Remote Control clients; background subagents (the default) still show status only.
- **`CLAUDE_CODE_SUBAGENT_MODEL` is a default, not an override** — an agent definition's `model:` and an explicit per-spawn model now take precedence over it. See [[23-environment-variables]].

---

---

## Navigation

- ⬅️ Previous: [[11-skills]]
- ➡️ Next: [[13-agent-teams]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/12-subagents]]
