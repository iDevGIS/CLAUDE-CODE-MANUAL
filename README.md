# CLAUDE-CODE-MANUAL

> คู่มือใช้งาน **Claude Code** ฉบับภาษาไทยแบบละเอียด — ครอบคลุมตั้งแต่ติดตั้ง ไล่ไปถึง Hooks, Skills, MCP, Subagents, Agent Teams และการประยุกต์ใช้งานจริง

[![Made with Claude Code](https://img.shields.io/badge/Made%20with-Claude%20Code-7B61FF)](https://docs.claude.com/claude-code)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-v2.1.114-7B61FF)](https://docs.claude.com/claude-code)
[![Language: Thai](https://img.shields.io/badge/Language-ไทย-blue)](./Claude-Code-Guide-TH.md)
[![Language: English](https://img.shields.io/badge/Language-English-red)](./Claude-Code-Guide-EN.md)
[![Obsidian: Ready](https://img.shields.io/badge/Obsidian-Ready-7C3AED?logo=obsidian&logoColor=white)](./docs/th/README.md)

---

## 📚 Documentation Modes

อ่านคู่มือได้ 2 รูปแบบ — เลือกตามสไตล์ของคุณ:

| โหมด | ลักษณะ | เหมาะสำหรับ | เริ่มที่ |
|------|--------|------------|---------|
| 📄 **Single-page** | ไฟล์เดียวยาวต่อภาษา (3,300+ บรรทัด) | อ่านไล่ลำดับ, ค้นหา (Ctrl+F), แชร์ลิงก์เดียว | [`Claude-Code-Guide-TH.md`](./Claude-Code-Guide-TH.md) · [`Claude-Code-Guide-EN.md`](./Claude-Code-Guide-EN.md) |
| 🧠 **Atomic / Obsidian-friendly** | 26 โน้ตเล็กต่อภาษา + frontmatter + wikilinks | เปิดใน Obsidian ดู Graph View, เลือกอ่านเฉพาะหัวข้อ | [`docs/th/README.md`](./docs/th/README.md) · [`docs/en/README.md`](./docs/en/README.md) |

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

เนื้อหารวมทั้งหมด **3,300+ บรรทัด** แบ่งเป็น **26 หัวข้อใหญ่** พร้อมตัวอย่าง CLI, config, และ flow การทำงานจริง

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
