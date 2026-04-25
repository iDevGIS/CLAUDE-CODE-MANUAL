---
title: "การติดตั้งและเริ่มต้นใช้งาน"
section: 1
lang: th
tags:
  - claude-code
  - installation
  - setup
aliases:
  - "การติดตั้ง"
related:
  - "[[02-cli-commands]]"
  - "[[06-configuration]]"
---

# การติดตั้งและเริ่มต้นใช้งาน

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Claude Code?**
>
> Claude Code เปลี่ยนวิธีการทำงานของนักพัฒนาซอฟต์แวร์อย่างสิ้นเชิง แทนที่จะต้องเขียนโค้ดทุกบรรทัดเอง ค้นหา Stack Overflow ถาม ChatGPT แล้ว Copy-Paste กลับมา — Claude Code ทำงานอยู่ **ภายในโปรเจกต์ของคุณโดยตรง** สามารถอ่านไฟล์ แก้ไขโค้ด รันคำสั่ง และจัดการ Git ได้เหมือนเพื่อนร่วมทีมที่นั่งข้างกัน

**Use Cases หลัก:**

| สถานการณ์ | ตัวอย่างการใช้งาน |
|----------|-----------------|
| **นักพัฒนามือใหม่** | เข้าโปรเจกต์ใหม่ ให้ Claude อธิบายโครงสร้างโค้ด, สอนวิธี Build, อธิบายฟังก์ชันที่ซับซ้อน |
| **แก้ Bug ด่วน** | วาง Error Message แล้วให้ Claude หาสาเหตุและแก้ไขโค้ดให้ |
| **เขียนฟีเจอร์ใหม่** | อธิบายสิ่งที่ต้องการ Claude จะสร้างไฟล์ เขียนโค้ด เขียน Test ให้ครบ |
| **รีแฟคเตอร์โค้ดเก่า** | ให้ Claude วิเคราะห์โค้ดที่ซ้ำซ้อนแล้วปรับปรุงให้ Clean ขึ้น |
| **เขียน Test** | ให้ Claude อ่านโค้ดแล้วเขียน Unit Test / Integration Test ให้ |
| **Code Review** | ให้ Claude รีวิว PR หา Bug, Security Issue, Performance Problem |
| **สร้าง Documentation** | ให้ Claude อ่านโค้ดแล้วเขียนเอกสารให้อัตโนมัติ |
| **แปลงโค้ด** | ย้าย JavaScript → TypeScript, REST → GraphQL, Class → Functional |
| **DevOps** | เขียน Dockerfile, CI/CD Pipeline, Infrastructure as Code |
| **เรียนรู้เทคโนโลยีใหม่** | ถาม Claude เกี่ยวกับ Framework/Library ที่ไม่เคยใช้ พร้อมดูตัวอย่างจริงในโปรเจกต์ |

### วิธีการติดตั้ง

**macOS / Linux / WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Homebrew (macOS):**
```bash
brew install --cask claude-code
```

**WinGet (Windows):**
```powershell
winget install Anthropic.ClaudeCode
```

### เริ่มต้นใช้งาน

```bash
# เข้าไปในโฟลเดอร์โปรเจกต์
cd your-project

# เริ่ม Claude Code
claude

# ล็อกอิน (ครั้งแรก)
claude auth login

# ล็อกอินด้วย API Key จาก Anthropic Console
claude auth login --console

# ตรวจสอบสถานะการยืนยันตัวตน
claude auth status
```

### แพลตฟอร์มที่รองรับ

| แพลตฟอร์ม | รายละเอียด |
|-----------|-----------|
| Terminal CLI | ฟีเจอร์ครบถ้วนที่สุด |
| VS Code Extension | ใช้ผ่าน VS Code ได้โดยตรง |
| JetBrains IDEs | IntelliJ, PyCharm, WebStorm ฯลฯ |
| Desktop App | macOS, Windows |
| Web | claude.ai/code |
| iOS App | ใช้งานบนมือถือได้ |
| Slack Integration | ใช้ผ่าน Slack |
| GitHub Actions / GitLab CI | ใช้ใน CI/CD Pipeline |

---

---

## Navigation

- ➡️ Next: [[02-cli-commands]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/01-installation]]
