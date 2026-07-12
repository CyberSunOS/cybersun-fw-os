---
description: Run all prp core commands in sequence from feature request to pr
---

Feature: $ARGUMENTS

## Instructions

Execute in sequence:
1. `/new-branch $ARGUMENTS`
2. `/create-prp $ARGUMENTS`
3. `/execute-prp` (use PRP from step 2)
4. `/validate` (4-gate validation (Levels 0-3))
5. `/commit`
6. `/create-pr` (generate title from feature)

Stop if any fails.

## Report

Output summary of completed workflow including:
- Branch name created
- PRP file path
- Commit hash
- PR URL

---

## 🌱 SeedFW Enhancements

### 1. Documentation Loading
- **Load**: Read relevant documentation files:
  - `TECH_STACK.md` - Canonical tech stack
  - `docs/GOLDEN_RULES.md` - Development standards
  - `docs/VERTICAL_SLICE_ARCHITECTURE.md` - Architecture guidelines
  - `project.md` - Project-specific conventions (if exists)

### 2. Context Awareness
- **Understand**: Project structure and conventions
- **Respect**: Existing patterns and standards
- **Follow**: All guidelines in loaded documentation

