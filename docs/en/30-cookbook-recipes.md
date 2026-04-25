---
title: "Cookbook: Specific Problem-Solving Recipes (40+ Recipes)"
section: 30
lang: en
tags:
  - claude-code
  - cookbook
  - recipes
  - reference
aliases:
  - "Cookbook"
  - "Recipes"
related:
  - "[[29-tutorial-day3-power-user]]"
  - "[[33-use-cases-analogies]]"
  - "[[26-real-world-workflows]]"
---

# Cookbook: Specific Problem-Solving Recipes

> **How to use:** Ctrl+F to find what you need → copy the prompt → tweak slightly → use it
>
> Every recipe is a tested prompt

## Section A: Code Reading & Understanding

### Recipe 1: Joining a new project, don't know where to start reading

```
I just joined this project. Please:
1. Explain the overall structure
2. Point out the main entry points
3. Show a short dependency graph
4. Suggest which file to read first
Don't go deep yet — just give me an overview
```

### Recipe 2: Reading a confusing large file

```
Walk me through @src/some-huge-file.ts section by section.
Break it down by: purpose / inputs / outputs / side effects
Don't explain every line — focus on "why" rather than "what"
```

### Recipe 3: Reverse engineer an undocumented API

```
Find every API endpoint in this project, including:
- HTTP method
- path
- request body shape
- response shape
- which middleware is used
Generate it as an OpenAPI spec
```

## Section B: Bug Fixing

### Recipe 4: Fix a bug from an error message

```
I got this error:
[paste error]

Please:
1. Find the root cause
2. Identify the related files
3. Propose a fix with reasoning
Don't apply changes until I approve
```

### Recipe 5: Hard-to-reproduce bugs

```
There's a bug: [describe]
- only happens in production
- no error log visible
- customers report it occasionally

Help me find:
1. missing logging → add some
2. possible race conditions
3. edge cases the tests don't cover
```

### Recipe 6: Regression — used to work, now broken

```
This feature worked at commit ABC123 but is broken now.
Run git bisect to find which commit broke it, then explain what changed.
```

## Section C: Refactoring

### Recipe 7: Reduce duplicate code

```
Find code blocks that repeat 3+ times under @src/
Report as a list:
- where vs where it duplicates
- how similar (%)
- whether it should be extracted into a utility function
Don't change anything yet
```

### Recipe 8: Break up a large file

```
@src/giant-file.ts has 2000 lines. Suggest how to split it:
- without breaking tests
- preserving the existing public API
- without bloating the bundle size
Show a plan first, don't split yet
```

### Recipe 9: Change a pattern across the project

```
Convert every class component to functional + hooks.
Do it one file at a time, commit each change.
Start with the simplest files first.
```

## Section D: Testing

### Recipe 10: Write tests for legacy code

```
Write unit tests for @src/utils/parser.ts
- 80%+ coverage
- cover happy path + edge cases
- use vitest
- only mock external dependencies
```

### Recipe 11: Find missing tests

```
Run a coverage report
Report functions with coverage < 50%
Prioritize by:
1. critical path (auth, payment, etc.)
2. complexity (high cyclomatic complexity)
```

### Recipe 12: Debug a flaky test

```
This test sometimes passes, sometimes fails:
[paste test code]

Look for:
- async race conditions
- shared state with other tests
- dependencies on time/order
```

## Section E: Code Review

### Recipe 13: Review someone else's PR

```
Review this diff: $(git diff main..feature/xyz)

Check for:
1. logic bugs
2. security issues (SQL injection, XSS)
3. performance regressions
4. naming inconsistency
5. missing tests
Report by priority: must fix / nice to have / info
```

### Recipe 14: Self-review before pushing

```
git diff
Check for:
- forgotten console.log statements
- leaked secrets
- code style violations
- forgotten test updates
```

## Section F: Documentation

### Recipe 15: Write a README

```
Read the project, then write README.md including:
- 1-paragraph description (under 50 words)
- Features (short bullet list)
- Quick Start (copy-paste ready)
- Tech Stack (as badges)
- Project Structure (folder tree)
- Contributing (concise)
- License
Use a friendly tone
```

### Recipe 16: Docs for important functions

```
Write JSDoc for every exported function in @src/api/
Cover:
- summary
- @param with type
- @returns
- @throws
- @example
```

### Recipe 17: API documentation

```
Generate API documentation from the existing endpoints.
Output as Markdown including:
- endpoint table
- request/response examples
- auth requirements
- error codes
```

## Section G: Migration

### Recipe 18: JS → TS

```
Migrate @src/utils/ from JavaScript to TypeScript
- add necessary types
- no `any` allowed
- preserve existing behavior
- update tests so they pass
Do it one file at a time, commit each
```

### Recipe 19: REST → GraphQL

```
Design a GraphQL schema from the current REST API
- merge redundant endpoints
- reduce over-fetching
- minimize breaking changes
```

### Recipe 20: Switch frameworks

```
Plan a migration from Express → Fastify
- list breaking changes
- order the migration steps
- identify the risk at each step
- propose a rollback plan
```

## Section H: Performance

