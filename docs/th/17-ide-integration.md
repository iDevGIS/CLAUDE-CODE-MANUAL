---
title: "IDE Integration"
section: 17
lang: th
tags:
  - claude-code
  - ide
  - editor
aliases:
  - "IDE Integration"
related:
  - "[[09-mcp-servers]]"
  - "[[15-git-integration]]"
---

# IDE Integration

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ IDE Integration?**
>
> IDE Integration ทำให้คุณ **ใช้ Claude Code ได้โดยไม่ต้องออกจาก Editor** — เห็น Diff แบบ Visual, คลิกลิงก์ไฟล์ได้, Select โค้ดแล้วส่งให้ Claude ได้ทันที ทำงานได้ลื่นไหลกว่า CLI อย่างเดียว

**Use Cases:**

| Use Case | IDE | คำอธิบาย |
|----------|-----|----------|
| **Highlight โค้ดแล้วให้ Claude อธิบาย** | VS Code | Select โค้ดที่ไม่เข้าใจ → Claude อธิบายให้ทันที ไม่ต้อง Copy-Paste |
| **เห็น Diff แบบ Visual ก่อน Approve** | VS Code / Desktop | เห็นสีแดง/เขียวว่า Claude แก้อะไรบ้าง ก่อนตัดสินใจ Accept |
| **อ้างอิงไฟล์ด้วย @** | VS Code | พิมพ์ `@src/auth.ts` → Claude อ่านไฟล์นั้นทันที ไม่ต้อง Copy-Paste เนื้อหาไฟล์ |
| **ดู Task List ขณะทำงาน** | VS Code / Desktop | เห็นรายการ Task ที่ Claude กำลังทำ ติดตามความคืบหน้าได้ |
| **ทำงานหลาย Tab พร้อมกัน** | Desktop | เปิดหลาย Session ในหลาย Tab ทำงานหลายงานคู่ขนาน |
| **ใช้ Claude ระหว่าง Debug** | JetBrains | Claude เห็น Context ของ IDE เช่น Variable Values, Stack Trace |

### VS Code Extension

**ติดตั้ง:**
1. เปิด Extensions (`Ctrl+Shift+X`)
2. ค้นหา "Claude Code"
3. กด Install

**ฟีเจอร์:**
- แสดง Diff แบบ Visual
- ใช้ `@` เพื่ออ้างอิงไฟล์
- รีวิวแผนก่อนลงมือทำ
- ประวัติบทสนทนา
- คลิกลิงก์ไฟล์เพื่อเปิดตรง ๆ

**การตั้งค่า VS Code:**
- `claudeCode.initialPermissionMode` - โหมด Permission เริ่มต้น

### JetBrains IDEs

**ติดตั้ง:**
1. เปิด Settings > Plugins
2. ค้นหา "Claude Code" ใน Marketplace
3. กด Install

**ฟีเจอร์:**
- รัน Claude ใน Integrated Terminal
- คีย์ลัดเหมือน CLI
- เข้าถึง Context ของ IDE ได้

### Desktop App

**ฟีเจอร์เพิ่มเติม:**
- รีวิว Diff แบบ Visual
- เปิดหลายเซสชันใน Tab
- UI สำหรับ Scheduled Tasks
- แสดงสถานะ PR
- Git Isolation

---

---

## Navigation

- ⬅️ Previous: [[16-headless-mode]]
- ➡️ Next: [[18-plugins]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/17-ide-integration]]
