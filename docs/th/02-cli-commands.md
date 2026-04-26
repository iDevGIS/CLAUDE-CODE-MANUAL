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
>
> ลองนึกภาพว่า `claude` คือ "รถยนต์" ส่วน Flags คือ "ปุ่มต่างๆ บนคอนโซล" — ปุ่มไฟ, ปุ่มแอร์, ปุ่มล็อกรถ ฯลฯ ถ้ารู้จักทุกปุ่ม จะใช้รถได้คุ้มค่ามากขึ้น

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

---

### คำสั่งเปิดเซสชัน

#### `claude` — เปิดเซสชันแบบ Interactive (พื้นฐานสุด)

**ทำอะไร:** เปิดหน้าต่างคุยกับ Claude แบบ Real-time พิมพ์คำถาม → Claude ตอบ → พิมพ์ต่อ → Claude ตอบต่อ ไปเรื่อยๆ จนกด `Ctrl+D` หรือพิมพ์ `/exit`

**ใช้เมื่อ:** อยากนั่งคุยจริงจัง เช่น debug, refactor, สร้างฟีเจอร์ใหญ่ ที่ต้องโต้ตอบหลายรอบ

**ตัวอย่าง:**
```bash
$ claude
╭─────────────────────────────────────────╮
│ Welcome to Claude Code v2.1.114         │
│ Working directory: ~/my-project         │
╰─────────────────────────────────────────╯
> ช่วยอ่านไฟล์ src/index.ts ให้หน่อย
```

#### `claude "คำถาม"` — เปิดพร้อมคำถามแรก

**ทำอะไร:** เหมือน `claude` ปกติ แต่ไม่ต้องพิมพ์คำถามแรก — ส่งให้ทันทีตอนเปิด

**ใช้เมื่อ:** มีคำถามอยู่แล้วในใจ จะได้ไม่ต้องเปิดมานั่งพิมพ์อีก

**ตัวอย่าง:**
```bash
claude "อธิบายโครงสร้างโปรเจกต์นี้ให้ฟัง"
```

#### `claude -p "คำถาม"` — โหมด Non-interactive (Print mode)

**ทำอะไร:** ถามครั้งเดียว → Claude ตอบ → จบ ไม่เปิดเซสชันต่อ พิมพ์ผลลัพธ์ลง stdout เลย

**ใช้เมื่อ:** อยากใช้ใน script, pipe, หรือ automation — เพราะมันไม่รอ input ต่อ

**ตัวอย่าง:**
```bash
$ claude -p "สรุปไฟล์ README.md ใน 2 บรรทัด"
README นี้อธิบายวิธีติดตั้งและใช้งาน Claude Code ฉบับภาษาไทย
ครอบคลุมตั้งแต่ติดตั้งจนถึง CI/CD integration ครบทุกหัวข้อ
$
```

> 💡 **เคล็ดลับ:** `-p` ย่อมาจาก "print" — จำง่ายๆ ว่า "พิมพ์แล้วจบ"

#### `cat file | claude -p "คำถาม"` — ส่งข้อมูลจาก Pipe

**ทำอะไร:** เอา output จากคำสั่งอื่น (เช่น `cat`, `git log`, `curl`) มาเป็น input ให้ Claude วิเคราะห์ต่อ

**ใช้เมื่อ:** อยากให้ Claude ทำงานกับข้อมูลจากไฟล์/คำสั่งอื่นโดยไม่ต้อง copy-paste

**ตัวอย่าง:**
```bash
# วิเคราะห์ error log
cat /var/log/app.log | claude -p "หา error pattern หลัก ๆ ให้หน่อย"

# สรุป commit log
git log --oneline -20 | claude -p "สรุปว่าทำอะไรไปบ้างใน 20 commit ล่าสุด"

# วิเคราะห์ JSON
curl https://api.example.com/data | claude -p "หาข้อมูลที่ผิดปกติ"
```

#### `claude -c` — ต่อบทสนทนาล่าสุด (Continue)

**ทำอะไร:** กลับเข้าเซสชันสุดท้ายที่เคยคุย — Claude จะจำทุกอย่างที่คุยไว้ก่อนหน้า

**ใช้เมื่อ:** วันก่อนคุยค้างไว้ อยากกลับมาทำต่อโดยไม่ต้องเล่าใหม่

**ตัวอย่าง:**
```bash
$ claude -c
[Resumed session from 2 hours ago]
> เมื่อกี้แก้ไฟล์ไหนไปบ้าง?
```

