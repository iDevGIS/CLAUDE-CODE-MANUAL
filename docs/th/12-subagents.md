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
model: claude-opus-5
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
model: claude-sonnet-5          # โมเดลที่ใช้
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

Claude จะ Delegate งานไปที่ Subagent อัตโนมัติเมื่อตรวจพบงานที่ตรงกับ Description (wizard `/agents` เดิมถูกถอดใน v2.1.198 — สั่ง Claude เป็นภาษาคนได้เลย เช่น "สร้าง subagent ชื่อ code-reviewer" หรือแก้ไฟล์ใต้ `.claude/agents/` ตรง ๆ)

### 🆕 ใหม่ใน v2.1.191

subagent สามารถ spawn subagent ของตัวเองได้แล้ว ซ้อนได้ลึกถึง **5 ชั้น** (foreground/background ใช้เพดานเดียวกัน; subagent ที่ resume/fork ก็นับรวมด้วย)

### 🆕 ใหม่ใน v2.1.198

- **ถอด wizard `/agents`** — สร้าง/จัดการ subagent โดยสั่ง Claude เป็นภาษาคน หรือแก้ `.claude/agents/` ตรง ๆ
- **Explore agent อัปเกรด** — ใช้โมเดลเดียวกับ session หลัก (cap ที่ Opus) แทนที่จะรัน Haiku ตลอด
- subagent และ context compaction สืบทอดการตั้งค่า **extended thinking** ของ session แล้ว

### 🆕 ใหม่ใน v2.1.212

- **เพดาน subagent ต่อ session** — spawn subagent ได้ไม่เกิน 200 ตัวต่อ session โดย default (ปรับด้วย `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`) เพื่อกันลูป delegate ไม่รู้จบ; `/clear` รีเซ็ตโควตา
- **พารามิเตอร์ `mode` ของ Task tool ถูก deprecate** (ตอนนี้ถูกเมินเฉย) — subagent สืบทอด permission mode ของ session แม่เป็นค่า default

### 🆕 ใหม่ใน v2.1.214

- **reasoning effort ใน `subagentStatusLine`** — payload มี reasoning effort ของ subagent แต่ละตัวแล้ว ทำให้แถว custom agent แสดงได้ทั้งโมเดลและ effort

### 🆕 ใหม่ใน v2.1.217

- **เพดานรันพร้อมกัน** — subagent รันพร้อมกันได้สูงสุด 20 ตัว (ปรับด้วย `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`) กันไม่ให้ข้อความเดียว fan out background agent แบบไม่จำกัด
- **ปิดการ spawn ซ้อนเป็นค่าเริ่มต้น** — subagent ไม่ spawn subagent ของตัวเองแล้วโดย default; ตั้ง `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` ถ้าต้องการให้ซ้อนลึกขึ้น

### 🆕 ใหม่ใน v2.1.218

- **ห้ามใช้ `:` ในชื่อ agent** — ไฟล์ markdown ของ agent จะ reject ชื่อ agent ที่มี `:` เพราะสงวนไว้สำหรับ plugin namespacing

### 🆕 ใหม่ใน v2.1.219

- **เปิดการ spawn ซ้อนเป็นค่าเริ่มต้น** — subagent spawn subagent ของตัวเองซ้อนได้ลึกสุด 3 ชั้นแล้วโดย default; ตั้ง `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=1` ถ้าต้องการปิดการซ้อน
- **subagent ซ้อนใน `stream-json`** — subagent ที่ถูก spawn ที่ depth 2 ขึ้นไปจะโผล่ใน output เมื่อเปิด `--forward-subagent-text` โดย key ด้วย `tool_use` id ของ Agent call ที่ spawn มัน

### 🆕 ใหม่ใน v2.1.223

- **เตือนเมื่อโมเดลของ subagent ที่ขอมาถูกจำกัด** — workflow agent, skill ที่ fork, slash command และ background agent ที่ resume จะขึ้นคำเตือนเมื่อโมเดลที่ขอถูกจำกัดสิทธิ์และต้องรันด้วยโมเดลของ parent แทน จะได้ไม่โดนสลับโมเดลแบบเงียบ ๆ

---

---

## Navigation

- ⬅️ Previous: [[11-skills]]
- ➡️ Next: [[13-agent-teams]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/12-subagents]]
