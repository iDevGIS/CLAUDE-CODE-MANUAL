---
title: "จัดการ Cost & Token (ใช้ Claude Code อย่างประหยัด)"
section: 31
lang: th
tags:
  - claude-code
  - cost
  - tokens
  - production
  - optimization
aliases:
  - "Cost Management"
  - "Token Management"
related:
  - "[[14-context-management]]"
  - "[[32-security-best-practices]]"
  - "[[25-tips-best-practices]]"
---

# จัดการ Cost & Token

> **ทำไมเรื่องนี้สำคัญ:** ใช้ผิดวิธี เดือนละ $500 ใช้ถูกวิธี เดือนละ $50 — ต่างกัน 10 เท่า
>
> Recipe เหล่านี้ช่วยให้คุณ **ประหยัด 70-90%** โดยไม่ลด productivity

## 💰 ต้นทุน Claude Code มาจากไหน?

ทุกครั้งที่คุณคุย ระบบส่งข้อมูลไป-กลับ AI:

```
💸 Input tokens (ที่ส่งไป) + 💸 Output tokens (ที่ตอบกลับ) = ค่าใช้จ่าย
```

| Component | ตัวอย่าง |
|-----------|----------|
| **System prompt** | rule ของ Claude Code (ส่งทุกครั้ง) |
| **CLAUDE.md** | ส่งทุกครั้งใน session |
| **History** | บทสนทนาก่อนหน้าทั้งหมด |
| **File reads** | เนื้อหาไฟล์ที่ Claude อ่าน |
| **Tool results** | output จากคำสั่ง bash, search, ฯลฯ |

> ⚠️ **เกร็ด:** ค่าใช้จ่ายส่วนใหญ่ (60-80%) มาจาก **input tokens** ไม่ใช่ output

## 📊 ราคาแต่ละ Model (ประมาณ)

| Model | Input | Output | ใช้เมื่อ |
|-------|-------|--------|---------|
| **Opus 4.x** | สูง | สูง | งานยาก: refactor ใหญ่, architecture, debug ลึก |
| **Sonnet 4.x** | กลาง | กลาง | default ใช้ทั่วไป — ดีสุดด้านความคุ้ม |
| **Haiku 4.x** | ต่ำสุด | ต่ำสุด | งานง่าย: rename, format, regex, สรุปสั้น |

> 💡 ราคาเปลี่ยนได้ — เช็คล่าสุดที่ console.anthropic.com

## 🔧 วิธีลดค่าใช้จ่าย — เรียงตามผลกระทบ

### 1. ใช้ `/clear` บ่อยๆ (ลดได้ 50%+)

ทุกข้อความที่คุยจะ "สะสม" ใน context ส่งไปทุกครั้ง

```
❌ ไม่ดี: คุยตั้งแต่เช้าถึงเย็น context 100K tokens — แพงมาก
✅ ดี: เปลี่ยน task → /clear → เริ่มสด context 5K tokens
```

**กฎ:** เปลี่ยน task ใหม่ → `/clear` ทันที

### 2. ใช้ `/compact` กลางทาง

ถ้า task ยาวจริงๆ ไม่อยากเริ่มใหม่:

```
/compact
```

→ Claude สรุป history แล้วลด token ลง 70-80%

### 3. เลือก Model ตาม Task (ลดได้ 30-70%)

```
/model haiku    # งานง่าย
/model sonnet   # default
/model opus     # งานยาก
```

**Rule of thumb:**

| Task | Model | เหตุผล |
|------|-------|-------|
| rename function | Haiku | เร็ว ถูก แม่น |
| format code | Haiku | งานกลไก |
| สรุปไฟล์ | Haiku | output สั้น |
| review PR | Sonnet | ต้องเข้าใจ context |
| debug logic | Sonnet/Opus | คิดเชื่อมโยง |
| refactor architecture | Opus | คิดลึก |
| design system | Opus | ต้องการ creativity |

### 4. หลีกเลี่ยงไฟล์ใหญ่ (ลดได้ 40%+)

ทุกครั้งที่ Claude อ่านไฟล์ใหญ่ → tokens บวมทันที

```
❌ "อ่านทั้งโปรเจกต์แล้วบอกว่ามีอะไร"
   → Claude อ่านทุกไฟล์ → context ระเบิด

✅ "อ่าน @package.json และ @src/index.ts แล้วบอกว่าโปรเจกต์ทำอะไร"
   → ตรงเป้า ประหยัด
```

**Tip:**
- ใช้ `@` ระบุไฟล์ที่ต้องการ
- ใช้ Grep หา keyword ก่อนอ่านไฟล์
- ใช้ subagent อ่านไฟล์ใหญ่ → ส่งสรุปกลับ (ดู [[12-subagents]])

### 5. ใช้ Subagent กรองข้อมูลก่อน

```
ใช้ subagent หาไฟล์ที่เกี่ยวกับ user authentication
ส่งกลับมาเฉพาะ path + summary 1 บรรทัด
```

→ Subagent context จะระเบิดเอง main context สะอาด

### 6. CLAUDE.md อย่ายาวเกินไป

