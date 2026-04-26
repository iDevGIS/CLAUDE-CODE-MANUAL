---
walkthrough: 06
title: MCP Servers — connect external tools
related:
  - "[[03-permissions-deep-dive]]"
  - "[[07-plugins]]"
---

# 06 — MCP Servers: เชื่อม Claude Code กับโลกภายนอก

> เป้าหมาย: เข้าใจ Model Context Protocol และดูตัวอย่างใน TaskFlow

## MCP คืออะไร (สั้นมาก)

Protocol มาตรฐานที่ให้ Claude Code (และ client อื่น) คุยกับ external tools ผ่าน JSON-RPC ผ่าน stdio / HTTP

ผลของการ install MCP server: tools ใหม่ (ชื่อขึ้นต้น `mcp__<server>__<tool>`) โผล่ใน Claude พร้อมใช้

## TaskFlow มีตัวอย่าง

ดู `taskflow/.claude/mcp.json` — config 4 servers:

```json
{
  "mcpServers": {
    "filesystem":      { ... อ่าน/เขียนไฟล์ในโปรเจกต์ },
    "github":          { ... อ่าน PR, issue, file contents },
    "sqlite-readonly": { ... query SQLite read-only },
    "fetch":           { ... ดึง URL }
  }
}
```

## ติดตั้ง (วิธี 1 — ผ่าน CLI)

```bash
# install ที่ระดับ user (ใช้ทุกโปรเจกต์)
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .
claude mcp add github -- npx -y @modelcontextprotocol/server-github
claude mcp list
```

## ติดตั้ง (วิธี 2 — แก้ไฟล์ตรง ๆ)

แก้ `~/.claude.json` (user) หรือ `.mcp.json` ที่ root โปรเจกต์ (ใช้เฉพาะโปรเจกต์):

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." }
    }
  }
}
```

> ⚠️ **อย่า hard-code token** — ใช้ `${GITHUB_TOKEN}` แล้ว export ใน shell

## Permission สำหรับ MCP tool

MCP tool มี name pattern `mcp__<server>__<tool>` → ใส่ใน `permissions.allow` / `deny` ได้:

```json
{
  "permissions": {
    "allow": [
      "mcp__github__get_pull_request",
      "mcp__github__list_issues"
    ],
    "deny": [
      "mcp__github__create_pull_request",
      "mcp__filesystem__write_file"
    ]
  }
}
```

## Pattern ที่ดี

1. **Scope แต่ละ server แคบ** — filesystem → ชี้ไปที่โฟลเดอร์โปรเจกต์เท่านั้น, ไม่ใช่ `/`
2. **Read-only ก่อน** — ใช้ `sqlite-readonly` แทน `sqlite-rw` ถ้าไม่ต้อง write
3. **Token จาก env** — ห้ามอยู่ใน config ที่ commit
4. **Allowlist tool ที่ใช้** — `deny` ทุกอย่างที่เปลี่ยนสถานะ (create/update/delete)

## Pitfalls

- **MCP server ที่ไม่ trust** — ถือว่าเป็น 3rd-party code, รัน sandbox ถ้าทำได้
- **MCP server ที่อ่านไฟล์ระบบ** — `filesystem` server ที่ scope เป็น `/` = อันตรายเทียบกับให้ root shell
- **Token leak** — log ของ MCP server อาจพ่น header ที่มี token; ดู `.claude/.logs/` ก่อน commit

## Debug

```
> /mcp
# list servers + status
```

ถ้า server ไม่ทำงาน:
```bash
claude mcp list
claude mcp restart filesystem
```

## Related

- **[[07-plugins]]** — plugin สามารถ bundle MCP server config ติดมาได้
- **[[03-permissions-deep-dive]]** — MCP permission ทำงานแบบเดียวกับ Bash/Edit
