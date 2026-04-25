---
title: "เคล็ดลับและแนวทางปฏิบัติที่ดี"
section: 25
lang: th
tags:
  - claude-code
  - best-practices
  - tips
aliases:
  - "เคล็ดลับ"
related:
  - "[[24-troubleshooting]]"
  - "[[26-real-world-workflows]]"
---

# เคล็ดลับและแนวทางปฏิบัติที่ดี

### ประโยชน์และ Use Cases

> **ทำไมต้องอ่านส่วนนี้?**
>
> เคล็ดลับเหล่านี้มาจาก **ประสบการณ์จริงของนักพัฒนา** ที่ใช้ Claude Code ทุกวัน — ช่วยให้คุณได้ผลลัพธ์ดีขึ้น เร็วขึ้น และประหยัดค่าใช้จ่ายมากขึ้น

### เขียน CLAUDE.md อย่างมีประสิทธิภาพ

- เก็บไว้ไม่เกิน 200 บรรทัด
- ใช้หัวข้อ (`#`) และ Bullet Points ชัดเจน
- เฉพาะเจาะจง: "ใช้ 2-space indentation" ไม่ใช่ "format ให้สวย"
- ใช้ `@import` สำหรับเอกสารอ้างอิงยาว ๆ
- แยกหัวข้อไปไว้ใน `.claude/rules/`

### พิมพ์คำสั่งอย่างมีประสิทธิภาพ

| แนวทาง | ตัวอย่างดี | ตัวอย่างไม่ดี |
|--------|----------|------------|
| **เฉพาะเจาะจง** | "แก้ Bug ที่ทำให้ login ล้มเหลวเมื่อ password มี special characters ในไฟล์ src/auth.ts" | "แก้ Bug login" |
| **บอกวิธีตรวจสอบ** | "แก้แล้วรัน `npm test src/auth.test.ts` ให้ผ่าน" | "แก้แล้วเทสต์ด้วย" |
| **สำรวจก่อนทำ** | "วิเคราะห์ว่า Authentication flow ทำงานยังไง แล้วเสนอแผนก่อนแก้" | "แก้ Auth ให้หน่อย" |
| **มอบหมาย ไม่ใช่สั่งทีละขั้น** | "สร้าง REST API สำหรับ CRUD Users ตาม Pattern ที่ใช้ในโปรเจกต์" | "สร้างไฟล์ route ก่อน แล้ว..." |

### จัดการ Permission

- อนุมัติคำสั่งที่ใช้บ่อย: `Bash(npm test *)`
- ใช้ Deny สำหรับคำสั่งอันตราย: `Bash(rm -rf *)`
- สลับโหมดตามงาน: Plan → acceptEdits → auto

### ทำงานคู่ขนาน

- ใช้ `--worktree` สำหรับเซสชันคู่ขนาน
- ใช้ Agent Teams สำหรับงานที่ต้องร่วมมือ
- ใช้ Subagents สำหรับงานเฉพาะทาง

### CI/CD Integration

```bash
# ตัวอย่างใน GitHub Actions
- name: Claude Code Review
  run: |
    claude --bare -p "รีวิวโค้ดที่เปลี่ยนแปลง" \
      --allowedTools "Read,Bash(npm test)" \
      --output-format json \
      --max-turns 5
```

### ทำงานกับ Context Window อย่างฉลาด

1. ใช้ `/compact` เมื่อบทสนทนายาว
2. ใช้ `/clear` เมื่อเปลี่ยนหัวข้อ
3. ใช้ Subagent สำหรับงานค้นหา
4. ใช้ `/btw` สำหรับคำถามเล็ก ๆ
5. ตรวจสอบ `/context` เป็นระยะ

### เลือกโมเดลให้เหมาะกับงาน

| งาน | โมเดลที่แนะนำ | เหตุผล |
|-----|--------------|--------|
| วางสถาปัตยกรรม, แก้ Bug ซับซ้อน | Opus 4.6 | คิดลึก วิเคราะห์ดี |
| เขียนโค้ดทั่วไป, แก้ Bug ธรรมดา | Sonnet 4.6 | เร็ว ประหยัด |
| งาน Boilerplate, Generate Data | Haiku 4.5 | เร็วมาก ถูกมาก |

### ประหยัดค่าใช้จ่าย

- ใช้ `--effort low` สำหรับงานง่าย ๆ
- ใช้ `--model sonnet` เมื่อไม่ต้องการ Opus
- ใช้ `--max-budget-usd` เพื่อจำกัดงบ
- ใช้ `/compact` เพื่อลด Token ที่ส่ง

---

---

## Navigation

- ⬅️ Previous: [[24-troubleshooting]]
- ➡️ Next: [[26-real-world-workflows]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/25-tips-best-practices]]
