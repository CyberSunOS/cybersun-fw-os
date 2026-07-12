---
description: Intelligently resolve git merge conflicts with deep understanding of the codebase
arguments: "Optional strategy/scope flags (safe, aggressive, test, ours, theirs, or specific files)"
---

# Resolve Merge Conflicts

You are an expert at resolving Git merge conflicts intelligently. Resolve all merge conflicts in
the current repository with a deep understanding of the codebase.

Arguments: $ARGUMENTS

## Strategy (driven by arguments)

- **safe** — Only auto-resolve obvious conflicts; ask for guidance on complex ones.
- **aggressive** — Make best-judgment calls on all conflicts.
- **test** — Run tests after each file resolution.
- **ours** — Prefer our changes when in doubt.
- **theirs** — Prefer their changes when in doubt.
- **specific files mentioned** — Only resolve those files.
- Default (no args): resolve everything with sound judgment, asking when genuinely unsure.

## Pre-Resolution Analysis

1. Check the current state and understand the situation:
   ```bash
   git status
   git log --oneline -n 20 --graph --all
   git log --oneline origin/main..HEAD     # what our branch did
   git log --oneline HEAD..origin/main      # what their branch did
   ```
2. Use the GitHub CLI (`gh`) if available to check related PRs and understand context.
3. Identify the type of conflicts (feature vs feature, fix vs refactor, etc.).
4. Think hard about both branches' intent and plan accordingly.

## Resolution Process

For each conflicted file:

- Read and understand **both** versions (ours and theirs) and the intent behind each change.
- Combine both changes intelligently when they are complementary — never blindly pick one side.
- When changes are incompatible, prefer the version that:
  - Maintains backward compatibility
  - Has better test coverage
  - Follows the project's coding standards better (see `docs/GOLDEN_RULES.md`)
  - Respects Vertical Slice Architecture boundaries
  - Is more performant
- Remove all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
- Verify syntax is correct after each file.

### File-type-specific handling

- **Source code (.ts, .js, .py, etc.)** — Understand the business logic of both changes; merge
  complementary features; check related files that may also need updates.
- **Test files** — Usually merge both sets of tests; ensure no duplicate test names; keep
  descriptions accurate.
- **Config files** — `package.json`: merge dependencies and scripts. `.env.example`: include all
  new variables. CI/CD configs: merge all jobs unless duplicate.
- **Documentation** — Merge both updates; keep terminology consistent; update any TOC.
- **Lock files** (`package-lock.json`, `yarn.lock`, `poetry.lock`) — Delete and regenerate after
  resolving the corresponding manifest (`package.json` / `pyproject.toml`).
- **Migration files** — Be extra careful; may need a new migration rather than an edit.
- **Schema files** — Ensure compatibility is maintained.
- **API files** — Check for breaking changes.

## Post-Resolution Verification

1. Run linters to check code style.
2. Run type checkers if applicable.
3. Run the test suite (and per-file if `test` was specified). See `TECH_STACK.md` for commands.
4. Check for **semantic conflicts** — code that merges cleanly but breaks functionality.
5. Verify no debugging code was left behind.

## Final Steps

1. Stage all resolved files: `git add <file>`.
2. For each resolution, document the decision made and why.
3. Mark any uncertain resolutions with `TODO` comments and call them out.
4. Suggest any additional testing that may be needed.
5. Provide a detailed summary of all resolutions.

## Important Guidelines

- NEVER just pick one side blindly — understand both changes.
- Preserve the intent of both branches when possible.
- Watch for semantic conflicts beyond the textual markers.
- If unsure, explain the conflict and ask for guidance.
- Always test after resolution when tests are available.

Begin by checking the current git status.