> ⚠️ **Gotcha:** `-c` ต่อจาก **directory ปัจจุบัน** เท่านั้น — ถ้าเปลี่ยน folder จะไม่เจอเซสชันเดิม

#### `claude -r "ชื่อ"` — กลับไปเซสชันที่ระบุ (Resume)

**ทำอะไร:** เลือกเซสชันเฉพาะจาก history (จะเปิด picker ให้เลือกถ้าไม่ระบุชื่อ)

**ใช้เมื่อ:** มีหลายเซสชันค้างไว้ อยากเลือกเฉพาะอันที่ต้องการ

**ตัวอย่าง:**
```bash
claude -r              # เปิด picker
claude -r "auth-bug"   # หาเซสชันชื่อ auth-bug
```

#### `claude -w branch-name` — สร้าง Git Worktree (parallel work)

**ทำอะไร:** สร้าง git worktree ใหม่ + branch ใหม่ + เปิด Claude ในนั้น = ทำงานคู่ขนาน 2-3 features ได้

**ใช้เมื่อ:** อยากให้ Claude แก้ feature A ขณะที่ตัวเองแก้ feature B พร้อมกัน — ไม่ติด lock, ไม่ conflict

**ตัวอย่าง:**
```bash
# Terminal 1: ให้ Claude ลุย feature ใหญ่
claude -w add-payment-gateway

# Terminal 2: ตัวเองแก้ bug เล็กๆ
git checkout main
# แก้บั๊ก, commit, push
```

> 💡 **เปรียบเทียบ:** เหมือนเปิด Word 2 หน้าต่าง คนละ document — ไม่กระทบกัน

#### `claude --fork-session` — แยกเซสชันใหม่จากปัจจุบัน

**ทำอะไร:** copy state ปัจจุบัน (memory, context) ไปสร้างเซสชันใหม่ — เซสชันเก่ายังอยู่

**ใช้เมื่อ:** อยากทดลองทิศทางใหม่โดยไม่ทำลายเซสชันหลัก เช่น ลองวิธี implement A กับ B แล้วเลือกอันที่ดีกว่า

#### `claude --remote` — สร้างเซสชันบน claude.ai

**ทำอะไร:** เซสชันรันบน server ของ Anthropic (ไม่ใช่เครื่องตัวเอง) — ปิด terminal ได้ ไม่ขาด

**ใช้เมื่อ:** งานนาน เช่น migration ใหญ่, refactor หลายร้อยไฟล์ — อยากปิดเครื่องไปนอน

---

### ตัวเลือกโมเดลและ Effort

#### `--model <ชื่อ>` — เลือกโมเดล

**ทำอะไร:** บอก Claude Code ว่าจะใช้โมเดลตัวไหน

**ใช้เมื่อ:** อยากประหยัดเงิน (ใช้ Sonnet) หรือต้องการสมองใหญ่ (ใช้ Opus)

**ตัวอย่าง:**
```bash
claude --model opus              # ใช้ Opus 4.7 (ฉลาดสุด, แพง)
claude --model sonnet            # ใช้ Sonnet 4.6 (สมดุล, แนะนำ)
claude --model haiku             # ใช้ Haiku 4.5 (เร็ว, ถูก, สำหรับงานง่าย)
claude --model claude-opus-4-7   # ใช้ชื่อเต็ม (ระบุ version ตรงๆ)
```

> 💡 **เปรียบเทียบ:**
> - **Opus** = ศาสตราจารย์ — เก่งสุด แต่คิดนาน + คิดเงินแพง
> - **Sonnet** = นักวิจัย — เก่งพอใช้ ทำงานเร็ว ราคาพอควร
> - **Haiku** = นักเรียนหัวไว — ตอบเร็วมาก ราคาถูก งานง่ายๆ พอ

#### `--effort low|medium|high|max` — ระดับความพยายาม

**ทำอะไร:** บอกโมเดลว่าจะ "คิดละเอียดแค่ไหน" ก่อนตอบ — สูงกว่า = คิดนานกว่า + แพงกว่า + ถูกต้องกว่า

**ใช้เมื่อ:** งานยากต้องการ reasoning ละเอียด (ใช้ `high`/`max`) หรืองานง่ายขอเร็ว (ใช้ `low`)

