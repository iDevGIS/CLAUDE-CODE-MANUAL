"""
Generate mockup terminal screenshots for the ProjectEx walkthrough.

Outputs 6 PNGs into ../screenshots/.
Each screenshot mimics a terminal window with a Claude Code session at a
specific step of the Todo CLI tutorial.
"""

from __future__ import annotations
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import os

# ---------- styling ----------
W, H = 1280, 760
PAD = 24
TITLEBAR_H = 36
LINE_H = 22
FONT_SIZE = 16

BG = (24, 24, 28)
TITLEBAR = (40, 40, 48)
FG = (220, 220, 220)
DIM = (140, 140, 150)
GREEN = (120, 220, 130)
CYAN = (110, 200, 230)
YELLOW = (240, 210, 110)
MAGENTA = (210, 130, 220)
RED = (240, 110, 110)
BLUE = (120, 160, 240)
GREY = (160, 160, 170)
ADD = (90, 200, 110)
DEL = (220, 100, 100)

# pick a monospace font that exists on Windows
FONT_CANDIDATES = [
    "C:/Windows/Fonts/consola.ttf",
    "C:/Windows/Fonts/cour.ttf",
    "C:/Windows/Fonts/lucon.ttf",
]
FONT_BOLD_CANDIDATES = [
    "C:/Windows/Fonts/consolab.ttf",
    "C:/Windows/Fonts/courbd.ttf",
]


def _pick(paths):
    for p in paths:
        if os.path.exists(p):
            return p
    return None


FONT_PATH = _pick(FONT_CANDIDATES)
FONT_BOLD = _pick(FONT_BOLD_CANDIDATES) or FONT_PATH


def _font(size=FONT_SIZE, bold=False):
    path = FONT_BOLD if bold else FONT_PATH
    if path:
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def new_canvas(title="Terminal — claude"):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # title bar
    d.rectangle([0, 0, W, TITLEBAR_H], fill=TITLEBAR)
    # traffic-light dots
    d.ellipse([12, 11, 26, 25], fill=(255, 95, 86))
    d.ellipse([34, 11, 48, 25], fill=(255, 189, 46))
    d.ellipse([56, 11, 70, 25], fill=(39, 201, 63))
    d.text((W / 2 - 80, 9), title, fill=DIM, font=_font(14))
    return img, d


def draw_lines(d, lines, x=PAD, y_start=TITLEBAR_H + PAD, line_h=LINE_H):
    """lines: list of (text, color, bold). text may be None for blank line."""
    y = y_start
    for entry in lines:
        if entry is None or (isinstance(entry, tuple) and entry[0] is None):
            y += line_h
            continue
        text, color, bold = entry if len(entry) == 3 else (entry[0], entry[1], False)
        d.text((x, y), text, fill=color, font=_font(FONT_SIZE, bold=bold))
        y += line_h
    return y


def save(img, name):
    out = Path(__file__).resolve().parent.parent / "screenshots" / name
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out)
    print(f"  wrote {out}")


# ---------- screenshot 1: claude start ----------
def shot_01_start():
    img, d = new_canvas("Terminal — todo-app")
    lines = [
        ("$ cd todo-app", FG, False),
        ("$ claude", FG, False),
        (None, None, False),
        ("  ╭──────────────────────────────────────────────────────────╮", MAGENTA, False),
        ("  │  ✻ Welcome to Claude Code v2.1.114                       │", MAGENTA, False),
        ("  │                                                          │", MAGENTA, False),
        ("  │     /help for help, /status for your account             │", MAGENTA, False),
        ("  │                                                          │", MAGENTA, False),
        ("  │     cwd: D:\\…\\ProjectEx\\todo-app                        │", MAGENTA, False),
        ("  ╰──────────────────────────────────────────────────────────╯", MAGENTA, False),
        (None, None, False),
        (" Tip: Use Plan Mode (Shift+Tab) for multi-file changes.", DIM, False),
        (None, None, False),
        ("  Loaded CLAUDE.md — 18 lines, 3 sections", CYAN, False),
        ("  No previous session in this directory.", DIM, False),
        (None, None, False),
        ("> _", FG, True),
    ]
    draw_lines(d, lines)
    save(img, "01-claude-start.png")


