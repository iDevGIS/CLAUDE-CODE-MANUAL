---
title: "ฟีเจอร์พิเศษอื่น ๆ"
section: 21
lang: th
tags:
  - claude-code
  - features
  - reference
aliases:
  - "ฟีเจอร์พิเศษ"
related:
  - "[[22-directory-structure]]"
  - "[[23-environment-variables]]"
---

# ฟีเจอร์พิเศษอื่น ๆ

### ประโยชน์และ Use Cases

> **ฟีเจอร์พิเศษเหล่านี้ช่วยอะไร?**
>
> ฟีเจอร์เหล่านี้เป็น **ความสามารถเสริมที่ช่วยให้ Claude ทำงานได้หลากหลายขึ้น** — ตั้งแต่คิดวิเคราะห์ลึก ๆ ไปจนถึงควบคุม Browser หรือรับคำสั่งด้วยเสียง

**Use Cases:**

| ฟีเจอร์ | Use Case | คำอธิบาย |
|--------|----------|----------|
| **Extended Thinking** | วางสถาปัตยกรรมซอฟต์แวร์ | Claude ใช้เวลาคิดนานขึ้น วิเคราะห์ข้อดี-ข้อเสียของแต่ละทางเลือก ผลลัพธ์ละเอียดกว่าปกติมาก |
| **Fast Mode** | แก้ Bug เล็ก ๆ เร็ว ๆ | ได้คำตอบเร็วขึ้น เหมาะกับงานที่ไม่ซับซ้อน ประหยัดเวลา |
| **Code Intelligence** | ตรวจ Type Error ระหว่างเขียน | Claude เห็น Type Error แบบ Real-time เหมือน IDE ตรวจให้ แก้ Bug ได้ตั้งแต่ตอนเขียน |
| **Voice Dictation** | อธิบายสิ่งที่ต้องการด้วยเสียง | กดค้าง Space แล้วพูด เร็วกว่าพิมพ์สำหรับคำอธิบายยาว ๆ |
| **Remote Control** | แชร์ Session ให้เพื่อนร่วมทีม | เพื่อนเปิด Browser ดู Session ของคุณได้ เหมาะกับ Pair Programming |
| **Computer Use** | ทดสอบ UI บน macOS | Claude ควบคุมเมาส์/คีย์บอร์ด ทดสอบแอปจริง ๆ ได้ |
| **Side Questions** | ถามเรื่องเล็ก ๆ ระหว่างทาง | `/btw` ถามโดยไม่กระทบ Context หลัก |

### Extended Thinking (คิดลึก)

```
/think
```

หรือกด `Cmd+T` / `Meta+T`

Claude จะใช้เวลาคิดนานขึ้นสำหรับปัญหาที่ซับซ้อน เช่น:
- วางสถาปัตยกรรมซอฟต์แวร์
- แก้ Bug ที่ซับซ้อน
- วิเคราะห์ Security

### Fast Mode (เร็วขึ้น)

กด `Meta+O` / `Alt+O` หรือ `/fast`

ใช้ Opus 4.6 เหมือนเดิม แต่ Output เร็วขึ้น

### Code Intelligence

ตรวจสอบ Type และ Error แบบ Real-time ด้วย LSP Servers

รองรับ: TypeScript, Python, Rust

### Voice Dictation (พูดแทนพิมพ์)

กดค้าง `Space` เพื่อ Push-to-talk

### Remote Control

```bash
claude remote-control --name "My Project"
```

ควบคุม Claude Code จาก Browser ได้

### Computer Use (macOS)

```bash
claude --chrome
```

Claude สามารถควบคุมเมาส์/คีย์บอร์ดและโต้ตอบกับเว็บแอปได้

### Side Questions

```
/btw ไฟล์ Config อยู่ไหน?
```

ถามคำถามข้างเคียงโดยไม่กระทบ Context หลัก

---

---

## Navigation

- ⬅️ Previous: [[20-scheduled-tasks]]
- ➡️ Next: [[22-directory-structure]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/21-special-features]]
