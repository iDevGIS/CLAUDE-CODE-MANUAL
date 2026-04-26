---
title: "CLI Commands and Flags"
section: 2
lang: en
tags:
  - claude-code
  - cli
  - commands
aliases:
  - "CLI Commands"
related:
  - "[[01-installation]]"
  - "[[03-slash-commands]]"
  - "[[04-keyboard-shortcuts]]"
---

# CLI Commands and Flags

### Benefits and Use Cases

> **Why learn CLI flags?**
>
> CLI flags are the key to **tailoring Claude Code to specific situations** — for example, running automatically in CI/CD, capping the budget, choosing a suitable model, or running multiple tasks in parallel.
>
> Think of `claude` as a **car**, and flags as the **buttons on the dashboard** — headlights, AC, locks, and so on. Knowing every button means you get the most out of your ride.

**Use Cases:**

| Use Case | Command | Description |
|----------|---------|-------------|
| **Quick question, no interactive session** | `claude -p "explain function X"` | Get an answer immediately and exit. Great for piping into scripts |
| **Resume yesterday's conversation** | `claude -c` | Pick up where you left off; Claude remembers all the context |
| **Work on two features simultaneously** | `claude -w feature-a` + `claude -w feature-b` | Each worktree has its own branch — no conflicts |
| **Cap costs** | `claude --max-budget-usd 5` | Prevent overspending — great for teams with limited budgets |
| **Use a cheaper model for simple tasks** | `claude --model sonnet` | Save money on tasks that aren't complex |
| **Run an automation script** | `claude --bare -p "..." --output-format json` | Clean output with no UI clutter — ideal for CI/CD |
| **Send an error log for analysis** | `cat error.log \| claude -p "analyze"` | Pipe data straight to Claude for analysis |
| **Work across projects** | `claude --add-dir ../other-project` | Access files from multiple projects at once |

---

### Session Commands

#### `claude` — Open an Interactive Session (the basics)

**What it does:** Opens a real-time chat with Claude. You type, Claude replies, you type again, and so on — until you press `Ctrl+D` or type `/exit`.

**When to use:** Whenever you want to sit down for serious work — debugging, refactoring, building a big feature — that needs back-and-forth.

**Example:**
```bash
$ claude
╭─────────────────────────────────────────╮
│ Welcome to Claude Code v2.1.114         │
│ Working directory: ~/my-project         │
╰─────────────────────────────────────────╯
> Please read src/index.ts for me
```

#### `claude "question"` — Open with an Initial Question

**What it does:** Same as `claude`, but you don't have to type the first question — it's sent immediately when the session opens.

**When to use:** You already know what to ask, so skip the empty-prompt shuffle.

**Example:**
```bash
claude "Explain the structure of this project"
```

#### `claude -p "question"` — Non-Interactive Mode (Print mode)

**What it does:** Asks once → Claude answers → exits. No follow-up session. The output is printed straight to stdout.

**When to use:** Inside scripts, pipes, or automation — because it doesn't wait for further input.

**Example:**
```bash
$ claude -p "Summarize README.md in 2 lines"
README explains how to install and use the Thai-language Claude Code guide.
It covers everything from installation to CI/CD integration.
$
```

> 💡 **Tip:** `-p` stands for "print" — easy to remember as "print and exit".

#### `cat file | claude -p "question"` — Sending Data via Pipe

**What it does:** Takes the output of another command (like `cat`, `git log`, `curl`) and feeds it to Claude as input.

**When to use:** Whenever you want Claude to analyze data from a file or command without copy-paste.

**Example:**
```bash
# Analyze an error log
cat /var/log/app.log | claude -p "find the main error patterns"

# Summarize commits
git log --oneline -20 | claude -p "summarize what shipped in the last 20 commits"

# Analyze JSON
curl https://api.example.com/data | claude -p "find anomalies"
```

#### `claude -c` — Continue the Latest Conversation

**What it does:** Re-enters the most recent session — Claude remembers everything you talked about before.

**When to use:** You stopped mid-task yesterday and want to pick up without re-explaining anything.

**Example:**
```bash
$ claude -c
[Resumed session from 2 hours ago]
> Which files did you edit earlier?
```

> ⚠️ **Gotcha:** `-c` continues only from the **current directory** — change folders and you'll lose the previous session.

#### `claude -r "name"` — Resume a Specific Session

