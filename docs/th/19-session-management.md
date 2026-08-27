---
title: "Session Management"
section: 19
lang: th
tags:
  - claude-code
  - sessions
  - workflow
aliases:
  - "Session Management"
related:
  - "[[14-context-management]]"
  - "[[20-scheduled-tasks]]"
---

# Session Management

### ประโยชน์และ Use Cases

> **ทำไมต้องจัดการ Session?**
>
> Session Management ทำให้คุณ **กลับมาทำงานต่อได้ทันที** เหมือนเปิดแท็บเดิมใน Browser — Claude จำทุกอย่างที่คุยกัน ไม่ต้องอธิบายใหม่ ย้อนกลับได้ถ้าผิดพลาด

**Use Cases:**

| Use Case | วิธีใช้ | คำอธิบาย |
|----------|--------|----------|
| **ปิดคอมแล้วกลับมาทำงานต่อ** | `claude -c` | Claude จำบริบททั้งหมด ทำงานต่อได้ทันที ไม่ต้องอธิบายใหม่ |
| **มีหลายงาน อยากสลับไปมา** | `/resume` → เลือก Session | กลับไป Session ไหนก็ได้ แต่ละงานมี Context แยก |
| **ตั้งชื่อ Session ให้จำง่าย** | `/rename auth-refactor` | หา Session ได้ง่ายเมื่อมีหลายงาน |
| **Claude แก้โค้ดผิด อยากย้อนกลับ** | `Esc + Esc` → Restore | ย้อนทั้งโค้ดและบทสนทนา หรือเลือกย้อนอย่างใดอย่างหนึ่ง |
| **อยากลองวิธีใหม่โดยไม่เสีย Session เดิม** | `claude --fork-session` | แยก Branch ออกจาก Session ปัจจุบัน ถ้าไม่ดีก็กลับไป Session เดิมได้ |
| **ส่ง Session ให้เพื่อนร่วมทีมดู** | `claude --remote` | สร้าง Session บน Cloud เปิดดูจาก Browser ได้ |

### Rewind (ย้อนกลับ)

กด `Esc + Esc` หรือใช้ `/rewind`:

| ตัวเลือก | อธิบาย |
|---------|--------|
| Restore code and conversation | ย้อนทั้งโค้ดและบทสนทนา |
| Restore conversation | ย้อนบทสนทนา เก็บโค้ดปัจจุบัน |
| Restore code | ย้อนโค้ด เก็บบทสนทนาปัจจุบัน |
| Summarize from here | สรุปบทสนทนาจากจุดนี้ |

### Resume Session (กลับมาต่อ)

```bash
claude --continue                    # เซสชันล่าสุด
claude --resume auth-refactor        # ตามชื่อ
claude --resume <session-id>         # ตาม ID
claude --fork-session                # แยก Branch ใหม่
```

### ดูรายการเซสชัน

```
/resume
```

แสดง Interactive Picker ให้เลือกเซสชัน

### ตำแหน่งเก็บไฟล์เซสชัน

```
~/.claude/projects/<project>/sessions/<session-id>.jsonl
```

### Background Sessions & Agent View

**Background sessions** ให้งานทำต่อแบบแยกจาก foreground: เริ่มด้วย `claude --bg` หรือดันงานปัจจุบันไปเบื้องหลังด้วย `/bg` (หรือ `Ctrl+B`). session ที่ pin ไว้จะอยู่ต่อ รีสตาร์ทเอง และสละทรัพยากรอย่างนุ่มนวลเมื่อ memory ตึง; เรียกกลับด้วย `/resume` (มองหา marker `bg`). **Agent view** (`claude agents`) เป็นตัวจัดการหลาย session พร้อมกัน — `claude agents --json` สำหรับสคริปต์

### 🆕 ใหม่ใน v2.1.191

- `claude agents --json` รองรับ `--all` (รวม session ที่เสร็จแล้ว) และเพิ่ม field `id`, `state`, `waitingFor` (บอกว่า session ที่ค้างกำลังรออะไร เช่น permission prompt)
- `--agent <name>` เลือก agent ที่ session ใช้รัน

### 🆕 ใหม่ใน v2.1.198

- **Background agent ปิดงานเองจบ** — งานโค้ดใน worktree จะ commit + push + เปิด **draft PR** ให้อัตโนมัติ แทนที่จะหยุดรอถาม
- background session ที่รอ input หรือเสร็จแล้ว จะยิง hook `Notification` (`agent_needs_input` / `agent_completed`)

### 🆕 ใหม่ใน v2.1.214

- **tool `EndConversation`** — Claude จบ session เองได้เมื่อเจอผู้ใช้ที่ abusive รุนแรงหรือพยายาม jailbreak เหมือนที่ทำบน claude.ai มาตั้งแต่ปี 2025

### 🆕 ใหม่ใน v2.1.221

- **`/fork` ได้ worktree ของตัวเอง** — session ที่ fork ออกมาไม่ทำงานใน checkout ของ session ต้นทางอีกต่อไป
- **`/status` บอกชนิดของ session** — `interactive` หรือถ้าเป็น background job ก็บอกว่า `attached` หรือ `unattended`
- **background session ปิดงานต่างจากเดิม** — จะ commit + push เพื่อรักษางานไว้, เปิด **draft PR เฉพาะเมื่องานนั้นควรมี**, ทำตามคำสั่งเรื่อง git ใน `CLAUDE.md` ของเรา และจบด้วยการรายงานเสมอว่างานไปอยู่ที่ไหน (ปรับจากพฤติกรรม v2.1.198 ด้านบน)
- **`CLAUDE_CODE_RESUME_INTERRUPTED_TURN=0` มีผลจริงแล้ว** — ค่าที่เป็น falsy ปิด auto-resume ของ turn ที่ถูกขัดจังหวะได้จริง
- **เปลี่ยนชื่อ session ซิงก์ทุกทาง** — เปลี่ยนชื่อจาก Claude Code Desktop หรือ claude.ai แล้วชื่อ session ฝั่ง CLI อัปเดตตามด้วย

