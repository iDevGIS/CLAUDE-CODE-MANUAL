---
title: "Plugins (ปลั๊กอิน)"
section: 18
lang: th
tags:
  - claude-code
  - plugins
  - extensibility
aliases:
  - "Plugins"
related:
  - "[[11-skills]]"
  - "[[09-mcp-servers]]"
---

# Plugins (ปลั๊กอิน)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Plugins?**
>
> Plugins ทำให้คุณ **แชร์ชุดเครื่องมือที่สร้างเอง** (Skills, Agents, Hooks, MCP) เป็น Package เดียว — ติดตั้งง่าย แจกจ่ายให้ทีมได้ อัปเดตได้จากที่เดียว

**Use Cases:**

| Plugin | สถานการณ์ | ผลลัพธ์ |
|--------|----------|--------|
| **Company Standard Plugin** | ทีม 50 คน ต้องการ Skills + Hooks เหมือนกัน | สร้าง Plugin ที่รวม Deploy Skill, Lint Hook, Security Agent → ทุกคนติดตั้งเหมือนกัน |
| **Framework Plugin** | ใช้ Next.js ทุกโปรเจกต์ | สร้าง Plugin ที่มี Skills สำหรับสร้าง Page, API Route, Component → ใช้ซ้ำได้ทุกโปรเจกต์ |
| **DevOps Plugin** | ต้องจัดการ K8s, Docker, Terraform | สร้าง Plugin ที่มี Skills + Agents สำหรับ DevOps → ใช้ได้ทุกโปรเจกต์ |
| **Community Plugin** | อยากใช้ Plugin ที่คนอื่นสร้าง | ติดตั้งจาก Marketplace ได้ทันที |
| **Language-Specific Plugin** | ทีม Go / Rust / Python | สร้าง Plugin เฉพาะภาษา รวม Linter, Test Runner, Code Generator |

### โครงสร้าง Plugin

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json       # Manifest
├── skills/                # Skills ของ Plugin
│   └── skill-name/
│       └── SKILL.md
├── agents/                # Agents ของ Plugin
│   └── agent.md
├── hooks/                 # Hooks ของ Plugin
│   └── hooks.json
└── .mcp.json              # MCP Config ของ Plugin
```

### Plugin Manifest

```json
{
  "name": "my-plugin",
  "description": "ปลั๊กอินสำหรับ...",
  "version": "1.0.0",
  "author": { "name": "ชื่อผู้สร้าง" },
  "homepage": "https://example.com",
  "repository": "https://github.com/user/repo"
}
```

### โหลด Plugin

```bash
# จากไดเรกทอรี Local (รับไฟล์ .zip ได้แล้ว)
claude --plugin-dir ./my-plugin

# ติดตั้งจาก URL ตรงๆ
claude --plugin-url <url>

