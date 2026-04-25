---
title: "Real-World Workflow Simulations"
section: 26
lang: en
tags:
  - claude-code
  - workflows
  - use-cases
aliases:
  - "Real-World Workflows"
related:
  - "[[25-tips-best-practices]]"
  - "[[15-git-integration]]"
---

# Real-World Workflow Simulations

> **This section simulates real-world Claude Code usage from start to finish.**
> Each flow shows the steps a developer actually takes during a day, with commands and Claude's responses.

---

### Flow 1: First Day on a New Project (Onboarding)

> **Scenario:** You're a new developer who just joined the team and was given a repository you've never seen. You need to understand the project as quickly as possible.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Clone the project and open Claude Code                 │
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
│  Step 2: Have Claude generate CLAUDE.md                         │
└─────────────────────────────────────────────────────────────────┘

You: /init

Claude: Analyzing the project...
  ✓ Read package.json → Node.js + TypeScript + Express
  ✓ Read tsconfig.json → strict mode, ESNext
  ✓ Read docker-compose.yml → PostgreSQL + Redis
  ✓ Surveyed the directory tree → 156 files in 23 folders
  ✓ Read .eslintrc → Airbnb style
  ✓ Read jest.config.ts → Test framework: Jest

  CLAUDE.md created ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Ask Claude about the project                           │
└─────────────────────────────────────────────────────────────────┘

You: Explain the architecture of this project. I just joined the team.

Claude: (uses Explore Agent to survey the codebase)

  This project is an E-commerce REST API using Clean Architecture:

  📁 src/
  ├── controllers/     ← receive request, call service
  ├── services/        ← main business logic
  ├── repositories/    ← database layer (TypeORM)
  ├── entities/        ← database models
  ├── middleware/      ← auth, logging, error handler
  ├── routes/          ← Express routes
  ├── validators/      ← Zod schemas
  └── utils/           ← helper functions

  Main flow:
  Route → Middleware → Controller → Service → Repository → Database

  Key entities: User, Product, Order, Payment, Cart
  Auth: JWT + refresh token
  Payment: Stripe integration
  Cache: Redis for the product catalog
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 4: Try running the project                                │
└─────────────────────────────────────────────────────────────────┘

You: Help me set up the development environment.

Claude: Checking prerequisites...
  ✓ Node.js v20 — installed
  ✓ Docker — installed
  ✗ .env file — not present

  Generating .env from .env.example...
  [edit .env] ✓

  Running docker-compose up -d...
  [run Bash: docker-compose up -d] ✓ PostgreSQL + Redis started

  Installing dependencies...
  [run Bash: npm install] ✓

  Running migrations...
  [run Bash: npm run db:migrate] ✓

  Running seed data...
  [run Bash: npm run db:seed] ✓

  Starting the dev server...
  [run Bash: npm run dev] ✓ Server running on http://localhost:3000

  ✅ Ready! Try opening http://localhost:3000/api/health
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 5: Save personal info to memory                           │
└─────────────────────────────────────────────────────────────────┘

You: Remember that I'm a backend developer who specializes in
     Python/Django and is just starting my first TypeScript project.

Claude: Saved ✓
  From now on, when I explain TypeScript, I'll relate it to Python/Django.
