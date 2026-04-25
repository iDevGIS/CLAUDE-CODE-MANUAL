---
title: "จำลอง Flow การทำงานจริง"
section: 26
lang: th
tags:
  - claude-code
  - workflows
  - use-cases
aliases:
  - "จำลอง Flow การทำงาน"
related:
  - "[[25-tips-best-practices]]"
  - "[[15-git-integration]]"
---

# จำลอง Flow การทำงานจริง

> **หัวข้อนี้จำลองการใช้งาน Claude Code ในสถานการณ์จริงตั้งแต่ต้นจนจบ**  
> แต่ละ Flow แสดงขั้นตอนที่นักพัฒนาทำจริง ๆ ในแต่ละวัน พร้อมคำสั่งและสิ่งที่ Claude ตอบกลับ

---

### Flow 1: เข้าโปรเจกต์ใหม่วันแรก (Onboarding)

> **สถานการณ์:** คุณเป็นนักพัฒนาที่เพิ่งเข้าทีม ได้รับ Repository ใหม่ที่ไม่เคยเห็นมาก่อน ต้องทำความเข้าใจโปรเจกต์ให้เร็วที่สุด

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: Clone โปรเจกต์และเปิด Claude Code               │
└─────────────────────────────────────────────────────────────────┘

$ git clone https://github.com/company/ecommerce-api.git
$ cd ecommerce-api
$ claude

  ┌──────────────────────────────────────┐
  │  Claude Code v1.x                    │
  │  Model: Claude Opus 4.6              │
  │  Permission: default                 │
  │  Project: ecommerce-api              │
  └──────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: ให้ Claude สร้าง CLAUDE.md                       │
└─────────────────────────────────────────────────────────────────┘

คุณ: /init

Claude: กำลังวิเคราะห์โปรเจกต์...
  ✓ อ่าน package.json → Node.js + TypeScript + Express
  ✓ อ่าน tsconfig.json → Strict mode, ESNext
  ✓ อ่าน docker-compose.yml → PostgreSQL + Redis
  ✓ สำรวจโครงสร้างไดเรกทอรี → 156 ไฟล์ใน 23 โฟลเดอร์
  ✓ อ่าน .eslintrc → Airbnb style
  ✓ อ่าน jest.config.ts → Test framework: Jest

  สร้าง CLAUDE.md เรียบร้อย ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: ถาม Claude เกี่ยวกับโปรเจกต์                     │
└─────────────────────────────────────────────────────────────────┘

คุณ: อธิบายสถาปัตยกรรมของโปรเจกต์นี้ให้หน่อย ผมเพิ่งเข้ามาใหม่

Claude: (ใช้ Explore Agent สำรวจ Codebase)

  โปรเจกต์นี้เป็น E-commerce REST API ใช้ Clean Architecture:

  📁 src/
  ├── controllers/     ← รับ Request, เรียก Service
  ├── services/        ← Business Logic หลัก
  ├── repositories/    ← Database Layer (TypeORM)
  ├── entities/        ← Database Models
  ├── middleware/       ← Auth, Logging, Error Handler
  ├── routes/          ← Express Routes
  ├── validators/      ← Zod Schemas
  └── utils/           ← Helper Functions

  Flow หลัก:
  Route → Middleware → Controller → Service → Repository → Database

  Entities หลัก: User, Product, Order, Payment, Cart
  Auth: JWT + Refresh Token
  Payment: Stripe Integration
  Cache: Redis สำหรับ Product Catalog
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 4: ลองรันโปรเจกต์                                   │
└─────────────────────────────────────────────────────────────────┘

คุณ: ช่วย Setup Development Environment ให้หน่อย

Claude: ตรวจสอบ Prerequisites...
  ✓ Node.js v20 — ติดตั้งแล้ว
  ✓ Docker — ติดตั้งแล้ว
  ✗ .env file — ยังไม่มี

  กำลังสร้าง .env จาก .env.example...
  [แก้ไข .env] ✓

  กำลังรัน docker-compose up -d...
  [รัน Bash: docker-compose up -d] ✓ PostgreSQL + Redis เริ่มแล้ว

  กำลังติดตั้ง Dependencies...
  [รัน Bash: npm install] ✓

  กำลังรัน Migrations...
  [รัน Bash: npm run db:migrate] ✓

  กำลังรัน Seed Data...
  [รัน Bash: npm run db:seed] ✓

  กำลังเริ่ม Dev Server...
  [รัน Bash: npm run dev] ✓ Server running on http://localhost:3000

  ✅ พร้อมใช้งาน! ลองเปิด http://localhost:3000/api/health
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 5: บันทึกข้อมูลส่วนตัวลง Memory                     │
└─────────────────────────────────────────────────────────────────┘

คุณ: จำไว้ว่าผมเป็น Backend Developer ชำนาญ Python/Django
     เพิ่งเริ่มเขียน TypeScript เป็นโปรเจกต์แรก

Claude: บันทึกแล้ว ✓
  ต่อไปเมื่ออธิบายเรื่อง TypeScript ผมจะเทียบกับ Python/Django ให้ครับ
