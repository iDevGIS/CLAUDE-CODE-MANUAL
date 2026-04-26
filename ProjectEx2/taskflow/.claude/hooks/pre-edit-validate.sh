#!/usr/bin/env bash
# PreToolUse hook (Edit|Write) — guard rails before code mutations.
# Blocks edits to forbidden paths even when permissions might allow them.
# Exit 2 = block the tool call.

set -euo pipefail

PAYLOAD="$(cat)"
# Naive grep — sufficient for demo. Real version would parse JSON via jq.
if echo "$PAYLOAD" | grep -qE '"(file_path|path)"\s*:\s*"[^"]*\.taskflow(\.[^"]*)?\.json"'; then
  echo "blocked: refusing to write the runtime DB (.taskflow*.json) directly. Use the CLI/HTTP API." >&2
  exit 2
fi

if echo "$PAYLOAD" | grep -qE '"(file_path|path)"\s*:\s*"[^"]*/\.env(\.[^"]*)?\b'; then
  echo "blocked: refusing to write .env files. Edit .env.example instead and copy manually." >&2
  exit 2
fi

[[ "${TASKFLOW_HOOK_DEBUG:-0}" == "1" ]] && echo "[hook:pre-edit-validate] ok" >&2
exit 0
