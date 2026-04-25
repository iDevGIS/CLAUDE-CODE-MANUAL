---
title: "Tips and Best Practices"
section: 25
lang: en
tags:
  - claude-code
  - best-practices
  - tips
aliases:
  - "Tips & Best Practices"
related:
  - "[[24-troubleshooting]]"
  - "[[26-real-world-workflows]]"
---

# Tips and Best Practices

### Benefits and Use Cases

> **Why read this section?**
>
> These tips come from **the real experiences of developers** who use Claude Code daily — they help you get better results faster and at lower cost.

### Write Effective CLAUDE.md

- Keep it under ~200 lines
- Use clear headings (`#`) and bullet points
- Be specific: "Use 2-space indentation", not "format nicely"
- Use `@import` for long reference documents
- Split topics into `.claude/rules/`

### Write Effective Prompts

| Approach | Good Example | Poor Example |
|----------|--------------|--------------|
| **Be specific** | "Fix the bug that causes login to fail when the password contains special characters in src/auth.ts" | "Fix the login bug" |
| **Specify how to verify** | "After fixing, run `npm test src/auth.test.ts` and make sure it passes" | "After fixing, test it" |
| **Explore first** | "Analyze how the authentication flow works, then propose a plan before fixing" | "Fix the auth for me" |
| **Delegate, don't dictate steps** | "Build a REST API for CRUD on Users following the project's pattern" | "First create the route file, then..." |

### Manage Permissions

- Approve frequently used commands: `Bash(npm test *)`
- Deny dangerous commands: `Bash(rm -rf *)`
- Switch modes by task: Plan → acceptEdits → auto

### Work in Parallel

- Use `--worktree` for parallel sessions
- Use agent teams for collaborative work
- Use subagents for specialized work

### CI/CD Integration

```bash
# GitHub Actions example
- name: Claude Code Review
  run: |
    claude --bare -p "review the changed code" \
      --allowedTools "Read,Bash(npm test)" \
      --output-format json \
      --max-turns 5
```

### Use the Context Window Wisely

1. Use `/compact` when the conversation is long
2. Use `/clear` when you switch topics
3. Use a subagent for search-heavy work
4. Use `/btw` for small questions
5. Periodically check `/context`

### Pick the Right Model for the Job

| Task | Recommended Model | Why |
|------|-------------------|-----|
| Architecture, complex bugs | Opus 4.6 | Deep thought, strong analysis |
| General coding, ordinary bugs | Sonnet 4.6 | Fast and economical |
| Boilerplate, data generation | Haiku 4.5 | Very fast and very cheap |

### Save Money

- Use `--effort low` for simple tasks
- Use `--model sonnet` when you don't need Opus
- Use `--max-budget-usd` to cap spend
- Use `/compact` to reduce tokens sent

---

---

## Navigation

- ⬅️ Previous: [[24-troubleshooting]]
- ➡️ Next: [[26-real-world-workflows]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/25-tips-best-practices]]