```

**สรุป Flow:** `/init` → ถามสถาปัตยกรรม → Setup Dev → บันทึก Memory  
**เวลาที่ใช้:** ~10 นาที (ปกติใช้ 1-2 วัน ในการทำความเข้าใจโปรเจกต์ใหม่)

---

### Flow 2: แก้ Bug ที่ถูกรายงานจาก Production

> **สถานการณ์:** ได้รับ Bug Report ว่า "ลูกค้ากดสั่งซื้อแล้ว Order ซ้ำ 2 รายการ" ต้องหาสาเหตุและแก้ไข

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: เปิดเซสชันและอธิบาย Bug                          │
└─────────────────────────────────────────────────────────────────┘

$ claude

คุณ: มี Bug ที่ Production — ลูกค้ากดปุ่ม "Place Order" แล้ว Order ซ้ำ 2 รายการ
     เกิดเฉพาะตอนเน็ตช้า ลูกค้ากดปุ่มหลายครั้ง
     ช่วยหาสาเหตุและแก้ไขให้หน่อย
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: Claude วิเคราะห์ปัญหา (Plan Mode)                │
└─────────────────────────────────────────────────────────────────┘

Claude: เข้าใจครับ นี่คือปัญหา Idempotency ของ Order Creation
  ให้ผมวิเคราะห์ก่อนนะครับ

  [อ่าน src/controllers/order.controller.ts]
  [อ่าน src/services/order.service.ts]
  [อ่าน src/routes/order.routes.ts]
  [อ่าน src/middleware/]

  🔍 พบสาเหตุแล้ว:

  ไฟล์ src/services/order.service.ts:45
  ฟังก์ชัน createOrder() ไม่มีการป้องกัน Duplicate Request:

  1. ❌ ไม่มี Idempotency Key — Request ซ้ำจะสร้าง Order ใหม่ทุกครั้ง
  2. ❌ ไม่มี Database Lock — Race Condition เมื่อ 2 Request เข้าพร้อมกัน
  3. ❌ ไม่มีการ Disable ปุ่มหลังกด — Frontend ส่ง Request ซ้ำได้

  📋 แผนแก้ไข:
  1. เพิ่ม Idempotency Key ใน Order API (Backend — แก้จริง)
  2. เพิ่ม Database Unique Constraint (ป้องกัน Race Condition)
  3. เพิ่ม Redis Lock สำหรับ Order Creation (ป้องกัน Concurrent)
  4. เขียน Test ครอบคลุม

  จะเริ่มแก้ไขเลยไหมครับ?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: สลับเป็น acceptEdits แล้วให้ Claude แก้ไข        │
└─────────────────────────────────────────────────────────────────┘

คุณ: เริ่มเลย

  [กด Shift+Tab → สลับเป็น acceptEdits]

Claude: เริ่มแก้ไขครับ

  📝 แก้ไขไฟล์ 1/4: src/middleware/idempotency.middleware.ts (สร้างใหม่)
  [สร้างไฟล์] ✓ Idempotency Middleware ที่ใช้ Redis เก็บ Key

  📝 แก้ไขไฟล์ 2/4: src/services/order.service.ts
  [แก้ไข createOrder()] ✓ เพิ่ม Redis Lock + Idempotency Check

  📝 แก้ไขไฟล์ 3/4: src/routes/order.routes.ts
  [แก้ไข] ✓ เพิ่ม Idempotency Middleware ใน POST /orders

  📝 แก้ไขไฟล์ 4/4: src/entities/order.entity.ts
  [แก้ไข] ✓ เพิ่ม Unique Constraint บน idempotencyKey column

  🗄️ สร้าง Migration:
  [รัน Bash: npm run db:migration:create AddIdempotencyKey] ✓
  [แก้ไข migration file] ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 4: Claude เขียน Test                                │
└─────────────────────────────────────────────────────────────────┘

Claude: กำลังเขียน Test...

  📝 สร้าง src/__tests__/order-idempotency.test.ts
  [สร้างไฟล์] ✓

  Test Cases:
  ✓ ส่ง Order ปกติ → สร้างได้ 1 รายการ
  ✓ ส่ง Order ซ้ำด้วย Idempotency Key เดียวกัน → ได้ Order เดิมกลับมา
  ✓ ส่ง Order ซ้ำพร้อมกัน (Concurrent) → สร้างแค่ 1 รายการ
  ✓ ส่ง Order ใหม่ด้วย Key ต่างกัน → สร้าง Order ใหม่ได้
  ✓ Idempotency Key หมดอายุหลัง 24 ชม. → สร้าง Order ใหม่ได้

  กำลังรัน Test...
  [รัน Bash: npm test src/__tests__/order-idempotency.test.ts]

  ✅ Tests: 5 passed, 0 failed
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 5: Commit และสร้าง PR                               │
└─────────────────────────────────────────────────────────────────┘

คุณ: /commit

Claude: วิเคราะห์การเปลี่ยนแปลง...
  4 ไฟล์แก้ไข, 2 ไฟล์สร้างใหม่, 1 migration

  Commit Message:
  "fix: prevent duplicate order creation with idempotency key

   Add Redis-based idempotency middleware to prevent duplicate orders
   when customers submit multiple requests. Includes database unique
   constraint and distributed lock for race condition prevention."

  [git add + git commit] ✓

คุณ: /pr

Claude: สร้าง Pull Request...
  Branch: fix/duplicate-order-creation
  Title: "Fix: Prevent duplicate order creation"
  Description: ## Summary
  - Add idempotency middleware using Redis
  - Add distributed lock on order creation
  - Add unique constraint on idempotency_key column
  ...

  ✅ PR #142 สร้างเรียบร้อย → https://github.com/company/ecommerce-api/pull/142
```

**สรุป Flow:** อธิบาย Bug → Claude วิเคราะห์ → แก้ไข 6 ไฟล์ → เขียน 5 Tests → Commit + PR  
**เวลาที่ใช้:** ~15 นาที (ปกติใช้ 2-4 ชั่วโมง)

---

### Flow 3: สร้างฟีเจอร์ใหม่ตั้งแต่ศูนย์

> **สถานการณ์:** Product Manager ต้องการระบบ "Wishlist" ให้ลูกค้าบันทึกสินค้าที่สนใจ ต้องสร้าง API ใหม่ทั้งหมด

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: วางแผนก่อนลงมือทำ                                │
└─────────────────────────────────────────────────────────────────┘

$ claude

คุณ: /plan
     สร้างระบบ Wishlist ให้ลูกค้าบันทึกสินค้าที่สนใจ
     - ลูกค้าเพิ่ม/ลบสินค้าใน Wishlist ได้
     - ดูรายการ Wishlist ของตัวเอง
     - แจ้งเตือนเมื่อสินค้าใน Wishlist ลดราคา
     - จำกัด 50 รายการต่อ User

