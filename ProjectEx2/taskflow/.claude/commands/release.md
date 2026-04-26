---
description: Bump version, update changelog, create release commit
allowed-tools: Read, Edit, Bash(git status), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*), Bash(npm test:*), Bash(npm version:*)
argument-hint: patch | minor | major
---

Cut a release of TaskFlow.

`$ARGUMENTS` — bump type (`patch` / `minor` / `major`). If empty, ask first.

Steps:
1. Verify working tree is clean (`git status`); if not, abort and report.
2. Run `npm test` — abort on failure.
3. Read `package.json` and compute the new version.
4. Update `CHANGELOG.md`:
   - Move items from `## [Unreleased]` to a new `## [<new-version>] — <today>` section
   - If `Unreleased` is empty, write a 1-line summary of `git log $(prev-tag)..HEAD`
5. Run `npm version $ARGUMENTS --no-git-tag-version` to bump `package.json`.
6. Stage `package.json` + `CHANGELOG.md` and create commit:
   ```
   chore(release): v<new-version>
   ```
7. Report: new version, files changed, suggested next step (`git push && gh release create`).

Do NOT push or tag — leave that to the user.