### Recipe 21: Find bottlenecks

```
Profile the project → find the 10 slowest functions
For each, tell me:
- why it's slow
- possible fixes
- effort vs impact
```

### Recipe 22: Reduce bundle size

```
Analyze the webpack bundle
- find heavy dependencies
- suggest lighter alternatives
- find dead code
- propose a code splitting strategy
```

### Recipe 23: Optimize SQL

```
Review SQL queries in @src/db/
Find:
- N+1 queries
- missing indexes
- unnecessary joins
- queries that should be cached
```

## Section I: Git

### Recipe 24: Good commit messages

```
git diff --staged
Generate a Conventional Commits-style message
- correct type (feat/fix/refactor/docs/test)
- scope based on the changed files
- subject < 50 chars
- body explaining "why", not "what"
```

### Recipe 25: Cleanup branches

```
List local branches that have been merged and unused for > 30 days
Show me the delete commands
Don't delete until I approve
```

### Recipe 26: Safe rebasing

```
I have 5 commits on my feature branch. I want to squash them into 1.
Do an interactive rebase safely:
- back up the branch first
- show the plan
- explain each step
```

## Section J: DevOps

### Recipe 27: Write a Dockerfile

```
Write a Dockerfile for this Node.js project
- multi-stage build
- non-root user
- minimal final image
- health check
- secrets via env (not baked in)
```

### Recipe 28: GitHub Actions CI

```
Create .github/workflows/ci.yml
- run on push to main + PRs
- steps: install / lint / test / build
- cache npm
- fail fast
- report coverage
```

### Recipe 29: Rollback plan

```
We deployed a new version and metrics got worse.
Plan the rollback:
- revert commit or redeploy old image?
- step-by-step
- post-rollback checks
- post-mortem template
```

## Section K: Security

### Recipe 30: Security review

```
Review @src/api/auth/ for:
- SQL injection
- timing attacks
- weak crypto
- session fixation
- secrets in logs
Report as CVSS scores
```

### Recipe 31: Dependency audit

```
Run npm audit
For each vulnerability:
- impact on our project
- is there a fix?
- workaround if no fix
Prioritize them
```

> See more: [[32-security-best-practices]]

## Section L: Productivity

### Recipe 32: Auto-generate a TODO

```
Read all the code, find:
- TODO/FIXME/HACK comments
- leftover console.log/print statements
- unused functions
- files uncommitted for > 7 days
Turn it into an issue list with priorities
```

### Recipe 33: Help write a PR description

```
git diff main..HEAD
Write a PR description:
- Summary (3 bullets)
- What changed
- Why (link to issue if any)
- Test plan (checklist)
- Screenshot placeholders
```

### Recipe 34: Standup notes

```
git log --since="1 day ago" --author=$(git config user.email)
Summarize as standup notes:
- Yesterday: what I did
- Today: what I'll do
- Blockers: any?
```

## Section M: Learning

### Recipe 35: Teach a new technology

```
I'm experienced with Vue but never used Svelte.
Take examples from @src/ that are in Vue
Translate them to Svelte one component at a time
Explain the differences in each concept
```

### Recipe 36: Explain like I'm 5

```
Explain "dependency injection" to someone who's never written OOP
Use everyday analogies
Then show an example from our @src/
```

### Recipe 37: Pick the right design pattern

```
Problem: [describe]
- which design pattern fits — give me 3 options
- pros/cons of each
- recommend the one that fits our project
- write sample code
```

## Section N: Emergency

### Recipe 38: Server is down right now

```
Production is down right now:
- error: [paste]
- log: [paste]

Help me:
1. Find the root cause as fast as possible
2. Quick fix (minimize blast radius)
3. Proper fix (suggest later)
Don't wait for tests — focus on getting things back up first
```

### Recipe 39: Deleted the wrong file

```
I deleted the wrong file: [path]
The deletion isn't committed yet
git status / git stash list / git reflog
Find a way to recover it
```

### Recipe 40: Leaked a secret

```
Just realized .env was pushed to GitHub
Help me:
1. Revoke the secrets immediately (list what to revoke)
2. Remove from git history (BFG or filter-branch)
3. Force push (dangerous — show the command with a warning)
4. Notify the team
```

> See more: [[32-security-best-practices]]

## The Secret Sauce: Prompts that work for any task

### Prompt Template

```
[CONTEXT] The project is...
[GOAL] I need...
[CONSTRAINTS] Don't.../Must...
[OUTPUT] I want results in this format...
[STEP] Step by step / All at once
```

### Words that make Claude work better

| Word | Effect |
|------|--------|
| "Explain the plan first" | Doesn't jump into coding |
| "Don't apply until approved" | Safe |
| "One file/commit at a time" | Easy to follow |
| "Don't..." | Prevents mistakes |
| "Compare 3 options" | See trade-offs |
| "Identify risks" | Forces careful thinking |

## What's Next

➡️ [[31-cost-management|31. Cost & Token Management]]
➡️ [[32-security-best-practices|32. Security Best Practices]]

---

🌐 TH: [[../th/30-cookbook-recipes]]