Claude: 📋 แผนการพัฒนาระบบ Wishlist

  ขั้นตอนที่ 1 — Database Layer
  ├── สร้าง Entity: WishlistItem (userId, productId, addedAt, notifyOnSale)
  ├── สร้าง Migration
  └── สร้าง Repository: WishlistRepository

  ขั้นตอนที่ 2 — Business Logic
  ├── สร้าง WishlistService
  │   ├── addToWishlist() — เพิ่มสินค้า (จำกัด 50)
  │   ├── removeFromWishlist() — ลบสินค้า
  │   ├── getWishlist() — ดูรายการ (pagination)
  │   ├── isInWishlist() — ตรวจสอบว่าอยู่ใน Wishlist หรือไม่
  │   └── notifyPriceDrop() — แจ้งเตือนลดราคา
  └── สร้าง Zod Validators

  ขั้นตอนที่ 3 — API Layer
  ├── POST   /api/wishlist          — เพิ่มสินค้า
  ├── DELETE  /api/wishlist/:productId — ลบสินค้า
  ├── GET    /api/wishlist          — ดูรายการ
  ├── GET    /api/wishlist/check/:productId — ตรวจสอบ
  └── สร้าง Controller + Routes

  ขั้นตอนที่ 4 — Price Drop Notification
  ├── สร้าง Event Listener สำหรับ Product Price Change
  ├── เชื่อมต่อกับ Email Service
  └── สร้าง Notification Queue (Bull)

  ขั้นตอนที่ 5 — Testing
  ├── Unit Tests: Service Layer (8 tests)
  ├── Integration Tests: API Endpoints (6 tests)
  └── Edge Cases: Limit 50, Duplicate, Deleted Product

  ไฟล์ที่ต้องสร้าง/แก้ไข: 12 ไฟล์
  เริ่มทำเลยไหมครับ?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: อนุมัติแผนและเริ่มทำ                              │
└─────────────────────────────────────────────────────────────────┘

คุณ: ดี เริ่มเลย แต่ขั้นตอนที่ 4 (Price Drop Notification) เอาไว้ทำทีหลัง
     ทำ 1-3 กับ 5 ก่อน

  [กด Shift+Tab → สลับเป็น auto]

Claude: เข้าใจครับ จะทำขั้นตอน 1-3 + 5 ก่อน

  ━━━ ขั้นตอนที่ 1: Database Layer ━━━

  📝 สร้าง src/entities/wishlist-item.entity.ts ✓
  📝 สร้าง src/repositories/wishlist.repository.ts ✓
  📝 สร้าง Migration: CreateWishlistTable ✓
  🗄️ รัน Migration ✓

  ━━━ ขั้นตอนที่ 2: Business Logic ━━━

  📝 สร้าง src/validators/wishlist.validator.ts ✓
  📝 สร้าง src/services/wishlist.service.ts ✓
     - addToWishlist() พร้อม Limit Check (50 items)
     - removeFromWishlist() พร้อม Not Found Check
     - getWishlist() พร้อม Pagination
     - isInWishlist() สำหรับ Frontend Toggle

  ━━━ ขั้นตอนที่ 3: API Layer ━━━

  📝 สร้าง src/controllers/wishlist.controller.ts ✓
  📝 สร้าง src/routes/wishlist.routes.ts ✓
  📝 แก้ไข src/routes/index.ts ✓ (เพิ่ม Wishlist Routes)

  ━━━ ขั้นตอนที่ 5: Testing ━━━

  📝 สร้าง src/__tests__/wishlist.service.test.ts ✓ (8 tests)
  📝 สร้าง src/__tests__/wishlist.api.test.ts ✓ (6 tests)

  กำลังรัน Tests ทั้งหมด...
  [รัน Bash: npm test]

  ✅ Tests: 14 passed, 0 failed
  ✅ Lint: No errors
  ✅ TypeScript: No errors

  สร้างไฟล์ทั้งหมด 9 ไฟล์ แก้ไข 1 ไฟล์ ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: รีวิวโค้ดก่อน Commit                              │
└─────────────────────────────────────────────────────────────────┘

คุณ: /review

Claude: 🔍 กำลังรีวิวโค้ดที่เปลี่ยนแปลง...

  ✅ ดี:
  - ใช้ Repository Pattern ตาม Codebase เดิม
  - มี Input Validation ด้วย Zod ทุก Endpoint
  - Pagination ใช้ Cursor-based ตาม Standard ของโปรเจกต์
  - Error Handling ครบถ้วน

  ⚠️ แนะนำ:
  - wishlist.service.ts:23 — ควรเพิ่ม Index บน (userId, productId)
    สำหรับ Query ที่ใช้บ่อย
  - wishlist.controller.ts:45 — ควรเพิ่ม Rate Limiting
    สำหรับ POST endpoint

  จะแก้ไขตามคำแนะนำเลยไหมครับ?

คุณ: แก้เลย

Claude:
  📝 แก้ไข migration file → เพิ่ม Composite Index ✓
  📝 แก้ไข wishlist.routes.ts → เพิ่ม Rate Limiter (10 req/min) ✓
  📝 รัน Tests อีกรอบ → 14 passed ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 4: Commit และสร้าง PR                               │
└─────────────────────────────────────────────────────────────────┘

คุณ: /commit

Claude: Commit Message:
  "feat: add wishlist API for customers to save favorite products

   - CRUD endpoints for wishlist items with 50-item limit
   - Cursor-based pagination, rate limiting, input validation
   - 14 tests covering service and API layers"

  [git add + git commit] ✓

คุณ: /pr

Claude: ✅ PR #143 สร้างเรียบร้อย
  → https://github.com/company/ecommerce-api/pull/143
