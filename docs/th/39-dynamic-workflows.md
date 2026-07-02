---
title: "Dynamic Workflows & ultracode (เจาะลึก)"
section: 39
lang: th
tags:
  - claude-code
  - workflows
  - ultracode
  - agent-teams
  - deep-dive
aliases:
  - "Dynamic Workflows"
  - "ultracode"
related:
  - "[[13-agent-teams]]"
  - "[[12-subagents]]"
  - "[[31-cost-management]]"
  - "[[41-background-agents]]"
---

# Dynamic Workflows & ultracode (เจาะลึก)

> **เป้าหมาย:** สั่ง agent หลักสิบถึงหลักร้อยตัวจากสคริปต์เดียว — เมื่อไหร่ควรใช้ เขียนยังไง และระวังอะไร

## Dynamic Workflows คืออะไร?

**Dynamic Workflows** คือการ orchestrate subagent **หลักสิบถึงหลักร้อยตัว** แบบ deterministic จากสคริปต์ JavaScript ไฟล์เดียว — จะ fan-out, ต่อเป็น pipeline, รันเป็น parallel stage, หรือวน loop-until-done ก็ได้ ต่างจากการ spawn subagent ทีละตัวตรงที่ *สคริปต์* เป็นตัวกำหนดลำดับงาน ไม่ใช่ปล่อยให้โมเดลตัดสินใจเองระหว่างทาง ตัว Workflow รันเบื้องหลัง (background) แล้วรายงานกลับมาเมื่อเสร็จ

**เหมาะกับ:**

- กวาดรีวิวให้ครบทั้งโปรเจกต์ (หา issue → verify แบบ adversarial)
- Migration ใหญ่ (ค้นหาจุดที่ต้องแก้ → แปลงทีละจุดใน worktree → verify)
- Deep research แบบ fan-out หลายสิบหัวข้อพร้อมกัน
- งานอะไรก็ตามที่ context window เดียวเก็บไม่ไหว

**ไม่เหมาะกับ:** งานง่าย ๆ — session เดียวหรือ subagent ตัวเดียวถูกกว่าและง่ายกว่าเสมอ

## เปิดใช้ยังไง

- พิมพ์ keyword **`ultracode`** ลงในพรอมป์ต (ขึ้นไฮไลต์สีม่วง) — เปลี่ยนชื่อมาจาก `workflow` ตั้งแต่ v2.1.160 คำว่า "workflow" เดี่ยว ๆ **ไม่ trigger แล้ว**
- หรือพิมพ์เป็นภาษาคนก็ได้ เช่น "run a workflow"
- กด **Backspace** ทันทีหลังพิมพ์ keyword = ยกเลิกการ trigger
- ปิด/เปิด keyword ได้ที่ `/config` → สวิตช์ **"Workflow keyword trigger"**
- `/effort ultracode` = เปิด effort tier สูงสุดบนรุ่นโมเดลที่รองรับ

## โครงสคริปต์

สคริปต์เป็น **JavaScript ธรรมดา (ไม่ใช่ TypeScript)** ต้องเริ่มด้วย `export const meta = { name, description, phases }` ที่เป็น **literal ล้วน** (ห้ามมีการคำนวณ) จากนั้นใช้ hook เหล่านี้ได้:

| Hook | ทำอะไร |
|------|--------|
| `agent(prompt, opts)` | spawn subagent 1 ตัว — `opts` มี `label`, `phase`, `schema` (JSON Schema → คืน object ที่ validate แล้ว), `model`, `effort`, `isolation: 'worktree'` (ได้ git worktree ของตัวเอง ไว้แก้ไฟล์ขนานกัน), `agentType` |
| `parallel([...thunks])` | รันพร้อมกันแล้ว **รอครบทุกตัว** (barrier) — thunk ที่ fail คืนค่า `null` |
| `pipeline(items, stage1, stage2, ...)` | แต่ละ item ไหลผ่าน stage ของตัวเองอิสระ **ไม่มี barrier ระหว่าง stage** — ตัวเลือกแรกสำหรับงานหลาย stage |
| `phase(title)` / `log(message)` | จัดกลุ่มความคืบหน้า / ส่งข้อความ progress |
| `args` | input ที่ส่งเข้ามาให้ workflow |
| `budget` | ตัวช่วยงบ token — `budget.total`, `budget.remaining()` |

> ⚠️ **ใช้ `Date.now()` / `Math.random()` ในสคริปต์ไม่ได้** — สองตัวนี้ทำให้การ resume แบบ deterministic พัง

