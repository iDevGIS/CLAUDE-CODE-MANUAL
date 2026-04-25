---
title: "Agent Teams (ทีม AI)"
section: 13
lang: th
tags:
  - claude-code
  - agent-teams
  - agents
aliases:
  - "Agent Teams"
related:
  - "[[12-subagents]]"
  - "[[11-skills]]"
---

# Agent Teams (ทีม AI)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Agent Teams?**
>
> Agent Teams คือการ **ให้ AI หลายตัวทำงานพร้อมกัน** เหมือนทีมนักพัฒนาจริง ๆ — แต่ละ Agent มีบทบาทชัดเจน ส่งข้อความหากันได้ แชร์ Task List เดียวกัน ทำให้งานใหญ่ ๆ เสร็จเร็วขึ้นหลายเท่า

**Use Cases:**

| ทีม AI | สถานการณ์ | ผลลัพธ์ |
|-------|----------|--------|
| **Code Review Team** | PR ขนาดใหญ่ แก้ไข 50+ ไฟล์ | Agent 1 ตรวจ Security, Agent 2 ตรวจ Performance, Agent 3 ตรวจ Test Coverage → รีวิวเสร็จพร้อมกัน เร็วกว่า 3 เท่า |
| **Migration Team** | ย้ายจาก Monolith → Microservices | Agent แต่ละตัวรับผิดชอบ Service หนึ่ง → ย้ายโค้ดพร้อมกัน |
| **Full-Stack Team** | สร้างฟีเจอร์ใหม่ทั้ง Frontend + Backend | Agent 1 เขียน API, Agent 2 เขียน UI, Agent 3 เขียน Test → ทำงานคู่ขนาน |
| **Bug Hunting Team** | หา Bug ในโปรเจกต์ใหญ่ | แต่ละ Agent ค้นหาในส่วนต่าง ๆ ของ Codebase → ครอบคลุมมากขึ้น |
| **Refactoring Team** | รีแฟคเตอร์ 100+ ไฟล์ | แบ่ง Module ให้แต่ละ Agent → เสร็จพร้อมกัน |
| **Documentation Team** | เขียนเอกสารโปรเจกต์ทั้งหมด | Agent 1 เขียน API Docs, Agent 2 เขียน User Guide, Agent 3 เขียน Architecture Docs |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: ต้องรีวิว PR ขนาดใหญ่ที่แก้ไข 80 ไฟล์

ไม่มี Agent Teams:
  Claude รีวิวทีละไฟล์ → ใช้เวลา 30 นาที → ลืมปัญหาที่เจอในไฟล์แรก ๆ

มี Agent Teams:
  Agent "Security": ตรวจ Injection, Auth, Data Leak
  Agent "Performance": ตรวจ N+1, Memory, Complexity
  Agent "Quality": ตรวจ Test Coverage, Code Style, DRY
  → ทุก Agent ทำงานพร้อมกัน → เสร็จใน 10 นาที → รายงานรวมครบทุกมิติ
```

### Agent Teams คืออะไร?

หลายเซสชัน Claude Code ทำงานพร้อมกัน แชร์ Task List และส่งข้อความหากันได้

### เปิดใช้งาน (Experimental)

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

หรือใน settings.json:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### สร้างทีม

```
สร้าง Agent Team สำหรับรีวิว PR นี้ แบ่งเป็น 3 คน:
- คนที่ 1 ตรวจ Security
- คนที่ 2 ตรวจ Performance
- คนที่ 3 ตรวจ Test Coverage
```

### ควบคุมทีม

- **มอบงาน:** "มอบงาน Security Review ให้ Security Teammate"
- **สลับ Teammate:** `Shift+Down` ในโหมด In-process
- **โหมดแสดงผล:** `--teammate-mode in-process` (ค่าเริ่มต้น) หรือ `tmux` (แยก Panel)
- **ปิดทีม:** "ให้ Researcher หยุดทำงาน"

### ข้อจำกัด

- ไม่สามารถ Resume Session กับ In-process Teammates
- สถานะ Task อาจมีความล่าช้า
- ไม่รองรับ Nested Teams
- 1 ทีมต่อ 1 เซสชัน

---

---

## Navigation

- ⬅️ Previous: [[12-subagents]]
- ➡️ Next: [[14-context-management]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/13-agent-teams]]
