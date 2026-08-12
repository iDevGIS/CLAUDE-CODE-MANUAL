---
title: "Environment Variables"
section: 23
lang: th
tags:
  - claude-code
  - environment-variables
  - reference
aliases:
  - "Environment Variables"
related:
  - "[[06-configuration]]"
  - "[[05-permissions]]"
---

# Environment Variables

### ประโยชน์และ Use Cases

> **ทำไมต้องรู้จัก Environment Variables?**
>
> Environment Variables ช่วยให้คุณ **ควบคุม Claude Code ผ่านตัวแปรสภาพแวดล้อม** — เหมาะกับการตั้งค่าใน CI/CD, Docker, หรือสภาพแวดล้อมที่แก้ไฟล์ Config ไม่สะดวก

**Use Cases:**

| ตัวแปร | Use Case | คำอธิบาย |
|--------|----------|----------|
| `ANTHROPIC_API_KEY` | ใช้ใน CI/CD | ตั้ง API Key ใน GitHub Secrets แล้ว Claude ใช้ได้เลยใน Actions |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | ใช้ใน Shared Environment | ปิด Memory เมื่อหลายคนใช้เครื่องเดียวกัน ป้องกันข้อมูลปน |
| `CLAUDE_CODE_SIMPLE` | ใช้ใน Script | เปิด Bare Mode อัตโนมัติ Output สะอาด ไม่มี UI |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | ทดลอง Agent Teams | เปิดฟีเจอร์ทดลอง Agent Teams |
| `CLAUDE_CONFIG_DIR` | ใช้หลาย Config | ชี้ไปที่ Config Directory อื่น เหมาะกับการทดสอบ |

### ตัวแปรสภาพแวดล้อมสำคัญ