**ตัวอย่าง — review 2 phase: หาแบบขนาน แล้ว verify ทีละ finding**

```js
export const meta = {
  name: 'review-sweep',
  description: 'Parallel finders, then adversarial verify per finding',
  phases: ['find', 'verify'],
};

// Phase 1 — fan-out finders (parallel = barrier: waits for all)
phase('find');
const modules = args.modules ?? ['auth', 'payments', 'api'];
const found = await parallel(modules.map((m) => () =>
  agent(`Review the ${m} module for correctness bugs. Report file:line and a one-line description per finding.`, {
    label: `find-${m}`,
    phase: 'find',
    schema: {
      type: 'object',
      properties: { findings: { type: 'array', items: { type: 'string' } } },
      required: ['findings'],
    },
  })
));

// Phase 2 — each finding flows through verify on its own (no barrier)
phase('verify');
const findings = found.filter(Boolean).flatMap((r) => r.findings); // failed finders resolved to null
log(`Verifying ${findings.length} findings — budget left: ${budget.remaining()}`);

const results = await pipeline(findings, (f) =>
  agent(`Try to DISPROVE this finding; confirm only if reproducible from the code: ${f}`, {
    phase: 'verify',
    schema: {
      type: 'object',
      properties: { confirmed: { type: 'boolean' }, reason: { type: 'string' } },
      required: ['confirmed', 'reason'],
    },
  })
);

log(`Done — ${results.filter((r) => r && r.confirmed).length} confirmed issues`);
```

## แพตเทิร์นหลัก

| แพตเทิร์น | สูตร |
|-----------|------|
| **Fan-out** | แตกงานเป็น N ชิ้น → `parallel(items.map((x) => () => agent(...)))` — รอครบทุกตัวก่อนไปต่อ |
| **Pipeline** | `pipeline(items, find, fix, verify)` — แต่ละชิ้นไหลไป stage ถัดไปทันทีที่เสร็จ ไม่ต้องรอเพื่อน |
| **Adversarial verify** | ส่งผลจาก agent "ผู้หา" ให้ agent ตัวใหม่พยายาม **หักล้าง** — เหลือเฉพาะ finding ที่ยืนยันได้จริง |
| **Loop-until-done** | วน `while` เรียก `agent()` ซ้ำ จนผลลัพธ์ (validate ผ่าน `schema`) บอกว่าผ่านเงื่อนไขแล้ว |

## ดูความคืบหน้า

- Workflow รันเบื้องหลัง — ใช้ session ต่อได้ตามปกติ เสร็จแล้วมันรายงานเอง
- `/workflows` — ดู progress สด ในหน้า agent detail กด `f` เพื่อ filter ตามสถานะ (v2.1.186)
- **Resume ได้:** แก้สคริปต์แล้วสั่งรันต่อจาก run ID เดิม — agent call ที่เสร็จไปแล้ว replay จาก cache ไม่เผา token ซ้ำ (นี่คือเหตุผลที่ `Date.now()` / `Math.random()` ถูกห้าม)

## ข้อจำกัด & ค่าใช้จ่าย

> ⚠️ **อ่านก่อนกดรัน**
>
> - Agent ที่รันพร้อมกันถูก cap ราว ๆ **min(16, จำนวน CPU core − 2)** ต่อ workflow — ตัวที่เกินเข้าคิวรอ
> - เพดานตลอดอายุของ run เดียว: **1,000 agents**
> - Workflow spawn agent เป็นสิบเป็นร้อยตัว → **token คูณเร็วมาก** — เริ่มจากชุดเล็ก ๆ ก่อน คอยเช็ค `/usage` และเลือก `pipeline()` แทนการเพิ่ม stage แบบ barrier โดยไม่จำเป็น

## ใช้คู่กับ

- [[13-agent-teams]] — ทีม agent แบบโต้ตอบที่แชร์ task list และให้โมเดลประสานกันเอง เหมาะกับงานที่ต้อง "คุยกัน" ส่วน workflow เหมาะกับงานปริมาณมากที่กำหนดลำดับล่วงหน้าได้
- [[41-background-agents]] — งานเบื้องหลังรูปแบบอื่นของ Claude Code (workflow เองก็เป็น background run แบบหนึ่ง)

---

---

## Navigation

- ⬅️ Previous: [[38-cheat-sheet]]
- ➡️ Next: [[40-claude-in-chrome]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/39-dynamic-workflows]]
