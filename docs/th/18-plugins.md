---
title: "Plugins (ปลั๊กอิน)"
section: 18
lang: th
tags:
  - claude-code
  - plugins
  - extensibility
aliases:
  - "Plugins"
related:
  - "[[11-skills]]"
  - "[[09-mcp-servers]]"
---

# Plugins (ปลั๊กอิน)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Plugins?**
>
> Plugins ทำให้คุณ **แชร์ชุดเครื่องมือที่สร้างเอง** (Skills, Agents, Hooks, MCP) เป็น Package เดียว — ติดตั้งง่าย แจกจ่ายให้ทีมได้ อัปเดตได้จากที่เดียว

**Use Cases:**

| Plugin | สถานการณ์ | ผลลัพธ์ |
|--------|----------|--------|
| **Company Standard Plugin** | ทีม 50 คน ต้องการ Skills + Hooks เหมือนกัน | สร้าง Plugin ที่รวม Deploy Skill, Lint Hook, Security Agent → ทุกคนติดตั้งเหมือนกัน |
| **Framework Plugin** | ใช้ Next.js ทุกโปรเจกต์ | สร้าง Plugin ที่มี Skills สำหรับสร้าง Page, API Route, Component → ใช้ซ้ำได้ทุกโปรเจกต์ |
| **DevOps Plugin** | ต้องจัดการ K8s, Docker, Terraform | สร้าง Plugin ที่มี Skills + Agents สำหรับ DevOps → ใช้ได้ทุกโปรเจกต์ |
| **Community Plugin** | อยากใช้ Plugin ที่คนอื่นสร้าง | ติดตั้งจาก Marketplace ได้ทันที |
| **Language-Specific Plugin** | ทีม Go / Rust / Python | สร้าง Plugin เฉพาะภาษา รวม Linter, Test Runner, Code Generator |

### โครงสร้าง Plugin

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json       # Manifest
├── skills/                # Skills ของ Plugin
│   └── skill-name/
│       └── SKILL.md
├── agents/                # Agents ของ Plugin
│   └── agent.md
├── hooks/                 # Hooks ของ Plugin
│   └── hooks.json
└── .mcp.json              # MCP Config ของ Plugin
```

### Plugin Manifest

```json
{
  "name": "my-plugin",
  "description": "ปลั๊กอินสำหรับ...",
  "version": "1.0.0",
  "author": { "name": "ชื่อผู้สร้าง" },
  "homepage": "https://example.com",
  "repository": "https://github.com/user/repo"
}
```

### โหลด Plugin

```bash
# จากไดเรกทอรี Local
claude --plugin-dir ./my-plugin

# ติดตั้งจาก Marketplace
/plugins install <plugin-name>
```

### จัดการ Plugins

```
/plugins              # เรียกดูและจัดการ
/reload-plugins       # โหลด Plugins ใหม่โดยไม่ต้อง Restart
```

---

---

## Navigation

- ⬅️ Previous: [[17-ide-integration]]
- ➡️ Next: [[19-session-management]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/18-plugins]]