```

**Flow Summary:** `/init` → ask about architecture → set up dev → save memory
**Time spent:** ~10 minutes (normally 1–2 days to understand a new project)

---

### Flow 2: Fixing a Production Bug Report

> **Scenario:** You receive a bug report saying "Customers click Place Order and end up with two duplicate orders." You need to find the cause and fix it.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Open a session and describe the bug                    │
└─────────────────────────────────────────────────────────────────┘

$ claude

You: There's a production bug — customers click "Place Order" and end up with
     two duplicate orders. It happens when their internet is slow and they
     click the button multiple times. Help me find the cause and fix it.
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Claude analyzes the problem (Plan Mode)                │
└─────────────────────────────────────────────────────────────────┘

Claude: Got it — this is an idempotency issue in order creation.
  Let me analyze first.

  [read src/controllers/order.controller.ts]
  [read src/services/order.service.ts]
  [read src/routes/order.routes.ts]
  [read src/middleware/]

  🔍 Found the cause:

  File src/services/order.service.ts:45
  The createOrder() function has no protection against duplicate requests:

  1. ❌ No idempotency key — duplicate requests create new orders every time
  2. ❌ No database lock — race condition when two requests arrive together
  3. ❌ No frontend disable after click — frontend can resubmit easily

  📋 Fix plan:
  1. Add idempotency key to the Order API (backend — actual fix)
  2. Add a database unique constraint (prevents race conditions)
  3. Add a Redis lock for order creation (prevents concurrent creation)
  4. Write thorough tests

  Should I start fixing now?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Switch to acceptEdits and let Claude fix it            │
└─────────────────────────────────────────────────────────────────┘

You: Go ahead.

  [press Shift+Tab → switch to acceptEdits]

Claude: Starting the fix.

  📝 Edit 1/4: src/middleware/idempotency.middleware.ts (new file)
  [create file] ✓ Idempotency middleware that uses Redis to store keys

  📝 Edit 2/4: src/services/order.service.ts
  [edit createOrder()] ✓ Add Redis lock + idempotency check

  📝 Edit 3/4: src/routes/order.routes.ts
  [edit] ✓ Add idempotency middleware to POST /orders

  📝 Edit 4/4: src/entities/order.entity.ts
  [edit] ✓ Add unique constraint on the idempotencyKey column

  🗄️ Create migration:
  [run Bash: npm run db:migration:create AddIdempotencyKey] ✓
  [edit migration file] ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 4: Claude writes tests                                    │
└─────────────────────────────────────────────────────────────────┘

Claude: Writing tests...

  📝 Create src/__tests__/order-idempotency.test.ts
  [create file] ✓

  Test cases:
  ✓ Normal order submission → creates 1 order
  ✓ Duplicate request with the same idempotency key → returns the same order
  ✓ Concurrent duplicate requests → only 1 order created
  ✓ New order with a different key → creates a new order
  ✓ Idempotency key expires after 24h → can create a new order

  Running tests...
  [run Bash: npm test src/__tests__/order-idempotency.test.ts]

  ✅ Tests: 5 passed, 0 failed
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 5: Commit and create a PR                                 │
└─────────────────────────────────────────────────────────────────┘

You: /commit

Claude: Analyzing changes...
  4 files edited, 2 new files, 1 migration

  Commit message:
  "fix: prevent duplicate order creation with idempotency key

   Add Redis-based idempotency middleware to prevent duplicate orders
   when customers submit multiple requests. Includes database unique
   constraint and distributed lock for race condition prevention."

  [git add + git commit] ✓

You: /pr

Claude: Creating pull request...
  Branch: fix/duplicate-order-creation
  Title: "Fix: Prevent duplicate order creation"
  Description: ## Summary
  - Add idempotency middleware using Redis
  - Add distributed lock on order creation
  - Add unique constraint on idempotency_key column
  ...

  ✅ PR #142 created → https://github.com/company/ecommerce-api/pull/142
```

**Flow Summary:** describe bug → Claude analyzes → fix 6 files → write 5 tests → commit + PR
**Time spent:** ~15 minutes (normally 2–4 hours)

---

### Flow 3: Building a New Feature From Scratch

> **Scenario:** A product manager wants a "Wishlist" feature that lets customers save products they're interested in. You need to build the entire new API.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Plan before building                                   │
└─────────────────────────────────────────────────────────────────┘

$ claude

You: /plan
     Build a Wishlist system that lets customers save products.
     - Customers can add/remove items from their wishlist
     - View their own wishlist
     - Notify when items in the wishlist go on sale
     - Limit 50 items per user

Claude: 📋 Wishlist development plan

  Step 1 — Database Layer
  ├── Create entity: WishlistItem (userId, productId, addedAt, notifyOnSale)
  ├── Create migration
  └── Create repository: WishlistRepository

  Step 2 — Business Logic
  ├── Create WishlistService
  │   ├── addToWishlist() — add an item (limit 50)
  │   ├── removeFromWishlist() — remove an item
  │   ├── getWishlist() — list items (pagination)
  │   ├── isInWishlist() — check whether an item is in the wishlist
  │   └── notifyPriceDrop() — sale notifications
  └── Create Zod validators

  Step 3 — API Layer
  ├── POST   /api/wishlist          — add an item
  ├── DELETE /api/wishlist/:productId — remove an item
  ├── GET    /api/wishlist          — list items
  ├── GET    /api/wishlist/check/:productId — check
  └── Create controller + routes

  Step 4 — Price Drop Notification
  ├── Create event listener for product price changes
  ├── Wire to email service
  └── Create notification queue (Bull)

  Step 5 — Testing
  ├── Unit tests: service layer (8 tests)
  ├── Integration tests: API endpoints (6 tests)
  └── Edge cases: 50 limit, duplicate, deleted product

  Files to create/edit: 12 files
  Should I start now?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Approve the plan and start                              │
