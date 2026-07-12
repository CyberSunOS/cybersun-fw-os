---
description: Safe, incremental refactoring with vertical-slice checks and validation
arguments: "File, directory, or area to refactor"
---

# Refactor

## Target: $ARGUMENTS

## Mission

Perform safe, incremental refactoring to improve code quality **without changing behavior**.

**When to use**: Code cleanup, improving maintainability, reducing technical debt.

## Documentation Loading

Load the relevant project docs first:
- `TECH_STACK.md` - Canonical tech stack (build/test/lint commands)
- `docs/GOLDEN_RULES.md` - Development standards
- `docs/VERTICAL_SLICE_ARCHITECTURE.md` - Architecture guidelines
- `project.md` - Project-specific conventions (if it exists)

Respect existing patterns, conventions, and slice boundaries throughout.

---

## Refactoring Process

### Step 1: Understand Current Code

- What does the code do and how is it structured?
- What are the pain points?
- What tests already exist?

### Step 2: Scan for Refactoring Opportunities

Scan the target for common smells:
1. **Functions too long** - >20 lines that need decomposition (Extract Function)
2. **Files too long** - Large files that should be split
3. **Cross-slice imports** - Imports that violate Vertical Slice boundaries
4. **Multiple responsibilities** - Classes/modules doing more than one thing
5. **Duplication** - Repeated logic that should be DRYed up
6. **Weak typing** - Missing type hints / weak types; missing I/O models
   (e.g. Pydantic v2 models in Python, or proper TypeScript types)
7. **Magic values** - Numbers/strings that should be named constants
8. **Naming** - Unclear names that should be renamed
9. **Structure** - Files/modules that should be reorganized

### Step 3: Plan Refactoring (Safety First)

- ✅ Ensure tests exist — if not, add them **before** refactoring
- ✅ Make small, incremental changes
- ✅ Run tests after each change
- ✅ Commit frequently (atomic commits — see `commit.md`)

For each issue found, capture:
- **Location** (file + line)
- **Why it's a problem**
- **Specific fix** with a code example
- **Where** the fix should be implemented
- **Priority** (high/medium/low)

Focus on actionable items that can each be fixed in under 1 hour.

### Step 4: Execute Refactoring

For each refactoring: make the change → run tests → verify behavior unchanged → commit → next.

### Step 5: Validate

Run the project's full validation suite (see `TECH_STACK.md`), for example:
```bash
pnpm build
pnpm type-check
pnpm lint
pnpm test
```

---

## Output

If the request is a scan/plan (rather than direct execution), save a refactoring plan to
`PRPs/ai_docs/refactor_plan.md` (do **not** overwrite any existing file — use a unique name).

**Refactoring Report:**
```markdown
# Refactoring: [Target]

## Changes Made
### 1. [Refactoring Type]
**File**: `path/to/file.ts`  **Priority**: [high/medium/low]
**Before**:
```typescript
[old code]
```
**After**:
```typescript
[new code]
```
**Reason**: [Why this improves the code]

## Metrics
- Files changed: [count]
- Lines added / removed: [count] / [count]
- Functions extracted: [count]
- Complexity reduced: [metric]

## Validation
- ✅ Build passed
- ✅ Type check passed
- ✅ Lint passed
- ✅ All tests passed
- ✅ Behavior unchanged

## Next Steps
- [ ] Code review
- [ ] Merge
```

---

## Rules to Follow

**Reference**: `docs/GOLDEN_RULES.md`

1. ✅ **Tests first** - Ensure tests exist before refactoring
2. ✅ **Small changes** - Incremental refactoring
3. ✅ **Behavior unchanged** - Don't change functionality
4. ✅ **Run tests often** - After each change
5. ✅ **Commit frequently** - Easy to revert if needed
6. ✅ **Respect slice boundaries** - No new cross-feature coupling

---

## Usage

```
/refactor features/user-auth/services/auth-service.ts

AI: [Analyzes code]
AI: [Identifies refactoring opportunities + priorities]
AI: [Executes refactoring safely]
AI: [Validates changes]
AI: ✅ Refactoring complete!
```
