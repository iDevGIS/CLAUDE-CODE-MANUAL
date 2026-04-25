---
title: "Scheduled Tasks (งานตั้งเวลา)"
section: 20
lang: th
tags:
  - claude-code
  - scheduled-tasks
  - automation
aliases:
  - "Scheduled Tasks"
related:
  - "[[16-headless-mode]]"
  - "[[19-session-management]]"
---

# Scheduled Tasks (งานตั้งเวลา)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Scheduled Tasks?**
>
> Scheduled Tasks ทำให้ Claude **ทำงานอัตโนมัติตามเวลาที่กำหนด** — ไม่ต้องจำว่าต้องรันอะไร เมื่อไหร่ Claude ทำให้เอง

**Use Cases:**

| งานตั้งเวลา | ความถี่ | ผลลัพธ์ |
|------------|--------|--------|
| **Daily Code Review** | ทุกเช้า 9:00 | Claude รีวิวโค้ดที่ Commit เมื่อวาน หา Bug/Security Issue รายงานผลทุกเช้า |
| **Weekly Dependency Check** | ทุกวันจันทร์ | Claude ตรวจสอบ Dependencies ที่ Outdated หรือมี Vulnerability แจ้งเตือนทุกสัปดาห์ |
| **Hourly Health Check** | ทุกชั่วโมง | Claude ตรวจสอบ Error Log ถ้ามี Error Pattern ใหม่ แจ้งเตือนทันที |
| **Daily Documentation Update** | ทุกเย็น 18:00 | Claude อัปเดต API Docs ให้ตรงกับโค้ดล่าสุด |
| **Monthly Performance Report** | ทุกต้นเดือน | Claude วิเคราะห์ Code Quality Metrics สร้างรายงานรายเดือน |
| **Monitor Deployment** | `/loop 5m` | ตรวจสอบ Health Check ทุก 5 นาทีหลัง Deploy |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: ทีมลืมอัปเดต Dependencies บ่อย ทำให้มี Vulnerability สะสม

ก่อนมี Scheduled Tasks:
  → ลืมเช็ค Dependencies 3 เดือน → Audit เจอ 47 Vulnerabilities → ต้องแก้ทั้งหมดพร้อมกัน

หลังมี Scheduled Tasks:
  → Claude ตรวจทุกวันจันทร์ → เจอ 2-3 Vulnerabilities → แก้ทันที ไม่สะสม
  → ทีมปลอดภัยตลอด โดยไม่ต้องจำเรื่องนี้
```

### Scheduled Tasks ใน Desktop App

| ความถี่ | อธิบาย |
|--------|--------|
| Manual | รันด้วยตัวเอง |
| Hourly | ทุกชั่วโมง |
| Daily | ทุกวัน |
| Weekdays | วันจันทร์-ศุกร์ |
| Weekly | ทุกสัปดาห์ |

**สร้างผ่าน Desktop UI หรือ:**
```
ตั้งค่า Daily Code Review ที่รันตอน 9 โมงเช้า
```

### /loop - ทำซ้ำในเซสชัน

```
/loop 5m "ตรวจสอบ Error ใน Log"
```

ทำซ้ำทุก 5 นาทีในเซสชันปัจจุบัน

### /schedule - Cloud Routines

```
/schedule
```

สร้างงานตั้งเวลาบน Anthropic Infrastructure:
- ทำงานแม้คอมพิวเตอร์ปิด
- เรียกจาก API หรือ GitHub Event ได้
- Clone Repo ใหม่ทุกครั้ง

---

---

## Navigation

- ⬅️ Previous: [[19-session-management]]
- ➡️ Next: [[21-special-features]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/20-scheduled-tasks]]
