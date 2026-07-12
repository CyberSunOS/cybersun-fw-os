---
description: Systematic root cause analysis and debugging of an issue
arguments: "Description of the issue to debug"
---

# Debug RCA (Root Cause Analysis)

## Issue: $ARGUMENTS

## Mission

Systematically debug an issue, identify the true root cause through structured analysis, and fix
it properly — not just the symptoms.

**When to use**: Bug investigation, production issues, unexpected behavior.

## Documentation Loading

Before debugging, load the relevant project docs for context:
- `TECH_STACK.md` - Canonical tech stack (build/test/lint commands)
- `docs/GOLDEN_RULES.md` - Development standards
- `docs/VERTICAL_SLICE_ARCHITECTURE.md` - Architecture guidelines
- `project.md` - Project-specific conventions (if it exists)

Respect existing patterns, conventions, and slice boundaries throughout.

---

## RCA Process

### Step 1: Problem Definition

Clearly define the issue:
- **What is happening?** [Observed behavior]
- **What should happen?** [Expected behavior]
- **When did it start?** [Timeline]
- **How often?** [Always, sometimes, rarely]
- **Who is affected?** [All users, specific users, specific conditions]

### Step 2: Reproduce & Gather Evidence

- Get exact reproduction steps and verify you see the same problem.
- Collect evidence — don't guess:
  1. **Error messages** - Full stack traces
  2. **Logs** - Application logs, server logs
  3. **User reports** - What users are saying
  4. **Environment** - Browser, OS, device, network
  5. **Recent changes** - Recent commits, deployments
     ```bash
     git log --oneline -10
     ```
  6. **Reproduction steps** - Minimal reproducible example

### Step 3: Hypothesis Generation

Brainstorm possible causes:
1. **Code issues** - Logic errors, race conditions, null/undefined handling, type mismatches
2. **Data issues** - Invalid/missing data, corruption, database constraints
3. **Environment issues** - Config problems, missing env vars, network, resource constraints
4. **Integration issues** - API failures, third-party service issues, authentication
5. **Timing issues** - Race conditions, async/await problems, event ordering

### Step 4: Investigation

Isolate the problem using:
- **Binary search** - Comment out / narrow down code sections
- **Git bisect** - Find when the bug was introduced
- **Logging** - Add strategic log statements
- **Debugger** - Set breakpoints where applicable

For each hypothesis: check the code, check the data, check the logs, and reproduce locally with
different inputs and edge cases.

**Targeted strategies:**
- *Runtime errors* — Read the full stack trace; find the exact line; check variable values and
  data-type assumptions.
- *Logic errors* — Trace execution with logs; verify each step; check boundary conditions.
- *Performance issues* — Add timing measurements; check for N+1 queries and inefficient
  algorithms; profile if necessary.
- *Integration issues* — Verify the service is reachable; check credentials; validate
  request/response formats; test with curl/Postman first.

### Step 5: Root Cause Identification

- What is the actual cause?
- Why did it happen, and what allowed it to happen?
- Why wasn't it caught earlier?
- Are there similar issues elsewhere in the codebase?

### Step 6: Solution Design

1. **Immediate fix** - Stop the bleeding
2. **Proper fix** - Address the root cause (follow KISS; keep it minimal and focused)
3. **Prevention** - Stop recurrence (validation, tests, defensive programming)
4. **Detection** - Catch it earlier next time (logging, monitoring, alerts)

### Step 7: Verify Resolution

- Confirm the original issue is fixed.
- Check for regressions and test related functionality.
- Add a test that would have caught this bug.
- Run the full validation suite (see `TECH_STACK.md`).

---

## Output

Create: `PRPs/debug/[issue-name]-rca.md`

**Template:**
```markdown
# RCA: [Issue Name]

## Problem Statement
**Observed**: [What is happening]
**Expected**: [What should happen]
**Started**: [When]
**Frequency**: [How often]
**Affected**: [Who/what]

## Evidence
### Error Messages
[Full error messages and stack traces]

### Logs
[Relevant log entries]

### Reproduction Steps
1. [Step 1]
2. [Step 2]
Result: [What happens]

## Investigation
### Hypotheses Considered
1. ❌ [Hypothesis 1] - Ruled out because [reason]
2. ❌ [Hypothesis 2] - Ruled out because [reason]
3. ✅ [Hypothesis 3] - **ROOT CAUSE**

### Root Cause
**What**: [Exact cause]
**Why**: [Why it happened]
**How**: [How it manifested]
**When**: [When it was introduced]

### Contributing Factors
- [Factor 1]

## Solution
### Immediate Fix (Stop the bleeding)
[Quick fix to stop the issue]

### Proper Fix (Address root cause)
**Files to modify**:
1. `path/to/file.ts` - [Changes needed]

```typescript
// Before
[problematic code]
// After
[fixed code]
```

### Prevention (Prevent recurrence)
- [ ] Add validation: [Where]
- [ ] Add error handling: [Where]
- [ ] Add tests: [What tests]
- [ ] Update documentation: [What docs]

### Detection (Catch earlier)
- [ ] Add logging: [Where]
- [ ] Add monitoring: [What metrics]
- [ ] Add alerts: [What conditions]

## Testing Plan
- [ ] Reproduce the issue
- [ ] Apply the fix
- [ ] Verify issue is resolved
- [ ] Test edge cases
- [ ] Run full test suite
- [ ] Deploy to staging and monitor in production

## Lessons Learned
- [Lesson 1]

## Action Items
- [ ] Implement immediate fix
- [ ] Implement proper fix
- [ ] Add prevention & detection measures
- [ ] Update documentation
- [ ] Share learnings with team
```

---

## Debug Checklist

- [ ] Issue reproduced locally
- [ ] Evidence gathered (not guessed)
- [ ] Hypotheses tested and verified
- [ ] Root cause identified (not just symptoms)
- [ ] Fix implemented at the root cause
- [ ] Tests added/updated
- [ ] No regressions introduced
- [ ] Documentation updated if needed

---

## Rules to Follow

**Reference**: `docs/GOLDEN_RULES.md`

1. ✅ **Be systematic** - Follow the process
2. ✅ **Gather evidence** - Don't guess
3. ✅ **Test hypotheses** - Verify assumptions
4. ✅ **Find root cause** - Not just symptoms
5. ✅ **Prevent recurrence** - Fix it properly
6. ✅ **Document learnings** - Help future debugging

The goal is not just to fix the bug, but to understand why it happened and prevent similar issues
in the future.

---

## Usage

```
/debug-rca login-failing

AI: [Gathers evidence]
AI: [Generates hypotheses]
AI: [Investigates each hypothesis]
AI: [Identifies root cause]
AI: [Proposes solution]
AI: Created: PRPs/debug/login-failing-rca.md
```