**ตัวอย่าง:**
```bash
claude --model opus --effort max         # Opus + คิดสุดความสามารถ
claude --model sonnet --effort low       # Sonnet + ตอบเร็ว
```

> ⚠️ **Gotcha:** `--effort max` ใช้ได้กับ **Opus 4.6 เท่านั้น** — รุ่นอื่นจะ fall back เป็น `high`

#### `--fallback-model <ชื่อ>` — โมเดลสำรอง

**ทำอะไร:** ถ้าโมเดลหลักไม่ว่าง (overload) ให้ใช้ตัวสำรองแทน

**ใช้เมื่อ:** ต้องการให้งานไม่ขาดตอน เช่นใน CI/CD ที่รัน 24/7

**ตัวอย่าง:**
```bash
claude --model opus --fallback-model sonnet
# Opus busy → automatically use Sonnet
```

---

### ตัวเลือก Permission

#### `--permission-mode <mode>` — โหมดสิทธิ์

**ทำอะไร:** ตั้งว่า Claude จะถามก่อนรันเครื่องมือต่างๆ ระดับไหน

**ตัวเลือก:**

| โหมด | ความหมาย | ใช้เมื่อ |
|------|----------|---------|
| `default` | ถามทุกครั้งก่อนใช้ Tool | ทำงานปกติ ปลอดภัยที่สุด |
| `acceptEdits` | อนุมัติ Edit อัตโนมัติ แต่ยังถาม Bash | เชื่อใจ Claude แก้ไฟล์แล้ว |
| `plan` | Plan Mode — Claude จะวางแผนก่อน ไม่ได้ลงมือ | งานใหญ่ อยากเห็น roadmap ก่อน |
| `auto` | อนุมัติ Tool ส่วนใหญ่ ยังถามเรื่อง destructive | งานยาว อยากให้ลื่น |
| `dontAsk` | ไม่ถามเรื่อง Tool ที่ allowedTools กำหนด | ใช้คู่กับ `--allowedTools` |
| `bypassPermissions` | ข้ามทุกการขอสิทธิ์ (อันตราย!) | ใช้ใน sandbox เท่านั้น |

**ตัวอย่าง:**
```bash
claude --permission-mode plan          # ขอเห็นแผนก่อน
claude --permission-mode acceptEdits   # ลื่นไหลกว่า ยังปลอดภัย
```

#### `--enable-auto-mode` — เปิด Auto Mode

**ทำอะไร:** เปิดโหมด Auto ที่กดสลับด้วย `Shift+Tab` ในเซสชัน — ลด prompt permission ลง

**ใช้เมื่อ:** อยากเริ่มเซสชันใน Auto mode เลย ไม่ต้องกด Shift+Tab ทีหลัง

#### `--dangerously-skip-permissions` — ข้ามทุกอย่าง ⚠️

**ทำอะไร:** Claude รันคำสั่งอะไรก็ได้ — `rm -rf`, `curl | bash`, **อะไรก็ได้**

**ใช้เมื่อ:** อยู่ใน **container/VM ที่ throwaway ได้** เท่านั้น เช่น GitHub Actions, Docker

**❌ ห้ามใช้ใน:**
- เครื่องส่วนตัว
- Production server
- เครื่องที่มีไฟล์สำคัญ
- ตอน prompt ดึงข้อมูลจาก internet (เสี่ยง prompt injection!)

**ตัวอย่าง CI/CD ที่ใช้ได้:**
```yaml
# GitHub Actions (ใน VM ใช้แล้วทิ้ง)
- run: claude --dangerously-skip-permissions -p "run tests and fix failing"
```

#### `--allowedTools "Tool1,Tool2"` — อนุมัติเครื่องมือล่วงหน้า

**ทำอะไร:** บอกล่วงหน้าว่า tool ไหนใช้ได้โดยไม่ต้องถาม

**ใช้เมื่อ:** อยากให้ Claude รัน tool บางตัวฟรี (ไม่ถามทุกครั้ง) แต่ยังกัน tool อันตราย

**ตัวอย่าง:**
```bash
# อนุญาต Read, Edit, แต่ยังถามก่อน Bash
claude --allowedTools "Read,Edit,Grep,Glob"

# อนุญาต Bash เฉพาะคำสั่ง git/npm
claude --allowedTools "Bash(git *),Bash(npm *)"
```

#### `--disallowedTools "Tool1,Tool2"` — บล็อกเครื่องมือ

