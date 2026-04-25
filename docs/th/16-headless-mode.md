---
title: "Headless Mode (โหมดอัตโนมัติ)"
section: 16
lang: th
tags:
  - claude-code
  - headless
  - automation
aliases:
  - "Headless Mode"
related:
  - "[[10-hooks]]"
  - "[[20-scheduled-tasks]]"
---

# Headless Mode (โหมดอัตโนมัติ)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Headless Mode?**
>
> Headless Mode ทำให้ Claude Code ทำงาน **โดยไม่ต้องมีคนนั่งดู** — เหมาะกับงานอัตโนมัติ, CI/CD Pipeline, Script ที่รันตามเวลา หรือการประมวลผลข้อมูลจำนวนมาก

**Use Cases:**

| Use Case | คำสั่ง | ผลลัพธ์ |
|----------|-------|--------|
| **Code Review อัตโนมัติทุก PR** | `claude --bare -p "รีวิว $(git diff main)"` ใน GitHub Actions | ทุก PR ถูกรีวิวโดย AI อัตโนมัติ ไม่ต้องรอคนรีวิว |
| **สร้าง Release Notes อัตโนมัติ** | `claude -p "สร้าง Changelog จาก Git Log"` | ทุก Release มี Changelog สวยงามโดยอัตโนมัติ |
| **วิเคราะห์ Error Log** | `cat error.log \| claude -p "วิเคราะห์"` | วิเคราะห์ Log ได้ทันที ไม่ต้องอ่านเอง |
| **Batch Processing ไฟล์เยอะ** | `for f in *.ts; do claude -p "แก้ไข $f"; done` | แก้ไข Pattern เดียวกันในหลาย ๆ ไฟล์อัตโนมัติ |
| **สร้าง JSON Output สำหรับ Pipeline** | `claude -p "..." --output-format json --json-schema '{...}'` | ได้ Output ที่ Parse ได้ทันที ส่งต่อให้ Program อื่นได้ |
| **Daily Code Quality Check** | Cron Job + `claude --bare -p "ตรวจ Code Quality"` | รายงานคุณภาพโค้ดทุกเช้า |
| **Migration Script** | `claude -p "ย้ายจาก v1 → v2" --max-turns 50` | Claude ทำ Migration ให้โดยอัตโนมัติ |
| **Generate Test Data** | `claude -p "สร้าง Seed Data 100 records" --output-format json` | ได้ Test Data ในรูปแบบ JSON ทันที |

**ตัวอย่าง GitHub Actions:**

```yaml
name: AI Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: AI Review
        run: |
          git diff origin/main | claude --bare -p "รีวิวโค้ดนี้ หา Bug, Security Issue, Performance Problem" \
            --allowedTools "Read" \
            --output-format json \
            --max-turns 5
```

### ใช้งานแบบ Non-Interactive

```bash
# รันคำสั่งและพิมพ์ผลลัพธ์
claude -p "หา Bug ในไฟล์ auth.py"

# รับ Output เป็น JSON
claude -p --output-format json "วิเคราะห์โค้ด"

# โหมดเปล่า (เร็วกว่า)
claude -p --bare "คำถาม"
```

### Structured Output (JSON)

```bash
claude -p "วิเคราะห์ฟังก์ชันทั้งหมดในไฟล์" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}}}'
```

### Streaming Output

```bash
claude -p "เขียนโค้ด" \
  --output-format stream-json \
  --include-partial-messages | \
  jq -rj 'select(.type == "stream_event") | .event.delta.text'
```

### ใช้ใน CI/CD

```bash
# ตัวอย่าง GitHub Actions
claude --bare -p "รีวิวโค้ดที่เปลี่ยนแปลง" \
  --allowedTools "Read,Bash(npm test),Edit" \
  --output-format json \
  --max-turns 10
```

### Pipe ข้อมูลเข้า Claude

```bash
# ส่งไฟล์ให้ Claude วิเคราะห์
cat error.log | claude -p "วิเคราะห์ Error ใน Log นี้"

# ส่งผลลัพธ์คำสั่ง
git diff | claude -p "รีวิวการเปลี่ยนแปลงนี้"

# ส่งหลายไฟล์
cat src/*.ts | claude -p "หา Bug"
```

---

---

## Navigation

- ⬅️ Previous: [[15-git-integration]]
- ➡️ Next: [[17-ide-integration]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/16-headless-mode]]
