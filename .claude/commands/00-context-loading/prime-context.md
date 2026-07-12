---
description: "Prime AI context with project-specific information"
---

# Prime Context

## Mission

Load essential project context into AI memory for better assistance throughout the session.

**When to use**: Start of work session, before major feature work, after onboarding

**Arguments**: `$ARGUMENTS` (optional: a specific area or feature to focus the priming on)

---

## Context Priming Process

### Step 1: Understand Project Structure

- Run `tree` (or equivalent) to get an understanding of the overall project structure.
- Read `CLAUDE.md` first (if it exists) for AI-specific instructions and project overview.
- Read `README.md` for the project purpose and goals.
- Read key files in the `src/` directory (or primary source directory).

### Step 2: Load Core Information

**Essential files to read:**
1. **TECH_STACK.md** - Project-specific tech stack (if exists)
2. **TECH_STACK.md** - Framework-level recommendations (fallback)
3. **docs/GOLDEN_RULES.md** - Development standards
4. **docs/VERTICAL_SLICE_ARCHITECTURE.md** - Architecture guide
5. **package.json / pyproject.toml** - Dependencies and scripts
6. **project.md** - Project-specific conventions (if exists)

Understand the project structure and conventions, respect existing patterns and standards, and follow all guidelines in the loaded documentation.

### Step 3: Load Project-Specific Rules

**Check for project rules:**
- `.claude/` directory - Project-specific commands
- `CONTRIBUTING.md` - Contribution guidelines
- `ARCHITECTURE.md` - Architecture documentation

### Step 4: Load Recent Context

**Recent work:**
- Recent PRPs in `PRPs/` directory (and stages under `PRPs/[feature-name]/`)
- Recent commits (last 10)
- Open PRs
- Current branch

### Step 5: Load Active Work

**Current focus:**
- What feature/task is being worked on?
- What files are currently modified?
- What's the current state?

---

## Output

After loading, explain back the following to confirm understanding:
- Project structure
- Project purpose and goals
- Key files and their purposes
- Important dependencies
- Important configuration files

**AI confirms context loaded:**
```markdown
✅ Context Primed

## Project: [Name]
- Tech Stack: [Summary]
- Architecture: [Vertical Slice / Other]
- Current Branch: [branch-name]

## Recent Work
- [Recent PRP 1]
- [Recent PRP 2]
- [Recent commit 1]

## Active Work
- Feature: [current-feature]
- Files modified: [list]

## Ready to assist with:
- Feature development
- Bug fixes
- Code review
- Refactoring
- Testing

What would you like to work on?
```

---

## Usage

```
/prime-context $ARGUMENTS

AI: [Loads all context]
AI: ✅ Context primed! Ready to assist.
```
