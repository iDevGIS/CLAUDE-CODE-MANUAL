---
title: "Slash Commands (คำสั่งลัด)"
section: 3
lang: th
tags:
  - claude-code
  - slash-commands
  - commands
aliases:
  - "Slash Commands"
related:
  - "[[02-cli-commands]]"
  - "[[11-skills]]"
  - "[[04-keyboard-shortcuts]]"
---

# Slash Commands (คำสั่งลัด)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Slash Commands?**
>
> Slash Commands คือ **ทางลัดสำหรับงานที่ทำบ่อย** เพียงพิมพ์ `/` ตามด้วยชื่อคำสั่ง Claude จะทำงานตามขั้นตอนที่กำหนดไว้โดยอัตโนมัติ ลดเวลาพิมพ์คำสั่งยาว ๆ และลดโอกาสผิดพลาด

**Use Cases:**

| สถานการณ์ | Slash Command | คำอธิบาย |
|----------|--------------|----------|
| **เขียนโค้ดเสร็จ อยากคอมมิท** | `/commit` | Claude วิเคราะห์ Diff, เขียน Commit Message ที่สื่อความหมาย, Stage ไฟล์ที่ถูกต้อง แล้ว Commit ให้ — ไม่ต้องคิด Message เอง |
| **อยากส่ง PR ให้ทีมรีวิว** | `/pr` | Claude สรุปการเปลี่ยนแปลงทั้งหมด, เขียน Title/Description, Push แล้วสร้าง PR ให้ — ได้ PR ที่อธิบายงานชัดเจน |
| **ต้องการให้ AI รีวิวโค้ดก่อน** | `/review` | Claude อ่านโค้ดที่เปลี่ยนแปลง ตรวจหา Bug, Security Issue, Code Smell แล้วให้คำแนะนำ |
| **โค้ดซับซ้อน ต้องวางแผนก่อน** | `/plan` | Claude วิเคราะห์โจทย์ เสนอแผนทีละขั้นตอนก่อนลงมือทำ ลดความเสี่ยงแก้ผิดทาง |
| **ปัญหายากมาก ต้องคิดลึก** | `/think` | Claude ใช้ Extended Thinking คิดวิเคราะห์อย่างละเอียดก่อนตอบ เหมาะกับ Bug ที่ซับซ้อน |
| **บทสนทนายาวมาก Context ใกล้เต็ม** | `/compact` | สรุปบทสนทนาให้สั้นลง เปิดพื้นที่ให้ทำงานต่อได้ |
| **อยากถามนอกเรื่องเร็ว ๆ** | `/btw ชื่อ Config File คืออะไร?` | ถามคำถามเล็ก ๆ โดยไม่ให้ Claude ใช้เครื่องมือ ไม่เปลือง Context |
| **ต้องการตรวจสอบระบบซ้ำ ๆ** | `/loop 5m "ตรวจ Error Log"` | Claude ทำงานซ้ำทุก 5 นาที เหมาะกับงาน Monitor |
| **แก้ไฟล์เยอะมาก อยากทำพร้อมกัน** | `/batch` | Claude แบ่งงานเป็นชิ้น ๆ รันแบบ Parallel เร็วกว่าทำทีละไฟล์มาก |
| **เข้าโปรเจกต์ใหม่ ไม่มี CLAUDE.md** | `/init` | Claude วิเคราะห์โปรเจกต์แล้วสร้าง CLAUDE.md ที่มีคำสั่ง Build, Naming Convention, Architecture |

กด `/` ในเซสชันเพื่อดูคำสั่งทั้งหมด

### การจัดการเซสชัน

| คำสั่ง | อธิบาย |
|-------|--------|
| `/help` | แสดงวิธีใช้งาน |
| `/clear` | เริ่มเซสชันใหม่ (ล้าง Context) |
| `/compact` | สรุปบทสนทนาเพื่อประหยัด Context |
| `/memory` | ดูและแก้ไข CLAUDE.md และ Auto Memory |
| `/config` | เปิดหน้าตั้งค่า |
| `/doctor` | วินิจฉัยปัญหาเบื้องต้น |
| `/keybindings` | ตั้งค่าคีย์ลัด |
| `/rename` | เปลี่ยนชื่อเซสชัน |
| `/resume` | เลือกเซสชันเก่ามาต่อ |

