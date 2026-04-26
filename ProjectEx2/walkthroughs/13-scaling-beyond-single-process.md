---
walkthrough: 13
title: Scaling beyond single-process — เมื่อไหร่ JSON store พัง และ migrate ยังไง
related:
  - "[[01-getting-started]]"
  - "[[03-permissions-deep-dive]]"
  - "[[12-real-world-flow]]"
---

# 13 — Scaling Beyond Single-Process: เมื่อ TaskFlow JSON store พัง

> เป้าหมาย: เข้าใจขีดจำกัดของ flat JSON store ใน TaskFlow, **เห็น race condition จริง**, และเลือก migration path ที่เหมาะสม (file lock → SQLite → Postgres) — โดยใช้ Claude Code ช่วยทุกขั้น

## ทำไมต้องอ่านบทนี้

`src/core/store.js` ทำแค่ 3 บรรทัด:

```js
function save(state, dbPath) {
  fs.writeFileSync(dbPath || defaultDbPath(), JSON.stringify(state, null, 2));
  return state;
}
```

ไม่มี lock, ไม่มี transaction, ไม่มี atomic rename — **ตั้งใจให้ง่าย** สำหรับ project ตัวอย่าง

แต่พอผู้ใช้จริงเริ่มเปิด CLI กับ HTTP server พร้อมกัน หรือ scale HTTP server เป็นหลาย worker → **ข้อมูลหาย**

## 1) เห็น race condition จริง (3 นาที)

เปิด 2 terminal:

```bash
# Terminal A — HTTP server
cd ProjectEx2/taskflow
node src/server/index.js          # listen :3000

# Terminal B — ยิง 50 POST พร้อมกัน
seq 1 50 | xargs -P 20 -I{} \
  curl -s -X POST http://localhost:3000/tasks \
       -H 'content-type: application/json' \
       -d '{"title":"task {}"}' > /dev/null

node src/cli/index.js list | wc -l
```

**คาด:** 50 (+ header)
**จริง:** มักจะได้ **30-45** เท่านั้น

ที่หายไปคือ task ที่:
1. โหลด state เก่า (`nextId = N`)
2. push item ใหม่
3. ก่อน writeFileSync เสร็จ → request อื่นโหลดเลขเดียวกัน, push ทับ, write ทับ

**Symptom จริงที่ user รายงาน:**
- "task บางอันหาย"
- "id ซ้ำ"
- "บางครั้ง `.taskflow.json` กลายเป็น blob ครึ่ง ๆ กลาง ๆ" (ถ้า process ตายตอน write)

> ต้องแก้ — แต่ห้ามบอลต์ lock ใส่ JSON store เฉย ๆ มันจะทำให้ code ดู "เกือบปลอดภัย" แต่ยังพังในเคส process crash, NFS, Docker layer

## 2) ขั้นบันได 3 ขั้นของการ scale

| ขั้น | เมื่อไหร่ใช้ | คุ้มค่าใน |
|------|--------------|-----------|
| **0. ป้องกัน** (เดิม) | 1 process, 1 user, single host | dev box, demo, CLI ส่วนตัว |
| **1. File lock + atomic write** | 2-3 process บน host เดียว, low write rate | hobby self-host, side project |
| **2. SQLite + WAL** | <100 req/s, single host, ต้องการ ACID | ส่วนใหญ่ของ side projects ที่กลายเป็น product |
| **3. Postgres / Redis** | multi-host, multi-worker, high write | production จริง |

> กฎเหล็ก: **อย่ากระโดดข้ามขั้น** Step 0 → 3 ทันทีคือทำงานเกินจำเป็น และเสีย invariant ของ project (zero-deps)

## ขั้นที่ 1 — File lock + atomic write

**ใช้เมื่อ:** 1 host, 1-3 process, write rate ต่ำ (CLI กับ server เปิดพร้อมกัน)
**คงไว้:** zero deps, JSON file, simple

### พิมพ์เขียว

