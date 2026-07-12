---
description: "Work through the task list of an existing TASK PRP sequentially, validating each task"
---

# Execute TASK PRP

Run through a task list from an existing TASK PRP.

## PRP File: $ARGUMENTS

## Execution Process

1. **Load Tasks**
   - Read task list
   - Understand context

2. **Execute Each Task**
   - Perform ACTION
   - Run VALIDATE
   - Fix IF_FAIL issues

3. **Complete Checklist**
   - Verify all tasks done
   - Run final validation
   - Check no regressions

Work through tasks sequentially, validating each.

---

## 🌱 SeedFW Enhancements

### 1. Quality Standards
- **Follow**: All rules in `docs/GOLDEN_RULES.md`
- **Build Test**: Must pass before any commit
- **Package Manager**: Use npm/pnpm/yarn commands only
- **TypeScript**: Strict mode, no `any` types
- **Security**: No secrets in code, validate all input

### 2. Architecture Guidelines
- **Follow**: Vertical Slice Architecture (see `docs/VERTICAL_SLICE_ARCHITECTURE.md`)
- **Organize**: By feature, not by layer
- **Example**: `features/user-auth/` contains all layers for that feature

### 3. File Size Limits
- **Maximum**: 500 lines per file
- **If Exceeded**: Split into smaller modules with clear boundaries
- **Benefit**: Better AI comprehension and maintainability

### 4. Implementation Pattern
- **Task-by-Task**: Execute one task at a time
- **Validate**: Test after each task
- **Commit**: Atomic commits (one logical change per commit)

