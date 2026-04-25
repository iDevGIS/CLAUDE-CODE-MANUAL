---
title: "คีย์ลัด (Keyboard Shortcuts)"
section: 4
lang: th
tags:
  - claude-code
  - keyboard
  - shortcuts
aliases:
  - "คีย์ลัด"
related:
  - "[[02-cli-commands]]"
  - "[[03-slash-commands]]"
---

# คีย์ลัด (Keyboard Shortcuts)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้คีย์ลัด?**
>
> คีย์ลัดช่วยให้คุณ **ควบคุม Claude Code ได้อย่างรวดเร็วโดยไม่ต้องยกมือจากคีย์บอร์ด** ลดเวลาในการสลับโหมด, ยกเลิกการทำงาน, หรือเปิดฟีเจอร์ต่าง ๆ

**Use Cases:**

| สถานการณ์ | คีย์ลัด | คำอธิบาย |
|----------|---------|----------|
| **Claude กำลังเขียนโค้ดผิดทาง** | `Ctrl+C` | หยุดทันที ไม่ต้องรอให้เสร็จ ประหยัดเวลาและค่าใช้จ่าย |
| **อยากดูว่า Claude ใช้เครื่องมืออะไร** | `Ctrl+O` | เปิด Transcript Viewer เห็นทุก Tool Call, ทุกไฟล์ที่อ่าน/แก้ไข |
| **Claude รัน Test นาน อยากทำอย่างอื่นก่อน** | `Ctrl+B` | ย้ายงานไป Background กลับมาพิมพ์คำสั่งใหม่ได้เลย |
| **อยากเปลี่ยนจากโหมดปลอดภัยเป็น Auto** | `Shift+Tab` | สลับโหมด Permission ได้ทันที ไม่ต้องไปตั้งค่า |
| **Claude แก้โค้ดผิด อยากย้อนกลับ** | `Esc + Esc` | เปิด Rewind Menu ย้อนกลับทั้งโค้ดและบทสนทนา |
| **อยากเปลี่ยนโมเดลกลางทาง** | `Cmd+P` / `Meta+P` | เปิด Model Picker เปลี่ยนจาก Opus → Sonnet หรือกลับกัน |
| **ปัญหายาก ต้องเปิด Deep Thinking** | `Cmd+T` / `Meta+T` | เปิด Extended Thinking ให้ Claude คิดวิเคราะห์ลึกขึ้น |
| **อยากตอบเร็ว ๆ ไม่ต้องละเอียดมาก** | `Meta+O` / `Alt+O` | เปิด Fast Mode ได้คำตอบเร็วขึ้น |
| **ต้องการวาง Screenshot ให้ Claude ดู** | `Ctrl+V` / `Cmd+V` | วางรูปภาพจาก Clipboard ให้ Claude วิเคราะห์ UI, Error Screen ฯลฯ |
| **อยากพิมพ์ Prompt หลายบรรทัด** | `\ + Enter` หรือ `Shift+Enter` | ขึ้นบรรทัดใหม่แทนการส่งข้อความ เขียนคำสั่งยาว ๆ ได้สะดวก |

### การควบคุมทั่วไป

| คีย์ลัด | การทำงาน |
|---------|---------|
| `Ctrl+C` | ยกเลิก Input/Generation ปัจจุบัน |
| `Ctrl+D` | ออกจาก Claude Code |
| `Ctrl+L` | ล้างช่อง Input |
| `Ctrl+O` | เปิด/ปิด Transcript Viewer (ดูรายละเอียดเครื่องมือ) |
| `Ctrl+R` | ค้นหาคำสั่งย้อนหลัง |
| `Ctrl+V` / `Cmd+V` | วางรูปภาพจาก Clipboard |
| `Ctrl+B` | ย้ายงานปัจจุบันไป Background |
| `Ctrl+T` | เปิด/ปิด Task List |
| `Ctrl+X Ctrl+K` | หยุด Background Agents ทั้งหมด |
| `Shift+Tab` / `Alt+M` | สลับโหมด Permission |
| `Esc + Esc` | เปิดเมนู Rewind/Checkpoint |

### การแก้ไขข้อความ

| คีย์ลัด | การทำงาน |
|---------|---------|
| `Ctrl+K` | ลบข้อความจากเคอร์เซอร์ถึงท้ายบรรทัด |
| `Ctrl+U` | ลบข้อความจากเคอร์เซอร์ถึงต้นบรรทัด |
| `Ctrl+Y` | วางข้อความที่เพิ่งลบ |
| `Alt+B` | เลื่อนเคอร์เซอร์กลับไปหนึ่งคำ |
| `Alt+F` | เลื่อนเคอร์เซอร์ไปข้างหน้าหนึ่งคำ |

### การสลับโมเดลและโหมด

| คีย์ลัด | การทำงาน |
|---------|---------|
| `Cmd+P` / `Meta+P` | เปิดตัวเลือกโมเดล |
| `Cmd+T` / `Meta+T` | เปิด/ปิด Extended Thinking |
| `Meta+O` / `Alt+O` | เปิด/ปิด Fast Mode |

### การพิมพ์หลายบรรทัด

| วิธี | คีย์ลัด |
|-----|---------|
| Quick escape | `\ + Enter` |
| macOS | `Option+Enter` |
| iTerm2/WezTerm/Ghostty/Kitty | `Shift+Enter` |
| Readline | `Ctrl+J` |

### Input พิเศษ

| คีย์/สัญลักษณ์ | การทำงาน |
|---------------|---------|
| `Space` (กดค้าง) | Push-to-talk พูดแทนพิมพ์ |
| `@` | ค้นหาไฟล์อัตโนมัติ |
| `/` (ต้นบรรทัด) | แสดงคำสั่ง/Skills |
| `!` (ต้นบรรทัด) | เข้าสู่ Bash Mode |
| `Up/Down` | เลื่อนดูประวัติคำสั่ง |

### Vim Mode (เปิดได้ผ่าน `/config`)

**สลับโหมด:** `Esc` (ไป NORMAL), `i/I/a/A/o/O` (ไป INSERT)

**เลื่อน:** `h/j/k/l` (ลูกศร), `w/e/b` (คำ), `0/$` (ต้น/ท้ายบรรทัด), `gg/G` (ต้น/ท้ายเอกสาร)

**แก้ไข:** `x` (ลบตัวอักษร), `dd/D` (ลบบรรทัด), `yy` (คัดลอก), `p/P` (วาง), `>>/<<` (ย่อหน้า)

---

---

## Navigation

- ⬅️ Previous: [[03-slash-commands]]
- ➡️ Next: [[05-permissions]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/04-keyboard-shortcuts]]