```

**สรุป Flow:** `/plan` → อนุมัติแผน → สร้าง 10 ไฟล์ → `/review` → แก้ตามคำแนะนำ → `/commit` + `/pr`  
**เวลาที่ใช้:** ~20 นาที (ปกติใช้ 1-2 วัน)

---

### Flow 4: รีแฟคเตอร์โค้ดเก่าขนาดใหญ่

> **สถานการณ์:** โปรเจกต์มีไฟล์ `utils.ts` ขนาด 2,000 บรรทัด ที่รวมทุกอย่างไว้ที่เดียว ต้องแยกเป็น Module ย่อย

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: วิเคราะห์ไฟล์ที่ต้องรีแฟคเตอร์                    │
└─────────────────────────────────────────────────────────────────┘

$ claude

คุณ: ไฟล์ src/utils.ts มี 2,000 บรรทัด อยากแยกเป็น Module ย่อย
     ห้ามทำให้ Test ที่มีอยู่พัง

Claude: ให้ผมวิเคราะห์ก่อนนะครับ...

  [อ่าน src/utils.ts — 2,147 บรรทัด]
  [ค้นหาไฟล์ที่ import จาก utils.ts — 47 ไฟล์]
  [อ่าน src/__tests__/utils.test.ts — 89 tests]

  📊 ผลการวิเคราะห์:

  ไฟล์ src/utils.ts ประกอบด้วย 6 กลุ่มฟังก์ชัน:

  1. 📅 Date Utilities (12 ฟังก์ชัน, 340 บรรทัด)
     → formatDate, parseDate, getRelativeTime, ...

  2. 💰 Currency/Price (8 ฟังก์ชัน, 210 บรรทัด)
     → formatPrice, calculateDiscount, convertCurrency, ...

  3. ✅ Validation (15 ฟังก์ชัน, 420 บรรทัด)
     → isValidEmail, isValidPhone, isStrongPassword, ...

  4. 🔤 String Manipulation (10 ฟังก์ชัน, 280 บรรทัด)
     → slugify, truncate, capitalize, sanitizeHtml, ...

  5. 📦 Object/Array Helpers (9 ฟังก์ชัน, 350 บรรทัด)
     → deepClone, pick, omit, groupBy, chunk, ...

  6. 🔒 Crypto/Auth (6 ฟังก์ชัน, 290 บรรทัด)
     → hashPassword, generateToken, encryptData, ...

  ไฟล์ที่ต้องแก้ไข import: 47 ไฟล์
  Tests ที่มีอยู่: 89 tests

  📋 แผน:
  1. สร้าง 6 ไฟล์ใหม่ใน src/utils/
  2. ย้ายฟังก์ชันไปไฟล์ที่เหมาะสม
  3. สร้าง src/utils/index.ts ที่ re-export ทั้งหมด (Backward Compatible)
  4. อัปเดต import ใน 47 ไฟล์ (ชี้ไปที่ Module เฉพาะ)
  5. รัน Test ยืนยันว่าไม่มีอะไรพัง
  6. ลบ src/utils.ts เดิม

  เริ่มเลยไหมครับ?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: ให้ Claude ทำงาน (Auto Mode)                     │
└─────────────────────────────────────────────────────────────────┘

คุณ: เริ่มเลย

  [กด Shift+Tab → สลับเป็น auto]

Claude: เริ่มรีแฟคเตอร์...

  ━━━ สร้าง Module ใหม่ ━━━
  📝 src/utils/date.ts ✓ (12 ฟังก์ชัน)
  📝 src/utils/currency.ts ✓ (8 ฟังก์ชัน)
  📝 src/utils/validation.ts ✓ (15 ฟังก์ชัน)
  📝 src/utils/string.ts ✓ (10 ฟังก์ชัน)
  📝 src/utils/collection.ts ✓ (9 ฟังก์ชัน)
  📝 src/utils/crypto.ts ✓ (6 ฟังก์ชัน)
  📝 src/utils/index.ts ✓ (Re-export ทั้งหมด)

  ━━━ อัปเดต Imports (47 ไฟล์) ━━━
  📝 src/controllers/user.controller.ts ✓
  📝 src/controllers/product.controller.ts ✓
  📝 src/controllers/order.controller.ts ✓
  ... (44 ไฟล์เพิ่มเติม)
  📝 47/47 ไฟล์อัปเดตเรียบร้อย ✓

  ━━━ ลบไฟล์เดิม ━━━
  🗑️ src/utils.ts ✓

  ━━━ รัน Tests ━━━
  [รัน Bash: npm test]

  ✅ Tests: 89 passed, 0 failed
  ✅ TypeScript: No errors
  ✅ Lint: No errors

  สรุป: สร้าง 7 ไฟล์, แก้ 47 ไฟล์, ลบ 1 ไฟล์
  ฟังก์ชันทั้งหมด 60 ฟังก์ชันย้ายสำเร็จ
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: ตรวจสอบและ Commit                                │
└─────────────────────────────────────────────────────────────────┘

คุณ: /simplify

Claude: ตรวจสอบโค้ดที่รีแฟคเตอร์...

  ✅ ไม่พบฟังก์ชันที่ซ้ำซ้อน
  ✅ Imports ถูกต้องทั้งหมด
  ✅ ไม่มี Circular Dependencies
  ⚠️ src/utils/collection.ts: groupBy() และ chunk() สามารถใช้ lodash แทนได้
     → แนะนำ: คงไว้ก่อน ค่อย Migrate ทีหลัง (ไม่ต้องแก้ตอนนี้)

คุณ: /commit

Claude: Commit Message:
  "refactor: split monolithic utils.ts into 6 focused modules

   Split 2,147-line utils.ts into date, currency, validation, string,
   collection, and crypto modules. Updated imports across 47 files.
   All 89 existing tests pass without modification."

  ✅ Committed
```

**สรุป Flow:** วิเคราะห์ → สร้าง 7 Module → อัปเดต 47 ไฟล์ → Test 89 ข้อผ่าน → Commit  
**เวลาที่ใช้:** ~10 นาที (ปกติใช้ 4-8 ชั่วโมง)

---

### Flow 5: ใช้ Agent Teams รีวิว PR ขนาดใหญ่

> **สถานการณ์:** เพื่อนร่วมทีมส่ง PR ที่แก้ไข 45 ไฟล์ เปลี่ยนระบบ Payment ทั้งหมด ต้องรีวิวอย่างละเอียด

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: สร้าง Agent Team สำหรับรีวิว                      │
└─────────────────────────────────────────────────────────────────┘

