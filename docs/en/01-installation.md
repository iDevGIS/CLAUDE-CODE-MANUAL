---
title: "Installation and Getting Started"
section: 1
lang: en
tags:
  - claude-code
  - installation
  - setup
aliases:
  - "Installation"
related:
  - "[[02-cli-commands]]"
  - "[[06-configuration]]"
---

# Installation and Getting Started

### Benefits and Use Cases

> **Why use Claude Code?**
>
> Claude Code completely transforms the way software developers work. Instead of writing every line of code yourself, searching Stack Overflow, asking ChatGPT, then copy-pasting back, Claude Code works **directly inside your project**. It can read files, edit code, run commands, and manage Git just like a teammate sitting next to you.

**Main Use Cases:**

| Scenario | Example Usage |
|----------|---------------|
| **New developers** | Joining a new project: have Claude explain the code structure, teach build steps, explain complex functions |
| **Urgent bug fixes** | Paste an error message and let Claude find the cause and fix the code |
| **Writing new features** | Describe what you need and Claude will create files, write code, and write tests in full |
| **Refactoring legacy code** | Have Claude analyze redundant code and clean it up |
| **Writing tests** | Have Claude read your code and write unit tests / integration tests |
| **Code review** | Have Claude review PRs to find bugs, security issues, and performance problems |
| **Generating documentation** | Have Claude read the code and write docs automatically |
| **Code conversion** | Migrate JavaScript to TypeScript, REST to GraphQL, classes to functional components |
| **DevOps** | Write Dockerfiles, CI/CD pipelines, and Infrastructure as Code |
| **Learning new technologies** | Ask Claude about frameworks/libraries you haven't used, with real examples from your project |

### Installation

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

### Getting Started

```bash
# Enter your project directory
cd your-project

# Start Claude Code
claude

# Log in (first time)
claude auth login

# Log in with an API key from the Anthropic Console
claude auth login --console

# Check authentication status
claude auth status
```

### Supported Platforms

| Platform | Details |
|----------|---------|
| Terminal CLI | Most fully featured |
| VS Code Extension | Use directly within VS Code |
| JetBrains IDEs | IntelliJ, PyCharm, WebStorm, etc. |
| Desktop App | macOS, Windows |
| Web | claude.ai/code |
| iOS App | Use on mobile |
| Slack Integration | Use through Slack |
| GitHub Actions / GitLab CI | Use in CI/CD pipelines |

---

---

## Navigation

- ➡️ Next: [[02-cli-commands]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/01-installation]]