# ---------- screenshot 2: CLAUDE.md being edited ----------
def shot_02_claude_md():
    img, d = new_canvas("Terminal — claude")
    lines = [
        ("> add a CLAUDE.md that describes our project conventions", FG, True),
        (None, None, False),
        ("  ⏺ I'll create CLAUDE.md based on what I see in the project.", CYAN, False),
        (None, None, False),
        ("  Write(CLAUDE.md)", YELLOW, True),
        ("  ┌─────────────────────────────────────────────────────────┐", DIM, False),
        ("  │ # Todo CLI — Project Instructions                       │", FG, False),
        ("  │                                                         │", FG, False),
        ("  │ ## Project context                                      │", FG, False),
        ("  │ - Stack: Node.js (no deps), node --test                 │", FG, False),
        ("  │ - Entry: index.js  Core: lib/todo.js                    │", FG, False),
        ("  │ - Storage: todos.json (gitignored)                      │", FG, False),
        ("  │                                                         │", FG, False),
        ("  │ ## Conventions                                          │", FG, False),
        ("  │ - CommonJS only                                         │", FG, False),
        ("  │ - lib/todo.js stays pure — no console.log               │", FG, False),
        ("  │ - Tests: node:test (built-in)                           │", FG, False),
        ("  └─────────────────────────────────────────────────────────┘", DIM, False),
        (None, None, False),
        ("  ✓ Created CLAUDE.md (18 lines)", GREEN, True),
        (None, None, False),
        ("> _", FG, True),
    ]
    draw_lines(d, lines)
    save(img, "02-claude-md.png")


# ---------- screenshot 3: Plan Mode ----------
def shot_03_plan_mode():
    img, d = new_canvas("Terminal — claude  [Plan Mode]")
    lines = [
        ("> add a 'todo edit <id> <text>' command", FG, True),
        (None, None, False),
        ("  ⏺ Plan Mode active — I'll draft the plan before any edits.", MAGENTA, True),
        (None, None, False),
        ("  ╭─ PLAN ───────────────────────────────────────────────────╮", BLUE, False),
        ("  │ 1. lib/todo.js                                           │", FG, False),
        ("  │     • add editTodo(id, text) — pure function             │", FG, False),
        ("  │     • returns updated todo or null if id not found       │", FG, False),
        ("  │                                                          │", FG, False),
        ("  │ 2. index.js                                              │", FG, False),
        ("  │     • add 'edit' to commands map                         │", FG, False),
        ("  │     • output: '~ Edited #<id>: <text>'                   │", FG, False),
        ("  │                                                          │", FG, False),
        ("  │ 3. tests/todo.test.js                                    │", FG, False),
        ("  │     • test: editTodo updates text                        │", FG, False),
        ("  │     • test: editTodo returns null for missing id         │", FG, False),
        ("  ╰──────────────────────────────────────────────────────────╯", BLUE, False),
        (None, None, False),
        ("  Approve plan and start implementing?  [y/n] ", DIM, False),
        ("> y", GREEN, True),
    ]
    draw_lines(d, lines)
    save(img, "03-plan-mode.png")


# ---------- screenshot 4: Edit diff ----------
def shot_04_edit_diff():
    img, d = new_canvas("Terminal — claude")
    lines = [
        ("  Edit(lib/todo.js)", YELLOW, True),
        ("  @@ around line 38 @@", DIM, False),
        ("    function removeTodo(id) {", FG, False),
        ("      const state = load();", FG, False),
        ("      …", FG, False),
        ("    }", FG, False),
        (None, None, False),
        ("  + function editTodo(id, text) {", ADD, False),
        ("  +   const state = load();", ADD, False),
        ("  +   const t = state.items.find(x => x.id === id);", ADD, False),
        ("  +   if (!t) return null;", ADD, False),
        ("  +   t.text = text;", ADD, False),
        ("  +   save(state);", ADD, False),
        ("  +   return t;", ADD, False),
        ("  + }", ADD, False),
        (None, None, False),
        ("  - module.exports = { addTodo, listTodos, completeTodo, removeTodo };", DEL, False),
        ("  + module.exports = { addTodo, listTodos, completeTodo, removeTodo, editTodo };", ADD, False),
        (None, None, False),
        ("  ✓ Applied edit to lib/todo.js (+9 / -1)", GREEN, True),
        ("  ✓ Applied edit to index.js   (+5 / -0)", GREEN, True),
        ("  ✓ Applied edit to tests/todo.test.js (+12 / -0)", GREEN, True),
    ]
    draw_lines(d, lines)
    save(img, "04-edit-diff.png")


