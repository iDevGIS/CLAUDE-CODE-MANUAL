---
walkthrough: 04
title: Hooks Lifecycle — 7 events, when each fires
related:
  - "[[03-permissions-deep-dive]]"
  - "[[10-output-styles-statusline]]"
---

# 04 — Hooks Lifecycle: 7 event types

> เป้าหมาย: เข้าใจว่า Claude Code มี hook เมื่อไหร่ และดูใช้งานจริงใน TaskFlow

## Lifecycle แบบเรียงเวลา

```
SessionStart          ← เปิด `claude`
   ↓
UserPromptSubmit      ← ทุกครั้งที่กด Enter
   ↓
PreToolUse            ← ก่อนเรียก tool (Edit/Write/Bash/...)
   ↓
[ Claude ใช้ tool ]
   ↓
PostToolUse           ← หลัง tool ทำงานเสร็จ
   ↓
[ Claude ตอบ ]
   ↓
Notification          ← ระหว่างรอ permission / idle
   ↓
SubagentStop          ← เมื่อ Task() / subagent จบ
   ↓
Stop                  ← จบ turn ของ Claude
```

## ของจริงใน TaskFlow

ดู `taskflow/.claude/settings.json` block `hooks` — แต่ละ event ผูกกับ script ใน `.claude/hooks/`:

| Event | Script | ทำอะไร |
|-------|--------|--------|
| `SessionStart` | `session-start.sh` | แสดง branch / changed files / node version ตอนเริ่ม |
| `UserPromptSubmit` | `user-prompt-log.sh` | log ทุก prompt ลง `.claude/.logs/prompts.log` |
| `PreToolUse` (Edit\|Write) | `pre-edit-validate.sh` | block การเขียน `.taskflow.json` / `.env` |
| `PreToolUse` (Bash) | `pre-bash-guard.sh` | block `rm -rf /`, force push, etc. |
| `PostToolUse` (Edit\|Write) | `post-edit-test.sh` | run `npm test` + lint หลังแก้โค้ด |
| `Notification` | `notify.sh` | set terminal title + log |
| `Stop` | `stop-summary.sh` | log สรุป session, ลบ log เก่า > 14 วัน |
| `SubagentStop` | `subagent-stop.sh` | log ว่า subagent ตัวไหนจบ |

## Hook input/output

แต่ละ hook รับ JSON ทาง **stdin**, ตอบสนองผ่าน:

| ผลลัพธ์ | ความหมาย |
|---------|----------|
| `exit 0` | ผ่าน, stdout ถูกใช้เป็น context (ระวัง — อย่าพิมพ์เยอะ) |
| `exit 2` | **block** tool call (สำหรับ PreToolUse) |
| stdout ของ `SessionStart` | ใส่เข้า initial context |
| `exit non-zero ≠ 2` | warn แต่ไม่ block |

## ตัวอย่าง: post-edit-test.sh

```bash
PAYLOAD="$(cat)"
FILE="$(echo "$PAYLOAD" | sed -n 's/.*"file_path"\s*:\s*"\([^"]*\)".*/\1/p' | head -1)"

# Skip docs
case "$FILE" in *.md|*.json|*.txt) exit 0;; esac

if ! npm test --silent; then
  echo "[hook] tests FAILED — fix before continuing"
  exit 1
fi
```

ผลที่ Claude เห็น: ถ้า test fail หลังแก้โค้ด → log ปรากฏใน context → Claude เห็นและแก้เอง (self-healing loop)

## เมื่อไหร่ควรใช้ hook (vs. permission / agent)

| เครื่องมือ | เหมาะกับ |
|-----------|---------|
| **permission** | กฎตายตัว ที่ตัดสินจาก argument ของ tool ได้เลย (e.g. `Bash(rm -rf *)`) |
| **PreToolUse hook** | ตรรกะซับซ้อนกว่านั้น (e.g. block ถ้า file path match pattern + state ของ git) |
| **PostToolUse hook** | side effect (run test, format code, log) |
| **subagent** | งานที่ต้องใช้ judgment — ไม่ใช่ rule กลไก |

## Debug

- เซ็ต `TASKFLOW_HOOK_DEBUG=1` ใน `.env` — ทุก hook พิมพ์ log ลง stderr
- ดู `.claude/.logs/` — ทุก hook เขียนของตัวเองที่นี่
- `/hooks` ใน session — list hook ที่ active

## Related

- **[[03-permissions-deep-dive]]** — permission เป็นเลเยอร์แรก, hook เป็นเลเยอร์สอง
- **[[10-output-styles-statusline]]** — status line ก็เป็น "hook" รูปแบบหนึ่ง
