---
title: "Subagents (ตัวช่วยเฉพาะทาง)"
section: 12
lang: th
tags:
  - claude-code
  - subagents
  - agents
aliases:
  - "Subagents"
related:
  - "[[13-agent-teams]]"
  - "[[11-skills]]"
---

# Subagents (ตัวช่วยเฉพาะทาง)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Subagents?**
>
> Subagents คือ **AI ผู้เชี่ยวชาญเฉพาะด้าน** ที่ทำงานแยก Context — เมื่องานต้องการความเชี่ยวชาญหลายด้าน Claude หลักจะ "มอบหมาย" งานให้ Subagent ที่เหมาะสม แล้วรวบรวมผลลัพธ์ เหมือนหัวหน้าทีมที่มีลูกทีมเฉพาะทาง

**Use Cases:**

| Subagent | Use Case | ตัวอย่างจริง |
|----------|----------|------------|
| **Explore Agent** | สำรวจ Codebase ขนาดใหญ่ | คุณถาม "Authentication ทำงานยังไง?" → Claude ส่ง Explore Agent ไปค้นหาไฟล์ที่เกี่ยวข้อง อ่านโค้ดหลายไฟล์ แล้วสรุปกลับมา — ไม่เปลือง Context ของ Claude หลัก |
| **Plan Agent** | วางแผนงานซับซ้อน | คุณบอก "ย้ายจาก REST ไป GraphQL" → Plan Agent วิเคราะห์ Endpoint ทั้งหมด เสนอแผนทีละขั้นตอน ระบุ Dependencies |
| **Security Reviewer** | รีวิว Security | Claude มอบหมายให้ Security Agent ตรวจโค้ดหา OWASP Vulnerabilities รายงานผลพร้อมระดับความรุนแรง |
| **Test Writer** | เขียน Test เฉพาะทาง | Claude มอบหมายให้ Test Agent เขียน Test ครอบคลุมทุก Edge Case โดยเฉพาะ |
| **Performance Analyzer** | วิเคราะห์ Performance | Agent ค้นหา N+1 Queries, Memory Leaks, ช่องทางที่ช้า แล้วเสนอวิธีแก้ |
| **Documentation Writer** | เขียนเอกสาร | Agent อ่านโค้ดทั้งหมดแล้วสร้าง API Documentation, README, Architecture Docs |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: คุณอยากรีแฟคเตอร์โปรเจกต์ขนาดใหญ่ (500+ ไฟล์)

ถ้าไม่มี Subagent:
  Claude อ่านไฟล์ทั้งหมดเอง → Context เต็มเร็วมาก → ลืมสิ่งที่อ่านก่อนหน้า
  → ทำงานได้ไม่ดี

มี Subagent:
  1. Claude ส่ง Explore Agent ไปสำรวจ → ได้สรุปโครงสร้างโปรเจกต์
  2. Claude ส่ง Plan Agent ไปวางแผน → ได้แผนรีแฟคเตอร์ทีละขั้น
  3. Claude ลงมือแก้ไขตามแผน → ส่ง Security Agent ตรวจสอบ
  → ทำงานได้ดีเพราะแต่ละ Agent มี Context แยก ไม่กินพื้นที่กัน
```

### Subagents คืออะไร?

AI ผู้ช่วยเฉพาะทางที่ทำงานใน Context Window แยก เหมาะกับงานที่ต้องการความเชี่ยวชาญเฉพาะด้าน

### ประเภท Built-in

| ประเภท | อธิบาย |
|--------|--------|
| `Explore` | สำรวจ, ค้นหา, อ่านไฟล์เท่านั้น |
| `Plan` | วางแผน, วิเคราะห์กลยุทธ์ |
| `general-purpose` | Agent ทั่วไป (ค่าเริ่มต้น) |

### สร้าง Custom Subagent

**ไฟล์ `.claude/agents/security-reviewer/agent.md`:**

```markdown
---
description: "รีวิวโค้ดด้านความปลอดภัย"
model: claude-opus-4-6
tools:
  - Read
  - Grep
  - Glob
  - Bash(npm audit *)
---

คุณเป็น Security Reviewer เฉพาะทาง

เมื่อรีวิวโค้ด:
1. ตรวจหา OWASP Top 10 Vulnerabilities
2. ตรวจสอบ Input Validation
3. ตรวจหา Hardcoded Secrets
4. ตรวจ SQL Injection, XSS, CSRF
5. รายงานผลเป็นภาษาไทย พร้อมระดับความรุนแรง
```

### Frontmatter Options

```yaml
---
description: "..."              # เมื่อไหร่ที่ Claude จะ Delegate งานมา
model: claude-sonnet-4-6        # โมเดลที่ใช้
tools:                          # เครื่องมือที่อนุญ��ต
  - Read
  - Bash
  - Edit
permissionMode: plan            # Override Permission Mode
skills:                         # Skills ที่โหลดมาด้วย
  - my-skill
mcpServers:                     # MCP ที่โหลดมาด้วย
  - puppeteer
preloadSkills: true             # โหลด Skill ตั้งแต่เริ่ม
---
```

### การใช้งาน

Claude จะ Delegate งานไปที่ Subagent อัตโนมัติเมื่อตรวจพบงานที่ตรงกับ Description หรือดูรายการด้วย:

```
/agents
```

---

---

## Navigation

- ⬅️ Previous: [[11-skills]]
- ➡️ Next: [[13-agent-teams]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/12-subagents]]
