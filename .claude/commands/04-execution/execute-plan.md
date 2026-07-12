---
description: "Execute implementation plan task by task"
---

# Execute Plan

## Feature: $ARGUMENTS

## Mission

Execute the implementation plan task by task, following the PRP and task list exactly.

**Core Principle**: One-pass implementation. The PRP contains all context needed to succeed on the first attempt.

---

## Prerequisites

**Before running this command:**
1. ✅ Complete `/intent-translator` first
2. ✅ Complete `/create-prp [feature-name]` second
3. ✅ Complete `/create-plan [feature-name]` third
4. ✅ Have `spec/proposals/[feature-name]/tasks.md` created

---

## Execution Process

### Step 1: Load Context

**Read all planning documents:**
- `PRPs/[feature-name]/0-intent.md` - Original intent
- `PRPs/[feature-name]/1-prp.md` - Comprehensive PRP
- `spec/proposals/[feature-name]/proposal.md` - Change proposal
- `spec/proposals/[feature-name]/tasks.md` - Task list

**Extract:**
- Success criteria
- Technical approach
- Code examples
- Validation commands
- Gotchas to avoid

### Step 2: Execute Tasks One by One

**For each task in tasks.md:**

1. **Read the task**
   - Understand what needs to be done
   - Check dependencies
   - Review validation criteria

2. **Implement the task**
   - Follow the PRP's code examples
   - Follow GOLDEN_RULES.md
   - Follow Vertical Slice Architecture
   - Keep files under 500 lines
   - Use proper TypeScript types (for TypeScript projects)
   - Add error handling
   - Add logging where appropriate

3. **Self-validate**
   - Run the validation command for this task
   - Check for type errors
   - Check for lint errors
   - Verify the task is complete

4. **Mark task as complete**
   - Update tasks.md: `- [x] Task completed`

5. **Move to next task**

### Step 3: Integration

After all core tasks are complete:
- Integrate with existing code
- Register routes/components
- Update configuration
- Verify integration points work

### Step 4: Testing

**Create tests:**
- Unit tests for each component/function
- Integration tests for the feature
- Follow existing test patterns
- Ensure tests pass

### Step 5: Final Validation

Run the project's own gates as defined by its stack (package.json scripts / Makefile / the PRP's validation commands). For TS/web projects these are typically `pnpm build`, `pnpm type-check`, `pnpm lint`. If a gate doesn't exist for the confirmed stack, substitute the closest equivalent (e.g. `node --check`, `ruff`, `go vet`) and record the substitution in the report. Level 0 (build) may never be skipped — only adapted.

**TS/web example:**
```bash
# Level 0: Build test (MANDATORY — adapt to the stack, never skip)
pnpm build

# Level 1: Type check
pnpm type-check

# Level 1: Lint
pnpm lint

# Level 2: Tests
pnpm test

# Level 2: Feature-specific tests
pnpm test features/[feature-name]
```

**All gates (or their recorded substitutes) must pass before proceeding.**

---

## Rules to Follow

**Reference**: `/docs/GOLDEN_RULES.md`

### Critical Rules for Execution

**Architecture:**
1. ✅ **Follow Vertical Slice** - All code in `features/[feature-name]/`
2. ✅ **Files under 500 lines** - Split if needed
3. ❌ **No cross-feature dependencies** - Use `shared/` or `core/`

**Code Quality:**
4. ✅ **TypeScript strict mode** - No `any` types (for TypeScript projects)
5. ✅ **Proper error handling** - Try-catch, proper status codes
6. ✅ **Logging** - Log important events
7. ✅ **Comments** - Document complex logic

**Package Management:**
8. ✅ **Use package managers** - `pnpm install [package]`
9. ❌ **NEVER manually edit package.json** - Use npm/yarn/pnpm

**Testing:**
10. ✅ **Build test MANDATORY** - Must pass before push
11. ✅ **Write tests** - Unit and integration
12. ✅ **All tests must pass** - No exceptions

**Git:**
13. ✅ **Atomic commits** - One logical change per commit
14. ✅ **Descriptive messages** - Explain what and why
15. ❌ **Never push untested code** - Build must pass

**Security:**
16. ❌ **No secrets in code** - Use environment variables
17. ✅ **Validate all input** - Never trust user input
18. ✅ **Use HTTPS** - Secure connections only
19. ✅ **Parameterized queries** - Prevent SQL injection

---

## Task Management

**Use task management tools:**
```
# Mark task as in progress
- [/] Task 1: Create user service

# Mark task as complete
- [x] Task 1: Create user service

# Mark task as blocked
- [-] Task 2: Create user API (blocked by Task 1)
```

**Track progress:**
- Update tasks.md as you go
- Document any issues encountered
- Note any deviations from the plan

---

## Error Handling

**If something goes wrong:**

1. **Don't panic** - Errors are normal
2. **Read the error message** - Understand what went wrong
3. **Check the PRP** - Did you follow the plan?
4. **Check GOLDEN_RULES** - Did you violate a rule?
5. **Fix the issue** - Make the correction
6. **Re-validate** - Run validation commands again
7. **Document the fix** - Note what went wrong and how you fixed it

**If stuck:**
- Ask the user for clarification
- Review the intent clarification
- Check if requirements changed
- Consider if the plan needs adjustment

---

## Output

After execution completes:

1. **All tasks marked complete** in `tasks.md`
2. **All files created** in `features/[feature-name]/`
3. **All tests passing**
4. **Build passing**
5. **Feature working** as specified

---

## Usage

```
# After completing /create-plan
/execute-plan user-auth

AI: [Loads all context]
AI: [Executes Task 1]
AI: ✅ Task 1 complete: Created features/user-auth/services/auth-service.ts
AI: [Executes Task 2]
AI: ✅ Task 2 complete: Created features/user-auth/api/login.ts
AI: [... continues ...]
AI: ✅ All tasks complete!
AI: ✅ Build passing
AI: ✅ Tests passing
AI: Next: /validate user-auth
```

---

## Next Command

After execution completes:
```
/validate [feature-name]
```



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