**What it does:** Picks a specific session from history. With no name, a picker UI appears.

**When to use:** When several sessions are pending and you want a particular one.

**Example:**
```bash
claude -r              # open the picker
claude -r "auth-bug"   # find a session called "auth-bug"
```

#### `claude -w branch-name` — Create a Git Worktree (Parallel Work)

**What it does:** Creates a new git worktree + new branch + opens Claude inside it. Now you can work on 2-3 features in parallel.

**When to use:** Let Claude work on feature A while you work on feature B — no locks, no conflicts.

**Example:**
```bash
# Terminal 1: let Claude tackle a big feature
claude -w add-payment-gateway

# Terminal 2: you fix small bugs yourself
git checkout main
# fix bug, commit, push
```

> 💡 **Analogy:** Like opening two Word windows with two different documents — they don't interfere.

#### `claude --fork-session` — Fork a New Session from the Current One

**What it does:** Copies the current state (memory, context) into a new session. The original stays intact.

**When to use:** Want to try a new direction without breaking the main session — for example, attempt implementation A and B, then keep the better one.

#### `claude --remote` — Create a Session on claude.ai

**What it does:** The session runs on Anthropic's servers (not your machine) — close your terminal, the session keeps going.

**When to use:** Long jobs like big migrations or refactors across hundreds of files — you can shut down your laptop and sleep.

---

### Model and Effort Options

#### `--model <name>` — Select a Model

**What it does:** Tells Claude Code which model to use.

**When to use:** Save money (use Sonnet) or get a smarter brain (use Opus).

**Example:**
```bash
claude --model opus              # Opus 4.7 (smartest, expensive)
claude --model sonnet            # Sonnet 4.6 (balanced, recommended)
claude --model haiku             # Haiku 4.5 (fast, cheap, easy tasks)
claude --model claude-opus-4-7   # Full name (specify exact version)
```

> 💡 **Analogy:**
> - **Opus** = a professor — top of the class, but slow and expensive
> - **Sonnet** = a researcher — solid, fast, fair price
> - **Haiku** = a quick-witted student — answers fast, cheap, fine for easy work

#### `--effort low|medium|high|max` — Effort Level

**What it does:** Tells the model how thoroughly to think before answering — higher = slower + more expensive + more accurate.

**When to use:** Hard problems that need detailed reasoning (use `high`/`max`); easy questions that need speed (use `low`).

**Example:**
```bash
claude --model opus --effort max         # Opus thinking at full power
claude --model sonnet --effort low       # Sonnet at fast speed
```

> ⚠️ **Gotcha:** `--effort max` works **only with Opus 4.6** — other models fall back to `high`.

#### `--fallback-model <name>` — Backup Model

**What it does:** If the primary model is overloaded, use a backup instead.

**When to use:** When you can't afford interruptions — like CI/CD running 24/7.

**Example:**
```bash
claude --model opus --fallback-model sonnet
# Opus busy → automatically use Sonnet
```

---

### Permission Options

#### `--permission-mode <mode>` — Permission Mode

**What it does:** Controls how often Claude asks before running tools.

**Options:**

| Mode | Meaning | When to use |
|------|---------|-------------|
| `default` | Asks every time before using a tool | Normal work, safest |
| `acceptEdits` | Auto-approves Edit, still asks for Bash | You trust Claude's edits |
| `plan` | Plan Mode — Claude plans first, doesn't act | Big jobs, want a roadmap first |
| `auto` | Auto-approves most tools, still asks about destructive ones | Long jobs, want it smooth |
| `dontAsk` | Doesn't ask about tools listed in `allowedTools` | Used with `--allowedTools` |
| `bypassPermissions` | Skip every permission (dangerous!) | Sandbox only |

**Example:**
```bash
claude --permission-mode plan          # See the plan first
claude --permission-mode acceptEdits   # Smoother but still safe
```

#### `--enable-auto-mode` — Enable Auto Mode

**What it does:** Starts the session in Auto mode (the same one toggled by `Shift+Tab`) — fewer permission prompts.

**When to use:** You want to start in Auto mode without pressing Shift+Tab afterwards.

#### `--dangerously-skip-permissions` — Skip Everything ⚠️

**What it does:** Claude can run **any** command — `rm -rf`, `curl | bash`, **anything**.

**When to use:** Only inside a **throwaway container/VM** — like GitHub Actions or a Docker container.

