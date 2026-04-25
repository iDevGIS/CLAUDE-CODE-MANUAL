---
title: "โครงสร้างไดเรกทอรี"
section: 22
lang: th
tags:
  - claude-code
  - directory-structure
  - reference
aliases:
  - "โครงสร้างไดเรกทอรี"
related:
  - "[[21-special-features]]"
  - "[[23-environment-variables]]"
---

# โครงสร้างไดเรกทอรี

### ประโยชน์และ Use Cases

> **ทำไมต้องรู้โครงสร้างไดเรกทอรี?**
>
> การรู้ว่า Claude Code เก็บไฟล์ไหนที่ไหน ช่วยให้คุณ **แก้ปัญหาได้เร็วขึ้น, จัดการ Config ได้ถูกต้อง, และ Backup ข้อมูลสำคัญได้** — เช่น รู้ว่า Session เก็บที่ไหนเพื่อลบเมื่อเต็ม หรือรู้ว่า Memory อยู่ที่ไหนเพื่อแก้ไขด้วยมือ

**Use Cases:**

| สถานการณ์ | ไฟล์/โฟลเดอร์ | คำอธิบาย |
|----------|-------------|----------|
| **อยากแก้ไข Memory ด้วยมือ** | `~/.claude/projects/<project>/memory/` | แก้ไข/ลบ Memory File ที่ไม่ถูกต้องได้โดยตรง |
| **อยาก Backup เซสชัน** | `~/.claude/projects/<project>/sessions/` | Copy ไฟล์ Session ไว้ก่อน |
| **อยากแชร์ Settings กับทีม** | `.claude/settings.json` | Commit ไฟล์นี้ ทีมทั้งหมดใช้ Settings เดียวกัน |
| **อยากเก็บ Settings ส่วนตัว** | `.claude/settings.local.json` | gitignored ไม่ปนกับคนอื่น |
| **อยากแชร์ Skills กับทีม** | `.claude/skills/` | Commit โฟลเดอร์นี้ ทีมใช้ Skills เดียวกัน |
| **อยากใช้ Skills ทุกโปรเจกต์** | `~/.claude/skills/` | Skills ส่วนตัว ใช้ได้ทุกโปรเจกต์ |

### โฟลเดอร์โปรเจกต์ (.claude/)

```
your-project/
├── CLAUDE.md                    # คำสั่งหลักของโปรเจกต์
├── CLAUDE.local.md              # คำสั่งส่วนตัว (gitignored)
├── .claude/
│   ├── CLAUDE.md                # ตำแหน่งสำรอง
│   ├── CLAUDE.local.md          # คำสั่งส่วนตัว (gitignored)
│   ├── settings.json            # ตั้งค่าโปรเจกต์
│   ├── settings.local.json      # ตั้งค่าส่วนตัว (gitignored)
│   ├── rules/                   # คำสั่งแยกหัวข้อ
│   │   ├── testing.md
│   │   └── api-design.md
│   ├── skills/                  # Skills ที่สร้างเอง
│   │   └── deploy/
│   │       └── SKILL.md
│   ├── agents/                  # Subagents ที่สร้างเอง
│   │   └── security-reviewer/
│   │       └── agent.md
│   ├── worktrees/               # Git Worktree Sessions
│   └── .mcp.json                # MCP Config
└── .mcp.json                    # MCP Config (ตำแหน่งสำรอง)
```

### โฟลเดอร์ผู้ใช้ (~/.claude/)

```
~/.claude/
├── settings.json                # ตั้งค่าส่วนตัว
├── CLAUDE.md                    # คำสั่งส่วนตัวทุกโปรเจกต์
├── keybindings.json             # คีย์ลัดที่กำหนดเอง
├── skills/                      # Skills ส่วนตัว
├── agents/                      # Agents ส่วนตัว
├── rules/                       # Rules ส่วนตัว
├── projects/                    # เก็บ Sessions
│   └── <project>/
│       ├── sessions/            # ไฟล์บทสนทนา
│       └── memory/              # Auto Memory
│           ├── MEMORY.md
│           └── *.md
├── teams/                       # Agent Team Configs
└── scheduled-tasks/             # Scheduled Tasks ของ Desktop
```

---

---

## Navigation

- ⬅️ Previous: [[21-special-features]]
- ➡️ Next: [[23-environment-variables]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../en/22-directory-structure]]
