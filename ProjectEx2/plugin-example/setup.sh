#!/usr/bin/env bash
# setup.sh — install (or uninstall) the taskflow-tools Claude Code plugin.
#
# Usage:
#   bash setup.sh                # install (symlink) into ~/.claude/plugins/taskflow-tools
#   bash setup.sh --copy         # copy files instead of symlinking (use on Windows without dev mode)
#   bash setup.sh --uninstall    # remove the symlink/copy
#   bash setup.sh --target DIR   # use a different plugins directory
#
# After install: open `claude` in any project, run `/plugins`, then enable `taskflow-tools`.

set -euo pipefail

PLUGIN_NAME="taskflow-tools"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_BASE="${HOME}/.claude/plugins"
MODE="symlink"
ACTION="install"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --copy)        MODE="copy"; shift ;;
    --uninstall)   ACTION="uninstall"; shift ;;
    --target)      TARGET_BASE="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *)
      echo "unknown option: $1" >&2; exit 2 ;;
  esac
done

TARGET_DIR="${TARGET_BASE}/${PLUGIN_NAME}"

echo "→ source: ${SOURCE_DIR}"
echo "→ target: ${TARGET_DIR}"

if [[ "${ACTION}" == "uninstall" ]]; then
  if [[ -L "${TARGET_DIR}" || -d "${TARGET_DIR}" ]]; then
    rm -rf "${TARGET_DIR}"
    echo "✓ removed ${TARGET_DIR}"
  else
    echo "nothing to remove at ${TARGET_DIR}"
  fi
  exit 0
fi

# basic sanity: must contain plugin.json
if [[ ! -f "${SOURCE_DIR}/plugin.json" ]]; then
  echo "✗ plugin.json not found in ${SOURCE_DIR}" >&2
  exit 1
fi

mkdir -p "${TARGET_BASE}"

# refuse to clobber a real (non-link) directory silently
if [[ -e "${TARGET_DIR}" && ! -L "${TARGET_DIR}" ]]; then
  echo "✗ ${TARGET_DIR} exists and is not a symlink. Remove it first or run with --uninstall." >&2
  exit 1
fi

# remove any existing symlink before re-creating
[[ -L "${TARGET_DIR}" ]] && rm "${TARGET_DIR}"

if [[ "${MODE}" == "symlink" ]]; then
  if ln -s "${SOURCE_DIR}" "${TARGET_DIR}" 2>/dev/null; then
    echo "✓ symlinked ${TARGET_DIR} → ${SOURCE_DIR}"
  else
    echo "! symlink failed (likely Windows without dev mode). Falling back to --copy."
    MODE="copy"
  fi
fi

if [[ "${MODE}" == "copy" ]]; then
  rm -rf "${TARGET_DIR}"
  mkdir -p "${TARGET_DIR}"
  cp -R "${SOURCE_DIR}/." "${TARGET_DIR}/"
  echo "✓ copied to ${TARGET_DIR} (re-run setup.sh to refresh after edits)"
fi

cat <<EOF

Next steps:
  1) Open any project:   claude
  2) Inside Claude:      /plugins
  3) Enable:             ${PLUGIN_NAME}

Verify:
  Slash command:         /ping
  Subagent:              taskflow-helper

To uninstall:            bash $(basename "$0") --uninstall
EOF
