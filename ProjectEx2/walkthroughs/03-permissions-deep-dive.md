---
walkthrough: 03
title: Permissions — allow / deny / ask, 3 layers
related:
  - "[[02-claude-md-hierarchy]]"
  - "[[04-hooks-lifecycle]]"
---

# 03 — Permissions: allow / deny / ask แบบเจาะลึก

> เป้าหมาย: ใช้ permission system ของ Claude Code ให้ปลอดภัย แต่ไม่ติดถาม permission ตลอดเวลา

## 3 ชั้นของ permission

```
~/.claude/settings.json                ← user (ใช้ทุกโปรเจกต์)
.claude/settings.json                  ← project (commit เข้า git)
.claude/settings.local.json            ← personal/temp (gitignored)
```

ลำดับการ resolve: **deny ชนะเสมอ**, จากนั้น `ask`, สุดท้าย `allow`. รวมจากทั้ง 3 ชั้น

## ดูใน TaskFlow

เปิด `taskflow/.claude/settings.json` — block `permissions`:

```json
{
  "defaultMode": "acceptEdits",
  "allow": [
    "Bash(npm test)",
    "Bash(npm test:*)",
    "Bash(node *)",
    "Bash(git status)", "Bash(git diff:*)", "Bash(git log:*)",
    "Bash(git add:*)", "Bash(git commit:*)",
    "Read(./**)", "Edit(./**)", "Write(./**)"
  ],
  "deny": [
    "Bash(rm -rf *)",
    "Bash(git push --force *)",
    "Bash(npm publish *)",
    "Read(./.env)",
    "Write(./.taskflow.json)"
  ],
  "ask": [
    "Bash(git push:*)",
    "Bash(gh pr:*)"
  ]
}
```

## อ่าน rule ยังไง

- `Bash(npm test)` — exact match (เฉพาะ `npm test` เป๊ะ)
- `Bash(npm test:*)` — prefix match (`npm test`, `npm test --watch`, etc.)
- `Bash(node *)` — wildcard (`node` ตามด้วยอะไรก็ได้)
- `Read(./**)` — recursive ใน path
- `Read(./.env)` — exact path

## ทำไม deny `Write(./.taskflow.json)`

DB คือ runtime state ไม่ใช่ source code ถ้า Claude แก้ตรง ๆ จะข้าม validation ใน `core/task.js` หมด ใช้ CLI/HTTP API แทน

## defaultMode 3 แบบ

- `acceptEdits` — ตามที่ allow ไว้ ไม่ถาม (production setting สำหรับโปรเจกต์ที่เซ็ต deny ครบ)
- `requireConfirmation` — ถามทุก tool call ที่ไม่อยู่ใน allow
- `plan` — Plan Mode (read-only) — เหมาะกับการ explore โดยไม่อยากให้แก้อะไร

## settings.local.json — เมื่อไหร่ใช้

```json
{
  "permissions": { "allow": ["Bash(gh pr view:*)"] },
  "env": { "TASKFLOW_LOG": "debug" }
}
```

- เพิ่ม permission ชั่วคราวเฉพาะตัว — เช่น คุณใช้ `gh` ทีมอื่นอาจไม่
- เปลี่ยน env ระหว่าง debug
- gitignored แล้ว (ดู `.gitignore`)

## Pattern ที่ดี

1. ใน `settings.json` ของโปรเจกต์ **เปิดกว้าง** สำหรับ tool ที่ใช้บ่อย (`npm test`, `git diff`)
2. **Deny แบบ explicit** สำหรับสิ่งที่ผิดพลาดไม่ได้ (`rm -rf`, `git push --force`, `.env`)
3. **Ask** สำหรับสิ่งที่กระทบโลกภายนอก (`git push`, `gh pr`)
4. ทุกอย่างที่เหลือ — Claude จะถาม คุณกด `1` (allow once) หรือ `2` (allow always)
5. ถ้าถามบ่อยเกิน → ใช้ skill `fewer-permission-prompts` จากใน Claude Code

## Related

- **[[04-hooks-lifecycle]]** — hook เป็น defense-in-depth เสริม permission
- **[[06-mcp-servers]]** — MCP servers มี permission ของตัวเอง
