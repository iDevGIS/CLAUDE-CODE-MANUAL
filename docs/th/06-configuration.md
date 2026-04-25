---
title: "การตั้งค่า (Configuration)"
section: 6
lang: th
tags:
  - claude-code
  - configuration
  - settings
aliases:
  - "การตั้งค่า"
related:
  - "[[05-permissions]]"
  - "[[07-claude-md]]"
  - "[[23-environment-variables]]"
---

# การตั้งค่า (Configuration)

### ประโยชน์และ Use Cases

> **ทำไมต้องตั้งค่า?**
>
> การตั้งค่าช่วยให้ Claude Code **ทำงานตรงกับวิธีการทำงานของคุณและทีม** โดยไม่ต้องบอกซ้ำทุกเซสชัน ตั้งครั้งเดียว ใช้ได้ตลอด

**Use Cases:**

| สถานการณ์ | การตั้งค่า | ผลลัพธ์ |
|----------|----------|--------|
| **ทีม 10 คน ต้องการมาตรฐานเดียวกัน** | `.claude/settings.json` (commit ร่วมกับ Git) | ทุกคนในทีมใช้ Permission, Hooks, MCP เหมือนกัน ไม่ต้องตั้งค่าเอง |
| **คนเดียวชอบโหมด Vim** | `~/.claude/settings.json` | ตั้งค่าส่วนตัว ไม่กระทบคนอื่น ใช้ได้ทุกโปรเจกต์ |
| **โปรเจกต์นี้ต้องใช้ Node 20 เฉพาะ** | `.claude/settings.local.json` | ตั้งค่าเฉพาะโปรเจกต์ gitignored ไม่ปนกับคนอื่น |
| **องค์กรต้องการล็อก Policy** | Managed settings | IT ตั้งค่าให้ทุกคนในองค์กร ห้าม Override |
| **ต้องการให้ Claude รัน Lint อัตโนมัติ** | `hooks.PostEdit` | ทุกครั้งที่ Claude แก้ไฟล์ Lint จะรันอัตโนมัติ |
| **ต้องการเชื่อมต่อ Slack/Notion** | `mcpServers` | Claude เข้าถึง Slack, Notion ได้โดยตรง |
| **ต้องการใช้ Opus สำหรับโปรเจกต์สำคัญ** | `model: "claude-opus-4-6"` | ล็อกโมเดลเฉพาะโปรเจกต์ |

### ลำดับชั้นของการตั้งค่า (จากสูงไปต่ำ)

1. **Managed** - ระดับระบบ (IT deploy) มีผลกับผู้ใช้ทั้งหมด
2. **User** (`~/.claude/`) - ส่วนตัว ใช้ได้ทุกโปรเจกต์
3. **Project** (`.claude/`) - แชร์ผ่าน Git กับทีม
4. **Local** (`.claude/settings.local.json`) - ส่วนตัวเฉพาะโปรเจกต์ (gitignored)

### ไฟล์ตั้งค่า

| ไฟล์ | ขอบเขต |
|-----|--------|
| `~/.claude/settings.json` | ตั้งค่าส่วนตัวทั่วไป |
| `.claude/settings.json` | ตั้งค่าโปรเจกต์ (commit ร่วมกับทีม) |
| `.claude/settings.local.json` | ตั้งค่าโปรเจกต์ส่วนตัว (gitignored) |

### ตัวอย่าง settings.json

```json
{
  "theme": "dark",
  "model": "claude-opus-4-6",
  "effort": "high",
  "autoMemoryEnabled": true,

  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  },

  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"]
    }
  },

  "env": {
    "NODE_ENV": "development"
  },

  "additionalDirectories": [
    "../shared-lib"
  ]
}
```

### การตั้งค่าสำคัญ

| คีย์ | อธิบาย |
|-----|--------|
| `theme` | ธีม UI (light/dark) |
| `model` | โมเดลที่ใช้ |
| `effort` | ระดับ Effort |
| `autoMemoryEnabled` | เปิด/ปิด Auto Memory |
| `permissions.defaultMode` | โหมด Permission เริ่มต้น |
| `permissions.allow/ask/deny` | กฎสิทธิ์เครื่องมือ |
| `mcpServers` | ตั้งค่า MCP Servers |
| `hooks` | ตั้งค่า Hooks |
| `env` | ตัวแปรสภาพแวดล้อม |
| `additionalDirectories` | ไดเรกทอรีเพิ่มเติม |
| `enabledPlugins` | Plugins ที่เปิดใช้ |
| `codeIntelligence` | เปิด/ปิด Code Intelligence |
| `claudeMdExcludes` | ข้าม CLAUDE.md บางไฟล์ |

---

---

## Navigation

- ⬅️ Previous: [[05-permissions]]
- ➡️ Next: [[07-claude-md]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/06-configuration]]