CLAUDE.md ส่งทุกครั้ง → ยาว = แพง

```
❌ CLAUDE.md 5000 บรรทัด
✅ CLAUDE.md 100-300 บรรทัด — เน้นกฎสำคัญ
```

ถ้าอยากใส่รายละเอียด → แยกเป็นไฟล์ doc แล้วให้ Claude อ่านตอนต้องใช้

### 7. Plan Mode ก่อน Edit ใหญ่

```
/plan
```

→ Claude คิดแผนไม่ทำ ถ้าผิดทาง ทักท้วงได้ก่อน Claude เริ่มแก้ — ไม่เสีย token แก้/rollback

### 8. Headless mode สำหรับ task ซ้ำ

```bash
# ใช้ headless บน script ที่รันบ่อย
claude -p "summarize this file: $(cat report.md)"
```

→ ไม่มี history สะสม ทุกครั้งสด

### 9. Cache ผ่าน prompt caching

ระบบ Anthropic มี **prompt caching** — ถ้าส่ง content ซ้ำ → ลดค่าใช้จ่ายได้ 90%

Claude Code เปิดให้อัตโนมัติ — แต่จะใช้ได้ดีต้อง:
- คุยต่อเนื่องในเวลา 5 นาที (cache TTL)
- อย่าเปลี่ยน CLAUDE.md กลางทาง (cache invalidate)

> ⚠️ ถ้าคุยทิ้งช่วง > 5 นาที cache หมด — เริ่มจ่ายเต็มอีก

### 10. ใช้ `/cost` เช็คเป็นระยะ

```
/cost
```

แสดง:
- Tokens ใช้ไปวันนี้
- ค่าใช้จ่าย
- breakdown ตาม model

ถ้าเห็นแพงเกินคาด → หยุดทบทวนทันที

## 📈 Workflow ประหยัดสุด

```
🌅 เริ่มวัน:
1. cd project && claude
2. /model sonnet (default)
3. /cost (เช็คเริ่มต้น)

📝 ระหว่างทำ:
4. ทำ task A → /clear → ทำ task B
5. งานง่าย → /model haiku
6. งานยาก → /model opus → ทำเสร็จ → /model sonnet
7. ก่อน edit ใหญ่ → /plan
8. ทุก 1-2 ชม → /cost เช็ค

🌆 จบวัน:
9. /cost (เช็คสรุป)
10. ถ้าเกินงบ → ทบทวนว่าใช้ผิดตรงไหน
```

## 🚦 Budget Alert (สำหรับทีม)

ตั้ง alert ใน Anthropic Console:

```
1. console.anthropic.com → Settings → Limits
2. ตั้ง daily budget เช่น $20/day
3. ตั้ง alert ที่ 80% ของ budget
4. แจ้งเตือนผ่าน email/Slack
```

## 🧮 ตัวอย่างเปรียบเทียบจริง

### Case A: Refactor Function ขนาดกลาง

**ใช้ผิด:**
```
อ่านโปรเจกต์ทั้งหมดให้หน่อย
→ บอก "function getUser แก้ยังไง"
→ คุยไปคุยมา 30 นาที
→ /cost: $4.20 💸
```

**ใช้ถูก:**
```
@src/users.ts
→ /plan: "extract validation"
→ approve
→ /cost: $0.45 ✨
```

→ ประหยัด **9 เท่า**

### Case B: PR Review

**ใช้ผิด:**
```
อ่านทั้ง branch + main แล้วเปรียบเทียบ
→ context 80K tokens
→ $2.10
```

**ใช้ถูก:**
```bash
git diff main..HEAD | claude -p "review this diff for bugs"
→ context 5K tokens
→ $0.15
```

→ ประหยัด **14 เท่า**

## ⚠️ Trap ที่หลายคนตกบ่อย

| Trap | วิธีระวัง |
|------|----------|
| คุยข้ามวันแบบไม่ /clear | ทุก task ใหม่ /clear |
| ใส่ทุกไฟล์ใน @reference | เลือกไฟล์ที่จำเป็นเท่านั้น |
| ใช้ Opus กับงานทุกอย่าง | default Sonnet |
| ปล่อย CLAUDE.md ยาว | ตัดให้สั้น |
| ไม่เช็ค /cost | เช็คทุก 1-2 ชม |
| ลืมว่า session ค้างเปิด | จบ task → /exit |

## 📊 Dashboard ส่วนตัว

สร้างไฟล์ `~/.claude/cost-log.md`:

```markdown
# Cost Log

## 2026-04-26
- Morning session: $1.20 (refactor auth)
- Afternoon: $0.80 (review PR)
- Evening: $0.40 (docs)
- Total: $2.40 ✅ (budget $5/day)

## 2026-04-25
- ...
```

→ เห็น pattern ตัวเอง → เก่งขึ้นเรื่อยๆ

## ➡️ ถัดไป

ตอนนี้คุณรู้วิธีประหยัดแล้ว — อ่านต่อเรื่องความปลอดภัย

➡️ [[32-security-best-practices|32. Security Best Practices]]

---

🌐 EN: [[../en/31-cost-management]]