$ claude

คุณ: รีวิว PR #156 ที่แก้ไขระบบ Payment
     สร้าง Agent Team 3 คนให้รีวิวพร้อมกัน:
     - คนที่ 1: ตรวจ Security (Payment Data, PCI Compliance)
     - คนที่ 2: ตรวจ Business Logic (Pricing, Tax, Refund)
     - คนที่ 3: ตรวจ Test Coverage + Error Handling
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: Agent Teams ทำงานพร้อมกัน                        │
└─────────────────────────────────────────────────────────────────┘

Claude: สร้าง Agent Team เรียบร้อย กำลังรีวิว PR #156...

  ┌─ Agent "Security" ──────────────────────────┐
  │ กำลังตรวจ: Payment Data Flow, PCI, Secrets  │
  │ สถานะ: กำลังอ่าน 15/45 ไฟล์...              │
  └─────────────────────────────────────────────┘

  ┌─ Agent "Business Logic" ────────────────────┐
  │ กำลังตรวจ: Pricing, Tax, Discount, Refund   │
  │ สถานะ: กำลังอ่าน 22/45 ไฟล์...              │
  └─────────────────────────────────────────────┘

  ┌─ Agent "Quality" ───────────────────────────┐
  │ กำลังตรวจ: Tests, Error Handling, Edge Cases│
  │ สถานะ: กำลังอ่าน 8/45 ไฟล์...               │
  └─────────────────────────────────────────────┘

  ... (5 นาทีผ่านไป) ...
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: รับรายงานจากทุก Agent                             │
└─────────────────────────────────────────────────────────────────┘

Claude: ✅ รีวิวเสร็จแล้ว สรุปจาก 3 Agents:

  ═══ 🔒 Security Agent ═══

  🔴 Critical (1):
  - payment.service.ts:89 — Credit Card Number ถูก Log ลง Console
    ต้องลบ console.log(cardNumber) ออกก่อน Merge

  🟡 Warning (2):
  - stripe.adapter.ts:34 — Webhook Secret ควรอยู่ใน ENV ไม่ใช่ Hardcode
  - refund.service.ts:67 — ไม่มี Rate Limiting สำหรับ Refund API

  ✅ Pass:
  - ✓ ไม่มี SQL Injection
  - ✓ Input Validation ครบทุก Endpoint
  - ✓ PCI Data ไม่ถูกเก็บใน Database

  ═══ 💼 Business Logic Agent ═══

  🔴 Critical (1):
  - tax.calculator.ts:120 — Tax Calculation สำหรับ EU ผิด
    ใช้ VAT Rate ของ US แทน EU (15% แทน 20-27%)

  🟡 Warning (1):
  - discount.service.ts:45 — Discount + Coupon ไม่มี Maximum Cap
    อาจทำให้ราคาติดลบได้

  ✅ Pass:
  - ✓ Pricing Logic ถูกต้องสำหรับ US/UK
  - ✓ Refund Logic ถูกต้อง
  - ✓ Currency Conversion ใช้ Real-time Rate

  ═══ ✅ Quality Agent ═══

  🟡 Warning (2):
  - Test Coverage: 72% (ต่ำกว่ามาตรฐาน 80%)
    ขาด Test สำหรับ: EU Tax, Partial Refund, Currency Edge Cases
  - payment.controller.ts — catch block แค่ log ไม่ได้ส่ง Error กลับ Client

  ✅ Pass:
  - ✓ Happy Path Tests ครบ
  - ✓ Stripe Mock ถูกต้อง
  - ✓ Transaction Rollback Tests มี

  ═══════════════════════════════════════

  📊 สรุปรวม:
  🔴 Critical: 2 (ต้องแก้ก่อน Merge)
  🟡 Warning: 5 (แนะนำให้แก้)
  ✅ Pass: 9

  จะ Comment ใน PR #156 ให้เลยไหมครับ?

คุณ: Comment เลย

Claude: ✅ Comment ใน PR #156 เรียบร้อย
```

**สรุป Flow:** สร้าง 3 Agent Teams → รีวิว 45 ไฟล์พร้อมกัน → รายงานรวม → Comment ใน PR  
**เวลาที่ใช้:** ~5 นาที (ปกติใช้ 2-3 ชั่วโมงรีวิวคนเดียว)

---

### Flow 6: Debug ปัญหา Production ด้วย Log Analysis

> **สถานการณ์:** เว็บไซต์ช้าลงตั้งแต่เช้า Response Time เพิ่มจาก 200ms เป็น 2s ต้องหาสาเหตุด่วน

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: ส่ง Log ให้ Claude วิเคราะห์                      │
└─────────────────────────────────────────────────────────────────┘

$ cat /var/log/app/error.log | tail -500 | claude -p "
  เว็บไซต์ช้ามากตั้งแต่เช้า Response Time เพิ่มจาก 200ms เป็น 2s
  วิเคราะห์ Log นี้หาสาเหตุ
"
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: Claude วิเคราะห์และระบุสาเหตุ                    │
└─────────────────────────────────────────────────────────────────┘

Claude:
  🔍 ผลการวิเคราะห์ Log 500 บรรทัดล่าสุด:

  📊 Pattern ที่พบ:
  1. [08:15:03] "SLOW QUERY: SELECT * FROM products WHERE ... — 1,847ms"
     → Query นี้ซ้ำ 342 ครั้งใน 1 ชั่วโมง
  2. [08:15:03] "Redis connection timeout" — 28 ครั้ง
  3. [08:22:45] "Pool exhausted, waiting for connection" — 156 ครั้ง

  🎯 สาเหตุ (เรียงตามความเป็นไปได้):

  1. 🔴 N+1 Query ใน Product Listing (90% น่าจะเป็นสาเหตุหลัก)
     - Query "SELECT * FROM products WHERE category_id = ?" รัน 342 ครั้ง
     - ควรเป็น 1 Query ด้วย JOIN หรือ WHERE IN
     - ทำให้ Connection Pool เต็ม → Request อื่นต้องรอ

  2. 🟡 Redis Connection Timeout (อาจเป็นผลพลอย)
     - Cache Miss ทำให้ทุก Request ไป Database → ยิ่งช้า

  3. 🟡 ไม่มี Index บน products.category_id
     - Query ใช้ Full Table Scan

  💡 วิธีแก้ด่วน:
  1. เพิ่ม Index บน products.category_id (แก้ได้ทันที)
  2. แก้ N+1 Query ใน product.repository.ts (ใช้เวลา 10 นาที)
  3. ตรวจสอบ Redis Connection (อาจเป็นเรื่อง Memory)
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: เปิด Claude Interactive แก้ไข                    │
└─────────────────────────────────────────────────────────────────┘

$ claude -c

คุณ: แก้ N+1 Query และเพิ่ม Index ให้หน่อย ด่วน

Claude:
  [อ่าน src/repositories/product.repository.ts]

  พบแล้ว! บรรทัด 78:

  ❌ โค้ดเดิม (N+1 Query):
  async getByCategory(categoryId: string) {
    const products = await this.find({ categoryId });
    for (const product of products) {
      product.reviews = await this.reviewRepo.find({ productId: product.id });
      //                ^^^^^^^^ Query ใน Loop! ← สาเหตุ
    }
  }

  ✅ โค้ดใหม่ (1 Query):
  async getByCategory(categoryId: string) {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'review')
      .where('product.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  📝 แก้ไข product.repository.ts ✓
  📝 สร้าง Migration: AddIndexOnProductCategoryId ✓
  📝 รัน Tests → 89 passed ✓

คุณ: /commit

Claude: "fix: resolve N+1 query in product listing causing 2s response time

   Replace loop-based review loading with JOIN query.
   Add index on products.category_id for faster lookups.
   Reduces product listing from ~1,800ms to ~50ms."

  ✅ Committed + Pushed
```

