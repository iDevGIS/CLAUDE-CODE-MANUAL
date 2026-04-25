---
title: "ระบบ Permission (สิทธิ์การเข้าถึง)"
section: 5
lang: th
tags:
  - claude-code
  - permissions
  - security
aliases:
  - "ระบบ Permission"
related:
  - "[[06-configuration]]"
  - "[[23-environment-variables]]"
---

# ระบบ Permission (สิทธิ์การเข้าถึง)

### ประโยชน์และ Use Cases

> **ทำไมต้องมี Permission?**
>
> Claude Code สามารถรันคำสั่ง Shell, แก้ไขไฟล์, ลบข้อมูล — ระบบ Permission ป้องกันไม่ให้ Claude ทำสิ่งที่คุณ **ไม่ได้ตั้งใจให้ทำ** คุณเลือกระดับความอิสระได้ตั้งแต่ "ถามทุกอย่าง" ไปจนถึง "ทำได้เลยทุกอย่าง"

**Use Cases ตามบทบาท:**

| บทบาท/สถานการณ์ | โหมดที่แนะนำ | เหตุผล |
|----------------|------------|--------|
| **นักพัฒนามือใหม่** | `default` | ถามทุกอย่างก่อนทำ ได้เรียนรู้ว่า Claude ทำอะไร |
| **เขียนโค้ดทั่วไป** | `acceptEdits` | อ่าน/แก้ไขไฟล์ได้เลย ถามเฉพาะคำสั่ง Shell ที่อาจเสี่ยง ทำงานได้ลื่นโดยไม่ต้องกด Approve ทุกขั้นตอน |
| **สำรวจโปรเจกต์ก่อนแก้ไข** | `plan` | Claude อ่านได้อย่างเดียว เสนอแผนแต่ไม่แก้ไขจริง เหมาะกับการทำความเข้าใจ Codebase ก่อนลงมือ |
| **งานระยะยาว ปล่อยให้ทำเอง** | `auto` | Claude ตัดสินใจเอง มี Safety Check อัตโนมัติ เหมาะเวลาให้ Claude ทำงานใหญ่ ๆ แล้วกลับมาดูผลทีหลัง |
| **CI/CD Pipeline** | `dontAsk` | ล็อกเฉพาะเครื่องมือที่อนุมัติ ไม่มี Prompt ระหว่างทาง รันได้โดยไม่ต้องมีคนกดอนุญาต |
| **Container/VM ที่ปลอดภัย** | `bypassPermissions` | ทำได้ทุกอย่าง ใช้เฉพาะสภาพแวดล้อมที่แยกจาก Production |
| **ทำงานกับข้อมูลลูกค้า** | `default` + `deny` rules | บล็อกคำสั่งอันตราย เช่น `rm -rf`, `curl` ป้องกันข้อมูลรั่วไหล |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: คุณกำลังแก้ Bug ใน Production Code
แนะนำ: เริ่มด้วย "plan" เพื่อวิเคราะห์ → สลับเป็น "acceptEdits" เมื่อพร้อมแก้ไข
วิธี: กด Shift+Tab เพื่อสลับโหมดได้ทันที

สถานการณ์: ให้ Claude รีแฟคเตอร์โค้ด 50 ไฟล์
แนะนำ: ใช้ "auto" mode เพราะต้องแก้ไฟล์เยอะ ถ้าใช้ default จะต้องกด Approve หลายร้อยครั้ง
วิธี: claude --permission-mode auto

สถานการณ์: รัน Claude ใน GitHub Actions
แนะนำ: ใช้ "dontAsk" + allowedTools เพื่อล็อกเฉพาะคำสั่งที่ปลอดภัย
วิธี: claude --permission-mode dontAsk --allowedTools "Read,Bash(npm test)"
```

### โหมด Permission

| โหมด | สิ่งที่รันได้โดยไม่ต้องถาม | เหมาะสำหรับ |
|------|--------------------------|------------|
| `default` | อ่านไฟล์เท่านั้น | เริ่มต้นใช้งาน, งานที่ต้องระวัง |
| `acceptEdits` | อ่าน + แก้ไขไฟล์ + คำสั่ง FS ทั่วไป | เขียนโค้ดทั่วไป |
| `plan` | อ่านเท่านั้น (โหมดวางแผน) | สำรวจก่อนลงมือทำ |
| `auto` | ทุกอย่าง + ตรวจสอบความปลอดภัยอัตโนมัติ | งานระยะยาว (ทดลอง) |
| `dontAsk` | เฉพาะเครื่องมือที่อนุมัติล่วงหน้า | CI/CD ที่ล็อกสิทธิ์ |
| `bypassPermissions` | ทุกอย่างยกเว้น Protected Paths | ใช้ใน Container/VM เท่านั้น |

### วิธีสลับโหมด

- กด `Shift+Tab` ใน Interactive Mode
- ใช้ Flag `--permission-mode <mode>`
- ตั้งค่าใน `settings.json`

### กฎ Permission

**จับคู่เครื่องมือทั้งหมด:**
```
Bash             # Bash ทุกคำสั่ง
Read             # อ่านไฟล์ทุกอัน
Edit             # แก้ไฟล์ทุกอัน
```

**ระบุเงื่อนไขเพิ่ม:**
```
Bash(npm run build)              # คำสั่งเฉพาะ
Bash(npm run *)                  # Wildcard
Read(./.env)                     # ไฟล์เฉพาะ
Read(src/**)                     # ทุกไฟล์ในไดเรกทอรี
WebFetch(domain:github.com)      # เฉพาะโดเมน
Agent(Explore)                   # Subagent เฉพาะ
Skill(commit)                    # Skill เฉพาะ
```

### ลำดับความสำคัญของกฎ

1. **Deny** (สูงสุด) - บล็อกเสมอ
2. **Ask** - ถามก่อนทำ
3. **Allow** (ต่ำสุด) - อนุญาตเสมอ

### ตั้งค่าใน settings.json

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": ["Bash(npm run *)", "Bash(git *)"],
    "deny": ["Bash(rm -rf *)"],
    "ask": ["Bash"]
  }
}
```

### Protected Paths (ไฟล์/โฟลเดอร์ที่ป้องกันเสมอ)

- `.git/`
- `.claude/` (ยกเว้น commands, agents, skills, worktrees)
- `.vscode/`, `.idea/`, `.husky/`
- `.gitconfig`, `.bashrc`, ไฟล์ Shell Config

---

---

## Navigation

- ⬅️ Previous: [[04-keyboard-shortcuts]]
- ➡️ Next: [[06-configuration]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/05-permissions]]
