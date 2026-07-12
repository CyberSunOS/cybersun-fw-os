---
description: "Create a comprehensive Agent PRP covering all 12 factors of the 12-factor agents methodology"
---

# Agent PRP Create (12-Factor)

**Purpose**: Create comprehensive Agent PRP covering all 12 factors  
**Usage**: `/agent-prp-create`  
**Prerequisite**: Run `/agent-intent` first

---

## 🎯 Overview

This command creates a Production-Ready Prompt (PRP) for an AI agent, ensuring all 12 factors are addressed.

---

## 📋 Pre-Creation Checklist

Before creating the Agent PRP:

- [ ] `/agent-intent` completed and confirmed
- [ ] Tech stack confirmed (read `TECH_STACK.md`)
- [ ] Read `docs/12-FACTOR-AGENTS.md`
- [ ] Read `docs/GOLDEN_RULES.md`
- [ ] Research existing agents in codebase (if any)

---

## 🏗️ Agent PRP Structure

Create the PRP with ALL sections below. Use the template at `templates/agent-prp-template.md`.

### Section 1: Agent Identity (Factor 10)
```markdown
## 1. Agent Identity

**Name**: {agent-name}
**Purpose**: {one sentence - what this agent does}
**Domain**: {specific domain/scope}
**Max Steps**: {3-10 recommended}
**Max Tools**: {≤10 recommended}

### Responsibility Boundaries
- IN SCOPE: {list what agent handles}
- OUT OF SCOPE: {list what agent does NOT handle}
```

### Section 2: Prompts (Factor 2)
```markdown
## 2. Prompts (Factor 2: Own Your Prompts)

### System Prompt
```
{Full system prompt - NO black box abstractions}
{Include: role, capabilities, constraints, output format}
```

### User Prompt Template
```
{Template for building user messages}
{Include placeholders for context injection}
```

### Output Format
```json
{
  "intent": "tool_name",
  "parameters": { ... },
  "reasoning": "why this action"
}
```
```

### Section 3: Context Engineering (Factor 3)
```markdown
## 3. Context Engineering (Factor 3: Own Your Context)

### Context Structure
{XML/YAML/Custom format for context window}

### Context Components
1. **System Instructions**: {what}
2. **Pre-fetched Data**: {what - Factor 13}
3. **Conversation History**: {format}
4. **Tool Results**: {format}
5. **Error History**: {format}

### Context Limits
- Max tokens: {limit}
- Truncation strategy: {oldest first / summarize / etc}

### Excluded Data (Security)
- {list sensitive data that never enters context}
```

### Section 4: Tools (Factor 4)
```markdown
## 4. Tools (Factor 4: Structured Outputs)

### Tool Definitions

#### Tool: {tool_name}
```typescript
interface {ToolName} {
  intent: "{tool_name}";
  // parameters
}
```
**Type**: SYNC | ASYNC
**Description**: {what it does}
**External API**: {if applicable}

{Repeat for each tool}

### Special Tools
- `request_human_input`: For human contact (Factor 7)
- `done_for_now`: Signal task completion
- `request_approval`: For high-stakes actions
```

### Section 5: State Management (Factor 5)
```markdown
## 5. State Management (Factor 5: Unified State)

### Thread Structure
```typescript
interface Thread {
  id: string;
  agentName: string;
  createdAt: Date;
  events: Event[];
  metadata: Record<string, unknown>;
}

interface Event {
  type: string;
  data: unknown;
  timestamp: Date;
}
```

### Event Types
- `user_message`: Initial trigger
- `tool_call`: Agent decided to call tool
- `tool_result`: Result from tool execution
- `error`: Error occurred
- `human_response`: Response from human
- `done`: Task completed
```

