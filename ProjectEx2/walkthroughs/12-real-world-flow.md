---
walkthrough: 12
title: Real-world Flow — Add a feature end-to-end
related: "[[01-getting-started]]"
---

# 12 — Real-world Flow: เพิ่ม feature `due-date` ตั้งแต่ idea จนถึง release

> เป้าหมาย: ดูว่าทุก feature ของ Claude Code (CLAUDE.md, hooks, agents, skills, slash commands, headless) ทำงานร่วมกันใน workflow เดียว

## ขั้นที่ 0 — เริ่ม session

```bash
cd ProjectEx2/taskflow
claude
```

ทันทีที่เปิด:
- **SessionStart hook** → banner: branch, changed files, db
- **Status line** → `🌊 taskflow | main | tasks 5/12 | v22.x`
- **CLAUDE.md** (root + `src/`) → loaded เข้า context
- **Output style** `senior-engineer` → คำตอบจะตรงประเด็น

## ขั้นที่ 1 — Plan

```
> Shift+Tab → Plan Mode
> add a `dueDate` field to tasks. CLI: --due YYYY-MM-DD. 
  HTTP: dueDate in body. List should sort by dueDate when --sort=due.
```

Plan Mode = read-only → Claude วาง plan ไว้ก่อน, ยังไม่แก้ไฟล์

ดู plan แล้วถ้าโอเค: Shift+Tab ออก → Claude เริ่มทำ

## ขั้นที่ 2 — Implement (auto-test loop)

Claude เริ่มแก้ตามลำดับใน `src/CLAUDE.md`:
1. `src/core/validate.js` — เพิ่ม `validateDueDate`
2. `src/core/task.js` — รับ `dueDate` ใน `addTask`
3. `tests/validate.test.js` + `tests/task.test.js` — เพิ่มเทสต์
4. `src/cli/commands.js` — เพิ่ม `--due` flag
5. `src/server/routes.js` — รับ `dueDate` ใน body

หลังทุก Edit → **PostToolUse hook** รัน `npm test` + lint

ถ้า test fail → log feed กลับเข้า context → Claude แก้เอง (self-healing loop)

## ขั้นที่ 3 — Review

```
> /review
```

`/review` slash command → spawn `reviewer` subagent → ใช้แค่ Read + git diff → ตอบ:

```
VERDICT: NEEDS WORK
SCOPE:   added dueDate to core, cli, server (+5 tests)

Findings:
- src/core/validate.js:12  validateDueDate accepts '2025-13-99' (no Date check) [med]
- src/server/routes.js:35  POST /tasks doesn't validate dueDate format [high]
- README.md  CLI table missing --due flag [low]

Next step: tighten validateDueDate using Date.parse + ISO regex
```

## ขั้นที่ 4 — Fix + Security

```
> apply the reviewer's suggestions
```

Claude แก้ → PostToolUse → tests pass

```
> /security-scan
```

Spawn `security` subagent → audit เฉพาะ diff:

```
SUMMARY: SAFE TO MERGE
SCOPE: routes.js, validate.js, task.js
[LOW] routes.js:35 — error message includes input value, ok for now
```

## ขั้นที่ 5 — Docs sync

```
> /docs
```

Spawn `docs-writer` → diff README กับ `commands.js` → propose edits → คุณ approve → apply

## ขั้นที่ 6 — Commit

```
> @commit-formatter draft a commit message for the staged changes
```

Skill `commit-formatter` (อยู่ใน turn เดียวกัน, ไม่ spawn subagent):

```
feat(core): add dueDate field with validation and sort

Adds optional dueDate (ISO 8601) to tasks across core, CLI (--due flag),
and HTTP API. List supports --sort=due to order by deadline first.

Closes #58
```

```
> commit it
```

Claude run `git add` + `git commit`

## ขั้นที่ 7 — Pre-push automation

```bash
git push
# .git/hooks/pre-push runs:
bash scripts/headless-review.sh main
```

Headless Claude (`-p`) เรียก `reviewer` subagent อีกรอบบน diff vs main → block push ถ้าตอบ NEEDS WORK

## ขั้นที่ 8 — Release

```
> /release minor
```

Slash command:
1. ตรวจ working tree clean
2. รัน test
3. Bump version (`0.1.0` → `0.2.0`)
4. ย้าย CHANGELOG `[Unreleased]` → `[0.2.0]`
5. Commit `chore(release): v0.2.0`

## ขั้นที่ 9 — Cron-driven daily report

ตอน 08:00 (ตั้งใน `setup-cron.sh`):
1. `scheduled-summary.sh` รัน
2. เก็บ stats จาก `.taskflow.json`
3. ถ้าเซ็ต `CLAUDE_REWRITE=1` → headless Claude แปลงเป็น Slack message

## Feature ของ Claude Code ที่ใช้ในตัวอย่างนี้

| Feature | ที่ไหน |
|---------|--------|
| CLAUDE.md hierarchy | session start, ทุก plan/implement |
| Output style | ทุกคำตอบของ Claude |
| Status line | บรรทัดล่างทุก render |
| Plan Mode | ขั้นที่ 1 |
| PreToolUse hook (block) | ทุก Edit/Write |
| PostToolUse hook (test+lint) | ขั้นที่ 2, 4 |
| Slash command (`/review`, `/security-scan`, `/docs`, `/release`) | ขั้นที่ 3, 4, 5, 8 |
| Subagent (`reviewer`, `security`, `docs-writer`) | ขั้นที่ 3, 4, 5 |
| Skill (`commit-formatter`) | ขั้นที่ 6 |
| Headless mode | ขั้นที่ 7 (pre-push) |
| Scheduled task | ขั้นที่ 9 |
| Permissions | ทุกขั้น (deny `git push --force`, etc.) |
| SessionStart hook | ขั้นที่ 0 |
| Stop hook | จบทุก turn |

## ก่อนจบ

```
> /clear   # เริ่ม turn ใหม่ ไม่เก็บ context เก่า
> /exit
```

Stop hook → log session summary, vacuum log เก่า

## Related

- กลับสู่ **[[01-getting-started]]** เพื่อ recap setup
- ดู **[[FEATURE-MATRIX]]** ในรากของ ProjectEx2 เพื่อ map feature → file
