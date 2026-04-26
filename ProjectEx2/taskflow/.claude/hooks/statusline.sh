#!/usr/bin/env bash
# Status line script — appears at the bottom of every Claude Code prompt.
# Stdin is JSON like: { "model_name":"...", "current_dir":"...", "session_id":"..." }
# Stdout's first line becomes the status line.

set -euo pipefail

# Quick context (kept tiny — runs on every render)
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '-')"
DIRTY=""
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then DIRTY="*"; fi
TASKS="?"
if [ -f .taskflow.json ]; then
  TASKS="$(node -e "
    try {
      const s=JSON.parse(require('fs').readFileSync('.taskflow.json','utf8'));
      const open=s.items.filter(t=>!t.done).length;
      console.log(open + '/' + s.items.length);
    } catch { console.log('?'); }
  ")"
fi

echo "🌊 taskflow | ${BRANCH}${DIRTY} | tasks ${TASKS} | $(node -v)"
