---
description: "Validate an AI agent implementation against the 12-factor agents checklist"
---

# Agent Validate (12-Factor)

**Purpose**: Validate agent implementation against all 12 factors  
**Usage**: `/agent-validate`  
**When**: After `/agent-prp-execute` or anytime to audit existing agents

---

## 🎯 Overview

This command performs comprehensive validation of an AI agent against all 12+1 factors from the 12-Factor Agents methodology.

---

## 📋 Validation Process

### Step 1: Identify Agent

```
Which agent do you want to validate?

Path: src/agents/{agent-name}/
```

### Step 2: Run 12-Factor Checklist

For each factor, check the implementation and report:
- ✅ PASS: Fully implemented
- ⚠️ PARTIAL: Partially implemented
- ❌ FAIL: Not implemented or incorrect

---

## ✅ 12-Factor Validation Checklist

### Factor 1: Natural Language to Tool Calls
```
Check: Does the agent convert NL input to structured tool calls?

Verify:
- [ ] Input is natural language (user message, trigger)
- [ ] Output is structured JSON with intent + parameters
- [ ] Clear mapping from NL → tool selection

Files to check:
- src/agents/{name}/tools/index.ts
- src/agents/{name}/tools/schemas.ts
```

### Factor 2: Own Your Prompts
```
Check: Are prompts first-class code (no black box)?

Verify:
- [ ] System prompt is explicit (not hidden in framework)
- [ ] Prompts stored in prompts/ folder
- [ ] No Agent(role=..., goal=...) abstractions
- [ ] Prompts are version controlled

Files to check:
- src/agents/{name}/prompts/system.ts
- src/agents/{name}/prompts/templates.ts
```

### Factor 3: Own Your Context Window
```
Check: Is context engineering explicit and optimized?

Verify:
- [ ] Context structure is defined (XML/YAML/custom)
- [ ] Context builder function exists
- [ ] Sensitive data filtered out
- [ ] Token limits considered

Files to check:
- src/agents/{name}/context/builder.ts
```

### Factor 4: Tools Are Structured Outputs
```
Check: Are tools defined as JSON schemas with handlers?

Verify:
- [ ] Each tool has TypeScript interface
- [ ] Each tool has JSON schema
- [ ] Tools have explicit execute handlers
- [ ] Tools categorized as sync/async

Files to check:
- src/agents/{name}/tools/index.ts
- src/agents/{name}/tools/schemas.ts
- src/agents/{name}/types.ts
```

### Factor 5: Unify Execution and Business State
```
Check: Is all state in thread.events[]?

Verify:
- [ ] Thread structure with events array
- [ ] No separate "currentStep" or "status" fields
- [ ] State is serializable
- [ ] Can resume from any point

Files to check:
- src/agents/{name}/state/thread.ts
- src/agents/{name}/types.ts
```

### Factor 6: Launch/Pause/Resume with Simple APIs
```
Check: Can agent pause and resume via webhooks?

Verify:
- [ ] Save thread state function exists
- [ ] Load thread state function exists
- [ ] Pause points defined in control flow
- [ ] Resume handlers for webhooks

Files to check:
- src/agents/{name}/state/persistence.ts
- src/agents/{name}/control/loop.ts
```

### Factor 7: Contact Humans with Tool Calls
```
Check: Is human contact a first-class tool?

Verify:
- [ ] request_human_input tool defined
- [ ] request_approval tool (if high-stakes)
- [ ] escalate tool for errors
- [ ] Response handling implemented

Files to check:
- src/agents/{name}/human/contact.ts
- src/agents/{name}/human/approval.ts
```

### Factor 8: Own Your Control Flow
```
Check: Is control flow explicit (not framework-hidden)?

Verify:
- [ ] Main loop is visible code
- [ ] Break/continue logic is explicit
- [ ] Sync vs async handling clear
- [ ] Custom retry logic visible

Files to check:
- src/agents/{name}/control/loop.ts
```

### Factor 9: Compact Errors into Context
```
Check: Do errors go back into context for self-healing?

Verify:
- [ ] Errors appended to thread.events
- [ ] Max retry limit (default: 3)
- [ ] Escalation after threshold
- [ ] Error format is LLM-readable

Files to check:
- src/agents/{name}/control/errors.ts
- src/agents/{name}/control/loop.ts
```

### Factor 10: Small, Focused Agents
```
Check: Is agent scope limited and focused?

Verify:
- [ ] Single clear purpose
- [ ] ≤10 tools
- [ ] Typical flow ≤10 steps
- [ ] Clear responsibility boundaries

Files to check:
- Agent PRP Section 1
- src/agents/{name}/tools/index.ts
```

### Factor 11: Trigger From Anywhere
```
Check: Can agent be triggered from multiple sources?

Verify:
- [ ] At least one trigger implemented
- [ ] Response channel defined
- [ ] Trigger handlers in triggers/ folder

Files to check:
- src/agents/{name}/triggers/
- src/agents/{name}/index.ts
```

### Factor 12: Stateless Reducer
```
Check: Is agent a pure function (state, event) => newState?

Verify:
- [ ] No hidden state
- [ ] Same input = same output
- [ ] Agent step is deterministic given context

Files to check:
- src/agents/{name}/index.ts
- src/agents/{name}/control/loop.ts
```

### Factor 13: Pre-fetch Context
```
Check: Is predictable data pre-fetched?

Verify:
- [ ] Pre-fetch function exists
- [ ] Common data fetched before first LLM call
- [ ] Reduces round-trips

Files to check:
- src/agents/{name}/context/pre-fetch.ts
```

---

## 📊 Validation Report

Generate report after checking all factors:

```markdown
# Agent Validation Report: {agent-name}

## Summary
- Total Factors: 13
- ✅ Passed: X
- ⚠️ Partial: Y
- ❌ Failed: Z

## Details

| Factor | Status | Notes |
|--------|--------|-------|
| 1. NL → Tools | ✅/⚠️/❌ | {notes} |
| 2. Own Prompts | ✅/⚠️/❌ | {notes} |
| ... | ... | ... |

## Required Fixes
1. {issue and fix}
2. {issue and fix}

## Recommendations
1. {improvement suggestion}
```

---

## 🔄 Next Steps

If validation fails:
1. Fix issues listed in report
2. Re-run `/agent-validate`

If validation passes:
```bash
/validate             # Run standard SeedFW validation
/commit      # Commit changes
```

