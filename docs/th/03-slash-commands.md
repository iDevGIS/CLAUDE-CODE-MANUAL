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

### 🆕 ใหม่ใน v2.1.222
- **diff อ่านจาก git blob ดิบแล้ว** — หน้า `/diff`, diff ของ workspace ใน Remote Control และ diff ของการแก้ไฟล์ใน Claude Code บนเว็บ ใช้เนื้อหา git blob ดิบ ๆ โดยไม่สนใจ diff driver และ `textconv` ที่ตั้งไว้ใน workspace
- **ถอด ultraplan ออกแล้ว** — ฟีเจอร์ ultraplan (`/ultraplan` และ "Refine with Ultraplan" ใน plan mode) ถูกถอดออกจาก Claude Code

### 🆕 ใหม่ใน v2.1.223
- **`/review` กลายเป็น alias ของ `/code-review`** — เหลือคำสั่งเดียวที่รีวิว diff ปัจจุบันหรือรีวิว PR (`/code-review <level> <pr#>`); อยากได้รีวิวลึกบน cloud ใช้ `/code-review ultra`
- **`/code-review` จำ effort level ล่าสุด** — เรียกเปล่า ๆ จะใช้ level ที่พิมพ์ไว้ครั้งก่อน ถ้าจะเปลี่ยนก็พิมพ์ level ไปด้วย เช่น `/code-review high`

### 🆕 ใหม่ใน v2.1.229
- **`/commit-push-pr` ไม่ auto-approve คำสั่งที่มี flag อันตรายแล้ว** — คำสั่ง git/gh ที่ติด flag อย่าง `--force`, `--amend` หรือ `--no-verify` จะขึ้น permission prompt ตามปกติ แทนที่จะถูกอนุมัติให้อัตโนมัติ
- **`/login` เตือนเรื่อง token override ซ้ำ** — หลัง login สำเร็จ ระบบจะเตือนอีกครั้งว่า `CLAUDE_CODE_OAUTH_TOKEN` จะ override credential ที่เพิ่งสร้างไป

### 🆕 ใหม่ใน v2.1.232
- **Fable 5 กลับมาเป็นตัวเลือกใน `/advisor`** — องค์กรที่มีสิทธิ์ใช้ Fable เลือก Fable 5 เป็น advisor ได้อีกครั้ง โดยตั้งค่ายินยอมเรื่อง usage credit ผ่าน `/model fable`
- **`/feedback` และ `/bug` เปิดทันที** — เรียกระหว่างที่ Claude กำลังตอบอยู่ก็เปิดให้เลย ไม่ต้องรอ turn จบก่อนแล้ว
- **`/plugin install plugin@marketplace` refresh marketplace ให้ก่อน** — plugin ที่เพิ่งเผยแพร่ติดตั้งได้เลย ไม่ต้องสั่งอัปเดต marketplace เอง
- **`/config` มีแถวใหม่ 2 แถว** — "Dialog expiry" และ "Messages from your other sessions" (ตั้งรับ / กักไว้ / ปฏิเสธ ข้อความข้าม session ที่ส่งเข้ามา) ดูรายละเอียดที่ [[06-configuration]]

### 🆕 ใหม่ใน v2.1.234
- **`/permissions` เปิดระหว่าง Claude ทำงานได้แล้ว** — กฎที่แก้มีผลกับ turn ที่กำลังรันอยู่เลย ดูที่ [[05-permissions]]
- **dialog อื่น ๆ เปิดกลาง turn ได้เพิ่ม** — `/add-dir <path>` ใช้ระหว่าง Claude ทำงานได้แล้ว และ dialog ของ `/add-dir`, `/autocompact`, `/theme`, `/help`, `/config`, `/advisor` เปิดกลาง turn ได้ในโหมด fullscreen TUI
- **`/goal` เคลียร์ตัวเองเมื่อเจอ error ที่กู้ไม่ได้** — ถ้า turn ตายเพราะสิ่งที่แก้ไม่ได้ (auth ถูกเพิกถอน, credit หมด, context ล้น) goal จะถูกเคลียร์พร้อมแจ้งเตือน แทนที่จะค้างเป็น goal ที่ยัง armed อยู่
- **`/goal` ตามงาน background ที่รอนาน** — ถ้างาน background ทำให้ goal รออยู่เกิน 30 นาที Claude จะเข้าไปเช็กงานนั้นแทนการรอไปเรื่อย ๆ; ตั้ง `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` เพื่อปิด ดูที่ [[23-environment-variables]]
- **`/config` เพิ่ม "Continue automatically at usage limit" และถอด "Default teammate model"** — ดูที่ [[06-configuration]]
- **`/tui` ไม่ทำกฎจำกัด tool ตอน launch หายแล้ว** — เดิม restart แล้วกฎ `--allowed-tools` / `--disallowed-tools` หลุด ตอนนี้ถ้า session มีข้อจำกัดที่ restart แล้วพกไปด้วยไม่ได้ มันจะไม่ยอมสลับ พร้อมบอกเหตุผล