```js
// src/core/store.js (after migration)
const fs = require('fs');
const path = require('path');
const os = require('os');

function lockPath(dbPath) { return dbPath + '.lock'; }

function withLock(dbPath, fn) {
  const lock = lockPath(dbPath);
  const start = Date.now();
  while (true) {
    try {
      // O_CREAT | O_EXCL — atomic on POSIX, mostly atomic on NTFS
      const fd = fs.openSync(lock, 'wx');
      fs.closeSync(fd);
      try { return fn(); }
      finally { try { fs.unlinkSync(lock); } catch {} }
    } catch (e) {
      if (e.code !== 'EEXIST') throw e;
      if (Date.now() - start > 5000) throw new Error('store: lock timeout');
      // tight spin is fine for low contention; for >10 req/s, switch to step 2
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25);
    }
  }
}

function save(state, dbPath) {
  const file = dbPath || defaultDbPath();
  withLock(file, () => {
    const tmp = file + '.tmp.' + process.pid;
    fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
    fs.renameSync(tmp, file);                  // atomic on same filesystem
  });
  return state;
}

function update(mutator, dbPath) {
  const file = dbPath || defaultDbPath();
  return withLock(file, () => {
    const state = load(file);                  // re-read inside lock!
    const next = mutator(state);
    save(next, file);
    return next;
  });
}
```

**สิ่งที่เปลี่ยนใน adapter:**
- `commands.js` (CLI) และ `routes.js` (HTTP) ต้องเลิกเรียก `load → mutate → save` แล้วใช้ `update(state => ...)` แทน
- ทุกที่ที่ allocate `nextId` → ต้องอยู่ใน `update()` callback

### ใช้ Claude Code ทำให้

```
> Plan Mode (Shift+Tab)
> migrate src/core/store.js to use a file lock + atomic rename. 
  Add an update(mutator) helper. Rewrite commands.js and routes.js 
  to use update() for any read-modify-write. Keep zero deps.
```

Output ที่ควรเห็น:
1. Plan ระบุไฟล์ที่จะแก้ (`store.js`, `commands.js`, `routes.js`, `tests/store.test.js`)
2. Note ว่า test ใหม่ต้อง concurrent (ใช้ `Promise.all` + `withLock`)
3. หลัง implement → PostToolUse hook รัน test → ทุก test ผ่าน → diff สั้น (~80 บรรทัด)

```
> /security-scan
```

`security` subagent **เลิกถือว่า race เป็น constraint** (เพราะตอนนี้แก้แล้ว) แต่จะ flag เคสใหม่ที่อาจเกิด:
- lock file ค้างหลัง process kill -9 → mitigation: เพิ่ม PID check + stale timeout
- NFS ไม่ honor `O_EXCL` consistently → ระบุข้อจำกัดใน CLAUDE.md

### ข้อจำกัดที่ยังเหลือ

- **Lock contention:** ถ้า > 10 req/s → spin lock burn CPU
- **Crash mid-write:** atomic rename ป้องกันไฟล์ครึ่ง ๆ ได้, แต่ `.lock` ค้างต้องล้าง
- **No queries:** ยังต้อง `JSON.parse` ทั้งไฟล์ทุกครั้ง — โต 10MB ก็เริ่มช้า

> ขั้น 1 ซื้อเวลาไป **6 เดือน** สำหรับ project ส่วนใหญ่ ระหว่างนั้นคิดว่าจะข้ามไปขั้น 2 หรือ 3

## ขั้นที่ 2 — SQLite + WAL mode

**ใช้เมื่อ:** ขั้น 1 เริ่มมี contention, ต้องการ query (filter, sort, join), ต้องการ ACID
**ราคา:** เพิ่ม 1 dependency (`better-sqlite3`) แต่ได้ index, transaction, single-file backup

### พิมพ์เขียว

```js
// src/core/store.js (sqlite version)
const Database = require('better-sqlite3');
let db;

function open(dbPath) {
  db = new Database(dbPath || defaultDbPath());
  db.pragma('journal_mode = WAL');             // multi-reader, single-writer concurrency
  db.pragma('synchronous = NORMAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      priority TEXT,
      tag TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
  `);
}

function addTask(input) {
  const r = db.prepare(`
    INSERT INTO tasks (title, priority, tag) VALUES (?, ?, ?)
  `).run(input.title, input.priority || null, input.tag || null);
  return { id: r.lastInsertRowid, ...input, done: false };
}

