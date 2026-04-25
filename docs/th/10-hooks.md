---
title: "Hooks (ระบบ Event Handler)"
section: 10
lang: th
tags:
  - claude-code
  - hooks
  - automation
aliases:
  - "Hooks"
related:
  - "[[09-mcp-servers]]"
  - "[[11-skills]]"
---

# Hooks (ระบบ Event Handler)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Hooks?**
>
> Hooks ทำให้คุณ **สร้างกระบวนการทำงานอัตโนมัติ** ที่รันทุกครั้งเมื่อ Claude ทำบางอย่าง — ไม่ต้องบอกซ้ำว่า "รัน Lint หลังแก้ไฟล์ด้วยนะ" เพราะ Hook จะทำให้อัตโนมัติ

**Use Cases:**

| Hook | Use Case | ตัวอย่างจริง |
|------|----------|------------|
| **PostEdit** + Prettier | Auto-format หลังแก้ไฟล์ | ทุกครั้งที่ Claude แก้ไฟล์ `.ts` → Prettier จะ Format ให้อัตโนมัติ ไม่ต้องรัน Format เอง โค้ดสวยเสมอ |
| **PostEdit** + ESLint | Auto-lint หลังแก้ไฟล์ | ทุกครั้งที่ Claude แก้ไฟล์ → ESLint ตรวจสอบ ถ้ามี Error Claude เห็นทันทีและแก้ไขเอง |
| **PostWrite** + Test Runner | Auto-test หลังสร้างไฟล์ | ทุกครั้งที่ Claude สร้างไฟล์ใหม่ → Test รันอัตโนมัติ ถ้า Test Fail Claude แก้ไขทันที |
| **PreCommit** + Lint | ตรวจสอบก่อน Commit | ป้องกันไม่ให้ Commit โค้ดที่มี Lint Error เข้า Git |
| **PostCommit** + Slack | แจ้งเตือนหลัง Commit | ส่ง Notification ไป Slack ทุกครั้งที่ Claude Commit |
| **Init** + Setup | ตั้งค่าเมื่อเริ่มเซสชัน | รัน `docker-compose up`, ตรวจสอบ Dependencies, ตั้งค่า Environment |
| **PreToolUse** + Custom Logic | ตรวจสอบสิทธิ์เอง | ป้องกันไม่ให้ Claude เข้าถึงไฟล์บางประเภท หรือรันคำสั่งบางอย่าง |
| **TaskCompleted** + Verify | ตรวจสอบผลงาน | เมื่อ Claude ทำ Task เสร็จ → รัน Test Suite อัตโนมัติ ยืนยันว่าไม่พังอะไร |

**ตัวอย่างสถานการณ์จริง:**

```
ก่อนมี Hooks:
  Claude แก้ไฟล์ → โค้ดไม่ Format → คุณต้องบอก "รัน Prettier ด้วย"
  Claude แก้อีกไฟล์ → ลืม Format อีก → บอกอีกรอบ
  → เสียเวลาบอกซ้ำ ๆ

หลังมี PostEdit Hook:
  Claude แก้ไฟล์ → Prettier รันอัตโนมัติ → Format เรียบร้อย
  Claude แก้อีกไฟล์ → Prettier รันอัตโนมัติ → Format เรียบร้อย
  → ไม่ต้องบอกเลย ทุกไฟล์ Format สวยอัตโนมัติ
```

### Hooks คืออะไร?

Event Handler ที่รันคำสั่ง Shell อัตโนมัติเมื่อเกิดเหตุการณ์ต่าง ๆ ใน Claude Code

### รายการ Hooks ที่มี

| Hook | เมื่อไหร่ | ใช้สำหรับ |
|------|---------|----------|
| `Init` | เซสชันเริ่ม | Setup เริ่มต้น |
| `Maintenance` | โหมดบำรุงรักษา | ล้างไฟล์ชั่วคราว |
| `PreToolUse` | ก่อนใช้เครื่องมือ | ตรวจสอบสิทธิ์เอง |
| `PostToolUse` | หลังใช้เครื่องมือ | Auto-format, Validate |
| `PostWrite` | หลังเขียนไฟล์ | Lint, Format |
| `PostEdit` | หลังแก้ไฟล์ | Auto-test |
| `PreCommit` | ก่อน Git Commit | Pre-commit Check |
| `PostCommit` | หลัง Git Commit | แจ้งเตือน |
| `PermissionRequest` | เมื่อขออนุญาต | อนุมัติเอง |
| `PermissionDenied` | เมื่อถูกปฏิเสธ | Log |
| `TaskCreated` | สร้าง Task | ตรวจสอบ Task |
| `TaskCompleted` | Task เสร็จ | Verify ผลลัพธ์ |
| `TeammateIdle` | Teammate ว่าง | Quality Gates |

### ตั้งค่า Hooks

**ใน `.claude/settings.json`:**

```json
{
  "hooks": {
    "PostWrite": [
      {
        "matcher": "Edit(src/**/*.ts)",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $FILE"
          }
        ]
      }
    ],
    "PostEdit": [
      {
        "matcher": "Edit(src/**/*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "black $FILE"
          }
        ]
      }
    ],
    "PreCommit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint"
          }
        ]
      }
    ]
  }
}
```

### ตัวอย่าง: Auto-format TypeScript หลังแก้ไข

```json
{
  "hooks": {
    "PostEdit": [
      {
        "matcher": "Edit(src/**/*.{ts,tsx})",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $FILE && npx eslint --fix $FILE"
          }
        ]
      }
    ]
  }
}
```

---

---

## Navigation

- ⬅️ Previous: [[09-mcp-servers]]
- ➡️ Next: [[11-skills]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/10-hooks]]
