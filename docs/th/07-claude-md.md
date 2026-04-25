---
title: "CLAUDE.md - คำสั่งถาวรสำหรับโปรเจกต์"
section: 7
lang: th
tags:
  - claude-code
  - claude-md
  - project-config
aliases:
  - "CLAUDE.md"
related:
  - "[[06-configuration]]"
  - "[[08-memory]]"
---

# CLAUDE.md - คำสั่งถาวรสำหรับโปรเจกต์

### ประโยชน์และ Use Cases

> **ทำไมต้องมี CLAUDE.md?**
>
> CLAUDE.md คือ **"สมอง" ของ Claude สำหรับโปรเจกต์ของคุณ** — ทุกครั้งที่เปิดเซสชัน Claude จะอ่านไฟล์นี้ก่อน ทำให้ Claude **รู้จักโปรเจกต์ตั้งแต่วินาทีแรก** ไม่ต้องอธิบายซ้ำทุกครั้ง

**Use Cases:**

| สถานการณ์ | สิ่งที่ใส่ใน CLAUDE.md | ผลลัพธ์ |
|----------|---------------------|--------|
| **ทีมใช้ Naming Convention เฉพาะ** | `Components: PascalCase, Utils: camelCase` | Claude ตั้งชื่อตัวแปร/ไฟล์ตาม Convention ของทีมโดยอัตโนมัติ ไม่ต้องบอกซ้ำ |
| **โปรเจกต์มีคำสั่ง Build ซับซ้อน** | `Build: npm run build:prod`, `Test: npm run test:ci` | Claude รันคำสั่งที่ถูกต้องทุกครั้ง ไม่สับสนระหว่าง dev/prod |
| **สถาปัตยกรรมเฉพาะทาง** | `ใช้ Repository Pattern, API อยู่ใน src/api/` | Claude เขียนโค้ดตามสถาปัตยกรรมที่กำหนด ไม่เขียนแบบตามใจตัวเอง |
| **กฎความปลอดภัย** | `ห้ามใช้ eval(), ต้อง Sanitize Input ทุกครั้ง` | Claude หลีกเลี่ยงโค้ดที่มีช่องโหว่ Security โดยอัตโนมัติ |
| **Dev Environment Setup** | `ต้องรัน docker-compose up ก่อน Test` | Claude รู้ขั้นตอนเตรียมสภาพแวดล้อมก่อนรัน Test |
| **สมาชิกใหม่เข้าทีม** | CLAUDE.md ครบถ้วน | สมาชิกใหม่ให้ Claude อธิบายโปรเจกต์ได้ทันที ลดเวลา Onboarding อย่างมาก |
| **โปรเจกต์มีหลาย Module** | ใช้ `.claude/rules/` แยกกฎเป็นไฟล์ | กฎของ API ไม่ปนกับ Frontend ลด Context Usage |

**ตัวอย่างสถานการณ์จริง:**

```
ก่อนมี CLAUDE.md:
  คุณ: "แก้ Bug ฟังก์ชัน login"
  Claude: "คุณใช้ framework อะไร? Build ยังไง? Test ยังไง?"
  → ต้องอธิบายทุกครั้ง เสียเวลามาก

หลังมี CLAUDE.md:
  คุณ: "แก้ Bug ฟังก์ชัน login"
  Claude: (อ่าน CLAUDE.md → รู้จัก framework, build cmd, test cmd)
  → ลงมือแก้ได้ทันที
```

### CLAUDE.md คืออะไร?

ไฟล์ Markdown ที่ให้คำสั่งและบริบทแก่ Claude ทุกเซสชัน เปรียบเสมือน "คู่มือโปรเจกต์" ที่ Claude อ่านทุกครั้งที่เริ่มทำงาน

### ตำแหน่งที่โหลด (จากสูงไปต่ำ)

| ตำแหน่ง | ขอบเขต |
|---------|--------|
| `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Managed (IT deploy) |
| `./CLAUDE.md` หรือ `./.claude/CLAUDE.md` | โปรเจกต์ (commit ร่วมกับทีม) |
| `~/.claude/CLAUDE.md` | ส่วนตัวทุกโปรเจกต์ |
| `./CLAUDE.local.md` | ส่วนตัวเฉพาะโปรเจกต์ (gitignored) |

### ตัวอย่าง CLAUDE.md

```markdown
# Project Setup

## คำสั่ง Build
- Build: `npm run build`
- Test: `npm test`
- Dev server: `npm run dev`
- Lint: `npm run lint`

## Naming Conventions
- React Components: PascalCase ใน `src/components/`
- Utilities: camelCase ใน `src/utils/`
- Types: PascalCase ใน `src/types/`
- ไฟล์ CSS: kebab-case

## Code Style
- ใช้ 2-space indentation
- ต้องมี TypeScript types เสมอ
- ใส่ JSDoc สำหรับ Public Functions

## Architecture
- ใช้ Repository Pattern สำหรับ Database Layer
- API Routes อยู่ใน `src/api/`
- Middleware อยู่ใน `src/middleware/`

## Testing
- เขียน Test ก่อนแก้ Bug เสมอ
- Coverage ขั้นต่ำ 80%
- ใช้ vitest สำหรับ Unit Tests
```

### Import ไฟล์เพิ่มเติม

```markdown
# ดู @README สำหรับ Overview
# Workflow: @docs/workflow.md
# API Patterns: @src/api/patterns.md
```

### .claude/rules/ - คำสั่งแยกตามหัวข้อ

สร้างไฟล์คำสั่งแยกเป็นหัวข้อย่อย:

```
.claude/rules/
├── testing.md        # กฎเกี่ยวกับการเทสต์
├── api-design.md     # กฎเกี่ยวกับ API
├── security.md       # กฎเกี่ยวกับความปลอดภัย
└── frontend/
    └── components.md # กฎเกี่ยวกับ Frontend Components
```

**กฎที่ใช้เฉพาะไฟล์บางประเภท (Path-scoped):**

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# กฎการพัฒนา API

- ต้องมี Input Validation เสมอ
- ใช้ Standard Error Response Format
- ทุก Endpoint ต้องมี Rate Limiting
```

### สร้าง CLAUDE.md อัตโนมัติ

```bash
# ใช้คำสั่ง /init ให้ Claude วิเคราะห์โปรเจกต์แล้วสร้างให้
/init
```

---

---

## Navigation

- ⬅️ Previous: [[06-configuration]]
- ➡️ Next: [[08-memory]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/07-claude-md]]
