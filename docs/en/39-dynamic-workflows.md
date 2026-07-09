---
title: "Dynamic Workflows & ultracode (Deep Dive)"
section: 39
lang: en
tags:
  - claude-code
  - workflows
  - ultracode
  - agent-teams
  - deep-dive
aliases:
  - "Dynamic Workflows"
  - "ultracode"
related:
  - "[[13-agent-teams]]"
  - "[[12-subagents]]"
  - "[[31-cost-management]]"
  - "[[41-background-agents]]"
---

# Dynamic Workflows & ultracode (Deep Dive)

> **Goal:** drive tens to hundreds of agents from a single script — when to use it, how to write one, and what to watch out for.

## What are Dynamic Workflows?

**Dynamic Workflows** orchestrate **tens to hundreds of subagents** deterministically from a single JavaScript script — fan-out, pipelines, parallel stages, loop-until-done. Unlike spawning subagents one at a time, the *script* decides the shape of the work, not the model improvising mid-run. The Workflow runs in the background and reports back when done.

**Good fit:**

- Comprehensive review sweeps (find issues → adversarially verify each one)
- Large migrations (discover sites → transform each in its own worktree → verify)
- Deep research fan-outs across dozens of topics at once
- Anything one context window can't hold

**Bad fit:** simple tasks — a single session or one subagent is cheaper and simpler every time.

## How to trigger

- Include the keyword **`ultracode`** in your prompt (highlighted in violet) — renamed from `workflow` in v2.1.160; the bare word "workflow" **no longer triggers**
- Or ask in your own words, e.g. "run a workflow"
- Pressing **Backspace** right after the keyword dismisses it
- Toggle the keyword in `/config` → **"Workflow keyword trigger"**
- `/effort ultracode` enables the highest effort tier on models that support it

## Script anatomy

The script is **plain JavaScript (NOT TypeScript)**. It must start with `export const meta = { name, description, phases }` as a **pure literal** (no computed values), then use these hooks:

| Hook | What it does |
|------|--------------|
| `agent(prompt, opts)` | Spawn one subagent — `opts` may include `label`, `phase`, `schema` (JSON Schema → returns a validated object), `model`, `effort`, `isolation: 'worktree'` (own git worktree for parallel file edits), `agentType` |
| `parallel([...thunks])` | Run tasks concurrently and **wait for ALL** (a barrier) — failed thunks resolve to `null` |
| `pipeline(items, stage1, stage2, ...)` | Each item flows through the stages independently, **no barrier between stages** — the default choice for multi-stage work |
| `phase(title)` / `log(message)` | Progress grouping / progress messages |
| `args` | Input passed to the workflow |
| `budget` | Token budget helper — `budget.total`, `budget.remaining()` |

> ⚠️ **`Date.now()` / `Math.random()` are NOT available inside scripts** — they would break deterministic resume.

**Example — a 2-phase review: parallel finders, then verify each finding**

```js
export const meta = {
  name: 'review-sweep',
  description: 'Parallel finders, then adversarial verify per finding',
  phases: ['find', 'verify'],
};

// Phase 1 — fan-out finders (parallel = barrier: waits for all)
phase('find');
const modules = args.modules ?? ['auth', 'payments', 'api'];
const found = await parallel(modules.map((m) => () =>
  agent(`Review the ${m} module for correctness bugs. Report file:line and a one-line description per finding.`, {
    label: `find-${m}`,
    phase: 'find',
    schema: {
      type: 'object',
      properties: { findings: { type: 'array', items: { type: 'string' } } },
      required: ['findings'],
    },
  })
));

// Phase 2 — each finding flows through verify on its own (no barrier)
phase('verify');
const findings = found.filter(Boolean).flatMap((r) => r.findings); // failed finders resolved to null
log(`Verifying ${findings.length} findings — budget left: ${budget.remaining()}`);

const results = await pipeline(findings, (f) =>
  agent(`Try to DISPROVE this finding; confirm only if reproducible from the code: ${f}`, {
    phase: 'verify',
    schema: {
      type: 'object',
      properties: { confirmed: { type: 'boolean' }, reason: { type: 'string' } },
      required: ['confirmed', 'reason'],
    },
  })
);

log(`Done — ${results.filter((r) => r && r.confirmed).length} confirmed issues`);
```

## Core patterns

| Pattern | Recipe |
|---------|--------|
| **Fan-out** | Split the work into N pieces → `parallel(items.map((x) => () => agent(...)))` — waits for all before moving on |
| **Pipeline** | `pipeline(items, find, fix, verify)` — each item moves to the next stage the moment it's ready, no waiting for siblings |
| **Adversarial verify** | Feed each "finder" result to a fresh agent that tries to **disprove** it — only confirmed findings survive |
| **Loop-until-done** | A `while` loop calling `agent()` repeatedly until the (schema-validated) result says the exit condition is met |

## Watching progress

- The Workflow runs in the background — keep using your session; it reports when done
- `/workflows` — live progress; press `f` in the agent detail view to filter by status (v2.1.186)
- **Workflow size** — the "Dynamic workflow size" setting in `/config` guides how large workflows generally get (small / medium / large agent counts); advisory, not a hard cap (v2.1.202)
- **Resumable:** edit the script, then resume from the run ID — completed agent calls replay from cache without burning tokens again (this is why `Date.now()` / `Math.random()` are banned)

## Limits & cost

> ⚠️ **Read before you run**
>
> - Concurrent agents are capped around **min(16, CPU cores − 2)** per workflow — the excess queue up
> - Lifetime cap: **1,000 agents** per run
> - Workflows can spawn dozens to hundreds of agents → **token usage multiplies fast** — start small, watch `/usage`, and prefer `pipeline()` over adding unnecessary barrier stages

## Use together with

- [[13-agent-teams]] — interactive agent teams that share a task list and coordinate model-to-model; great when agents need to "talk", while workflows shine on high-volume work you can shape up front
- [[41-background-agents]] — Claude Code's other background-work modes (a workflow is itself one kind of background run)

---

---

## Navigation

- ⬅️ Previous: [[38-cheat-sheet]]
- ➡️ Next: [[40-claude-in-chrome]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/39-dynamic-workflows]]