**ทำอะไร:** ห้าม Claude ใช้ tool ที่ระบุ — ไม่ว่าจะมี permission อะไรก็ตาม

**ใช้เมื่อ:** อยากกัน tool บางตัว เช่น ไม่ให้ลบไฟล์, ไม่ให้ commit

**ตัวอย่าง:**
```bash
claude --disallowedTools "Bash(rm *),Bash(git push *)"
```

---

### ตัวเลือก System Prompt

#### `--system-prompt "ข้อความ"` — แทนที่ทั้งหมด

**ทำอะไร:** เขียน System Prompt ใหม่ทับของเดิม — Claude จะลืมความเป็น "Claude Code" หมด

**ใช้เมื่อ:** อยากใช้ Claude Code เป็น base แต่เปลี่ยน persona/role ทั้งดุ้น (ขั้นสูงมาก)

**ตัวอย่าง:**
```bash
claude --system-prompt "You are a security auditor. Only point out vulnerabilities."
```

> ⚠️ **Gotcha:** ระวัง! ทำให้ Claude หยุดเป็น coding assistant ปกติ — ใช้เมื่อต้องการ persona พิเศษเท่านั้น

#### `--system-prompt-file <path>` — โหลดจากไฟล์

**ทำอะไร:** เหมือน `--system-prompt` แต่อ่านจากไฟล์ — เหมาะกับ prompt ยาวๆ

**ตัวอย่าง:**
```bash
claude --system-prompt-file ./prompts/security-auditor.md
```

#### `--append-system-prompt "ข้อความ"` — เพิ่มต่อท้าย (แนะนำ!)

**ทำอะไร:** เพิ่มคำสั่งพิเศษ **ต่อท้าย** System Prompt เดิม — Claude ยังเป็น Claude Code อยู่

**ใช้เมื่อ:** อยากให้ Claude ทำตัวพิเศษเฉพาะ session นี้ โดยไม่ทับ behavior หลัก

**ตัวอย่าง:**
```bash
claude --append-system-prompt "ตอบเป็นภาษาไทยเสมอ ใช้ emoji เยอะๆ ดูเป็นมิตร"
claude --append-system-prompt "ห้ามแก้ไฟล์ในโฟลเดอร์ /legacy เด็ดขาด"
```

---

### ตัวเลือก Output

#### `--output-format text|json|stream-json` — รูปแบบผลลัพธ์

**ทำอะไร:** บอก Claude ว่าจะให้ผลลัพธ์เป็นรูปแบบไหน

**ตัวเลือก:**

| Format | ใช้เมื่อ | หน้าตา |
|--------|---------|--------|
| `text` (default) | คนอ่าน | ข้อความปกติ + UI สวยๆ |
| `json` | Script ประมวลผลต่อ | JSON ก้อนเดียวจบ |
| `stream-json` | Streaming + processing real-time | JSON หลายก้อน คั่นด้วย newline |

**ตัวอย่าง:**
```bash
# คนอ่าน
claude -p "สรุป README"

# Script อ่าน
claude -p "สรุป README" --output-format json | jq '.result'
```

#### `--json-schema <schema>` — บังคับรูปแบบ JSON

**ทำอะไร:** บังคับ Claude ตอบเป็น JSON ตาม schema ที่กำหนด — ไม่ต้องเดารูปแบบเอง

**ใช้เมื่อ:** อยากได้ output structured ที่ predictable เช่น `{name, age, email}`

**ตัวอย่าง:**
```bash
claude -p "extract user info from this email" \
  --json-schema '{"type":"object","properties":{"name":{"type":"string"},"email":{"type":"string"}}}'
# Output: {"name":"John","email":"john@example.com"}
```

#### `--input-format text|stream-json` — รูปแบบ Input

**ทำอะไร:** บอก Claude ว่า input ที่ pipe เข้ามาเป็นรูปแบบไหน

**ใช้เมื่อ:** ส่ง input ที่มี metadata มาเป็น JSON (advanced)

#### `--verbose` — แสดง Log ละเอียด

**ทำอะไร:** แสดงทุก tool call, ทุก decision ที่ Claude ทำ — ดู step-by-step

**ใช้เมื่อ:** Debug ว่าทำไม Claude ทำแบบนี้ หรือ profile ดูว่าใช้เวลา/token ตรงไหน

**ตัวอย่าง:**
```bash
claude -p "เพิ่ม test ให้ utils.ts" --verbose
# จะเห็น: Reading utils.ts... Writing utils.test.ts... etc.
```