└─────────────────────────────────────────────────────────────────┘

You: Sounds good — start. But hold off on Step 4 (price drop notifications);
     do steps 1–3 and 5 first.

  [press Shift+Tab → switch to auto]

Claude: Got it — I'll do steps 1–3 + 5 first.

  ━━━ Step 1: Database Layer ━━━

  📝 Create src/entities/wishlist-item.entity.ts ✓
  📝 Create src/repositories/wishlist.repository.ts ✓
  📝 Create migration: CreateWishlistTable ✓
  🗄️ Run migration ✓

  ━━━ Step 2: Business Logic ━━━

  📝 Create src/validators/wishlist.validator.ts ✓
  📝 Create src/services/wishlist.service.ts ✓
     - addToWishlist() with limit check (50 items)
     - removeFromWishlist() with not-found check
     - getWishlist() with pagination
     - isInWishlist() for the frontend toggle

  ━━━ Step 3: API Layer ━━━

  📝 Create src/controllers/wishlist.controller.ts ✓
  📝 Create src/routes/wishlist.routes.ts ✓
  📝 Edit src/routes/index.ts ✓ (add wishlist routes)

  ━━━ Step 5: Testing ━━━

  📝 Create src/__tests__/wishlist.service.test.ts ✓ (8 tests)
  📝 Create src/__tests__/wishlist.api.test.ts ✓ (6 tests)

  Running all tests...
  [run Bash: npm test]

  ✅ Tests: 14 passed, 0 failed
  ✅ Lint: no errors
  ✅ TypeScript: no errors

  Created 9 files, edited 1 file ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Review the code before committing                      │
└─────────────────────────────────────────────────────────────────┘

You: /review

Claude: 🔍 Reviewing the changes...

  ✅ Looks good:
  - Uses the Repository pattern matching the existing codebase
  - Input validation with Zod on every endpoint
  - Pagination uses cursor-based pagination (project standard)
  - Error handling is complete

  ⚠️ Recommendations:
  - wishlist.service.ts:23 — consider adding an index on (userId, productId)
    for the frequent query
  - wishlist.controller.ts:45 — consider adding rate limiting on the POST
    endpoint

  Should I apply the recommendations?

You: Apply them.

Claude:
  📝 Edit migration file → add composite index ✓
  📝 Edit wishlist.routes.ts → add rate limiter (10 req/min) ✓
  📝 Re-run tests → 14 passed ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 4: Commit and create a PR                                  │
└─────────────────────────────────────────────────────────────────┘

You: /commit

Claude: Commit message:
  "feat: add wishlist API for customers to save favorite products

   - CRUD endpoints for wishlist items with 50-item limit
   - Cursor-based pagination, rate limiting, input validation
   - 14 tests covering service and API layers"

  [git add + git commit] ✓

You: /pr

Claude: ✅ PR #143 created
  → https://github.com/company/ecommerce-api/pull/143
