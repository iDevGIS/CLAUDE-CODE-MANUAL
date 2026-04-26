---
walkthrough: 01
title: Getting Started — Run TaskFlow End-to-End
related:
  - "[[02-claude-md-hierarchy]]"
  - "[[04-hooks-lifecycle]]"
  - "[[12-real-world-flow]]"
---

# 01 — เริ่มต้น: รัน TaskFlow ทั้งระบบใน 5 นาที

> เป้าหมาย: ทำให้คุณรัน CLI + HTTP server ได้ และเปิด `claude` ใน TaskFlow แล้วเห็น session start hook ทำงาน

## 1) Clone + ตรวจสอบสภาพแวดล้อม

```bash
cd ProjectEx2/taskflow
node -v          # ต้อง >= 20
npm test         # 25 tests, ทั้งหมดต้องผ่าน
npm run lint     # lint: ok
```

ถ้า test/lint ไม่ผ่าน — อ่านไฟล์ `CLAUDE.md` ก่อนแก้ เพื่อเข้าใจ "rule" ที่ทำให้ test เขียนแบบนี้

## 2) ใช้ CLI

```bash
node src/cli/index.js help
node src/cli/index.js add "อ่านคู่มือ Claude Code" --priority high --tag learn
node src/cli/index.js add "เขียน blog summary"     --tag write
node src/cli/index.js list
node src/cli/index.js done 1
node src/cli/index.js stats
```

## 3) ใช้ HTTP API

```bash
# terminal 1
node src/server/index.js
# → taskflow server listening on http://localhost:3000

# terminal 2
curl http://localhost:3000/health
curl -X POST http://localhost:3000/tasks \
  -H 'content-type: application/json' \
  -d '{"title":"deploy v1","priority":"high","tags":["release"]}'
curl http://localhost:3000/tasks
curl -X POST http://localhost:3000/tasks/1/done
curl http://localhost:3000/stats
```

## 4) เปิด `claude` ใน TaskFlow

```bash
cd ProjectEx2/taskflow
claude
```

สิ่งที่จะเกิดขึ้นโดยอัตโนมัติ (ตาม `.claude/settings.json`):
- **SessionStart hook** — ขึ้น banner บอก branch, ไฟล์ที่เปลี่ยน, node version, db path
- **Status line** — แถบล่างขวาแสดง `🌊 taskflow | branch | tasks 3/5 | v22.x`
- **Output style** — `senior-engineer` ทำให้คำตอบสั้น ตรงประเด็น
- **Memory** — root `CLAUDE.md` + `src/CLAUDE.md` ถูกอ่านเข้า context

ลองสั่ง:
```
> /test
> /lint
> use the reviewer subagent on the diff
> /security-scan
> @commit-formatter draft a commit for the staged changes
```

## 5) ขั้นถัดไป

- **[[02-claude-md-hierarchy]]** — ทำไมมี `CLAUDE.md` 2 ไฟล์
- **[[04-hooks-lifecycle]]** — hook 7 ตัวทำงานเมื่อไหร่
- **[[08-headless-mode]]** — รัน Claude แบบไม่มี UI ใน CI

## Don't

- อย่าแก้ `.taskflow.json` ตรง ๆ — มี hook block ไว้แล้ว
- อย่า run `npm install` — โปรเจกต์ตั้งใจ zero dependencies
