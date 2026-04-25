---
title: "Tutorial Day 3: Power User Tricks"
section: 29
lang: th
tags:
  - claude-code
  - tutorial
  - advanced
  - power-user
aliases:
  - "Day 3 Tutorial"
  - "Power User"
related:
  - "[[28-tutorial-day2-first-project]]"
  - "[[03-slash-commands]]"
  - "[[12-subagents]]"
  - "[[14-context-management]]"
  - "[[30-cookbook-recipes]]"
---

# Tutorial Day 3: Power User Tricks

> **เป้าหมาย:** เปลี่ยนคุณจาก "ใช้ได้" → "ใช้เก่ง" ในวันเดียว
>
> เคล็ดลับเหล่านี้ คือสิ่งที่นักพัฒนา 10x ใช้ทุกวัน

## ⚡ Trick 1: Slash Commands ที่ใช้จริง

แทนที่จะพิมพ์ยาว ใช้ `/` ชอร์ตคัต

| Slash | ทำอะไร | ใช้เมื่อ |
|-------|--------|---------|
| `/clear` | ล้าง context ทั้งหมด | เปลี่ยน task ใหญ่ → เริ่มใหม่ |
| `/compact` | ย่อ context | ทำงานยาว → context จะเต็ม |
| `/cost` | ดู token usage | เช็คว่าเสียเงินไปเท่าไหร่ |
| `/permissions` | แก้สิทธิ์ tool | ขี้เกียจกด Yes ทุกที |
| `/model` | เปลี่ยน model | task ง่าย → ใช้ Haiku ประหยัด |
| `/exit` | ออก | จบงาน |

> 📖 ครบทุก command: [[03-slash-commands]]

## ⚡ Trick 2: Subagents (delegate งานเป็นทีม)

แทนที่จะให้ Claude ทำเองทุกอย่าง → **สั่งให้สร้างทีมย่อย** แต่ละคนเชี่ยวชาญต่างกัน

### ตัวอย่างจริง

```
มีโปรเจกต์ Next.js ขนาดใหญ่ ฉันต้อง:
1. หาทุกที่ที่ใช้ deprecated API
2. เขียน migration plan
3. เริ่มแก้ไฟล์ที่สำคัญที่สุด

ใช้ subagent ทำให้คู่ขนาน
```

Claude จะ:
- Spawn agent A → grep หา deprecated API
- Spawn agent B → อ่าน migration docs
- รวมผล → เสนอ plan

> 🚀 **ผล:** เร็วขึ้น 3-5 เท่า + main context ไม่รก
>
> 📖 ดูเพิ่ม: [[12-subagents]] / [[13-agent-teams]]

## ⚡ Trick 3: CLAUDE.md เก่งๆ

CLAUDE.md ดี = Claude เข้าใจโปรเจกต์ทันทีที่เปิด

### Template แนะนำ

```markdown
# Project: My App

## What this is
[1-2 ประโยค]

## Tech Stack
- Frontend: React 18 + TypeScript
- Backend: Bun + Elysia
- DB: PostgreSQL + Drizzle ORM

## Architecture
- src/api/ → REST endpoints
- src/lib/ → shared utilities
- src/web/ → React app

## Code Style
- Use TypeScript strict mode
- No default exports
- Prefer functional components
- Test files next to source: foo.ts + foo.test.ts

## Commands
- `bun dev` — start dev server
- `bun test` — run tests
- `bun build` — production build

## Don't
- Don't use `any` type
- Don't add comments unless asked
- Don't commit .env files

## Active Tasks
[เลือกใส่ — เช่น "กำลัง migrate ไป Drizzle จาก Prisma"]
```

> 💡 Claude จะอ่านไฟล์นี้ทุกครั้งที่เปิด → จำ rule ของโปรเจกต์ตลอด

## ⚡ Trick 4: Plan Mode (อย่ากระโดดเขียน)

ก่อน task ใหญ่ใช้:

```
/plan
[อธิบาย task]
```

