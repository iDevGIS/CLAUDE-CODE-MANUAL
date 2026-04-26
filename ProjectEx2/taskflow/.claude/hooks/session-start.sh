#!/usr/bin/env bash
# SessionStart hook — runs at the start of each Claude session.
# Use it to surface project state so you don't waste tokens on `git status`.

set -euo pipefail

[[ "${TASKFLOW_HOOK_DEBUG:-0}" == "1" ]] && echo "[hook:session-start] $(date -Iseconds)" >&2

cat <<EOF
=== TaskFlow session start ===
branch:  $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'no-git')
status:  $(git status --porcelain 2>/dev/null | wc -l | tr -d ' ') changed file(s)
node:    $(node -v)
db:      ${TASKFLOW_DB:-.taskflow.json}
hint:    PostToolUse hook will auto-run npm test after edits
EOF
