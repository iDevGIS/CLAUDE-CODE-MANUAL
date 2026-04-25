---
title: "Git Integration"
section: 15
lang: th
tags:
  - claude-code
  - git
  - version-control
aliases:
  - "Git Integration"
related:
  - "[[16-headless-mode]]"
  - "[[17-ide-integration]]"
---

# Git Integration

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Git Integration?**
>
> Git Integration ทำให้ Claude จัดการ Git ได้ **เหมือนนักพัฒนามืออาชีพ** — เขียน Commit Message ที่สื่อความหมาย, สร้าง PR ที่อธิบายงานชัดเจน, รีวิวโค้ดอย่างละเอียด และทำงานหลาย Branch คู่ขนานได้

**Use Cases:**

| Use Case | วิธีใช้ | ผลลัพธ์ |
|----------|--------|--------|
| **Commit ที่มีข้อความดี ๆ** | `/commit` | Claude อ่าน Diff แล้วเขียน Message ที่อธิบาย "ทำไม" ไม่ใช่แค่ "ทำอะไร" ดีกว่า "fix bug" หรือ "update" |
| **สร้าง PR ที่ทีมเข้าใจง่าย** | `/pr` | Claude สรุปการเปลี่ยนแปลงทั้ง Branch เขียน Description ที่ครบถ้วน Reviewer เข้าใจงานได้ทันที |
| **รีวิวโค้ดก่อน Push** | `/review` | Claude ตรวจหา Bug, Security Issue, Code Smell ก่อนที่คนอื่นจะเห็น ลดจำนวนรอบรีวิว |
| **ทำ 2 ฟีเจอร์พร้อมกัน** | `claude -w feature-a` + `claude -w feature-b` | แต่ละ Worktree มี Branch แยก Claude ทำงานคู่ขนานได้โดยไม่ Conflict |
| **ดูสถานะ PR** | ดู Status Bar | เห็นสถานะ PR (Approved/Pending/Changes Requested) โดยไม่ต้องเปิด GitHub |
| **ย้อน Commit ที่ผิดพลาด** | `Esc + Esc` → Restore code | ย้อนกลับได้ทันที ไม่ต้องหา git reflog เอง |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: คุณแก้ Bug 3 ไฟล์ อยากสร้าง PR

ก่อนมี Git Integration:
  1. git add src/auth.ts src/middleware.ts src/utils.ts   ← จำชื่อไฟล์
  2. git commit -m "..."                                  ← คิด Message
  3. git push -u origin fix/login-bug                     ← จำ Branch
  4. gh pr create --title "..." --body "..."              ← เขียน PR Description
  → ใช้เวลา 10 นาที, PR Description มักสั้นเกินไป

หลังมี Git Integration:
  1. พิมพ์ /commit → Claude วิเคราะห์ Diff เขียน Message ให้
  2. พิมพ์ /pr → Claude เขียน Title + Description ครบถ้วน Push + สร้าง PR
  → ใช้เวลา 1 นาที, PR Description ละเอียดชัดเจน
```

### คำสั่ง Git ที่ใช้บ่อย

| คำสั่ง | อธิบาย |
|-------|--------|
| `/commit` | Stage + Commit พร้อมข้อความจาก Claude |
| `/pr` | สร้าง Pull Request |
| `/review` | รีวิวโค้ด |

### Git Worktrees (ทำงานคู่ขนาน)

```bash
# สร้าง Worktree แยก
claude -w feature-auth

# Claude จะทำงานใน .claude/worktrees/feature-auth
# ไม่กระทบกับ Working Directory หลัก
```

ประโยชน์:
- รันหลายเซสชัน Claude พร้อมกัน
- แต่ละเซสชันแก้ไขไฟล์แยกกัน
- ไม่มีปัญหา Conflict

### GitHub Integration

- แสดงสถานะ PR บน Branch ปัจจุบัน
- แสดงสีตามสถานะ: เขียว (Approved), เหลือง (Pending), แดง (Changes Requested)
- `Cmd+Click` / `Ctrl+Click` เพื่อเปิด PR ใน Browser
- ต้องการ `gh` CLI

### ตัวอย่างการ Commit

```
/commit
```

Claude จะ:
1. ดู `git status` และ `git diff`
2. เขียน Commit Message ที่เหมาะสม
3. Stage ไฟล์ที่เกี่ยวข้อง
4. สร้าง Commit

### ตัวอย่างการสร้าง PR

```
/pr
```

Claude จะ:
1. วิเคราะห์การเปลี่ยนแปลงทั้งหมดตั้งแต่แยก Branch
2. เขียน Title และ Description
3. Push ไปยัง Remote (ถ้าจำเป็น)
4. สร้าง PR ด้วย `gh pr create`

---

---

## Navigation

- ⬅️ Previous: [[14-context-management]]
- ➡️ Next: [[16-headless-mode]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/15-git-integration]]
