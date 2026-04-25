---
title: "Cookbook: รวมสูตรแก้ปัญหาเฉพาะ (40+ Recipes)"
section: 30
lang: th
tags:
  - claude-code
  - cookbook
  - recipes
  - reference
aliases:
  - "Cookbook"
  - "Recipes"
related:
  - "[[29-tutorial-day3-power-user]]"
  - "[[33-use-cases-analogies]]"
  - "[[26-real-world-workflows]]"
---

# Cookbook: รวมสูตรแก้ปัญหาเฉพาะ

> **วิธีใช้:** Ctrl+F หาคำที่อยากทำ → copy prompt → ปรับนิดหน่อย → ใช้
>
> ทุก recipe คือ prompt ที่ผ่านการทดสอบแล้ว

## 📂 Section A: Code Reading & Understanding

### Recipe 1: เข้าโปรเจกต์ใหม่ ไม่รู้จะเริ่มอ่านตรงไหน

```
ฉันเพิ่งเข้ามาในโปรเจกต์นี้ ช่วย:
1. อธิบายโครงสร้างโดยรวม
2. ชี้ entry point หลัก
3. แสดง dependency graph แบบสั้น
4. แนะนำว่าควรอ่านไฟล์ไหนก่อน
อย่าเพิ่งอ่านลึก แค่ overview
```

### Recipe 2: อ่านไฟล์ใหญ่ที่งงๆ

```
อธิบาย @src/some-huge-file.ts ให้ฟังทีละ section
แบ่งเป็น: purpose / inputs / outputs / side effects
ไม่ต้องอธิบายโค้ดทุกบรรทัด เน้น "ทำไม" มากกว่า "อะไร"
```

### Recipe 3: Reverse engineer API ที่ไม่มี doc

```
หา API endpoint ทั้งหมดในโปรเจกต์ พร้อม:
- HTTP method
- path
- request body shape
- response shape
- ที่ใช้ middleware อะไร
สร้างเป็น OpenAPI spec ให้
```

## 📂 Section B: Bug Fixing

### Recipe 4: แก้ bug จาก error message

```
เจอ error นี้:
[paste error]

ช่วย:
1. หา root cause
2. หาไฟล์ที่เกี่ยวข้อง
3. เสนอ fix พร้อมเหตุผล
อย่าแก้จนกว่าฉันจะ approve
```

### Recipe 5: bug ที่ reproduce ยาก

```
มี bug: [อธิบาย]
- เกิดเฉพาะ production
- ไม่เห็น error log
- ลูกค้ารายงานเป็นบางครั้ง

ช่วยหา:
1. logging ที่ขาด → ใส่เพิ่ม
2. race condition ที่เป็นไปได้
3. edge case ที่ test ไม่ครอบคลุม
```

### Recipe 6: regression — เคยใช้ได้แล้วพัง

```
feature นี้เคยใช้ได้ commit ABC123 ตอนนี้พัง
git bisect ดูว่า commit ไหนทำให้พัง แล้วอธิบายว่าเปลี่ยนอะไร
```

## 📂 Section C: Refactoring

### Recipe 7: ลดโค้ดซ้ำซ้อน

```
หาโค้ดที่ซ้ำกัน 3 ครั้งขึ้นไปใน @src/
รายงานเป็น list:
- ที่ไหนซ้ำกับที่ไหน
- ความเหมือนกี่ %
- ควรแยกเป็น utility function ไหม
อย่าเพิ่งแก้
```

### Recipe 8: แตกไฟล์ใหญ่

```
@src/giant-file.ts มี 2000 บรรทัด ช่วยเสนอวิธีแตก:
- โดยไม่ทำให้ test พัง
- รักษา public API เดิม
- bundle size ไม่บวม
แสดงเป็นแผนก่อน อย่าเพิ่งแตก
```

### Recipe 9: เปลี่ยน pattern ทั้งโปรเจกต์

```
เปลี่ยนทุก class component เป็น functional + hooks
ทำทีละไฟล์ commit ทีละครั้ง
เริ่มจากไฟล์ที่ง่ายที่สุดก่อน
```

## 📂 Section D: Testing

### Recipe 10: เขียน test ให้โค้ดเก่า

```
เขียน unit test ให้ @src/utils/parser.ts
- 80%+ coverage
- ครอบคลุม happy path + edge cases
- ใช้ vitest
- mock external dependencies เท่านั้น
```

### Recipe 11: หา test ที่ขาด

```
รัน coverage report
รายงาน function ที่ coverage < 50%
จัด priority ตาม:
1. critical path (auth, payment, ฯลฯ)
2. complexity (cyclomatic complexity สูง)
```

### Recipe 12: debug flaky test

