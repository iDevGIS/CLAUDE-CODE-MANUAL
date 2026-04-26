#!/usr/bin/env bash
# Stop hook — runs when Claude finishes its turn.
# Good place to: print a summary, kick off a background job, vacuum logs.

set -euo pipefail

LOG_DIR=".claude/.logs"
mkdir -p "$LOG_DIR"

CHANGED="$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
LAST_TEST="$(grep -E '\[hook:post-edit-test\]' "$LOG_DIR/post-edit.log" 2>/dev/null | tail -1 || echo 'no test runs this session')"

cat >> "$LOG_DIR/sessions.log" <<EOF
--- $(date -Iseconds) ---
changed_files: $CHANGED
last_test:     $LAST_TEST
EOF

# Trim logs older than 14 days
find "$LOG_DIR" -type f -name '*.log' -mtime +14 -delete 2>/dev/null || true

[[ "${TASKFLOW_HOOK_DEBUG:-0}" == "1" ]] && echo "[hook:stop-summary] logged session" >&2
exit 0
