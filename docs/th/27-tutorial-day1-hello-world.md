---
title: "Tutorial Day 1: Hello World (30 นาทีแรก)"
section: 27
lang: th
tags:
  - claude-code
  - tutorial
  - getting-started
  - beginner
aliases:
  - "Day 1 Tutorial"
  - "Hello World"
related:
  - "[[01-installation]]"
  - "[[28-tutorial-day2-first-project]]"
  - "[[33-use-cases-analogies]]"
---

# Tutorial Day 1: Hello World (30 นาทีแรก)

> **เป้าหมาย:** ติดตั้ง → คุยกับ Claude → ให้มันสร้างไฟล์แรกให้คุณ — ภายใน 30 นาที
>
> ถ้าคุณทำตามนี้จบ คุณจะ "เห็นพลัง" ของ Claude Code แล้ว

## Claude Code คืออะไร? (อธิบายแบบคนไม่ใช่โปรแกรมเมอร์)

ลองนึกภาพว่าคุณจ้าง **เพื่อนร่วมงานที่เก่งคอมพิวเตอร์** มานั่งข้างคุณตลอดเวลา:

| คุณบอก | Claude Code ทำให้ |
|--------|------------------|
| "ช่วยอ่านไฟล์ `app.js` ให้หน่อย" | เปิดไฟล์ อ่าน อธิบายให้ฟัง |
| "แก้ bug ตรง login function" | หา bug แก้ บันทึกไฟล์ให้ |
| "สร้างเว็บ todo list" | สร้างทั้งโปรเจกต์ให้ดู |
| "commit แล้ว push" | รันคำสั่ง git ให้ |

**ต่างจาก ChatGPT ตรงไหน?**
- ChatGPT: คุยอย่างเดียว → ต้อง copy-paste โค้ดเอง
- Claude Code: **อยู่ในเครื่องคุณ** → อ่าน/เขียน/รันได้จริง

## Step 1: ติดตั้ง (5 นาที)

### Mac/Linux

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows

```powershell
irm https://claude.ai/install.ps1 | iex
```

### เช็คว่าติดตั้งสำเร็จ

```bash
claude --version
```

ถ้าขึ้นเลข version (เช่น `2.1.114`) → สำเร็จ! ถ้ายังเขียวๆ ดูที่ [[01-installation|01. การติดตั้ง]] เพิ่มเติม

## Step 2: คุยครั้งแรก (5 นาที)

สร้าง folder ทดลอง แล้วเปิด Claude:

```bash
mkdir hello-claude
cd hello-claude
claude
```

จะเข้าโหมด chat — ลองพิมพ์:

```
สวัสดี ช่วยบอกหน่อยว่าตอนนี้เราอยู่ในโฟลเดอร์ไหน
```

Claude จะ:
1. ขอ permission รันคำสั่ง `pwd` (กด **Yes** หรือ `1`)
2. รันคำสั่งจริง
3. ตอบกลับว่าอยู่ folder ไหน

**🎉 คุณคุยกับ AI ที่รันคำสั่งได้จริงเป็นครั้งแรก!**

> 💡 **Tip:** ถ้าอยากออก พิมพ์ `/exit` หรือกด `Ctrl+D`

## Step 3: ให้ Claude สร้างไฟล์ให้ (10 นาที)

ลองพิมพ์:

```
ช่วยสร้างไฟล์ hello.html มี:
- title "My First Claude Page"
- หัวข้อ h1 บอกว่า "ฉันสร้างเว็บนี้กับ Claude Code"
- background สีน้ำเงินอ่อน
- ใส่ ปุ่ม "Click me" ที่กดแล้วเด้ง alert "Hello!"
```

Claude จะ:
1. ขอ permission สร้างไฟล์
2. เขียน HTML/CSS/JS ให้
3. แสดงเนื้อหาที่จะใส่

**กด Yes** → ไฟล์ `hello.html` จะถูกสร้าง

ลองเปิดไฟล์:

```bash
# Mac
open hello.html

# Windows
start hello.html
```

🎨 **คุณเพิ่งสั่งให้ AI สร้างเว็บเพจให้ภายใน 10 วินาที**

## Step 4: ให้แก้ไข (5 นาที)

ขณะยังอยู่ใน chat พิมพ์:

```
เปลี่ยนสี background เป็นสีชมพู และเพิ่มภาพแมวจาก placeholder
```

Claude จะ:
1. **อ่านไฟล์เก่า**
2. แก้เฉพาะส่วนที่เปลี่ยน
3. แสดง diff ให้ดู

**กด Yes** → ไฟล์ถูกอัปเดต Refresh browser ดูได้เลย

> 💡 **เห็นไหม?** Claude **จำได้** ว่าเราคุยอะไรกัน ไม่ต้องอธิบายใหม่ทุกครั้ง

## Step 5: ลองสั่งให้รันคำสั่ง (5 นาที)

```
สร้าง git repo และ commit ไฟล์ hello.html ให้หน่อย
```

Claude จะรัน:
- `git init`
- `git add hello.html`
- `git commit -m "..."`

**กด Yes** ตามขั้นตอน → จบ! โปรเจกต์มี version control แล้ว

## ✅ สรุป Day 1

ภายใน 30 นาที คุณได้ทำ:
- [x] ติดตั้ง Claude Code
- [x] คุยกับ AI ที่รันคำสั่งบนเครื่องคุณได้จริง
- [x] สร้างไฟล์เว็บแรก
- [x] แก้ไขไฟล์โดยให้ Claude อ่านเองอัปเดตเอง
- [x] ใช้ git ผ่าน Claude

## ⚠️ ข้อควรระวัง Day 1

| ระวัง | เหตุผล |
|-------|-------|
| อย่าใส่ password/api key ใน chat | Claude อาจจดจำ context นี้ |
| อย่ากด "Yes to all" ตั้งแต่วันแรก | ดู [[05-permissions]] |
| อย่าให้ลบไฟล์ที่ยังไม่ commit | กู้คืนยาก |

## 🎯 Day 1 Quick Reference

| ต้องการ | พิมพ์ |
|---------|------|
| เริ่ม chat | `claude` |
| ออก | `/exit` หรือ `Ctrl+D` |
| ดู help | `/help` |
| ล้าง context | `/clear` |
| เปลี่ยน mode | `/permissions` |
| ดู cost | `/cost` |

## ➡️ ถัดไป

ตอนนี้คุณ **คุยเป็น** แล้ว — Day 2 เราจะ **สร้างโปรเจกต์จริง** กัน

➡️ [[28-tutorial-day2-first-project|Day 2: สร้าง Todo App ใน 1 ชั่วโมง]]

---

🌐 EN: [[../en/27-tutorial-day1-hello-world]]