### Section 6: Control Flow (Factor 8)
```markdown
## 6. Control Flow (Factor 8: Own Your Control Flow)

### Main Loop Structure
```
1. Build context from thread
2. Call LLM for next step
3. Switch on intent:
   - SYNC tool → execute, append result, continue
   - ASYNC tool → save state, notify, break
   - done → break
   - error → handle, maybe retry
4. Repeat until done or paused
```

### Pause Points (Factor 6)
- {list conditions that pause the loop}

### Resume Triggers
- {list webhooks/events that resume}
```

### Section 7: Human Interaction (Factor 7)
```markdown
## 7. Human Interaction (Factor 7: Contact Humans)

### Contact Points
| Situation | Tool | Urgency | Format |
|-----------|------|---------|--------|
| Unclear instructions | request_human_input | medium | free_text |
| Production deploy | request_approval | high | yes_no |
| Repeated errors | escalate | high | free_text |

### Approval Workflows
- **High-stakes actions**: {list actions needing approval}
- **Approval timeout**: {what happens if no response}
```

### Section 8: Triggers (Factor 11)
```markdown
## 8. Triggers (Factor 11: Trigger From Anywhere)

### Entry Points
| Trigger | Source | Handler |
|---------|--------|---------|
| Slack message | #channel | handleSlack() |
| API call | POST /agent | handleAPI() |
| Cron | 0 9 * * * | handleCron() |

### Response Channels
- {where agent sends responses}
```

### Section 9: Error Handling (Factor 9)
```markdown
## 9. Error Handling (Factor 9: Compact Errors)

### Error Strategy
- **Max consecutive retries**: 3
- **After max retries**: escalate to human
- **Error format in context**:
```xml
<error tool="{tool_name}" attempt="{n}">
  {error_message}
</error>
```

### Recovery Actions
- {specific recovery strategies per error type}
```

### Section 10: Pre-fetch (Factor 13)
```markdown
## 10. Pre-fetch Data (Factor 13)

### Always Pre-fetch
- {data that's always needed}

### Conditional Pre-fetch
- {data fetched based on trigger type}

### Pre-fetch Code
```typescript
async function prefetchContext(trigger: Trigger): Promise<PrefetchedData> {
  // Implementation
}
```
```

### Section 11: File Structure
```markdown
## 11. Implementation Structure

```
src/agents/{agent-name}/
├── prompts/
│   ├── system.ts
│   └── templates.ts
├── tools/
│   ├── index.ts
│   └── schemas.ts
├── context/
│   ├── builder.ts
│   └── pre-fetch.ts
├── state/
│   ├── thread.ts
│   └── persistence.ts
├── control/
│   ├── loop.ts
│   └── errors.ts
├── triggers/
│   └── {trigger-type}.ts
├── human/
│   ├── contact.ts
│   └── approval.ts
├── index.ts
└── types.ts
```
```

### Section 12: Validation Checklist
```markdown
## 12. 12-Factor Validation Checklist

- [ ] Factor 1: NL → Tool calls defined
- [ ] Factor 2: Prompts are first-class code
- [ ] Factor 3: Context window engineered
- [ ] Factor 4: Tools are structured outputs
- [ ] Factor 5: State unified in thread.events
- [ ] Factor 6: Pause/resume points defined
- [ ] Factor 7: Human contact tools defined
- [ ] Factor 8: Control flow is explicit
- [ ] Factor 9: Error handling with retries
- [ ] Factor 10: Agent is focused (≤10 tools/steps)
- [ ] Factor 11: Triggers configured
- [ ] Factor 12: Agent is stateless reducer
- [ ] Factor 13: Pre-fetch implemented
```

---

## ✅ PRP Approval

After creating the PRP:

1. **Review all 12 sections** are complete
2. **Validate against checklist** in Section 12
3. **Get user approval** before executing
4. **Save PRP** to `docs/prp/agents/{agent-name}-prp.md`

---

## 🔄 Next Steps

After PRP approval:
```bash
/agent-prp-execute    # Implement the agent
/agent-validate       # Validate against 12 factors
```