**❌ Never use on:**
- Personal machines
- Production servers
- Machines holding important files
- When the prompt pulls data from the internet (prompt injection risk!)

**OK CI/CD example:**
```yaml
# GitHub Actions (in a throwaway VM)
- run: claude --dangerously-skip-permissions -p "run tests and fix failing"
```

#### `--allowedTools "Tool1,Tool2"` — Pre-Approve Tools

**What it does:** Pre-declares which tools can be used without asking.

**When to use:** You want Claude to run certain tools freely (no prompt every time) but still block dangerous ones.

**Example:**
```bash
# Allow Read and Edit, still ask before Bash
claude --allowedTools "Read,Edit,Grep,Glob"

# Allow Bash only for git/npm commands
claude --allowedTools "Bash(git *),Bash(npm *)"
```

#### `--disallowedTools "Tool1,Tool2"` — Block Tools

**What it does:** Forbids specific tools — regardless of any other permission.

**When to use:** When you want to forbid certain tools — like "never delete files" or "never push commits".

**Example:**
```bash
claude --disallowedTools "Bash(rm *),Bash(git push *)"
```

---

### System Prompt Options

#### `--system-prompt "text"` — Replace Entirely

**What it does:** Overwrites the entire System Prompt — Claude forgets it's "Claude Code".

**When to use:** You want Claude Code as a base but with a totally different persona/role (very advanced).

**Example:**
```bash
claude --system-prompt "You are a security auditor. Only point out vulnerabilities."
```

> ⚠️ **Gotcha:** Be careful — Claude stops being a normal coding assistant. Use only for special personas.

#### `--system-prompt-file <path>` — Load from File

**What it does:** Same as `--system-prompt`, but reads from a file — handy for long prompts.

**Example:**
```bash
claude --system-prompt-file ./prompts/security-auditor.md
```

#### `--append-system-prompt "text"` — Append (recommended!)

**What it does:** Adds extra instructions **after** the original System Prompt — Claude is still Claude Code.

**When to use:** When you want to add a special behavior just for this session, without overwriting core behavior.

**Example:**
```bash
claude --append-system-prompt "Always reply in Thai with lots of emoji"
claude --append-system-prompt "Never modify files in the /legacy folder"
```

---

### Output Options

#### `--output-format text|json|stream-json` — Output Format

**What it does:** Tells Claude what format the output should be in.

**Options:**

| Format | When to use | Looks like |
|--------|-------------|------------|
| `text` (default) | For humans to read | Normal text + nice UI |
| `json` | Scripts that process the result | One JSON blob |
| `stream-json` | Streaming + real-time processing | Multiple JSON blobs separated by newlines |

**Example:**
```bash
# Human-readable
claude -p "summarize README"

# Script-readable
claude -p "summarize README" --output-format json | jq '.result'
```

#### `--json-schema <schema>` — Force JSON Format

**What it does:** Forces Claude to answer in JSON matching a given schema — no need to guess the format.

**When to use:** When you want predictable structured output like `{name, age, email}`.

**Example:**
```bash
claude -p "extract user info from this email" \
  --json-schema '{"type":"object","properties":{"name":{"type":"string"},"email":{"type":"string"}}}'
# Output: {"name":"John","email":"john@example.com"}
```

#### `--input-format text|stream-json` — Input Format

**What it does:** Tells Claude what format the piped input is in.

**When to use:** When sending input with metadata as JSON (advanced).

#### `--verbose` — Show Detailed Logs

**What it does:** Shows every tool call and decision Claude makes — step by step.

**When to use:** Debug why Claude did something, or profile where time/tokens went.

**Example:**
```bash
claude -p "add tests for utils.ts" --verbose
# You'll see: Reading utils.ts... Writing utils.test.ts... etc.
```

#### `--debug <categories>` — Enable Debug Mode

**What it does:** Sends very detailed logs to stderr — only for selected categories.

**When to use:** Bug-reporting to Anthropic, or debugging a deep issue.

**Example:**
```bash
claude --debug api,mcp -p "test"   # debug only API + MCP
```

---

### Advanced Options

#### `--bare` — Bare Mode ⭐ (very important)

**What it does:** Disables **everything** related to customization: Hooks, Skills, Plugins, MCP, Memory (CLAUDE.md).

**When to use:**
- CI/CD that needs **predictable** behavior, independent of personal config
- Reproduce a bug that might come from a plugin
- Benchmark Claude Code core itself

