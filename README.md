# CLAUDE-CODE-MANUAL

> คู่มือใช้งาน **Claude Code** ฉบับภาษาไทยแบบละเอียด — ครอบคลุมตั้งแต่ติดตั้ง ไล่ไปถึง Hooks, Skills, MCP, Subagents, Agent Teams และการประยุกต์ใช้งานจริง

[![Made with Claude Code](https://img.shields.io/badge/Made%20with-Claude%20Code-7B61FF)](https://docs.claude.com/claude-code)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-v2.1.114-7B61FF)](https://docs.claude.com/claude-code)
[![Language: Thai](https://img.shields.io/badge/Language-ไทย-blue)](./README.md)
[![Language: English](https://img.shields.io/badge/Language-English-red)](./README.EN.md)
[![Obsidian: Ready](https://img.shields.io/badge/Obsidian-Ready-7C3AED?logo=obsidian&logoColor=white)](./docs/th/README.md)

> 🇬🇧 Read in English → [`README.EN.md`](./README.EN.md)

---

## 📚 Documentation Modes

อ่านคู่มือได้ 2 รูปแบบ — เลือกตามสไตล์ของคุณ:

| โหมด | ลักษณะ | เหมาะสำหรับ | เริ่มที่ |
|------|--------|------------|---------|
| 📄 **Single-page** | ไฟล์เดียวยาวต่อภาษา (3,300+ บรรทัด) | อ่านไล่ลำดับ, ค้นหา (Ctrl+F), แชร์ลิงก์เดียว | [`Claude-Code-Guide-TH.md`](./Claude-Code-Guide-TH.md) · [`Claude-Code-Guide-EN.md`](./Claude-Code-Guide-EN.md) |
| 🧠 **Atomic / Obsidian-friendly** | 34 โน้ตเล็กต่อภาษา + frontmatter + wikilinks | เปิดใน Obsidian ดู Graph View, เลือกอ่านเฉพาะหัวข้อ | [`docs/th/README.md`](./docs/th/README.md) · [`docs/en/README.md`](./docs/en/README.md) |

> โฟลเดอร์ `docs/` แยกแต่ละหัวข้อเป็นโน้ตเล็ก ๆ พร้อม YAML frontmatter, tags, aliases, related และ wikilink ระหว่างหัวข้อ — เปิดทั้งโฟลเดอร์เป็น vault ใน Obsidian เพื่อใช้งาน Graph/Backlink ได้ทันที

### 🪨 เปิดเป็น Obsidian Vault ทันที

Repo นี้แถม `.obsidian/` มาด้วย — clone แล้วเปิดเป็น vault ได้เลยโดยไม่ต้องตั้งค่าใหม่:

```bash
git clone https://github.com/iDevGIS/CLAUDE-CODE-MANUAL.git
# Obsidian → Open folder as vault → เลือกโฟลเดอร์ที่ clone
```

มาให้แล้ว: **core plugins** ที่จำเป็น (Graph, Backlinks, Outline, Tag pane, Properties, Bookmarks) + **graph view** ที่ปรับแต่งไว้สำหรับโครงสร้างคู่มือ (linkDistance, repelStrength, scale)

ส่วน `workspace.json` (state ของ pane/tab/cursor ส่วนตัว) ถูก exclude ใน `.gitignore` ไว้แล้ว — แต่ละคนจะมีของตัวเอง

---

## 📖 เกี่ยวกับ

Repo นี้เป็น **คู่มือภาษาไทยและอังกฤษ** สำหรับใช้งาน [Claude Code](https://docs.claude.com/claude-code) — เครื่องมือ CLI อย่างเป็นทางการจาก Anthropic ที่ช่วยนักพัฒนาในการเขียนโค้ด แก้บัก รีแฟคเตอร์ และจัดการโปรเจกต์ด้วย AI

เนื้อหารวมทั้งหมด **5,000+ บรรทัด** แบ่งเป็น **26 หัวข้อหลัก + 8 atomic notes พิเศษ** (Tutorial 3 ตอน, Cookbook 40+ recipes, Cost Management, Security, Use Cases, Tool Comparisons) พร้อมตัวอย่าง CLI, config, และ flow การทำงานจริง

> **Claude Code Version:** `2.1.114`
> _เนื้อหาในคู่มืออ้างอิงจาก Claude Code เวอร์ชันนี้ — feature/flag/command บางส่วนอาจเปลี่ยนใน version ใหม่กว่า_

📕 **อ่านคู่มือเต็ม:**
- 🇹🇭 ภาษาไทย → [`Claude-Code-Guide-TH.md`](./Claude-Code-Guide-TH.md)
- 🇬🇧 English → [`Claude-Code-Guide-EN.md`](./Claude-Code-Guide-EN.md)

---

## 🚀 เริ่มต้นเร็ว

```bash
# ติดตั้ง Claude Code (ต้องมี Node.js 18+)
npm install -g @anthropic-ai/claude-code

# เข้าโปรเจกต์ของคุณ
cd your-project

# เริ่มใช้งาน
claude
```

> ครั้งแรกระบบจะให้ login ผ่านเบราว์เซอร์ หรือใช้ API Key จาก [Anthropic Console](https://console.anthropic.com)

---

## 🎯 ตัวอย่างโปรเจกต์ (ProjectEx)

อยากเห็น Claude Code ทำงานจริงตั้งแต่ `claude` ครั้งแรกจนถึง `git commit`? โฟลเดอร์ [`ProjectEx/`](./ProjectEx/) มีตัวอย่างพร้อมใช้:

| สิ่งที่อยู่ใน ProjectEx | รายละเอียด |
|---|---|
| 🛠️ **Todo CLI App** | โค้ดรันได้จริง zero dependencies — `index.js` + `lib/todo.js` + 5 tests (`node:test`) |
| ⚙️ **Claude Config Pack** | ตัวอย่าง `CLAUDE.md`, `.claude/settings.json` (permissions + PostToolUse hook), slash command `/test-all`, subagent `reviewer` |
| 📊 **Walkthrough Decks** | สไลด์ 12 หน้า TH + EN ([`TH.pptx`](./ProjectEx/ProjectEx-Walkthrough-TH.pptx) · [`EN.pptx`](./ProjectEx/ProjectEx-Walkthrough-EN.pptx)) |
| 🖼️ **Screenshots** | 7 รูป mockup ประกอบสไลด์ (regen ได้ด้วย Python) |
| 🔧 **Build Scripts** | `_build/make_screenshots.py` + `make_pptx.py` regenerate ได้ |

**ลองรันใน 30 วินาที:**

```bash
cd ProjectEx/todo-app
node index.js add "buy milk"
node index.js list
npm test
```

> 📥 อ่านรายละเอียดเต็มที่ [`ProjectEx/README.md`](./ProjectEx/README.md)

---

## 🚀 ตัวอย่างขั้นสูง (ProjectEx2)

อยากเห็น Claude Code ครบทุก feature ในโปรเจกต์ขนาดกลางจริง ๆ? โฟลเดอร์ [`ProjectEx2/`](./ProjectEx2/) คือ **showcase ขั้นสูง**:

| สิ่งที่อยู่ใน ProjectEx2 | รายละเอียด |
|---|---|
| 🌊 **TaskFlow App** | CLI + HTTP API (Node.js zero-deps) — 25 tests, 6 modules |
| 🧠 **CLAUDE.md hierarchy** | root + nested (`src/CLAUDE.md`) แสดง memory แบบหลายระดับ |
| 🪝 **Hooks ครบทุก lifecycle** | 7 events: SessionStart / UserPromptSubmit / Pre-Post ToolUse / Notification / Stop / SubagentStop |
| ⚙️ **Slash commands × 6** | `/test` `/lint` `/review` `/security-scan` `/release` `/docs` |
| 🤖 **Subagents × 4** | reviewer, tester, security, docs-writer (พร้อม system prompt + tool list) |
| 🎨 **Skill + Output Style + Status Line** | commit-formatter / senior-engineer / custom bash statusline |
| 🔌 **MCP + Plugin** | `mcp.json` 4 servers + standalone `plugin-example/` ที่ install แยก |
| 🤖 **Headless + Cron** | `claude -p` ใน CI + scheduled summary script |
| 📚 **12 Walkthroughs** | atomic notes ครบทุกหัวข้อ (Obsidian-friendly) |

**Feature → file map ครบ:** [`ProjectEx2/FEATURE-MATRIX.md`](./ProjectEx2/FEATURE-MATRIX.md)

```bash
cd ProjectEx2/taskflow
node src/cli/index.js add "ลอง ProjectEx2" --priority high
npm test                # 25/25 pass
claude                  # ดู hooks + statusline + output style ทำงาน
```

> 📥 รายละเอียดเต็ม [`ProjectEx2/README.md`](./ProjectEx2/README.md)

---

## 📚 สารบัญคู่มือ

### พื้นฐาน / Basics
| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 1 | [การติดตั้งและเริ่มต้นใช้งาน](./Claude-Code-Guide-TH.md#1-การติดตั้งและเริ่มต้นใช้งาน) | [Installation and Getting Started](./Claude-Code-Guide-EN.md#1-installation-and-getting-started) |
| 2 | [คำสั่ง CLI และ Flags](./Claude-Code-Guide-TH.md#2-คำสั่ง-cli-และ-flags) | [CLI Commands and Flags](./Claude-Code-Guide-EN.md#2-cli-commands-and-flags) |
| 3 | [Slash Commands](./Claude-Code-Guide-TH.md#3-slash-commands-คำสั่งลัด) | [Slash Commands](./Claude-Code-Guide-EN.md#3-slash-commands) |
| 4 | [คีย์ลัด (Keyboard Shortcuts)](./Claude-Code-Guide-TH.md#4-คีย์ลัด-keyboard-shortcuts) | [Keyboard Shortcuts](./Claude-Code-Guide-EN.md#4-keyboard-shortcuts) |

### การตั้งค่า / Configuration
| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 5 | [ระบบ Permission](./Claude-Code-Guide-TH.md#5-ระบบ-permission-สิทธิ์การเข้าถึง) | [Permission System](./Claude-Code-Guide-EN.md#5-permission-system) |
| 6 | [Configuration](./Claude-Code-Guide-TH.md#6-การตั้งค่า-configuration) | [Configuration](./Claude-Code-Guide-EN.md#6-configuration) |
| 7 | [CLAUDE.md - คำสั่งถาวรของโปรเจกต์](./Claude-Code-Guide-TH.md#7-claudemd---คำสั่งถาวรสำหรับโปรเจกต์) | [CLAUDE.md - Persistent Project Instructions](./Claude-Code-Guide-EN.md#7-claudemd---persistent-project-instructions) |
| 8 | [ระบบ Memory](./Claude-Code-Guide-TH.md#8-ระบบ-memory-ความจำ) | [Memory System](./Claude-Code-Guide-EN.md#8-memory-system) |

### ฟีเจอร์ขั้นสูง / Advanced Features
| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 9 | [MCP Servers](./Claude-Code-Guide-TH.md#9-mcp-servers-model-context-protocol) | [MCP Servers](./Claude-Code-Guide-EN.md#9-mcp-servers-model-context-protocol) |
| 10 | [Hooks (Event Handler)](./Claude-Code-Guide-TH.md#10-hooks-ระบบ-event-handler) | [Hooks (Event Handler System)](./Claude-Code-Guide-EN.md#10-hooks-event-handler-system) |
| 11 | [Skills (คำสั่งที่สร้างเอง)](./Claude-Code-Guide-TH.md#11-skills-คำสั่งที่สร้างเอง) | [Skills (Custom Commands)](./Claude-Code-Guide-EN.md#11-skills-custom-commands) |
| 12 | [Subagents](./Claude-Code-Guide-TH.md#12-subagents-ตัวช่วยเฉพาะทาง) | [Subagents](./Claude-Code-Guide-EN.md#12-subagents-specialized-helpers) |
| 13 | [Agent Teams](./Claude-Code-Guide-TH.md#13-agent-teams-ทีม-ai) | [Agent Teams](./Claude-Code-Guide-EN.md#13-agent-teams) |
| 14 | [การจัดการ Context](./Claude-Code-Guide-TH.md#14-การจัดการ-context) | [Context Management](./Claude-Code-Guide-EN.md#14-context-management) |

### การใช้งานจริง / Real-World Usage
| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 15 | [Git Integration](./Claude-Code-Guide-TH.md#15-git-integration) | [Git Integration](./Claude-Code-Guide-EN.md#15-git-integration) |
| 16 | [Headless Mode](./Claude-Code-Guide-TH.md#16-headless-mode-โหมดอัตโนมัติ) | [Headless Mode](./Claude-Code-Guide-EN.md#16-headless-mode) |
| 17 | [IDE Integration](./Claude-Code-Guide-TH.md#17-ide-integration) | [IDE Integration](./Claude-Code-Guide-EN.md#17-ide-integration) |
| 18 | [Plugins](./Claude-Code-Guide-TH.md#18-plugins-ปลั๊กอิน) | [Plugins](./Claude-Code-Guide-EN.md#18-plugins) |
| 19 | [Session Management](./Claude-Code-Guide-TH.md#19-session-management) | [Session Management](./Claude-Code-Guide-EN.md#19-session-management) |
| 20 | [Scheduled Tasks](./Claude-Code-Guide-TH.md#20-scheduled-tasks-งานตั้งเวลา) | [Scheduled Tasks](./Claude-Code-Guide-EN.md#20-scheduled-tasks) |

### Reference
| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 21 | [ฟีเจอร์พิเศษอื่น ๆ](./Claude-Code-Guide-TH.md#21-ฟีเจอร์พิเศษอื่น-ๆ) | [Other Special Features](./Claude-Code-Guide-EN.md#21-other-special-features) |
| 22 | [โครงสร้างไดเรกทอรี](./Claude-Code-Guide-TH.md#22-โครงสร้างไดเรกทอรี) | [Directory Structure](./Claude-Code-Guide-EN.md#22-directory-structure) |
| 23 | [Environment Variables](./Claude-Code-Guide-TH.md#23-environment-variables) | [Environment Variables](./Claude-Code-Guide-EN.md#23-environment-variables) |
| 24 | [การแก้ปัญหาเบื้องต้น](./Claude-Code-Guide-TH.md#24-การแก้ปัญหาเบื้องต้น) | [Basic Troubleshooting](./Claude-Code-Guide-EN.md#24-basic-troubleshooting) |
| 25 | [เคล็ดลับและแนวทางปฏิบัติที่ดี](./Claude-Code-Guide-TH.md#25-เคล็ดลับและแนวทางปฏิบัติที่ดี) | [Tips and Best Practices](./Claude-Code-Guide-EN.md#25-tips-and-best-practices) |
| 26 | [จำลอง Flow การทำงานจริง](./Claude-Code-Guide-TH.md#26-จำลอง-flow-การทำงานจริง) | [Real-World Workflow Simulations](./Claude-Code-Guide-EN.md#26-real-world-workflow-simulations) |

> ⚠️ **Note:** EN anchor links เป็นการประมาณจาก heading EN ที่ sub-agent แปล — ถ้า GitHub render แล้ว link พัง ผมแก้ให้ได้

### 🎓 Tutorial (เริ่มจากศูนย์ → ใช้เป็น)

| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 27 | [Day 1: Hello World (30 นาทีแรก)](./docs/th/27-tutorial-day1-hello-world.md) | [Day 1: Hello World (First 30 Minutes)](./docs/en/27-tutorial-day1-hello-world.md) |
| 28 | [Day 2: สร้าง Todo App ใน 1 ชั่วโมง](./docs/th/28-tutorial-day2-first-project.md) | [Day 2: Build a Todo App in 1 Hour](./docs/en/28-tutorial-day2-first-project.md) |
| 29 | [Day 3: Power User Tricks](./docs/th/29-tutorial-day3-power-user.md) | [Day 3: Power User Tricks](./docs/en/29-tutorial-day3-power-user.md) |

### 📖 Cookbook & Use Cases

| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 30 | [Cookbook (40+ Recipes)](./docs/th/30-cookbook-recipes.md) | [Cookbook (40+ Recipes)](./docs/en/30-cookbook-recipes.md) |
| 33 | [Use Cases & เปรียบเทียบเข้าใจง่าย](./docs/th/33-use-cases-analogies.md) | [Use Cases & Easy-to-Understand Comparisons](./docs/en/33-use-cases-analogies.md) |
| 34 | [Claude Code vs Cursor vs Copilot vs Aider](./docs/th/34-comparison-tools.md) | [Claude Code vs Cursor vs Copilot vs Aider](./docs/en/34-comparison-tools.md) |

### 🛡️ Production Ready

| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 31 | [จัดการ Cost & Token](./docs/th/31-cost-management.md) | [Cost & Token Management](./docs/en/31-cost-management.md) |
| 32 | [Security & Privacy Best Practices](./docs/th/32-security-best-practices.md) | [Security & Privacy Best Practices](./docs/en/32-security-best-practices.md) |

> 💡 หัวข้อ 27-34 มีเฉพาะใน Atomic Notes (Obsidian-friendly) เท่านั้น — เปิดผ่าน [`docs/th/README.md`](./docs/th/README.md) หรือ [`docs/en/README.md`](./docs/en/README.md) เพื่อดู graph view เต็ม

---

## 💡 เหมาะสำหรับใคร

- 🆕 **มือใหม่** ที่อยากเริ่มต้นใช้ Claude Code แต่หาเอกสารภาษาไทยไม่เจอ
- 👨‍💻 **นักพัฒนา** ที่อยากเข้าใจ Hooks, Skills, MCP เพื่อปรับแต่งให้เข้ากับ workflow
- 🤖 **AI Engineer** ที่อยากสร้าง Agent Teams หรือ Subagents เฉพาะทาง
- 🏢 **ทีมพัฒนา** ที่อยากใช้ CLAUDE.md เป็นมาตรฐานของโปรเจกต์

---

## 🔗 ลิงก์ที่เกี่ยวข้อง

- 📘 [Claude Code Official Docs](https://docs.claude.com/claude-code)
- 💬 [Anthropic Console](https://console.anthropic.com)
- 🐛 [Claude Code Issues (GitHub)](https://github.com/anthropics/claude-code/issues)
- 📝 [Changelog](./CHANGELOG.md)

---

## 🤝 Contribute

เจอข้อผิดพลาด หรืออยากเพิ่มเนื้อหา? เปิด Issue หรือส่ง Pull Request ได้เลย

---

## 📄 License

เนื้อหาในคู่มือนี้เผยแพร่เพื่อการศึกษา สามารถนำไปใช้และดัดแปลงต่อได้
