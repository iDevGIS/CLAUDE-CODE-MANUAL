---
title: "การตั้งค่า (Configuration)"
section: 6
lang: th
tags:
  - claude-code
  - configuration
  - settings
aliases:
  - "การตั้งค่า"
related:
  - "[[05-permissions]]"
  - "[[07-claude-md]]"
  - "[[23-environment-variables]]"
---

# การตั้งค่า (Configuration)

### ประโยชน์และ Use Cases

> **ทำไมต้องตั้งค่า?**
>
> การตั้งค่าช่วยให้ Claude Code **ทำงานตรงกับวิธีการทำงานของคุณและทีม** โดยไม่ต้องบอกซ้ำทุกเซสชัน ตั้งครั้งเดียว ใช้ได้ตลอด

**Use Cases:**

| สถานการณ์ | การตั้งค่า | ผลลัพธ์ |
|----------|----------|--------|
| **ทีม 10 คน ต้องการมาตรฐานเดียวกัน** | `.claude/settings.json` (commit ร่วมกับ Git) | ทุกคนในทีมใช้ Permission, Hooks, MCP เหมือนกัน ไม่ต้องตั้งค่าเอง |
| **คนเดียวชอบโหมด Vim** | `~/.claude/settings.json` | ตั้งค่าส่วนตัว ไม่กระทบคนอื่น ใช้ได้ทุกโปรเจกต์ |
| **โปรเจกต์นี้ต้องใช้ Node 20 เฉพาะ** | `.claude/settings.local.json` | ตั้งค่าเฉพาะโปรเจกต์ gitignored ไม่ปนกับคนอื่น |
| **องค์กรต้องการล็อก Policy** | Managed settings | IT ตั้งค่าให้ทุกคนในองค์กร ห้าม Override |
| **ต้องการให้ Claude รัน Lint อัตโนมัติ** | `hooks.PostEdit` | ทุกครั้งที่ Claude แก้ไฟล์ Lint จะรันอัตโนมัติ |
| **ต้องการเชื่อมต่อ Slack/Notion** | `mcpServers` | Claude เข้าถึง Slack, Notion ได้โดยตรง |
| **ต้องการใช้ Opus สำหรับโปรเจกต์สำคัญ** | `model: "claude-opus-5"` | ล็อกโมเดลเฉพาะโปรเจกต์ |

### ลำดับชั้นของการตั้งค่า (จากสูงไปต่ำ)

1. **Managed** - ระดับระบบ (IT deploy) มีผลกับผู้ใช้ทั้งหมด
2. **User** (`~/.claude/`) - ส่วนตัว ใช้ได้ทุกโปรเจกต์
3. **Project** (`.claude/`) - แชร์ผ่าน Git กับทีม
4. **Local** (`.claude/settings.local.json`) - ส่วนตัวเฉพาะโปรเจกต์ (gitignored)

### ไฟล์ตั้งค่า

| ไฟล์ | ขอบเขต |
|-----|--------|
| `~/.claude/settings.json` | ตั้งค่าส่วนตัวทั่วไป |
| `.claude/settings.json` | ตั้งค่าโปรเจกต์ (commit ร่วมกับทีม) |
| `.claude/settings.local.json` | ตั้งค่าโปรเจกต์ส่วนตัว (gitignored) |

### ตัวอย่าง settings.json

```json
{
  "theme": "dark",
  "model": "claude-opus-5",
  "effort": "high",
  "autoMemoryEnabled": true,

  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  },

  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"]
    }
  },

  "env": {
    "NODE_ENV": "development"
  },

  "additionalDirectories": [
    "../shared-lib"
  ]
}
```

### การตั้งค่าสำคัญ

| คีย์ | อธิบาย |
|-----|--------|
| `theme` | ธีม UI (light/dark) |
| `model` | โมเดลที่ใช้ |
| `effort` | ระดับ Effort |
| `autoMemoryEnabled` | เปิด/ปิด Auto Memory |
| `permissions.defaultMode` | โหมด Permission เริ่มต้น |
| `permissions.allow/ask/deny` | กฎสิทธิ์เครื่องมือ |
| `mcpServers` | ตั้งค่า MCP Servers |
| `hooks` | ตั้งค่า Hooks |
| `env` | ตัวแปรสภาพแวดล้อม |
| `additionalDirectories` | ไดเรกทอรีเพิ่มเติม |
| `enabledPlugins` | Plugins ที่เปิดใช้ |
| `codeIntelligence` | เปิด/ปิด Code Intelligence |
| `claudeMdExcludes` | ข้าม CLAUDE.md บางไฟล์ |

