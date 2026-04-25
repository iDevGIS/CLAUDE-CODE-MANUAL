# Changelog

บันทึกการเปลี่ยนแปลงทั้งหมดของ **CLAUDE-CODE-MANUAL** จะถูก track ที่ไฟล์นี้

รูปแบบยึดตาม [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
และ versioning ใช้ [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

> **Versioning Policy**
> - **MAJOR** — ปรับโครงสร้างใหญ่ / เปลี่ยนชื่อไฟล์หลัก / breaking ของผู้อ่าน (link เก่าใช้ไม่ได้)
> - **MINOR** — เพิ่มหัวข้อใหม่ / เพิ่มไฟล์ guide / เพิ่ม feature ใหม่ของคู่มือ
> - **PATCH** — แก้ typo / ปรับสำนวน / อัปเดตตัวอย่างเล็กน้อย / fix link

---

## [Unreleased]

### Planned
- เพิ่ม **Cookbook** ตัวอย่าง use case จริง (CI/CD, code review, refactor)
- ใส่ภาพประกอบ / diagram สำหรับ Hooks lifecycle และ Agent Team flow
- Sync เนื้อหา TH ↔ EN เมื่อมี Claude Code version ใหม่

---

## [1.3.2] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `README.EN.md` — full English version of the landing-page README (mirrors structure of TH `README.md`)
- Cross-language switcher: both `README.md` and `README.EN.md` link to each other at the top

### Changed
- `README.md` language badges now link to the language-specific README (not the long guide), so the "Thai/English" badge acts as a language toggle

---

## [1.3.1] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `.obsidian/` shared vault config — clone แล้วเปิดเป็น Obsidian vault ได้ทันที โดยไม่ต้อง setup ใหม่
  - `app.json`, `appearance.json` — base settings
  - `core-plugins.json` — เปิด Graph, Backlinks, Outline, Tag pane, Properties, Bookmarks ที่จำเป็น
  - `graph.json` — graph view ปรับแต่งไว้สำหรับโครงสร้างคู่มือ (linkDistance/repelStrength/scale)
- README section "🪨 เปิดเป็น Obsidian Vault ทันที" พร้อมขั้นตอน clone → open vault

### Changed
- `.gitignore` exclude เฉพาะ `workspace.json` / `workspace-mobile.json` / `cache` (state ส่วนตัวของผู้ใช้แต่ละคน) — ส่วน config ที่ใช้ร่วมกันได้ commit ขึ้น repo แล้ว

---

## [1.3.0] — 2026-04-26

### Added
- `docs/th/` and `docs/en/` directories with 26 atomic notes per language (52 files total)
- YAML frontmatter (title, tags, aliases, related, lang) on every atomic note for Obsidian compatibility
- Wikilink-based navigation (prev/next/index/cross-language) at the bottom of every note
- MOC (Map of Content) index at `docs/th/README.md` and `docs/en/README.md`, grouped into 5 categories
- "📚 Documentation Modes" section in root README explaining single-page vs atomic reading modes
- `Obsidian: Ready` badge in root README

### Compatibility
- Claude Code: `v2.1.114`

### Notes
- The original `Claude-Code-Guide-TH.md` and `Claude-Code-Guide-EN.md` remain at the repo root for single-page reading.
- Atomic notes mirror the same 26-section structure 1:1 — no content was rewritten, only restructured.

---

## [1.2.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `Claude-Code-Guide-EN.md` — **English translation** ของคู่มือเต็ม (1:1 จากฉบับ TH)
- README: badge และ link สำหรับ EN guide
- README: ระบุ Claude Code version (`2.1.114`) ที่เนื้อหาคู่มืออ้างอิง
- README: link ไป `CHANGELOG.md` ใต้หมวด "ลิงก์ที่เกี่ยวข้อง"

### Changed
- README หัวข้อ "เกี่ยวกับ" — อัปเดตเป็น "คู่มือภาษาไทยและอังกฤษ"

---

## [1.1.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `README.md` — landing page ของ repo พร้อม:
  - Quick Start สำหรับติดตั้ง
  - สารบัญแบ่ง 5 หมวด (พื้นฐาน / ตั้งค่า / ขั้นสูง / ใช้งานจริง / Reference)
  - Badge และลิงก์ deep-link ไปแต่ละ section ของ guide เต็ม
- `CHANGELOG.md` — ไฟล์นี้ สำหรับ track version

---

## [1.0.0] — 2026-04-26

### Compatibility
- **Claude Code:** `v2.1.114`

### Added
- `Claude-Code-Guide-TH.md` — คู่มือภาษาไทยฉบับเต็ม **3,317 บรรทัด** ครอบคลุม **26 หัวข้อใหญ่**:
  1. แนะนำ Claude Code
  2. การติดตั้งและตั้งค่าเริ่มต้น
  3. คำสั่ง CLI พื้นฐาน
  4. Slash Commands
  5. การทำงานกับไฟล์และโปรเจกต์
  6. Configuration & Settings
  7. Permissions System
  8. Hooks
  9. Skills
  10. MCP (Model Context Protocol)
  11. Subagents
  12. Agent Teams
  13. Custom Slash Commands
  14. Memory และ CLAUDE.md
  15. Plan Mode
  16. Background Tasks
  17. Git Integration
  18. GitHub Actions
  19. IDE Integration
  20. Headless Mode
  21. Cost & Usage Monitoring
  22. Best Practices
  23. Troubleshooting
  24. Tips & Tricks
  25. การประยุกต์ใช้งานจริง (Use Cases)
  26. Reference & Resources

### Notes
- เริ่มต้น repo ด้วย initial commit `dfdccf9`
- รองรับ Claude Code เวอร์ชันล่าสุด (Opus 4.7 / Sonnet 4.6 / Haiku 4.5)

---

## รูปแบบ Entry

แต่ละ version ใช้หัวข้อย่อยเหล่านี้ตามที่จำเป็น:

- **Added** — สิ่งที่เพิ่มใหม่
- **Changed** — สิ่งที่เปลี่ยนพฤติกรรม
- **Deprecated** — สิ่งที่จะถูกลบใน version ถัดไป
- **Removed** — สิ่งที่ถูกลบออก
- **Fixed** — แก้ bug / typo / link เสีย
- **Security** — ปิดช่องโหว่ (ถ้ามี)

---

[Unreleased]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.2...HEAD
[1.3.2]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/your-org/CLAUDE-CODE-MANUAL/releases/tag/v1.0.0
