---
title: "คำสั่ง CLI และ Flags"
section: 2
lang: th
tags:
  - claude-code
  - cli
  - commands
aliases:
  - "คำสั่ง CLI"
related:
  - "[[01-installation]]"
  - "[[03-slash-commands]]"
  - "[[04-keyboard-shortcuts]]"
---

# คำสั่ง CLI และ Flags

### ประโยชน์และ Use Cases

> **ทำไมต้องรู้จัก CLI Flags?**
>
> CLI Flags คือกุญแจสำคัญในการ **ปรับแต่ง Claude Code ให้ทำงานตรงกับสถานการณ์** ที่ต้องการ เช่น รันใน CI/CD แบบอัตโนมัติ, จำกัดงบประมาณ, เลือกโมเดลที่เหมาะสม หรือทำงานหลายงานคู่ขนานกัน

**Use Cases:**

| Use Case | คำสั่งที่ใช้ | คำอธิบาย |
|----------|------------|----------|
| **ถามคำถามเร็ว ๆ ไม่ต้อง Interactive** | `claude -p "อธิบายฟังก์ชัน X"` | ได้คำตอบทันทีแล้วจบ ไม่ต้องเปิดเซสชัน เหมาะกับการ Pipe เข้า Script |
| **ต่อบทสนทนาเมื่อวาน** | `claude -c` | กลับมาทำงานต่อจากที่ค้างไว้ Claude จำบริบททั้งหมดได้ |
| **ทำงาน 2 ฟีเจอร์พร้อมกัน** | `claude -w feature-a` + `claude -w feature-b` | แต่ละ Worktree มี Branch แยก ไม่ Conflict กัน |
| **จำกัดค่าใช้จ่าย** | `claude --max-budget-usd 5` | ป้องกันค่าใช้จ่ายเกินงบ เหมาะกับทีมที่มีงบจำกัด |
| **ใช้โมเดลถูก ๆ สำหรับงานง่าย** | `claude --model sonnet` | ประหยัดค่าใช้จ่ายกับงานที่ไม่ซับซ้อน |
| **รัน Script อัตโนมัติ** | `claude --bare -p "..." --output-format json` | ผลลัพธ์สะอาด ไม่มี UI มาปนเป็น เหมาะกับ CI/CD |
| **ส่ง Error Log ให้วิเคราะห์** | `cat error.log \| claude -p "วิเคราะห์"` | ส่งข้อมูลจาก Pipe ให้ Claude วิเคราะห์ได้ทันที |
| **ทำงานข้ามโปรเจกต์** | `claude --add-dir ../other-project` | เข้าถึงไฟล์จากหลายโปรเจกต์พร้อมกัน |

### คำสั่งเปิดเซสชัน

| คำสั่ง | อธิบาย |
|-------|--------|
| `claude` | เปิดเซสชันแบบโต้ตอบ (Interactive) |
| `claude "คำถาม"` | เปิดเซสชันพร้อมคำถามเริ่มต้น |
| `claude -p "คำถาม"` | โหมด Non-interactive (พิมพ์ผลลัพธ์แล้วจบ) |
| `cat file \| claude -p "คำถาม"` | ส่งข้อมูลจาก pipe เข้า Claude |
| `claude -c` | ต่อบทสนทนาล่าสุด |
| `claude -r "ชื่อ"` | กลับไปเซสชันที่ระบุ |
| `claude -w branch-name` | สร้าง Git Worktree แยกทำงานคู่ขนาน |
| `claude --fork-session` | แยกเซสชันใหม่จากเซสชันปัจจุบัน |
| `claude --remote` | สร้างเซสชันบน claude.ai |

### ตัวเลือกโมเดลและ Effort

| Flag | อธิบาย |
|------|--------|
| `--model <ชื่อ>` | เลือกโมเดล เช่น `sonnet`, `opus`, `claude-sonnet-4-6` |
| `--effort low\|medium\|high\|max` | ระดับความพยายาม (`max` ใช้ได้เฉพาะ Opus 4.6) |
| `--fallback-model` | เปิดใช้โมเดลสำรองเมื่อโมเดลหลักไม่ว่าง |

### ตัวเลือก Permission

| Flag | อธิบาย |
|------|--------|
| `--permission-mode <mode>` | ตั้งโหมดสิทธิ์: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` |
| `--enable-auto-mode` | เปิดใช้ Auto Mode ใน Shift+Tab |
| `--dangerously-skip-permissions` | ข้ามการขออนุญาตทั้งหมด (ระวัง!) |
| `--allowedTools "Tool1,Tool2"` | อนุมัติเครื่องมือล่วงหน้า |
| `--disallowedTools "Tool1,Tool2"` | บล็อกเครื่องมือที่ระบุ |

### ตัวเลือก System Prompt

| Flag | อธิบาย |
|------|--------|
| `--system-prompt "ข้อความ"` | แทนที่ System Prompt ทั้งหมด |
| `--system-prompt-file <path>` | โหลด System Prompt จากไฟล์ |
| `--append-system-prompt "ข้อความ"` | เพิ่มข้อความต่อท้าย System Prompt |

### ตัวเลือก Output

| Flag | อธิบาย |
|------|--------|
| `--output-format text\|json\|stream-json` | รูปแบบ Output |
| `--json-schema <schema>` | บังคับ Output เป็น JSON ตาม Schema |
| `--input-format text\|stream-json` | รูปแบบ Input |
| `--verbose` | แสดง Log ละเอียด |
| `--debug <categories>` | เปิด Debug Mode |

### ตัวเลือกขั้นสูง

| Flag | อธิบาย |
|------|--------|
| `--bare` | โหมดเปล่า: ข้าม Hooks, Skills, Plugins, MCP, Memory |
| `--max-turns <n>` | จำกัดจำนวนรอบการทำงาน |
| `--max-budget-usd <จำนวน>` | จำกัดงบประมาณ (USD) |
| `--config <file>` | โหลดไฟล์ MCP Config |
| `--add-dir <path>` | เพิ่มไดเรกทอรีที่เข้าถึงได้ |
| `--agent <name>` | ระบุ Subagent ที่จะใช้ |
| `--init` | รัน Initialization Hooks แล้วเริ่ม |
| `--version` | แสดงเวอร์ชัน |

### คำสั่งอื่น ๆ

```bash
claude auth login          # ล็อกอิน
claude auth logout         # ล็อกเอาท์
claude auth status         # ตรวจสอบสถานะ
claude setup-token         # สร้าง Token สำหรับ CI
claude mcp                 # จัดการ MCP Servers
claude plugin              # จัดการ Plugins
claude update              # อัปเดตเวอร์ชันล่าสุด
claude agents              # ดูรายการ Subagents
claude remote-control      # เริ่ม Remote Control Server
```

---

---

## Navigation

- ⬅️ Previous: [[01-installation]]
- ➡️ Next: [[03-slash-commands]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/02-cli-commands]]
