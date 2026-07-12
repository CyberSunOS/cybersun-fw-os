---
description: "4-gate validation (Levels 0-3) and archiving of completed feature"
---

# Validate

## Feature: $ARGUMENTS

## Mission

Perform comprehensive 4-gate validation (Levels 0-3) of the implemented feature, then archive the change to update specs.

**Core Principle**: Verify everything works before considering the feature complete.

---

## Prerequisites

**Before running this command:**
1. ✅ Complete `/intent-translator` first
2. ✅ Complete `/create-prp [feature-name]` second
3. ✅ Complete `/create-plan [feature-name]` third
4. ✅ Complete `/execute-plan [feature-name]` fourth
5. ✅ All tasks marked complete in `tasks.md`

---

## PRP Conformance Check (optional)

When validating against a PRP, verify that the implementation matched the approved PRP before running the validation levels. This catches silent deviations early.

1. **Parse PRP** — read the PRP; extract its task list, acceptance criteria, and referenced files.
2. **Task completeness** — confirm every task in the PRP was completed (files created/modified as specified).
3. **Acceptance criteria** — check that each acceptance criterion is addressed by the implementation.
4. **Scope check** — flag any undocumented scope changes: files, dependencies, or behavior not covered by the PRP.

Produce a short conformance summary:

```
🔍 PRP Conformance Report
📋 Tasks: X/X completed
✅ Acceptance criteria: X/X addressed
⚠️  Scope deviations: [none / list]
Status: [CONFORMANT / DEVIATIONS_FOUND]
```

If deviations are found, either fix the implementation or get the scope change documented and approved before proceeding.

---

## 4-Gate Validation (Levels 0-3)

> Run the project's own gates as defined by its stack (package.json scripts /
> Makefile / the PRP's validation commands). For TS/web projects these are
> typically `pnpm build`, `pnpm type-check`, `pnpm lint`. If a gate doesn't
> exist for the confirmed stack, substitute the closest equivalent
> (e.g. `node --check`, `ruff`, `go vet`) and record the substitution in the
> report. Level 0 (build) may never be skipped — only adapted.

### Level 0: Build Test (MANDATORY)

**This MUST pass before anything else.** Two parts: dependencies install cleanly, and the production build succeeds.

1. **Dependencies install** — validate against the COMMITTED lock file, not your drifted local install. A local `node_modules` can pass while the lock file resolves a different (broken) version — so a clean CI/prod install fails even though everything was "green" locally. Do a frozen install first:

   ```bash
   pnpm install --frozen-lockfile   # TS/web example — or: npm ci / yarn install --immutable
   ```

   - ✅ Frozen install succeeds (lock file matches the manifest)
   - ✅ The versions you tested are the versions the lock file pins
   - ❌ If it fails or drifts: STOP — re-resolve, re-verify, and commit the updated lock file before continuing.

2. **Production build:**

   ```bash
   pnpm build   # TS/web example — adapt to the project's stack
   ```

   - ✅ Build completed successfully
   - ✅ No type/compilation errors
   - ✅ No critical warnings
   - ✅ All assets generated correctly
   - ❌ If build fails: STOP — fix build errors first; do NOT proceed to Level 1.

### Level 1: Code Quality & Static Analysis

**Run the project's static-analysis gates** (see the adaptation note above — substitute stack equivalents where a gate doesn't exist, and record the substitution):

```bash
# TS/web example:

# Type check
pnpm type-check

# Lint
pnpm lint

# Format check (if applicable)
pnpm format:check
```

**Manual checks:**

1. **File Size Check**
   ```bash
   # Check all source files in feature (extend the extension list to match the stack)
   find features/[feature-name] -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' -o -name '*.py' -o -name '*.go' -o -name '*.rs' \) | xargs wc -l
   ```
   - ✅ All files under 500 lines
   - ❌ If any file > 500 lines, split it