#### `--debug <categories>` — เปิด Debug Mode

**ทำอะไร:** ส่ง log ละเอียดมากๆ ไป stderr — เฉพาะ category ที่เลือก

**ใช้เมื่อ:** รายงาน bug ให้ Anthropic หรือ debug deep issue

**ตัวอย่าง:**
```bash
claude --debug api,mcp -p "test"   # debug เฉพาะ API + MCP
```

---

### ตัวเลือกขั้นสูง

#### `--bare` — โหมดเปล่า ⭐ สำคัญมาก

**ทำอะไร:** ปิด **ทุกอย่าง** ที่เป็น customization: Hooks, Skills, Plugins, MCP, Memory (CLAUDE.md)

**ใช้เมื่อ:**
- รัน CI/CD ที่ต้องการพฤติกรรม **predictable** ไม่ขึ้นกับ config ส่วนตัว
- Reproduce bug ที่อาจเกิดจาก plugin
- Benchmark performance ของ Claude Code core เอง

**ตัวอย่าง:**
```bash
# CI/CD safe — ไม่โดน hook/plugin ส่วนตัว interfer
claude --bare -p "lint the code" --output-format json
```

> 💡 **เปรียบเทียบ:** เหมือน Chrome Incognito + ปิด extensions ทุกตัว — สะอาดเป็นค่า default

> ⚠️ **Gotcha:** `--bare` ≠ `-p` — `-p` คือ "ตอบครั้งเดียวจบ" ส่วน `--bare` คือ "ไม่โหลด customization" ใช้คู่กันได้

#### `--max-turns <n>` — จำกัดจำนวนรอบ

**ทำอะไร:** ห้าม Claude ทำงานเกิน `n` รอบ (1 รอบ = 1 ครั้งที่ Claude คิด+ใช้ tool)

**ใช้เมื่อ:** กลัว Claude ติด loop หรืองานบาน — บังคับให้จบใน N step

**ตัวอย่าง:**
```bash
claude -p "fix this bug" --max-turns 10
# Claude จะพยายามจบใน 10 turn ถ้าเกิน → stop พร้อมรายงาน
```

#### `--max-budget-usd <จำนวน>` — จำกัดงบ

**ทำอะไร:** ตัดจบเมื่อ token cost ถึงจำนวน USD ที่กำหนด

**ใช้เมื่อ:** กลัวเงินไหล โดยเฉพาะใน CI/CD หรือ batch job ใหญ่

**ตัวอย่าง:**
```bash
claude -p "refactor whole codebase" --max-budget-usd 5
# ถ้าใช้เงินถึง $5 → หยุดทันที
```

> 💡 **เคล็ดลับ:** ใช้คู่กับ `--max-turns` เพื่อกัน 2 ชั้น

#### `--config <file>` — โหลด MCP Config

**ทำอะไร:** ใช้ MCP config file พิเศษแทน default

**ใช้เมื่อ:** มี MCP servers หลายชุด สลับใช้ตามงาน

#### `--add-dir <path>` — เพิ่ม directory

**ทำอะไร:** ขยาย working directory ให้ Claude อ่าน/เขียนใน folder อื่นได้ด้วย

**ใช้เมื่อ:** ทำงานข้าม monorepo, อยากให้ Claude ดู code ของอีก project ประกอบ

**ตัวอย่าง:**
```bash
cd ~/my-app
claude --add-dir ../shared-lib --add-dir ~/docs
```

#### `--agent <name>` — ระบุ Subagent

**ทำอะไร:** เริ่มเซสชันด้วย subagent เฉพาะ (เช่น code-reviewer, security-auditor)

**ใช้เมื่อ:** อยากใช้ persona พิเศษทันที ไม่ต้อง spawn จาก main session

**ตัวอย่าง:**
```bash
claude --agent code-reviewer -p "review this PR"
```

#### `--init` — รัน Initialization Hooks

**ทำอะไร:** รัน init hooks ก่อนเริ่ม session (เช่น load environment, fetch data)

#### `--version` — แสดงเวอร์ชัน

**ตัวอย่าง:**
```bash
$ claude --version
2.1.114
```

---

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

## 🎯 ตัวอย่างจริง (พร้อม Output)

### ตัวอย่าง 1: ถามเร็ว ๆ ไม่เปิด session

