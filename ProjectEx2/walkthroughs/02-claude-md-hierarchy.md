---
walkthrough: 02
title: CLAUDE.md Hierarchy & Memory
related:
  - "[[01-getting-started]]"
  - "[[03-permissions-deep-dive]]"
---

# 02 — CLAUDE.md Hierarchy: หลายระดับ ทำไมและอย่างไร

> เป้าหมาย: เข้าใจว่า Claude Code อ่าน `CLAUDE.md` ตามลำดับใด และเอา nested files ไปใช้ออกแบบโปรเจกต์ใหญ่

## ลำดับการอ่าน (จากกว้างสุดไปแคบสุด)

1. `~/.claude/CLAUDE.md` — **user-level memory** (ใช้ได้ทุกโปรเจกต์)
2. `<project-root>/CLAUDE.md` — **project memory** ← TaskFlow มี
3. `<subdir>/CLAUDE.md` — **subtree memory** ← TaskFlow มี (`src/CLAUDE.md`)

ทั้งหมดถูกรวมเข้า context ตอน session start (และ refresh ตอน `/init`, `/memory`)

## ของจริงใน TaskFlow

```
taskflow/
├── CLAUDE.md             ← rules ระดับโปรเจกต์ (stack, conventions, workflow, don't)
└── src/
    └── CLAUDE.md         ← rules เฉพาะ src/ (layout, import boundaries)
```

ลองเปิดทั้ง 2 ไฟล์เทียบกัน — root พูดเรื่อง **policy** (workflow, ห้ามทำอะไร), nested พูดเรื่อง **structure** (โมดูลไหน import อะไรได้)

## ทำไมแยก

- **อ่านแค่ที่จำเป็น** — เวลาทำงานใน `tests/` Claude ไม่ต้องโหลด rule ของ `src/`
- **scope ที่ชัดเจน** — rule เกี่ยวกับ `src/core/` ห้าม `console.log` อยู่ใน `src/CLAUDE.md` ไม่ใช่ root เพราะมันเป็นเรื่องของ subtree เท่านั้น
- **ลด noise** — root file เล็กลง อ่านง่ายขึ้นสำหรับคนใหม่เข้าโปรเจกต์

## สิ่งที่ควรเขียนในแต่ละระดับ

| ระดับ | เขียน | อย่าเขียน |
|------|-------|----------|
| user (`~/.claude/CLAUDE.md`) | สไตล์ส่วนตัว, shortcut commands, สิ่งที่ใช้ทุกโปรเจกต์ | rule ของโปรเจกต์ใดโปรเจกต์หนึ่ง |
| project (root) | stack, conventions, workflow, "don't" list | รายละเอียดของไฟล์ระดับลึก |
| subtree | import boundaries, layout, rules เฉพาะโฟลเดอร์ | สิ่งที่ใช้ทั่วทั้งโปรเจกต์ |

## ข้อควรระวัง

- nested `CLAUDE.md` **ไม่ override** root — มัน *เพิ่ม* (concat). ถ้าขัดกัน Claude จะสับสน
- อย่าใส่ secret/API key — ทุกอย่างใน `CLAUDE.md` ถูก commit
- ใช้ `/memory` ใน session เพื่อดูว่าตอนนี้อ่านไฟล์ไหนเข้าไปแล้วบ้าง

## Related

- **[[03-permissions-deep-dive]]** — รวม permission สามชั้น (user/project/local)
- **[[12-real-world-flow]]** — เห็น CLAUDE.md ถูกใช้จริงใน workflow
