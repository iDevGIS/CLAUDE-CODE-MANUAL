#!/usr/bin/env bash
# Headless mode example — run Claude Code non-interactively in a script.
# Use case: CI step that asks the reviewer subagent to comment on a PR diff.
#
# Usage: ./scripts/headless-review.sh [base-ref]
#   base-ref defaults to "main"
#
# Requires: `claude` CLI installed + authenticated (or ANTHROPIC_API_KEY set).

set -euo pipefail

BASE="${1:-main}"
MODEL="${CLAUDE_MODEL:-claude-sonnet-4-6}"

if ! command -v claude >/dev/null 2>&1; then
  echo "claude CLI not found — skipping headless review" >&2
  exit 0
fi

DIFF="$(git diff "${BASE}"...HEAD)"
if [ -z "$DIFF" ]; then
  echo "no diff vs ${BASE}, nothing to review"
  exit 0
fi

PROMPT=$(cat <<EOF
Use the 'reviewer' subagent on the diff below.

Output: just the agent's verdict block, nothing else.

---DIFF START---
$DIFF
---DIFF END---
EOF
)

# -p / --print = headless one-shot mode
# --output-format stream-json prints structured output one event per line
# --permission-mode plan keeps the agent from accidentally mutating files
echo "$PROMPT" | claude \
  --print \
  --model "$MODEL" \
  --permission-mode plan \
  --output-format text