```bash
$ claude -p "JavaScript กับ TypeScript ต่างกันยังไง สั้นๆ"
```

**Output:**
```
TypeScript = JavaScript + Type System
- JavaScript: dynamic typing, ตรวจ type ตอน runtime
- TypeScript: static typing, ตรวจ type ตอน compile
- TypeScript ต้อง compile เป็น JavaScript ก่อนรัน
- TypeScript จับ bug ได้เร็วกว่า แต่เขียนเยิ่นกว่า
```

---

### ตัวอย่าง 2: วิเคราะห์ git log

```bash
$ git log --oneline -10 | claude -p "สรุปว่ารอบนี้พัฒนาอะไรบ้าง"
```

**Output:**
```
สัปดาห์ที่ผ่านมาทีมโฟกัสที่:
1. แก้ bug login (3 commits) — fix session timeout, OAuth refresh
2. เพิ่ม payment integration (5 commits) — Stripe + PromptPay
3. Refactor user service (2 commits) — แยก repository pattern
```

---

### ตัวอย่าง 3: ใช้ Plan Mode ก่อนลงมือ

```bash
$ claude --permission-mode plan "ช่วย refactor ระบบ auth ให้รองรับ OAuth"
```

**Output (สรุป):**
```
[Plan Mode] ผมวางแผนไว้แบบนี้:

Step 1: แยก auth logic ออกจาก user.service.ts → auth.service.ts
Step 2: สร้าง OAuth provider interface
Step 3: implement Google + GitHub providers
Step 4: เพิ่ม middleware สำหรับ token validation
Step 5: เขียน test ครอบคลุม OAuth flow

จะลงมือเลยไหม? [Approve / Modify / Cancel]
```

---

### ตัวอย่าง 4: รัน CI/CD

```bash
# .github/workflows/ai-review.yml
- run: |
    git diff origin/main | \
    claude --bare -p "Review this diff. Output JSON: {issues: [], suggestions: []}" \
           --output-format json \
           --max-budget-usd 1 \
           --allowedTools "Read,Grep,Glob" \
           --dangerously-skip-permissions \
    > review.json
```

**Output (`review.json`):**
```json
{
  "issues": [
    {"file": "src/auth.ts:42", "severity": "high", "msg": "Missing input validation"}
  ],
  "suggestions": [
    {"file": "src/utils.ts", "msg": "Consider extracting helper function"}
  ]
}
```

---

### ตัวอย่าง 5: Batch รันหลายงาน

```bash
# วิเคราะห์ทุกไฟล์ใน src/ ทีละไฟล์
for f in src/*.ts; do
  echo "=== $f ==="
  cat "$f" | claude -p "หา code smell" --model sonnet --max-budget-usd 0.10
done
```

---

### ตัวอย่าง 6: ทำงานคู่ขนานด้วย Worktree

```bash
# Terminal 1: Claude แก้ feature ใหญ่
claude -w refactor-auth "refactor auth ทั้งหมดเป็น OAuth"

# Terminal 2: ตัวเองแก้ bug ด่วน
git checkout main
git pull
# แก้ bug, commit, push

# Terminal 3: เช็คงานของ Claude
cd ../my-project-refactor-auth
git log
```

---

### ตัวอย่าง 7: ผูก subagent + plan mode

```bash
$ claude --agent security-auditor \
         --permission-mode plan \
         --append-system-prompt "Focus on OWASP Top 10" \
         -p "audit this codebase"
```

**Output:**
```
[Security Auditor — Plan Mode]

ผมจะตรวจ:
✓ Injection vulnerabilities (SQL, NoSQL, Command)
✓ Broken authentication
✓ Sensitive data exposure
✓ XXE
✓ Broken access control
... [OWASP Top 10 ทั้งหมด]

คาดว่าจะใช้ ~50 turns และ ~$2 ดำเนินการต่อไหม?
```

---

## 🔧 Combo Patterns ใช้บ่อยในชีวิตจริง

### Pattern 1: CI/CD Code Review (ปลอดภัย + ราคาถูก)

```bash
claude --bare \
       -p "$REVIEW_PROMPT" \
       --output-format json \
       --max-budget-usd 1 \
       --max-turns 20 \
       --allowedTools "Read,Grep,Glob" \
       --dangerously-skip-permissions \
       --model sonnet
```

