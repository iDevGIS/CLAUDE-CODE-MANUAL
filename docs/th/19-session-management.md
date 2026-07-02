---
title: "Session Management"
section: 19
lang: th
tags:
  - claude-code
  - sessions
  - workflow
aliases:
  - "Session Management"
related:
  - "[[14-context-management]]"
  - "[[20-scheduled-tasks]]"
---

# Session Management

### ประโยชน์และ Use Cases

> **ทำไมต้องจัดการ Session?**
>
> Session Management ทำให้คุณ **กลับมาทำงานต่อได้ทันที** เหมือนเปิดแท็บเดิมใน Browser — Claude จำทุกอย่างที่คุยกัน ไม่ต้องอธิบายใหม่ ย้อนกลับได้ถ้าผิดพลาด

**Use Cases:**

| Use Case | วิธีใช้ | คำอธิบาย |
|----------|--------|----------|
| **ปิดคอมแล้วกลับมาทำงานต่อ** | `claude -c` | Claude จำบริบททั้งหมด ทำงานต่อได้ทันที ไม่ต้องอธิบายใหม่ |
| **มีหลายงาน อยากสลับไปมา** | `/resume` → เลือก Session | กลับไป Session ไหนก็ได้ แต่ละงานมี Context แยก |
| **ตั้งชื่อ Session ให้จำง่าย** | `/rename auth-refactor` | หา Session ได้ง่ายเมื่อมีหลายงาน |
| **Claude แก้โค้ดผิด อยากย้อนกลับ** | `Esc + Esc` → Restore | ย้อนทั้งโค้ดและบทสนทนา หรือเลือกย้อนอย่างใดอย่างหนึ่ง |
| **อยากลองวิธีใหม่โดยไม่เสีย Session เดิม** | `claude --fork-session` | แยก Branch ออกจาก Session ปัจจุบัน ถ้าไม่ดีก็กลับไป Session เดิมได้ |
| **ส่ง Session ให้เพื่อนร่วมทีมดู** | `claude --remote` | สร้าง Session บน Cloud เปิดดูจาก Browser ได้ |

### Rewind (ย้อนกลับ)

กด `Esc + Esc` หรือใช้ `/rewind`:

| ตัวเลือก | อธิบาย |
|---------|--------|
| Restore code and conversation | ย้อนทั้งโค้ดและบทสนทนา |
| Restore conversation | ย้อนบทสนทนา เก็บโค้ดปัจจุบัน |
| Restore code | ย้อนโค้ด เก็บบทสนทนาปัจจุบัน |
| Summarize from here | สรุปบทสนทนาจากจุดนี้ |

### Resume Session (กลับมาต่อ)

```bash
claude --continue                    # เซสชันล่าสุด
claude --resume auth-refactor        # ตามชื่อ
claude --resume <session-id>         # ตาม ID
claude --fork-session                # แยก Branch ใหม่
```

### ดูรายการเซสชัน

```
/resume
```

แสดง Interactive Picker ให้เลือกเซสชัน

### ตำแหน่งเก็บไฟล์เซสชัน

```
~/.claude/projects/<project>/sessions/<session-id>.jsonl
```

### Background Sessions & Agent View

**Background sessions** ให้งานทำต่อแบบแยกจาก foreground: เริ่มด้วย `claude --bg` หรือดันงานปัจจุบันไปเบื้องหลังด้วย `/bg` (หรือ `Ctrl+B`). session ที่ pin ไว้จะอยู่ต่อ รีสตาร์ทเอง และสละทรัพยากรอย่างนุ่มนวลเมื่อ memory ตึง; เรียกกลับด้วย `/resume` (มองหา marker `bg`). **Agent view** (`claude agents`) เป็นตัวจัดการหลาย session พร้อมกัน — `claude agents --json` สำหรับสคริปต์

### 🆕 ใหม่ใน v2.1.191

- `claude agents --json` รองรับ `--all` (รวม session ที่เสร็จแล้ว) และเพิ่ม field `id`, `state`, `waitingFor` (บอกว่า session ที่ค้างกำลังรออะไร เช่น permission prompt)
- `--agent <name>` เลือก agent ที่ session ใช้รัน

### 🆕 ใหม่ใน v2.1.198

- **Background agent ปิดงานเองจบ** — งานโค้ดใน worktree จะ commit + push + เปิด **draft PR** ให้อัตโนมัติ แทนที่จะหยุดรอถาม
- background session ที่รอ input หรือเสร็จแล้ว จะยิง hook `Notification` (`agent_needs_input` / `agent_completed`)

> 🔎 เจาะลึกทั้งเรื่องนี้ต่อได้ที่ [[41-background-agents]]

---

---

## Navigation

- ⬅️ Previous: [[18-plugins]]
- ➡️ Next: [[20-scheduled-tasks]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/19-session-management]]
