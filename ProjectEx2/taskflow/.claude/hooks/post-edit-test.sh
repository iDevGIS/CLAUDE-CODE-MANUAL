#!/usr/bin/env bash
# PostToolUse hook (Edit|Write) — run tests + lint after every code change.
# Output is fed back to Claude as context, so it can self-correct.

set -euo pipefail

PAYLOAD="$(cat)"
FILE="$(echo "$PAYLOAD" | sed -n 's/.*"file_path"\s*:\s*"\([^"]*\)".*/\1/p' | head -1)"

# Skip non-code changes
case "$FILE" in
  *.md|*.json|*.txt|*.example) exit 0;;
esac

echo "[hook:post-edit-test] running npm test + lint after edit to: ${FILE:-?}"

if ! npm test --silent 2>&1 | tail -10; then
  echo "[hook:post-edit-test] tests FAILED — fix before continuing"
  exit 1
fi

if ! node scripts/lint.js; then
  echo "[hook:post-edit-test] lint FAILED — fix style/dependency rules"
  exit 1
fi

echo "[hook:post-edit-test] ok"
exit 0