```

**Flow Summary:** `/plan` → approve plan → create 10 files → `/review` → apply suggestions → `/commit` + `/pr`
**Time spent:** ~20 minutes (normally 1–2 days)

---

### Flow 4: Refactoring a Large Legacy File

> **Scenario:** The project has a 2,000-line `utils.ts` file that bundles everything together. You need to split it into smaller modules.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Analyze the file to refactor                            │
└─────────────────────────────────────────────────────────────────┘

$ claude

You: src/utils.ts is 2,000 lines. I want to split it into smaller modules.
     Don't break any of the existing tests.

Claude: Let me analyze first.

  [read src/utils.ts — 2,147 lines]
  [find files importing from utils.ts — 47 files]
  [read src/__tests__/utils.test.ts — 89 tests]

  📊 Analysis:

  src/utils.ts contains 6 groups of functions:

  1. 📅 Date utilities (12 functions, 340 lines)
     → formatDate, parseDate, getRelativeTime, ...

  2. 💰 Currency/Price (8 functions, 210 lines)
     → formatPrice, calculateDiscount, convertCurrency, ...

  3. ✅ Validation (15 functions, 420 lines)
     → isValidEmail, isValidPhone, isStrongPassword, ...

  4. 🔤 String manipulation (10 functions, 280 lines)
     → slugify, truncate, capitalize, sanitizeHtml, ...

  5. 📦 Object/Array helpers (9 functions, 350 lines)
     → deepClone, pick, omit, groupBy, chunk, ...

  6. 🔒 Crypto/Auth (6 functions, 290 lines)
     → hashPassword, generateToken, encryptData, ...

  Files needing import updates: 47
  Existing tests: 89

  📋 Plan:
  1. Create 6 new files in src/utils/
  2. Move functions to the appropriate file
  3. Create src/utils/index.ts that re-exports everything (backward compatible)
  4. Update imports in 47 files (point at the specific module)
  5. Run tests to verify nothing breaks
  6. Delete the old src/utils.ts

  Start now?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Let Claude work (Auto Mode)                             │
└─────────────────────────────────────────────────────────────────┘

You: Start.

  [press Shift+Tab → switch to auto]

Claude: Starting the refactor...

  ━━━ Create new modules ━━━
  📝 src/utils/date.ts ✓ (12 functions)
  📝 src/utils/currency.ts ✓ (8 functions)
  📝 src/utils/validation.ts ✓ (15 functions)
  📝 src/utils/string.ts ✓ (10 functions)
  📝 src/utils/collection.ts ✓ (9 functions)
  📝 src/utils/crypto.ts ✓ (6 functions)
  📝 src/utils/index.ts ✓ (re-exports everything)

  ━━━ Update imports (47 files) ━━━
  📝 src/controllers/user.controller.ts ✓
  📝 src/controllers/product.controller.ts ✓
  📝 src/controllers/order.controller.ts ✓
  ... (44 more files)
  📝 47/47 files updated ✓

  ━━━ Delete the old file ━━━
  🗑️ src/utils.ts ✓

  ━━━ Run tests ━━━
  [run Bash: npm test]

  ✅ Tests: 89 passed, 0 failed
  ✅ TypeScript: no errors
  ✅ Lint: no errors

  Summary: 7 new files, 47 edited, 1 deleted
  60 total functions migrated successfully
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Verify and commit                                       │
└─────────────────────────────────────────────────────────────────┘

You: /simplify

Claude: Reviewing the refactored code...

  ✅ No duplicate functions
  ✅ Imports are all correct
  ✅ No circular dependencies
  ⚠️ src/utils/collection.ts: groupBy() and chunk() could be replaced
     with lodash equivalents
     → Suggestion: keep them for now and migrate later (no need to change now)

You: /commit

Claude: Commit message:
  "refactor: split monolithic utils.ts into 6 focused modules

   Split 2,147-line utils.ts into date, currency, validation, string,
   collection, and crypto modules. Updated imports across 47 files.
   All 89 existing tests pass without modification."

  ✅ Committed
```

**Flow Summary:** analyze → create 7 modules → update 47 files → 89 tests pass → commit
**Time spent:** ~10 minutes (normally 4–8 hours)

---

### Flow 5: Using Agent Teams to Review a Large PR

> **Scenario:** A teammate sends a PR that touches 45 files and changes the entire payment system. You need to review it thoroughly.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Create an agent team for the review                     │
└─────────────────────────────────────────────────────────────────┘

$ claude

You: Review PR #156 that overhauls the payment system.
     Create a 3-member agent team to review it in parallel:
     - Member 1: security (payment data, PCI compliance)
     - Member 2: business logic (pricing, tax, refund)
     - Member 3: test coverage + error handling
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Agent teams work in parallel                            │
└─────────────────────────────────────────────────────────────────┘

