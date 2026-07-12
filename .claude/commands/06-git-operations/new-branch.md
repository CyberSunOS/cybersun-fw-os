---
description: Create a new git branch from develop with a conventional branch name
arguments: "Description of the work the branch is for"
---

# Create Git Branch

Start a new branch for: $ARGUMENTS

Generate a conventional, kebab-case branch name based on the request and create the branch from
the latest `develop` (falling back to `main`/`master` if `develop` does not exist).

## Step 1: Sync the Base Branch

- Determine the base branch (prefer `develop`, else `main`/`master`).
- Check out the base branch and pull the latest:
  ```bash
  git checkout develop      # or main / master
  git pull
  ```
- Check the current branch first: `git branch --show-current`. If not on a base branch, warn but
  proceed, branching from the current branch.

## Step 2: Generate Branch Name

Use conventional prefixes:

- `feat/` - New feature or enhancement
- `fix/` - Bug fix
- `chore/` - Maintenance tasks (dependencies, configs, etc.)
- `docs/` - Documentation-only changes
- `refactor/` - Code refactoring (no functionality change)
- `test/` - Adding or updating tests
- `perf/` - Performance improvements

**Naming rules:**
- kebab-case (lowercase with hyphens), no spaces
- Descriptive but concise (max 50 characters)
- Remove special characters except hyphens
- If the request is unclear, default to `feat/`

**Examples:**
- "Add user authentication system" → `feat/add-user-auth`
- "Fix login redirect bug" → `fix/login-redirect`
- "Update README documentation" → `docs/update-readme`
- "Refactor database queries" → `refactor/database-queries`
- "Add unit tests for API" → `test/api-unit-tests`

## Step 3: Ensure Uniqueness

Check whether the branch name already exists; if so, append `-v2`, `-v3`, etc. until unique:

```bash
if git show-ref --verify --quiet refs/heads/<branch-name>; then
  COUNTER=2
  while git show-ref --verify --quiet refs/heads/<branch-name>-v$COUNTER; do
    COUNTER=$((COUNTER + 1))
  done
  BRANCH_NAME="<branch-name>-v$COUNTER"
fi
```

## Step 4: Create and Checkout

```bash
git checkout -b <branch-name>
git branch --show-current     # verify it matches the expected name
```

## Step 5: Verify State

- Confirm the branch was created: `git branch --list <branch-name>`
- Confirm it is the current branch: `[ "$(git branch --show-current)" = "<branch-name>" ]`
- Branch is created locally only (no push yet). It will be pushed later by `commit.md`.

## Report

Output the branch name created (e.g. `feat/add-user-auth`) and confirm you are ready to start
working on it.