| ตัวแปร | อธิบาย |
|--------|--------|
| `ANTHROPIC_API_KEY` | API Key สำหรับยืนยันตัวตน |
| `CLAUDE_CONFIG_DIR` | Override ไดเรกทอรี Config |
| `CLAUDE_CODE_DEBUG_LOGS_DIR` | ไดเรกทอรีเก็บ Debug Log |
| `CLAUDE_CODE_SIMPLE` | เปิดโหมด Bare |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | ปิด Auto Memory |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | ปิด Background Tasks |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | เปิด Agent Teams |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | ใช้ PowerShell แทน Bash |
| `CLAUDE_SESSION_ID` | ระบุ Session ID |
| `CLAUDE_CODE_TASK_LIST_ID` | ตั้งชื่อ Task List |
| `CLAUDE_CODE_SAFE_MODE` | เปิดแบบปิด customization ทั้งหมด (= `--safe-mode`) |
| `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` | ซ่อน bundled skills/workflows/คำสั่ง built-in |
| `CLAUDE_CLIENT_PRESENCE_FILE` | ไฟล์ marker เพื่อปิด push มือถือตอนนั่งอยู่หน้าเครื่อง |
| `CLAUDE_CODE_ENABLE_AUTO_MODE` | เปิด Auto mode บน Bedrock/Vertex/Foundry — ไม่จำเป็นตั้งแต่ v2.1.207 (เปิดเป็นค่าเริ่มต้นแล้ว; ปิดด้วย setting `disableAutoMode`) |
| `CLAUDE_CODE_RETRY_WATCHDOG` | watchdog retry สำหรับ session ไม่มีคนเฝ้า — ยก default retry ของ error ชั่วคราวเป็น 300 และปลดเพดาน 15 ของ `CLAUDE_CODE_MAX_RETRIES` *(v2.1.199)* |
| `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` | ยกเลิก MCP tool call ที่ค้างไม่ตอบ |
| `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` | ปิดการคลิก/ลาก/hover ของเมาส์ใน fullscreen (ยังเลื่อน scroll ได้) *(v2.1.195)* |
| `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP` | ปิดการเก็บกวาด background shell ที่ idle อัตโนมัติเมื่อ memory ตึง *(v2.1.193)* |
| `OTEL_LOG_ASSISTANT_RESPONSES` | บันทึกข้อความคำตอบของโมเดลผ่าน OpenTelemetry (`=1` เปิด, `=0` ปิด; ถ้าไม่ตั้งจะตามค่า `OTEL_LOG_USER_PROMPTS`) *(v2.1.193)* |
| `CLAUDE_ENABLE_STREAM_WATCHDOG` | stream watchdog (เปิด default) — ยกเลิก+retry สตรีมที่เงียบเกิน 5 นาที; ตั้ง `0` เพื่อปิด *(v2.1.198)* |
| `CLAUDE_AX_SCREEN_READER` | โหมด screen reader — แสดงผลเป็น plain text (= `--ax-screen-reader` / setting `axScreenReader`) *(v2.1.208)* |
| `CLAUDE_CODE_PROCESS_WRAPPER` | wrapper สำหรับองค์กร — ทุก process ที่ Claude Code spawn ตัวเอง (agent view, background service) จะรันผ่าน executable ที่กำหนดไว้ *(v2.1.208)* |
| `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT` | รวมข้อความและ thinking ของ subagent ลงใน output แบบ `stream-json` (= `--forward-subagent-text`) *(v2.1.211)* |
| `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION` | จำกัดจำนวนครั้งของ WebSearch ต่อ session (default 200) กันลูปค้นหาไม่รู้จบ *(v2.1.212)* |
| `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION` | เพดานจำนวน subagent ที่ spawn ได้ต่อ session; `/clear` รีเซ็ตโควตา — ค่า default 200 ถูกถอดออกใน v2.1.224 แล้ว session ที่รันยาวจึงไม่ปฏิเสธ agent ใหม่ (เพดานจำนวนที่รันพร้อมกันและความลึกยังมีผล) *(v2.1.212, เปลี่ยน v2.1.224)* |
| `CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS` | ระยะเวลา (ms) ก่อนที่ MCP tool call ที่รันนานจะถูกย้ายไป background อัตโนมัติ (default 2 นาที); ใช้ปิดพฤติกรรมนี้ได้ด้วย *(v2.1.212)* |
| `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` | เพดานการตัดข้อความ (default 60 KB) ของ content attribute ใน OpenTelemetry *(v2.1.214)* |
| `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` | เพดานจำนวน subagent ที่รันพร้อมกัน (default 20) กันไม่ให้ข้อความเดียว fan out background agent แบบไม่จำกัด *(v2.1.217)* |
| `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` | เพดานความลึกของ subagent ที่ spawn ซ้อนกัน — default 3 ตั้งแต่ v2.1.219 (ช่วง v2.1.217–218 ปิดเป็นค่าเริ่มต้น); ตั้ง `1` เพื่อปิดการซ้อน *(v2.1.217, เปลี่ยน v2.1.219)* |
| `FORCE_HYPERLINK` | ลิงก์ PR badge ที่ footer เป็น hyperlink คลิกได้แม้ตรวจไม่พบว่า terminal รองรับ (เช่นผ่าน ssh/tmux); ตั้ง `0` เพื่อปิด *(v2.1.217)* |
| `CLAUDE_CODE_RESUME_INTERRUPTED_TURN` | การ auto-resume ของ turn ที่ถูกขัดจังหวะ; ตั้ง `0` เพื่อปิด — ค่าที่เป็น falsy มีผลจริงตั้งแต่ v2.1.221 *(v2.1.221)* |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | กด context ของโมเดล Claude **ทุกตัว** ที่มี window 1M แบบ native ให้เหลือ 200K ด้วย auto-compaction (เดิมมีผลเฉพาะรายชื่อโมเดลที่ fix ไว้); ถ้า auto-compaction กดไม่อยู่ที่ 200K จะมีคำเตือนตอนเปิดโปรแกรม *(เปลี่ยน v2.1.223)* |
| `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT` | ตั้ง `1` เพื่อให้ session ที่ใช้ model ID ที่ไม่รู้จักโตเกิน context window ที่ระบบเดาไว้ได้เหมือนเดิม — ตั้งแต่ v2.1.223 auto-compact จะคุมไม่ให้เกินเป็นค่าเริ่มต้น *(v2.1.223)* |
| `ANTHROPIC_BEDROCK_REGION_PREFIX` | บน Bedrock ใช้เลือก cross-region inference profile ที่ต้องการ แทนตัวที่ระบบอนุมานจาก `AWS_REGION` *(v2.1.224)* |
| `CLAUDE_CODE_WORKFLOW_PREFIX_STAGGER_MS` | ระยะหน่วงระหว่าง agent พี่น้องใน workflow ที่ใช้ prompt prefix เดียวกัน เพื่อให้ตัวหลังอ่าน prefix จาก cache; ตั้ง `0` เพื่อปิด *(v2.1.229)* |

> env var ที่รับค่าตัวเลข (timeout, token budget, retry count) รองรับ scientific notation และตัวคั่นหลักด้วย เช่น `1e6` หรือ `64_000` *(v2.1.211)*

> log event ของ OpenTelemetry มี attribute `message.uuid`, `client_request_id` และ `tool_source` เพิ่มเข้ามา สำหรับ correlate ระดับ message และบอกที่มาของ tool call *(v2.1.214)*

### ตั้งค่าใน settings.json

```json
{
  "env": {
    "NODE_ENV": "development",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

---

## Navigation

- ⬅️ Previous: [[22-directory-structure]]
- ➡️ Next: [[24-troubleshooting]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/23-environment-variables]]
