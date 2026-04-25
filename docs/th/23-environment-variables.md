---
title: "Environment Variables"
section: 23
lang: th
tags:
  - claude-code
  - environment-variables
  - reference
aliases:
  - "Environment Variables"
related:
  - "[[06-configuration]]"
  - "[[05-permissions]]"
---

# Environment Variables

### ประโยชน์และ Use Cases

> **ทำไมต้องรู้จัก Environment Variables?**
>
> Environment Variables ช่วยให้คุณ **ควบคุม Claude Code ผ่านตัวแปรสภาพแวดล้อม** — เหมาะกับการตั้งค่าใน CI/CD, Docker, หรือสภาพแวดล้อมที่แก้ไฟล์ Config ไม่สะดวก

**Use Cases:**

| ตัวแปร | Use Case | คำอธิบาย |
|--------|----------|----------|
| `ANTHROPIC_API_KEY` | ใช้ใน CI/CD | ตั้ง API Key ใน GitHub Secrets แล้ว Claude ใช้ได้เลยใน Actions |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | ใช้ใน Shared Environment | ปิด Memory เมื่อหลายคนใช้เครื่องเดียวกัน ป้องกันข้อมูลปน |
| `CLAUDE_CODE_SIMPLE` | ใช้ใน Script | เปิด Bare Mode อัตโนมัติ Output สะอาด ไม่มี UI |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | ทดลอง Agent Teams | เปิดฟีเจอร์ทดลอง Agent Teams |
| `CLAUDE_CONFIG_DIR` | ใช้หลาย Config | ชี้ไปที่ Config Directory อื่น เหมาะกับการทดสอบ |

### ตัวแปรสภาพแวดล้อมสำคัญ

| ตัวแปร | อธิบาย |
|--------|--------|
| `ANTHROPIC_API_KEY` | API Key สำหรับยืนยันตัวตน |
| `CLAUDE_CONFIG_DIR` | Override ไดเรกทอรี Config |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | ไดเรกทอรีเก็บ Debug Log |
| `CLAUDE_CODE_SIMPLE` | เปิดโหมด Bare |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | ปิด Auto Memory |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | ปิด Background Tasks |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | เปิด Agent Teams |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | ใช้ PowerShell แทน Bash |
| `CLAUDE_SESSION_ID` | ระบุ Session ID |
| `CLAUDE_CODE_TASK_LIST_ID` | ตั้งชื่อ Task List |

### ตั้งค่าใน settings.json

```json
{
  "env": {
    "NODE_ENV": "development",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

---

## Navigation

- ⬅️ Previous: [[22-directory-structure]]
- ➡️ Next: [[24-troubleshooting]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/23-environment-variables]]
