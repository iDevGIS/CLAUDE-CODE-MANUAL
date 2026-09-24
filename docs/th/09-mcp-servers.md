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

### 🆕 ใหม่ใน v2.1.198

- **เข้มความปลอดภัย** — `claude mcp list`/`get` ไม่ spawn server จาก `.mcp.json` ที่ repo อนุมัติตัวเองผ่าน `.claude/settings.json` ที่ commit มา; workspace ที่ยังไม่ trust จะเห็นเป็น `⏸ Pending approval`

### 🆕 ใหม่ใน v2.1.212

- **MCP call ที่รันนานย้ายไป background เอง** — MCP tool call ที่รันเกิน 2 นาทีจะถูกย้ายไปทำงาน background อัตโนมัติ เพื่อให้ session ใช้งานต่อได้; ปรับ threshold หรือปิดได้ด้วย `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`

### 🆕 ใหม่ใน v2.1.218

- **error ตอนต่อไม่ติดชัดขึ้น** — `claude mcp list` และ `/mcp` แสดง HTTP status พร้อมข้อความ error เมื่อ server ต่อไม่สำเร็จ และเตือนถ้าค่าใน MCP config มี whitespace แอบนำหน้า/ต่อท้าย

### 🆕 ใหม่ใน v2.1.219

- **`mcp_server_errors` ใน init event ของ headless** — init event แบบ `stream-json` แสดงรายการ `--mcp-config` ที่ถูกข้ามเพราะไม่ผ่าน config validation; ส่วนการรันใน terminal จะพิมพ์คำเตือนตอน startup แทน
- **การ resolve `${VAR}` ของ managed เปลี่ยน** — รายการ allowlist/denylist ของ managed MCP ตอนนี้ resolve `${VAR}` จาก environment ตอน startup และ `env` ของ managed settings ไม่ใช่จาก `env` ใน settings ไฟล์อีกต่อไป

### 🆕 ใหม่ใน v2.1.221

- **tool search ใช้บน Google Vertex AI ได้อีกครั้ง** — เปิดใช้กลับมาสำหรับโมเดลรุ่น Claude 4.5 ขึ้นไป ทำให้ schema ของ MCP tool แบบ deferred โหลดตอนต้องใช้ได้บน Vertex ด้วย
- **server จาก `--mcp-config` ต่อให้เสร็จก่อน turn แรกใน print mode** — บน `claude -p` เครื่องมือ MCP พร้อมใช้ตั้งแต่ต้น ไม่เกิดอาการโมเดลพิมพ์ tool call ออกมาเป็นข้อความธรรมดาอีก

### 🆕 ใหม่ใน v2.1.259

- **managed setting `managedMcpServers`** — องค์กรจัด MCP server แบบ HTTP/SSE ให้ผู้ใช้ทุกคนได้ โดยใช้รูปแบบ entry เดียวกับ `.mcp.json`; ส่วน entry ที่ระบุ command ให้รันจะถูกข้าม
- **`allowedMcpServers` คุมเฉพาะ server ที่ผู้ใช้เพิ่มเองแล้ว** — server จาก managed ที่ allowlist เราเคยกรองออกจะกลับมาโหลดเมื่ออัปเกรด; ถ้าไม่อยากให้โหลดต้องใช้ `deniedMcpServers` กันไว้

### 🆕 ใหม่ใน v2.1.265

- **ยังไม่ลงทะเบียน OAuth client จนกว่าจะ sign in จริง** — สำหรับ remote MCP server ที่ต้อง authenticate ตัว Claude Code จะรอให้เรา authenticate ก่อน แล้วค่อยไปลงทะเบียน OAuth client กับ server นั้น

### 🆕 ใหม่ใน v2.1.273

- **รู้ทันทีเมื่อ server หลุดถาวร** — ถ้า MCP server หลุดกลาง session แล้วการ reconnect อัตโนมัติยอมแพ้ จะมี notification บอกพร้อมชี้ให้ไปดูที่ `/mcp`
- **sign-in ของ server หมดอายุแล้วบอกวิธีแก้** — เมื่อการ authenticate ของ server หมดอายุกลาง session ข้อความจะบอกให้ไป re-authenticate ด้วย `/mcp`

### 🆕 ใหม่ใน v2.1.274

- **จำกัดเวลารอ server ที่ยังต่อไม่เสร็จในเทิร์นแรก** — `CLAUDE_CODE_MCP_STARTUP_WAIT_MS` กำหนดเพดานว่าเทิร์นแรกของ session แบบ non-interactive จะรอ MCP server ที่ยังเชื่อมต่อไม่เสร็จได้นานแค่ไหน ตั้ง `0` = ไม่รอเลย ดู [[23-environment-variables]]

### 🆕 ใหม่ใน v2.1.280

- **ปรับเพดานความยาวของ description ได้แล้ว** — `CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH` ใช้เปลี่ยนเพดาน 2,048 ตัวอักษรของ description ของ MCP tool และ instructions ของ server โดยมีผลกับทุก MCP server ใน session ดู [[23-environment-variables]]
- **server ที่เพิ่มกลับด้วยชื่อเดิมจะ reconnect ให้** — หลังสั่ง `claude mcp remove` แล้วเพิ่มกลับด้วยชื่อเดิม จะไม่ขึ้นว่าต้อง authenticate ใหม่อีกต่อไป
- **`/mcp` ใช้ไอคอนเตือนแบบเดียวกันแล้ว** — ทั้งลิสต์ server, หน้ารายละเอียด และ `/plugin` ใช้ ⚠ เหมือนกันสำหรับ server ตัวเดียวกัน

### 🆕 ใหม่ใน v2.1.281

- **URL-mode elicitation** — บน connection ที่ใช้ protocol 2026-07-28 server ขอให้ Claude Code เปิด flow ผ่านเบราว์เซอร์ได้ และถ้า server ไม่มีทางยืนยันว่าเสร็จแล้ว จะไม่มี dialog รอค้างบนจอ
- **resource ของ MCP Apps UI ไม่โผล่ในลิสต์ resource** — tool ลิสต์ resource และคำแนะนำตอน @-mention จะข้ามมันไป แต่อ่านด้วย URI ตรง ๆ ยังได้
- **`claude plugin validate` ตรวจ MCP server ของ plugin** — รายงาน entry ใน `.mcp.json` ที่จะถูกทิ้งเงียบ ๆ ตอนโหลด, การอ้าง `${user_config.*}` ที่ไม่ได้ประกาศ และ URL ที่ไม่ปลอดภัย ดู [[18-plugins]]

### 🆕 ใหม่ใน v2.1.282

- **server ที่ตั้งชื่อ `anthropic-skills` หรือ `claude-ai` จะไม่ลิสต์ skill หรือ prompt** — tool ของมันยังใช้ได้ตามปกติ · ถ้าอยากให้ลิสต์กลับมาให้เปลี่ยนชื่อ server ใน MCP config · namespace สองชื่อนี้สงวนไว้ให้ skill ที่ sync มาจาก claude.ai ดู [[11-skills]]

---

---

## Navigation

- ⬅️ Previous: [[08-memory]]
- ➡️ Next: [[10-hooks]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/09-mcp-servers]]
