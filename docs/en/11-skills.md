---
title: "Skills (Custom Commands)"
section: 11
lang: en
tags:
  - claude-code
  - skills
  - customization
aliases:
  - "Skills"
related:
  - "[[03-slash-commands]]"
  - "[[10-hooks]]"
  - "[[12-subagents]]"
---

# Skills (Custom Commands)

### Benefits and Use Cases

> **Why use skills?**
>
> Skills let you **teach Claude how to do repeated tasks consistently** — instead of typing long instructions every time, create the skill once and call it with `/skill-name` forever.

**Use Cases:**

| Skill | Scenario | Result |
|-------|----------|--------|
| **`/deploy`** | Deploying the app weekly | Type `/deploy staging` → Claude runs tests, builds, deploys, and runs health checks end to end — no missed steps |
| **`/new-component`** | Creating React components often | Type `/new-component UserCard` → Claude creates the component, style, test, and story files based on the team's template |
| **`/db-migrate`** | Creating database migrations | Type `/db-migrate add_email_to_users` → Claude creates a migration file, writes up/down, and runs it |
| **`/hotfix`** | Urgent production bug fixes | Type `/hotfix` → Claude branches from main, fixes the bug, runs tests, and creates a PR automatically |
| **`/api-endpoint`** | Creating new API endpoints | Type `/api-endpoint GET /users/:id` → Claude creates route, controller, service, validator, and tests in full |
| **`/changelog`** | Generating release notes | Type `/changelog v2.1.0` → Claude reads the Git log and produces a categorized changelog |
| **`/status`** | Quick project status | Type `/status` → see branch, latest commit, number of changed files, CI status |
| **`/translate`** | Translating files for i18n projects | Type `/translate th` → Claude translates all language files into Thai |

**Real-world example:**

```
Before the "/deploy" skill:
  1. npm run test           ← run yourself
  2. npm run build:prod     ← memorize the command
  3. aws s3 sync ...        ← memorize the bucket
  4. aws cloudfront ...     ← memorize the distribution ID
  5. curl health-check      ← memorize the URL
  → 5 steps, ~15 minutes, easy to mistake

After the "/deploy" skill:
  1. Type /deploy production
  → Claude does all 5 steps in 2 minutes, no mistakes
```

### What are Skills?

User-defined commands invoked with `/skill-name`, or that Claude can invoke automatically.

### Skill Storage Locations

| Location | Scope |
|----------|-------|
| `~/.claude/skills/<name>/SKILL.md` | Personal — works in every project |
| `.claude/skills/<name>/SKILL.md` | Project (committed with the team) |
| `<plugin>/skills/<name>/SKILL.md` | From a plugin |

### Creating a Basic Skill

**File `.claude/skills/deploy/SKILL.md`:**

```markdown
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
---

Follow these steps:

1. Run the test suite and make sure everything passes
2. Build the application
3. Deploy to production
4. Verify health checks
```

Usage: type `/deploy` in a session.

### Frontmatter Options

```yaml
---
name: skill-name                    # Command name
description: "what it does"         # When Claude should use it
when_to_use: "additional triggers"  # Extra trigger phrases
argument-hint: "[file] [action]"    # Argument hint
disable-model-invocation: true      # Only invokable by the user (Claude can't auto-call)
user-invocable: false               # Only Claude can call it
allowed-tools: "Read,Bash"          # Pre-approved tools
model: claude-opus-4-6              # Override the model
effort: high                        # Override the effort
context: fork                       # Run inside a subagent
agent: Explore                      # Agent type
paths:                              # Restrict to certain files
  - "src/**/*.ts"
---
```

### Skill with Arguments

```markdown
---
name: deploy
description: Deploy to the specified environment
---

Deploy to $ARGUMENTS:

1. Build the app
2. Deploy to $ARGUMENTS
3. Verify health checks

Environment used: $0
Additional options: $1
```

Usage: `/deploy staging --verbose` → `$0` = staging, `$1` = --verbose

### Shell Injection in Skills

```markdown
---
name: status
---

Current status:
- Branch: !`git rev-parse --abbrev-ref HEAD`
- Latest commit: !`git log -1 --oneline`
- Changed files: !`git status --short | wc -l`
```

The shell commands run before Claude sees the content.

### Supporting Files

```
my-skill/
├── SKILL.md          # Main file
├── template.md       # Template
├── examples.md       # Output examples
└── scripts/
    └── validate.sh   # Helper script
```

Reference inside SKILL.md: `See examples in [examples.md](examples.md)`

---

---

## Navigation

- ⬅️ Previous: [[10-hooks]]
- ➡️ Next: [[12-subagents]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/11-skills]]