function listTasks({ tag, done } = {}) {
  return db.prepare(`
    SELECT * FROM tasks
    WHERE (? IS NULL OR tag = ?)
      AND (? IS NULL OR done = ?)
    ORDER BY id ASC
  `).all(tag ?? null, tag ?? null, done == null ? null : (done ? 1 : 0), done == null ? null : (done ? 1 : 0));
}
```

**ทำไม WAL:**
- Reader ไม่ block writer (multi-process safe within same host)
- Crash safety จริง — half-written page rolls back automatically
- ใส่ index ได้, query ได้แบบ SQL จริง

### ใช้ Claude Code migrate

```
> /test                    # baseline: 25 tests pass
> Plan Mode
> migrate from JSON store to SQLite using better-sqlite3.
  Keep the public API of src/core/store.js exactly the same so 
  cli/server don't change. Write a one-shot migration script 
  scripts/migrate-json-to-sqlite.js. Update CLAUDE.md to drop 
  the "no dependencies" rule (it's intentional now).
```

ลำดับที่ Claude จะแนะนำ (ผ่าน planning):
1. เพิ่ม `better-sqlite3` ใน `package.json`
2. แทน `store.js` แบบ in-place — keep signature
3. เขียน migration script (อ่าน `.taskflow.json` เก่า → INSERT แต่ละ row)
4. อัพเดต CLAUDE.md (architecture rules)
5. รัน test ทั้งหมด — ถ้า test pure (ไม่แตะ fs จริง) → ผ่านโดยไม่แก้
6. เพิ่ม test ใหม่: concurrent writes (50 goroutine = 50 row, ไม่หายแม้แต่ตัวเดียว)

```
> /security-scan
```

ตอนนี้ `security` subagent ควรขึ้น **SAFE** — race condition หาย เพราะ SQLite WAL handle ให้

### ข้อจำกัดที่ยังเหลือ

- **Single host:** SQLite อยู่ในไฟล์ → ถ้า scale เป็น 2 EC2 → ไม่ share state
- **Backup:** ต้อง snapshot ไฟล์ตอน server idle (หรือใช้ `sqlite3 backup`)
- **High write rate:** `> 1000 writes/s` เริ่มเห็น lock contention บน WAL

> ขั้น 2 ซื้อเวลาให้คุณอีก **2-3 ปี** ในกรณี side project / SaaS เล็ก

## ขั้นที่ 3 — Postgres (multi-host)

**ใช้เมื่อ:** หลาย host, หลาย worker, traffic จริง, ต้องการ replication/HA
**ราคา:** infrastructure (RDS / managed Postgres) + ต้อง schema migration จริงจัง (Prisma/Drizzle/sqlx)

### Trigger ที่บอกว่าถึงเวลา

- ขึ้น Kubernetes / autoscaler
- ต้อง zero-downtime deploy (rolling)
- ต้อง backup ทุกชั่วโมง + PITR
- มีหลาย service เขียน DB เดียวกัน
- "ขอ analytics realtime หน่อย" — SQLite ไม่เกิด

### Migrate จาก SQLite ใช้ Claude Code

```
> /docs                    # ให้ docs-writer สรุป schema ปัจจุบันก่อน
> Plan Mode
> migrate from SQLite to Postgres using node-postgres (pg).
  - Use connection pooling (pg.Pool)
  - Move SQL into src/core/queries.sql with prepared statement names
  - Add a migration runner that reads scripts/migrations/*.sql in order
  - Keep public API of store.js identical so cli/server unchanged
  - Add docker-compose.yml with postgres:16-alpine for local dev
```

แล้ว delegate ให้ subagent โดยไม่กิน context หลัก:

```
> @reviewer migrate the data layer per the plan above. 
  Run tests after each file edit. Stop on first failure.
```

`reviewer` ทำงานในกล่องของตัวเอง, รายงานกลับมา 1 ย่อหน้า, ของจริงอยู่ใน diff

### Schema migration → Plan vs Hard rules

ใส่ใน `CLAUDE.md`:

```markdown
## Schema migrations
- Every schema change goes in scripts/migrations/NNNN-name.sql (sequential, immutable)
- NEVER edit a migration that has been deployed
- NEVER `DROP COLUMN` in the same migration that stops using it — split into deprecate (ignore) → release → drop
- Use `pg_dump --schema-only` before merging to confirm diff matches the migration
```

แล้ว Plan Mode บังคับ Claude follow rule นี้ทุกครั้งที่แตะ schema

## 3) Decision tree — ผมอยู่ขั้นไหน?

```
                       ┌─ 1 user, 1 process? ─── ขั้น 0 (เดิม) ── เพียงพอ
                       │
   เริ่มเห็นข้อมูลหาย ─┼─ 1 host, 2-3 process? ── ขั้น 1 (lock+atomic)
                       │
                       ├─ ต้องการ query/transaction? ── ขั้น 2 (SQLite WAL)
                       │
                       └─ multi-host / autoscale? ── ขั้น 3 (Postgres)
```

**Anti-pattern ที่เจอบ่อย:**

| ❌ ผิด | ทำไมพัง | ✅ ถูก |
|-------|----------|-------|
| ใส่ `mutex` ใน Node app | ป้องกัน intra-process เท่านั้น — process อื่นยังชน | File lock + atomic rename |
| `setInterval(save, 1000)` | ลด race ไม่ได้ — แค่ลด chance | Lock ทุก write |
| Append-only JSON line | "log" ไม่ใช่ store — ยังต้อง compact | SQLite (ทำให้แล้ว) |
| Redis เป็น primary store | Redis คือ cache — persistence อ่อนกว่า Postgres | Postgres + Redis cache |

## 4) Test strategy ที่ scale ตามแต่ละขั้น

| ขั้น | Test ที่ต้องเพิ่ม |
|------|-------------------|
| 0 | basic unit (มีแล้ว 25 tests) |
| 1 | **concurrent test:** spawn 50 promise พร้อมกัน, expect 50 unique ids |
| 2 | concurrent + crash test (kill -9 mid-write, restart, expect intact DB) |
| 3 | integration (real Postgres in CI), migration test (run แต่ละ migration บน fresh DB) |

ตัวอย่าง concurrent test (สำหรับขั้น 1):

```js
// tests/store.concurrent.test.js
const { test } = require('node:test');
const assert = require('node:assert');
const { tmpDb } = require('./_helpers');
const { update } = require('../src/core/store');

test('50 concurrent writes produce 50 unique ids', async () => {
  const db = tmpDb();
  const promises = Array.from({ length: 50 }, (_, i) =>
    update(s => ({
      nextId: s.nextId + 1,
      items: [...s.items, { id: s.nextId, title: `t${i}` }],
    }), db)
  );
  await Promise.all(promises);

  const final = require('../src/core/store').load(db);
  const ids = new Set(final.items.map(t => t.id));
  assert.strictEqual(ids.size, 50, 'every id must be unique');
  assert.strictEqual(final.items.length, 50, 'no items lost');
});
```

> ถ้า test นี้ **ผ่าน** = ขั้น 1 ทำงาน ถ้า **fail** = race ยังอยู่

## 5) Migration as a Claude Code workflow

```bash
# step 1: spawn reviewer to audit current state
claude -p "use the reviewer subagent to audit src/core/store.js for concurrency safety; output as YAML"

# step 2: open session, plan migration
claude
> Plan Mode
> migrate to step 1 (file lock + atomic write) following walkthrough 13

# step 3: after green tests, headless verify
claude -p --output-format json --max-turns 3 \
  "run npm test, then run scripts/concurrent-smoke.sh; \
   reply OK only if both pass"

# step 4: commit via skill
> @commit-formatter draft commit message for the migration

# step 5: tag + release
> /release minor
```

## ก่อนปิดบท

- ขั้น 0 (เดิม) **ไม่ใช่ bug** — มันคือ design choice ที่เหมาะกับ scope เริ่มต้น
- migrate **เมื่อมี trigger จริง** เท่านั้น (ข้อมูลหาย, ต้อง query, scale)
- ทุกขั้นมี Claude Code feature ที่ช่วย: Plan Mode (วาง), subagent (ทำ + audit), hook (รัน test ทุก edit), `/release` (ปิดงาน)

## Related

- ย้อนกลับ **[[01-getting-started]]** เพื่อ baseline
- ดู **[[03-permissions-deep-dive]]** ก่อน expand permissions ตอน migrate (deny `DROP TABLE` etc.)
- จบลูป **[[12-real-world-flow]]** หลัง migrate เสร็จ
