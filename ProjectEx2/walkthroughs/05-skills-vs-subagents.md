---
walkthrough: 05
title: Skills vs Subagents — เลือกใช้ตัวไหน
related:
  - "[[04-hooks-lifecycle]]"
  - "[[11-agent-teams]]"
---

# 05 — Skills vs Subagents: เลือกตัวไหนเมื่อไหร่

> เป้าหมาย: เข้าใจความต่างให้ลึก เลือกเครื่องมือที่ "เบา" สุดที่งานต้องการ

## TL;DR

| ลักษณะ | Skill | Subagent |
|-------|-------|----------|
| โหลดเข้า context | เฉพาะตอน "ใช้" (lazy) | ทำงานใน context แยก |
| Tool ที่ใช้ | tool หลักของ session | จำกัดได้ (`tools: Read, Grep, ...`) |
| Output | กลับมาในคำตอบเดียวกัน | สรุปเป็น text แล้วกลับเข้ามา |
| ราคา | ถูก (อยู่ใน turn เดียว) | แพงกว่า (turn แยก) |
| ใช้กับ | งาน "format / template / playbook" | งาน "investigate / review / specialize" |

## ของจริงใน TaskFlow

### Skill — `commit-formatter` (`.claude/skills/commit-formatter/SKILL.md`)

ใช้เมื่อ:
- "ช่วยเขียน commit message"
- "draft PR title"

มันเป็น **playbook** — Claude ยังเป็น Claude อยู่ แค่หยิบ template + rules มาใช้

### Subagent — `reviewer` (`.claude/agents/reviewer.md`)

ใช้เมื่อ:
- "review the diff"
- ต้องการความเห็นที่ "ไม่ติด context" ของ session ปัจจุบัน

มัน spawn **session ใหม่** มี system prompt เฉพาะ + tool set จำกัด → ป้องกัน context contamination + คุมราคา

## รูปแบบทั่วไป

```
Skill = "ฉันอยากให้ Claude ทำสิ่งนี้ในสไตล์นี้"
       → Skill ตัวอย่าง: commit-formatter, code-reviewer-checklist, write-adr

Subagent = "ฉันอยากได้ความเห็นที่ specialized + แยก context"
         → Subagent ตัวอย่าง: reviewer, security, tester, docs-writer
```

## Decision tree

```
มีงานต้องทำ
   ↓
ต้อง investigate / read หลายไฟล์ / ใช้เวลา?
   ├─ Yes → Subagent (ป้องกัน context flood)
   └─ No  →
              ต้อง output ตาม format/style เฉพาะ?
              ├─ Yes → Skill (template + rules)
              └─ No  → ทำเองใน turn ปกติ
```

## ตัวอย่าง: เปรียบเทียบ workflow เดียวกัน

### แบบ skill-only

```
> @commit-formatter draft a commit
[ Claude อ่าน skill, ดูง diff, format → ตอบใน turn เดียวกัน ]
```

### แบบ subagent

```
> /review
[ /review เรียก reviewer subagent → spawn turn ใหม่ → 
  reviewer ใช้แค่ Read/Grep/git diff → สรุป LGTM/NEEDS WORK กลับมา ]
```

## เมื่อไหร่ใช้ทั้งคู่

```
> use the reviewer subagent on the diff, then if LGTM, 
  use commit-formatter to draft the commit message
```

→ Claude เรียก reviewer (subagent) ก่อน, ถ้าผ่าน, เรียก commit-formatter (skill) ทีหลัง

## Pitfalls

- **Skill ไม่ควรมี tool list** — ใช้ tool ของ session
- **Subagent ควรมี tool list แคบ** — ป้องกันไม่ให้ทำเกินขอบเขต
- **Subagent ที่ tool list กว้าง = แพงและช้า** — เริ่มสงสัยว่า prompt ใหญ่แล้วยัง — ตัวเลือก: split เป็นหลาย agent
- **Skill ที่ยาวเกิน 500 บรรทัด** — แตกเป็นหลาย skill หรือเป็น sub-skill files

## Related

- **[[11-agent-teams]]** — ใช้หลาย subagent ร่วมกัน
- **[[04-hooks-lifecycle]]** — hook ≠ skill/subagent (hook เป็น mechanism ระดับล่าง)
