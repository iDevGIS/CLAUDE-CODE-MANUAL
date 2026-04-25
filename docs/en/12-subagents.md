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
model: claude-opus-4-6
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
model: claude-sonnet-4-6        # Model to use
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

Claude delegates to the subagent automatically when a task matches its description, or list them with:

```
/agents
```

---

---

## Navigation

- ⬅️ Previous: [[11-skills]]
- ➡️ Next: [[13-agent-teams]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/12-subagents]]
