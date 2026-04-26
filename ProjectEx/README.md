# ProjectEx — Todo CLI Walkthrough

> ตัวอย่างโปรเจกต์ประกอบ **CLAUDE-CODE-MANUAL** — สร้าง Todo CLI ด้วย Claude Code ตั้งแต่ `claude` ครั้งแรกจนถึง `git commit`

📥 **เริ่มอ่าน:** [`ProjectEx-Walkthrough-TH.pptx`](./ProjectEx-Walkthrough-TH.pptx) · [`ProjectEx-Walkthrough-EN.pptx`](./ProjectEx-Walkthrough-EN.pptx)

---

## 📂 โครงสร้าง

```
ProjectEx/
├── ProjectEx-Walkthrough-TH.pptx    ← สไลด์ภาษาไทย (12 สไลด์)
├── ProjectEx-Walkthrough-EN.pptx    ← English deck (12 slides)
├── README.md                        ← ไฟล์นี้
│
├── todo-app/                        ← โค้ดโปรเจกต์รันได้จริง
│   ├── package.json                 (zero dependencies)
│   ├── index.js                     (CLI dispatcher)
│   ├── lib/todo.js                  (pure logic — easy to test)
│   ├── tests/todo.test.js           (5 tests, node:test)
│   └── .gitignore
│
├── claude-config/                   ← ตัวอย่าง config สำหรับ Claude Code
│   ├── CLAUDE.md                    (project instructions)
│   └── .claude/
│       ├── settings.json            (permissions + PostToolUse hook)
│       ├── commands/
│       │   └── test-all.md          (slash command /test-all)
│       └── agents/
│           └── reviewer.md          (subagent: code reviewer)
│
├── screenshots/                     ← รูป mockup ประกอบสไลด์
│   ├── 01-claude-start.png
│   ├── 02-claude-md.png
│   ├── 03-plan-mode.png
│   ├── 04-edit-diff.png
│   ├── 05-tests.png
│   ├── 06-review.png
│   └── 07-commit.png
│
└── _build/                          ← script สร้างไฟล์ (ไม่ต้องรันก็ได้)
    ├── make_screenshots.py
    └── make_pptx.py
```

---

## 🚀 ทดลองรันโปรเจกต์ตัวอย่าง

### 1) ติดตั้งและรัน Todo CLI

```bash
cd todo-app
node index.js help            # ดูคำสั่งทั้งหมด
node index.js add "buy milk"
node index.js add "write blog"
node index.js list
node index.js done 1
node index.js list
node index.js rm 2
npm test                      # run all 5 tests (node --test)
```

> ไม่ต้อง `npm install` — โปรเจกต์นี้ตั้งใจให้ **zero dependencies**

### 2) ใช้ config ตัวอย่างกับ Claude Code

```bash
# คัดลอกไฟล์ config เข้าโฟลเดอร์ todo-app
cp claude-config/CLAUDE.md            todo-app/
cp -r claude-config/.claude           todo-app/

cd todo-app
claude                        # เริ่ม session — Claude จะอ่าน CLAUDE.md อัตโนมัติ
```

จากนั้นลองสั่ง:
- `> /test-all` — รัน test ผ่าน slash command
- `> use the 'reviewer' subagent on the pending diff` — เรียก subagent
- กด **Shift+Tab** เพื่อเข้า Plan Mode ก่อนสั่งงานที่กระทบหลายไฟล์

---

## 📚 สไลด์ — 12 สไลด์ ครอบคลุมอะไรบ้าง

| # | หัวข้อ | บทที่อ้างอิงในคู่มือ |
|---|------|------------------|
| 1 | Cover | — |
| 2 | เป้าหมายและ Stack | บท 28 (Tutorial Day 2) |
| 3 | Step 1: เริ่ม Claude session | บท 1, 7 |
| 4 | Step 2: เขียน CLAUDE.md | บท 7 |
| 5 | Step 3: Plan Mode | บท 14 |
| 6 | Step 4: Implement & diff | บท 10 (Hooks) |
| 7 | Step 5: รัน Test | บท 11 (Skills) |
| 8 | Step 6: Subagent review | บท 12 (Subagents) |
| 9 | Step 7: Git commit | บท 15 (Git Integration) |
| 10 | Hooks & Skills ที่ใช้ | บท 10, 11, 12 |
| 11 | บทเรียนที่ได้ | — |
| 12 | อ่านต่อ — ลิงก์ไปยังคู่มือ | — |

> รูป screenshot ในสไลด์เป็น **mockup** ที่เรนเดอร์ด้วย Python/PIL — ไม่ใช่ภาพจาก Claude session จริง อยากได้ภาพจริงให้ทำ session ตามขั้นตอนแล้วถ่ายเอง

---

## 🛠️ สร้างใหม่ / แก้ไข

```bash
cd ProjectEx
python _build/make_screenshots.py    # regen screenshots
python _build/make_pptx.py           # rebuild both decks
```

ต้องการ:
- Python 3.9+
- `Pillow` (มากับหลายๆ Python) — ถ้าไม่มี: `pip install Pillow`
- `python-pptx` — ติดตั้งด้วย: `pip install python-pptx`

---

## 🔗 กลับสู่คู่มือหลัก

- 📕 [Claude-Code-Guide-TH.md](../Claude-Code-Guide-TH.md) — single-page TH
- 📗 [Claude-Code-Guide-EN.md](../Claude-Code-Guide-EN.md) — single-page EN
- 📚 [docs/th/](../docs/th/) · [docs/en/](../docs/en/) — atomic notes (Obsidian-friendly)