**ทำไม:** `--bare` กัน plugin เพี้ยน, `--max-budget-usd` กันเงินไหล, `--allowedTools` จำกัด tool ให้แค่อ่าน, `sonnet` ราคาถูก, `--dangerously-skip-permissions` ใช้ได้เพราะอยู่ใน VM ใช้แล้วทิ้ง

---

### Pattern 2: Long-running Refactor (งานใหญ่ ปลอดภัย)

```bash
claude --model opus \
       --effort high \
       --permission-mode plan \
       --max-budget-usd 20 \
       --fallback-model sonnet \
       "refactor entire payment module"
```

**ทำไม:** Opus + effort high = ฉลาดสุด, plan mode = เห็นแผนก่อน, fallback = ไม่ขาดตอน, max-budget = กันเงินบาน

---

### Pattern 3: Quick Q&A (เร็ว + ถูก)

```bash
alias ask='claude -p --model haiku --max-budget-usd 0.05'

ask "ความแตกต่างของ let, const, var"
ask "อธิบาย closure ใน 1 ประโยค"
```

**ทำไม:** Haiku = เร็ว+ถูก, max-budget นิดเดียว = ไม่เปลือง, alias = เรียกง่าย

---

### Pattern 4: Multi-project Analysis

```bash
cd ~/main-app
claude --add-dir ~/api-server \
       --add-dir ~/shared-types \
       "หา type mismatch ระหว่าง 3 projects นี้"
```

**ทำไม:** Claude เห็นทั้ง 3 repo พร้อมกัน → cross-reference type ได้

---

### Pattern 5: Structured Output for Pipeline

```bash
cat error.log | \
  claude -p "categorize errors" \
         --json-schema '{"type":"array","items":{"type":"object","properties":{"category":{"type":"string"},"count":{"type":"number"}}}}' \
         --output-format json | \
  jq 'sort_by(.count) | reverse | .[0:5]' | \
  curl -X POST https://slack.webhook -d @-
```

**ทำไม:** json-schema = output predictable, pipe กับ jq + curl = ส่งผลเข้า Slack

---

### Pattern 6: Safe Sandbox Exploration

```bash
claude --bare \
       --disallowedTools "Bash(rm *),Bash(git push *),Bash(npm publish *)" \
       --max-turns 30 \
       --append-system-prompt "Read-only exploration. Don't modify anything."
```

**ทำไม:** `--bare` = clean state, `--disallowedTools` = กันคำสั่ง destructive, prompt = ตอกย้ำ behavior

---

### Pattern 7: Headless Cron Job

```bash
# crontab: 0 */6 * * *
0 */6 * * * cd /var/myapp && \
  claude --bare -p "check logs and alert if errors > 100" \
                --max-budget-usd 0.50 \
                --output-format json \
                --allowedTools "Read,Bash(grep *)" \
                --dangerously-skip-permissions \
  | mail -s "Claude Health Report" admin@example.com
```

**ทำไม:** ทุก 6 ชม. Claude เช็ค log + ส่งเมล — ครบจบในคำสั่งเดียว

---

## ⚠️ Common Pitfalls (กับดักที่คนเริ่มใช้ติดบ่อย)

### Pitfall 1: สับสน `-p` กับ `--bare`

| | `-p` | `--bare` |
|---|------|----------|
| **ทำอะไร** | ตอบครั้งเดียวจบ ไม่เปิด session | ปิด customization (Hooks/Skills/MCP/Memory) |
| **เปิด session ต่อได้ไหม** | ❌ ไม่ได้ | ✅ ได้ (ถ้าไม่ใส่ `-p`) |
| **โหลด CLAUDE.md ไหม** | ✅ โหลด | ❌ ไม่โหลด |

**ใช้คู่กันได้:** `claude --bare -p "..."` = ตอบครั้งเดียว + ไม่โหลด customization (CI/CD ชอบมาก)

---

### Pitfall 2: ใช้ `--dangerously-skip-permissions` ในเครื่องตัวเอง 💀

❌ **ห้ามทำ:**
```bash
# บนเครื่อง MacBook ส่วนตัว
claude --dangerously-skip-permissions "fix the build"
# Claude อาจรัน rm -rf, curl | bash, อะไรก็ได้!
```

✅ **ทำได้:**
- ใน Docker container ที่ throw away ได้
- ใน GitHub Actions VM
- ใน VM ที่ snapshot ก่อนรัน

> 💡 **Rule of thumb:** ถ้าเครื่องเสียแล้วเสียดาย → **ห้ามใช้**

