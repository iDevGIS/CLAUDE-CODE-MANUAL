---
title: "การจัดการ Context"
section: 14
lang: th
tags:
  - claude-code
  - context
  - memory
aliases:
  - "การจัดการ Context"
related:
  - "[[08-memory]]"
  - "[[07-claude-md]]"
---

# การจัดการ Context

### ประโยชน์และ Use Cases

> **ทำไมต้องจัดการ Context?**
>
> Context Window คือ "ความจำระยะสั้น" ของ Claude — ถ้าเต็ม Claude จะลืมสิ่งที่คุยกันก่อนหน้า การจัดการ Context อย่างดีช่วยให้ Claude **ทำงานได้ต่อเนื่องยาวนาน** โดยไม่สูญเสียข้อมูลสำคัญ

**Use Cases:**

| สถานการณ์ | วิธีจัดการ | ผลลัพธ์ |
|----------|----------|--------|
| **คุยกันมานาน Context เริ่มเต็ม** | `/compact เน้นเรื่อง Auth` | Claude สรุปเก็บเฉพาะสิ่งสำคัญ เปิดพื้นที่ให้ทำงานต่อ |
| **เปลี่ยนหัวข้องานกลางทาง** | `/clear` | เริ่มเซสชันใหม่สะอาด ไม่มี Context เก่ามารบกวน |
| **CLAUDE.md ยาวมาก Context เต็มเร็ว** | แยกไป `.claude/rules/` | โหลดเฉพาะกฎที่เกี่ยวข้อง ไม่โหลดทั้งหมดทุกครั้ง |
| **ต้องค้นหาโค้ดเยอะ กลัว Context เต็ม** | ใช้ Subagent (Explore) | Subagent ค้นหาใน Context แยก ไม่กินพื้นที่ Claude หลัก |
| **อยากถามเรื่องเล็ก ๆ ไม่อยากเสีย Context** | `/btw คำถาม` | ถามโดยไม่ใช้เครื่องมือ ไม่เพิ่ม Context มาก |
| **ต้องการดูว่า Context ถูกใช้ไปเท่าไหร่** | `/context` | เห็นสัดส่วนการใช้ Context แต่ละส่วน |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: คุณทำงานมา 2 ชั่วโมง แก้ Bug 5 ตัว Context เริ่มเต็ม

ไม่จัดการ Context:
  Claude เริ่มลืม Bug ตัวแรก ๆ → คุณต้องอธิบายใหม่ → เสียเวลา

จัดการ Context:
  1. หลังแก้ Bug 2-3 ตัว → พิมพ์ /compact เก็บสรุปที่สำคัญ
  2. Context ว่างขึ้น → ทำงาน Bug ถัดไปได้อย่างต่อเนื่อง
  3. ถ้าเปลี่ยนหัวข้อ → /clear แล้วเริ่มใหม่
  → ทำงานได้ทั้งวันโดยไม่ติดปัญหา Context
```

### Context Window คืออะไร?

พื้นที่ "ความจำ" ของ Claude ในเซสชัน ประกอบด้วย:
- ประวัติบทสนทนา
- ไฟล์ CLAUDE.md
- Auto Memory
- เครื่องมือที่โหลด
- Skills ที่โหลด

### ดูการใช้ Context

```
/context
```

### Auto-Compaction (สรุปอัตโนมัติ)

เมื่อ Context ใกล้เต็ม Claude จะสรุปบทสนทนาอัตโนมัติ โดยเก็บ:
- คำสั่งเริ่มต้น (CLAUDE.md)
- โค้ดสำคัญ
- งานล่าสุด
- บริบทของ Task

### สรุปด้วยตัวเอง

```
/compact เน้นเรื่องการแก้ Authentication
```

Claude จะสรุปบทสนทนา โดยเน้นหัวข้อที่ระบุ

### เทคนิคประหยัด Context

| วิธี | รายละเอียด |
|-----|-----------|
| CLAUDE.md สั้น ๆ | เก็บไว้ไม่เกิน 200 บรรทัด |
| ใช้ `.claude/rules/` | แยกคำสั่งยาว ๆ ออกจาก CLAUDE.md |
| `disable-model-invocation` | ปิดไม่ให้ Claude เรียก Skill ที่ไม่ค่อยใช้ |
| ใช้ Subagent | งานสำรวจใช้ Subagent (แยก Context) |
| `/compact` | สรุปเมื่อ Context เริ่มเยอะ |

---

---

## Navigation

- ⬅️ Previous: [[13-agent-teams]]
- ➡️ Next: [[15-git-integration]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/14-context-management]]