# ติดตั้งจาก Marketplace
/plugins install <plugin-name>
```

### จัดการ Plugins

```
/plugins              # เรียกดูและจัดการ (แท็บ Discover แนะนำ plugin ที่ตรงกับ directory ปัจจุบัน)
/reload-plugins       # โหลด Plugins ใหม่โดยไม่ต้อง Restart
```

```bash
claude plugin prune              # ลบ plugin dependency ที่ค้าง
claude plugin uninstall --prune  # ถอนการติดตั้งแล้วลบ deps ที่ค้างแบบ cascade
```

> **หมายเหตุ Manifest:** manifest ของ plugin ประกาศ `"defaultEnabled": false` ได้ เพื่อให้ติดตั้งมาแบบปิดไว้ก่อน

### 🆕 ใหม่ใน v2.1.191

- `claude plugin init <name>` สร้างโครง plugin ใต้ `.claude/skills`; plugin ในนั้นโหลดอัตโนมัติ (ไม่ต้องผ่าน marketplace)
- `/plugin list` แสดง plugin ที่ติดตั้ง (`--enabled` / `--disabled`)

### 🆕 ใหม่ใน v2.1.221

- **ติดตั้งแล้วใช้ได้ทันทีถ้าปลอดภัย** — plugin ที่ติดตั้งผ่าน `/plugin` เริ่มทำงานเลย ไม่ต้องรอสั่ง `/reload-plugins` ทุกครั้งแล้ว
- **`/plugin install` ลองใหม่เมื่อ catalog เก่า** — จะรีเฟรช catalog ของ marketplace แล้วลองอีกครั้ง ก่อนแจ้งว่าหา plugin ไม่เจอ
- **`skills` ใส่ `"."` ได้** — ชี้ path `skills` ของ plugin ไปที่ root ของ plugin ได้เลย และข้อความ validation error ของ `SKILL.md` ระดับ root ก็แนะนำวิธีนี้
- **`claude plugin validate` เตือนชื่อที่ใช้ไม่ได้** — แจ้งเตือนเมื่อชื่อ marketplace หรือชื่อ plugin จะถูกปฏิเสธโดย managed marketplace sync ของ Claude Desktop

### 🆕 ใหม่ใน v2.1.224

- **plugin source แบบ `archive`** — ติดตั้ง plugin จากไฟล์ zip ที่เสิร์ฟผ่าน HTTPS ได้เลย ไม่ต้องใช้ git และไม่ต้องใช้ npm; ระบุ SHA-256 ที่คาดไว้เพื่อ pin และตรวจสอบไฟล์ที่โหลดมาได้ด้วย

### 🆕 ใหม่ใน v2.1.229

- **marketplace source แบบ `command`** — ให้ marketplace ชี้ไปที่คำสั่งในเครื่อง (เช่น IDE) ที่พิมพ์ path ของไดเรกทอรี plugin ออกมา โดยระบบจะ resolve path ใหม่ทุกครั้งที่เริ่ม session และใช้ผลลัพธ์ได้เลยโดยไม่ต้อง restart Claude Code; ถ้าตั้ง `mode: "link"` จะใช้ไดเรกทอรีนั้นที่เดิมแทนการคัดลอก

### 🆕 ใหม่ใน v2.1.232

- **marketplace บน GitLab** — URL ของ repo บน `gitlab.com` แบบเปล่า ๆ (รวมถึงที่อยู่ใน subgroup ซ้อนกัน) โคลนได้เหมือน URL ของ `github.com` แล้ว และถ้า clone ติด auth ข้อความแนะนำจะระบุ git host จริงของเราให้ด้วย
- **`additionalMarketplaces` / `allowedMarketplaces`** — เป็น alias ที่อ่านง่ายกว่าของ setting `extraKnownMarketplaces` และ `strictKnownMarketplaces`
- **`/plugin install plugin@marketplace` refresh marketplace ให้ก่อน** — plugin ที่เพิ่งถูกเผยแพร่หลัง refresh ครั้งล่าสุดก็ติดตั้งได้เลย ไม่ต้องสั่งอัปเดต marketplace เอง

### 🆕 ใหม่ใน v2.1.238

- **`headersHelper` ใน marketplace แบบ url หรือใน catalog entry** — สั่งรันคำสั่งที่ออก HTTP header ให้ (เช่น token อายุสั้น) แล้วใช้ header ชุดนั้นตอนดึง catalog และตอนดึงไฟล์ archive ที่อยู่ origin เดียวกัน
- **`headersHelper` ของ catalog entry จะรันเฉพาะตอนติดตั้งหรืออัปเดต** plugin ตัวนั้น และรันหลังจากโชว์คำสั่งให้เราดูแล้วเท่านั้น โดย `claude plugin install` / `claude plugin update` จะถาม `[y/N]` ก่อน (หรือใส่ `-y`) ดูที่ [[02-cli-commands]]

### 🆕 ใหม่ใน v2.1.239

- **Plugin ที่ sync มาจาก claude.ai แสดงเป็น `name@synced`** — ใน cloud session ใช้กับ `claude plugin enable/disable <name>@synced` ได้ และจะไม่ทับ plugin ชื่อเดียวกันที่เราติดตั้งเองเด็ดขาด

### 🆕 ใหม่ใน v2.1.259

- **`--json` บน `claude plugin validate`** — พิมพ์รายงานผลตรวจแบบ machine-readable เอาไปใช้ต่อในสคริปต์/CI ได้สะดวก ดู [[02-cli-commands]]

### 🆕 ใหม่ใน v2.1.260

- **`/reload-plugins` ใช้ใน session แบบ headless ได้แล้ว** — โผล่ในรายการคำสั่งของ Claude Code Desktop และ SDK แล้ว ดู [[16-headless-mode]]

### 🆕 ใหม่ใน v2.1.265

- **`--plugin-dir` ชี้ไปที่โฟลเดอร์รวม plugin ได้แล้ว** — ชี้ไปที่โฟลเดอร์แม่ แล้วโฟลเดอร์ลูกทุกตัวที่มี manifest จะถูกโหลด และถ้าเพิ่ม/ลบโฟลเดอร์ลูกระหว่างที่ Claude รันอยู่ก็จับได้ ดู [[02-cli-commands]]

### 🆕 ใหม่ใน v2.1.273

- **sign in แล้วขอสิทธิ์เข้าถึง plugin บน claude.ai ด้วย** — การ sign in ด้วยบัญชี Claude ขอสิทธิ์เข้าถึง plugin ในบัญชี claude.ai ของเราเพิ่มเข้ามาแล้ว

### 🆕 ใหม่ใน v2.1.275

- **plugin ที่เปิดใช้บน claude.ai sync ลงเทอร์มินัล** — session ที่ sign in ด้วยบัญชี Claude นั้นจะดึง plugin ที่เปิดไว้ในบัญชี claude.ai มาใช้ ถ้าไม่ต้องการให้ตั้ง `syncClaudeAiPlugins: false` ดู [[06-configuration]]
- **`/plugin install <plugin> --marketplace <source>`** — ติดตั้ง plugin จาก marketplace ที่ระบุ ถ้ายังไม่ได้เพิ่ม marketplace นั้นไว้จะเสนอให้เพิ่มก่อน ดู [[03-slash-commands]]

### 🆕 ใหม่ใน v2.1.280

- **marketplace ที่ตั้งชื่อเลียนแบบชื่อสงวนจะถูกปฏิเสธ** — ถ้าชื่อ marketplace เลียนแบบชื่อ marketplace ที่สงวนไว้ จะเพิ่มไม่ได้ และถ้าเคยเพิ่มไว้แล้วก็จะหยุดโหลด
- **commit ที่บันทึกไว้ของ plugin ไม่หายตอนอัปเดต** — การอัปเดต plugin จาก GitHub repo หรือ git URL ที่ track branch/tag ไว้ จะไม่ทิ้ง `installed_plugins.json` ค้างที่ commit ตอนติดตั้งอีกต่อไป และ `claude plugin update` จะไม่ย้าย plugin ไปเป็น version "unknown" เมื่อไฟล์ snapshot ของ marketplace ทางการเป็น link หรือใหญ่เกินไป
- **skill ที่ปิดไว้ไม่ถูกแสดงว่าพัง** — skill ที่เราปิดเองจะขึ้น ◯ สีจาง ใน `/plugin` และ `/skills` แทนที่จะเป็น ✘ สีแดงซึ่งใช้กับ plugin ที่โหลดไม่สำเร็จ ดู [[11-skills]]

### 🆕 ใหม่ใน v2.1.281

- **`claude plugin validate` ตรวจ MCP server ด้วย** — รายงาน entry ใน `.mcp.json` ที่จะถูกทิ้งเงียบ ๆ ตอนโหลด, การอ้าง `${user_config.*}` ที่ไม่ได้ประกาศ และ URL ที่ไม่ปลอดภัย ดู [[09-mcp-servers]]
- **เตือนเมื่อ `${CLAUDE_PLUGIN_ROOT}` ไม่ได้ครอบ quote** — `claude plugin validate` เตือนเมื่อ hook แบบ shell-form ใช้ `${CLAUDE_PLUGIN_ROOT}` โดยไม่ครอบ quote (พังเมื่อ path ของ plugin มีช่องว่าง) และ error ตอน hook ของ plugin ล้มจะบอกชื่อ plugin ตัวต้นเหตุแล้ว

### 🆕 ใหม่ใน v2.1.285

- **`claude plugin configure <plugin>`** — แสดง option ของ plugin และบอกว่าตัวไหนยังไม่ได้ตั้ง หรือบันทึกค่าใหม่ที่อ่านจาก stdin ด้วย `--values-stdin` ดู [[02-cli-commands]]
- **`claude plugin install --config <server>.<key>=<value>`** — ตั้งค่าของ MCP server แบบ `.mcpb` ที่มากับ plugin ได้ตั้งแต่ตอนติดตั้ง ทำให้ server เริ่มทำงานได้เลยโดยไม่ต้องเข้า `/plugin` → Configure ดู [[09-mcp-servers]]
- **server `.mcpb` ที่ยังไม่ได้ตั้งค่าไม่ถูกข้ามเงียบ ๆ อีก** — `/plugin`, ข้อความตอนติดตั้ง และ `claude plugin install` จะบอกเมื่อ MCP server แบบ `.mcpb` ที่มากับ plugin ยังต้องตั้งค่า พร้อมชี้ไปที่ Configure

### 🆕 ใหม่ใน v2.1.286

- **source แบบ npm ของ plugin เข้มขึ้น** — การติดตั้ง plugin ปฏิเสธ npm source ที่เป็น git repository หรือโฟลเดอร์ และติดตั้ง dependency ของ plugin จาก package บน registry เท่านั้น
- **error ของ marketplace ที่ถูกปฏิเสธชัดขึ้น** — error ของ plugin จาก marketplace ที่ Claude Code ไม่ยอมโหลด จะบอกเหตุผลและวิธีแก้ แทนที่จะขึ้นแค่ "not found"

### 🆕 ใหม่ใน v2.1.287

- **Claude Mods** — plugin ปรับพฤติกรรมเชิงลึกของ Claude Code ได้แล้ว
- **mod ในตัว "You should know"** — มี side agent คอยระวังหลังให้ และ flag สิ่งที่เราหรือ Claude อาจมองข้าม · เปิดด้วย `/plugin enable cc-plugin-you-should-know@builtin` (สำหรับ session first-party ที่เปิด telemetry)
- **รายการ plugin บอกเมื่อ dependency ยังไม่ได้ติดตั้ง** — และการอัปเดต plugin จะลองติดตั้งที่ค้างไม่เสร็จใหม่ให้ · error ของ marketplace บอกเป็นภาษาคนว่าทำไม marketplace ถูกข้ามหรือถูกปฏิเสธ และต้องทำอะไรต่อ

### 🆕 ใหม่ใน v2.1.288

- **`$.ui.selection()` สำหรับ mod** — คืนข้อความที่เราเลือกล่าสุดในโหมด fullscreen และถ้าส่วนที่เลือกอยู่ใน transcript แถวเดียว ก็คืนแถวนั้นมาด้วย
- **`requestTimeout` ของ LSP ใน plugin** — LSP tool call timeout ที่ 60 วินาทีแทนที่จะค้างไปเรื่อย ๆ เมื่อ language server ใช้ dynamic capability registration หรือไม่ตอบ · ปรับได้ต่อ server ด้วย `requestTimeout`
- **ติดตั้ง plugin จาก GitHub fallback เป็น HTTPS** — `claude plugin install` บน macOS/Linux ที่ไม่มี GitHub SSH key จะ clone ผ่าน HTTPS แทนและพิมพ์ notice บอก

### 🆕 ใหม่ใน v2.1.289

- **`agent.spawn` สำหรับ teammate** — mod สั่ง spawn teammate ได้แล้วผ่าน `agent.spawn`
- **agent id เดียวกันทุก hook event ของ plugin** — plugin เห็น agent id ตัวเดียวกันของ agent หนึ่ง ๆ ในทุก hook event จึงจับคู่ event ได้โดยไม่ต้องเทียบจากชื่อ
- **สถานะ `idle` และ `waiting` ใน `$.agent.list()`** — รายการ agent บอกได้แล้วว่า agent ตัวไหนว่าง (idle) หรือรออยู่ (waiting) เพิ่มจากสถานะเดิมที่คืนมา

### 🆕 ใหม่ใน v2.1.290

- **`serverToolUses` ในผลของ hook `turn.step` ของ mod** — tool call ที่ API รันเอง (advisor) แต่ละตัวมี id, name, input, start และ end
- **`agentId` ใน event `tool.check` ของ plugin hooks** — hook แยกได้ว่า permission check มาจาก subagent หรือ session หลัก
- **`ceiling` ใน `tool.check`** — question และ verdict ที่ hook `tool.check` ของ mod อ่าน บอกระดับการอนุมัติที่องค์กรกำหนดให้ tool นั้น
- **type `ThemeKey` และ `Color`** ใน typings ของ plugin hooks · editor จึงแสดงสีของ theme ที่ mod ใช้วาดได้
- **`claude plugin validate` แสดง gating hook** — hook ที่ mod ลงทะเบียนไว้ที่ gating site ถูกแสดงพร้อมบอกว่ามี `.catch` หรือไม่ (`gatingHooks` เมื่อใช้ `--json`)
- **plugin hooks ตัดข้อความยาว** — ข้อความยาวจะถูกตัดและ log ไว้ แทนที่จะถูกปฏิเสธหรือทิ้งเงียบ ๆ · `$.process.spawn` ที่ mod อื่นปฏิเสธหลัง child รันไปแล้วจะบอกว่าคำสั่งรันแล้วแต่ plugin กักผลไว้

### 🆕 ใหม่ใน v2.1.292

- **`claude plugin install --marketplace <source>`** — เพิ่ม marketplace ให้เองถ้ายังไม่มี (ผ่าน policy check ชุดเดียวกับ `claude plugin marketplace add`) แล้วติดตั้ง plugin จาก marketplace นั้น
- **event `prompt.autocomplete`** — mod ใช้ hook นี้เพิ่มแถวของตัวเองลงในรายการ autocomplete ของช่อง prompt
- **prompt caching ใน `$.model.complete`** — `prompt` และ `system` รับข้อความเป็น block ได้ และใส่ `cache: true` ที่ block ไหนจะ cache request จนถึง block นั้น
- **workflow agent ใน `agent.spawn`** — mod hook เห็น workflow agent พร้อม run และ index แล้ว จึงปฏิเสธได้
- **`claude plugin test` ไม่ผ่านแบบเงียบ ๆ อีกต่อไป** — `expect` ที่ fail ใน hook ที่ test ลงทะเบียนไว้ หรือ stub answer ที่ engine ปฏิเสธ จะทำให้ test fail

### 🆕 ใหม่ใน v2.1.293

- **`isDeferred` ใน `$.tool.register`** — ตั้ง `false` เพื่อให้ schema ของ tool ใน mod อยู่ใน prompt ตั้งแต่แรก แทนที่จะซ่อนอยู่หลัง tool search
- **`mock.session` ใน `claude plugin test`** — test ของ mod ที่เรียก `$.session.append` อ่านแถวที่ append ไปกลับมาตรวจได้

---

---

## Navigation

- ⬅️ Previous: [[17-ide-integration]]
- ➡️ Next: [[19-session-management]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/18-plugins]]
