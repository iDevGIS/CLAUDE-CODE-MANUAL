---
description: Health-check style command shipped via the plugin
allowed-tools: Bash(curl:*), Bash(node:*)
argument-hint: [url, default http://localhost:3000/health]
---

Ping the TaskFlow HTTP server and report status + latency.

URL: `${ARGUMENTS:-http://localhost:3000/health}`

Steps:
1. `curl -s -o /dev/null -w '%{http_code} %{time_total}s\n' <url>`
2. If 200: report `OK <latency>`.
3. If non-200 or curl fails: report `DOWN` and suggest `npm run serve`.
