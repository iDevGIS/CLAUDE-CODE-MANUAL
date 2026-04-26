#!/usr/bin/env bash
# UserPromptSubmit hook — runs every time the user submits a prompt.
# Logs prompts for later replay/analysis. Stays silent in conversation
# (only writes to a file). Echoing to stdout would inject into context.

set -euo pipefail

LOG_DIR=".claude/.logs"
mkdir -p "$LOG_DIR"

# Hook receives JSON on stdin: { "prompt": "...", "session_id": "..." }
# We just append a one-line summary.
PAYLOAD="$(cat)"
PROMPT_PREVIEW="$(echo "$PAYLOAD" | head -c 200 | tr '\n' ' ')"
echo "$(date -Iseconds)  ${PROMPT_PREVIEW}" >> "$LOG_DIR/prompts.log"

[[ "${TASKFLOW_HOOK_DEBUG:-0}" == "1" ]] && echo "[hook:user-prompt-log] logged prompt" >&2
exit 0
