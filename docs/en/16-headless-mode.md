---
title: "Headless Mode (Automation Mode)"
section: 16
lang: en
tags:
  - claude-code
  - headless
  - automation
aliases:
  - "Headless Mode"
related:
  - "[[10-hooks]]"
  - "[[20-scheduled-tasks]]"
---

# Headless Mode (Automation Mode)

### Benefits and Use Cases

> **Why use headless mode?**
>
> Headless mode lets Claude Code run **without anyone watching** — perfect for automation, CI/CD pipelines, scheduled scripts, or processing lots of data.

**Use Cases:**

| Use Case | Command | Result |
|----------|---------|--------|
| **Automatic code review on every PR** | `claude --bare -p "review $(git diff main)"` in GitHub Actions | Every PR gets reviewed by AI automatically — no waiting for a reviewer |
| **Auto-generated release notes** | `claude -p "create a changelog from the Git log"` | Every release gets a polished changelog automatically |
| **Error log analysis** | `cat error.log \| claude -p "analyze"` | Analyze logs immediately without reading them yourself |
| **Batch processing many files** | `for f in *.ts; do claude -p "edit $f"; done` | Apply the same pattern across many files automatically |
| **JSON output for pipelines** | `claude -p "..." --output-format json --json-schema '{...}'` | Output is parseable, ready to hand off to other programs |
| **Daily code quality check** | A cron job + `claude --bare -p "check code quality"` | A code quality report every morning |
| **Migration script** | `claude -p "migrate v1 → v2" --max-turns 50` | Claude performs the migration automatically |
| **Generate test data** | `claude -p "create 100 seed records" --output-format json` | Receive test data as JSON immediately |

**GitHub Actions example:**

```yaml
name: AI Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: AI Review
        run: |
          git diff origin/main | claude --bare -p "Review this code, find bugs, security issues, performance problems" \
            --allowedTools "Read" \
            --output-format json \
            --max-turns 5
```

### Non-Interactive Usage

```bash
# Run a command and print the result
claude -p "find bugs in auth.py"

# Receive output as JSON
claude -p --output-format json "analyze this code"

# Bare mode (faster)
claude -p --bare "question"
```

### Structured Output (JSON)

```bash
claude -p "list all functions in the file" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}}}'
```

### Streaming Output

```bash
claude -p "write code" \
  --output-format stream-json \
  --include-partial-messages | \
  jq -rj 'select(.type == "stream_event") | .event.delta.text'
```

### Use in CI/CD

```bash
# GitHub Actions example
claude --bare -p "review changed code" \
  --allowedTools "Read,Bash(npm test),Edit" \
  --output-format json \
  --max-turns 10
```

### Pipe Data Into Claude

```bash
# Send a file for Claude to analyze
cat error.log | claude -p "analyze the errors in this log"

# Send command output
git diff | claude -p "review these changes"

# Send multiple files
cat src/*.ts | claude -p "find bugs"
```

---

---

## Navigation

- ⬅️ Previous: [[15-git-integration]]
- ➡️ Next: [[17-ide-integration]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/16-headless-mode]]
