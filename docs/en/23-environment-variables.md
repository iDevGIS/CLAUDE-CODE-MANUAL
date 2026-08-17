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
| `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` | Per-session cap on subagent spawns; `/clear` resets the budget. The default cap of 200 was removed in v2.1.224 — long sessions no longer refuse new agents (concurrency and depth limits still apply). *(v2.1.212, changed v2.1.224)* |
| `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` | Threshold (ms) before a long-running MCP tool call moves to the background automatically (default 2 minutes); also disables the behavior. *(v2.1.212)* |
| `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` | Truncation limit (default 60 KB) for OpenTelemetry content attributes. *(v2.1.214)* |
| `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` | Cap on concurrently-running subagents (default 20), so one message can't fan out unbounded background agents. *(v2.1.217)* |
| `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` | Cap on nested-subagent spawn depth — default 3 since v2.1.219 (nesting was off by default in v2.1.217–218); set `1` to disable nesting. *(v2.1.217, changed v2.1.219)* |
| `FORCE_HYPERLINK` | Footer PR badge links render as clickable hyperlinks even when terminal support can't be detected (e.g. over ssh/tmux); set `0` to opt out. *(v2.1.217)* |
| `CLAUDE_CODE_RESUME_INTERRUPTED_TURN` | Auto-resume of an interrupted turn; set `0` to disable — falsy values are honored since v2.1.221. *(v2.1.221)* |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | Holds **every** Claude model with a native 1M window to 200K via auto-compaction (previously only a fixed list of models); a startup warning appears when auto-compaction isn't holding the session to 200K. *(changed v2.1.223)* |
| `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT` | Set `1` to let sessions on unrecognized model IDs grow past the assumed context window again — since v2.1.223 auto-compact keeps them inside it by default. *(v2.1.223)* |
| `ANTHROPIC_BEDROCK_REGION_PREFIX` | On Bedrock, prefer a specific cross-region inference profile instead of the one derived from `AWS_REGION`. *(v2.1.224)* |
| `CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS` | Stagger between sibling workflow agents that share a prompt prefix, so later agents hit the cached prefix; set `0` to disable. *(v2.1.229)* |
| `CLAUDE_CODE_TOOL_MEMORY_LIMIT` | Opt-in memory cgroup for Bash tool commands on Linux, so a runaway build can't stall the session. *(v2.1.233)* |
| `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` | TTL of the WebFetch session URL cache (default unchanged: 15 minutes). *(v2.1.233)* |
| `CLAUDE_CODE_ENABLE_TODO_TOOLS` | Set `1` to restore the todo/task tools (`TaskCreate`, `TaskGet`, `TaskUpdate`, `TaskList`, `TodoWrite`), which are no longer available on Opus 4.8, Sonnet 5, Fable 5, Mythos 5, and newer models. *(v2.1.233)* |
| `CLAUDE_CODE_PROJECT_DIR_NAME` | Optional short name for the per-project transcript directory — for hosts that give each session its own config directory. *(v2.1.234)* |
| `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` | How long background tasks may keep a `/goal` waiting (30 minutes by default) before Claude checks in on them; set `0` to opt out. *(v2.1.234)* |

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