2. **TypeScript Quality**
   - ✅ No `any` types (except justified cases)
   - ✅ All functions have return types
   - ✅ All parameters have types
   - ✅ Proper interfaces for objects

3. **Code Organization**
   - ✅ All feature code in `features/[feature-name]/`
   - ✅ No cross-feature dependencies
   - ✅ Proper use of `shared/` and `core/`
   - ✅ Follows Vertical Slice Architecture

4. **Error Handling**
   - ✅ Try-catch blocks where needed
   - ✅ Proper error messages
   - ✅ Appropriate HTTP status codes (APIs)
   - ✅ User-friendly error messages (UI)

5. **Security**
   - ✅ No secrets in code
   - ✅ Input validation present
   - ✅ Parameterized queries (if database)
   - ✅ HTTPS used for external calls
   - ✅ Authentication/authorization implemented

6. **Documentation**
   - ✅ JSDoc/TSDoc for complex functions
   - ✅ README updated if needed
   - ✅ API documentation updated if needed
   - ✅ Inline comments for complex logic

### Level 2: Unit & Integration Tests

**Run all tests:**

```bash
# All tests
pnpm test

# Feature-specific tests
pnpm test features/[feature-name]

# Coverage report (if applicable)
pnpm test:coverage
```

**Verify:**
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ No flaky tests
- ✅ Coverage meets requirements (if specified)

**Test quality check:**
- ✅ Tests cover happy paths
- ✅ Tests cover error cases
- ✅ Tests cover edge cases
- ✅ Tests are readable and maintainable

### Level 3: Functional & Manual Testing

**Manual testing checklist:**

1. **Feature Functionality**
   - [ ] Feature works as specified in intent
   - [ ] All success criteria met
   - [ ] User stories satisfied
   - [ ] Edge cases handled correctly

2. **Integration Testing**
   - [ ] Feature integrates with existing code
   - [ ] No regressions in other features
   - [ ] Routes/components registered correctly
   - [ ] Configuration updated correctly

3. **User Experience**
   - [ ] UI is intuitive (if applicable)
   - [ ] Error messages are clear
   - [ ] Loading states work
   - [ ] Success feedback provided

4. **Performance**
   - [ ] No obvious performance issues
   - [ ] Queries are optimized (if database)
   - [ ] No memory leaks
   - [ ] Reasonable response times

5. **Cross-browser/Platform** (if applicable)
   - [ ] Works in target browsers
   - [ ] Works on target devices
   - [ ] Responsive design works

---

## Validation Report

Create: `spec/proposals/[feature-name]/validation-report.md`

```markdown
# Validation Report: [Feature Name]

## Date
[Current date]

## Level 0: Build Test
- ✅ Frozen dependency install passed
- ✅ Build passed
- Commands: `pnpm install --frozen-lockfile`, `pnpm build` (TS/web example — record any stack substitutions here)
- Result: Success

## Level 1: Code Quality
- ✅ Type check passed
- ✅ Lint passed
- ✅ All files under 500 lines
- ✅ No `any` types
- ✅ Proper error handling
- ✅ Security checks passed
- ✅ Documentation complete

## Level 2: Tests
- ✅ All unit tests passed (X/X)
- ✅ All integration tests passed (X/X)
- ✅ Coverage: X%
- Command: `pnpm test`

## Level 3: Manual Testing
- ✅ Feature works as specified
- ✅ All success criteria met
- ✅ No regressions
- ✅ Performance acceptable
- ✅ User experience good

## Issues Found
[List any issues found and how they were resolved]

## Conclusion
✅ Feature validated and ready for deployment

## Next Steps
- Archive change
- Update specs
- Deploy to staging/production
```

---

## Archiving

After validation passes, archive the change:

### Step 1: Create Archive Directory

```bash
mkdir -p spec/archive/$(date +%Y-%m-%d)-[feature-name]
```

### Step 2: Move Change Files

