---
walkthrough: 08
title: Headless Mode — Claude in CI / scripts
related:
  - "[[09-scheduled-tasks]]"
  - "[[12-real-world-flow]]"
---

# 08 — Headless Mode: ใช้ Claude ในสคริปต์ / CI

> เป้าหมาย: รัน Claude แบบ non-interactive ตัวอย่าง: review PR ใน GitHub Actions

## Headless = `claude --print` (`claude -p`)

```bash
echo "summarize the changes in this diff" | claude -p
```

- ไม่เปิด UI
- รัน prompt เดียว, exit
- output ทาง stdout — pipe ต่อได้

## Flag สำคัญ

| Flag | ผล |
|------|-----|
| `-p, --print` | headless mode |
| `--output-format text` | plain text (default) |
| `--output-format stream-json` | event-per-line, เหมาะกับ log/parsing |
| `--model <id>` | กำหนด model |
| `--permission-mode plan` | read-only — ห้าม Claude แก้ไฟล์ |
| `--permission-mode acceptEdits` | ทำตาม `.claude/settings.json` |
| `--allowed-tools "Read,Bash(git diff:*)"` | จำกัด tool inline |
| `--max-turns N` | กันไม่ให้วน loop |

## ดูใน TaskFlow

`taskflow/scripts/headless-review.sh`:

```bash
DIFF="$(git diff "${BASE}"...HEAD)"

PROMPT="Use the 'reviewer' subagent on:
---
$DIFF
---"

echo "$PROMPT" | claude --print \
  --model "$MODEL" \
  --permission-mode plan \
  --output-format text
```

รันได้:
```bash
bash scripts/headless-review.sh main
```

→ จะใช้ subagent `reviewer` ใน TaskFlow review diff vs `main` แล้วพิมพ์ verdict

## Pattern: GitHub Actions

`.github/workflows/claude-review.yml`:

```yaml
name: claude-review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm install -g @anthropic-ai/claude-code
      - env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: bash scripts/headless-review.sh ${{ github.base_ref }}
```

## Pattern: pre-push hook

`.git/hooks/pre-push`:

```bash
#!/usr/bin/env bash
# block push ถ้า reviewer ตอบ NEEDS WORK
RESULT="$(bash scripts/headless-review.sh main)"
if echo "$RESULT" | grep -q 'NEEDS WORK'; then
  echo "$RESULT"
  exit 1
fi
```

## Pattern: rewrite log → standup message

`scripts/scheduled-summary.sh` ทำตัวอย่างนี้แล้ว — เซ็ต `CLAUDE_REWRITE=1` แล้วมัน pipe markdown summary เข้า Claude เพื่อย่อเป็น Slack message

## Cost-aware tips

- ใช้ `--max-turns 3` กัน loop (subagent อาจ chain หลาย turn)
- `--permission-mode plan` = ราคาถูกกว่า (ไม่มี edit/write)
- `claude-haiku-4-5` สำหรับ task ง่าย ๆ เช่น summarization
- ใส่ skill `claude-api` ถ้าเขียน code ที่เรียก Claude API ตรง

## Pitfalls

- **Stdin ของ headless ไม่มี TTY** → interactive prompt จะ hang. ต้อง `--permission-mode acceptEdits` หรือ `plan`
- **Token ใน log** — `--output-format stream-json` log ทุกอย่าง รวมถึง prompt; อย่า log ใน CI ที่ public
- **Headless ก็เสีย token** — มี cost; ตั้ง alert / monthly cap

## Related

- **[[09-scheduled-tasks]]** — cron + headless = ระบบรายงานอัตโนมัติ
- **[[12-real-world-flow]]** — รวม headless ใน flow ใหญ่