Claude จะ:
1. ไม่แตะไฟล์
2. คิดแผน
3. แสดงให้ดู
4. คุณกด Approve ถึงเริ่ม

**เหมาะกับ:**
- Refactor ใหญ่
- Migration
- เพิ่ม feature ที่กระทบหลายไฟล์

## ⚡ Trick 5: Headless Mode (ใช้ Claude ใน Script)

Claude Code ไม่จำเป็นต้องเปิด chat — รันใน script ได้

```bash
claude -p "review this code: $(cat app.js)" > review.txt
```

หรือใส่ใน CI:

```yaml
# .github/workflows/review.yml
- run: |
    claude -p "review the diff: $(git diff origin/main)" \
      > review.md
```

> 📖 ดูเพิ่ม: [[16-headless-mode]]

## ⚡ Trick 6: Hooks (Auto-trigger)

ทำให้ Claude ตอบสนอง event อัตโนมัติ:

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "npm run lint --silent"
        }]
      }
    ]
  }
}
```

→ ทุกครั้งที่ Claude แก้ไฟล์ จะ run lint อัตโนมัติ

> 📖 ดูเพิ่ม: [[10-hooks]]

## ⚡ Trick 7: Memory Banking

จดเรื่องที่อยากให้ Claude **จำข้ามเซสชัน**

```
จำไว้: ทีมเราใช้ pnpm ไม่ใช่ npm
```

Claude จะเขียนลง memory file → session หน้าจะรู้

> 📖 ดูเพิ่ม: [[08-memory]]

## ⚡ Trick 8: Reference ไฟล์ด้วย @

```
อธิบาย logic ใน @src/auth/login.ts
```

`@` = ให้ Claude อ่านไฟล์นั้นทันที — ไม่ต้องสั่ง "ช่วยเปิดไฟล์ให้หน่อย"

## ⚡ Trick 9: Pipe คำสั่ง

```bash
git diff | claude -p "summarize this diff in 3 bullets"
```

```bash
cat error.log | claude -p "find the root cause"
```

## ⚡ Trick 10: Scoped Session

แยก session ตาม task → context ไม่ปนกัน

```bash
# Session A: สำหรับ frontend
cd web && claude

# Session B: สำหรับ backend
cd api && claude
```

แต่ละ session อ่าน CLAUDE.md ของตัวเอง → focus 100%

## 🏆 Workflow แบบ Power User

ตัวอย่างวันทำงานจริง:

```
🌅 เช้า:
1. cd project && claude
2. Claude อ่าน CLAUDE.md → รู้ว่าทำต่อจากเมื่อวาน
3. /plan "implement user notifications"
4. Approve plan → Claude แตกเป็น subagents
5. Review diff → /commit

🌆 เย็น:
6. /cost → เช็ค usage วันนี้
7. /clear → เคลียร์ก่อนปิด
8. ออก
```

## ✅ สรุป Day 3

คุณได้รู้จัก:
- [x] Slash commands ที่ใช้บ่อย
- [x] Subagents → ทีมย่อยทำงานคู่ขนาน
- [x] CLAUDE.md เก่งๆ
- [x] Plan mode
- [x] Headless mode + Hooks
- [x] Memory + @reference
- [x] Workflow แบบมืออาชีพ

## 🎓 จบ Tutorial — แล้วยังไงต่อ?

ตอนนี้คุณมีพื้นฐานทุกอย่างแล้ว ขั้นต่อไป:

| ถ้าอยาก | ดูที่ |
|---------|------|
| แก้ปัญหาเฉพาะเร็วๆ | [[30-cookbook-recipes]] |
| ใช้ใน production จริงจัง | [[31-cost-management]], [[32-security-best-practices]] |
| ดู use case จริงเยอะๆ | [[33-use-cases-analogies]] |
| เปรียบเทียบกับ tool อื่น | [[34-comparison-tools]] |
| reference ลึก | กลับไป section 1-26 |

---

🌐 EN: [[../en/29-tutorial-day3-power-user]]
