# คู่มือการใช้งาน Claude Code อย่างละเอียด (ภาษาไทย)

> **Claude Code** คือเครื่องมือ CLI (Command Line Interface) อย่างเป็นทางการจาก Anthropic  
> สำหรับช่วยเหลือนักพัฒนาในการเขียนโค้ด, แก้บัก, รีแฟคเตอร์, และจัดการโปรเจกต์โดยใช้ AI

---

## สารบัญ

1. [การติดตั้งและเริ่มต้นใช้งาน](#1-การติดตั้งและเริ่มต้นใช้งาน)
2. [คำสั่ง CLI และ Flags](#2-คำสั่ง-cli-และ-flags)
3. [Slash Commands (คำสั่งลัด)](#3-slash-commands-คำสั่งลัด)
4. [คีย์ลัด (Keyboard Shortcuts)](#4-คีย์ลัด-keyboard-shortcuts)
5. [ระบบ Permission (สิทธิ์การเข้าถึง)](#5-ระบบ-permission-สิทธิ์การเข้าถึง)
6. [การตั้งค่า (Configuration)](#6-การตั้งค่า-configuration)
7. [CLAUDE.md - คำสั่งถาวรสำหรับโปรเจกต์](#7-claudemd---คำสั่งถาวรสำหรับโปรเจกต์)
8. [ระบบ Memory (ความจำ)](#8-ระบบ-memory-ความจำ)
9. [MCP Servers (Model Context Protocol)](#9-mcp-servers-model-context-protocol)
10. [Hooks (ระบบ Event Handler)](#10-hooks-ระบบ-event-handler)
11. [Skills (คำสั่งที่สร้างเอง)](#11-skills-คำสั่งที่สร้างเอง)
12. [Subagents (ตัวช่วยเฉพาะทาง)](#12-subagents-ตัวช่วยเฉพาะทาง)
13. [Agent Teams (ทีม AI)](#13-agent-teams-ทีม-ai)
14. [การจัดการ Context](#14-การจัดการ-context)
15. [Git Integration](#15-git-integration)
16. [Headless Mode (โหมดอัตโนมัติ)](#16-headless-mode-โหมดอัตโนมัติ)
17. [IDE Integration](#17-ide-integration)
18. [Plugins (ปลั๊กอิน)](#18-plugins-ปลั๊กอิน)
19. [Session Management](#19-session-management)
20. [Scheduled Tasks (งานตั้งเวลา)](#20-scheduled-tasks-งานตั้งเวลา)
21. [ฟีเจอร์พิเศษอื่น ๆ](#21-ฟีเจอร์พิเศษอื่น-ๆ)
22. [โครงสร้างไดเรกทอรี](#22-โครงสร้างไดเรกทอรี)
23. [Environment Variables](#23-environment-variables)
24. [การแก้ปัญหาเบื้องต้น](#24-การแก้ปัญหาเบื้องต้น)
25. [เคล็ดลับและแนวทางปฏิบัติที่ดี](#25-เคล็ดลับและแนวทางปฏิบัติที่ดี)
26. [จำลอง Flow การทำงานจริง](#26-จำลอง-flow-การทำงานจริง)

---

## 1. การติดตั้งและเริ่มต้นใช้งาน

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Claude Code?**
>
> Claude Code เปลี่ยนวิธีการทำงานของนักพัฒนาซอฟต์แวร์อย่างสิ้นเชิง แทนที่จะต้องเขียนโค้ดทุกบรรทัดเอง ค้นหา Stack Overflow ถาม ChatGPT แล้ว Copy-Paste กลับมา — Claude Code ทำงานอยู่ **ภายในโปรเจกต์ของคุณโดยตรง** สามารถอ่านไฟล์ แก้ไขโค้ด รันคำสั่ง และจัดการ Git ได้เหมือนเพื่อนร่วมทีมที่นั่งข้างกัน

**Use Cases หลัก:**

| สถานการณ์ | ตัวอย่างการใช้งาน |
|----------|-----------------|
| **นักพัฒนามือใหม่** | เข้าโปรเจกต์ใหม่ ให้ Claude อธิบายโครงสร้างโค้ด, สอนวิธี Build, อธิบายฟังก์ชันที่ซับซ้อน |
| **แก้ Bug ด่วน** | วาง Error Message แล้วให้ Claude หาสาเหตุและแก้ไขโค้ดให้ |
| **เขียนฟีเจอร์ใหม่** | อธิบายสิ่งที่ต้องการ Claude จะสร้างไฟล์ เขียนโค้ด เขียน Test ให้ครบ |
| **รีแฟคเตอร์โค้ดเก่า** | ให้ Claude วิเคราะห์โค้ดที่ซ้ำซ้อนแล้วปรับปรุงให้ Clean ขึ้น |
| **เขียน Test** | ให้ Claude อ่านโค้ดแล้วเขียน Unit Test / Integration Test ให้ |
| **Code Review** | ให้ Claude รีวิว PR หา Bug, Security Issue, Performance Problem |
| **สร้าง Documentation** | ให้ Claude อ่านโค้ดแล้วเขียนเอกสารให้อัตโนมัติ |
| **แปลงโค้ด** | ย้าย JavaScript → TypeScript, REST → GraphQL, Class → Functional |
| **DevOps** | เขียน Dockerfile, CI/CD Pipeline, Infrastructure as Code |
| **เรียนรู้เทคโนโลยีใหม่** | ถาม Claude เกี่ยวกับ Framework/Library ที่ไม่เคยใช้ พร้อมดูตัวอย่างจริงในโปรเจกต์ |

### วิธีการติดตั้ง

**macOS / Linux / WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Homebrew (macOS):**
```bash
brew install --cask claude-code
```

**WinGet (Windows):**
```powershell
winget install Anthropic.ClaudeCode
```

### เริ่มต้นใช้งาน

```bash
# เข้าไปในโฟลเดอร์โปรเจกต์
cd your-project

# เริ่ม Claude Code
claude

# ล็อกอิน (ครั้งแรก)
claude auth login

# ล็อกอินด้วย API Key จาก Anthropic Console
claude auth login --console

# ตรวจสอบสถานะการยืนยันตัวตน
claude auth status
```

### แพลตฟอร์มที่รองรับ

| แพลตฟอร์ม | รายละเอียด |
|-----------|-----------|
| Terminal CLI | ฟีเจอร์ครบถ้วนที่สุด |
| VS Code Extension | ใช้ผ่าน VS Code ได้โดยตรง |
| JetBrains IDEs | IntelliJ, PyCharm, WebStorm ฯลฯ |
| Desktop App | macOS, Windows |
| Web | claude.ai/code |
| iOS App | ใช้งานบนมือถือได้ |
| Slack Integration | ใช้ผ่าน Slack |
| GitHub Actions / GitLab CI | ใช้ใน CI/CD Pipeline |

---

## 2. คำสั่ง CLI และ Flags

### ประโยชน์และ Use Cases

> **ทำไมต้องรู้จัก CLI Flags?**
>
> CLI Flags คือกุญแจสำคัญในการ **ปรับแต่ง Claude Code ให้ทำงานตรงกับสถานการณ์** ที่ต้องการ เช่น รันใน CI/CD แบบอัตโนมัติ, จำกัดงบประมาณ, เลือกโมเดลที่เหมาะสม หรือทำงานหลายงานคู่ขนานกัน

**Use Cases:**

| Use Case | คำสั่งที่ใช้ | คำอธิบาย |
|----------|------------|----------|
| **ถามคำถามเร็ว ๆ ไม่ต้อง Interactive** | `claude -p "อธิบายฟังก์ชัน X"` | ได้คำตอบทันทีแล้วจบ ไม่ต้องเปิดเซสชัน เหมาะกับการ Pipe เข้า Script |
| **ต่อบทสนทนาเมื่อวาน** | `claude -c` | กลับมาทำงานต่อจากที่ค้างไว้ Claude จำบริบททั้งหมดได้ |
| **ทำงาน 2 ฟีเจอร์พร้อมกัน** | `claude -w feature-a` + `claude -w feature-b` | แต่ละ Worktree มี Branch แยก ไม่ Conflict กัน |
| **จำกัดค่าใช้จ่าย** | `claude --max-budget-usd 5` | ป้องกันค่าใช้จ่ายเกินงบ เหมาะกับทีมที่มีงบจำกัด |
| **ใช้โมเดลถูก ๆ สำหรับงานง่าย** | `claude --model sonnet` | ประหยัดค่าใช้จ่ายกับงานที่ไม่ซับซ้อน |
| **รัน Script อัตโนมัติ** | `claude --bare -p "..." --output-format json` | ผลลัพธ์สะอาด ไม่มี UI มาปนเป็น เหมาะกับ CI/CD |
| **ส่ง Error Log ให้วิเคราะห์** | `cat error.log \| claude -p "วิเคราะห์"` | ส่งข้อมูลจาก Pipe ให้ Claude วิเคราะห์ได้ทันที |
| **ทำงานข้ามโปรเจกต์** | `claude --add-dir ../other-project` | เข้าถึงไฟล์จากหลายโปรเจกต์พร้อมกัน |

### คำสั่งเปิดเซสชัน

| คำสั่ง | อธิบาย |
|-------|--------|
| `claude` | เปิดเซสชันแบบโต้ตอบ (Interactive) |
| `claude "คำถาม"` | เปิดเซสชันพร้อมคำถามเริ่มต้น |
| `claude -p "คำถาม"` | โหมด Non-interactive (พิมพ์ผลลัพธ์แล้วจบ) |
| `cat file \| claude -p "คำถาม"` | ส่งข้อมูลจาก pipe เข้า Claude |
| `claude -c` | ต่อบทสนทนาล่าสุด |
| `claude -r "ชื่อ"` | กลับไปเซสชันที่ระบุ |
| `claude -w branch-name` | สร้าง Git Worktree แยกทำงานคู่ขนาน |
| `claude --fork-session` | แยกเซสชันใหม่จากเซสชันปัจจุบัน |
| `claude --remote` | สร้างเซสชันบน claude.ai |

### ตัวเลือกโมเดลและ Effort

| Flag | อธิบาย |
|------|--------|
| `--model <ชื่อ>` | เลือกโมเดล เช่น `sonnet`, `opus`, `claude-sonnet-4-6` |
| `--effort low\|medium\|high\|max` | ระดับความพยายาม (`max` ใช้ได้เฉพาะ Opus 4.6) |
| `--fallback-model` | เปิดใช้โมเดลสำรองเมื่อโมเดลหลักไม่ว่าง |

### ตัวเลือก Permission

| Flag | อธิบาย |
|------|--------|
| `--permission-mode <mode>` | ตั้งโหมดสิทธิ์: `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` |
| `--enable-auto-mode` | เปิดใช้ Auto Mode ใน Shift+Tab |
| `--dangerously-skip-permissions` | ข้ามการขออนุญาตทั้งหมด (ระวัง!) |
| `--allowedTools "Tool1,Tool2"` | อนุมัติเครื่องมือล่วงหน้า |
| `--disallowedTools "Tool1,Tool2"` | บล็อกเครื่องมือที่ระบุ |

### ตัวเลือก System Prompt

| Flag | อธิบาย |
|------|--------|
| `--system-prompt "ข้อความ"` | แทนที่ System Prompt ทั้งหมด |
| `--system-prompt-file <path>` | โหลด System Prompt จากไฟล์ |
| `--append-system-prompt "ข้อความ"` | เพิ่มข้อความต่อท้าย System Prompt |

### ตัวเลือก Output

| Flag | อธิบาย |
|------|--------|
| `--output-format text\|json\|stream-json` | รูปแบบ Output |
| `--json-schema <schema>` | บังคับ Output เป็น JSON ตาม Schema |
| `--input-format text\|stream-json` | รูปแบบ Input |
| `--verbose` | แสดง Log ละเอียด |
| `--debug <categories>` | เปิด Debug Mode |

### ตัวเลือกขั้นสูง

| Flag | อธิบาย |
|------|--------|
| `--bare` | โหมดเปล่า: ข้าม Hooks, Skills, Plugins, MCP, Memory |
| `--max-turns <n>` | จำกัดจำนวนรอบการทำงาน |
| `--max-budget-usd <จำนวน>` | จำกัดงบประมาณ (USD) |
| `--config <file>` | โหลดไฟล์ MCP Config |
| `--add-dir <path>` | เพิ่มไดเรกทอรีที่เข้าถึงได้ |
| `--agent <name>` | ระบุ Subagent ที่จะใช้ |
| `--init` | รัน Initialization Hooks แล้วเริ่ม |
| `--version` | แสดงเวอร์ชัน |

### คำสั่งอื่น ๆ

```bash
claude auth login          # ล็อกอิน
claude auth logout         # ล็อกเอาท์
claude auth status         # ตรวจสอบสถานะ
claude setup-token         # สร้าง Token สำหรับ CI
claude mcp                 # จัดการ MCP Servers
claude plugin              # จัดการ Plugins
claude update              # อัปเดตเวอร์ชันล่าสุด
claude agents              # ดูรายการ Subagents
claude remote-control      # เริ่ม Remote Control Server
```

---

## 3. Slash Commands (คำสั่งลัด)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Slash Commands?**
>
> Slash Commands คือ **ทางลัดสำหรับงานที่ทำบ่อย** เพียงพิมพ์ `/` ตามด้วยชื่อคำสั่ง Claude จะทำงานตามขั้นตอนที่กำหนดไว้โดยอัตโนมัติ ลดเวลาพิมพ์คำสั่งยาว ๆ และลดโอกาสผิดพลาด

**Use Cases:**

| สถานการณ์ | Slash Command | คำอธิบาย |
|----------|--------------|----------|
| **เขียนโค้ดเสร็จ อยากคอมมิท** | `/commit` | Claude วิเคราะห์ Diff, เขียน Commit Message ที่สื่อความหมาย, Stage ไฟล์ที่ถูกต้อง แล้ว Commit ให้ — ไม่ต้องคิด Message เอง |
| **อยากส่ง PR ให้ทีมรีวิว** | `/pr` | Claude สรุปการเปลี่ยนแปลงทั้งหมด, เขียน Title/Description, Push แล้วสร้าง PR ให้ — ได้ PR ที่อธิบายงานชัดเจน |
| **ต้องการให้ AI รีวิวโค้ดก่อน** | `/review` | Claude อ่านโค้ดที่เปลี่ยนแปลง ตรวจหา Bug, Security Issue, Code Smell แล้วให้คำแนะนำ |
| **โค้ดซับซ้อน ต้องวางแผนก่อน** | `/plan` | Claude วิเคราะห์โจทย์ เสนอแผนทีละขั้นตอนก่อนลงมือทำ ลดความเสี่ยงแก้ผิดทาง |
| **ปัญหายากมาก ต้องคิดลึก** | `/think` | Claude ใช้ Extended Thinking คิดวิเคราะห์อย่างละเอียดก่อนตอบ เหมาะกับ Bug ที่ซับซ้อน |
| **บทสนทนายาวมาก Context ใกล้เต็ม** | `/compact` | สรุปบทสนทนาให้สั้นลง เปิดพื้นที่ให้ทำงานต่อได้ |
| **อยากถามนอกเรื่องเร็ว ๆ** | `/btw ชื่อ Config File คืออะไร?` | ถามคำถามเล็ก ๆ โดยไม่ให้ Claude ใช้เครื่องมือ ไม่เปลือง Context |
| **ต้องการตรวจสอบระบบซ้ำ ๆ** | `/loop 5m "ตรวจ Error Log"` | Claude ทำงานซ้ำทุก 5 นาที เหมาะกับงาน Monitor |
| **แก้ไฟล์เยอะมาก อยากทำพร้อมกัน** | `/batch` | Claude แบ่งงานเป็นชิ้น ๆ รันแบบ Parallel เร็วกว่าทำทีละไฟล์มาก |
| **เข้าโปรเจกต์ใหม่ ไม่มี CLAUDE.md** | `/init` | Claude วิเคราะห์โปรเจกต์แล้วสร้าง CLAUDE.md ที่มีคำสั่ง Build, Naming Convention, Architecture |

กด `/` ในเซสชันเพื่อดูคำสั่งทั้งหมด

### การจัดการเซสชัน

| คำสั่ง | อธิบาย |
|-------|--------|
| `/help` | แสดงวิธีใช้งาน |
| `/clear` | เริ่มเซสชันใหม่ (ล้าง Context) |
| `/compact` | สรุปบทสนทนาเพื่อประหยัด Context |
| `/memory` | ดูและแก้ไข CLAUDE.md และ Auto Memory |
| `/config` | เปิดหน้าตั้งค่า |
| `/doctor` | วินิจฉัยปัญหาเบื้องต้น |
| `/keybindings` | ตั้งค่าคีย์ลัด |
| `/rename` | เปลี่ยนชื่อเซสชัน |
| `/resume` | เลือกเซสชันเก่ามาต่อ |

### โค้ดและ Git

| คำสั่ง | อธิบาย |
|-------|--------|
| `/commit` | Stage และ Commit การเปลี่ยนแปลง |
| `/pr` | สร้าง Pull Request |
| `/review` | รีวิวโค้ด |
| `/simplify` | ตรวจสอบโค้ดที่เปลี่ยนแปลงเพื่อปรับปรุงคุณภาพ |
| `/init` | สร้าง CLAUDE.md จากการวิเคราะห์โปรเจกต์ |

### เวิร์คโฟลว์และการควบคุม

| คำสั่ง | อธิบาย |
|-------|--------|
| `/plan` | เข้าสู่โหมดวางแผน |
| `/think` | เปิด Extended Thinking (คิดลึกขึ้น) |
| `/debug` | เปิด Debug Logging |
| `/btw` | ถามคำถามข้างเคียงโดยไม่กระทบ Context |
| `/loop 5m "คำสั่ง"` | ทำซ้ำคำสั่งทุก ๆ เวลาที่กำหนด |
| `/batch` | ทำงานขนาดใหญ่แบบ Parallel |
| `/schedule` | สร้างงานตั้งเวลา |

### ส่วนขยายและการตั้งค่า

| คำสั่ง | อธิบาย |
|-------|--------|
| `/agents` | ดูและตั้งค่า Subagents |
| `/mcp` | ตั้งค่า MCP Servers |
| `/permissions` | ดูและจัดการสิทธิ์เครื่องมือ |
| `/plugins` | เรียกดูและจัดการ Plugins |
| `/claude-api` | ช่วยสร้างแอปด้วย Claude API |

---

## 4. คีย์ลัด (Keyboard Shortcuts)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้คีย์ลัด?**
>
> คีย์ลัดช่วยให้คุณ **ควบคุม Claude Code ได้อย่างรวดเร็วโดยไม่ต้องยกมือจากคีย์บอร์ด** ลดเวลาในการสลับโหมด, ยกเลิกการทำงาน, หรือเปิดฟีเจอร์ต่าง ๆ

**Use Cases:**

| สถานการณ์ | คีย์ลัด | คำอธิบาย |
|----------|---------|----------|
| **Claude กำลังเขียนโค้ดผิดทาง** | `Ctrl+C` | หยุดทันที ไม่ต้องรอให้เสร็จ ประหยัดเวลาและค่าใช้จ่าย |
| **อยากดูว่า Claude ใช้เครื่องมืออะไร** | `Ctrl+O` | เปิด Transcript Viewer เห็นทุก Tool Call, ทุกไฟล์ที่อ่าน/แก้ไข |
| **Claude รัน Test นาน อยากทำอย่างอื่นก่อน** | `Ctrl+B` | ย้ายงานไป Background กลับมาพิมพ์คำสั่งใหม่ได้เลย |
| **อยากเปลี่ยนจากโหมดปลอดภัยเป็น Auto** | `Shift+Tab` | สลับโหมด Permission ได้ทันที ไม่ต้องไปตั้งค่า |
| **Claude แก้โค้ดผิด อยากย้อนกลับ** | `Esc + Esc` | เปิด Rewind Menu ย้อนกลับทั้งโค้ดและบทสนทนา |
| **อยากเปลี่ยนโมเดลกลางทาง** | `Cmd+P` / `Meta+P` | เปิด Model Picker เปลี่ยนจาก Opus → Sonnet หรือกลับกัน |
| **ปัญหายาก ต้องเปิด Deep Thinking** | `Cmd+T` / `Meta+T` | เปิด Extended Thinking ให้ Claude คิดวิเคราะห์ลึกขึ้น |
| **อยากตอบเร็ว ๆ ไม่ต้องละเอียดมาก** | `Meta+O` / `Alt+O` | เปิด Fast Mode ได้คำตอบเร็วขึ้น |
| **ต้องการวาง Screenshot ให้ Claude ดู** | `Ctrl+V` / `Cmd+V` | วางรูปภาพจาก Clipboard ให้ Claude วิเคราะห์ UI, Error Screen ฯลฯ |
| **อยากพิมพ์ Prompt หลายบรรทัด** | `\ + Enter` หรือ `Shift+Enter` | ขึ้นบรรทัดใหม่แทนการส่งข้อความ เขียนคำสั่งยาว ๆ ได้สะดวก |

### การควบคุมทั่วไป

| คีย์ลัด | การทำงาน |
|---------|---------|
| `Ctrl+C` | ยกเลิก Input/Generation ปัจจุบัน |
| `Ctrl+D` | ออกจาก Claude Code |
| `Ctrl+L` | ล้างช่อง Input |
| `Ctrl+O` | เปิด/ปิด Transcript Viewer (ดูรายละเอียดเครื่องมือ) |
| `Ctrl+R` | ค้นหาคำสั่งย้อนหลัง |
| `Ctrl+V` / `Cmd+V` | วางรูปภาพจาก Clipboard |
| `Ctrl+B` | ย้ายงานปัจจุบันไป Background |
| `Ctrl+T` | เปิด/ปิด Task List |
| `Ctrl+X Ctrl+K` | หยุด Background Agents ทั้งหมด |
| `Shift+Tab` / `Alt+M` | สลับโหมด Permission |
| `Esc + Esc` | เปิดเมนู Rewind/Checkpoint |

### การแก้ไขข้อความ

| คีย์ลัด | การทำงาน |
|---------|---------|
| `Ctrl+K` | ลบข้อความจากเคอร์เซอร์ถึงท้ายบรรทัด |
| `Ctrl+U` | ลบข้อความจากเคอร์เซอร์ถึงต้นบรรทัด |
| `Ctrl+Y` | วางข้อความที่เพิ่งลบ |
| `Alt+B` | เลื่อนเคอร์เซอร์กลับไปหนึ่งคำ |
| `Alt+F` | เลื่อนเคอร์เซอร์ไปข้างหน้าหนึ่งคำ |

### การสลับโมเดลและโหมด

| คีย์ลัด | การทำงาน |
|---------|---------|
| `Cmd+P` / `Meta+P` | เปิดตัวเลือกโมเดล |
| `Cmd+T` / `Meta+T` | เปิด/ปิด Extended Thinking |
| `Meta+O` / `Alt+O` | เปิด/ปิด Fast Mode |

### การพิมพ์หลายบรรทัด

| วิธี | คีย์ลัด |
|-----|---------|
| Quick escape | `\ + Enter` |
| macOS | `Option+Enter` |
| iTerm2/WezTerm/Ghostty/Kitty | `Shift+Enter` |
| Readline | `Ctrl+J` |

### Input พิเศษ

| คีย์/สัญลักษณ์ | การทำงาน |
|---------------|---------|
| `Space` (กดค้าง) | Push-to-talk พูดแทนพิมพ์ |
| `@` | ค้นหาไฟล์อัตโนมัติ |
| `/` (ต้นบรรทัด) | แสดงคำสั่ง/Skills |
| `!` (ต้นบรรทัด) | เข้าสู่ Bash Mode |
| `Up/Down` | เลื่อนดูประวัติคำสั่ง |

### Vim Mode (เปิดได้ผ่าน `/config`)

**สลับโหมด:** `Esc` (ไป NORMAL), `i/I/a/A/o/O` (ไป INSERT)

**เลื่อน:** `h/j/k/l` (ลูกศร), `w/e/b` (คำ), `0/$` (ต้น/ท้ายบรรทัด), `gg/G` (ต้น/ท้ายเอกสาร)

**แก้ไข:** `x` (ลบตัวอักษร), `dd/D` (ลบบรรทัด), `yy` (คัดลอก), `p/P` (วาง), `>>/<<` (ย่อหน้า)

---

## 5. ระบบ Permission (สิทธิ์การเข้าถึง)

### ประโยชน์และ Use Cases

> **ทำไมต้องมี Permission?**
>
> Claude Code สามารถรันคำสั่ง Shell, แก้ไขไฟล์, ลบข้อมูล — ระบบ Permission ป้องกันไม่ให้ Claude ทำสิ่งที่คุณ **ไม่ได้ตั้งใจให้ทำ** คุณเลือกระดับความอิสระได้ตั้งแต่ "ถามทุกอย่าง" ไปจนถึง "ทำได้เลยทุกอย่าง"

**Use Cases ตามบทบาท:**

| บทบาท/สถานการณ์ | โหมดที่แนะนำ | เหตุผล |
|----------------|------------|--------|
| **นักพัฒนามือใหม่** | `default` | ถามทุกอย่างก่อนทำ ได้เรียนรู้ว่า Claude ทำอะไร |
| **เขียนโค้ดทั่วไป** | `acceptEdits` | อ่าน/แก้ไขไฟล์ได้เลย ถามเฉพาะคำสั่ง Shell ที่อาจเสี่ยง ทำงานได้ลื่นโดยไม่ต้องกด Approve ทุกขั้นตอน |
| **สำรวจโปรเจกต์ก่อนแก้ไข** | `plan` | Claude อ่านได้อย่างเดียว เสนอแผนแต่ไม่แก้ไขจริง เหมาะกับการทำความเข้าใจ Codebase ก่อนลงมือ |
| **งานระยะยาว ปล่อยให้ทำเอง** | `auto` | Claude ตัดสินใจเอง มี Safety Check อัตโนมัติ เหมาะเวลาให้ Claude ทำงานใหญ่ ๆ แล้วกลับมาดูผลทีหลัง |
| **CI/CD Pipeline** | `dontAsk` | ล็อกเฉพาะเครื่องมือที่อนุมัติ ไม่มี Prompt ระหว่างทาง รันได้โดยไม่ต้องมีคนกดอนุญาต |
| **Container/VM ที่ปลอดภัย** | `bypassPermissions` | ทำได้ทุกอย่าง ใช้เฉพาะสภาพแวดล้อมที่แยกจาก Production |
| **ทำงานกับข้อมูลลูกค้า** | `default` + `deny` rules | บล็อกคำสั่งอันตราย เช่น `rm -rf`, `curl` ป้องกันข้อมูลรั่วไหล |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: คุณกำลังแก้ Bug ใน Production Code
แนะนำ: เริ่มด้วย "plan" เพื่อวิเคราะห์ → สลับเป็น "acceptEdits" เมื่อพร้อมแก้ไข
วิธี: กด Shift+Tab เพื่อสลับโหมดได้ทันที

สถานการณ์: ให้ Claude รีแฟคเตอร์โค้ด 50 ไฟล์
แนะนำ: ใช้ "auto" mode เพราะต้องแก้ไฟล์เยอะ ถ้าใช้ default จะต้องกด Approve หลายร้อยครั้ง
วิธี: claude --permission-mode auto

สถานการณ์: รัน Claude ใน GitHub Actions
แนะนำ: ใช้ "dontAsk" + allowedTools เพื่อล็อกเฉพาะคำสั่งที่ปลอดภัย
วิธี: claude --permission-mode dontAsk --allowedTools "Read,Bash(npm test)"
```

### โหมด Permission

| โหมด | สิ่งที่รันได้โดยไม่ต้องถาม | เหมาะสำหรับ |
|------|--------------------------|------------|
| `default` | อ่านไฟล์เท่านั้น | เริ่มต้นใช้งาน, งานที่ต้องระวัง |
| `acceptEdits` | อ่าน + แก้ไขไฟล์ + คำสั่ง FS ทั่วไป | เขียนโค้ดทั่วไป |
| `plan` | อ่านเท่านั้น (โหมดวางแผน) | สำรวจก่อนลงมือทำ |
| `auto` | ทุกอย่าง + ตรวจสอบความปลอดภัยอัตโนมัติ | งานระยะยาว (ทดลอง) |
| `dontAsk` | เฉพาะเครื่องมือที่อนุมัติล่วงหน้า | CI/CD ที่ล็อกสิทธิ์ |
| `bypassPermissions` | ทุกอย่างยกเว้น Protected Paths | ใช้ใน Container/VM เท่านั้น |

### วิธีสลับโหมด

- กด `Shift+Tab` ใน Interactive Mode
- ใช้ Flag `--permission-mode <mode>`
- ตั้งค่าใน `settings.json`

### กฎ Permission

**จับคู่เครื่องมือทั้งหมด:**
```
Bash             # Bash ทุกคำสั่ง
Read             # อ่านไฟล์ทุกอัน
Edit             # แก้ไฟล์ทุกอัน
```

**ระบุเงื่อนไขเพิ่ม:**
```
Bash(npm run build)              # คำสั่งเฉพาะ
Bash(npm run *)                  # Wildcard
Read(./.env)                     # ไฟล์เฉพาะ
Read(src/**)                     # ทุกไฟล์ในไดเรกทอรี
WebFetch(domain:github.com)      # เฉพาะโดเมน
Agent(Explore)                   # Subagent เฉพาะ
Skill(commit)                    # Skill เฉพาะ
```

### ลำดับความสำคัญของกฎ

1. **Deny** (สูงสุด) - บล็อกเสมอ
2. **Ask** - ถามก่อนทำ
3. **Allow** (ต่ำสุด) - อนุญาตเสมอ

### ตั้งค่าใน settings.json

```json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": ["Bash(npm run *)", "Bash(git *)"],
    "deny": ["Bash(rm -rf *)"],
    "ask": ["Bash"]
  }
}
```

### Protected Paths (ไฟล์/โฟลเดอร์ที่ป้องกันเสมอ)

- `.git/`
- `.claude/` (ยกเว้น commands, agents, skills, worktrees)
- `.vscode/`, `.idea/`, `.husky/`
- `.gitconfig`, `.bashrc`, ไฟล์ Shell Config

---

## 6. การตั้งค่า (Configuration)

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
| **ต้องการใช้ Opus สำหรับโปรเจกต์สำคัญ** | `model: "claude-opus-4-6"` | ล็อกโมเดลเฉพาะโปรเจกต์ |

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
  "model": "claude-opus-4-6",
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

---

## 7. CLAUDE.md - คำสั่งถาวรสำหรับโปรเจกต์

### ประโยชน์และ Use Cases

> **ทำไมต้องมี CLAUDE.md?**
>
> CLAUDE.md คือ **"สมอง" ของ Claude สำหรับโปรเจกต์ของคุณ** — ทุกครั้งที่เปิดเซสชัน Claude จะอ่านไฟล์นี้ก่อน ทำให้ Claude **รู้จักโปรเจกต์ตั้งแต่วินาทีแรก** ไม่ต้องอธิบายซ้ำทุกครั้ง

**Use Cases:**

| สถานการณ์ | สิ่งที่ใส่ใน CLAUDE.md | ผลลัพธ์ |
|----------|---------------------|--------|
| **ทีมใช้ Naming Convention เฉพาะ** | `Components: PascalCase, Utils: camelCase` | Claude ตั้งชื่อตัวแปร/ไฟล์ตาม Convention ของทีมโดยอัตโนมัติ ไม่ต้องบอกซ้ำ |
| **โปรเจกต์มีคำสั่ง Build ซับซ้อน** | `Build: npm run build:prod`, `Test: npm run test:ci` | Claude รันคำสั่งที่ถูกต้องทุกครั้ง ไม่สับสนระหว่าง dev/prod |
| **สถาปัตยกรรมเฉพาะทาง** | `ใช้ Repository Pattern, API อยู่ใน src/api/` | Claude เขียนโค้ดตามสถาปัตยกรรมที่กำหนด ไม่เขียนแบบตามใจตัวเอง |
| **กฎความปลอดภัย** | `ห้ามใช้ eval(), ต้อง Sanitize Input ทุกครั้ง` | Claude หลีกเลี่ยงโค้ดที่มีช่องโหว่ Security โดยอัตโนมัติ |
| **Dev Environment Setup** | `ต้องรัน docker-compose up ก่อน Test` | Claude รู้ขั้นตอนเตรียมสภาพแวดล้อมก่อนรัน Test |
| **สมาชิกใหม่เข้าทีม** | CLAUDE.md ครบถ้วน | สมาชิกใหม่ให้ Claude อธิบายโปรเจกต์ได้ทันที ลดเวลา Onboarding อย่างมาก |
| **โปรเจกต์มีหลาย Module** | ใช้ `.claude/rules/` แยกกฎเป็นไฟล์ | กฎของ API ไม่ปนกับ Frontend ลด Context Usage |

**ตัวอย่างสถานการณ์จริง:**

```
ก่อนมี CLAUDE.md:
  คุณ: "แก้ Bug ฟังก์ชัน login"
  Claude: "คุณใช้ framework อะไร? Build ยังไง? Test ยังไง?"
  → ต้องอธิบายทุกครั้ง เสียเวลามาก

หลังมี CLAUDE.md:
  คุณ: "แก้ Bug ฟังก์ชัน login"
  Claude: (อ่าน CLAUDE.md → รู้จัก framework, build cmd, test cmd)
  → ลงมือแก้ได้ทันที
```

### CLAUDE.md คืออะไร?

ไฟล์ Markdown ที่ให้คำสั่งและบริบทแก่ Claude ทุกเซสชัน เปรียบเสมือน "คู่มือโปรเจกต์" ที่ Claude อ่านทุกครั้งที่เริ่มทำงาน

### ตำแหน่งที่โหลด (จากสูงไปต่ำ)

| ตำแหน่ง | ขอบเขต |
|---------|--------|
| `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) | Managed (IT deploy) |
| `./CLAUDE.md` หรือ `./.claude/CLAUDE.md` | โปรเจกต์ (commit ร่วมกับทีม) |
| `~/.claude/CLAUDE.md` | ส่วนตัวทุกโปรเจกต์ |
| `./CLAUDE.local.md` | ส่วนตัวเฉพาะโปรเจกต์ (gitignored) |

### ตัวอย่าง CLAUDE.md

```markdown
# Project Setup

## คำสั่ง Build
- Build: `npm run build`
- Test: `npm test`
- Dev server: `npm run dev`
- Lint: `npm run lint`

## Naming Conventions
- React Components: PascalCase ใน `src/components/`
- Utilities: camelCase ใน `src/utils/`
- Types: PascalCase ใน `src/types/`
- ไฟล์ CSS: kebab-case

## Code Style
- ใช้ 2-space indentation
- ต้องมี TypeScript types เสมอ
- ใส่ JSDoc สำหรับ Public Functions

## Architecture
- ใช้ Repository Pattern สำหรับ Database Layer
- API Routes อยู่ใน `src/api/`
- Middleware อยู่ใน `src/middleware/`

## Testing
- เขียน Test ก่อนแก้ Bug เสมอ
- Coverage ขั้นต่ำ 80%
- ใช้ vitest สำหรับ Unit Tests
```

### Import ไฟล์เพิ่มเติม

```markdown
# ดู @README สำหรับ Overview
# Workflow: @docs/workflow.md
# API Patterns: @src/api/patterns.md
```

### .claude/rules/ - คำสั่งแยกตามหัวข้อ

สร้างไฟล์คำสั่งแยกเป็นหัวข้อย่อย:

```
.claude/rules/
├── testing.md        # กฎเกี่ยวกับการเทสต์
├── api-design.md     # กฎเกี่ยวกับ API
├── security.md       # กฎเกี่ยวกับความปลอดภัย
└── frontend/
    └── components.md # กฎเกี่ยวกับ Frontend Components
```

**กฎที่ใช้เฉพาะไฟล์บางประเภท (Path-scoped):**

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# กฎการพัฒนา API

- ต้องมี Input Validation เสมอ
- ใช้ Standard Error Response Format
- ทุก Endpoint ต้องมี Rate Limiting
```

### สร้าง CLAUDE.md อัตโนมัติ

```bash
# ใช้คำสั่ง /init ให้ Claude วิเคราะห์โปรเจกต์แล้วสร้างให้
/init
```

---

## 8. ระบบ Memory (ความจำ)

### ประโยชน์และ Use Cases

> **ทำไมต้องมี Memory?**
>
> Memory ทำให้ Claude **จดจำข้อมูลข้ามเซสชัน** — สิ่งที่คุณบอกไว้เมื่อวานนี้ Claude ยังจำได้ในวันนี้ ไม่ต้องบอกซ้ำว่าคุณเป็นใคร ทำอะไร ชอบแบบไหน

**Use Cases:**

| สถานการณ์ | ประเภท Memory | ตัวอย่าง |
|----------|--------------|---------|
| **คุณเป็น Data Scientist ไม่ชำนาญ Frontend** | `user` | Claude จะอธิบายโค้ด Frontend เป็นภาษาง่าย ๆ เทียบกับแนวคิดที่คุณคุ้นเคย |
| **คุณบอกว่า "อย่าใช้ any ใน TypeScript"** | `feedback` | Claude จะไม่ใช้ `any` อีกเลย แม้ในเซสชันใหม่ ไม่ต้องบอกซ้ำ |
| **โปรเจกต์กำลัง Freeze Code วันศุกร์** | `project` | Claude จะเตือนถ้าคุณพยายาม Merge หลังวันที่กำหนด |
| **Bug Tracker อยู่ใน Linear โปรเจกต์ "INGEST"** | `reference` | เวลาถามเรื่อง Bug Claude จะแนะนำให้ดูใน Linear |
| **คุณชอบให้ตอบสั้น ๆ ไม่ต้องสรุปท้าย** | `feedback` | Claude ปรับสไตล์การตอบให้ตรงใจคุณ |
| **ทีมตกลงใช้ Zod แทน Joi** | `project` | Claude จะใช้ Zod สำหรับ Validation เสมอ |
| **API Docs อยู่ที่ Confluence หน้า X** | `reference` | Claude จะแนะนำให้ดูเอกสารที่ถูกต้อง |

**ตัวอย่างสถานการณ์จริง:**

```
เซสชันที่ 1 (วันจันทร์):
  คุณ: "ผมเป็น Backend Developer ใช้ Go เป็นหลัก พึ่งเริ่มเขียน React"
  Claude: (บันทึก Memory: user เป็น Backend Dev, ชำนาญ Go, ใหม่กับ React)

เซสชันที่ 2 (วันพุธ):
  คุณ: "อธิบาย useEffect ให้หน่อย"
  Claude: "useEffect คล้ายกับ defer ใน Go ตรงที่มันรันหลังจาก function หลักเสร็จ
          แต่ต่างกันตรงที่มัน re-run เมื่อ dependencies เปลี่ยน
          คิดเหมือน goroutine ที่ trigger ซ้ำเมื่อ channel ได้ข้อมูลใหม่"
  → Claude อธิบายเทียบกับ Go เพราะจำได้ว่าคุณชำนาญ Go
```

### Auto Memory คืออะไร?

ระบบที่ Claude จดจำข้อมูลสำคัญระหว่างเซสชัน เก็บไว้ใน:

```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # ไฟล์ดัชนี (Index)
├── user_role.md       # ข้อมูลผู้ใช้
├── feedback_style.md  # Feedback จากผู้ใช้
└── project_goals.md   # เป้าหมายโปรเจกต์
```

### ประเภทของ Memory

| ประเภท | อธิบาย | ตัวอย่าง |
|--------|--------|---------|
| `user` | ข้อมูลเกี่ยวกับผู้ใช้ | บทบาท, ความรู้, สิ่งที่ชอบ |
| `feedback` | คำแนะนำจากผู้ใช้ | "อย่าสรุปท้ายคำตอบ", "ใช้ภาษาไทย" |
| `project` | ข้อมูลโปรเจกต์ที่กำลังทำ | เดดไลน์, Bug ที่กำลังแก้ |
| `reference` | แหล่งข้อมูลภายนอก | ลิงก์ Linear, Slack Channel |

### รูปแบบไฟล์ Memory

```markdown
---
name: user_prefers_thai
description: ผู้ใช้ต้องการให้ตอบเป็นภาษาไทย
type: feedback
---

ตอบเป็นภาษาไทยเสมอ

**Why:** ผู้ใช้บอกว่าทำงานสะดวกกว่า
**How to apply:** ใช้ภาษาไทยในทุกคำตอบ ยกเว้นโค้ดและคำสั่งเทคนิค
```

### คำสั่งจัดการ Memory

| คำสั่ง | อธิบาย |
|-------|--------|
| `/memory` | ดูและแก้ไข CLAUDE.md และ Memory |
| "จำไว้ว่า..." | บอก Claude ให้จดจำข้อมูล |
| "ลืม..." | บอก Claude ให้ลบ Memory |

### เปิด/ปิด Auto Memory

```json
// ใน settings.json
{
  "autoMemoryEnabled": true
}
```

หรือใช้ `/memory` เพื่อเปิด/ปิด

---

## 9. MCP Servers (Model Context Protocol)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ MCP?**
>
> MCP ทำให้ Claude Code **เชื่อมต่อกับเครื่องมือภายนอกได้** — ไม่ใช่แค่อ่าน/เขียนไฟล์ในโปรเจกต์ แต่ยังสามารถเข้าถึง Database, ส่งข้อความ Slack, อ่านเอกสารจาก Google Drive, ควบคุม Browser ได้อีกด้วย

**Use Cases:**

| MCP Server | Use Case | ตัวอย่างการใช้งานจริง |
|-----------|----------|-------------------|
| **Puppeteer** | ทดสอบ UI อัตโนมัติ | "เปิดหน้า Login, กรอก Email/Password, กดปุ่ม Submit แล้วถ่าย Screenshot" — Claude ทำทั้งหมดนี้ให้ผ่าน Browser จริง |
| **Slack** | แจ้งเตือนทีม | "ส่งข้อความไป #dev-channel ว่า Deploy เสร็จแล้ว" — Claude ส่ง Slack ให้ทันที |
| **GitHub** | จัดการ PR/Issues | "ดู Issues ที่ยังเปิดอยู่ในโปรเจกต์ X แล้วสรุปให้" — Claude อ่าน Issues จาก GitHub ตรง ๆ |
| **Google Drive** | อ่านเอกสาร Spec | "อ่าน Google Doc เรื่อง API Spec แล้วสร้าง Endpoint ตามนั้น" — Claude อ่านเอกสารแล้วเขียนโค้ดให้ |
| **Linear/Jira** | จัดการ Tasks | "สร้าง Ticket ใน Linear สำหรับ Bug ที่เพิ่งเจอ" — Claude สร้าง Ticket พร้อมรายละเอียดให้ |
| **Notion** | อ่าน/เขียนเอกสาร | "อัปเดต Meeting Notes ใน Notion ด้วยสรุปจาก Code Review" — Claude เขียนลง Notion ให้ |
| **Database MCP** | Query ข้อมูลจริง | "ดูว่ามี User กี่คนที่ลงทะเบียนวันนี้" — Claude Query Database แล้วตอบ |
| **Custom MCP** | เชื่อมต่อ Internal Tools | สร้าง MCP Server เอง เชื่อมต่อกับระบบภายในองค์กร |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: ทีมรายงาน Bug ว่าปุ่ม Submit ไม่ทำงานบนหน้า Login

ก่อนมี MCP:
  1. เปิด Browser เอง
  2. ไปหน้า Login
  3. ทดสอบเอง
  4. ถ่าย Screenshot
  5. กลับมาบอก Claude

หลังมี Puppeteer MCP:
  คุณ: "ลองเปิดหน้า Login แล้วทดสอบปุ่ม Submit ให้หน่อย"
  Claude: (เปิด Browser → กรอกฟอร์ม → กดปุ่ม → ถ่าย Screenshot → วิเคราะห์ Error)
  Claude: "เจอปัญหาแล้ว ปุ่ม Submit มี event handler ที่ throw Error เพราะ..."
  → Claude ทำทั้งหมดเองโดยไม่ต้องออกจาก Terminal
```

### MCP คืออะไร?

โปรโตคอลที่เชื่อมต่อ Claude Code กับเครื่องมือและแหล่งข้อมูลภายนอก เช่น ฐานข้อมูล, API, Cloud Services

### MCP Servers ที่มีให้ใช้

- **Google Drive** - เข้าถึงเอกสาร
- **Slack** - อ่าน/เขียนข้อความ
- **GitHub** - เข้าถึง Repos, PRs, Issues
- **Linear** - Project Management
- **Jira** - Issue Tracking
- **Notion** - Notes และ Databases
- **Puppeteer** - ควบคุม Browser
- และอื่น ๆ อีกมากมาย

### วิธีตั้งค่า MCP Server

**ใน settings.json:**
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
```

**ใน .mcp.json (ระดับโปรเจกต์):**
```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"]
    }
  }
}
```

**ผ่าน CLI:**
```bash
claude mcp add <server-name>
```

**ผ่าน CLI Flag:**
```bash
claude --mcp-config ./mcp.json
```

### การใช้งาน MCP ในเซสชัน

- เครื่องมือ MCP จะปรากฏเป็นคำสั่งที่ใช้ได้
- ใช้รูปแบบ `mcp__<server>__<tool>` ในการเรียก
- ใช้ `/mcp` เพื่อดูสถานะ Server
- สิทธิ์ MCP ตั้งค่าได้ใน `permissions.allow/deny`

### ตัวอย่าง: ตั้งค่า Puppeteer MCP

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/puppeteer-mcp"],
      "env": {
        "HEADLESS": "true"
      }
    }
  }
}
```

ใช้งาน: Claude สามารถเปิดเว็บ, ถ่ายสกรีนช็อต, คลิกปุ่ม ฯลฯ ได้

---

## 10. Hooks (ระบบ Event Handler)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Hooks?**
>
> Hooks ทำให้คุณ **สร้างกระบวนการทำงานอัตโนมัติ** ที่รันทุกครั้งเมื่อ Claude ทำบางอย่าง — ไม่ต้องบอกซ้ำว่า "รัน Lint หลังแก้ไฟล์ด้วยนะ" เพราะ Hook จะทำให้อัตโนมัติ

**Use Cases:**

| Hook | Use Case | ตัวอย่างจริง |
|------|----------|------------|
| **PostEdit** + Prettier | Auto-format หลังแก้ไฟล์ | ทุกครั้งที่ Claude แก้ไฟล์ `.ts` → Prettier จะ Format ให้อัตโนมัติ ไม่ต้องรัน Format เอง โค้ดสวยเสมอ |
| **PostEdit** + ESLint | Auto-lint หลังแก้ไฟล์ | ทุกครั้งที่ Claude แก้ไฟล์ → ESLint ตรวจสอบ ถ้ามี Error Claude เห็นทันทีและแก้ไขเอง |
| **PostWrite** + Test Runner | Auto-test หลังสร้างไฟล์ | ทุกครั้งที่ Claude สร้างไฟล์ใหม่ → Test รันอัตโนมัติ ถ้า Test Fail Claude แก้ไขทันที |
| **PreCommit** + Lint | ตรวจสอบก่อน Commit | ป้องกันไม่ให้ Commit โค้ดที่มี Lint Error เข้า Git |
| **PostCommit** + Slack | แจ้งเตือนหลัง Commit | ส่ง Notification ไป Slack ทุกครั้งที่ Claude Commit |
| **Init** + Setup | ตั้งค่าเมื่อเริ่มเซสชัน | รัน `docker-compose up`, ตรวจสอบ Dependencies, ตั้งค่า Environment |
| **PreToolUse** + Custom Logic | ตรวจสอบสิทธิ์เอง | ป้องกันไม่ให้ Claude เข้าถึงไฟล์บางประเภท หรือรันคำสั่งบางอย่าง |
| **TaskCompleted** + Verify | ตรวจสอบผลงาน | เมื่อ Claude ทำ Task เสร็จ → รัน Test Suite อัตโนมัติ ยืนยันว่าไม่พังอะไร |

**ตัวอย่างสถานการณ์จริง:**

```
ก่อนมี Hooks:
  Claude แก้ไฟล์ → โค้ดไม่ Format → คุณต้องบอก "รัน Prettier ด้วย"
  Claude แก้อีกไฟล์ → ลืม Format อีก → บอกอีกรอบ
  → เสียเวลาบอกซ้ำ ๆ

หลังมี PostEdit Hook:
  Claude แก้ไฟล์ → Prettier รันอัตโนมัติ → Format เรียบร้อย
  Claude แก้อีกไฟล์ → Prettier รันอัตโนมัติ → Format เรียบร้อย
  → ไม่ต้องบอกเลย ทุกไฟล์ Format สวยอัตโนมัติ
```

### Hooks คืออะไร?

Event Handler ที่รันคำสั่ง Shell อัตโนมัติเมื่อเกิดเหตุการณ์ต่าง ๆ ใน Claude Code

### รายการ Hooks ที่มี

| Hook | เมื่อไหร่ | ใช้สำหรับ |
|------|---------|----------|
| `Init` | เซสชันเริ่ม | Setup เริ่มต้น |
| `Maintenance` | โหมดบำรุงรักษา | ล้างไฟล์ชั่วคราว |
| `PreToolUse` | ก่อนใช้เครื่องมือ | ตรวจสอบสิทธิ์เอง |
| `PostToolUse` | หลังใช้เครื่องมือ | Auto-format, Validate |
| `PostWrite` | หลังเขียนไฟล์ | Lint, Format |
| `PostEdit` | หลังแก้ไฟล์ | Auto-test |
| `PreCommit` | ก่อน Git Commit | Pre-commit Check |
| `PostCommit` | หลัง Git Commit | แจ้งเตือน |
| `PermissionRequest` | เมื่อขออนุญาต | อนุมัติเอง |
| `PermissionDenied` | เมื่อถูกปฏิเสธ | Log |
| `TaskCreated` | สร้าง Task | ตรวจสอบ Task |
| `TaskCompleted` | Task เสร็จ | Verify ผลลัพธ์ |
| `TeammateIdle` | Teammate ว่าง | Quality Gates |

### ตั้งค่า Hooks

**ใน `.claude/settings.json`:**

```json
{
  "hooks": {
    "PostWrite": [
      {
        "matcher": "Edit(src/**/*.ts)",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $FILE"
          }
        ]
      }
    ],
    "PostEdit": [
      {
        "matcher": "Edit(src/**/*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "black $FILE"
          }
        ]
      }
    ],
    "PreCommit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint"
          }
        ]
      }
    ]
  }
}
```

### ตัวอย่าง: Auto-format TypeScript หลังแก้ไข

```json
{
  "hooks": {
    "PostEdit": [
      {
        "matcher": "Edit(src/**/*.{ts,tsx})",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $FILE && npx eslint --fix $FILE"
          }
        ]
      }
    ]
  }
}
```

---

## 11. Skills (คำสั่งที่สร้างเอง)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Skills?**
>
> Skills ทำให้คุณ **สอน Claude ให้ทำงานซ้ำ ๆ ได้อย่างสม่ำเสมอ** — แทนที่จะพิมพ์คำสั่งยาว ๆ ทุกครั้ง คุณสร้าง Skill ครั้งเดียว แล้วเรียกด้วย `/ชื่อ-skill` ได้ตลอดไป

**Use Cases:**

| Skill | สถานการณ์ | ผลลัพธ์ |
|-------|----------|--------|
| **`/deploy`** | Deploy แอปทุกสัปดาห์ | พิมพ์ `/deploy staging` → Claude รัน Test, Build, Deploy, Health Check ให้ครบวงจร ไม่ลืมขั้นตอนใด |
| **`/new-component`** | สร้าง React Component บ่อย ๆ | พิมพ์ `/new-component UserCard` → Claude สร้างไฟล์ Component, Style, Test, Story ตาม Template ของทีม |
| **`/db-migrate`** | สร้าง Database Migration | พิมพ์ `/db-migrate add_email_to_users` → Claude สร้าง Migration File, เขียน Up/Down, รัน Migration |
| **`/hotfix`** | แก้ Bug ด่วนบน Production | พิมพ์ `/hotfix` → Claude สร้าง Branch จาก main, แก้ Bug, รัน Test, สร้าง PR อัตโนมัติ |
| **`/api-endpoint`** | สร้าง API Endpoint ใหม่ | พิมพ์ `/api-endpoint GET /users/:id` → Claude สร้าง Route, Controller, Service, Validator, Test ครบ |
| **`/changelog`** | สร้าง Release Notes | พิมพ์ `/changelog v2.1.0` → Claude อ่าน Git Log แล้วสร้าง Changelog ที่จัดหมวดหมู่สวยงาม |
| **`/status`** | ดูสถานะโปรเจกต์เร็ว ๆ** | พิมพ์ `/status` → เห็น Branch, Commit ล่าสุด, จำนวนไฟล์ที่เปลี่ยน, สถานะ CI |
| **`/translate`** | แปลภาษาในโปรเจกต์ i18n | พิมพ์ `/translate th` → Claude แปลไฟล์ภาษาทั้งหมดเป็นภาษาไทย |

**ตัวอย่างสถานการณ์จริง:**

```
ก่อนมี Skill "/deploy":
  1. npm run test           ← ต้องรันเอง
  2. npm run build:prod     ← ต้องจำคำสั่ง
  3. aws s3 sync ...        ← ต้องจำ Bucket
  4. aws cloudfront ...     ← ต้องจำ Distribution ID
  5. curl health-check      ← ต้องจำ URL
  → 5 ขั้นตอน ใช้เวลา 15 นาที ผิดพลาดได้ง่าย

หลังมี Skill "/deploy":
  1. พิมพ์ /deploy production
  → Claude ทำทั้ง 5 ขั้นตอนให้ ใช้เวลา 2 นาที ไม่ผิดพลาด
```

### Skills คืออะไร?

คำสั่งที่ผู้ใช้สร้างเอง ใช้เรียกด้วย `/ชื่อ-skill` หรือ Claude เรียกใช้อัตโนมัติ

### ตำแหน่งเก็บ Skills

| ตำแหน่ง | ขอบเขต |
|---------|--------|
| `~/.claude/skills/<name>/SKILL.md` | ส่วนตัว ใช้ได้ทุกโปรเจกต์ |
| `.claude/skills/<name>/SKILL.md` | โปรเจกต์ (commit ร่วมกับทีม) |
| `<plugin>/skills/<name>/SKILL.md` | จาก Plugin |

### สร้าง Skill พื้นฐาน

**ไฟล์ `.claude/skills/deploy/SKILL.md`:**

```markdown
---
name: deploy
description: Deploy แอปพลิเคชันไปยัง Production
disable-model-invocation: true
---

ทำตามขั้นตอนเหล่านี้:

1. รัน Test Suite ให้ผ่านทั้งหมด
2. Build แอปพลิเคชัน
3. Deploy ไปยัง Production
4. ตรวจสอบ Health Checks
```

ใช้งาน: พิมพ์ `/deploy` ในเซสชัน

### Frontmatter Options

```yaml
---
name: skill-name                    # ชื่อคำสั่ง
description: "ทำอะไร"                # เมื่อไหร่ที่ Claude ควรใช้
when_to_use: "ตัวกระตุ้นเพิ่มเติม"    # คำกระตุ้นเพิ่ม
argument-hint: "[file] [action]"    # คำแนะนำ Argument
disable-model-invocation: true      # เฉพาะผู้ใช้เรียก (ไม่ให้ Claude เรียกเอง)
user-invocable: false               # เฉพาะ Claude เรียก
allowed-tools: "Read,Bash"          # อนุมัติเครื่องมือล่วงหน้า
model: claude-opus-4-6              # Override โมเดล
effort: high                        # Override Effort
context: fork                       # รันใน Subagent
agent: Explore                      # ประเภท Agent
paths:                              # จำกัดเฉพาะไฟล์บางประเภท
  - "src/**/*.ts"
---
```

### Skill พร้อม Arguments

```markdown
---
name: deploy
description: Deploy ไปยัง Environment ที่ระบุ
---

Deploy ไปยัง $ARGUMENTS:

1. Build แอป
2. Deploy ไปยัง $ARGUMENTS
3. ตรวจสอบ Health Check

Environment ที่ใช้: $0
ตัวเลือกเพิ่ม: $1
```

ใช้งาน: `/deploy staging --verbose` → `$0` = staging, `$1` = --verbose

### Shell Injection ใน Skill

```markdown
---
name: status
---

สถานะปัจจุบัน:
- Branch: !`git rev-parse --abbrev-ref HEAD`
- Commit ล่าสุด: !`git log -1 --oneline`
- ไฟล์ที่เปลี่ยนแปลง: !`git status --short | wc -l`
```

คำสั่ง Shell จะถูกรันก่อนที่ Claude จะเห็นเนื้อหา

### ไฟล์ประกอบ

```
my-skill/
├── SKILL.md          # ไฟล์หลัก
├── template.md       # Template
├── examples.md       # ตัวอย่าง Output
└── scripts/
    └── validate.sh   # Script ช่วยเหลือ
```

อ้างอิงใน SKILL.md: `ดูตัวอย่างที่ [examples.md](examples.md)`

---

## 12. Subagents (ตัวช่วยเฉพาะทาง)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Subagents?**
>
> Subagents คือ **AI ผู้เชี่ยวชาญเฉพาะด้าน** ที่ทำงานแยก Context — เมื่องานต้องการความเชี่ยวชาญหลายด้าน Claude หลักจะ "มอบหมาย" งานให้ Subagent ที่เหมาะสม แล้วรวบรวมผลลัพธ์ เหมือนหัวหน้าทีมที่มีลูกทีมเฉพาะทาง

**Use Cases:**

| Subagent | Use Case | ตัวอย่างจริง |
|----------|----------|------------|
| **Explore Agent** | สำรวจ Codebase ขนาดใหญ่ | คุณถาม "Authentication ทำงานยังไง?" → Claude ส่ง Explore Agent ไปค้นหาไฟล์ที่เกี่ยวข้อง อ่านโค้ดหลายไฟล์ แล้วสรุปกลับมา — ไม่เปลือง Context ของ Claude หลัก |
| **Plan Agent** | วางแผนงานซับซ้อน | คุณบอก "ย้ายจาก REST ไป GraphQL" → Plan Agent วิเคราะห์ Endpoint ทั้งหมด เสนอแผนทีละขั้นตอน ระบุ Dependencies |
| **Security Reviewer** | รีวิว Security | Claude มอบหมายให้ Security Agent ตรวจโค้ดหา OWASP Vulnerabilities รายงานผลพร้อมระดับความรุนแรง |
| **Test Writer** | เขียน Test เฉพาะทาง | Claude มอบหมายให้ Test Agent เขียน Test ครอบคลุมทุก Edge Case โดยเฉพาะ |
| **Performance Analyzer** | วิเคราะห์ Performance | Agent ค้นหา N+1 Queries, Memory Leaks, ช่องทางที่ช้า แล้วเสนอวิธีแก้ |
| **Documentation Writer** | เขียนเอกสาร | Agent อ่านโค้ดทั้งหมดแล้วสร้าง API Documentation, README, Architecture Docs |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: คุณอยากรีแฟคเตอร์โปรเจกต์ขนาดใหญ่ (500+ ไฟล์)

ถ้าไม่มี Subagent:
  Claude อ่านไฟล์ทั้งหมดเอง → Context เต็มเร็วมาก → ลืมสิ่งที่อ่านก่อนหน้า
  → ทำงานได้ไม่ดี

มี Subagent:
  1. Claude ส่ง Explore Agent ไปสำรวจ → ได้สรุปโครงสร้างโปรเจกต์
  2. Claude ส่ง Plan Agent ไปวางแผน → ได้แผนรีแฟคเตอร์ทีละขั้น
  3. Claude ลงมือแก้ไขตามแผน → ส่ง Security Agent ตรวจสอบ
  → ทำงานได้ดีเพราะแต่ละ Agent มี Context แยก ไม่กินพื้นที่กัน
```

### Subagents คืออะไร?

AI ผู้ช่วยเฉพาะทางที่ทำงานใน Context Window แยก เหมาะกับงานที่ต้องการความเชี่ยวชาญเฉพาะด้าน

### ประเภท Built-in

| ประเภท | อธิบาย |
|--------|--------|
| `Explore` | สำรวจ, ค้นหา, อ่านไฟล์เท่านั้น |
| `Plan` | วางแผน, วิเคราะห์กลยุทธ์ |
| `general-purpose` | Agent ทั่วไป (ค่าเริ่มต้น) |

### สร้าง Custom Subagent

**ไฟล์ `.claude/agents/security-reviewer/agent.md`:**

```markdown
---
description: "รีวิวโค้ดด้านความปลอดภัย"
model: claude-opus-4-6
tools:
  - Read
  - Grep
  - Glob
  - Bash(npm audit *)
---

คุณเป็น Security Reviewer เฉพาะทาง

เมื่อรีวิวโค้ด:
1. ตรวจหา OWASP Top 10 Vulnerabilities
2. ตรวจสอบ Input Validation
3. ตรวจหา Hardcoded Secrets
4. ตรวจ SQL Injection, XSS, CSRF
5. รายงานผลเป็นภาษาไทย พร้อมระดับความรุนแรง
```

### Frontmatter Options

```yaml
---
description: "..."              # เมื่อไหร่ที่ Claude จะ Delegate งานมา
model: claude-sonnet-4-6        # โมเดลที่ใช้
tools:                          # เครื่องมือที่อนุญ��ต
  - Read
  - Bash
  - Edit
permissionMode: plan            # Override Permission Mode
skills:                         # Skills ที่โหลดมาด้วย
  - my-skill
mcpServers:                     # MCP ที่โหลดมาด้วย
  - puppeteer
preloadSkills: true             # โหลด Skill ตั้งแต่เริ่ม
---
```

### การใช้งาน

Claude จะ Delegate งานไปที่ Subagent อัตโนมัติเมื่อตรวจพบงานที่ตรงกับ Description หรือดูรายการด้วย:

```
/agents
```

---

## 13. Agent Teams (ทีม AI)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Agent Teams?**
>
> Agent Teams คือการ **ให้ AI หลายตัวทำงานพร้อมกัน** เหมือนทีมนักพัฒนาจริง ๆ — แต่ละ Agent มีบทบาทชัดเจน ส่งข้อความหากันได้ แชร์ Task List เดียวกัน ทำให้งานใหญ่ ๆ เสร็จเร็วขึ้นหลายเท่า

**Use Cases:**

| ทีม AI | สถานการณ์ | ผลลัพธ์ |
|-------|----------|--------|
| **Code Review Team** | PR ขนาดใหญ่ แก้ไข 50+ ไฟล์ | Agent 1 ตรวจ Security, Agent 2 ตรวจ Performance, Agent 3 ตรวจ Test Coverage → รีวิวเสร็จพร้อมกัน เร็วกว่า 3 เท่า |
| **Migration Team** | ย้ายจาก Monolith → Microservices | Agent แต่ละตัวรับผิดชอบ Service หนึ่ง → ย้ายโค้ดพร้อมกัน |
| **Full-Stack Team** | สร้างฟีเจอร์ใหม่ทั้ง Frontend + Backend | Agent 1 เขียน API, Agent 2 เขียน UI, Agent 3 เขียน Test → ทำงานคู่ขนาน |
| **Bug Hunting Team** | หา Bug ในโปรเจกต์ใหญ่ | แต่ละ Agent ค้นหาในส่วนต่าง ๆ ของ Codebase → ครอบคลุมมากขึ้น |
| **Refactoring Team** | รีแฟคเตอร์ 100+ ไฟล์ | แบ่ง Module ให้แต่ละ Agent → เสร็จพร้อมกัน |
| **Documentation Team** | เขียนเอกสารโปรเจกต์ทั้งหมด | Agent 1 เขียน API Docs, Agent 2 เขียน User Guide, Agent 3 เขียน Architecture Docs |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: ต้องรีวิว PR ขนาดใหญ่ที่แก้ไข 80 ไฟล์

ไม่มี Agent Teams:
  Claude รีวิวทีละไฟล์ → ใช้เวลา 30 นาที → ลืมปัญหาที่เจอในไฟล์แรก ๆ

มี Agent Teams:
  Agent "Security": ตรวจ Injection, Auth, Data Leak
  Agent "Performance": ตรวจ N+1, Memory, Complexity
  Agent "Quality": ตรวจ Test Coverage, Code Style, DRY
  → ทุก Agent ทำงานพร้อมกัน → เสร็จใน 10 นาที → รายงานรวมครบทุกมิติ
```

### Agent Teams คืออะไร?

หลายเซสชัน Claude Code ทำงานพร้อมกัน แชร์ Task List และส่งข้อความหากันได้

### เปิดใช้งาน (Experimental)

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

หรือใน settings.json:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### สร้างทีม

```
สร้าง Agent Team สำหรับรีวิว PR นี้ แบ่งเป็น 3 คน:
- คนที่ 1 ตรวจ Security
- คนที่ 2 ตรวจ Performance
- คนที่ 3 ตรวจ Test Coverage
```

### ควบคุมทีม

- **มอบงาน:** "มอบงาน Security Review ให้ Security Teammate"
- **สลับ Teammate:** `Shift+Down` ในโหมด In-process
- **โหมดแสดงผล:** `--teammate-mode in-process` (ค่าเริ่มต้น) หรือ `tmux` (แยก Panel)
- **ปิดทีม:** "ให้ Researcher หยุดทำงาน"

### ข้อจำกัด

- ไม่สามารถ Resume Session กับ In-process Teammates
- สถานะ Task อาจมีความล่าช้า
- ไม่รองรับ Nested Teams
- 1 ทีมต่อ 1 เซสชัน

---

## 14. การจัดการ Context

### ประโยชน์และ Use Cases

> **ทำไมต้องจัดการ Context?**
>
> Context Window คือ "ความจำระยะสั้น" ของ Claude — ถ้าเต็ม Claude จะลืมสิ่งที่คุยกันก่อนหน้า การจัดการ Context อย่างดีช่วยให้ Claude **ทำงานได้ต่อเนื่องยาวนาน** โดยไม่สูญเสียข้อมูลสำคัญ

**Use Cases:**

| สถานการณ์ | วิธีจัดการ | ผลลัพธ์ |
|----------|----------|--------|
| **คุยกันมานาน Context เริ่มเต็ม** | `/compact เน้นเรื่อง Auth` | Claude สรุปเก็บเฉพาะสิ่งสำคัญ เปิดพื้นที่ให้ทำงานต่อ |
| **เปลี่ยนหัวข้องานกลางทาง** | `/clear` | เริ่มเซสชันใหม่สะอาด ไม่มี Context เก่ามารบกวน |
| **CLAUDE.md ยาวมาก Context เต็มเร็ว** | แยกไป `.claude/rules/` | โหลดเฉพาะกฎที่เกี่ยวข้อง ไม่โหลดทั้งหมดทุกครั้ง |
| **ต้องค้นหาโค้ดเยอะ กลัว Context เต็ม** | ใช้ Subagent (Explore) | Subagent ค้นหาใน Context แยก ไม่กินพื้นที่ Claude หลัก |
| **อยากถามเรื่องเล็ก ๆ ไม่อยากเสีย Context** | `/btw คำถาม` | ถามโดยไม่ใช้เครื่องมือ ไม่เพิ่ม Context มาก |
| **ต้องการดูว่า Context ถูกใช้ไปเท่าไหร่** | `/context` | เห็นสัดส่วนการใช้ Context แต่ละส่วน |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: คุณทำงานมา 2 ชั่วโมง แก้ Bug 5 ตัว Context เริ่มเต็ม

ไม่จัดการ Context:
  Claude เริ่มลืม Bug ตัวแรก ๆ → คุณต้องอธิบายใหม่ → เสียเวลา

จัดการ Context:
  1. หลังแก้ Bug 2-3 ตัว → พิมพ์ /compact เก็บสรุปที่สำคัญ
  2. Context ว่างขึ้น → ทำงาน Bug ถัดไปได้อย่างต่อเนื่อง
  3. ถ้าเปลี่ยนหัวข้อ → /clear แล้วเริ่มใหม่
  → ทำงานได้ทั้งวันโดยไม่ติดปัญหา Context
```

### Context Window คืออะไร?

พื้นที่ "ความจำ" ของ Claude ในเซสชัน ประกอบด้วย:
- ประวัติบทสนทนา
- ไฟล์ CLAUDE.md
- Auto Memory
- เครื่องมือที่โหลด
- Skills ที่โหลด

### ดูการใช้ Context

```
/context
```

### Auto-Compaction (สรุปอัตโนมัติ)

เมื่อ Context ใกล้เต็ม Claude จะสรุปบทสนทนาอัตโนมัติ โดยเก็บ:
- คำสั่งเริ่มต้น (CLAUDE.md)
- โค้ดสำคัญ
- งานล่าสุด
- บริบทของ Task

### สรุปด้วยตัวเอง

```
/compact เน้นเรื่องการแก้ Authentication
```

Claude จะสรุปบทสนทนา โดยเน้นหัวข้อที่ระบุ

### เทคนิคประหยัด Context

| วิธี | รายละเอียด |
|-----|-----------|
| CLAUDE.md สั้น ๆ | เก็บไว้ไม่เกิน 200 บรรทัด |
| ใช้ `.claude/rules/` | แยกคำสั่งยาว ๆ ออกจาก CLAUDE.md |
| `disable-model-invocation` | ปิดไม่ให้ Claude เรียก Skill ที่ไม่ค่อยใช้ |
| ใช้ Subagent | งานสำรวจใช้ Subagent (แยก Context) |
| `/compact` | สรุปเมื่อ Context เริ่มเยอะ |

---

## 15. Git Integration

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Git Integration?**
>
> Git Integration ทำให้ Claude จัดการ Git ได้ **เหมือนนักพัฒนามืออาชีพ** — เขียน Commit Message ที่สื่อความหมาย, สร้าง PR ที่อธิบายงานชัดเจน, รีวิวโค้ดอย่างละเอียด และทำงานหลาย Branch คู่ขนานได้

**Use Cases:**

| Use Case | วิธีใช้ | ผลลัพธ์ |
|----------|--------|--------|
| **Commit ที่มีข้อความดี ๆ** | `/commit` | Claude อ่าน Diff แล้วเขียน Message ที่อธิบาย "ทำไม" ไม่ใช่แค่ "ทำอะไร" ดีกว่า "fix bug" หรือ "update" |
| **สร้าง PR ที่ทีมเข้าใจง่าย** | `/pr` | Claude สรุปการเปลี่ยนแปลงทั้ง Branch เขียน Description ที่ครบถ้วน Reviewer เข้าใจงานได้ทันที |
| **รีวิวโค้ดก่อน Push** | `/review` | Claude ตรวจหา Bug, Security Issue, Code Smell ก่อนที่คนอื่นจะเห็น ลดจำนวนรอบรีวิว |
| **ทำ 2 ฟีเจอร์พร้อมกัน** | `claude -w feature-a` + `claude -w feature-b` | แต่ละ Worktree มี Branch แยก Claude ทำงานคู่ขนานได้โดยไม่ Conflict |
| **ดูสถานะ PR** | ดู Status Bar | เห็นสถานะ PR (Approved/Pending/Changes Requested) โดยไม่ต้องเปิด GitHub |
| **ย้อน Commit ที่ผิดพลาด** | `Esc + Esc` → Restore code | ย้อนกลับได้ทันที ไม่ต้องหา git reflog เอง |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: คุณแก้ Bug 3 ไฟล์ อยากสร้าง PR

ก่อนมี Git Integration:
  1. git add src/auth.ts src/middleware.ts src/utils.ts   ← จำชื่อไฟล์
  2. git commit -m "..."                                  ← คิด Message
  3. git push -u origin fix/login-bug                     ← จำ Branch
  4. gh pr create --title "..." --body "..."              ← เขียน PR Description
  → ใช้เวลา 10 นาที, PR Description มักสั้นเกินไป

หลังมี Git Integration:
  1. พิมพ์ /commit → Claude วิเคราะห์ Diff เขียน Message ให้
  2. พิมพ์ /pr → Claude เขียน Title + Description ครบถ้วน Push + สร้าง PR
  → ใช้เวลา 1 นาที, PR Description ละเอียดชัดเจน
```

### คำสั่ง Git ที่ใช้บ่อย

| คำสั่ง | อธิบาย |
|-------|--------|
| `/commit` | Stage + Commit พร้อมข้อความจาก Claude |
| `/pr` | สร้าง Pull Request |
| `/review` | รีวิวโค้ด |

### Git Worktrees (ทำงานคู่ขนาน)

```bash
# สร้าง Worktree แยก
claude -w feature-auth

# Claude จะทำงานใน .claude/worktrees/feature-auth
# ไม่กระทบกับ Working Directory หลัก
```

ประโยชน์:
- รันหลายเซสชัน Claude พร้อมกัน
- แต่ละเซสชันแก้ไขไฟล์แยกกัน
- ไม่มีปัญหา Conflict

### GitHub Integration

- แสดงสถานะ PR บน Branch ปัจจุบัน
- แสดงสีตามสถานะ: เขียว (Approved), เหลือง (Pending), แดง (Changes Requested)
- `Cmd+Click` / `Ctrl+Click` เพื่อเปิด PR ใน Browser
- ต้องการ `gh` CLI

### ตัวอย่างการ Commit

```
/commit
```

Claude จะ:
1. ดู `git status` และ `git diff`
2. เขียน Commit Message ที่เหมาะสม
3. Stage ไฟล์ที่เกี่ยวข้อง
4. สร้าง Commit

### ตัวอย่างการสร้าง PR

```
/pr
```

Claude จะ:
1. วิเคราะห์การเปลี่ยนแปลงทั้งหมดตั้งแต่แยก Branch
2. เขียน Title และ Description
3. Push ไปยัง Remote (ถ้าจำเป็น)
4. สร้าง PR ด้วย `gh pr create`

---

## 16. Headless Mode (โหมดอัตโนมัติ)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Headless Mode?**
>
> Headless Mode ทำให้ Claude Code ทำงาน **โดยไม่ต้องมีคนนั่งดู** — เหมาะกับงานอัตโนมัติ, CI/CD Pipeline, Script ที่รันตามเวลา หรือการประมวลผลข้อมูลจำนวนมาก

**Use Cases:**

| Use Case | คำสั่ง | ผลลัพธ์ |
|----------|-------|--------|
| **Code Review อัตโนมัติทุก PR** | `claude --bare -p "รีวิว $(git diff main)"` ใน GitHub Actions | ทุก PR ถูกรีวิวโดย AI อัตโนมัติ ไม่ต้องรอคนรีวิว |
| **สร้าง Release Notes อัตโนมัติ** | `claude -p "สร้าง Changelog จาก Git Log"` | ทุก Release มี Changelog สวยงามโดยอัตโนมัติ |
| **วิเคราะห์ Error Log** | `cat error.log \| claude -p "วิเคราะห์"` | วิเคราะห์ Log ได้ทันที ไม่ต้องอ่านเอง |
| **Batch Processing ไฟล์เยอะ** | `for f in *.ts; do claude -p "แก้ไข $f"; done` | แก้ไข Pattern เดียวกันในหลาย ๆ ไฟล์อัตโนมัติ |
| **สร้าง JSON Output สำหรับ Pipeline** | `claude -p "..." --output-format json --json-schema '{...}'` | ได้ Output ที่ Parse ได้ทันที ส่งต่อให้ Program อื่นได้ |
| **Daily Code Quality Check** | Cron Job + `claude --bare -p "ตรวจ Code Quality"` | รายงานคุณภาพโค้ดทุกเช้า |
| **Migration Script** | `claude -p "ย้ายจาก v1 → v2" --max-turns 50` | Claude ทำ Migration ให้โดยอัตโนมัติ |
| **Generate Test Data** | `claude -p "สร้าง Seed Data 100 records" --output-format json` | ได้ Test Data ในรูปแบบ JSON ทันที |

**ตัวอย่าง GitHub Actions:**

```yaml
name: AI Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: AI Review
        run: |
          git diff origin/main | claude --bare -p "รีวิวโค้ดนี้ หา Bug, Security Issue, Performance Problem" \
            --allowedTools "Read" \
            --output-format json \
            --max-turns 5
```

### ใช้งานแบบ Non-Interactive

```bash
# รันคำสั่งและพิมพ์ผลลัพธ์
claude -p "หา Bug ในไฟล์ auth.py"

# รับ Output เป็น JSON
claude -p --output-format json "วิเคราะห์โค้ด"

# โหมดเปล่า (เร็วกว่า)
claude -p --bare "คำถาม"
```

### Structured Output (JSON)

```bash
claude -p "วิเคราะห์ฟังก์ชันทั้งหมดในไฟล์" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}}}'
```

### Streaming Output

```bash
claude -p "เขียนโค้ด" \
  --output-format stream-json \
  --include-partial-messages | \
  jq -rj 'select(.type == "stream_event") | .event.delta.text'
```

### ใช้ใน CI/CD

```bash
# ตัวอย่าง GitHub Actions
claude --bare -p "รีวิวโค้ดที่เปลี่ยนแปลง" \
  --allowedTools "Read,Bash(npm test),Edit" \
  --output-format json \
  --max-turns 10
```

### Pipe ข้อมูลเข้า Claude

```bash
# ส่งไฟล์ให้ Claude วิเคราะห์
cat error.log | claude -p "วิเคราะห์ Error ใน Log นี้"

# ส่งผลลัพธ์คำสั่ง
git diff | claude -p "รีวิวการเปลี่ยนแปลงนี้"

# ส่งหลายไฟล์
cat src/*.ts | claude -p "หา Bug"
```

---

## 17. IDE Integration

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ IDE Integration?**
>
> IDE Integration ทำให้คุณ **ใช้ Claude Code ได้โดยไม่ต้องออกจาก Editor** — เห็น Diff แบบ Visual, คลิกลิงก์ไฟล์ได้, Select โค้ดแล้วส่งให้ Claude ได้ทันที ทำงานได้ลื่นไหลกว่า CLI อย่างเดียว

**Use Cases:**

| Use Case | IDE | คำอธิบาย |
|----------|-----|----------|
| **Highlight โค้ดแล้วให้ Claude อธิบาย** | VS Code | Select โค้ดที่ไม่เข้าใจ → Claude อธิบายให้ทันที ไม่ต้อง Copy-Paste |
| **เห็น Diff แบบ Visual ก่อน Approve** | VS Code / Desktop | เห็นสีแดง/เขียวว่า Claude แก้อะไรบ้าง ก่อนตัดสินใจ Accept |
| **อ้างอิงไฟล์ด้วย @** | VS Code | พิมพ์ `@src/auth.ts` → Claude อ่านไฟล์นั้นทันที ไม่ต้อง Copy-Paste เนื้อหาไฟล์ |
| **ดู Task List ขณะทำงาน** | VS Code / Desktop | เห็นรายการ Task ที่ Claude กำลังทำ ติดตามความคืบหน้าได้ |
| **ทำงานหลาย Tab พร้อมกัน** | Desktop | เปิดหลาย Session ในหลาย Tab ทำงานหลายงานคู่ขนาน |
| **ใช้ Claude ระหว่าง Debug** | JetBrains | Claude เห็น Context ของ IDE เช่น Variable Values, Stack Trace |

### VS Code Extension

**ติดตั้ง:**
1. เปิด Extensions (`Ctrl+Shift+X`)
2. ค้นหา "Claude Code"
3. กด Install

**ฟีเจอร์:**
- แสดง Diff แบบ Visual
- ใช้ `@` เพื่ออ้างอิงไฟล์
- รีวิวแผนก่อนลงมือทำ
- ประวัติบทสนทนา
- คลิกลิงก์ไฟล์เพื่อเปิดตรง ๆ

**การตั้งค่า VS Code:**
- `claudeCode.initialPermissionMode` - โหมด Permission เริ่มต้น

### JetBrains IDEs

**ติดตั้ง:**
1. เปิด Settings > Plugins
2. ค้นหา "Claude Code" ใน Marketplace
3. กด Install

**ฟีเจอร์:**
- รัน Claude ใน Integrated Terminal
- คีย์ลัดเหมือน CLI
- เข้าถึง Context ของ IDE ได้

### Desktop App

**ฟีเจอร์เพิ่มเติม:**
- รีวิว Diff แบบ Visual
- เปิดหลายเซสชันใน Tab
- UI สำหรับ Scheduled Tasks
- แสดงสถานะ PR
- Git Isolation

---

## 18. Plugins (ปลั๊กอิน)

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
# จากไดเรกทอรี Local
claude --plugin-dir ./my-plugin

# ติดตั้งจาก Marketplace
/plugins install <plugin-name>
```

### จัดการ Plugins

```
/plugins              # เรียกดูและจัดการ
/reload-plugins       # โหลด Plugins ใหม่โดยไม่ต้อง Restart
```

---

## 19. Session Management

### ประโยชน์และ Use Cases

> **ทำไมต้องจัดการ Session?**
>
> Session Management ทำให้คุณ **กลับมาทำงานต่อได้ทันที** เหมือนเปิดแท็บเดิมใน Browser — Claude จำทุกอย่างที่คุยกัน ไม่ต้องอธิบายใหม่ ย้อนกลับได้ถ้าผิดพลาด

**Use Cases:**

| Use Case | วิธีใช้ | คำอธิบาย |
|----------|--------|----------|
| **ปิดคอมแล้วกลับมาทำงานต่อ** | `claude -c` | Claude จำบริบททั้งหมด ทำงานต่อได้ทันที ไม่ต้องอธิบายใหม่ |
| **มีหลายงาน อยากสลับไปมา** | `/resume` → เลือก Session | กลับไป Session ไหนก็ได้ แต่ละงานมี Context แยก |
| **ตั้งชื่อ Session ให้จำง่าย** | `/rename auth-refactor` | หา Session ได้ง่ายเมื่อมีหลายงาน |
| **Claude แก้โค้ดผิด อยากย้อนกลับ** | `Esc + Esc` → Restore | ย้อนทั้งโค้ดและบทสนทนา หรือเลือกย้อนอย่างใดอย่างหนึ่ง |
| **อยากลองวิธีใหม่โดยไม่เสีย Session เดิม** | `claude --fork-session` | แยก Branch ออกจาก Session ปัจจุบัน ถ้าไม่ดีก็กลับไป Session เดิมได้ |
| **ส่ง Session ให้เพื่อนร่วมทีมดู** | `claude --remote` | สร้าง Session บน Cloud เปิดดูจาก Browser ได้ |

### Rewind (ย้อนกลับ)

กด `Esc + Esc` หรือใช้ `/rewind`:

| ตัวเลือก | อธิบาย |
|---------|--------|
| Restore code and conversation | ย้อนทั้งโค้ดและบทสนทนา |
| Restore conversation | ย้อนบทสนทนา เก็บโค้ดปัจจุบัน |
| Restore code | ย้อนโค้ด เก็บบทสนทนาปัจจุบัน |
| Summarize from here | สรุปบทสนทนาจากจุดนี้ |

### Resume Session (กลับมาต่อ)

```bash
claude --continue                    # เซสชันล่าสุด
claude --resume auth-refactor        # ตามชื่อ
claude --resume <session-id>         # ตาม ID
claude --fork-session                # แยก Branch ใหม่
```

### ดูรายการเซสชัน

```
/resume
```

แสดง Interactive Picker ให้เลือกเซสชัน

### ตำแหน่งเก็บไฟล์เซสชัน

```
~/.claude/projects/<project>/sessions/<session-id>.jsonl
```

---

## 20. Scheduled Tasks (งานตั้งเวลา)

### ประโยชน์และ Use Cases

> **ทำไมต้องใช้ Scheduled Tasks?**
>
> Scheduled Tasks ทำให้ Claude **ทำงานอัตโนมัติตามเวลาที่กำหนด** — ไม่ต้องจำว่าต้องรันอะไร เมื่อไหร่ Claude ทำให้เอง

**Use Cases:**

| งานตั้งเวลา | ความถี่ | ผลลัพธ์ |
|------------|--------|--------|
| **Daily Code Review** | ทุกเช้า 9:00 | Claude รีวิวโค้ดที่ Commit เมื่อวาน หา Bug/Security Issue รายงานผลทุกเช้า |
| **Weekly Dependency Check** | ทุกวันจันทร์ | Claude ตรวจสอบ Dependencies ที่ Outdated หรือมี Vulnerability แจ้งเตือนทุกสัปดาห์ |
| **Hourly Health Check** | ทุกชั่วโมง | Claude ตรวจสอบ Error Log ถ้ามี Error Pattern ใหม่ แจ้งเตือนทันที |
| **Daily Documentation Update** | ทุกเย็น 18:00 | Claude อัปเดต API Docs ให้ตรงกับโค้ดล่าสุด |
| **Monthly Performance Report** | ทุกต้นเดือน | Claude วิเคราะห์ Code Quality Metrics สร้างรายงานรายเดือน |
| **Monitor Deployment** | `/loop 5m` | ตรวจสอบ Health Check ทุก 5 นาทีหลัง Deploy |

**ตัวอย่างสถานการณ์จริง:**

```
สถานการณ์: ทีมลืมอัปเดต Dependencies บ่อย ทำให้มี Vulnerability สะสม

ก่อนมี Scheduled Tasks:
  → ลืมเช็ค Dependencies 3 เดือน → Audit เจอ 47 Vulnerabilities → ต้องแก้ทั้งหมดพร้อมกัน

หลังมี Scheduled Tasks:
  → Claude ตรวจทุกวันจันทร์ → เจอ 2-3 Vulnerabilities → แก้ทันที ไม่สะสม
  → ทีมปลอดภัยตลอด โดยไม่ต้องจำเรื่องนี้
```

### Scheduled Tasks ใน Desktop App

| ความถี่ | อธิบาย |
|--------|--------|
| Manual | รันด้วยตัวเอง |
| Hourly | ทุกชั่วโมง |
| Daily | ทุกวัน |
| Weekdays | วันจันทร์-ศุกร์ |
| Weekly | ทุกสัปดาห์ |

**สร้างผ่าน Desktop UI หรือ:**
```
ตั้งค่า Daily Code Review ที่รันตอน 9 โมงเช้า
```

### /loop - ทำซ้ำในเซสชัน

```
/loop 5m "ตรวจสอบ Error ใน Log"
```

ทำซ้ำทุก 5 นาทีในเซสชันปัจจุบัน

### /schedule - Cloud Routines

```
/schedule
```

สร้างงานตั้งเวลาบน Anthropic Infrastructure:
- ทำงานแม้คอมพิวเตอร์ปิด
- เรียกจาก API หรือ GitHub Event ได้
- Clone Repo ใหม่ทุกครั้ง

---

## 21. ฟีเจอร์พิเศษอื่น ๆ

### ประโยชน์และ Use Cases

> **ฟีเจอร์พิเศษเหล่านี้ช่วยอะไร?**
>
> ฟีเจอร์เหล่านี้เป็น **ความสามารถเสริมที่ช่วยให้ Claude ทำงานได้หลากหลายขึ้น** — ตั้งแต่คิดวิเคราะห์ลึก ๆ ไปจนถึงควบคุม Browser หรือรับคำสั่งด้วยเสียง

**Use Cases:**

| ฟีเจอร์ | Use Case | คำอธิบาย |
|--------|----------|----------|
| **Extended Thinking** | วางสถาปัตยกรรมซอฟต์แวร์ | Claude ใช้เวลาคิดนานขึ้น วิเคราะห์ข้อดี-ข้อเสียของแต่ละทางเลือก ผลลัพธ์ละเอียดกว่าปกติมาก |
| **Fast Mode** | แก้ Bug เล็ก ๆ เร็ว ๆ | ได้คำตอบเร็วขึ้น เหมาะกับงานที่ไม่ซับซ้อน ประหยัดเวลา |
| **Code Intelligence** | ตรวจ Type Error ระหว่างเขียน | Claude เห็น Type Error แบบ Real-time เหมือน IDE ตรวจให้ แก้ Bug ได้ตั้งแต่ตอนเขียน |
| **Voice Dictation** | อธิบายสิ่งที่ต้องการด้วยเสียง | กดค้าง Space แล้วพูด เร็วกว่าพิมพ์สำหรับคำอธิบายยาว ๆ |
| **Remote Control** | แชร์ Session ให้เพื่อนร่วมทีม | เพื่อนเปิด Browser ดู Session ของคุณได้ เหมาะกับ Pair Programming |
| **Computer Use** | ทดสอบ UI บน macOS | Claude ควบคุมเมาส์/คีย์บอร์ด ทดสอบแอปจริง ๆ ได้ |
| **Side Questions** | ถามเรื่องเล็ก ๆ ระหว่างทาง | `/btw` ถามโดยไม่กระทบ Context หลัก |

### Extended Thinking (คิดลึก)

```
/think
```

หรือกด `Cmd+T` / `Meta+T`

Claude จะใช้เวลาคิดนานขึ้นสำหรับปัญหาที่ซับซ้อน เช่น:
- วางสถาปัตยกรรมซอฟต์แวร์
- แก้ Bug ที่ซับซ้อน
- วิเคราะห์ Security

### Fast Mode (เร็วขึ้น)

กด `Meta+O` / `Alt+O` หรือ `/fast`

ใช้ Opus 4.6 เหมือนเดิม แต่ Output เร็วขึ้น

### Code Intelligence

ตรวจสอบ Type และ Error แบบ Real-time ด้วย LSP Servers

รองรับ: TypeScript, Python, Rust

### Voice Dictation (พูดแทนพิมพ์)

กดค้าง `Space` เพื่อ Push-to-talk

### Remote Control

```bash
claude remote-control --name "My Project"
```

ควบคุม Claude Code จาก Browser ได้

### Computer Use (macOS)

```bash
claude --chrome
```

Claude สามารถควบคุมเมาส์/คีย์บอร์ดและโต้ตอบกับเว็บแอปได้

### Side Questions

```
/btw ไฟล์ Config อยู่ไหน?
```

ถามคำถามข้างเคียงโดยไม่กระทบ Context หลัก

---

## 22. โครงสร้างไดเรกทอรี

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

## 23. Environment Variables

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

## 24. การแก้ปัญหาเบื้องต้น

### ประโยชน์และ Use Cases

> **ทำไมต้องรู้วิธีแก้ปัญหา?**
>
> เมื่อ Claude Code ทำงานไม่ถูกต้อง — ไม่โหลด CLAUDE.md, Hook ไม่รัน, MCP ไม่เชื่อมต่อ — การรู้วิธีวินิจฉัยช่วยให้คุณ **แก้ปัญหาได้เร็วโดยไม่ต้องรอความช่วยเหลือ**

**Use Cases:**

| ปัญหา | วิธีวินิจฉัย | วิธีแก้ |
|-------|------------|--------|
| **Claude ไม่รู้จักโปรเจกต์** | `/memory` → ตรวจว่า CLAUDE.md โหลดหรือไม่ | ตรวจตำแหน่งไฟล์, ตรวจ `claudeMdExcludes` ใน Settings |
| **Hook ไม่ทำงาน** | `claude --debug "hooks"` | ตรวจ Syntax ใน settings.json, ตรวจ Matcher Pattern |
| **MCP Server ขึ้น Error** | `/mcp` → ดูสถานะ | ตรวจ Command/Args, ตรวจว่า npx ทำงานได้ |
| **Context เต็มเร็วผิดปกติ** | `/context` → ดูสัดส่วน | ย้ายเนื้อหาจาก CLAUDE.md ไป `.claude/rules/` |
| **Skill ไม่ปรากฏ** | ตรวจ Description ใน SKILL.md | ทำ Description ให้ชัดเจนขึ้น |
| **Login ไม่ได้** | `claude auth status` | `claude auth login` ใหม่ |
| **ทุกอย่างดูผิดปกติ** | `/doctor` | วินิจฉัยปัญหาครบทุกด้าน |

### วินิจฉัยปัญหา

```
/doctor
```

แสดง:
- สถานะการติดตั้ง
- สถานะยืนยันตัวตน
- ปัญหา Configuration
- ปัญหา Keybindings
- Dependencies ที่ขาด

### Debug Logging

```bash
claude --debug "api,hooks"
claude --debug-file /tmp/claude-debug.log
```

### ปัญหาที่พบบ่อย

| ปัญหา | วิธีแก้ |
|-------|--------|
| Permission ไม่ทำงาน | ตรวจสอบ Syntax ของกฎ, ใช้ `/permissions` |
| CLAUDE.md ไม่โหลด | ใช้ `/memory` เพื่อตรวจสอบตำแหน่ง |
| Skills ไม่ Trigger | ตรวจสอบ Description ให้ชัดเจนขึ้น |
| Context เต็มเร็ว | ย้ายเนื้อหาไป `.claude/rules/`, ใช้ Subagent |
| Hooks ไม่รัน | ตรวจสอบ Syntax ใน settings.json |
| Login ไม่ได้ | `claude auth login` ใหม่ |
| MCP Server ไม่ทำงาน | `/mcp` เพื่อดูสถานะ, ตรวจสอบ Command และ Args |

### ตรวจสอบ Session

```bash
# ดูไฟล์ Session
cat ~/.claude/projects/<project>/sessions/<session-id>.jsonl | jq '.'
```

### อัปเดต Claude Code

```bash
claude update
# หรือ
claude --version  # ตรวจสอบเวอร์ชัน
```

---

## 25. เคล็ดลับและแนวทางปฏิบัติที่ดี

### ประโยชน์และ Use Cases

> **ทำไมต้องอ่านส่วนนี้?**
>
> เคล็ดลับเหล่านี้มาจาก **ประสบการณ์จริงของนักพัฒนา** ที่ใช้ Claude Code ทุกวัน — ช่วยให้คุณได้ผลลัพธ์ดีขึ้น เร็วขึ้น และประหยัดค่าใช้จ่ายมากขึ้น

### เขียน CLAUDE.md อย่างมีประสิทธิภาพ

- เก็บไว้ไม่เกิน 200 บรรทัด
- ใช้หัวข้อ (`#`) และ Bullet Points ชัดเจน
- เฉพาะเจาะจง: "ใช้ 2-space indentation" ไม่ใช่ "format ให้สวย"
- ใช้ `@import` สำหรับเอกสารอ้างอิงยาว ๆ
- แยกหัวข้อไปไว้ใน `.claude/rules/`

### พิมพ์คำสั่งอย่างมีประสิทธิภาพ

| แนวทาง | ตัวอย่างดี | ตัวอย่างไม่ดี |
|--------|----------|------------|
| **เฉพาะเจาะจง** | "แก้ Bug ที่ทำให้ login ล้มเหลวเมื่อ password มี special characters ในไฟล์ src/auth.ts" | "แก้ Bug login" |
| **บอกวิธีตรวจสอบ** | "แก้แล้วรัน `npm test src/auth.test.ts` ให้ผ่าน" | "แก้แล้วเทสต์ด้วย" |
| **สำรวจก่อนทำ** | "วิเคราะห์ว่า Authentication flow ทำงานยังไง แล้วเสนอแผนก่อนแก้" | "แก้ Auth ให้หน่อย" |
| **มอบหมาย ไม่ใช่สั่งทีละขั้น** | "สร้าง REST API สำหรับ CRUD Users ตาม Pattern ที่ใช้ในโปรเจกต์" | "สร้างไฟล์ route ก่อน แล้ว..." |

### จัดการ Permission

- อนุมัติคำสั่งที่ใช้บ่อย: `Bash(npm test *)`
- ใช้ Deny สำหรับคำสั่งอันตราย: `Bash(rm -rf *)`
- สลับโหมดตามงาน: Plan → acceptEdits → auto

### ทำงานคู่ขนาน

- ใช้ `--worktree` สำหรับเซสชันคู่ขนาน
- ใช้ Agent Teams สำหรับงานที่ต้องร่วมมือ
- ใช้ Subagents สำหรับงานเฉพาะทาง

### CI/CD Integration

```bash
# ตัวอย่างใน GitHub Actions
- name: Claude Code Review
  run: |
    claude --bare -p "รีวิวโค้ดที่เปลี่ยนแปลง" \
      --allowedTools "Read,Bash(npm test)" \
      --output-format json \
      --max-turns 5
```

### ทำงานกับ Context Window อย่างฉลาด

1. ใช้ `/compact` เมื่อบทสนทนายาว
2. ใช้ `/clear` เมื่อเปลี่ยนหัวข้อ
3. ใช้ Subagent สำหรับงานค้นหา
4. ใช้ `/btw` สำหรับคำถามเล็ก ๆ
5. ตรวจสอบ `/context` เป็นระยะ

### เลือกโมเดลให้เหมาะกับงาน

| งาน | โมเดลที่แนะนำ | เหตุผล |
|-----|--------------|--------|
| วางสถาปัตยกรรม, แก้ Bug ซับซ้อน | Opus 4.6 | คิดลึก วิเคราะห์ดี |
| เขียนโค้ดทั่วไป, แก้ Bug ธรรมดา | Sonnet 4.6 | เร็ว ประหยัด |
| งาน Boilerplate, Generate Data | Haiku 4.5 | เร็วมาก ถูกมาก |

### ประหยัดค่าใช้จ่าย

- ใช้ `--effort low` สำหรับงานง่าย ๆ
- ใช้ `--model sonnet` เมื่อไม่ต้องการ Opus
- ใช้ `--max-budget-usd` เพื่อจำกัดงบ
- ใช้ `/compact` เพื่อลด Token ที่ส่ง

---

## 26. จำลอง Flow การทำงานจริง

> **หัวข้อนี้จำลองการใช้งาน Claude Code ในสถานการณ์จริงตั้งแต่ต้นจนจบ**  
> แต่ละ Flow แสดงขั้นตอนที่นักพัฒนาทำจริง ๆ ในแต่ละวัน พร้อมคำสั่งและสิ่งที่ Claude ตอบกลับ

---

### Flow 1: เข้าโปรเจกต์ใหม่วันแรก (Onboarding)

> **สถานการณ์:** คุณเป็นนักพัฒนาที่เพิ่งเข้าทีม ได้รับ Repository ใหม่ที่ไม่เคยเห็นมาก่อน ต้องทำความเข้าใจโปรเจกต์ให้เร็วที่สุด

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: Clone โปรเจกต์และเปิด Claude Code               │
└─────────────────────────────────────────────────────────────────┘

$ git clone https://github.com/company/ecommerce-api.git
$ cd ecommerce-api
$ claude

  ┌──────────────────────────────────────┐
  │  Claude Code v1.x                    │
  │  Model: Claude Opus 4.6              │
  │  Permission: default                 │
  │  Project: ecommerce-api              │
  └──────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: ให้ Claude สร้าง CLAUDE.md                       │
└─────────────────────────────────────────────────────────────────┘

คุณ: /init

Claude: กำลังวิเคราะห์โปรเจกต์...
  ✓ อ่าน package.json → Node.js + TypeScript + Express
  ✓ อ่าน tsconfig.json → Strict mode, ESNext
  ✓ อ่าน docker-compose.yml → PostgreSQL + Redis
  ✓ สำรวจโครงสร้างไดเรกทอรี → 156 ไฟล์ใน 23 โฟลเดอร์
  ✓ อ่าน .eslintrc → Airbnb style
  ✓ อ่าน jest.config.ts → Test framework: Jest

  สร้าง CLAUDE.md เรียบร้อย ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: ถาม Claude เกี่ยวกับโปรเจกต์                     │
└─────────────────────────────────────────────────────────────────┘

คุณ: อธิบายสถาปัตยกรรมของโปรเจกต์นี้ให้หน่อย ผมเพิ่งเข้ามาใหม่

Claude: (ใช้ Explore Agent สำรวจ Codebase)

  โปรเจกต์นี้เป็น E-commerce REST API ใช้ Clean Architecture:

  📁 src/
  ├── controllers/     ← รับ Request, เรียก Service
  ├── services/        ← Business Logic หลัก
  ├── repositories/    ← Database Layer (TypeORM)
  ├── entities/        ← Database Models
  ├── middleware/       ← Auth, Logging, Error Handler
  ├── routes/          ← Express Routes
  ├── validators/      ← Zod Schemas
  └── utils/           ← Helper Functions

  Flow หลัก:
  Route → Middleware → Controller → Service → Repository → Database

  Entities หลัก: User, Product, Order, Payment, Cart
  Auth: JWT + Refresh Token
  Payment: Stripe Integration
  Cache: Redis สำหรับ Product Catalog
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 4: ลองรันโปรเจกต์                                   │
└─────────────────────────────────────────────────────────────────┘

คุณ: ช่วย Setup Development Environment ให้หน่อย

Claude: ตรวจสอบ Prerequisites...
  ✓ Node.js v20 — ติดตั้งแล้ว
  ✓ Docker — ติดตั้งแล้ว
  ✗ .env file — ยังไม่มี

  กำลังสร้าง .env จาก .env.example...
  [แก้ไข .env] ✓

  กำลังรัน docker-compose up -d...
  [รัน Bash: docker-compose up -d] ✓ PostgreSQL + Redis เริ่มแล้ว

  กำลังติดตั้ง Dependencies...
  [รัน Bash: npm install] ✓

  กำลังรัน Migrations...
  [รัน Bash: npm run db:migrate] ✓

  กำลังรัน Seed Data...
  [รัน Bash: npm run db:seed] ✓

  กำลังเริ่ม Dev Server...
  [รัน Bash: npm run dev] ✓ Server running on http://localhost:3000

  ✅ พร้อมใช้งาน! ลองเปิด http://localhost:3000/api/health
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 5: บันทึกข้อมูลส่วนตัวลง Memory                     │
└─────────────────────────────────────────────────────────────────┘

คุณ: จำไว้ว่าผมเป็น Backend Developer ชำนาญ Python/Django
     เพิ่งเริ่มเขียน TypeScript เป็นโปรเจกต์แรก

Claude: บันทึกแล้ว ✓
  ต่อไปเมื่ออธิบายเรื่อง TypeScript ผมจะเทียบกับ Python/Django ให้ครับ
```

**สรุป Flow:** `/init` → ถามสถาปัตยกรรม → Setup Dev → บันทึก Memory  
**เวลาที่ใช้:** ~10 นาที (ปกติใช้ 1-2 วัน ในการทำความเข้าใจโปรเจกต์ใหม่)

---

### Flow 2: แก้ Bug ที่ถูกรายงานจาก Production

> **สถานการณ์:** ได้รับ Bug Report ว่า "ลูกค้ากดสั่งซื้อแล้ว Order ซ้ำ 2 รายการ" ต้องหาสาเหตุและแก้ไข

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: เปิดเซสชันและอธิบาย Bug                          │
└─────────────────────────────────────────────────────────────────┘

$ claude

คุณ: มี Bug ที่ Production — ลูกค้ากดปุ่ม "Place Order" แล้ว Order ซ้ำ 2 รายการ
     เกิดเฉพาะตอนเน็ตช้า ลูกค้ากดปุ่มหลายครั้ง
     ช่วยหาสาเหตุและแก้ไขให้หน่อย
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: Claude วิเคราะห์ปัญหา (Plan Mode)                │
└─────────────────────────────────────────────────────────────────┘

Claude: เข้าใจครับ นี่คือปัญหา Idempotency ของ Order Creation
  ให้ผมวิเคราะห์ก่อนนะครับ

  [อ่าน src/controllers/order.controller.ts]
  [อ่าน src/services/order.service.ts]
  [อ่าน src/routes/order.routes.ts]
  [อ่าน src/middleware/]

  🔍 พบสาเหตุแล้ว:

  ไฟล์ src/services/order.service.ts:45
  ฟังก์ชัน createOrder() ไม่มีการป้องกัน Duplicate Request:

  1. ❌ ไม่มี Idempotency Key — Request ซ้ำจะสร้าง Order ใหม่ทุกครั้ง
  2. ❌ ไม่มี Database Lock — Race Condition เมื่อ 2 Request เข้าพร้อมกัน
  3. ❌ ไม่มีการ Disable ปุ่มหลังกด — Frontend ส่ง Request ซ้ำได้

  📋 แผนแก้ไข:
  1. เพิ่ม Idempotency Key ใน Order API (Backend — แก้จริง)
  2. เพิ่ม Database Unique Constraint (ป้องกัน Race Condition)
  3. เพิ่ม Redis Lock สำหรับ Order Creation (ป้องกัน Concurrent)
  4. เขียน Test ครอบคลุม

  จะเริ่มแก้ไขเลยไหมครับ?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: สลับเป็น acceptEdits แล้วให้ Claude แก้ไข        │
└─────────────────────────────────────────────────────────────────┘

คุณ: เริ่มเลย

  [กด Shift+Tab → สลับเป็น acceptEdits]

Claude: เริ่มแก้ไขครับ

  📝 แก้ไขไฟล์ 1/4: src/middleware/idempotency.middleware.ts (สร้างใหม่)
  [สร้างไฟล์] ✓ Idempotency Middleware ที่ใช้ Redis เก็บ Key

  📝 แก้ไขไฟล์ 2/4: src/services/order.service.ts
  [แก้ไข createOrder()] ✓ เพิ่ม Redis Lock + Idempotency Check

  📝 แก้ไขไฟล์ 3/4: src/routes/order.routes.ts
  [แก้ไข] ✓ เพิ่ม Idempotency Middleware ใน POST /orders

  📝 แก้ไขไฟล์ 4/4: src/entities/order.entity.ts
  [แก้ไข] ✓ เพิ่ม Unique Constraint บน idempotencyKey column

  🗄️ สร้าง Migration:
  [รัน Bash: npm run db:migration:create AddIdempotencyKey] ✓
  [แก้ไข migration file] ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 4: Claude เขียน Test                                │
└─────────────────────────────────────────────────────────────────┘

Claude: กำลังเขียน Test...

  📝 สร้าง src/__tests__/order-idempotency.test.ts
  [สร้างไฟล์] ✓

  Test Cases:
  ✓ ส่ง Order ปกติ → สร้างได้ 1 รายการ
  ✓ ส่ง Order ซ้ำด้วย Idempotency Key เดียวกัน → ได้ Order เดิมกลับมา
  ✓ ส่ง Order ซ้ำพร้อมกัน (Concurrent) → สร้างแค่ 1 รายการ
  ✓ ส่ง Order ใหม่ด้วย Key ต่างกัน → สร้าง Order ใหม่ได้
  ✓ Idempotency Key หมดอายุหลัง 24 ชม. → สร้าง Order ใหม่ได้

  กำลังรัน Test...
  [รัน Bash: npm test src/__tests__/order-idempotency.test.ts]

  ✅ Tests: 5 passed, 0 failed
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 5: Commit และสร้าง PR                               │
└─────────────────────────────────────────────────────────────────┘

คุณ: /commit

Claude: วิเคราะห์การเปลี่ยนแปลง...
  4 ไฟล์แก้ไข, 2 ไฟล์สร้างใหม่, 1 migration

  Commit Message:
  "fix: prevent duplicate order creation with idempotency key

   Add Redis-based idempotency middleware to prevent duplicate orders
   when customers submit multiple requests. Includes database unique
   constraint and distributed lock for race condition prevention."

  [git add + git commit] ✓

คุณ: /pr

Claude: สร้าง Pull Request...
  Branch: fix/duplicate-order-creation
  Title: "Fix: Prevent duplicate order creation"
  Description: ## Summary
  - Add idempotency middleware using Redis
  - Add distributed lock on order creation
  - Add unique constraint on idempotency_key column
  ...

  ✅ PR #142 สร้างเรียบร้อย → https://github.com/company/ecommerce-api/pull/142
```

**สรุป Flow:** อธิบาย Bug → Claude วิเคราะห์ → แก้ไข 6 ไฟล์ → เขียน 5 Tests → Commit + PR  
**เวลาที่ใช้:** ~15 นาที (ปกติใช้ 2-4 ชั่วโมง)

---

### Flow 3: สร้างฟีเจอร์ใหม่ตั้งแต่ศูนย์

> **สถานการณ์:** Product Manager ต้องการระบบ "Wishlist" ให้ลูกค้าบันทึกสินค้าที่สนใจ ต้องสร้าง API ใหม่ทั้งหมด

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: วางแผนก่อนลงมือทำ                                │
└─────────────────────────────────────────────────────────────────┘

$ claude

คุณ: /plan
     สร้างระบบ Wishlist ให้ลูกค้าบันทึกสินค้าที่สนใจ
     - ลูกค้าเพิ่ม/ลบสินค้าใน Wishlist ได้
     - ดูรายการ Wishlist ของตัวเอง
     - แจ้งเตือนเมื่อสินค้าใน Wishlist ลดราคา
     - จำกัด 50 รายการต่อ User

Claude: 📋 แผนการพัฒนาระบบ Wishlist

  ขั้นตอนที่ 1 — Database Layer
  ├── สร้าง Entity: WishlistItem (userId, productId, addedAt, notifyOnSale)
  ├── สร้าง Migration
  └── สร้าง Repository: WishlistRepository

  ขั้นตอนที่ 2 — Business Logic
  ├── สร้าง WishlistService
  │   ├── addToWishlist() — เพิ่มสินค้า (จำกัด 50)
  │   ├── removeFromWishlist() — ลบสินค้า
  │   ├── getWishlist() — ดูรายการ (pagination)
  │   ├── isInWishlist() — ตรวจสอบว่าอยู่ใน Wishlist หรือไม่
  │   └── notifyPriceDrop() — แจ้งเตือนลดราคา
  └── สร้าง Zod Validators

  ขั้นตอนที่ 3 — API Layer
  ├── POST   /api/wishlist          — เพิ่มสินค้า
  ├── DELETE  /api/wishlist/:productId — ลบสินค้า
  ├── GET    /api/wishlist          — ดูรายการ
  ├── GET    /api/wishlist/check/:productId — ตรวจสอบ
  └── สร้าง Controller + Routes

  ขั้นตอนที่ 4 — Price Drop Notification
  ├── สร้าง Event Listener สำหรับ Product Price Change
  ├── เชื่อมต่อกับ Email Service
  └── สร้าง Notification Queue (Bull)

  ขั้นตอนที่ 5 — Testing
  ├── Unit Tests: Service Layer (8 tests)
  ├── Integration Tests: API Endpoints (6 tests)
  └── Edge Cases: Limit 50, Duplicate, Deleted Product

  ไฟล์ที่ต้องสร้าง/แก้ไข: 12 ไฟล์
  เริ่มทำเลยไหมครับ?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: อนุมัติแผนและเริ่มทำ                              │
└─────────────────────────────────────────────────────────────────┘

คุณ: ดี เริ่มเลย แต่ขั้นตอนที่ 4 (Price Drop Notification) เอาไว้ทำทีหลัง
     ทำ 1-3 กับ 5 ก่อน

  [กด Shift+Tab → สลับเป็น auto]

Claude: เข้าใจครับ จะทำขั้นตอน 1-3 + 5 ก่อน

  ━━━ ขั้นตอนที่ 1: Database Layer ━━━

  📝 สร้าง src/entities/wishlist-item.entity.ts ✓
  📝 สร้าง src/repositories/wishlist.repository.ts ✓
  📝 สร้าง Migration: CreateWishlistTable ✓
  🗄️ รัน Migration ✓

  ━━━ ขั้นตอนที่ 2: Business Logic ━━━

  📝 สร้าง src/validators/wishlist.validator.ts ✓
  📝 สร้าง src/services/wishlist.service.ts ✓
     - addToWishlist() พร้อม Limit Check (50 items)
     - removeFromWishlist() พร้อม Not Found Check
     - getWishlist() พร้อม Pagination
     - isInWishlist() สำหรับ Frontend Toggle

  ━━━ ขั้นตอนที่ 3: API Layer ━━━

  📝 สร้าง src/controllers/wishlist.controller.ts ✓
  📝 สร้าง src/routes/wishlist.routes.ts ✓
  📝 แก้ไข src/routes/index.ts ✓ (เพิ่ม Wishlist Routes)

  ━━━ ขั้นตอนที่ 5: Testing ━━━

  📝 สร้าง src/__tests__/wishlist.service.test.ts ✓ (8 tests)
  📝 สร้าง src/__tests__/wishlist.api.test.ts ✓ (6 tests)

  กำลังรัน Tests ทั้งหมด...
  [รัน Bash: npm test]

  ✅ Tests: 14 passed, 0 failed
  ✅ Lint: No errors
  ✅ TypeScript: No errors

  สร้างไฟล์ทั้งหมด 9 ไฟล์ แก้ไข 1 ไฟล์ ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: รีวิวโค้ดก่อน Commit                              │
└─────────────────────────────────────────────────────────────────┘

คุณ: /review

Claude: 🔍 กำลังรีวิวโค้ดที่เปลี่ยนแปลง...

  ✅ ดี:
  - ใช้ Repository Pattern ตาม Codebase เดิม
  - มี Input Validation ด้วย Zod ทุก Endpoint
  - Pagination ใช้ Cursor-based ตาม Standard ของโปรเจกต์
  - Error Handling ครบถ้วน

  ⚠️ แนะนำ:
  - wishlist.service.ts:23 — ควรเพิ่ม Index บน (userId, productId)
    สำหรับ Query ที่ใช้บ่อย
  - wishlist.controller.ts:45 — ควรเพิ่ม Rate Limiting
    สำหรับ POST endpoint

  จะแก้ไขตามคำแนะนำเลยไหมครับ?

คุณ: แก้เลย

Claude:
  📝 แก้ไข migration file → เพิ่ม Composite Index ✓
  📝 แก้ไข wishlist.routes.ts → เพิ่ม Rate Limiter (10 req/min) ✓
  📝 รัน Tests อีกรอบ → 14 passed ✓
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 4: Commit และสร้าง PR                               │
└─────────────────────────────────────────────────────────────────┘

คุณ: /commit

Claude: Commit Message:
  "feat: add wishlist API for customers to save favorite products

   - CRUD endpoints for wishlist items with 50-item limit
   - Cursor-based pagination, rate limiting, input validation
   - 14 tests covering service and API layers"

  [git add + git commit] ✓

คุณ: /pr

Claude: ✅ PR #143 สร้างเรียบร้อย
  → https://github.com/company/ecommerce-api/pull/143
```

**สรุป Flow:** `/plan` → อนุมัติแผน → สร้าง 10 ไฟล์ → `/review` → แก้ตามคำแนะนำ → `/commit` + `/pr`  
**เวลาที่ใช้:** ~20 นาที (ปกติใช้ 1-2 วัน)

---

### Flow 4: รีแฟคเตอร์โค้ดเก่าขนาดใหญ่

> **สถานการณ์:** โปรเจกต์มีไฟล์ `utils.ts` ขนาด 2,000 บรรทัด ที่รวมทุกอย่างไว้ที่เดียว ต้องแยกเป็น Module ย่อย

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: วิเคราะห์ไฟล์ที่ต้องรีแฟคเตอร์                    │
└─────────────────────────────────────────────────────────────────┘

$ claude

คุณ: ไฟล์ src/utils.ts มี 2,000 บรรทัด อยากแยกเป็น Module ย่อย
     ห้ามทำให้ Test ที่มีอยู่พัง

Claude: ให้ผมวิเคราะห์ก่อนนะครับ...

  [อ่าน src/utils.ts — 2,147 บรรทัด]
  [ค้นหาไฟล์ที่ import จาก utils.ts — 47 ไฟล์]
  [อ่าน src/__tests__/utils.test.ts — 89 tests]

  📊 ผลการวิเคราะห์:

  ไฟล์ src/utils.ts ประกอบด้วย 6 กลุ่มฟังก์ชัน:

  1. 📅 Date Utilities (12 ฟังก์ชัน, 340 บรรทัด)
     → formatDate, parseDate, getRelativeTime, ...

  2. 💰 Currency/Price (8 ฟังก์ชัน, 210 บรรทัด)
     → formatPrice, calculateDiscount, convertCurrency, ...

  3. ✅ Validation (15 ฟังก์ชัน, 420 บรรทัด)
     → isValidEmail, isValidPhone, isStrongPassword, ...

  4. 🔤 String Manipulation (10 ฟังก์ชัน, 280 บรรทัด)
     → slugify, truncate, capitalize, sanitizeHtml, ...

  5. 📦 Object/Array Helpers (9 ฟังก์ชัน, 350 บรรทัด)
     → deepClone, pick, omit, groupBy, chunk, ...

  6. 🔒 Crypto/Auth (6 ฟังก์ชัน, 290 บรรทัด)
     → hashPassword, generateToken, encryptData, ...

  ไฟล์ที่ต้องแก้ไข import: 47 ไฟล์
  Tests ที่มีอยู่: 89 tests

  📋 แผน:
  1. สร้าง 6 ไฟล์ใหม่ใน src/utils/
  2. ย้ายฟังก์ชันไปไฟล์ที่เหมาะสม
  3. สร้าง src/utils/index.ts ที่ re-export ทั้งหมด (Backward Compatible)
  4. อัปเดต import ใน 47 ไฟล์ (ชี้ไปที่ Module เฉพาะ)
  5. รัน Test ยืนยันว่าไม่มีอะไรพัง
  6. ลบ src/utils.ts เดิม

  เริ่มเลยไหมครับ?
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: ให้ Claude ทำงาน (Auto Mode)                     │
└─────────────────────────────────────────────────────────────────┘

คุณ: เริ่มเลย

  [กด Shift+Tab → สลับเป็น auto]

Claude: เริ่มรีแฟคเตอร์...

  ━━━ สร้าง Module ใหม่ ━━━
  📝 src/utils/date.ts ✓ (12 ฟังก์ชัน)
  📝 src/utils/currency.ts ✓ (8 ฟังก์ชัน)
  📝 src/utils/validation.ts ✓ (15 ฟังก์ชัน)
  📝 src/utils/string.ts ✓ (10 ฟังก์ชัน)
  📝 src/utils/collection.ts ✓ (9 ฟังก์ชัน)
  📝 src/utils/crypto.ts ✓ (6 ฟังก์ชัน)
  📝 src/utils/index.ts ✓ (Re-export ทั้งหมด)

  ━━━ อัปเดต Imports (47 ไฟล์) ━━━
  📝 src/controllers/user.controller.ts ✓
  📝 src/controllers/product.controller.ts ✓
  📝 src/controllers/order.controller.ts ✓
  ... (44 ไฟล์เพิ่มเติม)
  📝 47/47 ไฟล์อัปเดตเรียบร้อย ✓

  ━━━ ลบไฟล์เดิม ━━━
  🗑️ src/utils.ts ✓

  ━━━ รัน Tests ━━━
  [รัน Bash: npm test]

  ✅ Tests: 89 passed, 0 failed
  ✅ TypeScript: No errors
  ✅ Lint: No errors

  สรุป: สร้าง 7 ไฟล์, แก้ 47 ไฟล์, ลบ 1 ไฟล์
  ฟังก์ชันทั้งหมด 60 ฟังก์ชันย้ายสำเร็จ
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: ตรวจสอบและ Commit                                │
└─────────────────────────────────────────────────────────────────┘

คุณ: /simplify

Claude: ตรวจสอบโค้ดที่รีแฟคเตอร์...

  ✅ ไม่พบฟังก์ชันที่ซ้ำซ้อน
  ✅ Imports ถูกต้องทั้งหมด
  ✅ ไม่มี Circular Dependencies
  ⚠️ src/utils/collection.ts: groupBy() และ chunk() สามารถใช้ lodash แทนได้
     → แนะนำ: คงไว้ก่อน ค่อย Migrate ทีหลัง (ไม่ต้องแก้ตอนนี้)

คุณ: /commit

Claude: Commit Message:
  "refactor: split monolithic utils.ts into 6 focused modules

   Split 2,147-line utils.ts into date, currency, validation, string,
   collection, and crypto modules. Updated imports across 47 files.
   All 89 existing tests pass without modification."

  ✅ Committed
```

**สรุป Flow:** วิเคราะห์ → สร้าง 7 Module → อัปเดต 47 ไฟล์ → Test 89 ข้อผ่าน → Commit  
**เวลาที่ใช้:** ~10 นาที (ปกติใช้ 4-8 ชั่วโมง)

---

### Flow 5: ใช้ Agent Teams รีวิว PR ขนาดใหญ่

> **สถานการณ์:** เพื่อนร่วมทีมส่ง PR ที่แก้ไข 45 ไฟล์ เปลี่ยนระบบ Payment ทั้งหมด ต้องรีวิวอย่างละเอียด

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: สร้าง Agent Team สำหรับรีวิว                      │
└─────────────────────────────────────────────────────────────────┘

$ claude

คุณ: รีวิว PR #156 ที่แก้ไขระบบ Payment
     สร้าง Agent Team 3 คนให้รีวิวพร้อมกัน:
     - คนที่ 1: ตรวจ Security (Payment Data, PCI Compliance)
     - คนที่ 2: ตรวจ Business Logic (Pricing, Tax, Refund)
     - คนที่ 3: ตรวจ Test Coverage + Error Handling
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: Agent Teams ทำงานพร้อมกัน                        │
└─────────────────────────────────────────────────────────────────┘

Claude: สร้าง Agent Team เรียบร้อย กำลังรีวิว PR #156...

  ┌─ Agent "Security" ──────────────────────────┐
  │ กำลังตรวจ: Payment Data Flow, PCI, Secrets  │
  │ สถานะ: กำลังอ่าน 15/45 ไฟล์...              │
  └─────────────────────────────────────────────┘

  ┌─ Agent "Business Logic" ────────────────────┐
  │ กำลังตรวจ: Pricing, Tax, Discount, Refund   │
  │ สถานะ: กำลังอ่าน 22/45 ไฟล์...              │
  └─────────────────────────────────────────────┘

  ┌─ Agent "Quality" ───────────────────────────┐
  │ กำลังตรวจ: Tests, Error Handling, Edge Cases│
  │ สถานะ: กำลังอ่าน 8/45 ไฟล์...               │
  └─────────────────────────────────────────────┘

  ... (5 นาทีผ่านไป) ...
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: รับรายงานจากทุก Agent                             │
└─────────────────────────────────────────────────────────────────┘

Claude: ✅ รีวิวเสร็จแล้ว สรุปจาก 3 Agents:

  ═══ 🔒 Security Agent ═══

  🔴 Critical (1):
  - payment.service.ts:89 — Credit Card Number ถูก Log ลง Console
    ต้องลบ console.log(cardNumber) ออกก่อน Merge

  🟡 Warning (2):
  - stripe.adapter.ts:34 — Webhook Secret ควรอยู่ใน ENV ไม่ใช่ Hardcode
  - refund.service.ts:67 — ไม่มี Rate Limiting สำหรับ Refund API

  ✅ Pass:
  - ✓ ไม่มี SQL Injection
  - ✓ Input Validation ครบทุก Endpoint
  - ✓ PCI Data ไม่ถูกเก็บใน Database

  ═══ 💼 Business Logic Agent ═══

  🔴 Critical (1):
  - tax.calculator.ts:120 — Tax Calculation สำหรับ EU ผิด
    ใช้ VAT Rate ของ US แทน EU (15% แทน 20-27%)

  🟡 Warning (1):
  - discount.service.ts:45 — Discount + Coupon ไม่มี Maximum Cap
    อาจทำให้ราคาติดลบได้

  ✅ Pass:
  - ✓ Pricing Logic ถูกต้องสำหรับ US/UK
  - ✓ Refund Logic ถูกต้อง
  - ✓ Currency Conversion ใช้ Real-time Rate

  ═══ ✅ Quality Agent ═══

  🟡 Warning (2):
  - Test Coverage: 72% (ต่ำกว่ามาตรฐาน 80%)
    ขาด Test สำหรับ: EU Tax, Partial Refund, Currency Edge Cases
  - payment.controller.ts — catch block แค่ log ไม่ได้ส่ง Error กลับ Client

  ✅ Pass:
  - ✓ Happy Path Tests ครบ
  - ✓ Stripe Mock ถูกต้อง
  - ✓ Transaction Rollback Tests มี

  ═══════════════════════════════════════

  📊 สรุปรวม:
  🔴 Critical: 2 (ต้องแก้ก่อน Merge)
  🟡 Warning: 5 (แนะนำให้แก้)
  ✅ Pass: 9

  จะ Comment ใน PR #156 ให้เลยไหมครับ?

คุณ: Comment เลย

Claude: ✅ Comment ใน PR #156 เรียบร้อย
```

**สรุป Flow:** สร้าง 3 Agent Teams → รีวิว 45 ไฟล์พร้อมกัน → รายงานรวม → Comment ใน PR  
**เวลาที่ใช้:** ~5 นาที (ปกติใช้ 2-3 ชั่วโมงรีวิวคนเดียว)

---

### Flow 6: Debug ปัญหา Production ด้วย Log Analysis

> **สถานการณ์:** เว็บไซต์ช้าลงตั้งแต่เช้า Response Time เพิ่มจาก 200ms เป็น 2s ต้องหาสาเหตุด่วน

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 1: ส่ง Log ให้ Claude วิเคราะห์                      │
└─────────────────────────────────────────────────────────────────┘

$ cat /var/log/app/error.log | tail -500 | claude -p "
  เว็บไซต์ช้ามากตั้งแต่เช้า Response Time เพิ่มจาก 200ms เป็น 2s
  วิเคราะห์ Log นี้หาสาเหตุ
"
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 2: Claude วิเคราะห์และระบุสาเหตุ                    │
└─────────────────────────────────────────────────────────────────┘

Claude:
  🔍 ผลการวิเคราะห์ Log 500 บรรทัดล่าสุด:

  📊 Pattern ที่พบ:
  1. [08:15:03] "SLOW QUERY: SELECT * FROM products WHERE ... — 1,847ms"
     → Query นี้ซ้ำ 342 ครั้งใน 1 ชั่วโมง
  2. [08:15:03] "Redis connection timeout" — 28 ครั้ง
  3. [08:22:45] "Pool exhausted, waiting for connection" — 156 ครั้ง

  🎯 สาเหตุ (เรียงตามความเป็นไปได้):

  1. 🔴 N+1 Query ใน Product Listing (90% น่าจะเป็นสาเหตุหลัก)
     - Query "SELECT * FROM products WHERE category_id = ?" รัน 342 ครั้ง
     - ควรเป็น 1 Query ด้วย JOIN หรือ WHERE IN
     - ทำให้ Connection Pool เต็ม → Request อื่นต้องรอ

  2. 🟡 Redis Connection Timeout (อาจเป็นผลพลอย)
     - Cache Miss ทำให้ทุก Request ไป Database → ยิ่งช้า

  3. 🟡 ไม่มี Index บน products.category_id
     - Query ใช้ Full Table Scan

  💡 วิธีแก้ด่วน:
  1. เพิ่ม Index บน products.category_id (แก้ได้ทันที)
  2. แก้ N+1 Query ใน product.repository.ts (ใช้เวลา 10 นาที)
  3. ตรวจสอบ Redis Connection (อาจเป็นเรื่อง Memory)
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ขั้นตอนที่ 3: เปิด Claude Interactive แก้ไข                    │
└─────────────────────────────────────────────────────────────────┘

$ claude -c

คุณ: แก้ N+1 Query และเพิ่ม Index ให้หน่อย ด่วน

Claude:
  [อ่าน src/repositories/product.repository.ts]

  พบแล้ว! บรรทัด 78:

  ❌ โค้ดเดิม (N+1 Query):
  async getByCategory(categoryId: string) {
    const products = await this.find({ categoryId });
    for (const product of products) {
      product.reviews = await this.reviewRepo.find({ productId: product.id });
      //                ^^^^^^^^ Query ใน Loop! ← สาเหตุ
    }
  }

  ✅ โค้ดใหม่ (1 Query):
  async getByCategory(categoryId: string) {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'review')
      .where('product.categoryId = :categoryId', { categoryId })
      .getMany();
  }

  📝 แก้ไข product.repository.ts ✓
  📝 สร้าง Migration: AddIndexOnProductCategoryId ✓
  📝 รัน Tests → 89 passed ✓

คุณ: /commit

Claude: "fix: resolve N+1 query in product listing causing 2s response time

   Replace loop-based review loading with JOIN query.
   Add index on products.category_id for faster lookups.
   Reduces product listing from ~1,800ms to ~50ms."

  ✅ Committed + Pushed
```

**สรุป Flow:** Pipe Log → Claude วิเคราะห์ → ระบุ N+1 Query → แก้ไข → Commit + Push  
**เวลาที่ใช้:** ~8 นาที (ปกติใช้ 1-3 ชั่วโมง Debug)

---

### Flow 7: ทำงานประจำวันแบบเต็มวัน (Daily Workflow)

> **สถานการณ์:** จำลองการทำงาน 1 วันเต็มของนักพัฒนาที่ใช้ Claude Code

```
┌──────────────────────────────────────────────────────────────────────┐
│  🌅 09:00 — เปิดคอมพิวเตอร์ เริ่มงาน                                │
└──────────────────────────────────────────────────────────────────────┘

$ cd ~/projects/ecommerce-api
$ claude -c                           ← ต่อเซสชันเมื่อวาน

Claude: สวัสดีครับ! เมื่อวานเราแก้ Bug Order Duplication ไปแล้ว
  วันนี้มีอะไรให้ช่วยครับ?            ← Claude จำได้เพราะ Session + Memory

คุณ: วันนี้ต้องทำ 3 อย่าง:
     1. แก้ Bug ที่ QA รายงาน — Cart ลบสินค้าไม่ได้
     2. สร้างฟีเจอร์ Export Order เป็น CSV
     3. รีวิว PR #160 ของน้องในทีม

┌──────────────────────────────────────────────────────────────────────┐
│  🐛 09:15 — แก้ Bug Cart                                            │
└──────────────────────────────────────────────────────────────────────┘

คุณ: เริ่มจาก Bug Cart ก่อน — QA บอกว่ากดลบสินค้าใน Cart แล้ว
     ไม่หายจากหน้าจอ แต่ Refresh แล้วหาย

Claude: น่าจะเป็นปัญหา API ส่ง Response ไม่ถูกต้อง ให้ผมดูนะครับ...

  [อ่าน src/controllers/cart.controller.ts]
  [อ่าน src/services/cart.service.ts]

  พบแล้วครับ! cart.controller.ts:67
  DELETE endpoint ส่ง Status 200 แต่ไม่ส่ง Updated Cart กลับไป
  Frontend จึงไม่รู้ว่าต้องอัปเดต State

  📝 แก้ไข → ส่ง Updated Cart ใน Response Body ✓
  📝 เขียน Test ✓
  📝 รัน Tests → Passed ✓

คุณ: /commit
Claude: ✅ Committed: "fix: return updated cart after item deletion"

┌──────────────────────────────────────────────────────────────────────┐
│  🆕 10:00 — สร้างฟีเจอร์ Export CSV                                 │
└──────────────────────────────────────────────────────────────────────┘

คุณ: ต่อ — สร้าง API Export Order เป็น CSV
     - Admin เท่านั้นที่ใช้ได้
     - Filter ตาม Date Range
     - รองรับ 100,000+ Orders

  [กด Cmd+T → เปิด Extended Thinking]

Claude: (Extended Thinking: วิเคราะห์ว่าต้อง Stream CSV
  เพราะ 100K records ไม่ควรโหลดทั้งหมดลง Memory...)

  📋 แผน:
  1. สร้าง GET /api/admin/orders/export?from=&to=&format=csv
  2. ใช้ Stream Response (ไม่โหลดทั้งหมดลง Memory)
  3. Query แบบ Cursor Pagination
  4. Admin Auth Middleware
  5. Tests

  📝 สร้าง src/services/order-export.service.ts ✓
  📝 สร้าง src/controllers/admin/order-export.controller.ts ✓
  📝 แก้ไข src/routes/admin.routes.ts ✓
  📝 สร้าง Tests (4 cases) ✓
  📝 รัน Tests → Passed ✓

คุณ: /commit
Claude: ✅ Committed: "feat: add CSV export for orders with streaming support"

┌──────────────────────────────────────────────────────────────────────┐
│  🔍 11:00 — รีวิว PR ของน้องในทีม                                   │
└──────────────────────────────────────────────────────────────────────┘

คุณ: รีวิว PR #160 ของน้องเค ที่เพิ่มระบบ Coupon

Claude: กำลังรีวิว PR #160...

  [อ่าน PR Diff — 12 ไฟล์, +450/-23 บรรทัด]

  📋 Review Summary:

  ✅ ดีมาก:
  - Coupon Model Design ดี มี expiry, usage limit, minimum order
  - Tests ครอบคลุม 12 cases
  - ใช้ Transaction สำหรับ Coupon Redemption

  ⚠️ ควรแก้:
  1. coupon.service.ts:34 — Race Condition: ถ้า 2 คนใช้ Coupon เดียวกัน
     พร้อมกัน usage_count อาจผิด → แนะนำใช้ Database-level Atomic Increment
  2. coupon.validator.ts:12 — Discount Percentage ไม่มี Max Cap
     ใส่ discount: 200 ได้ → ราคาติดลบ

  💡 เล็กน้อย:
  3. coupon.routes.ts:8 — ขาด Rate Limiting สำหรับ POST /coupons/apply

  จะ Comment ใน PR ให้เลยไหมครับ?

คุณ: Comment เลย แล้วก็แนะนำโค้ดที่ควรแก้ด้วย

Claude: ✅ Comment ใน PR #160 เรียบร้อย
  → แนบ Code Suggestion สำหรับทั้ง 3 ข้อ

┌──────────────────────────────────────────────────────────────────────┐
│  🍔 12:00 — พักเที่ยง                                               │
└──────────────────────────────────────────────────────────────────────┘

  [ปิดเครื่อง / ปล่อยไว้]

┌──────────────────────────────────────────────────────────────────────┐
│  ☕ 13:00 — กลับมาทำงานต่อ                                          │
└──────────────────────────────────────────────────────────────────────┘

$ claude -c                           ← ต่อเซสชัน Claude จำทุกอย่าง

Claude: กลับมาแล้วครับ! เช้านี้ทำ 2 ข้อเสร็จแล้ว:
  ✅ Bug Cart — committed
  ✅ Export CSV — committed
  ✅ PR #160 Review — commented

  เหลืออะไรอีกครับ?

┌──────────────────────────────────────────────────────────────────────┐
│  📝 13:30 — เขียน Test เพิ่มตามที่ Tech Lead ขอ                     │
└──────────────────────────────────────────────────────────────────────┘

คุณ: Tech Lead ขอให้เพิ่ม Integration Test สำหรับ Payment Flow ทั้งหมด
     ตอนนี้มีแค่ Unit Test

Claude: เข้าใจครับ ให้ผมดูว่า Payment Flow มีอะไรบ้าง...

  [สำรวจ Payment-related files]

  Payment Flow ที่ต้อง Test:
  1. Create Order → Process Payment → Confirm Order
  2. Create Order → Payment Failed → Order Cancelled
  3. Create Order → Payment → Partial Refund
  4. Create Order → Payment → Full Refund
  5. Create Order → Payment → Dispute → Refund

  📝 สร้าง src/__tests__/integration/payment-flow.test.ts ✓
  📝 สร้าง src/__tests__/integration/helpers/payment-mock.ts ✓
  📝 5 Integration Tests เขียนเสร็จ
  📝 รัน Tests → 5 passed ✓

คุณ: /commit
Claude: ✅ Committed: "test: add integration tests for complete payment flow"

┌──────────────────────────────────────────────────────────────────────┐
│  📊 15:00 — สร้าง PR รวมงานทั้งวัน                                  │
└──────────────────────────────────────────────────────────────────────┘

คุณ: /pr

Claude: สร้าง PR สำหรับงานวันนี้...

  Branch: feature/daily-improvements-apr-16
  PR #161: "Fix cart deletion, add CSV export, payment integration tests"

  ## Summary
  - Fix: Cart item deletion now returns updated cart
  - Feat: Admin CSV export for orders (streaming, 100K+ support)
  - Test: 5 integration tests for complete payment flow

  ## Changes
  - 8 files changed, +680 lines, -12 lines
  - 3 commits

  ✅ PR #161 สร้างเรียบร้อย

┌──────────────────────────────────────────────────────────────────────┐
│  🔄 16:00 — ตั้ง Scheduled Task สำหรับพรุ่งนี้                       │
└──────────────────────────────────────────────────────────────────────┘

คุณ: ตั้ง Schedule ให้ Claude ตรวจ Error Log ทุกเช้า 8:00
     แล้วสรุปให้ผมถ้ามีอะไรผิดปกติ

Claude: ✅ สร้าง Scheduled Task เรียบร้อย
  → ทุกวัน 08:00 จะวิเคราะห์ Error Log แล้วสรุปให้

┌──────────────────────────────────────────────────────────────────────┐
│  🌙 17:00 — จบวัน                                                   │
└──────────────────────────────────────────────────────────────────────┘

คุณ: จบวัน สรุปงานวันนี้ให้หน่อย

Claude: 📊 สรุปงานวันนี้:

  ✅ งานที่เสร็จ:
  1. 🐛 แก้ Bug Cart Deletion — PR #161 (10 นาที)
  2. 🆕 สร้างฟีเจอร์ Export CSV — PR #161 (30 นาที)
  3. 🔍 รีวิว PR #160 Coupon System — Commented (15 นาที)
  4. 📝 เขียน Integration Tests — PR #161 (20 นาที)
  5. ⏰ ตั้ง Daily Error Log Check — Scheduled

  📈 สถิติ:
  - Commits: 3
  - ไฟล์สร้างใหม่: 5
  - ไฟล์แก้ไข: 6
  - Tests เขียนใหม่: 11
  - PR สร้าง: 1
  - PR รีวิว: 1

  พรุ่งนี้เจอกันครับ! 👋
```

**สรุป Daily Workflow:**

| เวลา | งาน | เวลาจริง | เวลาปกติ (ไม่มี Claude) |
|------|-----|---------|------------------------|
| 09:15 | แก้ Bug Cart | 10 นาที | 1 ชั่วโมง |
| 10:00 | สร้างฟีเจอร์ CSV Export | 30 นาที | 3-4 ชั่วโมง |
| 11:00 | รีวิว PR #160 | 15 นาที | 1-2 ชั่วโมง |
| 13:30 | เขียน Integration Tests | 20 นาที | 2-3 ชั่วโมง |
| 15:00 | สร้าง PR | 2 นาที | 15 นาที |
| **รวม** | | **~1.5 ชั่วโมง** | **~8-10 ชั่วโมง** |

---

### Flow 8: CI/CD Pipeline ด้วย Headless Mode

> **สถานการณ์:** ต้องการให้ Claude Code รีวิวโค้ดอัตโนมัติทุก PR และสร้าง Release Notes ทุก Release

```
┌─────────────────────────────────────────────────────────────────┐
│  ไฟล์ .github/workflows/ai-review.yml                           │
└─────────────────────────────────────────────────────────────────┘

name: AI Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: curl -fsSL https://claude.ai/install.sh | bash

      - name: AI Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # ดึง Diff ของ PR
          DIFF=$(git diff origin/main...HEAD)

          # ส่งให้ Claude วิเคราะห์
          REVIEW=$(echo "$DIFF" | claude --bare -p "
            รีวิวโค้ดนี้:
            1. หา Bug และ Security Issues
            2. ตรวจ Performance Problems
            3. ให้คะแนน 1-10
            4. สรุปเป็น Markdown

            ตอบเป็น JSON format:
            {score, bugs, security, performance, summary}
          " --output-format json \
            --allowedTools "Read" \
            --max-turns 5 \
            --model sonnet)

          # Post Comment ใน PR
          echo "$REVIEW" | jq -r '.result.summary' | \
            gh pr comment ${{ github.event.pull_request.number }} --body -

      - name: Block if Critical Issues
        run: |
          SCORE=$(echo "$REVIEW" | jq -r '.result.score')
          if [ "$SCORE" -lt 5 ]; then
            echo "❌ AI Review Score: $SCORE/10 — ต้องแก้ไขก่อน Merge"
            exit 1
          fi
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ไฟล์ .github/workflows/release-notes.yml                       │
└─────────────────────────────────────────────────────────────────┘

name: Auto Release Notes
on:
  release:
    types: [created]

jobs:
  generate-notes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate Release Notes
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # ดึง Commits ตั้งแต่ Release ก่อนหน้า
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD~1 2>/dev/null || echo "")
          COMMITS=$(git log ${PREV_TAG}..HEAD --oneline)

          # ให้ Claude สร้าง Release Notes
          NOTES=$(echo "$COMMITS" | claude --bare -p "
            สร้าง Release Notes จาก commit list นี้
            แบ่งเป็นหมวด: Features, Bug Fixes, Improvements, Breaking Changes
            ใช้ภาษาอังกฤษ เขียนให้ User เข้าใจ (ไม่ใช่ Developer)
            Format: Markdown
          " --model sonnet --max-turns 3)

          # อัปเดต Release Notes
          gh release edit ${{ github.event.release.tag_name }} \
            --notes "$NOTES"
```

**ผลลัพธ์:**
- ทุก PR ถูกรีวิวโดย AI อัตโนมัติ + ได้คะแนน
- PR ที่คะแนนต่ำกว่า 5 ถูกบล็อกไม่ให้ Merge
- ทุก Release มี Release Notes สวยงามอัตโนมัติ
- ทีมไม่ต้องทำ Manual Review/Notes อีกต่อไป

---

### สรุปเปรียบเทียบ: ก่อน vs หลังใช้ Claude Code

| งาน | ก่อน (ทำเอง) | หลัง (Claude Code) | ประหยัดเวลา |
|-----|-------------|-------------------|------------|
| Onboarding โปรเจกต์ใหม่ | 1-2 วัน | 10 นาที | 95% |
| แก้ Bug ทั่วไป | 1-3 ชม. | 10-15 นาที | 85% |
| สร้างฟีเจอร์ใหม่ (CRUD) | 4-8 ชม. | 20-30 นาที | 90% |
| รีแฟคเตอร์ไฟล์ใหญ่ | 4-8 ชม. | 10 นาที | 95% |
| Code Review PR ใหญ่ | 1-3 ชม. | 5 นาที | 90% |
| Debug Production Issue | 1-3 ชม. | 8 นาที | 90% |
| เขียน Tests | 2-4 ชม. | 15-20 นาที | 85% |
| สร้าง PR + Description | 15-30 นาที | 1-2 นาที | 90% |
| CI/CD Review อัตโนมัติ | Manual ทุก PR | อัตโนมัติ 100% | 100% |
| **รวมต่อวัน** | **8-10 ชม.** | **~1.5 ชม.** | **~85%** |

---

## สรุป

Claude Code เป็นเครื่องมือ AI สำหรับนักพัฒนาที่มีฟีเจอร์ครบครัน:

- **CLI ที่ทรงพลัง** - 50+ คำสั่งและ Flags
- **ระบบ Permission** - จาก Read-only ถึง Full Autonomous
- **ขยายได้** - ผ่าน Skills, Hooks, Subagents, MCP, Plugins
- **Context ถาวร** - CLAUDE.md และ Auto Memory
- **ทำงานคู่ขนาน** - Agent Teams และ Worktrees
- **รองรับทุกแพลตฟอร์ม** - Terminal, Desktop, VS Code, JetBrains, Web, Mobile
- **ตั้งเวลาได้** - Scheduled Tasks และ Cloud Routines
- **Git Integration** - PR, Commit, Review ในตัว
- **ปลอดภัย** - Sandboxing, Permissions, Protected Paths
- **Code Intelligence** - ตรวจสอบ Type/Error แบบ Real-time

---

> **เวอร์ชันเอกสาร:** ปรับปรุงล่าสุด 15 เมษายน 2026  
> **ใช้กับ:** Claude Code เวอร์ชันล่าสุด (Claude Opus 4.6 / Sonnet 4.6 / Haiku 4.5)
