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

---

---

## Navigation

- ⬅️ Previous: [[17-ide-integration]]
- ➡️ Next: [[19-session-management]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/18-plugins]]