### 🆕 ใหม่ใน v2.1.236
- **พิมพ์ชื่อ slash command ผิดจะถูกแจ้ง ไม่ใช่เดาให้** — กด Enter บนคำสั่งที่สะกดผิดหรือคำสั่งที่ session นี้ใช้ไม่ได้ ระบบจะบอกตรง ๆ แทนที่จะรันคำสั่งที่ใกล้เคียงที่สุดแบบ fuzzy match ให้ · ส่วนการพิมพ์แบบย่อ (prefix) และ alias ยังรันได้เหมือนเดิม
- **`/goal` เช็กงานเองระหว่างจอดรอ** — session ที่ idle และมี goal ค้างรองาน background ที่รันยาว จะเข้าไปเช็กงานให้อัตโนมัติเมื่อครบ 30 นาที แล้ว 1 ชั่วโมง แล้ว 2 ชั่วโมง แทนที่จะรอจนกว่าเราจะกลับมา ดูที่ [[23-environment-variables]]
- **`/usage` แสดงยอดใช้ usage credits ของ Team และ Enterprise** — แถวยอดใช้จ่ายโผล่ให้สมาชิกแพลน Team และ Enterprise ด้วยแล้ว และแสดงแถวเพดานที่ 0% ตั้งแต่ยังไม่มีการใช้จ่าย

### 🆕 ใหม่ใน v2.1.239
- **`/claude-api upgrade`** — migrate โปรเจกต์ Python จาก `anthropic` SDK 0.x ไป 1.x ให้ พร้อมอัปเดต Python reference ของ skill เป็น 1.x แล้ว (timeout ใช้ `anthropic.Timeout` ไม่ใช่ `httpx.Timeout`)
- **`/goal` เว้นช่วงการเช็กงานให้ห่างขึ้น** — การเช็กงาน background ที่รันยาวซ้ำ ๆ จะเว้นช่วง 30 นาที แล้ว 1 ชั่วโมง แล้วทุก 2 ชั่วโมง แทนที่จะถามซ้ำทุก 30 นาที
- **`/goal` รอดข้ามหน้า resume** — resume session จากหน้าเลือกของ `claude --resume` แล้ว goal ที่ active อยู่จะกลับมาทำงานต่อด้วย

### 🆕 ใหม่ใน v2.1.243
- **`/usage` มี breakdown ของ Loops** — บอกจำนวนรอบต่อ loop, token รวม, token ต่อรอบ และรอบล่าสุด ทำให้จับ task `/loop` ที่หลุดคุมหรือกินเปลืองผิดปกติได้ง่าย ดูที่ [[31-cost-management]]
- **`/login` เข้าด้วยบัญชี Console ได้โดยไม่ต้องสร้าง API key** — เส้นทาง Anthropic Console เพิ่มตัวเลือก "Sign in with your Console account" (แนะนำ) คู่กับการสร้าง API key องค์กรที่ไม่อนุญาตให้ใช้ API key ก็ sign in ได้แล้ว
- **`/status` บอกมากขึ้น** — เพิ่มบรรทัด `Skipped sources` แสดง managed settings source ที่มีอยู่แต่ไม่ถูกใช้เพราะมี source ลำดับสูงกว่า active อยู่ และเพิ่มบรรทัดบอกว่าเชื่อม GitHub สำหรับ Claude Code on the web แล้วหรือยัง (Pro/Max) พร้อมชี้ไป `/web-setup` ถ้ายังไม่เชื่อม
- **`/model`, `/fast` และ `/effort` มีผลทันทีทุกที่** — บน Bedrock, Vertex, Foundry และตอนที่ปิด telemetry ก็รันทันทีแล้ว แทนที่จะเข้าคิวรอจนจบ turn

