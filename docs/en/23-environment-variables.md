---
title: "Environment Variables"
section: 23
lang: en
tags:
  - claude-code
  - environment-variables
  - reference
aliases:
  - "Environment Variables"
related:
  - "[[06-configuration]]"
  - "[[05-permissions]]"
---

# Environment Variables

### Benefits and Use Cases

> **Why know about environment variables?**
>
> Environment variables let you **control Claude Code via env vars** — useful in CI/CD, Docker, or any environment where editing a config file is awkward.

**Use Cases:**

| Variable | Use Case | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Use in CI/CD | Set the API key in GitHub Secrets and Claude can use it directly in Actions |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Use in shared environments | Disable memory when several people share one machine — prevents data mixing |
| `CLAUDE_CODE_SIMPLE` | Use in scripts | Auto-enable bare mode for clean output and no UI |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | Try out agent teams | Enable the experimental agent teams feature |
| `CLAUDE_CONFIG_DIR` | Use multiple configs | Point at a different config directory — handy for testing |

### Important Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for authentication |
| `CLAUDE_CONFIG_DIR` | Override the config directory |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | Directory for debug logs |
| `CLAUDE_CODE_SIMPLE` | Enable bare mode |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Disable Auto Memory |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Disable background tasks |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | Enable agent teams |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | Use PowerShell instead of Bash |
| `CLAUDE_SESSION_ID` | Specify a session ID |
| `CLAUDE_CODE_TASK_LIST_ID` | Name a task list |
| `CLAUDE_CODE_SAFE_MODE` | Start with all customizations disabled (= `--safe-mode`) |
| `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` | Hide bundled skills/workflows/built-in commands |
| `CLAUDE_CLIENT_PRESENCE_FILE` | Marker file to suppress mobile push while you're at the machine |
| `CLAUDE_CODE_ENABLE_AUTO_MODE` | Opt into Auto mode on Bedrock/Vertex/Foundry — not required since v2.1.207 (on by default; disable with the `disableAutoMode` setting) |
| `CLAUDE_CODE_RETRY_WATCHDOG` | Retry watchdog for unattended sessions — raises default retries for transient errors to 300 and lifts the 15-cap on `CLAUDE_CODE_MAX_RETRIES` *(v2.1.199)* |
| `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` | Abort remote MCP tool calls that hang |
| `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` | Disable mouse click/drag/hover in fullscreen mode (wheel scroll still works). *(v2.1.195)* |
| `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP` | Disable auto-reaping of idle background shell commands under memory pressure. *(v2.1.193)* |
| `OTEL_LOG_ASSISTANT_RESPONSES` | Log the model's response text via OpenTelemetry (`=1` on, `=0` off; when unset, follows `OTEL_LOG_USER_PROMPTS`). *(v2.1.193)* |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` | Streaming idle watchdog (on by default) — aborts & retries a stream with no events for 5 min; set `0` to disable. *(v2.1.198)* |
| `CLAUDE_AX_SCREEN_READER` | Screen reader mode — plain-text rendering (= `--ax-screen-reader` / the `axScreenReader` setting). *(v2.1.208)* |
| `CLAUDE_CODE_PROCESS_WRAPPER` | Corporate launcher wrapper — every Claude Code self-spawn (agent view, background service) runs through the required wrapper executable. *(v2.1.208)* |
| `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT` | Include subagent text and thinking in `stream-json` output (= `--forward-subagent-text`). *(v2.1.211)* |
| `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` | Session-wide limit on WebSearch tool calls (default 200) to stop runaway search loops. *(v2.1.212)* |
| `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` | Per-session cap on subagent spawns (default 200); `/clear` resets the budget. *(v2.1.212)* |
| `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` | Threshold (ms) before a long-running MCP tool call moves to the background automatically (default 2 minutes); also disables the behavior. *(v2.1.212)* |
| `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` | Truncation limit (default 60 KB) for OpenTelemetry content attributes. *(v2.1.214)* |

> Integer-valued env vars (timeouts, token budgets, retry counts) also accept scientific notation and digit separators, e.g. `1e6` or `64_000`. *(v2.1.211)*

> OpenTelemetry log events now carry `message.uuid`, `client_request_id`, and `tool_source` attributes for message-level correlation and tool provenance. *(v2.1.214)*

### Configure in settings.json

```json
{
  "env": {
    "NODE_ENV": "development",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

---

## Navigation

- ⬅️ Previous: [[22-directory-structure]]
- ➡️ Next: [[24-troubleshooting]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/23-environment-variables]]
