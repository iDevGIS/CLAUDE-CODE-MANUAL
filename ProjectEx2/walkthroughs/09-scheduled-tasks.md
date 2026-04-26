---
walkthrough: 09
title: Scheduled Tasks — cron + Claude
related:
  - "[[08-headless-mode]]"
---

# 09 — Scheduled Tasks: ตั้งเวลาให้ Claude ทำงานเอง

> เป้าหมาย: ใช้ cron + headless Claude เพื่อสร้าง workflow ที่รันเองทุกวัน

## ใน TaskFlow มี 2 script

### 1) `scripts/scheduled-summary.sh`

- เรียก `taskflow stats` + `list --done true` + `list --priority high`
- เขียน markdown summary ไว้ที่ `.claude/.logs/daily-summary.md`
- ถ้าเซ็ต `CLAUDE_REWRITE=1` → pipe เข้า `claude --print` ให้แปลงเป็น Slack standup message

### 2) `scripts/setup-cron.sh`

- ติดตั้ง entry ลง crontab อัตโนมัติ (idempotent)
- รัน `scheduled-summary.sh` ทุกวัน 08:00

```bash
bash scripts/setup-cron.sh
```

## Crontab รูปแบบ

```
# m h dom mon dow  command
  0 8 *   *   *    cd /path/to/taskflow && bash scripts/scheduled-summary.sh
```

| Field | ค่า | ตัวอย่าง |
|-------|-----|---------|
| `m` | นาที (0-59) | `0` = ตรงทุกชั่วโมง |
| `h` | ชั่วโมง (0-23) | `8` = 08:00 |
| `dom` | วันของเดือน | `*` = ทุกวัน |
| `mon` | เดือน | `*` |
| `dow` | วันของสัปดาห์ (0=Sun) | `1-5` = จันทร์-ศุกร์ |

## Pattern อื่นที่น่าทำ

| งาน | schedule | คำสั่ง |
|------|----------|--------|
| Triage issue ใหม่ | `*/15 * * * *` | `claude -p "Triage issue: $(gh issue list --limit 5 --json title,body)"` |
| Summarize PR queue | `0 9 * * 1-5` | `claude -p "Group PRs by reviewer: $(gh pr list --json ...)"` |
| Lint changelog vs commits | `0 0 * * *` | `claude -p "Check CHANGELOG vs git log diff: ..."` |
| Vacuum log files | `0 4 * * 0` | `find .claude/.logs -mtime +30 -delete` |

## ทางเลือกอื่น (ที่ไม่ใช่ cron)

- **systemd timers** — มี logging ดีกว่า, restart ได้
- **GitHub Actions schedule** — `on: schedule: cron: ...` สำหรับ workflow ที่ต้องอยู่ใน CI
- **launchd (macOS)** — replacement ของ cron บน Mac
- **Claude Code background tasks** — ใน Claude Code GUI (เมื่อ enable)

## Pitfalls

- **PATH ใน cron ไม่เหมือน shell** — ใช้ absolute path (`/usr/local/bin/node`) หรือ source .profile
- **Output ไม่เห็น** — cron จะส่ง mail ถ้าไม่ redirect; ใช้ `>/dev/null 2>&1` ถ้าไม่ต้องการ
- **Token expired** — Claude Code ใช้ subscription/API key; check ว่ายัง valid อยู่ก่อนตั้ง schedule
- **Concurrent runs** — ถ้า script ใช้เวลานานกว่า interval → ใช้ `flock` กัน race

```bash
flock -n /tmp/taskflow-summary.lock bash scripts/scheduled-summary.sh
```

## Related

- **[[08-headless-mode]]** — ทุก scheduled task ใช้ headless Claude