### 🆕 ใหม่ใน v2.1.232

- **พิมพ์ `@` เพื่อ mention session อื่น** — พิมพ์ `@` ในช่อง prompt แล้วเรียกชื่อ session อื่นของ Claude ได้เลย จากนั้น Claude จะใช้ `SendMessage` ทักไปหา session นั้นให้ตรง ๆ
- **`SendMessage` รับชื่อเปล่า ๆ ได้** — ถ้าชื่อที่พิมพ์ตรงกับ session ที่ยังรันอยู่เพียงตัวเดียว ระบบจะส่งให้เลย ไม่ต้องให้เรายืนยันด้วย ref ก่อนอีกแล้ว
- **ชื่อ session บนเครื่องเดียวกันไม่ซ้ำกัน** — ถ้าเริ่มหรือเปลี่ยนชื่อ session แบบ interactive ไปชนกับ session อื่นที่ยังรันอยู่ ระบบจะเติมชื่อให้เป็นแบบ `name-word-word` พร้อมแจ้งให้เราทราบ
- **ตั้งค่าข้อความข้าม session ที่ส่งเข้ามาได้จาก `/config`** — แถวใหม่ "Messages from your other sessions" เลือกได้ว่าจะรับ กักไว้ หรือปฏิเสธ ดูรายละเอียดที่ [[06-configuration]]

### 🆕 ใหม่ใน v2.1.236

- **`notify_when_idle` ใน `SendMessage` ข้าม session** — สั่งให้ session อื่นของ Claude Code บนเครื่องเดียวกันส่งแจ้งเตือนกลับมา 1 ครั้ง ตอนที่มัน idle ครั้งถัดไป · เป็น opt-in ยิงครั้งเดียวจบ ไม่ต้อง poll (macOS และ Linux)
- **`SendMessage` ปฏิเสธข้อความรัวเกินโควตาตั้งแต่ต้นทาง** — ถ้าการส่งรัว ๆ จะเกินที่ inbox ของ session ปลายทางรับไหว ระบบจะปฏิเสธตั้งแต่แรก แทนที่จะรายงานว่าส่งแล้วทั้งที่ข้อความถูกทิ้ง
- **Remote Control ขึ้นสถานะ offline ภายในไม่กี่วินาที** เมื่อ CLI ปิดตัวหรือ terminal ของ session นั้นถูกปิด

### 🆕 ใหม่ใน v2.1.238

- **ข้อความข้าม session ที่ถูกปฏิเสธ จะบอกว่าถูกปฏิเสธ** — ส่งไปหา session บนเครื่องเดียวกันที่ตั้งไม่รับข้อความเข้า (เช่น `crossSessionInbound: "refuse"`) ฝั่งผู้ส่งจะได้ผลลัพธ์ว่า "refused" แทนที่จะขึ้นว่าสำเร็จเงียบ ๆ ดูที่ [[06-configuration]]
- **ข้อความที่ถูกทิ้งก็บอกเหมือนกัน** — ถ้า inbox ของ session ปลายทางทิ้งข้อความเรา (ติด rate limit หรือคิวเต็ม) ระบบจะแจ้งกลับมาที่ session ของเรา แทนที่ข้อความจะหายไปเฉย ๆ

### 🆕 ใหม่ใน v2.1.239

- **cross-session messaging มาถึง Windows แล้ว** — session ของ Claude Code ข้ามเครื่องส่งข้อความหากันด้วย `SendMessage` และหากันเจอด้วย `ListAgents` ได้แล้ว เหมือนบน macOS และ Linux
- **`ListAgents` บอกชื่อของ session ตัวเองด้วย** — ชื่อที่เพื่อนใช้ส่งข้อความหาเรา และถ้า `SendMessage` ไปหาชื่อตัวเองระบบจะบอกตรง ๆ แทนที่จะขึ้น "no agent named …"
- **`ListAgents` และ `/list-agents` แสดง teammate ที่ออนไลน์อยู่** — เมื่อก่อนขึ้นเฉพาะ subagent กับ session อื่น teammate ที่ติดต่อได้จริงเลยดูเหมือนหายไป

> 🔎 เจาะลึกทั้งเรื่องนี้ต่อได้ที่ [[41-background-agents]]

### 🆕 ใหม่ใน v2.1.247

- **Sonnet 5 auto-compact ที่ context เต็ม 1M** — หน้าต่าง auto-compact ตั้งต้นครอบคลุม 1M เต็มหน้าต่างแล้ว session บนหน้าต่าง 1M เลย auto-compact ที่ราว ๆ 967K token แทนราว ๆ 934K
- **ข้อความจาก session อื่นย่อเหลือบรรทัดเดียวโดย default** — ข้อความที่ส่งเข้ามาแสดงเป็น preview บรรทัดเดียว `Message from @<sender>: <first line>` กด Ctrl+O เพื่อกางดูเนื้อหาเต็ม

### 🆕 ใหม่ใน v2.1.248

- **cross-session messaging ใช้ได้ทุกที่แล้ว** — `SendMessage` / `ListAgents` ระหว่าง session บนเครื่องเดียวกันใช้ได้บน Bedrock, Vertex และ Foundry รวมถึงตอนที่ปิด telemetry ด้วย

---

---

## Navigation

- ⬅️ Previous: [[18-plugins]]
- ➡️ Next: [[20-scheduled-tasks]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/19-session-management]]
