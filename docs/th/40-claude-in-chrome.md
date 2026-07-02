---
title: "Claude in Chrome (สั่งงานเบราว์เซอร์)"
section: 40
lang: th
tags:
  - claude-code
  - chrome
  - browser
  - automation
  - deep-dive
aliases:
  - "Claude in Chrome"
  - "Browser Automation"
related:
  - "[[21-special-features]]"
  - "[[03-slash-commands]]"
  - "[[32-security-best-practices]]"
  - "[[39-dynamic-workflows]]"
---

# Claude in Chrome (สั่งงานเบราว์เซอร์)

> **เป้าหมาย:** ให้ Claude เปิดเว็บ อ่านหน้า คลิก กรอกฟอร์ม และ debug frontend ได้จากใน session เดียวกับที่แก้โค้ด

### Claude in Chrome คืออะไร

Claude in Chrome คือการเชื่อม Claude Code เข้ากับ **Google Chrome จริง ๆ ของคุณ** ผ่าน Chrome extension — Claude แก้โค้ดเสร็จแล้ว "เปิดเบราว์เซอร์ดูผลเอง" ได้เลย ไม่ต้องสลับหน้าจอไปคลิกทดสอบด้วยมือ วนลูป แก้โค้ด → เปิดเว็บ → อ่าน error → แก้ต่อ จบได้ในเซสชันเดียว

> **สถานะ: Generally Available (GA)** ตั้งแต่ Claude Code **v2.1.198** — ก่อนหน้านี้อยู่ในสถานะ preview

### ติดตั้ง & เชื่อมต่อ

1. **ติดตั้ง Claude Chrome extension** ใน Google Chrome — ดูลิงก์ดาวน์โหลดจากเอกสารทางการ: <https://docs.claude.com/claude-code>
2. **Login extension ด้วยบัญชีเดียวกัน** กับที่ login Claude Code — **ต้อง login บัญชีเดียวกัน** เท่านั้น (เวอร์ชันก่อนหน้าเคยมีอาการ "เชื่อมไม่ติดแบบเงียบ ๆ" เมื่อบัญชีของ extension ไม่ตรงกับ CLI ซึ่งถูกแก้ไขแล้ว แต่กติกาบัญชีเดียวกันยังคงเดิม)
3. ใน CLI พิมพ์ `/chrome` เพื่อ **เลือกว่า Claude in Chrome จะใช้เบราว์เซอร์/โปรไฟล์ไหน**
4. หรือเปิด Claude Code พร้อม flag `--chrome` ตั้งแต่ตอน launch ก็ได้

```
/chrome
```

> องค์กรที่ต้องการควบคุมการใช้งาน (enterprise policies) ดูรายละเอียดในเอกสารทางการ: <https://docs.claude.com/claude-code>

### ทำอะไรได้บ้าง

| ความสามารถ | อธิบาย |
|------------|--------|
| **เปิด URL** | นำทางไปหน้าเว็บที่ต้องการ เช่น dev server ของโปรเจกต์ |
| **อ่านเนื้อหาหน้า** | อ่าน text/เนื้อหาของหน้าเว็บมาใช้ต่อในเซสชัน |
| **หา Element** | ค้นหาปุ่ม ลิงก์ ช่องกรอก บนหน้าเว็บ |
| **คลิก & พิมพ์** | คลิก element และพิมพ์ข้อความเหมือนผู้ใช้จริง |
| **กรอกฟอร์ม** | กรอกฟอร์มหลายช่องให้อัตโนมัติ |
| **Screenshot** | ถ่ายภาพหน้าจอของหน้าเว็บมาให้ดู |
| **อ่าน Console** | อ่าน console messages ของเบราว์เซอร์ — เหมาะมากกับการ debug frontend error |
| **อ่าน Network** | อ่าน network requests — ดูว่า API call ไหน fail, status อะไร |
| **จัดการแท็บ** | เปิด/ปิด/สลับแท็บ |
| **อัด GIF** | บันทึก GIF สั้น ๆ ของการโต้ตอบบนหน้าเว็บ ไว้แนบรายงานหรือ PR |

### เคสใช้จริง

- **ตรวจ UI ทันทีหลังแก้โค้ด** — แก้เสร็จให้ Claude เปิด dev server แล้วคลิกไล่ flow เองเลย

  ```text
  เปิด http://localhost:3000 แล้วลอง submit ฟอร์มสมัครสมาชิก ดูว่า error อะไรขึ้นใน console
  ```

- **Reproduce บั๊กที่ผู้ใช้รายงาน** — ให้ Claude ทำตามขั้นตอนเดียวกับผู้ใช้ แล้วเก็บหลักฐานจาก console/network

  ```text
  ผู้ใช้บอกว่ากดปุ่ม Checkout แล้วหน้าค้าง — เปิด http://localhost:3000/cart
  ทำตามขั้นตอนเดียวกัน แล้วดู network requests ว่า request ไหนค้างหรือ fail
  ```

- **กรอกฟอร์มทดสอบซ้ำ ๆ** — งานน่าเบื่อที่ Claude ทำแทนได้

  ```text
  กรอกฟอร์มลงทะเบียนที่ http://localhost:3000/register ด้วยข้อมูลทดสอบ 5 ชุด
  แล้วสรุปว่าชุดไหนผ่าน/ไม่ผ่าน validation เพราะอะไร
  ```

- **อ่าน docs/dashboard ที่ต้อง login** — ใช้เบราว์เซอร์ที่ login ค้างไว้อยู่แล้ว แทนการ fetch แบบไม่มี session

  ```text
  เปิดแท็บ monitoring dashboard ที่ login ไว้ แล้วสรุปว่า service ไหนมี error rate สูงผิดปกติ
  ```

- **Debug อาการ "เครื่องผมรันได้นะ"** — อ่าน console + network จากเบราว์เซอร์จริง แทนการเดา

  ```text
  เปิดหน้า /profile แล้วอ่าน console กับ network requests
  เช็คว่า asset หรือ API ตัวไหนขึ้น 404 หรือ CORS error
  ```

### ความปลอดภัย

> **⚠️ ใช้เบราว์เซอร์ผ่าน AI = ต้องระวังเป็นพิเศษ**
>
> - ทุก action ในเบราว์เซอร์ผ่าน **permission prompt แบบเดียวกับ tool อื่น** — อ่านก่อน approve ทุกครั้งว่า Claude กำลังจะคลิก/กรอกอะไร
> - ลิงก์จากอีเมลหรือหน้าเว็บที่ไม่รู้จัก ให้ถือว่า **น่าสงสัยไว้ก่อนเสมอ**
> - **อย่าให้ Claude ทำงานกับบัญชีอ่อนไหว** เช่น ธนาคาร การเงิน บัญชีที่ผูกการชำระเงิน
> - แนะนำให้ใช้ **Chrome profile แยกต่างหาก** สำหรับ automation โดยเฉพาะ ไม่ปนกับ profile ส่วนตัว
> - รันหลาย session พร้อมกันได้ — การท่องเว็บของแต่ละ session ถูก **แยกเป็น tab group ของตัวเอง** ไม่ปนกัน

แนวปฏิบัติความปลอดภัยฉบับเต็ม อ่านต่อที่ [[32-security-best-practices]]

---

---

## Navigation

- ⬅️ Previous: [[39-dynamic-workflows]]
- ➡️ Next: [[41-background-agents]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/40-claude-in-chrome]]