**Example:**
```bash
# CI/CD safe — no personal hook/plugin interference
claude --bare -p "lint the code" --output-format json
```

> 💡 **Analogy:** Like Chrome Incognito + all extensions disabled — clean default state.

> ⚠️ **Gotcha:** `--bare` ≠ `-p`. `-p` means "answer once and quit"; `--bare` means "don't load customization". They can be combined.

#### `--max-turns <n>` — Limit the Number of Turns

**What it does:** Forbids Claude from running more than `n` turns (1 turn = 1 think + tool use cycle).

**When to use:** When you fear an infinite loop or scope creep — force the job to finish in N steps.

**Example:**
```bash
claude -p "fix this bug" --max-turns 10
# Claude tries to finish in 10 turns; if it goes over → stops with a report
```

#### `--max-budget-usd <amount>` — Cap the Budget

**What it does:** Stops once the token cost reaches the given USD amount.

**When to use:** When you fear runaway costs — especially in CI/CD or large batch jobs.

**Example:**
```bash
claude -p "refactor whole codebase" --max-budget-usd 5
# Hits $5 → stops immediately
```

> 💡 **Tip:** Combine with `--max-turns` for double protection.

#### `--config <file>` — Load an MCP Config

**What it does:** Use a specific MCP config file instead of the default.

**When to use:** When you have multiple MCP server sets and switch between them per task.

#### `--add-dir <path>` — Add a Directory

**What it does:** Extends the working directory so Claude can read/write in another folder too.

**When to use:** Cross-monorepo work, or when you want Claude to see another project's code as reference.

**Example:**
```bash
cd ~/my-app
claude --add-dir ../shared-lib --add-dir ~/docs
```

#### `--agent <name>` — Specify a Subagent

**What it does:** Starts the session with a specific subagent (like code-reviewer, security-auditor).

**When to use:** You want a specialized persona right away, without spawning from the main session.

**Example:**
```bash
claude --agent code-reviewer -p "review this PR"
```

#### `--init` — Run Initialization Hooks

**What it does:** Runs init hooks before starting the session (e.g., load env, fetch data).

#### `--version` — Show Version

**Example:**
```bash
$ claude --version
2.1.114
```

---

### Other Commands

```bash
claude auth login          # Log in
claude auth logout         # Log out
claude auth status         # Check status
claude setup-token         # Generate a token for CI
claude mcp                 # Manage MCP servers
claude plugin              # Manage plugins
claude update              # Update to the latest version
claude agents              # List subagents
claude remote-control      # Start the remote control server
```

---

## 🎯 Real Examples (with Output)

### Example 1: Quick Question, No Session

```bash
$ claude -p "What's the difference between JavaScript and TypeScript? Briefly."
```

**Output:**
```
TypeScript = JavaScript + Type System
- JavaScript: dynamic typing, types checked at runtime
- TypeScript: static typing, types checked at compile time
- TypeScript must compile to JavaScript before running
- TypeScript catches bugs earlier but requires more boilerplate
```

---

### Example 2: Analyze Git Log

```bash
$ git log --oneline -10 | claude -p "Summarize what was developed this round"
```

**Output:**
```
This past week the team focused on:
1. Login bug fixes (3 commits) — fixed session timeout, OAuth refresh
2. Payment integration (5 commits) — Stripe + PromptPay
3. User service refactor (2 commits) — extracted repository pattern
```

---

### Example 3: Plan Mode Before Acting

```bash
$ claude --permission-mode plan "Refactor the auth system to support OAuth"
```

**Output (summary):**
```
[Plan Mode] Here's my plan:

Step 1: Extract auth logic from user.service.ts → auth.service.ts
Step 2: Create an OAuth provider interface
Step 3: Implement Google + GitHub providers
Step 4: Add middleware for token validation
Step 5: Write tests covering the OAuth flow

Proceed? [Approve / Modify / Cancel]
```

---

### Example 4: Run in CI/CD

```bash
# .github/workflows/ai-review.yml
- run: |
    git diff origin/main | \
    claude --bare -p "Review this diff. Output JSON: {issues: [], suggestions: []}" \
           --output-format json \
           --max-budget-usd 1 \
           --allowedTools "Read,Grep,Glob" \
           --dangerously-skip-permissions \
    > review.json
```

