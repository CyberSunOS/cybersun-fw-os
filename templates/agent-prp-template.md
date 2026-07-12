# Agent PRP: {AGENT_NAME}

**Created**: {DATE}  
**Status**: Draft | Approved | Implemented  
**Author**: {AUTHOR}

---

## 1. Agent Identity (Factor 10: Small, Focused)

**Name**: {agent-name}  
**Purpose**: {One sentence describing what this agent does}  
**Domain**: {Specific domain/vertical}  
**Max Steps**: {3-10 recommended}  
**Max Tools**: {≤10 recommended}

### Responsibility Boundaries

**IN SCOPE**:
- {What this agent handles}

**OUT OF SCOPE**:
- {What this agent does NOT handle}

---

## 2. Prompts (Factor 2: Own Your Prompts)

### System Prompt
```
You are {agent role}.

Your responsibilities:
- {responsibility 1}
- {responsibility 2}

Constraints:
- {constraint 1}
- {constraint 2}

Output format:
Always respond with JSON containing:
- intent: the tool to call
- parameters: tool parameters
- reasoning: brief explanation
```

### User Prompt Template
```
{context_placeholder}

Current request: {user_input}

What should the next step be?
```

### Output Schema
```json
{
  "intent": "tool_name",
  "parameters": {},
  "reasoning": "string"
}
```

---

## 3. Context Engineering (Factor 3: Own Your Context)

### Context Structure (XML Format)
```xml
<agent_context>
  <system_info>
    <!-- Pre-fetched data (Factor 13) -->
  </system_info>
  
  <history>
    <!-- Previous events from thread -->
  </history>
  
  <current_request>
    <!-- Current user input -->
  </current_request>
</agent_context>
```

### Context Components
| Component | Source | Max Tokens |
|-----------|--------|------------|
| System info | Pre-fetch | {X} |
| History | Thread events | {X} |
| Current request | Trigger | {X} |

### Excluded Data (Security)
- {Sensitive data to exclude}

---

## 4. Tools (Factor 4: Structured Outputs)

### Tool: {tool_1_name}
```typescript
interface Tool1 {
  intent: "tool_1_name";
  param1: string;
  param2: number;
}
```
- **Type**: SYNC | ASYNC
- **Description**: {What it does}
- **External API**: {If applicable}

### Tool: request_human_input (Factor 7)
```typescript
interface RequestHumanInput {
  intent: "request_human_input";
  question: string;
  context: string;
  options: {
    urgency: "low" | "medium" | "high";
    format: "free_text" | "yes_no" | "multiple_choice";
    choices?: string[];
  };
}
```
- **Type**: ASYNC
- **Description**: Request input from human

### Tool: done_for_now
```typescript
interface DoneForNow {
  intent: "done_for_now";
  message: string;
  result?: unknown;
}
```
- **Type**: SYNC (terminates loop)
- **Description**: Signal task completion

---

## 5. State Management (Factor 5: Unified State)

### Thread Structure
```typescript
interface Thread {
  id: string;
  agentName: "{agent-name}";
  createdAt: Date;
  updatedAt: Date;
  status: "running" | "paused" | "completed" | "failed";
  events: Event[];
  metadata: {
    triggeredBy: string;
    channel: string;
  };
}

interface Event {
  id: string;
  type: EventType;
  data: unknown;
  timestamp: Date;
}

type EventType = 
  | "trigger"
  | "tool_call"
  | "tool_result"
  | "error"
  | "human_request"
  | "human_response"
  | "done";
```

---

## 6. Control Flow (Factor 8: Own Your Control Flow)

### Main Loop
```
1. Receive trigger
2. Load or create thread
3. Pre-fetch context (Factor 13)
4. LOOP:
   a. Build context from thread
   b. Call LLM for next step
   c. Switch on intent:
      - SYNC tool → execute, append result, continue
      - ASYNC tool → save state, notify, BREAK
      - done → BREAK
      - error → handle, retry or escalate
5. Return result
```

### Pause Points (Factor 6)
- {Condition 1 that pauses}
- {Condition 2 that pauses}