### 🆕 ใหม่ใน v2.1.246
- **`/cd` ใช้ของใน directory ใหม่ทันที** — project settings, hooks, `.mcp.json` servers (ผ่าน prompt ขออนุมัติตามปกติ), skills และ agents มีผลทันทีหลังย้าย ไม่ต้องรอ `--resume` แล้ว
- **Claude เริ่ม `/code-review` เองได้ทุกที่** — รวมถึงบน Bedrock, Vertex AI, Foundry, ผ่าน Claude apps gateway และตอนที่ปิด telemetry หรือ traffic ที่ไม่จำเป็น
- **`/goal` จำกัดจำนวน check-in** — session ที่ idle จะเริ่ม check-in งาน background ที่รันยาวได้ไม่เกิน 3 ครั้งต่อ goal ส่งข้อความถัดไปเมื่อไหร่จะปลดล็อกให้อีก 3 ครั้ง

### 🆕 ใหม่ใน v2.1.247
- **Claude ร่างรายงาน feedback ให้ได้** — เวลามีอะไรพังใน session Claude ใช้เครื่องมือใหม่ `SendFeedback` ร่างรายงาน feedback ไว้ให้เราตรวจแล้วส่งเองจาก `/feedback` ได้ ปิดได้ด้วย setting `feedbackDrafts` (ดู [[06-configuration]])
- **`/claude-api cost-optimize`** — วิเคราะห์ค่าใช้จ่าย Claude API ของโปรเจกต์ที่มีอยู่ แล้วไล่ปรับตัวช่วยลด cost (caching, token hygiene, batch, effort, การเลือกโมเดล) ทีละอย่างแบบวัดผลได้ · skill `/claude-api` ยังเพิ่มเนื้อหา Admin API ด้วย (สมาชิกองค์กร, invite, workspace, API key, rate limit report, workload identity federation, CMEK)

### 🆕 ใหม่ใน v2.1.248
- **`/usage-credits`** — สำหรับองค์กร Enterprise ที่จ่ายผ่าน AWS Marketplace, Enterprise แบบ self-serve และ Enterprise trial — สมาชิกใช้ขอเพิ่ม usage limit จาก admin ได้
- **`/loop` โหมด self-paced ใช้ได้ทุกที่แล้ว** — dynamic mode แบบกำหนดจังหวะเองและโหมด autonomous แบบไม่ใส่ prompt ใช้ได้บน Bedrock, Vertex และ Foundry ด้วยแล้ว
- **`/doctor` และ `/status` อธิบายเรื่อง server-managed settings** — มีคำเตือนตอนเปิดโปรแกรมเมื่อ settings โหลดไม่สำเร็จ และมีบรรทัดอธิบายสาเหตุที่โหลดพังหรือทำไมไม่ได้ fetch (Bedrock/Vertex/third-party provider, `ANTHROPIC_BASE_URL` แบบ custom)

### 🆕 ใหม่ใน v2.1.251
- **`/usage` มีแถบ Spend limit** — สำหรับ developer ที่ใช้งานผ่าน Claude apps gateway ที่ตั้ง spend limit ไว้ · status line script ได้ field `rate_limits.spend_limit` เพิ่มมาคู่กัน
- **`/cost` แสดงสถิติ prompt-cache ราย session** — hit ratio, จำนวน miss, token ที่ re-cache และสถานะ warm/cold พร้อม object `prompt_cache` สำหรับ status line script ดู [[31-cost-management]]
- **`/effort` จำค่า default แยกตามโมเดล** — สลับโมเดลไปมาแล้วแต่ละโมเดลเก็บ effort level ของตัวเองไว้
- **`/radio` ใช้ได้ทุกที่แล้ว** — บน Bedrock, Vertex AI, Foundry และ Claude Platform on AWS รวมถึงตอนปิด telemetry

### 🆕 ใหม่ใน v2.1.257
- **`s` ใน `/effort`** — เปลี่ยน effort level เฉพาะ session ปัจจุบัน แบบเดียวกับ `/model`
- **`/btw` เปลี่ยนปุ่มไล่ดูประวัติ** — ไล่ดูคำถามข้างเคียงล่าสุดด้วย `Shift+←`/`Shift+→` (หรือ `[`/`]`) แล้วก้าวกลับมาที่คำตอบสด — `←`/`→` เปล่า ๆ ไม่ใช้ไล่ประวัติแล้ว

---

---

## Navigation

- ⬅️ Previous: [[02-cli-commands]]
- ➡️ Next: [[04-keyboard-shortcuts]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/03-slash-commands]]