**Output (`review.json`):**
```json
{
  "issues": [
    {"file": "src/auth.ts:42", "severity": "high", "msg": "Missing input validation"}
  ],
  "suggestions": [
    {"file": "src/utils.ts", "msg": "Consider extracting helper function"}
  ]
}
```

---

### Example 5: Batch Processing

```bash
# Analyze every file in src/, one at a time
for f in src/*.ts; do
  echo "=== $f ==="
  cat "$f" | claude -p "find code smells" --model sonnet --max-budget-usd 0.10
done
```

---

### Example 6: Parallel Work with Worktrees

```bash
# Terminal 1: Claude on a big feature
claude -w refactor-auth "Refactor all auth to OAuth"

# Terminal 2: You handle an urgent bug fix
git checkout main
git pull
# fix bug, commit, push

# Terminal 3: Check on Claude's work
cd ../my-project-refactor-auth
git log
```

---

### Example 7: Combine Subagent + Plan Mode

```bash
$ claude --agent security-auditor \
         --permission-mode plan \
         --append-system-prompt "Focus on OWASP Top 10" \
         -p "audit this codebase"
```

**Output:**
```
[Security Auditor — Plan Mode]

I will check:
✓ Injection vulnerabilities (SQL, NoSQL, Command)
✓ Broken authentication
✓ Sensitive data exposure
✓ XXE
✓ Broken access control
... [all OWASP Top 10]

Estimated ~50 turns and ~$2. Continue?
```

---

## 🔧 Combo Patterns Used in Real Life

### Pattern 1: CI/CD Code Review (safe + cheap)

```bash
claude --bare \
       -p "$REVIEW_PROMPT" \
       --output-format json \
       --max-budget-usd 1 \
       --max-turns 20 \
       --allowedTools "Read,Grep,Glob" \
       --dangerously-skip-permissions \
       --model sonnet
```

**Why:** `--bare` keeps plugins from skewing results, `--max-budget-usd` caps the spend, `--allowedTools` restricts to read-only tools, `sonnet` is cheap, and `--dangerously-skip-permissions` is OK because we're in a throwaway VM.

---

### Pattern 2: Long-Running Refactor (big + safe)

```bash
claude --model opus \
       --effort high \
       --permission-mode plan \
       --max-budget-usd 20 \
       --fallback-model sonnet \
       "refactor entire payment module"
```

**Why:** Opus + high effort = max smarts; plan mode = preview before acting; fallback = no interruptions; max-budget = no runaway cost.

---

### Pattern 3: Quick Q&A (fast + cheap)

```bash
alias ask='claude -p --model haiku --max-budget-usd 0.05'

ask "Differences between let, const, var"
ask "Explain closure in one sentence"
```

**Why:** Haiku = fast + cheap; small max-budget = no waste; alias = easy to call.

---

### Pattern 4: Multi-project Analysis

```bash
cd ~/main-app
claude --add-dir ~/api-server \
       --add-dir ~/shared-types \
       "find type mismatches across these 3 projects"
```

**Why:** Claude sees all 3 repos at once → can cross-reference types.

---

### Pattern 5: Structured Output for a Pipeline

```bash
cat error.log | \
  claude -p "categorize errors" \
         --json-schema '{"type":"array","items":{"type":"object","properties":{"category":{"type":"string"},"count":{"type":"number"}}}}' \
         --output-format json | \
  jq 'sort_by(.count) | reverse | .[0:5]' | \
  curl -X POST https://slack.webhook -d @-
```

**Why:** json-schema = predictable output; pipe to jq + curl = pushes results to Slack.

---

### Pattern 6: Safe Sandbox Exploration

```bash
claude --bare \
       --disallowedTools "Bash(rm *),Bash(git push *),Bash(npm publish *)" \
       --max-turns 30 \
       --append-system-prompt "Read-only exploration. Don't modify anything."
```

**Why:** `--bare` = clean state; `--disallowedTools` = blocks destructive commands; the prompt reinforces the behavior.

---

### Pattern 7: Headless Cron Job

```bash
# crontab: 0 */6 * * *
0 */6 * * * cd /var/myapp && \
  claude --bare -p "check logs and alert if errors > 100" \
                --max-budget-usd 0.50 \
                --output-format json \
                --allowedTools "Read,Bash(grep *)" \
                --dangerously-skip-permissions \
  | mail -s "Claude Health Report" admin@example.com
```

**Why:** Every 6 hours Claude checks logs and emails — done in one command.

---