### Resume Triggers
- Webhook: `POST /agents/{agent-name}/resume/{thread-id}`
- Event: `{event_type}`

---

## 7. Human Interaction (Factor 7: Contact Humans)

### Contact Points
| Situation | Tool | Urgency | Format |
|-----------|------|---------|--------|
| Unclear instructions | request_human_input | medium | free_text |
| {High-stakes action} | request_approval | high | yes_no |
| Repeated errors (3+) | escalate | high | free_text |
| Task complete | notify | low | message |

### Approval Workflows
**Actions requiring approval**:
- {Action 1}
- {Action 2}

**Approval timeout**: {X minutes} → {fallback action}

---

## 8. Triggers (Factor 11: Trigger From Anywhere)

### Entry Points
| Trigger | Source | Handler |
|---------|--------|---------|
| {Slack} | #{channel} | handleSlack() |
| {API} | POST /agents/{name} | handleAPI() |
| {Cron} | {schedule} | handleCron() |

### Response Channels
- Primary: {Same as trigger}
- Fallback: {Alternative channel}

---

## 9. Error Handling (Factor 9: Compact Errors)

### Error Strategy
- **Max consecutive retries**: 3
- **Retry backoff**: exponential (1s, 2s, 4s)
- **After max retries**: escalate to human

### Error Format in Context
```xml
<error tool="{tool_name}" attempt="{n}" timestamp="{ts}">
  {error_message}
</error>
```

### Recovery Actions
| Error Type | Recovery |
|------------|----------|
| API timeout | Retry with backoff |
| Invalid input | Request clarification |
| Auth failure | Escalate immediately |
| Unknown | Log and escalate |

---

## 10. Pre-fetch Data (Factor 13)

### Always Pre-fetch
- {Data item 1}
- {Data item 2}

### Conditional Pre-fetch
| Condition | Data to fetch |
|-----------|---------------|
| {Trigger is Slack} | {Channel info, user info} |
| {Trigger is API} | {Request context} |

---

## 11. Implementation Structure

```
src/agents/{agent-name}/
├── prompts/
│   ├── system.ts          # System prompt
│   └── templates.ts       # Prompt templates
├── tools/
│   ├── index.ts           # Tool handlers
│   └── schemas.ts         # JSON schemas
├── context/
│   ├── builder.ts         # Context builder
│   └── pre-fetch.ts       # Pre-fetch logic
├── state/
│   ├── thread.ts          # Thread management
│   └── persistence.ts     # Save/load
├── control/
│   ├── loop.ts            # Main agent loop
│   └── errors.ts          # Error handling
├── triggers/
│   ├── slack.ts           # Slack handler
│   ├── api.ts             # API handler
│   └── cron.ts            # Cron handler
├── human/
│   ├── contact.ts         # Human contact
│   └── approval.ts        # Approvals
├── index.ts               # Entry point
└── types.ts               # TypeScript types
```

---

## 12. 12-Factor Validation Checklist

- [ ] **Factor 1**: NL → Tool calls mapping defined
- [ ] **Factor 2**: Prompts are first-class code (no black box)
- [ ] **Factor 3**: Context window structure defined
- [ ] **Factor 4**: All tools have schemas and handlers
- [ ] **Factor 5**: State unified in thread.events
- [ ] **Factor 6**: Pause/resume points documented
- [ ] **Factor 7**: Human contact tools defined
- [ ] **Factor 8**: Control flow is explicit
- [ ] **Factor 9**: Error handling with retry limits
- [ ] **Factor 10**: Agent is focused (≤10 tools, ≤10 steps)
- [ ] **Factor 11**: Triggers configured
- [ ] **Factor 12**: Agent is stateless reducer
- [ ] **Factor 13**: Pre-fetch data identified

---

## 13. Approval

**PRP Approved By**: _______________
**Date**: _______________
**Notes**: _______________

---

## 14. Next Steps

After approval:
```bash
/agent-prp-execute    # Implement the agent
/agent-validate       # Validate against 12 factors
/validate             # Standard SeedFW validation
/commit      # Commit changes
```