### โมเดลที่เลือกได้ (ใหม่สุด → ถูกสุด)

| โมเดล | id | จุดเด่น |
|-------|-----|--------|
| **Fable 5** | `claude-fable-5` | โมเดล **Mythos-class** ใหม่ล่าสุดของ Anthropic และเก่งที่สุดที่เปิดให้ใช้ทั่วไป (มาใน Claude Code **2.1.170**) มาพร้อม **context window 1M token เป็นค่าเริ่มต้น** เหมาะกับงานคิดหนักสุด, context ใหญ่ และงาน agentic |
| **Opus 5** | `claude-opus-5` | **default Opus ตัวใหม่** (ตั้งแต่ Claude Code **2.1.219**); context **1M**; fast mode ราคา **$10/$50 ต่อ Mtok** |
| **Opus 4.8** | `claude-opus-4-8` | เรือธง **Opus** ตัวก่อน; coding และวิเคราะห์บั๊กซับซ้อนเก่งสุด; default เป็น **high effort** กับงานหนัก |
| **Sonnet 5** | `claude-sonnet-5` | **default ใหม่ของ Claude Code** (ตั้งแต่ 2.1.197); สมดุล เร็ว, context **1M native** ($2/$10 ต่อ Mtok — เป็นราคา standard ตั้งแต่ 2.1.243) |
| **Haiku 4.5** | `claude-haiku-4-5` | เร็วสุด ถูกสุด; สำหรับงานง่าย/boilerplate |

> หมายเหตุ: Fast mode ใช้กับ **Opus 5 และ Opus 4.8** (ถอด Opus 4.7 ออกจาก fast mode ใน 2.1.219) — Fable 5 คือโมเดลที่เก่งที่สุดโดยรวม ส่วน Opus 5 คือ **default Opus** ตัวปัจจุบัน

### 🆕 Settings ใหม่ใน v2.1.191

- `fallbackModel` — กำหนด fallback ได้สูงสุด 3 รุ่น ลองตามลำดับเมื่อรุ่นหลัก overload/ใช้ไม่ได้
- `availableModels` + `enforceAvailableModels` (managed) — allowlist รุ่นที่เลือกได้; เมื่อ enforce แม้แต่ Default ก็ fall back เป็นรุ่นแรกที่อนุญาต และ user/project ขยายรายการเองไม่ได้
- `requiredMinimumVersion` / `requiredMaximumVersion` (managed) — ไม่ให้เปิดถ้าเวอร์ชัน Claude Code อยู่นอกช่วงที่กำหนด
- `respondToBashCommands` — กำหนดว่า output ของ `!` จะถูกตอบอัตโนมัติไหม (ค่าเริ่มต้น true)
- `language` — ล็อกภาษาที่ใช้ตั้งชื่อ session
- `attribution.sessionUrl` — ตัดลิงก์ session ของ claude.ai ออกจาก commit/PR
- `disableBundledSkills` — ซ่อน bundled skills/workflows/คำสั่ง built-in
- `teammateMode: "iterm2"`, `footerLinksRegexes`, `wheelScrollAccelerationEnabled` — ตัวเลือก terminal/UX
- `sandbox.credentials` — กันคำสั่งใน sandbox อ่านไฟล์ credential / secret env var
- `sandbox.allowAppleEvents` — เปิดให้คำสั่งใน sandbox ส่ง Apple Events ได้ (macOS)

### 🆕 ใหม่ใน v2.1.198

- **Org default models** — แอดมินตั้งโมเดล default ขององค์กรจาก console ได้; ขึ้นเป็น "Org default" (หรือ "Role default") ใน `/model` จนกว่าคุณจะเลือกเอง
- **Stream watchdog เปิดเป็นค่าเริ่มต้น** — สตรีมที่เงียบเกิน 5 นาทีจะถูกยกเลิกแล้ว retry อัตโนมัติ; ปิดด้วย `CLAUDE_ENABLE_STREAM_WATCHDOG=0`

### 🆕 ใหม่ใน v2.1.208

