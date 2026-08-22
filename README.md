<div align="center">

# 📘 CLAUDE-CODE-MANUAL

### คู่มือ **Claude Code** ฉบับภาษาไทยที่ละเอียดที่สุด

ตั้งแต่ `claude` ครั้งแรก → จนสร้าง **Agent Teams** ของตัวเอง<br/>
ครอบคลุม **Hooks · Skills · MCP · Subagents · Plugins · Headless** และ workflow ใช้งานจริง

<br/>

[![Made with Claude Code](https://img.shields.io/badge/Made_with-Claude_Code-7B61FF?style=for-the-badge)](https://docs.claude.com/claude-code)

[![Claude Code](https://img.shields.io/badge/Claude_Code-v2.1.240-7B61FF?style=flat-square)](https://docs.claude.com/claude-code)
[![Manual](https://img.shields.io/badge/Manual-v1.46.0-22C55E?style=flat-square)](./CHANGELOG.md)
[![Docs](https://img.shields.io/badge/docs-TH_%2B_EN-3B82F6?style=flat-square)](./README.EN.md)
[![Obsidian Ready](https://img.shields.io/badge/Obsidian-Ready-7C3AED?style=flat-square&logo=obsidian&logoColor=white)](./docs/th/README.md)
[![Last commit](https://img.shields.io/github/last-commit/iDevGIS/CLAUDE-CODE-MANUAL?style=flat-square&color=orange)](https://github.com/iDevGIS/CLAUDE-CODE-MANUAL/commits)
[![Stars](https://img.shields.io/github/stars/iDevGIS/CLAUDE-CODE-MANUAL?style=flat-square)](https://github.com/iDevGIS/CLAUDE-CODE-MANUAL/stargazers)

<br/>

**📖 [อ่านคู่มือเต็ม](./Claude-Code-Guide-TH.md)** &nbsp;·&nbsp; **🧠 [เปิดใน Obsidian](./docs/th/README.md)** &nbsp;·&nbsp; **🎯 [ตัวอย่างโปรเจกต์](./ProjectEx/README.md)** &nbsp;·&nbsp; **🇬🇧 [English](./README.EN.md)**

</div>

---

## 🔰 เพิ่งเริ่มต้นใช้ Claude Code?

ไม่เคยใช้ command line เลยก็ทำตามได้ 👇
**[🙌 จับมือทำจากศูนย์](./docs/th/36-zero-to-first-win.md)** · **[📖 อภิธานศัพท์ฉบับบ้าน ๆ](./docs/th/35-glossary.md)** · **[❓ FAQ มือใหม่](./docs/th/37-beginner-faq.md)** · **[🪪 การ์ดสรุปพกพา](./docs/th/38-cheat-sheet.md)**

---

## 🆕 มีอะไรใหม่ — sync ตาม Claude Code `v2.1.240`

> คู่มืออัปเดตตรงเวอร์ชันล่าสุด ครอบคลุมของใหม่เหล่านี้แล้ว 👇

| 🔥 ของใหม่ | รายละเอียด |
|---|---|
| 🚀 **โมเดล Opus 5** | `claude-opus-5` — **default Opus ตัวใหม่** (v2.1.219), context 1M, fast mode $10/$50 ต่อ Mtok |
| ✨ **โมเดล Sonnet 5** | `claude-sonnet-5` — **default ใหม่ของ Claude Code**, context 1M แบบ native, ราคาโปรฯ $2/$10 ต่อ Mtok ถึง 31 ส.ค. 2026 |
| 🧠 **โมเดล Fable 5** | `claude-fable-5` — Mythos-class, context **1M** เป็นค่าเริ่มต้น, เก่งสุดในไลน์อัป (เหนือ Opus 5 / Sonnet 5 / Haiku 4.5) |
| ⚡ **Dynamic Workflows** | orchestrate agent หลักสิบ–หลักร้อยตัวจากสคริปต์ ด้วย keyword **`ultracode`** |
| ⌨️ **คำสั่งใหม่** | `/rewind` · `/cd` · `claude mcp login` · `claude plugin init` |
| 🚩 **Flags ใหม่** | `--safe-mode` · `--agent` · `--bg` (background sessions) |
| 🛡️ **Auto mode** | ใช้บน Bedrock/Vertex/Foundry + บล็อก `git reset --hard` / `terraform destroy` อัตโนมัติ |
| ⚙️ **Settings & Hooks** | `autoMode.classifyAllShell` · hook คืน `additionalContext` · skills auto-load จาก `.claude/skills` |
| 🔐 **Sandbox credential mask** | `sandbox.credentials` โหมด `mode: "mask"` (v2.1.221) — คำสั่งใน sandbox อ่านไฟล์ sentinel ค่าจริงถูกสลับกลับตอน egress |
| 🖥️ **Focus view (VS Code)** | ซ่อนรายละเอียด tool ไว้หลังสรุปต่อ turn — `Ctrl+Alt+F` (v2.1.221) |
| 🌿 **Background & `/fork`** | background session commit/push แล้วเปิด draft PR เฉพาะเมื่อจำเป็น · `/fork` ได้ worktree ของตัวเอง · `/status` บอก `attached`/`unattended` (v2.1.221) |
| 🔒 **Remote Control auto-start** | เปิดได้เฉพาะ user scope ผ่าน `/config` — settings ระดับ repo ปิดได้อย่างเดียว เปิดไม่ได้แล้ว (v2.1.222) |
| 🛡️ **Auto mode ตรวจ `SendMessage`** | ข้อความที่ส่งหา agent session อื่นต้องผ่าน permission classifier ก่อน (v2.1.222) |
| 🗑️ **ถอด ultraplan** | ฟีเจอร์ ultraplan (`/ultraplan`, "Refine with Ultraplan") ถูกถอดออกแล้ว (v2.1.222) |
| 🔎 **`/review` = `/code-review`** | รวมเหลือคำสั่งเดียว รีวิว diff หรือ PR (`/code-review <level> <pr#>`) · จำ effort level ล่าสุดให้ (v2.1.223) |
| 🧮 **คุม context window** | `CLAUDE_CODE_DISABLE_1M_CONTEXT` กดโมเดล 1M ทุกตัวเหลือ 200K · auto-compact คุม model ID ที่ไม่รู้จักด้วย (v2.1.223) |
| 🏬 **wildcard marketplace** | `strictKnownMarketplaces` / `blockedMarketplaces` รับ `"owner/*"` คุมทั้ง org ได้ในบรรทัดเดียว (v2.1.223) |
| 🖥️ **Self-hosted environment** | `claude self-hosted-runner` เปลี่ยนเครื่อง/container ของเราเองให้เป็นที่รัน session ฝั่งเว็บ/มือถือ/เดสก์ท็อป — แพลน Team & Enterprise (v2.1.224) |
| 💬 **`SendMessage` ข้าม session** | session คุยกันเองข้ามเครื่องได้ · `ListAgents` หา session ที่ติดต่อได้ · ถอดเพดาน subagent 200 ตัว (macOS/Linux, v2.1.224) |
| 📦 **plugin source แบบ `archive`** | ติดตั้ง plugin จาก zip ผ่าน HTTPS — ไม่ต้องใช้ git หรือ npm — pin ด้วย SHA-256 ได้ (v2.1.224) |
| 💬 **`SendMessage` ทักก่อนได้** | เริ่มคุยกับ session Remote Control บนเครื่องอื่นด้วยชื่อได้เลย · `ListAgents` แสดงเป็น `name [ref]` (v2.1.225) |
| 🔐 **`claude agents` ถาม trust** | เปิดในไดเรกทอรีที่ยังไม่ trust จะขึ้น prompt ยืนยันเหมือน `claude` (v2.1.225) |
| 🔏 **skill จาก claude.ai ถูกจำกัดสิทธิ์** | บัง command ในเครื่อง/MCP prompt ไม่ได้ · ไม่รัน `!` และไม่ expand `@` บนเครื่องเรา (v2.1.228) |
| ✍️ **`Write` ไม่บังคับอ่านก่อน** | โมเดลรุ่นใหม่เขียนทับไฟล์ที่ยังไม่ได้อ่านได้ ตามกติกาเดียวกับ `Edit` (v2.1.228) |
| 🔌 **marketplace แบบ `command`** | ให้คำสั่งในเครื่อง (เช่น IDE) พิมพ์ path ของ plugin ออกมา · resolve ใหม่ทุก session ไม่ต้อง restart · `mode: "link"` ใช้ที่เดิมเลย (v2.1.229) |
| ↩️ **`claude remote-control --continue`** | ต่อ session Remote Control ล่าสุดได้ทันที (v2.1.229) |
| 🛑 **`/commit-push-pr` ไม่ auto-approve flag อันตราย** | `--force` · `--amend` · `--no-verify` ฯลฯ ต้องกดอนุมัติเอง (v2.1.229) |
| 🍴 **fork subagent เป็นค่าเริ่มต้น** | `subagent_type: "fork"` สืบทอดบทสนทนาเต็ม + prompt cache · agent ที่ไม่ใช่ teammate รันเป็น background โดย default (v2.1.232) |
| 💬 **พิมพ์ `@` ทัก session อื่น** | mention session อื่นด้วยชื่อในช่อง prompt แล้ว Claude ใช้ `SendMessage` ทักให้ · ชื่อ session บนเครื่องเดียวกันไม่ซ้ำกันแล้ว (v2.1.232) |
| 🦊 **รองรับ GitLab** | marketplace โคลนจาก URL `gitlab.com` ตรง ๆ ได้ (รวม subgroup ซ้อน) · redact token ตระกูล GitLab · `glab` ได้การป้องกันระดับเดียวกับ `gh` (v2.1.232) |
| 🔀 **GitLab merge request** | ใส่ URL ของ MR ให้ `--worktree` ได้แล้ว · หน้า `claude agents` แสดง MR เป็น `!N` (v2.1.233) |
| 🗂️ **โมเดลใหม่ไม่มี todo/task tools** | `TaskCreate`/`TaskGet`/`TaskUpdate`/`TaskList` + `TodoWrite` ถูกถอดจาก Opus 4.8 · Sonnet 5 · Fable 5 · Mythos 5 และรุ่นใหม่กว่า — ตั้ง `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` เพื่อเอากลับ (v2.1.233) |
| 🧪 **env var ใหม่** | `CLAUDE_CODE_TOOL_MEMORY_LIMIT` จำกัด memory ของคำสั่ง Bash ด้วย cgroup บน Linux · `CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS` ปรับ TTL ของ WebFetch URL cache (v2.1.233) |
| ⌨️ **เปิด dialog กลาง turn ได้** | `/permissions` และ `/add-dir` ใช้ระหว่าง Claude ทำงานได้แล้ว · กฎ permission ที่แก้มีผลกับ turn ที่รันอยู่เลย (v2.1.234) |
| ⏳ **ทำต่อเองเมื่อ limit รีเซ็ต** | Claude Code เดินงาน session ต่อให้อัตโนมัติเมื่อ usage limit ของ claude.ai รีเซ็ต — ปิดได้ใน `/config` (v2.1.234) |
| 🧪 **env var ใหม่อีก 2 ตัว** | `CLAUDE_CODE_PROJECT_DIR_NAME` ตั้งชื่อสั้น ๆ ให้โฟลเดอร์ transcript ต่อโปรเจกต์ · `CLAUDE_CODE_GOAL_CHECKIN_MINUTES` คุมว่า `/goal` ปล่อยงาน background รอได้นานแค่ไหน (v2.1.234) |
| 🔤 **setting `spellcheck`** | ขีดเส้นใต้คำสะกดผิดในช่องพิมพ์ prompt ระหว่างพิมพ์ โดยใช้ `aspell` / `hunspell` / `ispell` ที่ติดตั้งไว้ในเครื่อง (v2.1.235) |
| 🔐 **dialog permission ตรงกับสิทธิ์จริง** | ข้อความและตัวเลือก "don't ask again" บอกตรงกับสิ่งที่การอนุมัติครอบคลุม · แสดงเนื้อหาไม่ครบก็ไม่ยื่น "don't ask again" ให้ (v2.1.235) |
| 🧪 **env var `ANTHROPIC_DEFAULT_MODEL`** | ตั้งโมเดลตั้งต้นของ session ใหม่ — ต่างจาก `ANTHROPIC_MODEL` ตรงที่เลือกด้วย `/model` ทับได้ และค่าที่เลือกอยู่ข้าม restart (v2.1.236) |
| 🔔 **`notify_when_idle` ใน `SendMessage`** | สั่งให้ session อื่นบนเครื่องเดียวกันส่งแจ้งเตือนกลับมา 1 ครั้งตอนมัน idle ครั้งถัดไป — opt-in ยิงครั้งเดียวจบ ไม่ต้อง poll (macOS/Linux, v2.1.236) |
| 🔐 **กฎ deny แบบ wildcard ชนะในเขตที่อ่านได้** | `**/.env` มีลำดับเหนือกว่าในเขตที่ sandbox อ่านได้ (macOS) · ครอบถึงไฟล์ในไดเรกทอรีที่ match · เปลี่ยนชื่อไฟล์หนีไม่ได้ (v2.1.236) |
| 🛡️ **auto mode ตรวจ `Monitor` เหมือน Bash** | กฎ allow ของ `Monitor` ถูกพักไว้ระหว่าง auto mode · classifier บน Bedrock/Vertex/Foundry ใช้ค่าเริ่มต้นชุดเดียวกับ Claude API แล้ว (v2.1.236) |
| ✂️ **output style "Concise"** | output style สำเร็จรูปที่ตอบด้วยผลลัพธ์ก่อน ตัดคำเกริ่นและการบรรยายระหว่างทาง แต่ทำงานละเอียดเท่าเดิม — เลือกที่ **Output style** ใน `/config` (v2.1.237) |
| ⌨️ **setting `keybindingFlavor`** | ตั้งเป็น `"readline"` ให้ `Ctrl+W` ลบย้อนถึงช่องว่างก่อนหน้าแบบ Bash — ค่าเริ่มต้น `"classic"` เหมือนเดิม · `Ctrl+L`/`Cmd+K` ใน fullscreen แค่วาดจอใหม่ ทางลัด `/clear` กดสองครั้งถูกถอด (v2.1.238) |
| 🔑 **`headersHelper` ของ marketplace** | รันคำสั่งออก HTTP header (เช่น token อายุสั้น) ให้ตอนดึง catalog และ archive origin เดียวกัน · ของ catalog entry รันเฉพาะตอน install/update และโชว์คำสั่งก่อน — `claude plugin install/update` ถาม `[y/N]` (หรือใส่ `-y`) (v2.1.238) |
| 🖥️ **flag ใหม่ของ self-hosted runner** | `--defer-shutdown-max-min` ให้เสิร์ฟ session ที่ยัง attach ต่อหลัง `SIGTERM` แล้วค่อย park ส่วนที่เหลือ · `--proxy-authorization-command` / `--proxy-authorization-file` สำหรับ proxy ที่ต้องออก header ใหม่ทุกการเชื่อมต่อ (v2.1.238) |
| 💰 **ค่าประเมิน cost รวม premium 1.1×** | `/cost` · status line · `--max-budget-usd` คิดรวม premium 1.1× ของ US-only inference สำหรับ workspace แบบ data-residency (v2.1.239) |
| 🐍 **`/claude-api upgrade`** | migrate โปรเจกต์ Python จาก `anthropic` SDK 0.x ไป 1.x · Python reference ของ skill อัปเดตเป็น 1.x แล้ว (v2.1.239) |
| 🪟 **cross-session messaging บน Windows** | session ข้ามเครื่องคุยกันด้วย `SendMessage` / หากันด้วย `ListAgents` ได้เหมือน macOS/Linux · `ListAgents` บอกชื่อตัวเองและแสดง teammate ที่ออนไลน์ด้วย (v2.1.239) |
| 🔌 **plugin จาก claude.ai เป็น `name@synced`** | ใน cloud session ใช้ `claude plugin enable/disable <name>@synced` ได้ และไม่ทับ plugin ชื่อเดียวกันที่เราติดตั้งเอง (v2.1.239) |

> 📋 ดูครบทุกเวอร์ชันใน [`CHANGELOG.md`](./CHANGELOG.md) — คู่มืออ้างอิง Claude Code `v2.1.240` (manual `v1.46.0`)

---

## ✨ ทำไมต้องคู่มือนี้

<table>
<tr>
<td width="33%" align="center" valign="top">

### 🇹🇭 ไทยเต็มร้อย
อธิบายทุกอย่างเป็นภาษาไทย พร้อมตัวอย่างจริง — ไม่ต้องเดาศัพท์เทคนิค

</td>
<td width="33%" align="center" valign="top">

### 📚 ครบ 41 บท
5,000+ บรรทัด ตั้งแต่ติดตั้ง ยัน Hooks · MCP · Agent Teams

</td>
<td width="33%" align="center" valign="top">

### 🔄 อัปเดตสด
ตรงกับ Claude Code **v2.1.240** + โมเดล Fable 5 / Opus 5 / Sonnet 5

</td>
</tr>
<tr>
<td align="center" valign="top">

### 🧠 พร้อม Obsidian
41 atomic notes + graph view — clone แล้วเปิดเป็น vault ได้ทันที

</td>
<td align="center" valign="top">

### 🎯 มีโปรเจกต์จริง
ProjectEx + ProjectEx2 — โค้ดรันได้ + config ครบทุก feature

</td>
<td align="center" valign="top">

### 🌗 สองภาษา
TH + EN สลับได้ทุกหน้า อ่านสบายทั้งคู่

</td>
</tr>
</table>

---

## 📚 Documentation Modes

อ่านคู่มือได้ 2 รูปแบบ — เลือกตามสไตล์ของคุณ:

| โหมด | ลักษณะ | เหมาะสำหรับ | เริ่มที่ |
|------|--------|------------|---------|
| 📄 **Single-page** | ไฟล์เดียวยาวต่อภาษา (3,300+ บรรทัด) | อ่านไล่ลำดับ, ค้นหา (Ctrl+F), แชร์ลิงก์เดียว | [`Claude-Code-Guide-TH.md`](./Claude-Code-Guide-TH.md) · [`Claude-Code-Guide-EN.md`](./Claude-Code-Guide-EN.md) |
| 🧠 **Atomic / Obsidian-friendly** | 41 โน้ตเล็กต่อภาษา + frontmatter + wikilinks | เปิดใน Obsidian ดู Graph View, เลือกอ่านเฉพาะหัวข้อ | [`docs/th/README.md`](./docs/th/README.md) · [`docs/en/README.md`](./docs/en/README.md) |

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

เนื้อหารวมทั้งหมด **5,000+ บรรทัด** แบ่งเป็น **26 หัวข้อหลัก + 15 atomic notes พิเศษ** (ชุดมือใหม่ 4 บท, Deep Dives 3 บท, Tutorial 3 ตอน, Cookbook 40+ recipes, Cost Management, Security, Use Cases, Tool Comparisons) พร้อมตัวอย่าง CLI, config, และ flow การทำงานจริง

> **Claude Code Version:** `2.1.240`
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

<details>
<summary><b>📖 กดดูสารบัญทั้ง 41 บท</b> — มือใหม่ · พื้นฐาน · ตั้งค่า · ขั้นสูง · ใช้งานจริง · Deep Dives · Tutorial · Cookbook</summary>

<br/>

### 🔰 สำหรับมือใหม่สุด ๆ (Absolute Beginners)

| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 35 | [อภิธานศัพท์ฉบับบ้าน ๆ](./docs/th/35-glossary.md) | [Glossary — Plain-Language Terms](./docs/en/35-glossary.md) |
| 36 | [เริ่มจากศูนย์ จับมือทำ](./docs/th/36-zero-to-first-win.md) | [Zero to First Win](./docs/en/36-zero-to-first-win.md) |
| 37 | [FAQ มือใหม่ — ติดตรงไหน เริ่มตรงนี้](./docs/th/37-beginner-faq.md) | [Beginner FAQ — Stuck? Start Here](./docs/en/37-beginner-faq.md) |
| 38 | [การ์ดสรุปฉบับพกพา](./docs/th/38-cheat-sheet.md) | [Pocket Cheat Sheet](./docs/en/38-cheat-sheet.md) |

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

### 🔎 เจาะลึก (Deep Dives)

| # | หัวข้อ (TH) | Topic (EN) |
|---|--------|--------|
| 39 | [Dynamic Workflows & ultracode](./docs/th/39-dynamic-workflows.md) | [Dynamic Workflows & ultracode](./docs/en/39-dynamic-workflows.md) |
| 40 | [Claude in Chrome (สั่งงานเบราว์เซอร์)](./docs/th/40-claude-in-chrome.md) | [Claude in Chrome (Browser Automation)](./docs/en/40-claude-in-chrome.md) |
| 41 | [Background Sessions & claude agents](./docs/th/41-background-agents.md) | [Background Sessions & claude agents](./docs/en/41-background-agents.md) |

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

</details>

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