**สรุป Flow:** Pipe Log → Claude วิเคราะห์ → ระบุ N+1 Query → แก้ไข → Commit + Push  
**เวลาที่ใช้:** ~8 นาที (ปกติใช้ 1-3 ชั่วโมง Debug)

---

### Flow 7: ทำงานประจำวันแบบเต็มวัน (Daily Workflow)

> **สถานการณ์:** จำลองการทำงาน 1 วันเต็มของนักพัฒนาที่ใช้ Claude Code

```
┌──────────────────────────────────────────────────────────────────────┐
│  🌅 09:00 — เปิดคอมพิวเตอร์ เริ่มงาน                                │
└──────────────────────────────────────────────────────────────────────┘

$ cd ~/projects/ecommerce-api
$ claude -c                           ← ต่อเซสชันเมื่อวาน

Claude: สวัสดีครับ! เมื่อวานเราแก้ Bug Order Duplication ไปแล้ว
  วันนี้มีอะไรให้ช่วยครับ?            ← Claude จำได้เพราะ Session + Memory

คุณ: วันนี้ต้องทำ 3 อย่าง:
     1. แก้ Bug ที่ QA รายงาน — Cart ลบสินค้าไม่ได้
     2. สร้างฟีเจอร์ Export Order เป็น CSV
     3. รีวิว PR #160 ของน้องในทีม

┌──────────────────────────────────────────────────────────────────────┐
│  🐛 09:15 — แก้ Bug Cart                                            │
└──────────────────────────────────────────────────────────────────────┘

คุณ: เริ่มจาก Bug Cart ก่อน — QA บอกว่ากดลบสินค้าใน Cart แล้ว
     ไม่หายจากหน้าจอ แต่ Refresh แล้วหาย

Claude: น่าจะเป็นปัญหา API ส่ง Response ไม่ถูกต้อง ให้ผมดูนะครับ...

  [อ่าน src/controllers/cart.controller.ts]
  [อ่าน src/services/cart.service.ts]

  พบแล้วครับ! cart.controller.ts:67
  DELETE endpoint ส่ง Status 200 แต่ไม่ส่ง Updated Cart กลับไป
  Frontend จึงไม่รู้ว่าต้องอัปเดต State

  📝 แก้ไข → ส่ง Updated Cart ใน Response Body ✓
  📝 เขียน Test ✓
  📝 รัน Tests → Passed ✓

คุณ: /commit
Claude: ✅ Committed: "fix: return updated cart after item deletion"

┌──────────────────────────────────────────────────────────────────────┐
│  🆕 10:00 — สร้างฟีเจอร์ Export CSV                                 │
└──────────────────────────────────────────────────────────────────────┘

คุณ: ต่อ — สร้าง API Export Order เป็น CSV
     - Admin เท่านั้นที่ใช้ได้
     - Filter ตาม Date Range
     - รองรับ 100,000+ Orders

  [กด Cmd+T → เปิด Extended Thinking]

Claude: (Extended Thinking: วิเคราะห์ว่าต้อง Stream CSV
  เพราะ 100K records ไม่ควรโหลดทั้งหมดลง Memory...)

  📋 แผน:
  1. สร้าง GET /api/admin/orders/export?from=&to=&format=csv
  2. ใช้ Stream Response (ไม่โหลดทั้งหมดลง Memory)
  3. Query แบบ Cursor Pagination
  4. Admin Auth Middleware
  5. Tests

  📝 สร้าง src/services/order-export.service.ts ✓
  📝 สร้าง src/controllers/admin/order-export.controller.ts ✓
  📝 แก้ไข src/routes/admin.routes.ts ✓
  📝 สร้าง Tests (4 cases) ✓
  📝 รัน Tests → Passed ✓

คุณ: /commit
Claude: ✅ Committed: "feat: add CSV export for orders with streaming support"

┌──────────────────────────────────────────────────────────────────────┐
│  🔍 11:00 — รีวิว PR ของน้องในทีม                                   │
└──────────────────────────────────────────────────────────────────────┘

คุณ: รีวิว PR #160 ของน้องเค ที่เพิ่มระบบ Coupon

Claude: กำลังรีวิว PR #160...

  [อ่าน PR Diff — 12 ไฟล์, +450/-23 บรรทัด]

  📋 Review Summary:

  ✅ ดีมาก:
  - Coupon Model Design ดี มี expiry, usage limit, minimum order
  - Tests ครอบคลุม 12 cases
  - ใช้ Transaction สำหรับ Coupon Redemption

  ⚠️ ควรแก้:
  1. coupon.service.ts:34 — Race Condition: ถ้า 2 คนใช้ Coupon เดียวกัน
     พร้อมกัน usage_count อาจผิด → แนะนำใช้ Database-level Atomic Increment
  2. coupon.validator.ts:12 — Discount Percentage ไม่มี Max Cap
     ใส่ discount: 200 ได้ → ราคาติดลบ

  💡 เล็กน้อย:
  3. coupon.routes.ts:8 — ขาด Rate Limiting สำหรับ POST /coupons/apply

  จะ Comment ใน PR ให้เลยไหมครับ?

คุณ: Comment เลย แล้วก็แนะนำโค้ดที่ควรแก้ด้วย

Claude: ✅ Comment ใน PR #160 เรียบร้อย
  → แนบ Code Suggestion สำหรับทั้ง 3 ข้อ

┌──────────────────────────────────────────────────────────────────────┐
│  🍔 12:00 — พักเที่ยง                                               │
└──────────────────────────────────────────────────────────────────────┘

  [ปิดเครื่อง / ปล่อยไว้]

┌──────────────────────────────────────────────────────────────────────┐
│  ☕ 13:00 — กลับมาทำงานต่อ                                          │
└──────────────────────────────────────────────────────────────────────┘

$ claude -c                           ← ต่อเซสชัน Claude จำทุกอย่าง

Claude: กลับมาแล้วครับ! เช้านี้ทำ 2 ข้อเสร็จแล้ว:
  ✅ Bug Cart — committed
  ✅ Export CSV — committed
  ✅ PR #160 Review — commented

  เหลืออะไรอีกครับ?

┌──────────────────────────────────────────────────────────────────────┐
│  📝 13:30 — เขียน Test เพิ่มตามที่ Tech Lead ขอ                     │
└──────────────────────────────────────────────────────────────────────┘

คุณ: Tech Lead ขอให้เพิ่ม Integration Test สำหรับ Payment Flow ทั้งหมด
     ตอนนี้มีแค่ Unit Test

Claude: เข้าใจครับ ให้ผมดูว่า Payment Flow มีอะไรบ้าง...

  [สำรวจ Payment-related files]

  Payment Flow ที่ต้อง Test:
  1. Create Order → Process Payment → Confirm Order
  2. Create Order → Payment Failed → Order Cancelled
  3. Create Order → Payment → Partial Refund
  4. Create Order → Payment → Full Refund
  5. Create Order → Payment → Dispute → Refund

  📝 สร้าง src/__tests__/integration/payment-flow.test.ts ✓
  📝 สร้าง src/__tests__/integration/helpers/payment-mock.ts ✓
  📝 5 Integration Tests เขียนเสร็จ
  📝 รัน Tests → 5 passed ✓

คุณ: /commit
Claude: ✅ Committed: "test: add integration tests for complete payment flow"

┌──────────────────────────────────────────────────────────────────────┐
│  📊 15:00 — สร้าง PR รวมงานทั้งวัน                                  │
└──────────────────────────────────────────────────────────────────────┘

คุณ: /pr

Claude: สร้าง PR สำหรับงานวันนี้...

  Branch: feature/daily-improvements-apr-16
  PR #161: "Fix cart deletion, add CSV export, payment integration tests"

  ## Summary
  - Fix: Cart item deletion now returns updated cart
  - Feat: Admin CSV export for orders (streaming, 100K+ support)
  - Test: 5 integration tests for complete payment flow

  ## Changes
  - 8 files changed, +680 lines, -12 lines
  - 3 commits

  ✅ PR #161 สร้างเรียบร้อย

┌──────────────────────────────────────────────────────────────────────┐
│  🔄 16:00 — ตั้ง Scheduled Task สำหรับพรุ่งนี้                       │
└──────────────────────────────────────────────────────────────────────┘

คุณ: ตั้ง Schedule ให้ Claude ตรวจ Error Log ทุกเช้า 8:00
     แล้วสรุปให้ผมถ้ามีอะไรผิดปกติ

Claude: ✅ สร้าง Scheduled Task เรียบร้อย
  → ทุกวัน 08:00 จะวิเคราะห์ Error Log แล้วสรุปให้

┌──────────────────────────────────────────────────────────────────────┐
│  🌙 17:00 — จบวัน                                                   │
└──────────────────────────────────────────────────────────────────────┘

คุณ: จบวัน สรุปงานวันนี้ให้หน่อย

Claude: 📊 สรุปงานวันนี้:

  ✅ งานที่เสร็จ:
  1. 🐛 แก้ Bug Cart Deletion — PR #161 (10 นาที)
  2. 🆕 สร้างฟีเจอร์ Export CSV — PR #161 (30 นาที)
  3. 🔍 รีวิว PR #160 Coupon System — Commented (15 นาที)
  4. 📝 เขียน Integration Tests — PR #161 (20 นาที)
  5. ⏰ ตั้ง Daily Error Log Check — Scheduled

  📈 สถิติ:
  - Commits: 3
  - ไฟล์สร้างใหม่: 5
  - ไฟล์แก้ไข: 6
  - Tests เขียนใหม่: 11
  - PR สร้าง: 1
  - PR รีวิว: 1

  พรุ่งนี้เจอกันครับ! 👋
```

