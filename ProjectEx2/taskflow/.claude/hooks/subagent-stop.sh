#!/usr/bin/env bash
# SubagentStop hook — runs when a subagent (Task tool invocation) finishes.
# Useful for tracking how many tokens specialized agents are spending
# or post-processing their output.

set -euo pipefail

LOG_DIR=".claude/.logs"
mkdir -p "$LOG_DIR"

PAYLOAD="$(cat)"
AGENT="$(echo "$PAYLOAD" | sed -n 's/.*"subagent_type"\s*:\s*"\([^"]*\)".*/\1/p' | head -1)"

echo "$(date -Iseconds)  subagent_done: ${AGENT:-?}" >> "$LOG_DIR/subagents.log"
exit 0
