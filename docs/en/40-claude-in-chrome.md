---
title: "Claude in Chrome (Browser Automation)"
section: 40
lang: en
tags:
  - claude-code
  - chrome
  - browser
  - automation
  - deep-dive
aliases:
  - "Claude in Chrome"
  - "Browser Automation"
related:
  - "[[21-special-features]]"
  - "[[03-slash-commands]]"
  - "[[32-security-best-practices]]"
  - "[[39-dynamic-workflows]]"
---

# Claude in Chrome (Browser Automation)

> **Goal:** Let Claude open websites, read pages, click, fill forms, and debug the frontend — all in the same session where it edits your code.

### What Is Claude in Chrome?

Claude in Chrome connects Claude Code to **your real Google Chrome** via a Chrome extension — after editing code, Claude can "open the browser and check the result itself" instead of you switching windows to click through manually. The loop of edit code → open the page → read the error → fix again all happens in one session.

> **Status: Generally Available (GA)** since Claude Code **v2.1.198** — previously in preview.

### Setup

1. **Install the Claude Chrome extension** in Google Chrome — find the download link in the official docs: <https://docs.claude.com/claude-code>
2. **Sign the extension in with the SAME account** you use for your Claude Code login — same account is required (earlier versions could fail silently when the extension's account differed from the CLI; that has been fixed, but the same-account rule still applies).
3. In the CLI, run `/chrome` to **pick which browser/profile Claude in Chrome uses**.
4. Alternatively, launch Claude Code with the `--chrome` flag.

```
/chrome
```

> For organizations that need to control usage (enterprise policies), see the official docs: <https://docs.claude.com/claude-code>

### Capabilities

| Capability | Description |
|-----------|-------------|
| **Navigate to URLs** | Go to any page, e.g. your project's dev server |
| **Read page content** | Read the page's text/content and use it in the session |
| **Find elements** | Locate buttons, links, and inputs on the page |
| **Click & type** | Click elements and type text like a real user |
| **Fill forms** | Fill multi-field forms automatically |
| **Screenshots** | Capture the page for you to see |
| **Read console** | Read the browser's console messages — great for debugging frontend errors |
| **Read network** | Read network requests — see which API calls fail and with what status |
| **Manage tabs** | Open/close/switch tabs |
| **Record GIFs** | Record short GIFs of interactions, handy for reports or PRs |

### Real Use Cases

- **Verify a UI change right after editing code** — let Claude open the dev server and click through the flow itself:

  ```text
  Open http://localhost:3000 and try submitting the sign-up form.
  Tell me what errors appear in the console.
  ```

- **Reproduce a bug a user reported** — Claude follows the same steps and collects evidence from console/network:

  ```text
  A user says the page freezes after clicking Checkout — open http://localhost:3000/cart,
  follow the same steps, and check the network requests for anything hanging or failing.
  ```

- **Fill repetitive test forms** — tedious work Claude can do for you:

  ```text
  Fill the registration form at http://localhost:3000/register with 5 sets of test data,
  then summarize which sets pass/fail validation and why.
  ```

- **Read docs/dashboards that need a logged-in browser** — reuse a browser that's already signed in, instead of session-less fetching:

  ```text
  Open the monitoring dashboard tab that's already logged in
  and summarize which services have an abnormally high error rate.
  ```

- **Debug "works on my machine" issues** — read console + network from a real browser instead of guessing:

  ```text
  Open the /profile page and read the console and network requests.
  Check which asset or API is returning 404 or a CORS error.
  ```

### Safety

> **⚠️ Driving a browser with AI calls for extra care**
>
> - Every browser action goes through the **same permission prompts as other tools** — read what Claude is about to click or fill before approving.
> - Treat links from emails or unknown pages as **suspicious by default**.
> - **Don't let it operate on sensitive accounts** — banking, finance, anything tied to payments.
> - Prefer a **separate Chrome profile** dedicated to automation, not your personal one.
> - Concurrent sessions are fine — each session's browsing is **isolated in its own tab group**.

For the full security playbook, see [[32-security-best-practices]].

---

---

## Navigation

- ⬅️ Previous: [[39-dynamic-workflows]]
- ➡️ Next: [[41-background-agents]]
- 🏠 Index: [[README]]
- 🌐 Other language: [[../th/40-claude-in-chrome]]