### โค้ดและ Git

| คำสั่ง | อธิบาย |
|-------|--------|
| `/commit` | Stage และ Commit การเปลี่ยนแปลง |
| `/pr` | สร้าง Pull Request |
| `/review` | รีวิวโค้ด |
| `/code-review` | review diff หา bug/คุณภาพ ตาม effort level; `--fix` แก้ให้เลย, `--comment` โพสต์คอมเมนต์ inline ใน PR (เปลี่ยนชื่อจาก `/simplify` เดิม) |
| `/simplify` | กลับมาใหม่เป็น review เน้น **cleanup อย่างเดียว** (reuse/simplify/efficiency) แล้วแก้ให้ |
| `/init` | สร้าง CLAUDE.md จากการวิเคราะห์โปรเจกต์ |

### เวิร์คโฟลว์และการควบคุม

| คำสั่ง | อธิบาย |
|-------|--------|
| `/plan` | เข้าสู่โหมดวางแผน |
| `/think` | เปิด Extended Thinking (คิดลึกขึ้น) |
| `/debug` | เปิด Debug Logging |
| `/btw` | ถามคำถามข้างเคียงโดยไม่กระทบ Context |
| `/loop 5m "คำสั่ง"` | ทำซ้ำคำสั่งทุก ๆ เวลาที่กำหนด |
| `/batch` | ทำงานขนาดใหญ่แบบ Parallel |
| `/schedule` | สร้างงานตั้งเวลา |
| `/goal` | ตั้งเงื่อนไข "งานเสร็จเมื่อไหร่" ให้ Claude ทำต่อข้ามหลาย turn |
| `/reload-skills` | re-scan โฟลเดอร์ skills โดยไม่ต้องรีสตาร์ท |

### ส่วนขยายและการตั้งค่า

| คำสั่ง | อธิบาย |
|-------|--------|
| `/agents` | ~~ดูและตั้งค่า Subagents~~ **ถูกถอดใน v2.1.198** — สั่ง Claude สร้าง/จัดการ subagent เป็นภาษาคน หรือแก้ `.claude/agents/` ตรง ๆ |
| `/mcp` | ตั้งค่า MCP Servers |
| `/permissions` | ดูและจัดการสิทธิ์เครื่องมือ |
| `/plugins` | เรียกดูและจัดการ Plugins |
| `/claude-api` | ช่วยสร้างแอปด้วย Claude API |
| `/scroll-speed` | ปรับความเร็ว scroll พร้อม preview สด |
| `/chrome` | เลือก browser สำหรับ "Claude in Chrome" |
| `/usage-credits` | ดูเครดิตการใช้งาน (เปลี่ยนชื่อจาก `/extra-usage`; ชื่อเดิมยังใช้ได้). `/usage` แสดง breakdown รายหมวด (skills, subagents, plugins, MCP) |

> หมายเหตุ: ป้าย slider `/effort` ตอนนี้เป็น **"Faster" / "Smarter"** (เดิมคือ Speed/Intelligence)

### 🆕 ใหม่ใน v2.1.191

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `/rewind` | กู้ conversation กลับไปยังจุด **ก่อนรัน `/clear`** |
| `/cd <dir>` | ย้าย working directory ของ session โดยไม่ทำลาย prompt cache |
| `/config key=value` | ตั้งค่าใด ๆ จาก prompt (เช่น `/config thinking=false`); `/config --help` ดูคีย์ย่อทั้งหมด ใช้ได้ทั้ง interactive, `-p`, Remote Control |
| `/plugin list` | list plugin ที่ติดตั้ง (filter `--enabled` / `--disabled`) |

หมายเหตุ: `!<cmd>` ตอนนี้ทำให้ Claude **ตอบ output ของคำสั่งให้อัตโนมัติ**; ตั้ง `respondToBashCommands: false` ใน `settings.json` เพื่อคงพฤติกรรมเดิม (เก็บเป็น context เฉย ๆ)

- **Bash mode (`!`)** มี autocomplete ของ path ไฟล์แบบ live แล้ว *(v2.1.193)*