# ---------- screenshot 5: tests pass ----------
def shot_05_tests():
    img, d = new_canvas("Terminal — claude")
    lines = [
        ("> /test-all", FG, True),
        (None, None, False),
        ("  Running: npm test", DIM, False),
        (None, None, False),
        ("  ▶ tests/todo.test.js", CYAN, False),
        ("    ✓ addTodo creates an item with incrementing id     (3.2 ms)", GREEN, False),
        ("    ✓ listTodos returns all items                      (1.1 ms)", GREEN, False),
        ("    ✓ completeTodo marks done                          (1.4 ms)", GREEN, False),
        ("    ✓ removeTodo deletes an item                       (1.0 ms)", GREEN, False),
        ("    ✓ removeTodo returns false for missing id          (0.8 ms)", GREEN, False),
        ("    ✓ editTodo updates text                            (1.2 ms)", GREEN, False),
        ("    ✓ editTodo returns null for missing id             (0.7 ms)", GREEN, False),
        (None, None, False),
        ("  ────────────────────────────────────────────────────────", DIM, False),
        ("    7 passed   0 failed   0 skipped       total: 9.4 ms", GREEN, True),
        (None, None, False),
        ("  ⏺ All 7 tests pass. Coverage on new editTodo path is ✓.", FG, False),
        (None, None, False),
        ("> _", FG, True),
    ]
    draw_lines(d, lines)
    save(img, "05-tests.png")


# ---------- screenshot 6: subagent review ----------
def shot_06_review():
    img, d = new_canvas("Terminal — claude")
    lines = [
        ("> use the 'reviewer' subagent on the pending diff", FG, True),
        (None, None, False),
        ("  ⏺ Dispatching to subagent: reviewer (sonnet)", MAGENTA, True),
        ("  ⤷ tools allowed: Read, Grep, Bash(git diff:*), Bash(git log:*)", DIM, False),
        (None, None, False),
        ("  ┌─ reviewer ─────────────────────────────────────────────┐", BLUE, False),
        ("  │ LGTM                                                   │", GREEN, True),
        ("  │                                                        │", FG, False),
        ("  │ • lib/todo.js:38 editTodo is pure ✓                    │", FG, False),
        ("  │ • index.js:31 output prefix '~' is new — consider      │", FG, False),
        ("  │   documenting in CLAUDE.md alongside +/*/-              │", FG, False),
        ("  │ • tests/todo.test.js:48 covers both happy and missing  │", FG, False),
        ("  │   id paths ✓                                           │", FG, False),
        ("  │ • No new dependencies introduced ✓                     │", FG, False),
        ("  │                                                        │", FG, False),
        ("  │ Recommended next step: update CLAUDE.md with '~' prefix │", FG, False),
        ("  │ then commit.                                           │", FG, False),
        ("  └────────────────────────────────────────────────────────┘", BLUE, False),
        (None, None, False),
        ("> _", FG, True),
    ]
    draw_lines(d, lines)
    save(img, "06-review.png")


# ---------- screenshot 7: git commit ----------
def shot_07_commit():
    img, d = new_canvas("Terminal — claude")
    lines = [
        ("> commit the changes with a clear message", FG, True),
        (None, None, False),
        ("  Bash(git add lib/todo.js index.js tests/todo.test.js CLAUDE.md)", YELLOW, False),
        ("  Bash(git commit)", YELLOW, False),
        (None, None, False),
        ("  [main 4f2c1a8] add 'todo edit' command", FG, False),
        ("   4 files changed, 27 insertions(+), 1 deletion(-)", FG, False),
        (None, None, False),
        ("  ⏺ Commit message:", CYAN, True),
        ("  ╭──────────────────────────────────────────────────────╮", DIM, False),
        ("  │ add 'todo edit' command                              │", FG, False),
        ("  │                                                      │", FG, False),
        ("  │ Adds editTodo(id, text) to lib + 'edit' to the CLI   │", FG, False),
        ("  │ dispatcher with two new tests covering the happy     │", FG, False),
        ("  │ path and missing-id case.                            │", FG, False),
        ("  │                                                      │", FG, False),
        ("  │ Co-Authored-By: Claude <noreply@anthropic.com>       │", DIM, False),
        ("  ╰──────────────────────────────────────────────────────╯", DIM, False),
        (None, None, False),
        ("  ✓ HEAD now at 4f2c1a8", GREEN, True),
        (None, None, False),
        ("> _", FG, True),
    ]
    draw_lines(d, lines)
    save(img, "07-commit.png")


def main():
    print("Generating screenshots…")
    shot_01_start()
    shot_02_claude_md()
    shot_03_plan_mode()
    shot_04_edit_diff()
    shot_05_tests()
    shot_06_review()
    shot_07_commit()
    print("Done.")


if __name__ == "__main__":
    main()