- `axScreenReader` — เปิดโหมด screen reader (แสดงผลเป็น plain text); เหมือนใช้ `claude --ax-screen-reader` หรือ `CLAUDE_AX_SCREEN_READER=1`
- `vimInsertModeRemaps` — map ปุ่มสองตัวติดกันในโหมด insert ของ vim (เช่น `jj`) ให้เป็น Escape

### 🆕 ใหม่ใน v2.1.216

- `sandbox.filesystem.disabled` — ปิดเฉพาะการแยก filesystem ของ sandbox โดยยังคุมการออกเน็ต (network egress) ตามเดิม

### 🆕 ใหม่ใน v2.1.217

- `emojiCompletionEnabled` — autocomplete emoji shortcode ในช่องพิมพ์ prompt: พิมพ์ `:heart:` เพื่อแทรก ❤️ หรือพิมพ์บางส่วนเช่น `:hea` เพื่อดูตัวเลือก; ตั้ง `false` เพื่อปิด

### 🆕 ใหม่ใน v2.1.218

- **Server-managed settings ถามน้อยลง** — toggle ฟีเจอร์/ค่าใช้จ่ายแบบไม่มีพิษภัยที่องค์กร push มา จะไม่ trigger prompt ขออนุมัติ settings อีกแล้ว

### 🆕 ใหม่ใน v2.1.219

- **Claude Opus 5** (`claude-opus-5`) — **default Opus ตัวใหม่**: context 1M และ fast mode ราคา $10/$50 ต่อ Mtok; fast mode ตอนนี้ใช้กับ Opus 5 และ Opus 4.8 (ถอด Opus 4.7 ออกจาก fast mode แล้ว)
- `sandbox.network.strictAllowlist` — ปฏิเสธ host ที่ไม่อยู่ใน allowlist ของคำสั่งใน sandbox ทันทีโดยไม่ถาม
- `workflowSizeGuideline` — ตั้ง guideline ขนาด Dynamic workflow จาก settings ไฟล์ไหนก็ได้; ระหว่างที่ตั้งไว้ แถวนี้ใน `/config` จะถูกซ่อน

### 🆕 ใหม่ใน v2.1.221

- **`sandbox.credentials` มี `mode: "mask"` แล้ว** (Linux และ WSL) — แทนที่จะปฏิเสธการอ่านไปเลย คำสั่งใน sandbox จะได้อ่านไฟล์ credential ฉบับ **sentinel** ส่วนค่าจริงถูก sandbox proxy สลับกลับเข้าไปตอนส่งออก (egress); เลือก mask ทั้งไฟล์ หรือเฉพาะช่วงที่ regex `extract` จับได้ก็ได้ — บน macOS การ mask ไฟล์จะถอยไปเป็น `deny`

### 🆕 ใหม่ใน v2.1.222

- **auto-start ของ Remote Control ตั้งได้เฉพาะ user scope** — settings ระดับ repo (`.claude/settings.json` และ `.claude/settings.local.json`) **เปิด** auto-start ของ Remote Control ไม่ได้อีกแล้ว (ยัง **ปิด** ได้อยู่); ถ้าจะเปิดต้องตั้งที่ user scope ผ่าน `/config`

### 🆕 ใหม่ใน v2.1.223

- **wildcard ระดับ owner สำหรับนโยบาย marketplace** — managed settings `strictKnownMarketplaces` และ `blockedMarketplaces` รับค่าแบบ `"owner/*"` แล้ว เขียนบรรทัดเดียวก็อนุญาต/บล็อก marketplace repo ทั้งหมดใต้ GitHub org นั้นได้
- **`modelOverrides` ข้าม key ที่ไม่รู้จัก** — key ที่ไม่ใช่ model ID ของ Anthropic จะไม่ถูกตีความเป็น canonical model ID ของ session อีกต่อไป แต่ถูกข้ามไปตามที่เอกสารระบุไว้
- **`env` ของ admin merge ทีละ key** — managed settings ที่ส่งมาจาก server ไม่ล้มบล็อก `env` ของ `managed-settings.json` บนเครื่องหรือ MDM profile อีกแล้ว ทั้งสองฝั่ง merge กันทีละ key

### 🆕 ใหม่ใน v2.1.224

