---
title: "การแก้ปัญหาเบื้องต้น"
section: 24
lang: th
tags:
  - claude-code
  - troubleshooting
aliases:
  - "การแก้ปัญหา"
related:
  - "[[25-tips-best-practices]]"
  - "[[05-permissions]]"
---

# การแก้ปัญหาเบื้องต้น

### ประโยชน์และ Use Cases

> **ทำไมต้องรู้วิธีแก้ปัญหา?**
>
> เมื่อ Claude Code ทำงานไม่ถูกต้อง — ไม่โหลด CLAUDE.md, Hook ไม่รัน, MCP ไม่เชื่อมต่อ — การรู้วิธีวินิจฉัยช่วยให้คุณ **แก้ปัญหาได้เร็วโดยไม่ต้องรอความช่วยเหลือ**

**Use Cases:**

| ปัญหา | วิธีวินิจฉัย | วิธีแก้ |
|-------|------------|--------|
| **Claude ไม่รู้จักโปรเจกต์** | `/memory` → ตรวจว่า CLAUDE.md โหลดหรือไม่ | ตรวจตำแหน่งไฟล์, ตรวจ `claudeMdExcludes` ใน Settings |
| **Hook ไม่ทำงาน** | `claude --debug "hooks"` | ตรวจ Syntax ใน settings.json, ตรวจ Matcher Pattern |
| **MCP Server ขึ้น Error** | `/mcp` → ดูสถานะ | ตรวจ Command/Args, ตรวจว่า npx ทำงานได้ |
| **Context เต็มเร็วผิดปกติ** | `/context` → ดูสัดส่วน | ย้ายเนื้อหาจาก CLAUDE.md ไป `.claude/rules/` |
| **Skill ไม่ปรากฏ** | ตรวจ Description ใน SKILL.md | ทำ Description ให้ชัดเจนขึ้น |
| **Login ไม่ได้** | `claude auth status` | `claude auth login` ใหม่ |
| **ทุกอย่างดูผิดปกติ** | `/doctor` | วินิจฉัยปัญหาครบทุกด้าน |

### วินิจฉัยปัญหา

```
/doctor
```

แสดง:
- สถานะการติดตั้ง
- สถานะยืนยันตัวตน
- ปัญหา Configuration
- ปัญหา Keybindings
- Dependencies ที่ขาด

### Debug Logging

```bash
claude --debug "api,hooks"
claude --debug-file /tmp/claude-debug.log
```

### ปัญหาที่พบบ่อย

| ปัญหา | วิธีแก้ |
|-------|--------|
| Permission ไม่ทำงาน | ตรวจสอบ Syntax ของกฎ, ใช้ `/permissions` |
| CLAUDE.md ไม่โหลด | ใช้ `/memory` เพื่อตรวจสอบตำแหน่ง |
| Skills ไม่ Trigger | ตรวจสอบ Description ให้ชัดเจนขึ้น |
| Context เต็มเร็ว | ย้ายเนื้อหาไป `.claude/rules/`, ใช้ Subagent |
| Hooks ไม่รัน | ตรวจสอบ Syntax ใน settings.json |
| Login ไม่ได้ | `claude auth login` ใหม่ |
| MCP Server ไม่ทำงาน | `/mcp` เพื่อดูสถานะ, ตรวจสอบ Command และ Args |

### ตรวจสอบ Session

```bash
# ดูไฟล์ Session
cat ~/.claude/projects/<project>/sessions/<session-id>.jsonl | jq '.'
```

### อัปเดต Claude Code

```bash
claude update
# หรือ
claude --version  # ตรวจสอบเวอร์ชัน
```

---

---

## Navigation

- ⬅️ Previous: [[23-environment-variables]]
- ➡️ Next: [[25-tips-best-practices]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/24-troubleshooting]]
