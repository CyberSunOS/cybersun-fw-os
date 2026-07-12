---
description: "Implement a specification from an existing SPEC PRP, validating each task until the desired state is reached"
---

# Execute SPEC PRP

Implement a specification using an existing SPEC PRP.

## PRP File: $ARGUMENTS

## Execution Process

1. **Understand Spec**
   - Current state analysis
   - Desired state goals
   - Task dependencies

2. **ULTRATHINK**
   - Think hard before you execute the plan. Create a comprehensive plan addressing all requirements.
   - Break down complex tasks into smaller, manageable steps using your todos tools.
   - Use the TodoWrite tool to create and track your implementation plan.
   - Identify implementation patterns from existing code to follow.

3. **Execute Tasks**
   - Follow task order
   - Run validation after each
   - Fix failures before proceeding

4. **Verify Transformation**
   - Confirm desired state achieved
   - Run all validation gates
   - Test integration

Progress through each objective systematically.
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