```
test นี้บางครั้งผ่าน บางครั้งไม่ผ่าน:
[paste test code]

หา:
- async race condition
- shared state กับ test อื่น
- dependency on time/order
```

## 📂 Section E: Code Review

### Recipe 13: review PR ของคนอื่น

```
review diff นี้: $(git diff main..feature/xyz)

ตรวจ:
1. logic bugs
2. security issues (SQL injection, XSS)
3. performance regressions
4. naming inconsistency
5. ขาด test
รายงานตาม priority: 🔴 must fix / 🟡 nice to have / 🟢 info
```

### Recipe 14: review code ตัวเองก่อน push

```
git diff
ตรวจสำหรับ:
- console.log ที่ลืมลบ
- secrets ที่ leak
- code style ผิด
- ลืม update test
```

## 📂 Section F: Documentation

### Recipe 15: เขียน README

```
อ่านโปรเจกต์แล้วเขียน README.md ใส่:
- 1-paragraph description (ไม่เกิน 50 คำ)
- Features (bullet list, สั้น)
- Quick Start (copy-paste ได้เลย)
- Tech Stack (เป็น badge)
- Project Structure (folder tree)
- Contributing (กระชับ)
- License
ใช้ tone ที่เป็นมิตร
```

### Recipe 16: doc สำหรับฟังก์ชันสำคัญ

```
เขียน JSDoc ให้ทุก exported function ใน @src/api/
ครอบคลุม:
- summary
- @param พร้อม type
- @returns
- @throws
- @example
```

### Recipe 17: API doc

```
สร้าง API documentation จาก endpoint ที่มี
output เป็น Markdown ใส่:
- ตาราง endpoints
- request/response example
- auth requirements
- error codes
```

## 📂 Section G: Migration

### Recipe 18: JS → TS

```
migrate @src/utils/ จาก JavaScript ไป TypeScript
- ใส่ type ที่จำเป็น
- ห้ามใช้ any
- รักษา behavior เดิม
- update test ให้ผ่าน
ทำทีละไฟล์ commit ทีละครั้ง
```

### Recipe 19: REST → GraphQL

```
ออกแบบ GraphQL schema จาก REST API ปัจจุบัน
- รวม endpoint ที่ซ้ำซ้อน
- ลด over-fetching
- รักษา breaking change ให้น้อยที่สุด
```

### Recipe 20: เปลี่ยน framework

```
plan การ migrate Express → Fastify
- list breaking changes
- จัดลำดับ migration
- ระบุ risk แต่ละขั้น
- เสนอ rollback plan
```

## 📂 Section H: Performance

### Recipe 21: หา bottleneck

```
profile โปรเจกต์ → หา function ที่ช้าสุด 10 อันดับ
แต่ละอันบอก:
- ทำไมช้า
- วิธีแก้ที่เป็นไปได้
- effort vs impact
```

### Recipe 22: ลด bundle size

```
analyze webpack bundle
- หา dependency ที่หนักเกิน
- เสนอ alternative ที่เบากว่า
- หา dead code
- เสนอ code splitting strategy
```

### Recipe 23: optimize SQL

```
review SQL queries ใน @src/db/
หา:
- N+1 queries
- missing indexes
- unnecessary joins
- queries ที่ควร cache
```

## 📂 Section I: Git

### Recipe 24: ทำ commit message ดีๆ

```
git diff --staged
สร้าง commit message ตาม Conventional Commits
- type ถูกต้อง (feat/fix/refactor/docs/test)
- scope ตามไฟล์ที่แก้
- subject < 50 chars
- body อธิบาย "why" ไม่ใช่ "what"
```

### Recipe 25: cleanup branches

```
list local branches ที่ merge ไปแล้ว และไม่ได้ใช้ > 30 วัน
แสดงคำสั่งลบให้
อย่าลบจนกว่าฉันจะ approve
```

### Recipe 26: rebase แบบไม่พัง

```
ฉันมี 5 commits ใน feature branch อยากรวมเหลือ 1
ทำ interactive rebase ให้ปลอดภัย:
- backup branch ก่อน
- แสดง plan
- อธิบายแต่ละ step
```

## 📂 Section J: DevOps

### Recipe 27: เขียน Dockerfile

```
เขียน Dockerfile สำหรับโปรเจกต์ Node.js นี้
- multi-stage build
- non-root user
- minimal final image
- health check
- secrets ผ่าน env (ไม่ฝังใน image)
```

### Recipe 28: GitHub Actions CI

```
สร้าง .github/workflows/ci.yml
- ทำเมื่อ push to main + PR
- step: install / lint / test / build
- cache npm
- fail fast
- รายงาน coverage
```

### Recipe 29: rollback plan