Claude: Agent team created. Reviewing PR #156...

  ┌─ Agent "Security" ──────────────────────────┐
  │ Checking: payment data flow, PCI, secrets   │
  │ Status: reading 15/45 files...              │
  └─────────────────────────────────────────────┘

  ┌─ Agent "Business Logic" ────────────────────┐
  │ Checking: pricing, tax, discount, refund    │
  │ Status: reading 22/45 files...              │
  └─────────────────────────────────────────────┘

  ┌─ Agent "Quality" ───────────────────────────┐
  │ Checking: tests, error handling, edge cases │
  │ Status: reading 8/45 files...               │
  └─────────────────────────────────────────────┘

  ... (5 minutes pass) ...
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Receive reports from every agent                        │
└─────────────────────────────────────────────────────────────────┘

Claude: ✅ Review complete. Summary from the 3 agents:

  ═══ 🔒 Security Agent ═══

  🔴 Critical (1):
  - payment.service.ts:89 — credit card number is logged to console
    Remove console.log(cardNumber) before merging

  🟡 Warning (2):
  - stripe.adapter.ts:34 — webhook secret should live in ENV, not hardcoded
  - refund.service.ts:67 — no rate limiting on the refund API

  ✅ Pass:
  - ✓ No SQL injection
  - ✓ Input validation on every endpoint
  - ✓ PCI data not stored in the database

  ═══ 💼 Business Logic Agent ═══

  🔴 Critical (1):
  - tax.calculator.ts:120 — EU tax calculation is wrong
    Uses US VAT rates instead of EU (15% vs. 20–27%)

  🟡 Warning (1):
  - discount.service.ts:45 — discount + coupon has no maximum cap
    Could result in a negative price

  ✅ Pass:
  - ✓ Pricing logic correct for US/UK
  - ✓ Refund logic correct
  - ✓ Currency conversion uses real-time rates

  ═══ ✅ Quality Agent ═══

  🟡 Warning (2):
  - Test coverage: 72% (below 80% standard)
    Missing tests for: EU tax, partial refund, currency edge cases
  - payment.controller.ts — catch block only logs, doesn't return the error
    to the client

  ✅ Pass:
  - ✓ Happy-path tests are complete
  - ✓ Stripe mock is correct
  - ✓ Transaction rollback tests exist

  ═══════════════════════════════════════

  📊 Overall summary:
  🔴 Critical: 2 (must fix before merge)
  🟡 Warning: 5 (recommended to fix)
  ✅ Pass: 9

  Should I post this as a comment on PR #156?

You: Yes, comment.

Claude: ✅ Comment posted on PR #156
```

**Flow Summary:** create 3 agent teams → review 45 files in parallel → consolidated report → comment on the PR
**Time spent:** ~5 minutes (normally 2–3 hours of solo review)

---

### Flow 6: Debugging a Production Issue via Log Analysis

> **Scenario:** The website slowed down this morning — response time jumped from 200ms to 2s. You need to find the cause urgently.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Pipe the log to Claude for analysis                    │
└─────────────────────────────────────────────────────────────────┘

$ cat /var/log/app/error.log | tail -500 | claude -p "
  The website got very slow this morning — response time jumped
  from 200ms to 2s. Analyze this log and find the cause.
"
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Claude analyzes and identifies the cause               │
└─────────────────────────────────────────────────────────────────┘

Claude:
  🔍 Analysis of the last 500 log lines:

  📊 Patterns observed:
  1. [08:15:03] "SLOW QUERY: SELECT * FROM products WHERE ... — 1,847ms"
     → This query repeated 342 times in 1 hour
  2. [08:15:03] "Redis connection timeout" — 28 times
  3. [08:22:45] "Pool exhausted, waiting for connection" — 156 times

  🎯 Causes (sorted by likelihood):

  1. 🔴 N+1 query in product listing (90% likely the main cause)
     - Query "SELECT * FROM products WHERE category_id = ?" runs 342 times
     - Should be a single query with JOIN or WHERE IN
     - Fills the connection pool → other requests have to wait

  2. 🟡 Redis connection timeout (likely a side effect)
     - Cache misses send every request to the database → even slower

  3. 🟡 No index on products.category_id
     - The query falls back to a full table scan

  💡 Quick fixes:
  1. Add an index on products.category_id (immediate fix)
  2. Fix the N+1 query in product.repository.ts (~10 minutes)
  3. Investigate Redis connections (might be memory related)
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3: Open Claude interactive to apply the fix               │
└─────────────────────────────────────────────────────────────────┘

$ claude -c

You: Fix the N+1 query and add the index. Urgent.

Claude:
  [read src/repositories/product.repository.ts]

  Found it on line 78:

  ❌ Old code (N+1 query):
  async getByCategory(categoryId: string) {
    const products = await this.find({ categoryId });
    for (const product of products) {
      product.reviews = await this.reviewRepo.find({ productId: product.id });
      //                ^^^^^^^^ query inside a loop! ← cause
    }
  }

  ✅ New code (1 query):
  async getByCategory(categoryId: string) {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'review')
      .where('product.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  📝 Edit product.repository.ts ✓
  📝 Create migration: AddIndexOnProductCategoryId ✓
  📝 Run tests → 89 passed ✓

You: /commit

Claude: "fix: resolve N+1 query in product listing causing 2s response time

   Replace loop-based review loading with JOIN query.
   Add index on products.category_id for faster lookups.
   Reduces product listing from ~1,800ms to ~50ms."

  ✅ Committed + pushed
```