---

### Pitfall 3: ลืมใส่ quote รอบ prompt มี space

❌ **ผิด:**
```bash
claude -p ช่วย refactor ฟังก์ชัน calculateTotal
# Shell แตก argument → Claude เห็นแค่ "ช่วย"
```

✅ **ถูก:**
```bash
claude -p "ช่วย refactor ฟังก์ชัน calculateTotal"
```

---

### Pitfall 4: Pipe binary file เข้า Claude

❌ **ทำไม่ได้:**
```bash
cat image.png | claude -p "analyze this"
# Binary → Claude อ่านไม่ออก crash หรือผิด
```

✅ **ใช้ Read tool ใน session แทน:**
```bash
claude
> อ่านไฟล์ image.png ให้หน่อย   # Claude จะใช้ Read tool ที่รองรับ binary
```

---

### Pitfall 5: คาดหวัง `-c` ทำงานข้าม folder

❌ **ผิด:**
```bash
cd ~/project-a && claude   # คุยอะไรไป
cd ~/project-b && claude -c   # ❌ ไม่เจอ session ของ project-a!
```

✅ **ถูก:** `-c` ผูกกับ working directory เสมอ ต้อง `cd` กลับมา folder เดิม

---

### Pitfall 6: ใช้ `--model opus --effort max` กับงานง่าย

❌ **เปลือง:**
```bash
claude --model opus --effort max -p "What is 2+2?"
# จ่ายแพงสุดเพื่อตอบคำถามที่ Haiku ก็ตอบได้
```

✅ **เลือก model ตามความยาก:**
- คำถามทั่วไป → `haiku`
- coding ปกติ → `sonnet`
- task ซับซ้อน + เลือก approach → `opus`

---

### Pitfall 7: คิดว่า `--max-budget-usd` รวม cache hit

⚠️ **ระวัง:** budget นับ token ทุกตัวที่ส่ง (รวมที่อยู่ใน cache) — ไม่ใช่แค่ "cost จริง"

ถ้าใช้ caching เยอะ จริงอาจถูกกว่า budget ที่ตั้ง — ดีสำหรับเรา แต่อย่าตั้ง budget ต่ำเกินจน hard fail บ่อย

---

### Pitfall 8: `--allowedTools` กับ Bash ต้องระบุ pattern

❌ **กว้างไป (อันตราย):**
```bash
claude --allowedTools "Bash"
# Bash อะไรก็ผ่าน รวมถึง rm -rf!
```

✅ **เฉพาะเจาะจง:**
```bash
claude --allowedTools "Bash(git *),Bash(npm test),Bash(npm run *)"
# เฉพาะ git, npm test, npm run xxx เท่านั้น
```

---

### Pitfall 9: ใช้ `claude update` ใน CI/CD

❌ **อย่าทำ:**
```yaml
# CI workflow
- run: claude update   # ❌ จะติดตั้งเวอร์ชันใหม่ทุกรอบ → reproducibility พัง
```

✅ **Pin version ใน setup:**
```yaml
- run: npm install -g @anthropic-ai/claude-code@2.1.114
```

---

### Pitfall 10: คาดหวัง `--bare` ปิด **เครือข่าย** ด้วย

❌ **เข้าใจผิด:** `--bare` = ตัด internet
✅ **จริง:** `--bare` ตัด **customization local** (Hooks/Skills/MCP/Memory) เท่านั้น — ยังต่อ Anthropic API ผ่าน internet ปกติ

---

## 📌 Cheat Sheet สำหรับมือใหม่

**3 คำสั่งที่ใช้ 80% ของเวลา:**
```bash
claude                       # เริ่มทำงาน
claude -c                    # ทำต่อจากเมื่อกี้
claude -p "..."              # ถามเร็ว ๆ
```

**3 Flag ที่ควรรู้ก่อนเปิดใจให้ Claude:**
```bash
--permission-mode plan       # ขอเห็นแผนก่อน
--max-budget-usd 5           # กันเงินไหล
--model sonnet               # ประหยัด
```

**3 Flag สำหรับ CI/CD:**
```bash
--bare                       # ปิด customization
--output-format json         # script อ่านง่าย
--allowedTools "..."         # จำกัด tool
```

---

---

## Navigation

- ⬅️ Previous: [[01-installation]]
- ➡️ Next: [[03-slash-commands]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/02-cli-commands]]