```
deploy version ใหม่แล้ว metric แย่ลง
plan rollback:
- revert commit หรือ deploy old image?
- ขั้นตอน
- ตรวจสอบหลัง rollback
- post-mortem template
```

## 📂 Section K: Security

### Recipe 30: security review

```
review @src/api/auth/ สำหรับ:
- SQL injection
- timing attack
- weak crypto
- session fixation
- secrets ใน log
รายงานเป็น CVSS score
```

### Recipe 31: dependency audit

```
รัน npm audit
สำหรับ vulnerability แต่ละตัว:
- impact ต่อโปรเจกต์เรา
- มี fix ไหม
- workaround ถ้า fix ไม่มี
จัด priority
```

> 📖 ดูเพิ่ม: [[32-security-best-practices]]

## 📂 Section L: Productivity

### Recipe 32: สร้าง TODO อัตโนมัติ

```
อ่านโค้ดทั้งหมด หา:
- TODO/FIXME/HACK comments
- console.log/print ที่ค้าง
- function ที่ไม่ได้ใช้
- ไฟล์ที่ไม่ได้ commit > 7 วัน
ทำเป็น issue list พร้อม priority
```

### Recipe 33: ช่วยเขียน PR description

```
git diff main..HEAD
เขียน PR description:
- Summary (3 bullet)
- What changed
- Why (link issue ถ้ามี)
- Test plan (checklist)
- Screenshots placeholder
```

### Recipe 34: standup notes

```
git log --since="1 day ago" --author=$(git config user.email)
สรุปเป็น standup notes:
- Yesterday: ทำอะไร
- Today: จะทำอะไร
- Blockers: มีไหม
```

## 📂 Section M: Learning

### Recipe 35: สอนเทคโนโลยีใหม่

```
ฉันใช้ Vue เป็น แต่ไม่เคยใช้ Svelte
ใช้ตัวอย่างจาก @src/ ที่เป็น Vue
แปลเป็น Svelte ทีละ component
อธิบายความแตกต่างของแต่ละแนวคิด
```

### Recipe 36: explain like I'm 5

```
อธิบาย concept "dependency injection" ให้คนที่ไม่เคยเขียน OOP
ใช้ analogy ในชีวิตประจำวัน
จากนั้นยกตัวอย่างใน @src/ ของเรา
```

### Recipe 37: design pattern ที่เหมาะ

```
ปัญหา: [อธิบาย]
- design pattern ไหนเหมาะ 3 ตัวเลือก
- แต่ละตัวข้อดี/ข้อเสีย
- แนะนำตัวที่เหมาะกับโปรเจกต์เรา
- เขียน sample code
```

## 📂 Section N: Emergency

### Recipe 38: server พังตอนนี้

```
production พังตอนนี้:
- error: [paste]
- log: [paste]

ช่วย:
1. หา root cause เร็วที่สุด
2. quick fix (ลด blast radius)
3. proper fix (เสนอทีหลัง)
อย่ารอ test — เน้นกลับมาทำงานก่อน
```

### Recipe 39: ลบไฟล์ผิด

```
ฉันลบไฟล์ผิด: [path]
ยังไม่ได้ commit ลบ
git status / git stash list / git reflog
หาวิธีกู้คืน
```

### Recipe 40: leak secret

```
เพิ่งเห็นว่า .env push ขึ้น GitHub
ช่วย:
1. revoke secrets ทันที (list ที่ต้อง revoke)
2. ลบจาก git history (BFG หรือ filter-branch)
3. force push (อันตราย — แสดง command พร้อมเตือน)
4. notify team
```

> 📖 ดูเพิ่ม: [[32-security-best-practices]]

## 🎯 สูตรลับ: Prompt ที่ใช้ได้ทุก task

### Prompt Template

```
[CONTEXT] โปรเจกต์เป็น...
[GOAL] ฉันต้องการ...
[CONSTRAINTS] ห้าม.../ต้อง...
[OUTPUT] ต้องการผลในรูปแบบ...
[STEP] ทำทีละขั้น/ครั้งเดียว
```

### Words ที่ทำให้ Claude ทำงานดีขึ้น

| คำ | ทำให้ |
|----|-------|
| "อธิบายแผนก่อน" | ไม่กระโดดเขียน |
| "อย่าแก้จนกว่า approve" | ปลอดภัย |
| "ทีละไฟล์/commit" | ตามได้ |
| "ห้าม..." | กันความผิดพลาด |
| "เปรียบเทียบ 3 ทาง" | เห็น tradeoff |
| "ระบุ risk" | คิดรอบคอบ |

## ➡️ ถัดไป

➡️ [[31-cost-management|31. จัดการ Cost & Token]]
➡️ [[32-security-best-practices|32. Security Best Practices]]

---

🌐 EN: [[../en/30-cookbook-recipes]]
