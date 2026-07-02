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
| **ต้องการใช้ Opus สำหรับโปรเจกต์สำคัญ** | `model: "claude-opus-4-8"` | ล็อกโมเดลเฉพาะโปรเจกต์ |

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
  "model": "claude-opus-4-8",
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

### โมเดลที่เลือกได้ (ใหม่สุด → ถูกสุด)

| โมเดล | id | จุดเด่น |
|-------|-----|--------|
| **Fable 5** | `claude-fable-5` | โมเดล **Mythos-class** ใหม่ล่าสุดของ Anthropic และเก่งที่สุดที่เปิดให้ใช้ทั่วไป (มาใน Claude Code **2.1.170**) มาพร้อม **context window 1M token เป็นค่าเริ่มต้น** เหมาะกับงานคิดหนักสุด, context ใหญ่ และงาน agentic |
| **Opus 4.8** | `claude-opus-4-8` | เรือธงตระกูล **Opus**; coding และวิเคราะห์บั๊กซับซ้อนเก่งสุด; default เป็น **high effort** กับงานหนัก |
| **Sonnet 5** | `claude-sonnet-5` | **default ใหม่ของ Claude Code** (ตั้งแต่ 2.1.197); สมดุล เร็ว, context **1M native** (โปรฯ $2/$10 ต่อ Mtok ถึง 31 ส.ค. 2026) |
| **Haiku 4.5** | `claude-haiku-4-5` | เร็วสุด ถูกสุด; สำหรับงานง่าย/boilerplate |

> หมายเหตุ: Fast mode ยังใช้ **Opus 4.7** (และตอนนี้ทำงานกับ Opus 4.8 ได้ด้วย) — Fable 5 คือโมเดลที่เก่งที่สุดโดยรวม ส่วน Opus 4.8 คือตัว **coding เก่งสุด** ในตระกูล Opus

### 🆕 Settings ใหม่ใน v2.1.191

- `fallbackModel` — กำหนด fallback ได้สูงสุด 3 รุ่น ลองตามลำดับเมื่อรุ่นหลัก overload/ใช้ไม่ได้
- `availableModels` + `enforceAvailableModels` (managed) — allowlist รุ่นที่เลือกได้; เมื่อ enforce แม้แต่ Default ก็ fall back เป็นรุ่นแรกที่อนุญาต และ user/project ขยายรายการเองไม่ได้
- `requiredMinimumVersion` / `requiredMaximumVersion` (managed) — ไม่ให้เปิดถ้าเวอร์ชัน Claude Code อยู่นอกช่วงที่กำหนด
- `respondToBashCommands` — กำหนดว่า output ของ `!` จะถูกตอบอัตโนมัติไหม (ค่าเริ่มต้น true)
- `language` — ล็อกภาษาที่ใช้ตั้งชื่อ session
- `attribution.sessionUrl` — ตัดลิงก์ session ของ claude.ai ออกจาก commit/PR
- `disableBundledSkills` — ซ่อน bundled skills/workflows/คำสั่ง built-in
- `teammateMode: "iterm2"`, `footerLinksRegexes`, `wheelScrollAccelerationEnabled` — ตัวเลือก terminal/UX
- `sandbox.credentials` — กันคำสั่งใน sandbox อ่านไฟล์ credential / secret env var
- `sandbox.allowAppleEvents` — เปิดให้คำสั่งใน sandbox ส่ง Apple Events ได้ (macOS)

### 🆕 ใหม่ใน v2.1.198

- **Org default models** — แอดมินตั้งโมเดล default ขององค์กรจาก console ได้; ขึ้นเป็น "Org default" (หรือ "Role default") ใน `/model` จนกว่าคุณจะเลือกเอง
- **Stream watchdog เปิดเป็นค่าเริ่มต้น** — สตรีมที่เงียบเกิน 5 นาทีจะถูกยกเลิกแล้ว retry อัตโนมัติ; ปิดด้วย `CLAUDE_ENABLE_STREAM_WATCHDOG=0`

### การ Persist ของ `/config` และ `/model`

การแก้ผ่าน `/config` จะ persist ลง `~/.claude/settings.json` และเข้าลำดับ override project/local/policy. `/model` เปลี่ยนเฉพาะ session ปัจจุบัน (กด `d` เพื่อตั้ง default) และจำเป็น default ของ session ใหม่. slider `/effort` ใช้ป้าย **Faster / Smarter**.

---

---

## Navigation

- ⬅️ Previous: [[05-permissions]]
- ➡️ Next: [[07-claude-md]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/06-configuration]]