**Flow Summary:** pipe log → Claude analyzes → identifies N+1 query → fix → commit + push
**Time spent:** ~8 minutes (normally 1–3 hours of debugging)

---

### Flow 7: A Full Day's Work (Daily Workflow)

> **Scenario:** A simulated full workday for a developer using Claude Code.

```
┌──────────────────────────────────────────────────────────────────────┐
│  🌅 09:00 — Power on, start the day                                 │
└──────────────────────────────────────────────────────────────────────┘

$ cd ~/projects/ecommerce-api
$ claude -c                           ← resume yesterday's session

Claude: Hello! Yesterday we fixed the order duplication bug.
  What can I help with today?        ← Claude remembers thanks to session + memory

You: Three things today:
     1. Fix a bug QA reported — items can't be removed from the cart
     2. Build a feature to export orders as CSV
     3. Review PR #160 from a junior teammate

┌──────────────────────────────────────────────────────────────────────┐
│  🐛 09:15 — Fix the cart bug                                        │
└──────────────────────────────────────────────────────────────────────┘

You: Start with the cart bug — QA says clicking delete on a cart item
     doesn't remove it from the screen, but a refresh does.

Claude: Sounds like the API is returning the wrong response. Let me look.

  [read src/controllers/cart.controller.ts]
  [read src/services/cart.service.ts]

  Found it! cart.controller.ts:67
  The DELETE endpoint returns status 200 but doesn't include the updated
  cart, so the frontend doesn't know to update its state.

  📝 Edit → return the updated cart in the response body ✓
  📝 Write a test ✓
  📝 Run tests → passed ✓

You: /commit
Claude: ✅ Committed: "fix: return updated cart after item deletion"

┌──────────────────────────────────────────────────────────────────────┐
│  🆕 10:00 — Build the CSV export feature                            │
└──────────────────────────────────────────────────────────────────────┘

You: Next — build an API to export orders as CSV.
     - Admins only
     - Filter by date range
     - Support 100,000+ orders

  [press Cmd+T → enable Extended Thinking]

Claude: (Extended Thinking: needs to stream the CSV because 100K records
  shouldn't be loaded into memory all at once...)

  📋 Plan:
  1. Create GET /api/admin/orders/export?from=&to=&format=csv
  2. Use a streaming response (don't load it all into memory)
  3. Cursor-based pagination for the query
  4. Admin auth middleware
  5. Tests

  📝 Create src/services/order-export.service.ts ✓
  📝 Create src/controllers/admin/order-export.controller.ts ✓
  📝 Edit src/routes/admin.routes.ts ✓
  📝 Create tests (4 cases) ✓
  📝 Run tests → passed ✓

You: /commit
Claude: ✅ Committed: "feat: add CSV export for orders with streaming support"

┌──────────────────────────────────────────────────────────────────────┐
│  🔍 11:00 — Review the junior's PR                                  │
└──────────────────────────────────────────────────────────────────────┘

You: Review PR #160 from K — adding the coupon system.

Claude: Reviewing PR #160...

  [read PR diff — 12 files, +450/-23 lines]

  📋 Review summary:

  ✅ Strong points:
  - Coupon model design is good — has expiry, usage limit, minimum order
  - Tests cover 12 cases
  - Uses a transaction for coupon redemption

  ⚠️ Should fix:
  1. coupon.service.ts:34 — race condition: if two people redeem the same
     coupon simultaneously, usage_count may be wrong → recommend a
     database-level atomic increment
  2. coupon.validator.ts:12 — discount percentage has no max cap
     Setting discount: 200 produces a negative price

  💡 Minor:
  3. coupon.routes.ts:8 — no rate limiting on POST /coupons/apply

  Should I comment on the PR?

You: Yes, comment, and include suggested code.

Claude: ✅ Comment posted on PR #160
  → Includes code suggestions for all three points

┌──────────────────────────────────────────────────────────────────────┐
│  🍔 12:00 — Lunch                                                   │
└──────────────────────────────────────────────────────────────────────┘

  [shut down / leave it running]

┌──────────────────────────────────────────────────────────────────────┐
│  ☕ 13:00 — Resume work                                             │
└──────────────────────────────────────────────────────────────────────┘

$ claude -c                           ← resume; Claude remembers everything

Claude: Welcome back! This morning you finished:
  ✅ Cart bug — committed
  ✅ CSV export — committed
  ✅ PR #160 review — commented

  What's next?

┌──────────────────────────────────────────────────────────────────────┐
│  📝 13:30 — Add tests requested by tech lead                        │
└──────────────────────────────────────────────────────────────────────┘

You: Tech lead asked for integration tests for the entire payment flow.
     Right now we only have unit tests.

Claude: Got it. Let me look at what the payment flow includes...

  [survey payment-related files]

  Payment flows to test:
  1. Create order → process payment → confirm order
  2. Create order → payment failed → order cancelled
  3. Create order → payment → partial refund
  4. Create order → payment → full refund
  5. Create order → payment → dispute → refund

  📝 Create src/__tests__/integration/payment-flow.test.ts ✓
  📝 Create src/__tests__/integration/helpers/payment-mock.ts ✓
  📝 5 integration tests written
  📝 Run tests → 5 passed ✓

You: /commit
Claude: ✅ Committed: "test: add integration tests for complete payment flow"

┌──────────────────────────────────────────────────────────────────────┐
│  📊 15:00 — Open a PR for today's work                              │
└──────────────────────────────────────────────────────────────────────┘

You: /pr

Claude: Creating a PR for today's work...

  Branch: feature/daily-improvements-apr-16
  PR #161: "Fix cart deletion, add CSV export, payment integration tests"

  ## Summary
  - Fix: cart item deletion now returns the updated cart
  - Feat: admin CSV export for orders (streaming, 100K+ support)
  - Test: 5 integration tests for the complete payment flow

  ## Changes
  - 8 files changed, +680 lines, -12 lines
  - 3 commits

  ✅ PR #161 created

┌──────────────────────────────────────────────────────────────────────┐
│  🔄 16:00 — Schedule a task for tomorrow                             │
└──────────────────────────────────────────────────────────────────────┘

You: Schedule Claude to scan the error log every morning at 8:00
     and summarize anything unusual.

Claude: ✅ Scheduled task created
  → Every day at 08:00, will analyze the error log and summarize for you

┌──────────────────────────────────────────────────────────────────────┐
│  🌙 17:00 — End of day                                              │
└──────────────────────────────────────────────────────────────────────┘

You: End of day. Summarize what we did.

Claude: 📊 Today's summary:

  ✅ Completed:
  1. 🐛 Fix cart deletion bug — PR #161 (10 min)
  2. 🆕 Build CSV export — PR #161 (30 min)
  3. 🔍 Review PR #160 coupon system — commented (15 min)
  4. 📝 Write integration tests — PR #161 (20 min)
  5. ⏰ Set up daily error log check — scheduled

  📈 Stats:
  - Commits: 3
  - New files: 5
  - Edited files: 6
  - New tests: 11
  - PRs created: 1
  - PRs reviewed: 1

  See you tomorrow! 👋
```

