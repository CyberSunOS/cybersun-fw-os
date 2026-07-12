---
description: Create a lightweight, validated TASK PRP for small focused changes (30 min - 2 hours)
---

# PRP Task

## Task: $ARGUMENTS

## Mission

Create a lightweight PRP for small, focused tasks completable in **30 minutes to 2 hours** — a tight task list with immediate validation, rollback, and debug strategies.

**When to use**: Bug fixes, small features, simple refactors, quick improvements.
**When NOT to use**: Large features (use `/create-prp`), user stories (use `/prp-story`), architectural changes.

---

## Pre-Flight: SeedFW Setup

1. **Tech Stack Awareness** — Read `TECH_STACK.md`. Confirm with the user if the task touches new tech (Confirm / Modify / Add). Document changes.
2. **Documentation Fetching** — If external docs are needed, prefer Context7 (`resolve-library-id` then `get-library-docs`); fall back to official docs.
3. **Architecture** — Follow Vertical Slice Architecture (`docs/VERTICAL_SLICE_ARCHITECTURE.md`): keep changes within the feature directory where possible.
4. **Quality** — Follow `docs/GOLDEN_RULES.md`: 500 lines max per file, never edit `package.json` manually, TypeScript strict mode with no `any`.

---

## Quick Planning Process

### Step 1: Scope & Task Understanding

- Clear description of the task and expected outcome
- Identify all affected files; map dependencies and side effects
- Note existing test coverage
- Estimated time: 30 min - 2 hours (if > 2 hours, use `/create-prp` instead)

### Step 2: Quick Context Gathering

- Locate relevant files; understand the current implementation
- Find similar changes in history and conventions/helpers to follow
- Review existing test patterns

**Skip when not needed**: deep architectural analysis, extensive research, multiple-alternative comparisons.

### Step 3: User Clarification

- Confirm change scope and acceptance criteria
- Check deployment considerations and identify blockers
- Confirm rollback approach for risky areas

---

## Output

Save as: `PRPs/tasks/[task-name].md`

**Template:**

```markdown
# Task: [task-name]

## Description
[What needs to be done]

## Current State
[How it works now]

## Desired State
[How it should work]

## Context
\`\`\`yaml
docs:
  - url: [API documentation]
    focus: [specific methods]
patterns:
  - file: existing/example.ts
    copy: [pattern to follow]
gotchas:
  - issue: "Library requires X"
    fix: "Always do Y first"
\`\`\`

## Implementation

### Files to Modify
1. `path/to/file.ts` — [what to change]
2. `path/to/file.test.ts` — [add/update tests]

### Tasks (sequenced)
Each task uses an information-dense action verb and includes validation:
\`\`\`
ACTION path/to/file:
  - OPERATION: [specific change]
  - VALIDATE:  [test command]
  - IF_FAIL:   [debug strategy]
  - ROLLBACK:  [undo approach]
\`\`\`

Sequence: Setup → Core Changes → Integration → Validation → Cleanup.

### Testing
- [ ] Manual test: [how to test]
- [ ] Unit test after each change
- [ ] Build test: `pnpm build`

## Validation
\`\`\`bash
pnpm build
pnpm test
\`\`\`

## Time Estimate
[30 min - 2 hours]

## Next Steps
Execute: `/prp-task-execute [task-name]`
```

---

## Quality Checklist

- [ ] All affected changes identified; dependencies mapped
- [ ] Each task has an executable validation command
- [ ] Rollback steps and debug strategies included
- [ ] Performance impact and security concerns noted where relevant
- [ ] No missing edge cases
- [ ] Scope kept simple — not over-engineered or expanded

### Key Rules
1. Keep it simple — don't over-engineer.
2. Focus on the task — don't expand scope.
3. Quick context — just enough to succeed.
4. Always include validation.
5. Time-box it — if > 2 hours, use `/create-prp` instead.

---

## Next Command

```
/prp-task-execute [task-name]
```

Or escalate the workflow if the task grows: `/create-plan` → `/execute-plan` → `/validate`.

Remember: small, focused changes with immediate validation.