## ⚠️ Common Pitfalls (the traps beginners fall into)

### Pitfall 1: Confusing `-p` with `--bare`

| | `-p` | `--bare` |
|---|------|----------|
| **What it does** | Answer once and exit, no session | Disable customization (Hooks/Skills/MCP/Memory) |
| **Can continue session?** | ❌ No | ✅ Yes (without `-p`) |
| **Loads CLAUDE.md?** | ✅ Yes | ❌ No |

**They combine:** `claude --bare -p "..."` = answer once + don't load customization (CI/CD's favorite).

---

### Pitfall 2: Using `--dangerously-skip-permissions` on Your Own Machine 💀

❌ **Don't:**
```bash
# On your personal MacBook
claude --dangerously-skip-permissions "fix the build"
# Claude could run rm -rf, curl | bash, anything!
```

✅ **OK:**
- Inside a throwaway Docker container
- Inside a GitHub Actions VM
- Inside a VM you snapshot before running

> 💡 **Rule of thumb:** If you'd cry over losing the machine → **don't use it**.

---

### Pitfall 3: Forgetting Quotes Around a Multi-Word Prompt

❌ **Wrong:**
```bash
claude -p please refactor the calculateTotal function
# Shell splits the args → Claude only sees "please"
```

✅ **Right:**
```bash
claude -p "please refactor the calculateTotal function"
```

---

### Pitfall 4: Piping Binary Files into Claude

❌ **Doesn't work:**
```bash
cat image.png | claude -p "analyze this"
# Binary → Claude can't read it; crash or wrong result
```

✅ **Use the Read tool inside a session:**
```bash
claude
> Please read image.png   # Claude uses the Read tool which supports binary
```

---

### Pitfall 5: Expecting `-c` to Work Across Folders

❌ **Wrong:**
```bash
cd ~/project-a && claude   # have a chat
cd ~/project-b && claude -c   # ❌ doesn't find the project-a session!
```

✅ **Right:** `-c` is always tied to the working directory — `cd` back to the same folder.

---

### Pitfall 6: Using `--model opus --effort max` for Easy Tasks

❌ **Wasteful:**
```bash
claude --model opus --effort max -p "What is 2+2?"
# Paying premium to answer something Haiku could nail
```

✅ **Match model to difficulty:**
- General questions → `haiku`
- Normal coding → `sonnet`
- Complex tasks needing approach choice → `opus`

---

### Pitfall 7: Thinking `--max-budget-usd` Excludes Cache Hits

⚠️ **Watch out:** The budget counts every token sent (including cached ones) — not just "real cost".

If you use heavy caching, the actual cost may be lower than the cap — that's good for you, but don't set the cap so low it hard-fails often.

---

### Pitfall 8: `--allowedTools` with Bash Needs Patterns

❌ **Too broad (dangerous):**
```bash
claude --allowedTools "Bash"
# Any Bash command passes — including rm -rf!
```

✅ **Be specific:**
```bash
claude --allowedTools "Bash(git *),Bash(npm test),Bash(npm run *)"
# Only git, npm test, npm run xxx
```

---

### Pitfall 9: Running `claude update` in CI/CD

❌ **Don't do this:**
```yaml
# CI workflow
- run: claude update   # ❌ installs the new version every run → reproducibility broken
```

✅ **Pin the version in setup:**
```yaml
- run: npm install -g @anthropic-ai/claude-code@2.1.114
```

---

### Pitfall 10: Expecting `--bare` to Disable the **Network** Too

❌ **Misconception:** `--bare` = cuts internet
✅ **Truth:** `--bare` cuts **local customization** (Hooks/Skills/MCP/Memory) only — the Anthropic API still runs over the internet as usual.

---

## 📌 Beginner Cheat Sheet

**3 commands you'll use 80% of the time:**
```bash
claude                       # start working
claude -c                    # continue from earlier
claude -p "..."              # quick question
```

**3 flags to know before fully trusting Claude:**
```bash
--permission-mode plan       # see the plan first
--max-budget-usd 5           # cap the spend
--model sonnet               # save money
```

**3 flags for CI/CD:**
```bash
--bare                       # disable customization
--output-format json         # easy for scripts to parse
--allowedTools "..."         # restrict tools
```

---

---

## Navigation

- ⬅️ Previous: [[01-installation]]
- ➡️ Next: [[03-slash-commands]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/02-cli-commands]]
