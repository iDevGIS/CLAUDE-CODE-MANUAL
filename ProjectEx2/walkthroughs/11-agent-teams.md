---
walkthrough: 11
title: Agent Teams — orchestrate multiple subagents
related:
  - "[[05-skills-vs-subagents]]"
  - "[[12-real-world-flow]]"
---

# 11 — Agent Teams: เรียกหลาย subagent ร่วมกันทำงาน

> เป้าหมาย: ใช้ subagent หลายตัวใน workflow เดียว

## TaskFlow มี subagent 4 ตัว

| Subagent | หน้าที่ | Tool ที่มี |
|----------|---------|-----------|
| `reviewer` | review diff | Read, Grep, git diff/log |
| `tester` | เขียนเทสต์ | Read, Edit, Write, Bash(npm test) |
| `security` | security audit | Read, Grep, git diff, rg |
| `docs-writer` | sync docs กับโค้ด | Read, Edit, git diff |

## Pattern 1: Sequential (chain)

```
> review the diff. If LGTM, run security scan. If still ok, draft commit message.
```

Claude จะ:
1. Spawn `reviewer` → รอ verdict
2. ถ้า LGTM → spawn `security` → รอ verdict
3. ถ้า SAFE → spawn (skill) `commit-formatter`

ทุก step เป็น subagent → context ของแต่ละ specialist ไม่ปน

## Pattern 2: Parallel (fan-out)

```
> in parallel: have reviewer review the diff, tester check coverage, 
  and docs-writer find drift between README and src/
```

Claude เรียก 3 subagent พร้อมกัน → เร็วขึ้น 3x (ถ้า task อิสระต่อกัน)

> ⚠️ Parallel ใช้ token เยอะกว่า sequential — ใช้เมื่องานอิสระจริง

## Pattern 3: Hierarchical (orchestrator + workers)

ทำ subagent ที่ "วางแผน" + spawn subagent ย่อย:

```yaml
---
name: tech-lead
description: Plans a feature, then delegates implementation + review + docs to specialist subagents
tools: Task, Read, Grep
model: sonnet
---

You are a tech lead. Given a feature request:
1. Read CLAUDE.md to understand project rules
2. Plan the change in 3-5 bullet points
3. Spawn specialist subagents:
   - tester: write failing tests for the new behavior
   - reviewer: review the implementation when ready
   - docs-writer: update README after merge
4. Coordinate them and report back to the user
```

`Task` tool = ความสามารถในการ spawn subagent อื่น

## Pattern 4: Hand-off (one agent's output → next agent's input)

```
> use the reviewer to find issues, then use the tester to write 
  regression tests for each issue found
```

Reviewer สรุป findings → Claude pipe เข้า tester → tester เขียน test ที่ reproduce ปัญหา

## Decision: เมื่อไหร่ใช้ team vs. ทำคนเดียว

| สถานการณ์ | ทำคนเดียว | ทีม |
|----------|----------|-----|
| งานเล็ก (< 50 บรรทัด, < 5 นาที) | ✅ | ❌ overkill |
| งานต้อง specialized knowledge | ❌ | ✅ |
| งานใหญ่ที่ context จะบาน | ❌ | ✅ ตัด context per agent |
| งานที่ต้องการความเป็น "second opinion" | ❌ | ✅ subagent เห็น diff ใหม่ |

## Cost considerations

- ทุก subagent = turn ใหม่ = ค่า token
- รวม 4 subagent ในงานเดียว = ราคาเทียบกับ 4 turn ของคุณ
- คุ้มเมื่อ: subagent specialized + main agent context ใหญ่ (ไม่อยาก flood)
- ไม่คุ้มเมื่อ: งานง่าย, main agent ทำได้เอง

## Pitfalls

- **Subagent loop** — agent A spawn B, B spawn A; ใช้ `--max-turns` หรือ "no Task tool" ใน worker
- **Context มหึมาเข้า worker** — worker ควรได้ "งานสรุป", ไม่ใช่ "ทุกอย่างที่ orchestrator มี"
- **Tool overlap** — ถ้าทุก agent มี Read/Grep/Edit เหมือนกัน → ทำไมแยก? ทบทวน: ตัด tool ที่ไม่จำเป็นออก

## Related

- **[[05-skills-vs-subagents]]** — เลือกระหว่าง skill กับ subagent
- **[[12-real-world-flow]]** — เห็น team ทำงานในตัวอย่างจริง
