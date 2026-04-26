---
description: Run the reviewer subagent on the pending diff
allowed-tools: Bash(git diff:*), Bash(git status), Bash(git log:*), Task
---

Use the `reviewer` subagent to review the current pending changes.

Steps:
1. Show `git status` + a one-line summary of changed files
2. Invoke the `reviewer` subagent with the diff
3. Print the agent's verdict (LGTM / NEEDS WORK + findings)
4. If NEEDS WORK: stop here — do not auto-fix. Wait for user direction.
5. If LGTM: suggest the next step (run `/test`, then commit)

$ARGUMENTS — if given, treat as a `git diff` ref (e.g. `main`, `HEAD~3`). Default: unstaged + staged.
