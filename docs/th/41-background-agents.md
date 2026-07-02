---
title: "Background Sessions & claude agents (เจาะลึก)"
section: 41
lang: th
tags:
  - claude-code
  - background
  - agents
  - sessions
  - deep-dive
aliases:
  - "Background Agents"
  - "claude agents"
related:
  - "[[19-session-management]]"
  - "[[16-headless-mode]]"
  - "[[20-scheduled-tasks]]"
  - "[[39-dynamic-workflows]]"
---

# Background Sessions & claude agents (เจาะลึก)

> **เป้าหมาย:** ส่งงานไปทำเบื้องหลัง เปิดหลายงานพร้อมกัน และคุมทั้งฝูงจากจอเดียว — จนถึงขั้นเปิด draft PR ให้เองอัตโนมัติ

งานบางอย่างไม่ควรต้องนั่งเฝ้า — refactor ก้อนใหญ่, test suite ที่รันเป็นชั่วโมง, หรือ bug ที่อยากปล่อยให้ Claude ไล่เองทั้ง repo **Background session** คือ session ที่รันต่อแบบแยกจากจอปัจจุบัน ส่วน **`claude agents`** คือหน้าจอศูนย์บัญชาการ: dispatch งานใหม่ ดู progress ตอบคำถาม และเก็บเกี่ยวผลลัพธ์ของทุก session ได้จากที่เดียว

## ส่งงานไปเบื้องหลัง

มีทางเข้า 3 ทาง:

| ทางเข้า | วิธีใช้ | เหมาะกับ |
|--------|--------|---------|
| **เริ่ม session ใหม่แบบ detached** | `claude --bg` — ตั้งชื่อด้วย `--name <ชื่อ>` หรือใช้ `--bg --exec "<คำสั่ง>"` เพื่อรันคำสั่ง shell เบื้องหลัง | งานที่รู้ตั้งแต่แรกว่าจะปล่อยยาว |
| **ดัน turn ปัจจุบันไปเบื้องหลัง** | `/bg` หรือ `Ctrl+B` (หรือ `←` `←` หลังจบ turn) | turn ที่เริ่มไปแล้วเพิ่งรู้ตัวว่านาน — ไม่ต้องยกเลิกแล้วเริ่มใหม่ |
| **ส่ง subagent ที่กำลังรัน** | background subagent ที่รันอยู่ได้เลย โดยไม่ต้อง restart | subagent งานยาวที่ไม่อยากรอใน session หลัก |

```bash
claude --bg --name nightly-refactor      # เริ่ม background session พร้อมตั้งชื่อ
claude --bg --exec "npm run test:e2e"    # รันคำสั่ง shell เป็นงานเบื้องหลัง
```

## คุมฝูงด้วย claude agents

`claude agents` เปิด **agent view** — ตัวจัดการ session สำหรับหลาย session พร้อมกัน:

- **Dispatch session ใหม่จากในนั้นได้เลย** — เคารพ field `agent` ใน settings และ override ได้ด้วย `--agent <name>`
- **Attach / ตอบกลับ** session ไหนก็ได้ — หรือ attach ตรงจาก terminal ด้วย `claude attach <id>`
- **ค้นหาไว** — พิมพ์ URL แล้ว view จะกรองเหลือ session ที่ prompt แรกมี URL นั้น (ค้นด้วย PR URL ก็ได้)
- **แต่ละแถวแสดง progress** แบบ `done/total`
- กด `←` **ครั้งเดียว** ก็เปิด agent view ได้ (ตั้งแต่ v2.1.196)

### สำหรับสคริปต์: `--json`

```bash
claude agents --json          # สถานะ session เป็น JSON
claude agents --json --all    # รวม session ที่เสร็จแล้วด้วย
```

ผลลัพธ์มี field `id`, `state` และ `waitingFor` — บอกว่า session ที่ค้างอยู่กำลังรออะไร

## วงจรชีวิต & ความทนทาน

- **Pinned background session อยู่ยาว** — restart ตัวเองในที่เดิม และสละทรัพยากรอย่างนุ่มนวลเมื่อ memory ตึง
- **คำสั่งและ workflow ที่รันยาว รอดข้ามการ stop/restart/update ของโปรเซส session** — รวมถึงบน Windows ที่ background shell ถูก "ส่งต่อ" แทนที่จะโดน kill (v2.1.196)
- **Worker ที่ตายเพราะ daemon restart จะ resume เองอัตโนมัติ** ครั้งถัดไปที่เปิด agents view (v2.1.196)
- **Background agent session อัปเดต Claude Code เวอร์ชันใหม่เองในเบื้องหลัง** (v2.1.163)

## ปิดงานเองจบ: auto draft-PR (v2.1.198)

Background agent ที่ dispatch จาก `claude agents` และทำงานโค้ดใน worktree จนเสร็จ จะ **commit → push → เปิด draft PR ให้อัตโนมัติ** แทนที่จะหยุดรอถาม

- ผลลัพธ์ที่พูดถึง PR จะมี**ลิงก์คลิกได้**
- agent ที่ค้างไปต่อไม่ได้ จะถูกติดป้าย **"Needs attention"**

## แจ้งเตือนผ่าน Notification hook (v2.1.198)

session ที่**รอ input** หรือ**ทำงานเสร็จ** จะยิง hook `Notification` ด้วย event `agent_needs_input` / `agent_completed` — ต่อ alert ไปที่ไหนก็ได้ (รายละเอียด hook ดู [[10-hooks]])

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "curl -s -d 'Claude Code: agent update' ntfy.sh/my-agents"
          }
        ]
      }
    ]
  }
}
```

## ข้อควรรู้

- **Permission เด้งที่ session หลัก** — background subagent ที่ขอ permission จะแสดง dialog ใน session หลัก พร้อมบอกว่า agent ตัวไหนขอ; กด `Esc` เพื่อปฏิเสธเฉพาะ tool นั้น (v2.1.186)
- `claude agents --dangerously-skip-permissions` แสดง disclaimer ของโหมด bypass และ apply bypass ให้ agent ทุกตัวที่ spawn ออกไป (v2.1.196)
- **Shell เบื้องหลังที่ idle จะถูกเก็บกวาดเมื่อ memory ตึง** — ปิดพฤติกรรมนี้ด้วย `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` (v2.1.193)
- **`claude --bg` ใช้ร่วมกับ `-p`/`--print` ไม่ได้** — โดน reject ตั้งแต่ยังไม่เริ่มรัน (v2.1.198) ถ้าต้องการ headless ดู [[16-headless-mode]]
- กลับมาคุยกับ background session ทีหลังได้ด้วย `/resume` — มองหา marker `bg` ในรายการ

## Use cases

- ปล่อย refactor ยาว ๆ หรือ test suite ใหญ่ ๆ รันเบื้องหลัง ระหว่างที่คุณเขียนโค้ดต่อ
- dispatch หนึ่ง session ต่อหนึ่ง repo หรือหนึ่ง bug แล้วดูภาพรวมจาก agent view
- งานข้ามคืน — จับคู่กับ [[20-scheduled-tasks]]
- review หลาย PR พร้อมกัน แล้วค้นกลับด้วย PR URL

---

---

## Navigation

- ⬅️ Previous: [[40-claude-in-chrome]]
- ➡️ Next: [[README]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/41-background-agents]]
