#!/usr/bin/env bash
# PreToolUse hook (Bash) — block obviously dangerous commands as a safety net
# in addition to permissions.deny in settings.json.
# Exit 2 = block the tool call.

set -euo pipefail

PAYLOAD="$(cat)"
CMD="$(echo "$PAYLOAD" | sed -n 's/.*"command"\s*:\s*"\(.*\)".*/\1/p' | head -1)"

case "$CMD" in
  *"rm -rf /"*|*"rm -rf ~"*|*"rm -rf $HOME"*)
    echo "blocked: rm -rf on root/home" >&2; exit 2;;
  *"git push --force"*|*"git push -f"*)
    echo "blocked: force push" >&2; exit 2;;
  *"chmod -R 777"*)
    echo "blocked: chmod -R 777" >&2; exit 2;;
  *"curl"*"169.254."*|*"wget"*"169.254."*)
    echo "blocked: cloud metadata endpoint" >&2; exit 2;;
esac

[[ "${TASKFLOW_HOOK_DEBUG:-0}" == "1" ]] && echo "[hook:pre-bash-guard] ok: $CMD" >&2
exit 0