```bash
mv spec/proposals/[feature-name]/* spec/archive/$(date +%Y-%m-%d)-[feature-name]/
rmdir spec/proposals/[feature-name]
```

### Step 3: Update Specs

Apply the delta to update source-of-truth specs:

1. **Create new feature spec:**
   - File: `spec/current/features/[feature-name].md`
   - Content: Feature description, API, data models, etc.

2. **Update architecture spec:**
   - File: `spec/current/architecture.md`
   - Add: `features/[feature-name]/` to feature list

3. **Update other affected specs** (if any)

### Step 4: Create Archive Summary

Create: `spec/archive/$(date +%Y-%m-%d)-[feature-name]/SUMMARY.md`

```markdown
# Archive Summary: [Feature Name]

## Completed
[Current date]

## Feature Description
[Brief description]

## Files Created
- features/[feature-name]/...

## Files Modified
- [list]

## Validation
All validation levels (0-3) passed

## Deployed
[Deployment date/status]

## References
- Intent: PRPs/completed/[feature-name]/0-intent.md
- PRP: PRPs/completed/[feature-name]/1-prp.md
- Validation: validation-report.md
```

### Step 5: Archive the PRP

AFTER validation passes and the change is archived, move the PRP directory to the completed archive (it stays at `PRPs/[feature-name]/` until this point so `/validate` can read it):

```bash
mkdir -p PRPs/completed
mv PRPs/[feature-name]/ PRPs/completed/[feature-name]/
```

---

## Rules to Follow

**Reference**: `/docs/GOLDEN_RULES.md`

### Key Rules for Validation
1. ✅ **Level 0 build test is MANDATORY** - Must pass first (may be adapted to the stack, never skipped)
2. ✅ **All levels (0-3) must pass** - No shortcuts
3. ✅ **Fix issues immediately** - Don't defer problems
4. ✅ **Document everything** - Validation report is required
5. ✅ **Archive properly** - Update specs correctly

---

## Usage

```
# After completing /execute-plan
/validate user-auth

AI: [Runs Level 0: Build Test]
AI: ✅ Build passed

AI: [Runs Level 1: Code Quality]
AI: ✅ Type check passed
AI: ✅ Lint passed
AI: ✅ All files under 500 lines
AI: ✅ Code quality checks passed

AI: [Runs Level 2: Tests]
AI: ✅ All tests passed (25/25)

AI: [Runs Level 3: Manual Testing]
AI: ✅ Feature works as specified
AI: ✅ All success criteria met

AI: [Creates validation report]
AI: [Archives change]
AI: [Updates specs]

AI: ✅ Feature validated and archived!
AI: Ready for deployment.
```

---

## Next Steps

After validation completes:
1. **Review validation report**
2. **Deploy to staging** (if applicable)
3. **Test in staging**
4. **Deploy to production**
5. **Monitor for issues**

---

## Feature Complete! 🎉

The feature is now:
- ✅ Fully implemented
- ✅ Thoroughly validated
- ✅ Properly documented
- ✅ Archived and specs updated
- ✅ Ready for deployment



---

## 🌱 SeedFW Enhancements

### 1. Quality Checklist
Review against `docs/GOLDEN_RULES.md`:
- ✅ Build test passes
- ✅ Package manager used (no manual package.json edits)
- ✅ TypeScript strict mode (no `any` types)
- ✅ Atomic commits
- ✅ Security best practices (no secrets, input validation)

### 2. File Size Verification
- **Check**: All files under 500 lines
- **If Exceeded**: Recommend splitting into smaller modules
- **Report**: List any files exceeding limit

### 3. Architecture Verification
- **Check**: Follows Vertical Slice Architecture (see `docs/VERTICAL_SLICE_ARCHITECTURE.md`)
- **Verify**: Code organized by feature, not by layer
- **Report**: Any violations of architecture principles

### 4. Documentation Verification
- **Check**: Code is self-documenting
- **Verify**: Complex logic has comments
- **Report**: Areas needing better documentation

