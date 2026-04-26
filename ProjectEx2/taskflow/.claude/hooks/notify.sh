#!/usr/bin/env bash
# Notification hook — fires when Claude Code shows a notification
# (e.g. waiting for permission, idle for too long).
# Use it to flash terminal title / send desktop notification / play sound.

set -euo pipefail

PAYLOAD="$(cat)"
MSG="$(echo "$PAYLOAD" | sed -n 's/.*"message"\s*:\s*"\([^"]*\)".*/\1/p' | head -1)"

# Set terminal title (works in most terminals)
printf '\033]0;Claude: %s\007' "${MSG:-attention}" >&2

# Log
mkdir -p .claude/.logs
echo "$(date -Iseconds)  ${MSG}" >> .claude/.logs/notifications.log

exit 0
