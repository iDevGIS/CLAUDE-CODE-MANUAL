---
title: "MCP Servers (Model Context Protocol)"
section: 9
lang: en
tags:
  - claude-code
  - mcp
  - integrations
aliases:
  - "MCP Servers"
related:
  - "[[10-hooks]]"
  - "[[17-ide-integration]]"
---

# MCP Servers (Model Context Protocol)

### Benefits and Use Cases

> **Why use MCP?**
>
> MCP lets Claude Code **connect to external tools** — beyond reading and writing files in your project, it can access databases, send Slack messages, read documents from Google Drive, and control browsers.

**Use Cases:**

| MCP Server | Use Case | Real-World Example |
|------------|----------|--------------------|
| **Puppeteer** | Automated UI testing | "Open the login page, fill in email/password, click submit, then take a screenshot" — Claude does it all in a real browser |
| **Slack** | Team notifications | "Send a message to #dev-channel saying the deploy is done" — Claude sends the Slack message right away |
| **GitHub** | Manage PRs/Issues | "List the open issues in project X and summarize them" — Claude reads issues straight from GitHub |
| **Google Drive** | Read spec documents | "Read the Google Doc with the API spec and create endpoints to match" — Claude reads the doc and writes the code |
| **Linear/Jira** | Manage tasks | "Create a ticket in Linear for the bug we just found" — Claude creates the ticket with details |
| **Notion** | Read/write documents | "Update the meeting notes in Notion with the code review summary" — Claude writes to Notion |
| **Database MCP** | Query real data | "How many users registered today?" — Claude queries the database and answers |
| **Custom MCP** | Connect to internal tools | Build your own MCP server that connects to internal systems |

**Real-world example:**

```
Scenario: The team reports that the Submit button doesn't work on the login page

Without MCP:
  1. Open the browser yourself
  2. Go to the login page
  3. Test it yourself
  4. Take a screenshot
  5. Come back and tell Claude

With Puppeteer MCP:
  You: "Open the login page and test the submit button"
  Claude: (opens browser → fills form → clicks button → screenshots → analyzes error)
  Claude: "Found it — the submit button has an event handler that throws because..."
  → Claude does it all without leaving the terminal
```

### What is MCP?

A protocol that connects Claude Code to external tools and data sources such as databases, APIs, and cloud services.

### Available MCP Servers

- **Google Drive** — access documents
- **Slack** — read/write messages
- **GitHub** — access repos, PRs, issues
- **Linear** — project management
- **Jira** — issue tracking
- **Notion** — notes and databases
- **Puppeteer** — browser control
- And many more

### Configuring an MCP Server

**In settings.json:**
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
```

**In .mcp.json (project level):**
```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"]
    }
  }
}
```

**Via the CLI:**
```bash
claude mcp add <server-name>
```

**Via a CLI flag:**
```bash
claude --mcp-config ./mcp.json
```

### Using MCP in a Session

- MCP tools appear as available commands
- Use the `mcp__<server>__<tool>` format to call them
- Use `/mcp` to see server status
- MCP permissions are configured under `permissions.allow/deny`

### Example: Configuring Puppeteer MCP

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"],
      "env": {
        "HEADLESS": "true"
      }
    }
  }
}
```

Usage: Claude can open web pages, take screenshots, click buttons, etc.

---

---

## Navigation

- ⬅️ Previous: [[08-memory]]
- ➡️ Next: [[10-hooks]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/09-mcp-servers]]
