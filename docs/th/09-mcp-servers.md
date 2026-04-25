---
title: "MCP Servers (Model Context Protocol)"
section: 9
lang: th
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

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ MCP?**
>
> MCP ทำให้ Claude Code **เชื่อมต่อกับเครื่องมือภายนอกได้** — ไม่ใช่แค่อ่าน/เขียนไฟล์ในโปรเจกต์ แต่ยังสามารถเข้าถึง Database, ส่งข้อความ Slack, อ่านเอกสารจาก Google Drive, ควบคุม Browser ได้อีกด้วย

**Use Cases:**

| MCP Server | Use Case | ตัวอย่างการใช้งานจริง |
|-----------|----------|-------------------|
| **Puppeteer** | ทดสอบ UI อัตโนมัติ | "เปิดหน้า Login, กรอก Email/Password, กดปุ่ม Submit แล้วถ่าย Screenshot" — Claude ทำทั้งหมดนี้ให้ผ่าน Browser จริง |
| **Slack** | แจ้งเตือนทีม | "ส่งข้อความไป #dev-channel ว่า Deploy เสร็จแล้ว" — Claude ส่ง Slack ให้ทันที |
| **GitHub** | จัดการ PR/Issues | "ดู Issues ที่ยังเปิดอยู่ในโปรเจกต์ X แล้วสรุปให้" — Claude อ่าน Issues จาก GitHub ตรง ๆ |
| **Google Drive** | อ่านเอกสาร Spec | "อ่าน Google Doc เรื่อง API Spec แล้วสร้าง Endpoint ตามนั้น" — Claude อ่านเอกสารแล้วเขียนโค้ดให้ |
| **Linear/Jira** | จัดการ Tasks | "สร้าง Ticket ใน Linear สำหรับ Bug ที่เพิ่งเจอ" — Claude สร้าง Ticket พร้อมรายละเอียดให้ |
| **Notion** | อ่าน/เขียนเอกสาร | "อัปเดต Meeting Notes ใน Notion ด้วยสรุปจาก Code Review" — Claude เขียนลง Notion ให้ |
| **Database MCP** | Query ข้อมูลจริง | "ดูว่ามี User กี่คนที่ลงทะเบียนวันนี้" — Claude Query Database แล้วตอบ |
| **Custom MCP** | เชื่อมต่อ Internal Tools | สร้าง MCP Server เอง เชื่อมต่อกับระบบภายในองค์กร |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: ทีมรายงาน Bug ว่าปุ่ม Submit ไม่ทำงานบนหน้า Login

ก่อนมี MCP:
  1. เปิด Browser เอง
  2. ไปหน้า Login
  3. ทดสอบเอง
  4. ถ่าย Screenshot
  5. กลับมาบอก Claude

หลังมี Puppeteer MCP:
  คุณ: "ลองเปิดหน้า Login แล้วทดสอบปุ่ม Submit ให้หน่อย"
  Claude: (เปิด Browser → กรอกฟอร์ม → กดปุ่ม → ถ่าย Screenshot → วิเคราะห์ Error)
  Claude: "เจอปัญหาแล้ว ปุ่ม Submit มี event handler ที่ throw Error เพราะ..."
  → Claude ทำทั้งหมดเองโดยไม่ต้องออกจาก Terminal
```

### MCP คืออะไร?

โปรโตคอลที่เชื่อมต่อ Claude Code กับเครื่องมือและแหล่งข้อมูลภายนอก เช่น ฐานข้อมูล, API, Cloud Services

### MCP Servers ที่มีให้ใช้

- **Google Drive** - เข้าถึงเอกสาร
- **Slack** - อ่าน/เขียนข้อความ
- **GitHub** - เข้าถึง Repos, PRs, Issues
- **Linear** - Project Management
- **Jira** - Issue Tracking
- **Notion** - Notes และ Databases
- **Puppeteer** - ควบคุม Browser
- และอื่น ๆ อีกมากมาย

### วิธีตั้งค่า MCP Server

**ใน settings.json:**
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

**ใน .mcp.json (ระดับโปรเจกต์):**
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

**ผ่าน CLI:**
```bash
claude mcp add <server-name>
```

**ผ่าน CLI Flag:**
```bash
claude --mcp-config ./mcp.json
```

### การใช้งาน MCP ในเซสชัน

- เครื่องมือ MCP จะปรากฏเป็นคำสั่งที่ใช้ได้
- ใช้รูปแบบ `mcp__<server>__<tool>` ในการเรียก
- ใช้ `/mcp` เพื่อดูสถานะ Server
- สิทธิ์ MCP ตั้งค่าได้ใน `permissions.allow/deny`

### ตัวอย่าง: ตั้งค่า Puppeteer MCP

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

ใช้งาน: Claude สามารถเปิดเว็บ, ถ่ายสกรีนช็อต, คลิกปุ่ม ฯลฯ ได้

---

---

## Navigation

- ⬅️ Previous: [[08-memory]]
- ➡️ Next: [[10-hooks]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/09-mcp-servers]]