**สรุป Daily Workflow:**

| เวลา | งาน | เวลาจริง | เวลาปกติ (ไม่มี Claude) |
|------|-----|---------|------------------------|
| 09:15 | แก้ Bug Cart | 10 นาที | 1 ชั่วโมง |
| 10:00 | สร้างฟีเจอร์ CSV Export | 30 นาที | 3-4 ชั่วโมง |
| 11:00 | รีวิว PR #160 | 15 นาที | 1-2 ชั่วโมง |
| 13:30 | เขียน Integration Tests | 20 นาที | 2-3 ชั่วโมง |
| 15:00 | สร้าง PR | 2 นาที | 15 นาที |
| **รวม** | | **~1.5 ชั่วโมง** | **~8-10 ชั่วโมง** |

---

### Flow 8: CI/CD Pipeline ด้วย Headless Mode

> **สถานการณ์:** ต้องการให้ Claude Code รีวิวโค้ดอัตโนมัติทุก PR และสร้าง Release Notes ทุก Release

```
┌─────────────────────────────────────────────────────────────────┐
│  ไฟล์ .github/workflows/ai-review.yml                           │
└─────────────────────────────────────────────────────────────────┘

name: AI Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: curl -fsSL https://claude.ai/install.sh | bash

      - name: AI Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # ดึง Diff ของ PR
          DIFF=$(git diff origin/main...HEAD)

          # ส่งให้ Claude วิเคราะห์
          REVIEW=$(echo "$DIFF" | claude --bare -p "
            รีวิวโค้ดนี้:
            1. หา Bug และ Security Issues
            2. ตรวจ Performance Problems
            3. ให้คะแนน 1-10
            4. สรุปเป็น Markdown

            ตอบเป็น JSON format:
            {score, bugs, security, performance, summary}
          " --output-format json \
            --allowedTools "Read" \
            --max-turns 5 \
            --model sonnet)

          # Post Comment ใน PR
          echo "$REVIEW" | jq -r '.result.summary' | \
            gh pr comment ${{ github.event.pull_request.number }} --body -

      - name: Block if Critical Issues
        run: |
          SCORE=$(echo "$REVIEW" | jq -r '.result.score')
          if [ "$SCORE" -lt 5 ]; then
            echo "❌ AI Review Score: $SCORE/10 — ต้องแก้ไขก่อน Merge"
            exit 1
          fi
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ไฟล์ .github/workflows/release-notes.yml                       │
└─────────────────────────────────────────────────────────────────┘

name: Auto Release Notes
on:
  release:
    types: [created]

jobs:
  generate-notes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate Release Notes
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # ดึง Commits ตั้งแต่ Release ก่อนหน้า
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD~1 2>/dev/null || echo "")
          COMMITS=$(git log ${PREV_TAG}..HEAD --oneline)

          # ให้ Claude สร้าง Release Notes
          NOTES=$(echo "$COMMITS" | claude --bare -p "
            สร้าง Release Notes จาก commit list นี้
            แบ่งเป็นหมวด: Features, Bug Fixes, Improvements, Breaking Changes
            ใช้ภาษาอังกฤษ เขียนให้ User เข้าใจ (ไม่ใช่ Developer)
            Format: Markdown
          " --model sonnet --max-turns 3)

          # อัปเดต Release Notes
          gh release edit ${{ github.event.release.tag_name }} \
            --notes "$NOTES"
```

