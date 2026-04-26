# CLAUDE-CODE-MANUAL

> A comprehensive **Claude Code** manual — covering everything from installation to Hooks, Skills, MCP, Subagents, Agent Teams, and real-world workflows.

[![Made with Claude Code](https://img.shields.io/badge/Made%20with-Claude%20Code-7B61FF)](https://docs.claude.com/claude-code)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-v2.1.114-7B61FF)](https://docs.claude.com/claude-code)
[![Language: Thai](https://img.shields.io/badge/Language-ไทย-blue)](./README.md)
[![Language: English](https://img.shields.io/badge/Language-English-red)](./README.EN.md)
[![Obsidian: Ready](https://img.shields.io/badge/Obsidian-Ready-7C3AED?logo=obsidian&logoColor=white)](./docs/en/README.md)

> 🇹🇭 อ่านภาษาไทย → [`README.md`](./README.md)

---

## 📚 Documentation Modes

You can read the manual in two formats — pick whichever fits your style:

| Mode | Format | Best for | Start here |
|------|--------|----------|-----------|
| 📄 **Single-page** | One long file per language (3,300+ lines) | Sequential reading, search (Ctrl+F), single-link sharing | [`Claude-Code-Guide-EN.md`](./Claude-Code-Guide-EN.md) · [`Claude-Code-Guide-TH.md`](./Claude-Code-Guide-TH.md) |
| 🧠 **Atomic / Obsidian-friendly** | 34 small notes per language with frontmatter + wikilinks | Open in Obsidian for Graph View, focused topic reading | [`docs/en/README.md`](./docs/en/README.md) · [`docs/th/README.md`](./docs/th/README.md) |

> The `docs/` folder splits each topic into small notes with YAML frontmatter, tags, aliases, related, and wikilinks between topics — open the whole folder as an Obsidian vault to use Graph/Backlink features right away.

### 🪨 Open as an Obsidian Vault Instantly

This repo ships with `.obsidian/` config — clone and open as a vault without any setup:

```bash
git clone https://github.com/iDevGIS/CLAUDE-CODE-MANUAL.git
# Obsidian → Open folder as vault → choose the cloned folder
```

Included: **core plugins** that are needed (Graph, Backlinks, Outline, Tag pane, Properties, Bookmarks) + a **graph view** preconfigured for the manual's structure (linkDistance, repelStrength, scale).

`workspace.json` (your personal pane/tab/cursor state) is excluded via `.gitignore` — everyone gets their own.

---

## 📖 About

This repo is a **Thai and English manual** for [Claude Code](https://docs.claude.com/claude-code) — Anthropic's official CLI that helps developers write code, fix bugs, refactor, and manage projects with AI.

The total content spans **5,000+ lines** organized into **26 main topics + 8 bonus atomic notes** (3-day Tutorial, Cookbook with 40+ recipes, Cost Management, Security, Use Cases, Tool Comparisons) with CLI examples, config snippets, and real working flows.

> **Claude Code Version:** `2.1.114`
> _The manual references this Claude Code version — some features/flags/commands may change in newer versions._

📕 **Read the full guides:**
- 🇬🇧 English → [`Claude-Code-Guide-EN.md`](./Claude-Code-Guide-EN.md)
- 🇹🇭 Thai → [`Claude-Code-Guide-TH.md`](./Claude-Code-Guide-TH.md)

---

## 🚀 Quick Start

```bash
# Install Claude Code (requires Node.js 18+)
npm install -g @anthropic-ai/claude-code

# Enter your project
cd your-project

# Start using it
claude
```

> On first run you'll be asked to log in via browser, or you can use an API Key from the [Anthropic Console](https://console.anthropic.com).

---

## 🎯 Example Project (ProjectEx)

Want to see Claude Code work end-to-end — from your first `claude` command to `git commit`? The [`ProjectEx/`](./ProjectEx/) folder has a complete example:

| Inside ProjectEx | Details |
|---|---|
| 🛠️ **Todo CLI App** | Runnable code, zero dependencies — `index.js` + `lib/todo.js` + 5 tests (`node:test`) |
| ⚙️ **Claude Config Pack** | Sample `CLAUDE.md`, `.claude/settings.json` (permissions + PostToolUse hook), slash command `/test-all`, `reviewer` subagent |
| 📊 **Walkthrough Decks** | 12-slide deck in TH + EN ([`TH.pptx`](./ProjectEx/ProjectEx-Walkthrough-TH.pptx) · [`EN.pptx`](./ProjectEx/ProjectEx-Walkthrough-EN.pptx)) |
| 🖼️ **Screenshots** | 7 mockup images for the slides (regenerable via Python) |
| 🔧 **Build Scripts** | `_build/make_screenshots.py` + `make_pptx.py` to rebuild assets |

**Try it in 30 seconds:**

```bash
cd ProjectEx/todo-app
node index.js add "buy milk"
node index.js list
npm test
```

> 📥 Full details in [`ProjectEx/README.md`](./ProjectEx/README.md)

---

## 📚 Table of Contents

### Basics
| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 1 | [Installation and Getting Started](./Claude-Code-Guide-EN.md#1-installation-and-getting-started) | [การติดตั้งและเริ่มต้นใช้งาน](./Claude-Code-Guide-TH.md#1-การติดตั้งและเริ่มต้นใช้งาน) |
| 2 | [CLI Commands and Flags](./Claude-Code-Guide-EN.md#2-cli-commands-and-flags) | [คำสั่ง CLI และ Flags](./Claude-Code-Guide-TH.md#2-คำสั่ง-cli-และ-flags) |
| 3 | [Slash Commands](./Claude-Code-Guide-EN.md#3-slash-commands) | [Slash Commands](./Claude-Code-Guide-TH.md#3-slash-commands-คำสั่งลัด) |
| 4 | [Keyboard Shortcuts](./Claude-Code-Guide-EN.md#4-keyboard-shortcuts) | [คีย์ลัด (Keyboard Shortcuts)](./Claude-Code-Guide-TH.md#4-คีย์ลัด-keyboard-shortcuts) |

### Configuration
| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 5 | [Permission System](./Claude-Code-Guide-EN.md#5-permission-system) | [ระบบ Permission](./Claude-Code-Guide-TH.md#5-ระบบ-permission-สิทธิ์การเข้าถึง) |
| 6 | [Configuration](./Claude-Code-Guide-EN.md#6-configuration) | [Configuration](./Claude-Code-Guide-TH.md#6-การตั้งค่า-configuration) |
| 7 | [CLAUDE.md - Persistent Project Instructions](./Claude-Code-Guide-EN.md#7-claudemd---persistent-project-instructions) | [CLAUDE.md - คำสั่งถาวรของโปรเจกต์](./Claude-Code-Guide-TH.md#7-claudemd---คำสั่งถาวรสำหรับโปรเจกต์) |
| 8 | [Memory System](./Claude-Code-Guide-EN.md#8-memory-system) | [ระบบ Memory](./Claude-Code-Guide-TH.md#8-ระบบ-memory-ความจำ) |

### Advanced Features
| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 9 | [MCP Servers](./Claude-Code-Guide-EN.md#9-mcp-servers-model-context-protocol) | [MCP Servers](./Claude-Code-Guide-TH.md#9-mcp-servers-model-context-protocol) |
| 10 | [Hooks (Event Handler System)](./Claude-Code-Guide-EN.md#10-hooks-event-handler-system) | [Hooks (Event Handler)](./Claude-Code-Guide-TH.md#10-hooks-ระบบ-event-handler) |
| 11 | [Skills (Custom Commands)](./Claude-Code-Guide-EN.md#11-skills-custom-commands) | [Skills (คำสั่งที่สร้างเอง)](./Claude-Code-Guide-TH.md#11-skills-คำสั่งที่สร้างเอง) |
| 12 | [Subagents](./Claude-Code-Guide-EN.md#12-subagents-specialized-helpers) | [Subagents](./Claude-Code-Guide-TH.md#12-subagents-ตัวช่วยเฉพาะทาง) |
| 13 | [Agent Teams](./Claude-Code-Guide-EN.md#13-agent-teams) | [Agent Teams](./Claude-Code-Guide-TH.md#13-agent-teams-ทีม-ai) |
| 14 | [Context Management](./Claude-Code-Guide-EN.md#14-context-management) | [การจัดการ Context](./Claude-Code-Guide-TH.md#14-การจัดการ-context) |

### Real-World Usage
| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 15 | [Git Integration](./Claude-Code-Guide-EN.md#15-git-integration) | [Git Integration](./Claude-Code-Guide-TH.md#15-git-integration) |
| 16 | [Headless Mode](./Claude-Code-Guide-EN.md#16-headless-mode) | [Headless Mode](./Claude-Code-Guide-TH.md#16-headless-mode-โหมดอัตโนมัติ) |
| 17 | [IDE Integration](./Claude-Code-Guide-EN.md#17-ide-integration) | [IDE Integration](./Claude-Code-Guide-TH.md#17-ide-integration) |
| 18 | [Plugins](./Claude-Code-Guide-EN.md#18-plugins) | [Plugins](./Claude-Code-Guide-TH.md#18-plugins-ปลั๊กอิน) |
| 19 | [Session Management](./Claude-Code-Guide-EN.md#19-session-management) | [Session Management](./Claude-Code-Guide-TH.md#19-session-management) |
| 20 | [Scheduled Tasks](./Claude-Code-Guide-EN.md#20-scheduled-tasks) | [Scheduled Tasks](./Claude-Code-Guide-TH.md#20-scheduled-tasks-งานตั้งเวลา) |

### Reference
| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 21 | [Other Special Features](./Claude-Code-Guide-EN.md#21-other-special-features) | [ฟีเจอร์พิเศษอื่น ๆ](./Claude-Code-Guide-TH.md#21-ฟีเจอร์พิเศษอื่น-ๆ) |
| 22 | [Directory Structure](./Claude-Code-Guide-EN.md#22-directory-structure) | [โครงสร้างไดเรกทอรี](./Claude-Code-Guide-TH.md#22-โครงสร้างไดเรกทอรี) |
| 23 | [Environment Variables](./Claude-Code-Guide-EN.md#23-environment-variables) | [Environment Variables](./Claude-Code-Guide-TH.md#23-environment-variables) |
| 24 | [Basic Troubleshooting](./Claude-Code-Guide-EN.md#24-basic-troubleshooting) | [การแก้ปัญหาเบื้องต้น](./Claude-Code-Guide-TH.md#24-การแก้ปัญหาเบื้องต้น) |
| 25 | [Tips and Best Practices](./Claude-Code-Guide-EN.md#25-tips-and-best-practices) | [เคล็ดลับและแนวทางปฏิบัติที่ดี](./Claude-Code-Guide-TH.md#25-เคล็ดลับและแนวทางปฏิบัติที่ดี) |
| 26 | [Real-World Workflow Simulations](./Claude-Code-Guide-EN.md#26-real-world-workflow-simulations) | [จำลอง Flow การทำงานจริง](./Claude-Code-Guide-TH.md#26-จำลอง-flow-การทำงานจริง) |

> ⚠️ **Note:** EN anchor links are best-effort approximations from the headings produced by the translator sub-agent — if any links break after GitHub renders, open an issue and they'll be fixed.

### 🎓 Tutorial (Zero to Hero)

| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 27 | [Day 1: Hello World (First 30 Minutes)](./docs/en/27-tutorial-day1-hello-world.md) | [Day 1: Hello World (30 นาทีแรก)](./docs/th/27-tutorial-day1-hello-world.md) |
| 28 | [Day 2: Build a Todo App in 1 Hour](./docs/en/28-tutorial-day2-first-project.md) | [Day 2: สร้าง Todo App ใน 1 ชั่วโมง](./docs/th/28-tutorial-day2-first-project.md) |
| 29 | [Day 3: Power User Tricks](./docs/en/29-tutorial-day3-power-user.md) | [Day 3: Power User Tricks](./docs/th/29-tutorial-day3-power-user.md) |

### 📖 Cookbook & Use Cases

| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 30 | [Cookbook (40+ Recipes)](./docs/en/30-cookbook-recipes.md) | [Cookbook (40+ Recipes)](./docs/th/30-cookbook-recipes.md) |
| 33 | [Use Cases & Easy-to-Understand Comparisons](./docs/en/33-use-cases-analogies.md) | [Use Cases & เปรียบเทียบเข้าใจง่าย](./docs/th/33-use-cases-analogies.md) |
| 34 | [Claude Code vs Cursor vs Copilot vs Aider](./docs/en/34-comparison-tools.md) | [Claude Code vs Cursor vs Copilot vs Aider](./docs/th/34-comparison-tools.md) |

### 🛡️ Production Ready

| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 31 | [Cost & Token Management](./docs/en/31-cost-management.md) | [จัดการ Cost & Token](./docs/th/31-cost-management.md) |
| 32 | [Security & Privacy Best Practices](./docs/en/32-security-best-practices.md) | [Security & Privacy Best Practices](./docs/th/32-security-best-practices.md) |

> 💡 Topics 27-34 are exclusive to the Atomic Notes (Obsidian-friendly) format — open via [`docs/en/README.md`](./docs/en/README.md) or [`docs/th/README.md`](./docs/th/README.md) for the full graph view.

---

## 💡 Who is this for?

- 🆕 **Beginners** who want to start using Claude Code but can't find good documentation
- 👨‍💻 **Developers** who want to understand Hooks, Skills, MCP to tailor it to their workflow
- 🤖 **AI Engineers** building Agent Teams or specialized Subagents
- 🏢 **Dev teams** who want to standardize their project conventions via CLAUDE.md

---

## 🔗 Related Links

- 📘 [Claude Code Official Docs](https://docs.claude.com/claude-code)
- 💬 [Anthropic Console](https://console.anthropic.com)
- 🐛 [Claude Code Issues (GitHub)](https://github.com/anthropics/claude-code/issues)
- 📝 [Changelog](./CHANGELOG.md)

---

## 🤝 Contribute

Found a mistake or want to add content? Open an Issue or send a Pull Request — contributions are welcome.

---

## 📄 License

The content in this manual is published for educational use. You are free to use and adapt it.
