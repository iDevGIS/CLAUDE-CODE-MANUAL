---
walkthrough: 10
title: Output Styles & Status Line
related:
  - "[[04-hooks-lifecycle]]"
---

# 10 — Output Styles & Status Line: ปรับหน้า UI ของ Claude Code

> เป้าหมาย: ใช้ output style + status line ให้ session ตรงกับสไตล์ของคุณ/ทีม

## Output Styles

ไฟล์ markdown ที่กำหนด **persona/voice** ของ Claude ตลอด session

ดู `taskflow/.claude/output-styles/senior-engineer.md`:

```markdown
---
name: senior-engineer
description: Concise, opinionated, evidence-first style.
---

# Senior Engineer Output Style

## Voice
- Direct, second-person, present tense
- No filler ("Sure!", "Great question!")
- ...
```

เปิดใช้ใน `.claude/settings.json`:

```json
{
  "outputStyle": "senior-engineer"
}
```

หรือเปลี่ยนใน session:

```
> /output-style
```

## เมื่อไหร่ควรเขียน output style

- ทีมต้องการสไตล์เดียวกัน (concise, formal, beginner-friendly, etc.)
- ภาษาที่ไม่ใช่ default (ไทย, ญี่ปุ่น)
- พื้นที่จำกัด (terminal กว้าง 80 cols เท่านั้น)
- บริบทเฉพาะ (เช่น "ตอบเหมือนคุยกับ junior engineer")

## Status Line

แถวข้อความล่างของ Claude Code prompt — รัน command ทุกครั้งที่ render

ดู `.claude/hooks/statusline.sh`:

```bash
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
TASKS=$(node -e "...")
echo "🌊 taskflow | ${BRANCH} | tasks ${TASKS} | $(node -v)"
```

เปิดใช้ใน `.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash .claude/hooks/statusline.sh"
  }
}
```

## Status line — Input/Output

- **stdin**: JSON `{ model_name, current_dir, session_id, ... }`
- **stdout**: บรรทัดแรก = สิ่งที่แสดง

## Pitfall: ทำให้เร็ว

Status line รันทุกครั้งที่ Claude render → ถ้า script ช้า, UI จะกระตุก

ทำ:
- ใช้ command เร็ว (`git rev-parse`, ไม่ใช่ `git status` ที่ scan ทั้ง repo)
- Cache ผลลัพธ์ใน `/tmp` ถ้าเปลี่ยนน้อย
- วัดด้วย `time bash .claude/hooks/statusline.sh` — ควร < 50ms

## Pattern ที่ดี

| Element ใน statusline | command |
|----------------------|---------|
| Branch | `git rev-parse --abbrev-ref HEAD` |
| Dirty marker | `git diff --quiet || echo '*'` |
| Test status | cache ใน `.claude/.cache/test-status` (อัปเดตจาก post-edit hook) |
| Cost / token usage | parse จาก JSON ที่ stdin |
| Project-specific (เช่น tasks open) | command ของ app เอง |

## ใช้ skill เปลี่ยน keybindings

นอกเหนือจาก output style + statusline — keybindings ก็ปรับได้: `~/.claude/keybindings.json` (ดู skill `keybindings-help`)

## Related

- **[[04-hooks-lifecycle]]** — statusline เป็น "render hook" รูปแบบหนึ่ง
