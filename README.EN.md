<div align="center">

# 📘 CLAUDE-CODE-MANUAL

### The most detailed **Claude Code** manual — from install to Agent Teams

From your first `claude` → to orchestrating your own **Agent Teams**<br/>
Covering **Hooks · Skills · MCP · Subagents · Plugins · Headless** and real workflows

<br/>

[![Made with Claude Code](https://img.shields.io/badge/Made_with-Claude_Code-7B61FF?style=for-the-badge)](https://docs.claude.com/claude-code)

[![Claude Code](https://img.shields.io/badge/Claude_Code-v2.1.198-7B61FF?style=flat-square)](https://docs.claude.com/claude-code)
[![Manual](https://img.shields.io/badge/Manual-v1.13.0-22C55E?style=flat-square)](./CHANGELOG.md)
[![Docs](https://img.shields.io/badge/docs-TH_%2B_EN-3B82F6?style=flat-square)](./README.md)
[![Obsidian Ready](https://img.shields.io/badge/Obsidian-Ready-7C3AED?style=flat-square&logo=obsidian&logoColor=white)](./docs/en/README.md)
[![Last commit](https://img.shields.io/github/last-commit/iDevGIS/CLAUDE-CODE-MANUAL?style=flat-square&color=orange)](https://github.com/iDevGIS/CLAUDE-CODE-MANUAL/commits)
[![Stars](https://img.shields.io/github/stars/iDevGIS/CLAUDE-CODE-MANUAL?style=flat-square)](https://github.com/iDevGIS/CLAUDE-CODE-MANUAL/stargazers)

<br/>

**📖 [Read the full guide](./Claude-Code-Guide-EN.md)** &nbsp;·&nbsp; **🧠 [Open in Obsidian](./docs/en/README.md)** &nbsp;·&nbsp; **🎯 [Example projects](./ProjectEx/README.md)** &nbsp;·&nbsp; **🇹🇭 [ภาษาไทย](./README.md)**

</div>

---

## 🔰 New to Claude Code?

Never used a command line? You can still follow along 👇
**[🙌 Zero to First Win](./docs/en/36-zero-to-first-win.md)** · **[📖 Plain-Language Glossary](./docs/en/35-glossary.md)** · **[❓ Beginner FAQ](./docs/en/37-beginner-faq.md)** · **[🪪 Pocket Cheat Sheet](./docs/en/38-cheat-sheet.md)**

---

## 🆕 What's new — synced to Claude Code `v2.1.198`

> This manual tracks the latest Claude Code release — it already covers these 👇

| 🔥 New | Details |
|---|---|
| ✨ **Sonnet 5 model** | `claude-sonnet-5` — the **new default in Claude Code**, native 1M context, promo pricing $2/$10 per Mtok through Aug 31, 2026 |
| 🧠 **Fable 5 model** | `claude-fable-5` — Mythos-class, **1M** context by default, most capable in the lineup (above Opus 4.8 / Sonnet 5 / Haiku 4.5) |
| ⚡ **Dynamic Workflows** | orchestrate tens–hundreds of agents from a script via the **`ultracode`** keyword |
| ⌨️ **New commands** | `/rewind` · `/cd` · `claude mcp login` · `claude plugin init` |
| 🚩 **New flags** | `--safe-mode` · `--agent` · `--bg` (background sessions) |
| 🛡️ **Auto mode** | runs on Bedrock/Vertex/Foundry + auto-blocks `git reset --hard` / `terraform destroy` |
| ⚙️ **Settings & Hooks** | `autoMode.classifyAllShell` · hooks return `additionalContext` · skills auto-load from `.claude/skills` |

> 📋 Full per-version history in [`CHANGELOG.md`](./CHANGELOG.md) — manual references Claude Code `v2.1.198` (manual `v1.12.0`)

---

## ✨ Why this manual

<table>
<tr>
<td width="33%" align="center" valign="top">

### 🌐 Bilingual
Every topic in English and Thai — switch languages on any page

</td>
<td width="33%" align="center" valign="top">

### 📚 41 chapters
5,000+ lines, from install to Hooks · MCP · Agent Teams

</td>
<td width="33%" align="center" valign="top">

### 🔄 Always current
Tracks Claude Code **v2.1.198** + the Fable 5 / Sonnet 5 lineup

</td>
</tr>
<tr>
<td align="center" valign="top">

### 🧠 Obsidian-ready
41 atomic notes + graph view — clone and open as a vault instantly

</td>
<td align="center" valign="top">

### 🎯 Real projects
ProjectEx + ProjectEx2 — runnable code + full feature config

</td>
<td align="center" valign="top">

### 🛠️ Hands-on
CLI examples, config snippets, and real end-to-end workflows

</td>
</tr>
</table>

---

## 📚 Documentation Modes

You can read the manual in two formats — pick whichever fits your style:

| Mode | Format | Best for | Start here |
|------|--------|----------|-----------|
| 📄 **Single-page** | One long file per language (3,300+ lines) | Sequential reading, search (Ctrl+F), single-link sharing | [`Claude-Code-Guide-EN.md`](./Claude-Code-Guide-EN.md) · [`Claude-Code-Guide-TH.md`](./Claude-Code-Guide-TH.md) |
| 🧠 **Atomic / Obsidian-friendly** | 41 small notes per language with frontmatter + wikilinks | Open in Obsidian for Graph View, focused topic reading | [`docs/en/README.md`](./docs/en/README.md) · [`docs/th/README.md`](./docs/th/README.md) |

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

The total content spans **5,000+ lines** organized into **26 main topics + 15 bonus atomic notes** (Absolute-Beginners pack, 3 Deep Dives, 3-day Tutorial, Cookbook with 40+ recipes, Cost Management, Security, Use Cases, Tool Comparisons) with CLI examples, config snippets, and real working flows.

> **Claude Code Version:** `2.1.198`
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

## 🚀 Advanced Showcase (ProjectEx2)

Want to see Claude Code with **every feature** in a mid-sized project? The [`ProjectEx2/`](./ProjectEx2/) folder is the **advanced showcase**:

| Inside ProjectEx2 | Details |
|---|---|
| 🌊 **TaskFlow App** | CLI + HTTP API (Node.js, zero-deps) — 25 tests, 6 modules |
| 🧠 **CLAUDE.md hierarchy** | root + nested (`src/CLAUDE.md`) showing multi-level memory |
| 🪝 **Hooks across the full lifecycle** | 7 events: SessionStart / UserPromptSubmit / Pre-Post ToolUse / Notification / Stop / SubagentStop |
| ⚙️ **6 slash commands** | `/test` `/lint` `/review` `/security-scan` `/release` `/docs` |
| 🤖 **4 subagents** | reviewer, tester, security, docs-writer (with system prompt + tool list) |
| 🎨 **Skill + Output Style + Status Line** | commit-formatter / senior-engineer / custom bash statusline |
| 🔌 **MCP + Plugin** | `mcp.json` for 4 servers + standalone `plugin-example/` |
| 🤖 **Headless + Cron** | `claude -p` in CI + scheduled summary script |
| 📚 **12 Walkthroughs** | atomic notes covering every topic (Obsidian-friendly) |

**Feature → file map:** [`ProjectEx2/FEATURE-MATRIX.md`](./ProjectEx2/FEATURE-MATRIX.md)

```bash
cd ProjectEx2/taskflow
node src/cli/index.js add "try ProjectEx2" --priority high
npm test                # 25/25 pass
claude                  # see hooks + statusline + output style in action
```

> 📥 Full details: [`ProjectEx2/README.md`](./ProjectEx2/README.md)

---

## 📚 Table of Contents

<details>
<summary><b>📖 Browse all 41 chapters</b> — Beginners · Basics · Config · Advanced · Real-world · Deep Dives · Tutorial · Cookbook</summary>

<br/>

### 🔰 Absolute Beginners

| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 35 | [Glossary — Plain-Language Terms](./docs/en/35-glossary.md) | [อภิธานศัพท์ฉบับบ้าน ๆ](./docs/th/35-glossary.md) |
| 36 | [Zero to First Win](./docs/en/36-zero-to-first-win.md) | [เริ่มจากศูนย์ จับมือทำ](./docs/th/36-zero-to-first-win.md) |
| 37 | [Beginner FAQ — Stuck? Start Here](./docs/en/37-beginner-faq.md) | [FAQ มือใหม่](./docs/th/37-beginner-faq.md) |
| 38 | [Pocket Cheat Sheet](./docs/en/38-cheat-sheet.md) | [การ์ดสรุปฉบับพกพา](./docs/th/38-cheat-sheet.md) |

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

### 🔎 Deep Dives

| # | Topic (EN) | หัวข้อ (TH) |
|---|--------|--------|
| 39 | [Dynamic Workflows & ultracode](./docs/en/39-dynamic-workflows.md) | [Dynamic Workflows & ultracode](./docs/th/39-dynamic-workflows.md) |
| 40 | [Claude in Chrome (Browser Automation)](./docs/en/40-claude-in-chrome.md) | [Claude in Chrome (สั่งงานเบราว์เซอร์)](./docs/th/40-claude-in-chrome.md) |
| 41 | [Background Sessions & claude agents](./docs/en/41-background-agents.md) | [Background Sessions & claude agents](./docs/th/41-background-agents.md) |

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

</details>

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
