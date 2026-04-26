---
walkthrough: 07
title: Plugins — bundle commands + agents + MCP
related:
  - "[[05-skills-vs-subagents]]"
  - "[[06-mcp-servers]]"
---

# 07 — Plugins: รวมทุกอย่างเป็น unit เดียวที่ share ได้

> เป้าหมาย: เข้าใจโครงสร้าง plugin และดูตัวอย่างใน `ProjectEx2/plugin-example/`

## Plugin คืออะไร

โฟลเดอร์ที่บรรจุ **Claude Code config ที่ reuse ได้**:
- slash commands
- subagents
- skills
- MCP server configs
- output styles
- statusline scripts

Install ครั้งเดียว — ใช้ได้ทุกโปรเจกต์

## โครงสร้าง

```
my-plugin/
├── plugin.json          ← manifest (required)
├── README.md
├── commands/            ← optional, slash commands
│   └── *.md
├── agents/              ← optional, subagents
│   └── *.md
├── skills/              ← optional
│   └── <name>/SKILL.md
├── output-styles/       ← optional
│   └── *.md
└── mcp.json             ← optional, MCP servers
```

## ตัวอย่าง: `plugin-example/` ใน ProjectEx2

```
plugin-example/
├── plugin.json          ← name: taskflow-tools, version: 0.1.0
├── README.md
├── commands/
│   └── ping.md          ← /ping [url]
└── agents/
    └── helper.md        ← taskflow-helper
```

เปิด `plugin.json` ดู — มี field สำคัญ:

```json
{
  "name": "taskflow-tools",
  "version": "0.1.0",
  "commands": "./commands",
  "agents": "./agents"
}
```

## Install (local dev)

```bash
mkdir -p ~/.claude/plugins
ln -s "$(pwd)/ProjectEx2/plugin-example" ~/.claude/plugins/taskflow-tools

claude
> /plugins
# enable taskflow-tools

> /ping
> use the taskflow-helper subagent
```

## Install (จาก git)

```bash
cd ~/.claude/plugins
git clone https://github.com/<org>/<plugin>.git
claude /plugins  # enable
```

## เมื่อไหร่ควรทำเป็น plugin (vs. project-local)

| สถานการณ์ | ทำเป็น | เหตุผล |
|----------|-------|--------|
| ทีม 3+ คน, ใช้ pattern เดียวกันทุกโปรเจกต์ | plugin | reuse + version control |
| skill เดียว ใช้แค่โปรเจกต์เดียว | local `.claude/` | ไม่ต้อง overhead |
| MCP server config ที่ทุกโปรเจกต์ใช้ (เช่น GitHub) | plugin | ไม่ต้อง copy 10 รอบ |
| rule เฉพาะโปรเจกต์ | local `CLAUDE.md` | ไม่เหมาะกับ plugin |

## Versioning

- ใช้ semver ใน `plugin.json#version`
- ใส่ใน `~/.claude/settings.json`:
  ```json
  {
    "plugins": {
      "taskflow-tools": "^0.1.0"
    }
  }
  ```
- เวลา breaking change → bump major + เขียน CHANGELOG ใน plugin's README

## Pitfalls

- **plugin ที่ขอ permission กว้าง** — `allowed-tools` ของ slash command ใน plugin จะเพิ่มทับ permission ของ user; เก็บให้แคบ
- **ชื่อ skill/command ชน** — ใส่ prefix (`tf-ping`, ไม่ใช่ `ping`) ถ้า plugin จะ public
- **MCP server ใน plugin** — ถ้าต้องการ token, ต้องบอก user ว่า env ตัวไหนต้อง set

## Related

- **[[05-skills-vs-subagents]]** — skill/agent ใน plugin ทำงานเหมือน local
- **[[06-mcp-servers]]** — plugin bundle MCP config ได้