**ผลลัพธ์:**
- ทุก PR ถูกรีวิวโดย AI อัตโนมัติ + ได้คะแนน
- PR ที่คะแนนต่ำกว่า 5 ถูกบล็อกไม่ให้ Merge
- ทุก Release มี Release Notes สวยงามอัตโนมัติ
- ทีมไม่ต้องทำ Manual Review/Notes อีกต่อไป

---

### สรุปเปรียบเทียบ: ก่อน vs หลังใช้ Claude Code

| งาน | ก่อน (ทำเอง) | หลัง (Claude Code) | ประหยัดเวลา |
|-----|-------------|-------------------|------------|
| Onboarding โปรเจกต์ใหม่ | 1-2 วัน | 10 นาที | 95% |
| แก้ Bug ทั่วไป | 1-3 ชม. | 10-15 นาที | 85% |
| สร้างฟีเจอร์ใหม่ (CRUD) | 4-8 ชม. | 20-30 นาที | 90% |
| รีแฟคเตอร์ไฟล์ใหญ่ | 4-8 ชม. | 10 นาที | 95% |
| Code Review PR ใหญ่ | 1-3 ชม. | 5 นาที | 90% |
| Debug Production Issue | 1-3 ชม. | 8 นาที | 90% |
| เขียน Tests | 2-4 ชม. | 15-20 นาที | 85% |
| สร้าง PR + Description | 15-30 นาที | 1-2 นาที | 90% |
| CI/CD Review อัตโนมัติ | Manual ทุก PR | อัตโนมัติ 100% | 100% |
| **รวมต่อวัน** | **8-10 ชม.** | **~1.5 ชม.** | **~85%** |

---

## สรุป

Claude Code เป็นเครื่องมือ AI สำหรับนักพัฒนาที่มีฟีเจอร์ครบครัน:

- **CLI ที่ทรงพลัง** - 50+ คำสั่งและ Flags
- **ระบบ Permission** - จาก Read-only ถึง Full Autonomous
- **ขยายได้** - ผ่าน Skills, Hooks, Subagents, MCP, Plugins
- **Context ถาวร** - CLAUDE.md และ Auto Memory
- **ทำงานคู่ขนาน** - Agent Teams และ Worktrees
- **รองรับทุกแพลตฟอร์ม** - Terminal, Desktop, VS Code, JetBrains, Web, Mobile
- **ตั้งเวลาได้** - Scheduled Tasks และ Cloud Routines
- **Git Integration** - PR, Commit, Review ในตัว
- **ปลอดภัย** - Sandboxing, Permissions, Protected Paths
- **Code Intelligence** - ตรวจสอบ Type/Error แบบ Real-time

---

> **เวอร์ชันเอกสาร:** ปรับปรุงล่าสุด 15 เมษายน 2026  
> **ใช้กับ:** Claude Code เวอร์ชันล่าสุด (Claude Opus 4.6 / Sonnet 4.6 / Haiku 4.5)

---

## Navigation

- ⬅️ Previous: [[25-tips-best-practices]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/26-real-world-workflows]]
