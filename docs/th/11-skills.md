---
title: "Skills (คำสั่งที่สร้างเอง)"
section: 11
lang: th
tags:
  - claude-code
  - skills
  - customization
aliases:
  - "Skills"
related:
  - "[[03-slash-commands]]"
  - "[[10-hooks]]"
  - "[[12-subagents]]"
---

# Skills (คำสั่งที่สร้างเอง)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Skills?**
>
> Skills ทำให้คุณ **สอน Claude ให้ทำงานซ้ำ ๆ ได้อย่างสม่ำเสมอ** — แทนที่จะพิมพ์คำสั่งยาว ๆ ทุกครั้ง คุณสร้าง Skill ครั้งเดียว แล้วเรียกด้วย `/ชื่อ-skill` ได้ตลอดไป

**Use Cases:**

| Skill | สถานการณ์ | ผลลัพธ์ |
|-------|----------|--------|
| **`/deploy`** | Deploy แอปทุกสัปดาห์ | พิมพ์ `/deploy staging` → Claude รัน Test, Build, Deploy, Health Check ให้ครบวงจร ไม่ลืมขั้นตอนใด |
| **`/new-component`** | สร้าง React Component บ่อย ๆ | พิมพ์ `/new-component UserCard` → Claude สร้างไฟล์ Component, Style, Test, Story ตาม Template ของทีม |
| **`/db-migrate`** | สร้าง Database Migration | พิมพ์ `/db-migrate add_email_to_users` → Claude สร้าง Migration File, เขียน Up/Down, รัน Migration |
| **`/hotfix`** | แก้ Bug ด่วนบน Production | พิมพ์ `/hotfix` → Claude สร้าง Branch จาก main, แก้ Bug, รัน Test, สร้าง PR อัตโนมัติ |
| **`/api-endpoint`** | สร้าง API Endpoint ใหม่ | พิมพ์ `/api-endpoint GET /users/:id` → Claude สร้าง Route, Controller, Service, Validator, Test ครบ |
| **`/changelog`** | สร้าง Release Notes | พิมพ์ `/changelog v2.1.0` → Claude อ่าน Git Log แล้วสร้าง Changelog ที่จัดหมวดหมู่สวยงาม |
| **`/status`** | ดูสถานะโปรเจกต์เร็ว ๆ** | พิมพ์ `/status` → เห็น Branch, Commit ล่าสุด, จำนวนไฟล์ที่เปลี่ยน, สถานะ CI |
| **`/translate`** | แปลภาษาในโปรเจกต์ i18n | พิมพ์ `/translate th` → Claude แปลไฟล์ภาษาทั้งหมดเป็นภาษาไทย |

**ตัวอย่างสถานการณ์จริง:**

```
ก่อนมี Skill "/deploy":
  1. npm run test           ← ต้องรันเอง
  2. npm run build:prod     ← ต้องจำคำสั่ง
  3. aws s3 sync ...        ← ต้องจำ Bucket
  4. aws cloudfront ...     ← ต้องจำ Distribution ID
  5. curl health-check      ← ต้องจำ URL
  → 5 ขั้นตอน ใช้เวลา 15 นาที ผิดพลาดได้ง่าย

หลังมี Skill "/deploy":
  1. พิมพ์ /deploy production
  → Claude ทำทั้ง 5 ขั้นตอนให้ ใช้เวลา 2 นาที ไม่ผิดพลาด
```

### Skills คืออะไร?

คำสั่งที่ผู้ใช้สร้างเอง ใช้เรียกด้วย `/ชื่อ-skill` หรือ Claude เรียกใช้อัตโนมัติ

### ตำแหน่งเก็บ Skills

| ตำแหน่ง | ขอบเขต |
|---------|--------|
| `~/.claude/skills/<name>/SKILL.md` | ส่วนตัว ใช้ได้ทุกโปรเจกต์ |
| `.claude/skills/<name>/SKILL.md` | โปรเจกต์ (commit ร่วมกับทีม) |
| `<plugin>/skills/<name>/SKILL.md` | จาก Plugin |

### สร้าง Skill พื้นฐาน

**ไฟล์ `.claude/skills/deploy/SKILL.md`:**

```markdown
---
name: deploy
description: Deploy แอปพลิเคชันไปยัง Production
disable-model-invocation: true
---

ทำตามขั้นตอนเหล่านี้:

1. รัน Test Suite ให้ผ่านทั้งหมด
2. Build แอปพลิเคชัน
3. Deploy ไปยัง Production
4. ตรวจสอบ Health Checks
```

ใช้งาน: พิมพ์ `/deploy` ในเซสชัน

### Frontmatter Options

```yaml
---
name: skill-name                    # ชื่อคำสั่ง
description: "ทำอะไร"                # เมื่อไหร่ที่ Claude ควรใช้
when_to_use: "ตัวกระตุ้นเพิ่มเติม"    # คำกระตุ้นเพิ่ม
argument-hint: "[file] [action]"    # คำแนะนำ Argument
disable-model-invocation: true      # เฉพาะผู้ใช้เรียก (ไม่ให้ Claude เรียกเอง)
user-invocable: false               # เฉพาะ Claude เรียก
allowed-tools: "Read,Bash"          # อนุมัติเครื่องมือล่วงหน้า
model: claude-opus-4-6              # Override โมเดล
effort: high                        # Override Effort
context: fork                       # รันใน Subagent
agent: Explore                      # ประเภท Agent
paths:                              # จำกัดเฉพาะไฟล์บางประเภท
  - "src/**/*.ts"
---
```

### Skill พร้อม Arguments

```markdown
---
name: deploy
description: Deploy ไปยัง Environment ที่ระบุ
---

Deploy ไปยัง $ARGUMENTS:

1. Build แอป
2. Deploy ไปยัง $ARGUMENTS
3. ตรวจสอบ Health Check

Environment ที่ใช้: $0
ตัวเลือกเพิ่ม: $1
```

ใช้งาน: `/deploy staging --verbose` → `$0` = staging, `$1` = --verbose

### Shell Injection ใน Skill

```markdown
---
name: status
---

สถานะปัจจุบัน:
- Branch: !`git rev-parse --abbrev-ref HEAD`
- Commit ล่าสุด: !`git log -1 --oneline`
- ไฟล์ที่เปลี่ยนแปลง: !`git status --short | wc -l`
```

คำสั่ง Shell จะถูกรันก่อนที่ Claude จะเห็นเนื้อหา

### ไฟล์ประกอบ

```
my-skill/
├── SKILL.md          # ไฟล์หลัก
├── template.md       # Template
├── examples.md       # ตัวอย่าง Output
└── scripts/
    └── validate.sh   # Script ช่วยเหลือ
```

อ้างอิงใน SKILL.md: `ดูตัวอย่างที่ [examples.md](examples.md)`

---

---

## Navigation

- ⬅️ Previous: [[10-hooks]]
- ➡️ Next: [[12-subagents]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/11-skills]]
