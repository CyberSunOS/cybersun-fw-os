---
description: "Create detailed implementation plan with spec tasks"
---

# Create Plan

## Feature: $ARGUMENTS

## Mission

Transform the PRP into a detailed, step-by-step implementation plan using spec-driven methodology.

**Core Principle**: Break down the feature into atomic, executable tasks that can be implemented one at a time.

---

## Prerequisites

**Before running this command:**
1. ✅ Complete `/intent-translator` first
2. ✅ Complete `/create-prp [feature-name]` second
3. ✅ Have `PRPs/[feature-name]/1-prp.md` created

---

## Planning Process

### Step 1: Load PRP

Read `PRPs/[feature-name]/1-prp.md` and extract:
- Feature description
- Technical approach
- Files to create
- Files to modify
- Dependencies to add
- Success criteria

### Step 2: Create Spec Change Proposal

Create: `spec/proposals/[feature-name]/proposal.md`

```markdown
# Change Proposal: [Feature Name]

## Context
[Why this change is needed - from PRP]

## Proposed Changes
[What will change - from PRP]

## Affected Specs
- `spec/current/features/[feature-name].md` (NEW)
- `spec/current/architecture.md` (UPDATE - add feature to architecture)

## Architecture
**Vertical Slice**: `features/[feature-name]/`

## Success Criteria
[From PRP]

## References
- PRP: `PRPs/[feature-name]/1-prp.md`
- Intent: `PRPs/[feature-name]/0-intent.md`
```

### Step 3: Create Task List

Create: `spec/proposals/[feature-name]/tasks.md`

**Break down into atomic tasks:**

```markdown
# Implementation Tasks: [Feature Name]

## Setup
- [ ] Create feature directory: `features/[feature-name]/`
- [ ] Create subdirectories: api/, components/, services/, models/, tests/
- [ ] Install dependencies: `pnpm install [packages]`

## Core Implementation
- [ ] Task 1: Create [file] - [Purpose]
  - File: `features/[feature-name]/[file]`
  - Purpose: [What it does]
  - Dependencies: [What it needs]
  - Validation: [How to verify]

- [ ] Task 2: Create [file] - [Purpose]
  - File: `features/[feature-name]/[file]`
  - Purpose: [What it does]
  - Dependencies: [What it needs]
  - Validation: [How to verify]

[... more tasks ...]

## Integration
- [ ] Update [existing-file] to integrate feature
- [ ] Register routes/components
- [ ] Update configuration

## Testing
- [ ] Create unit tests for [component]
- [ ] Create integration tests for [feature]
- [ ] Verify all tests pass

## Validation
> Gates below are the TS/web example — adapt commands to the confirmed stack (use the PRP's validation commands) and record any substitutions. Level 0 (build) may never be skipped — only adapted.
- [ ] Level 0 — Build (MANDATORY): `pnpm build`
- [ ] Level 1 — Type check & lint: `pnpm type-check`, `pnpm lint`
- [ ] Level 2 — Tests: `pnpm test`
- [ ] Level 3 — Manual testing: [Specific scenarios]

## Documentation
- [ ] Update README if needed
- [ ] Add JSDoc/TSDoc comments
- [ ] Update API documentation if needed
```

### Step 4: Create Spec Delta

Create: `spec/proposals/[feature-name]/delta.md`

```markdown
# Spec Delta: [Feature Name]

## ADDED

### New Feature Spec
File: `spec/current/features/[feature-name].md`

Content:
- Feature description
- User stories
- API endpoints
- Data models
- Success criteria

## MODIFIED (or CREATED if first change)

### Architecture Spec
File: `spec/current/architecture.md` (create it if this is the project's first change)

Changes:
- Added `features/[feature-name]/` to feature list
- Updated feature directory structure

## REMOVED
None
```

---

## Output Files

After completion, you should have:

1. `spec/proposals/[feature-name]/proposal.md` - Change proposal
2. `spec/proposals/[feature-name]/tasks.md` - Detailed task list
3. `spec/proposals/[feature-name]/delta.md` - Spec changes

---

## Rules to Follow

**Reference**: `/docs/GOLDEN_RULES.md`

### Key Rules for Plan Creation
1. ✅ **Atomic tasks** - One logical change per task
2. ✅ **Clear dependencies** - Show what depends on what
3. ✅ **Validation per task** - How to verify each task
4. ✅ **Follow Vertical Slice** - All files in feature directory
5. ✅ **Files under 500 lines** - Plan for splitting if needed
6. ✅ **Use package managers** - Never manually edit package files

---

## Usage

```
# After completing /create-prp
/create-plan user-auth

AI: [Loads PRP]
AI: [Creates change proposal]
AI: [Creates task list]
AI: [Creates spec delta]
AI: Created:
    - spec/proposals/user-auth/proposal.md
    - spec/proposals/user-auth/tasks.md
    - spec/proposals/user-auth/delta.md
AI: Next: /execute-plan user-auth
```

---

## Next Command

After plan creation completes:
```
/execute-plan [feature-name]
```



---

## 🌱 SeedFW Enhancements

### 1. Tech Stack & Documentation
- Tech stack and documentation were confirmed during `/create-prp`; re-confirm only if the plan introduces NEW technologies
- **Document**: Note any changes in the change proposal

### 2. Architecture Guidelines
- **Follow**: Vertical Slice Architecture (see `docs/VERTICAL_SLICE_ARCHITECTURE.md`)
- **Organize**: By feature, not by layer
- **Example**: `features/user-auth/` not `controllers/`, `services/`

### 3. Quality Standards
- **Follow**: All rules in `docs/GOLDEN_RULES.md`
- **File Size**: 500 lines maximum per file
- **Package Manager**: Never edit package.json manually
- **TypeScript**: Strict mode, no `any` types

### 4. Spec Integration
- **Save to**: `spec/proposals/` for proposals
- **Two-Folder Model**: 
  - `spec/current/` = Current truth (what IS built)
  - `spec/proposals/` = Proposals (what SHOULD change)