- **ตัวเลือก mask credential ของ sandbox เพิ่ม** — `extract` คู่กับ `onExtractNoMatch` สำหรับค่า env ที่มีโครงสร้าง, `decode: "jwt"` คู่กับ `maskClaims` สำหรับ mask ราย claim ของ JWT และ `awsPairs` / `sigv4` สำหรับเซ็น AWS SigV4 ใหม่หลังสลับค่า ทั้งหมดนี้ต้องเปิด `network.tlsTerminate` และมีผลเฉพาะเมื่อตั้งใน user settings, managed settings หรือ `--settings` เท่านั้น
- **`crossSessionInbound` และ `dialogExpiry`** — ข้อความข้าม session ที่ส่ง **เข้า** session ซึ่งรันแบบ bypass permission จะถูกกักไว้รออนุมัติจากเราก่อน ส่วนข้อความที่ส่ง **ออกไปยัง** session อื่นจะถูกส่งให้อัตโนมัติ
- **prompt อนุมัติ managed settings ไม่ถามซ้ำแล้ว** — ถ้า settings ขององค์กรไม่เปลี่ยน prompt อนุมัติจะไม่โผล่ซ้ำหลัง login ใหม่หรือสลับ organization

### 🆕 ใหม่ใน v2.1.232

- **`/config` มีแถว "Dialog expiry" และ "Messages from your other sessions"** — ตั้งค่า `dialogExpiry` และ `crossSessionInbound` จาก `/config` ได้แล้ว โดยข้อความข้าม session ที่ส่งเข้ามาเลือกได้ว่าจะรับ (accept) / กักไว้ (hold) / ปฏิเสธ (refuse)
- **`additionalMarketplaces` และ `allowedMarketplaces`** — เป็น alias ที่อ่านง่ายกว่าของ `extraKnownMarketplaces` และ `strictKnownMarketplaces` ใช้ได้แล้ว
- **`blockedMarketplaces` แบบ url บล็อกตอน git clone ด้วย** — entry แบบ url ในนโยบายองค์กรที่ชี้ไป repo URL ตรง ๆ ยังบล็อก URL นั้นอยู่ แม้ CLI จะจัดว่าเป็นการ git clone
- **dialog อนุมัติ managed settings ชัดขึ้น** — แสดง URL ของ endpoint, ใช้ถ้อยคำที่ชัดขึ้นกับการเปลี่ยนที่แตะแค่ telemetry, ข้ามตัวเลือก OpenTelemetry ทั่ว ๆ ไป และบังคับให้กดอนุมัติเมื่อ server สั่ง override binary ของ sandbox (`sandbox.bwrapPath`, `sandbox.socatPath`, `sandbox.ripgrep`)

### 🆕 ใหม่ใน v2.1.233

- **`modelOverrides` ปิด diagnostic เรื่อง model ที่ไม่รู้จักได้** — เมื่อยิง request ด้วย model ID ที่ Claude Code ไม่รู้จัก print mode จะเขียนบรรทัด `[claude-code:unrecognized_model]` ลง stderr; แมป ID นั้นไว้ใน `modelOverrides` แล้วข้อความจะหายไป

### 🆕 ใหม่ใน v2.1.234

- **"Continue automatically at usage limit"** — Claude Code จะทำงาน session ต่อให้อัตโนมัติเมื่อ usage limit ของ claude.ai รีเซ็ต; ปิดได้ที่แถวนี้ใน `/config`
- **ถอด "Default teammate model" ออกจาก `/config`** — teammate ใน agent team จะใช้โมเดลเดียวกับ leader เว้นแต่ตอน spawn ระบุโมเดลไว้เอง ดูที่ [[13-agent-teams]]
- **badge ของ GitLab merge request** — repo ที่มี remote เป็น GitLab และ login `glab` CLI ไว้แล้ว จะเห็น `MR !N` ที่ footer และ statusline พร้อมสถานะ draft / pending / green

### 🆕 ใหม่ใน v2.1.235

- **setting `spellcheck`** — setting เสริมที่ขีดเส้นใต้คำสะกดผิดในช่องพิมพ์ prompt ระหว่างที่เราพิมพ์ โดยใช้ `aspell`, `hunspell` หรือ `ispell` ที่ติดตั้งไว้ในเครื่องอยู่แล้ว

### 🆕 ใหม่ใน v2.1.237

- **output style "Concise" ที่มีมาให้ในตัว** — output style สำเร็จรูปที่ทำให้ Claude ตอบด้วยผลลัพธ์ก่อน ตัดคำเกริ่นและการบรรยายระหว่างทางออก แต่ยังทำงานละเอียดเท่าเดิม เลือกได้ที่หัวข้อ **Output style** ใน `/config`

