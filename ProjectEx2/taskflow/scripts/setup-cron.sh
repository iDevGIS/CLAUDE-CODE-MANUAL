#!/usr/bin/env bash
# One-shot installer: register scheduled-summary.sh in the user's crontab.
# Idempotent — won't add a duplicate entry.

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENTRY="0 8 * * * cd $PROJECT_DIR && bash scripts/scheduled-summary.sh >/dev/null 2>&1"

CURRENT="$(crontab -l 2>/dev/null || true)"
if echo "$CURRENT" | grep -Fq "$PROJECT_DIR/scripts/scheduled-summary.sh"; then
  echo "already installed:"
  echo "$CURRENT" | grep -F "$PROJECT_DIR"
  exit 0
fi

(echo "$CURRENT"; echo "$ENTRY") | crontab -
echo "installed cron entry:"
echo "$ENTRY"
