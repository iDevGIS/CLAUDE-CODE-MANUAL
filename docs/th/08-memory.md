---
title: "ระบบ Memory (ความจำ)"
section: 8
lang: th
tags:
  - claude-code
  - memory
  - context
aliases:
  - "ระบบ Memory"
related:
  - "[[07-claude-md]]"
  - "[[14-context-management]]"
---

# ระบบ Memory (ความจำ)

### ประโยชน์และ Use Cases

> **ทำไมต้องมี Memory?**
>
> Memory ทำให้ Claude **จดจำข้อมูลข้ามเซสชัน** — สิ่งที่คุณบอกไว้เมื่อวานนี้ Claude ยังจำได้ในวันนี้ ไม่ต้องบอกซ้ำว่าคุณเป็นใคร ทำอะไร ชอบแบบไหน

**Use Cases:**

| สถานการณ์ | ประเภท Memory | ตัวอย่าง |
|----------|--------------|---------|
| **คุณเป็น Data Scientist ไม่ชำนาญ Frontend** | `user` | Claude จะอธิบายโค้ด Frontend เป็นภาษาง่าย ๆ เทียบกับแนวคิดที่คุณคุ้นเคย |
| **คุณบอกว่า "อย่าใช้ any ใน TypeScript"** | `feedback` | Claude จะไม่ใช้ `any` อีกเลย แม้ในเซสชันใหม่ ไม่ต้องบอกซ้ำ |
| **โปรเจกต์กำลัง Freeze Code วันศุกร์** | `project` | Claude จะเตือนถ้าคุณพยายาม Merge หลังวันที่กำหนด |
| **Bug Tracker อยู่ใน Linear โปรเจกต์ "INGEST"** | `reference` | เวลาถามเรื่อง Bug Claude จะแนะนำให้ดูใน Linear |
| **คุณชอบให้ตอบสั้น ๆ ไม่ต้องสรุปท้าย** | `feedback` | Claude ปรับสไตล์การตอบให้ตรงใจคุณ |
| **ทีมตกลงใช้ Zod แทน Joi** | `project` | Claude จะใช้ Zod สำหรับ Validation เสมอ |
| **API Docs อยู่ที่ Confluence หน้า X** | `reference` | Claude จะแนะนำให้ดูเอกสารที่ถูกต้อง |

**ตัวอย่างสถานการณ์จริง:**

```
เซสชันที่ 1 (วันจันทร์):
  คุณ: "ผมเป็น Backend Developer ใช้ Go เป็นหลัก พึ่งเริ่มเขียน React"
  Claude: (บันทึก Memory: user เป็น Backend Dev, ชำนาญ Go, ใหม่กับ React)

เซสชันที่ 2 (วันพุธ):
  คุณ: "อธิบาย useEffect ให้หน่อย"
  Claude: "useEffect คล้ายกับ defer ใน Go ตรงที่มันรันหลังจาก function หลักเสร็จ
          แต่ต่างกันตรงที่มัน re-run เมื่อ dependencies เปลี่ยน
          คิดเหมือน goroutine ที่ trigger ซ้ำเมื่อ channel ได้ข้อมูลใหม่"
  → Claude อธิบายเทียบกับ Go เพราะจำได้ว่าคุณชำนาญ Go
```

### Auto Memory คืออะไร?

ระบบที่ Claude จดจำข้อมูลสำคัญระหว่างเซสชัน เก็บไว้ใน:

```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # ไฟล์ดัชนี (Index)
├── user_role.md       # ข้อมูลผู้ใช้
├── feedback_style.md  # Feedback จากผู้ใช้
└── project_goals.md   # เป้าหมายโปรเจกต์
```

### ประเภทของ Memory

| ประเภท | อธิบาย | ตัวอย่าง |
|--------|--------|---------|
| `user` | ข้อมูลเกี่ยวกับผู้ใช้ | บทบาท, ความรู้, สิ่งที่ชอบ |
| `feedback` | คำแนะนำจากผู้ใช้ | "อย่าสรุปท้ายคำตอบ", "ใช้ภาษาไทย" |
| `project` | ข้อมูลโปรเจกต์ที่กำลังทำ | เดดไลน์, Bug ที่กำลังแก้ |
| `reference` | แหล่งข้อมูลภายนอก | ลิงก์ Linear, Slack Channel |

### รูปแบบไฟล์ Memory

```markdown
---
name: user_prefers_thai
description: ผู้ใช้ต้องการให้ตอบเป็นภาษาไทย
type: feedback
---

ตอบเป็นภาษาไทยเสมอ

**Why:** ผู้ใช้บอกว่าทำงานสะดวกกว่า
**How to apply:** ใช้ภาษาไทยในทุกคำตอบ ยกเว้นโค้ดและคำสั่งเทคนิค
```

### คำสั่งจัดการ Memory

| คำสั่ง | อธิบาย |
|-------|--------|
| `/memory` | ดูและแก้ไข CLAUDE.md และ Memory |
| "จำไว้ว่า..." | บอก Claude ให้จดจำข้อมูล |
| "ลืม..." | บอก Claude ให้ลบ Memory |

### เปิด/ปิด Auto Memory

```json
// ใน settings.json
{
  "autoMemoryEnabled": true
}
```

หรือใช้ `/memory` เพื่อเปิด/ปิด

---

---

## Navigation

- ⬅️ Previous: [[07-claude-md]]
- ➡️ Next: [[09-mcp-servers]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/08-memory]]