### 🆕 ใหม่ใน v2.1.238

- **setting `keybindingFlavor`** — ตั้งเป็น `"readline"` เพื่อให้ `Ctrl+W` ในช่อง prompt ลบย้อนกลับไปจนถึงช่องว่างก่อนหน้า เหมือนใน Bash ส่วนค่าเริ่มต้น `"classic"` ยังเหมือนเดิมทุกอย่าง ดูที่ [[04-keyboard-shortcuts]]

### 🆕 ใหม่ใน v2.1.243

- **setting `modelPicker`** — จัดรายการใน `/model` picker เองได้ เป็นลิสต์โมเดลเรียงลำดับพร้อมป้ายชื่อ (สะกด id แบบไหนก็ได้ รวมถึง id ของ Vertex/Bedrock) จะเอาไปต่อท้ายหรือแทนที่ lineup ในตัวก็ได้
- **setting `promptCacheTtl` / `subagentPromptCacheTtl`** — ผู้ใช้ API key และ cloud provider ตั้ง prompt cache ของบทสนทนาหลักเป็น 1 ชั่วโมง โดยให้ subagent อยู่ที่ 5 นาทีตามเดิมได้
- **managed setting `modelPricing`** — องค์กรใส่เรตราคาต่อโมเดลตามสัญญาและตัวคูณส่วนลดได้ แล้ว `/cost`, status line และตัวเลข cost ใน telemetry จะใช้เรตนั้นแทนราคา list ดูที่ [[31-cost-management]]
- **ราคา $2/$10 ต่อ Mtok ของ Sonnet 5 เป็นราคา standard แล้ว** — `/model` picker และ skill `claude-api` ที่มากับตัว เลิกแสดงเป็นราคาโปรโมชันแบบจำกัดเวลา

### 🆕 ใหม่ใน v2.1.247

- **setting `feedbackDrafts`** — ปิดไม่ให้ Claude ร่างรายงาน feedback (ผ่านเครื่องมือ `SendFeedback`) ที่ร่างไว้ให้เราตรวจแล้วส่งจาก `/feedback` ดู [[03-slash-commands]]
- **`spinnerTipsOverride` รับ entry แบบละเอียดขึ้น** — ใส่ entry แบบ `{id, text, cooldownSessions, priority}`, path `tipsFile` และ `label` ได้ องค์กรเลยหมุน tip ของตัวเองสลับกับ tip ในตัวได้

### 🆕 ใหม่ใน v2.1.248

- **setting `desktopSessionCleanupPeriodDays`** — การเก็บกวาด transcript จะไม่ลบ session ที่เขียนโดย Claude Desktop ตราบที่ยังอยู่ในแอป (เว้นแต่ policy องค์กรคุม retention เอง); setting นี้กำหนดเพดานว่าข้อยกเว้นนั้นอยู่ได้นานกี่วัน

### 🆕 ใหม่ใน v2.1.251

- **`env` ระดับ project ตั้งที่อยู่ config/temp ไม่ได้แล้ว** — `CLAUDE_CONFIG_DIR`, `CLAUDE_CODE_TMPDIR` และ `TMPDIR`/`TMP`/`TEMP` ที่ตั้งใน block `env` ของ `.claude/settings.json` ระดับ project จะถูกเมิน — ให้ไปตั้งใน shell, user settings หรือ managed settings แทน
- **Enterprise แบบ seat-based ได้ Opus 5 เป็น default** — โมเดลเริ่มต้นของ Enterprise subscription แบบ seat-based เปลี่ยนเป็น Opus 5 เท่าเทียมกับแผนพรีเมียมอื่น

### การ Persist ของ `/config` และ `/model`

การแก้ผ่าน `/config` จะ persist ลง `~/.claude/settings.json` และเข้าลำดับ override project/local/policy. `/model` เปลี่ยนเฉพาะ session ปัจจุบัน (กด `d` เพื่อตั้ง default) และจำเป็น default ของ session ใหม่. slider `/effort` ใช้ป้าย **Faster / Smarter**.

---

---

## Navigation

- ⬅️ Previous: [[05-permissions]]
- ➡️ Next: [[07-claude-md]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/06-configuration]]
