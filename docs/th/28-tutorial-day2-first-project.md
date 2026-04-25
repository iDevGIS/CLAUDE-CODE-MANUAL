---
title: "Tutorial Day 2: สร้าง Todo App ใน 1 ชั่วโมง"
section: 28
lang: th
tags:
  - claude-code
  - tutorial
  - project
  - beginner
aliases:
  - "Day 2 Tutorial"
  - "First Project"
related:
  - "[[27-tutorial-day1-hello-world]]"
  - "[[29-tutorial-day3-power-user]]"
  - "[[07-claude-md]]"
  - "[[15-git-integration]]"
---

# Tutorial Day 2: สร้าง Todo App ใน 1 ชั่วโมง

> **เป้าหมาย:** สร้างโปรเจกต์จริงตั้งแต่ศูนย์ → มีไฟล์โครงสร้างเหมือนโปรเจกต์มืออาชีพ → push ขึ้น GitHub
>
> ใช้ Tutorial นี้เป็น **template** สำหรับโปรเจกต์ของคุณเองได้

## เตรียมพร้อม

- ✅ ทำ [[27-tutorial-day1-hello-world|Day 1]] เสร็จแล้ว
- ✅ มี Node.js ติดตั้งอยู่ (`node --version`)
- ✅ มี GitHub account (เผื่อ push ขึ้น)

## Phase 1: เริ่มโปรเจกต์ (10 นาที)

```bash
mkdir my-todo
cd my-todo
claude
```

ใน chat พิมพ์:

```
ฉันอยากสร้าง todo app แบบ web ใช้ HTML+CSS+JS ล้วนๆ ไม่เอา framework
ต้องการ:
- เพิ่มงาน
- ติ๊กเสร็จ/ยกเลิก
- ลบงาน
- เก็บข้อมูลใน localStorage (ไม่หายแม้ refresh)

ก่อนเริ่ม ช่วยวางโครงสร้างโปรเจกต์ให้ดูก่อน อย่าเพิ่งเขียนโค้ด
```

> 🧠 **เคล็ดลับ:** บอกให้ "วางโครงสร้างก่อน" → Claude จะตอบเป็นแผน ไม่กระโดดเขียนเลย — ทำให้คุณคุม direction ได้

Claude จะเสนอโครงสร้างประมาณนี้:

```
my-todo/
├── index.html
├── style.css
├── app.js
├── README.md
└── .gitignore
```

ถ้าโอเค ตอบ:

```
เริ่มเลย สร้างให้ครบทุกไฟล์
```

Claude จะสร้างให้ทีละไฟล์ — กด **Yes** ผ่านไป

## Phase 2: ทดลองรัน (5 นาที)

```bash
# Mac
open index.html

# Windows
start index.html
```

ลองเพิ่ม-ลบ-ติ๊กงาน → refresh ดูว่าหายไหม (ไม่ควรหาย)

**ถ้าเจอ bug:** ไม่ต้องแก้เอง! แค่บอก Claude:

```
ตอนติ๊กแล้ว refresh มันกลับมาเป็นค่าเดิม ช่วยแก้ที
```

Claude จะ:
1. อ่านโค้ดที่เพิ่งเขียน
2. เห็น bug
3. เสนอแก้
4. แก้ให้

## Phase 3: เพิ่มฟีเจอร์ (15 นาที)

ลองสั่งทีละอย่าง:

### 3.1 เพิ่มหมวดหมู่
```
เพิ่มฟีเจอร์ category ให้แต่ละงาน เลือกได้ 3 หมวด: งาน, บ้าน, ส่วนตัว
สีแยกกัน
```

### 3.2 ค้นหา
```
เพิ่มช่องค้นหาด้านบน พิมพ์แล้วกรอง todo แบบ real-time
```

### 3.3 Counter
```
แสดงจำนวนงานเหลือ/ทั้งหมด ที่หัวเว็บ เช่น "3/10 เหลือทำ"
```

> 💡 ทำทีละ feature → ดูผล → ค่อยขอต่อ ดีกว่าขอครั้งเดียว 5 อย่าง

## Phase 4: เขียน CLAUDE.md (10 นาที)

นี่คือ **เคล็ดลับมืออาชีพ** — บอก Claude ให้สร้างไฟล์ memory ของโปรเจกต์

```
สร้าง CLAUDE.md อธิบายโปรเจกต์นี้ ใส่:
- โปรเจกต์อะไร
- โครงสร้างไฟล์
- ฟีเจอร์ที่มี
- code style ที่ใช้
- คำสั่งที่ใช้บ่อย
```

Claude จะสร้าง `CLAUDE.md` — ครั้งหน้าเปิด chat ใน folder นี้ Claude จะอ่านไฟล์นี้อัตโนมัติ → **จำได้** ว่าโปรเจกต์อะไร ไม่ต้องอธิบายใหม่!

> 📖 ดูเพิ่ม: [[07-claude-md|07. CLAUDE.md]]

## Phase 5: ทำ Git + GitHub (15 นาที)

### 5.1 Initial commit

```
สร้าง .gitignore สำหรับโปรเจกต์ web พื้นฐาน
แล้ว init git, commit แรก message ว่า "Initial todo app"
```

### 5.2 สร้าง repo บน GitHub

ใน browser:
1. ไป github.com → New repository → ชื่อ `my-todo`
2. **อย่ากด "Add README"** (เรามีแล้ว)
3. Create

GitHub จะแสดงคำสั่ง — **copy แต่ตัวที่มี `git remote add` กับ `git push`**

### 5.3 ให้ Claude push

กลับมา chat:

```
push ขึ้น GitHub remote: <paste URL>
```

Claude จะ:
- `git remote add origin ...`
- `git branch -M main`
- `git push -u origin main`

## Phase 6: README ดีๆ (5 นาที)

```
เขียน README.md ให้สวย ใส่:
- screenshot placeholder
- features list
- demo link
- how to run
- tech stack
```

Refresh repo บน GitHub → มี README สวยๆ แล้ว!

## ✅ สรุป Day 2

คุณได้:
- [x] โปรเจกต์ที่ใช้ได้จริง
- [x] โครงสร้างเหมือนมืออาชีพ
- [x] CLAUDE.md ที่ทำให้ Claude จำได้
- [x] Git + GitHub setup
- [x] README สวยๆ

## 🎯 บทเรียนสำคัญจาก Day 2

| สิ่งที่เรียนรู้ | ทำไมสำคัญ |
|----------------|----------|
| **บอกแผนก่อนเขียน** | ป้องกัน Claude หลุดทิศทาง |
| **CLAUDE.md** | ครั้งหน้าไม่ต้องเริ่มจากศูนย์ |
| **ทำทีละ feature** | debug ง่ายกว่า |
| **อย่าแก้เอง** | บอก Claude เป็นภาษาคนเลย |

## 🐛 ถ้าเจอปัญหา

| ปัญหา | ทำไง |
|-------|------|
| Claude เขียนโค้ดแล้วยาวเกินจอ | บอก "อย่าเพิ่งเขียน เล่าแผนก่อน" |
| ทำผิดไปแล้วอยากย้อน | `git checkout .` หรือบอกให้ Claude rollback |
| Context หาย/วน | `/clear` แล้วเริ่มใหม่ |
| ไม่รู้ว่ามันแก้อะไร | บอก "git diff ดู" |

## ➡️ ถัดไป

Day 3 จะเรียน **slash commands, subagents, scoped sessions** — ทำให้คุณกลายเป็น **Power User**

➡️ [[29-tutorial-day3-power-user|Day 3: Power User Tricks]]

---

🌐 EN: [[../en/28-tutorial-day2-first-project]]