**Daily Workflow Summary:**

| Time | Task | Actual time | Normal time (without Claude) |
|------|------|-------------|------------------------------|
| 09:15 | Fix cart bug | 10 min | 1 hour |
| 10:00 | Build CSV export feature | 30 min | 3–4 hours |
| 11:00 | Review PR #160 | 15 min | 1–2 hours |
| 13:30 | Write integration tests | 20 min | 2–3 hours |
| 15:00 | Create PR | 2 min | 15 min |
| **Total** | | **~1.5 hours** | **~8–10 hours** |

---

### Flow 8: CI/CD Pipeline With Headless Mode

> **Scenario:** You want Claude Code to review every PR automatically and to generate release notes for every release.

```
┌─────────────────────────────────────────────────────────────────┐
│  File .github/workflows/ai-review.yml                           │
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
          # Pull the PR diff
          DIFF=$(git diff origin/main...HEAD)

          # Send it to Claude for analysis
          REVIEW=$(echo "$DIFF" | claude --bare -p "
            Review this code:
            1. Find bugs and security issues
            2. Check for performance problems
            3. Score it from 1 to 10
            4. Summarize as Markdown

            Reply in JSON format:
            {score, bugs, security, performance, summary}
          " --output-format json \
            --allowedTools "Read" \
            --max-turns 5 \
            --model sonnet)

          # Post a comment on the PR
          echo "$REVIEW" | jq -r '.result.summary' | \
            gh pr comment ${{ github.event.pull_request.number }} --body -

      - name: Block if Critical Issues
        run: |
          SCORE=$(echo "$REVIEW" | jq -r '.result.score')
          if [ "$SCORE" -lt 5 ]; then
            echo "❌ AI Review Score: $SCORE/10 — must fix before merging"
            exit 1
          fi
```