### 🆕 ใหม่ใน v2.1.198

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `/dataviz` | แนวทางออกแบบ chart/dashboard พร้อมตัวเช็ก color palette ที่รันได้จริง |

### 🆕 ใหม่ใน v2.1.201
- **เรียก skill ซ้อนกันได้** — `/skill-a /skill-b ทำ XYZ` โหลด skill ที่นำหน้า *ทุกตัว* (สูงสุด 5) ไม่ใช่แค่ตัวแรก *(v2.1.199)*

### 🆕 ใหม่ใน v2.1.205
- **`/doctor` กลายเป็น checkup เต็มรูปแบบ** — วินิจฉัย *และซ่อม* ปัญหา setup ให้เลย; มี alias `/checkup`
- `/review <pr>` กลับเป็น review เร็วรอบเดียว — งานละเอียดใช้ `/code-review <level> <pr#>` เลือก effort ได้ *(v2.1.202)*

### 🆕 ใหม่ใน v2.1.207
- `/cd` มี suggestion ของ path ให้เลือกขณะพิมพ์แล้ว แบบเดียวกับ `/add-dir` *(v2.1.206)*
- `/doctor` เพิ่มเช็กที่เสนอ "ตัดทอน" ไฟล์ `CLAUDE.md` ใน repo โดยตัดส่วนที่ Claude อ่านได้จากโค้ดเองอยู่แล้ว *(v2.1.206)*

### 🆕 ใหม่ใน v2.1.211
- `/usage-credits` จะถามยืนยันก่อนส่งคำขอไปยัง admin ขององค์กร

### 🆕 ใหม่ใน v2.1.212
- `/fork` เปลี่ยนพฤติกรรม — คัดลอก conversation ไปเป็น **background session ใหม่** (มีแถวของตัวเองใน `claude agents`) โดยเราทำงานใน session เดิมต่อได้; แบบเดิมที่เปิด subagent ใน session ย้ายไปเป็นคำสั่งใหม่ **`/subtask`**
- พิมพ์ `/resume` ใน agent view จะเปิด picker ให้เลือก session เก่า (รวมที่ถูกลบออกจาก list แล้ว) แล้ว resume ตัวที่เลือกเป็น background session
- `/btw` เปล่า ๆ เปิด panel คำถามข้างเคียงของ exchange ล่าสุดขึ้นมาอีกครั้ง ไว้ไล่ดูคำตอบก่อนหน้าได้

### 🆕 ใหม่ใน v2.1.215
- **`/verify` กับ `/code-review` ต้องสั่งเองแล้ว** — Claude จะไม่รัน skill สองตัวนี้เองอีกต่อไป อยากใช้เมื่อไหร่ให้พิมพ์ `/verify` หรือ `/code-review` เอง

### 🆕 ใหม่ใน v2.1.218
- **`/code-review` รันเป็น background subagent แล้ว** — งานรีวิวไม่กินพื้นที่ conversation ของเราอีกต่อไป และ slash command ที่ stack ต่อกันยังคงเป็นเป้าหมายของการรีวิวเหมือนเดิม
- **`/deep-research` ต้องสั่งเองแล้ว** — เริ่มทำงานเฉพาะตอนเราเรียกใช้เอง Claude จะไม่เปิดเองอีกต่อไป

### 🆕 ใหม่ใน v2.1.221
- **`/status` บอกชนิดของ session แล้ว** — `interactive` หรือถ้าเป็น background job ก็บอกว่า `attached` หรือ `unattended`
- **`/fork` สร้าง worktree ของตัวเอง** — session ที่ fork ออกมาทำงานใน worktree ใหม่ ไม่ใช้ checkout เดิมของ session ต้นทางอีกต่อไป
- **`/plugin install` ลองใหม่เมื่อ catalog เก่า** — จะรีเฟรช catalog ของ marketplace แล้วลองอีกครั้งก่อนแจ้งว่าหา plugin ไม่เจอ; plugin ที่ติดตั้งผ่าน `/plugin` ยังเริ่มทำงานทันทีถ้าปลอดภัย ไม่ต้องสั่ง `/reload-plugins` ทุกครั้งแล้ว

---

---

## Navigation

- ⬅️ Previous: [[02-cli-commands]]
- ➡️ Next: [[04-keyboard-shortcuts]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/03-slash-commands]]
