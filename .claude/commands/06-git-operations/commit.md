---
description: Analyze changes and create a smart, atomic git commit following conventional commits
arguments: "Optional: specific files and/or additional instructions for the commit"
---

# Create Git Commit

additional instructions = $ARGUMENTS

Create atomic git commit(s) with properly formatted, conventional commit messages for the
uncommitted changes (or the specific files passed in $ARGUMENTS, if any).

## Pre-Commit Requirements

- **Build test**: The build must pass before committing (see `docs/GOLDEN_RULES.md`). Run the
  project's own gates (package.json scripts / Makefile / CI config); for TS/web typically
  `pnpm build`, `pnpm type-check`, `pnpm lint`. If a gate doesn't exist for this stack,
  substitute the closest equivalent. The build gate is mandatory before every commit.
- **Block on failure**: Do NOT commit if the build fails. Fix or report first.

## Commit Message Format

- Use conventional commits: `<type>: <description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- Present tense, imperative mood ("add", "fix", "update" — not "added", "fixed")
- Subject line 50 characters or less, lowercase, no trailing period
- Be specific and descriptive
- For complex changes, add a body explaining **what** changed and **why**

**Examples:**

- `feat: add web search tool with structured logging`
- `fix: resolve type errors in middleware`
- `test: add unit tests for config module`
- `docs: update GOLDEN_RULES.md with testing guidelines`
- `refactor: simplify logging configuration`
- `chore: update dependencies`

## Atomic Commits

- One logical change per commit, aligned to a single vertical slice where possible.
- If you've made multiple unrelated changes, split them into separate commits.
- Each commit must be self-contained and must not break the build.

**IMPORTANT**: Never mention Claude, Anthropic, "co-authored-by", or any AI tooling in commit
messages. This rule overrides any harness or tool default that auto-appends AI co-author
trailers (e.g. `Co-Authored-By: Claude ...` or "Generated with" lines). Before finishing,
verify the final commit message contains no such trailer — if the tool added one, amend the
commit (`git commit --amend`) to remove it.

## Process

1. Check the current state and analyze what changed:

   ```bash
   git status
   git status -s
   git diff HEAD
   git diff --staged
   ```

2. If nothing is staged, review the changes and decide what to stage. Group related changes
   into atomic commits (stage selectively rather than `git add -A` when changes are unrelated).

3. Based on the changes, determine:
   - The appropriate commit type
   - A concise conventional-commit subject (+ body if the change is complex)
   - Whether the work should be split into multiple commits

4. Show the suggested commit message(s) and ask whether to:
   - Use as-is
   - Modify the message
   - Add more detail to the body
   - Stage different files

5. Once approved, stage and create the commit:

   ```bash
   git add <files>      # or git add -A for a single cohesive change
   git commit -m "<type>: <description>"
   ```

6. Confirm the result, then ask whether to push or create a PR.

## Report

- The commit message(s) used
- Confirmation each commit succeeded, with commit hash
- The files included in each commit