```
┌─────────────────────────────────────────────────────────────────┐
│  File .github/workflows/release-notes.yml                       │
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
          # Pull commits since the previous release
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD~1 2>/dev/null || echo "")
          COMMITS=$(git log ${PREV_TAG}..HEAD --oneline)

          # Have Claude generate release notes
          NOTES=$(echo "$COMMITS" | claude --bare -p "
            Create release notes from this commit list.
            Group into: Features, Bug Fixes, Improvements, Breaking Changes.
            Use English aimed at end users (not developers).
            Format: Markdown
          " --model sonnet --max-turns 3)

          # Update the release notes
          gh release edit ${{ github.event.release.tag_name }} \
            --notes "$NOTES"
```

**Result:**
- Every PR is automatically reviewed by AI and given a score
- PRs that score below 5 are blocked from merging
- Every release gets polished release notes automatically
- The team no longer has to do manual review/notes

---

### Side-by-Side Summary: Before vs. After Claude Code

| Task | Before (manual) | After (Claude Code) | Time saved |
|------|-----------------|---------------------|------------|
| Onboarding to a new project | 1–2 days | 10 min | 95% |
| General bug fix | 1–3 hours | 10–15 min | 85% |
| Building a new feature (CRUD) | 4–8 hours | 20–30 min | 90% |
| Refactoring a large file | 4–8 hours | 10 min | 95% |
| Code review on a big PR | 1–3 hours | 5 min | 90% |
| Production debugging | 1–3 hours | 8 min | 90% |
| Writing tests | 2–4 hours | 15–20 min | 85% |
| Creating a PR + description | 15–30 min | 1–2 min | 90% |
| Automated CI/CD review | Manual on every PR | 100% automated | 100% |
| **Daily total** | **8–10 hours** | **~1.5 hours** | **~85%** |

---

## Conclusion

Claude Code is a feature-complete AI tool for developers:

- **A powerful CLI** — 50+ commands and flags
- **Permission system** — from read-only to fully autonomous
- **Extensible** — via Skills, Hooks, Subagents, MCP, Plugins
- **Persistent context** — CLAUDE.md and Auto Memory
- **Parallel work** — Agent Teams and Worktrees
- **Cross-platform** — Terminal, Desktop, VS Code, JetBrains, Web, Mobile
- **Schedulable** — Scheduled Tasks and Cloud Routines
- **Git integration** — PRs, commits, reviews built in
- **Secure** — sandboxing, permissions, protected paths
- **Code Intelligence** — real-time type/error checking

---

> **Document version:** Last updated April 15, 2026
> **Applies to:** Latest Claude Code version (Claude Opus 4.6 / Sonnet 4.6 / Haiku 4.5)

---

## Navigation

- ⬅️ Previous: [[25-tips-best-practices]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/26-real-world-workflows]]
