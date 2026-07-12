---
description: "Implement an AI agent from an approved Agent PRP following the 12-factor methodology"
---

# Agent PRP Execute (12-Factor)

**Purpose**: Execute Agent PRP implementation following 12 factors  
**Usage**: `/agent-prp-execute`  
**Prerequisite**: Approved Agent PRP from `/agent-prp-create`

---

## 🎯 Overview

This command implements an AI agent following the approved PRP and 12-factor methodology.

---

## 📋 Pre-Execution Checklist

- [ ] Agent PRP is approved
- [ ] File structure from PRP Section 11 is clear
- [ ] Tech stack confirmed
- [ ] Dependencies identified
- [ ] No existing agent with same name

---

## 🏗️ Implementation Order

Execute in this order to ensure dependencies are met:

### Phase 1: Foundation (Types & Schemas)

**Step 1.1**: Create `src/agents/{name}/types.ts`
```typescript
// All TypeScript interfaces from PRP
// - Tool interfaces (Factor 4)
// - Event types (Factor 5)
// - Thread structure (Factor 5)
// - Trigger types (Factor 11)
```

**Step 1.2**: Create `src/agents/{name}/tools/schemas.ts`
```typescript
// JSON schemas for all tools
// Used for LLM structured output
```

### Phase 2: Prompts (Factor 2)

**Step 2.1**: Create `src/agents/{name}/prompts/system.ts`
```typescript
// System prompt from PRP Section 2
// NO black box abstractions
export const SYSTEM_PROMPT = `...`;
```

**Step 2.2**: Create `src/agents/{name}/prompts/templates.ts`
```typescript
// User prompt templates
// Context injection placeholders
export function buildUserPrompt(context: Context): string { ... }
```

### Phase 3: Context Engineering (Factor 3)

**Step 3.1**: Create `src/agents/{name}/context/builder.ts`
```typescript
// Build context window from thread
// Format: XML/YAML/custom as defined in PRP
export function buildContext(thread: Thread): string { ... }
```

**Step 3.2**: Create `src/agents/{name}/context/pre-fetch.ts`
```typescript
// Pre-fetch logic from PRP Section 10 (Factor 13)
export async function prefetchContext(trigger: Trigger): Promise<PrefetchedData> { ... }
```

### Phase 4: Tools (Factor 4)

**Step 4.1**: Create `src/agents/{name}/tools/index.ts`
```typescript
// Tool definitions and execution
// Each tool = intent + parameters + handler
export const tools = {
  tool_name: {
    schema: toolSchema,
    execute: async (params) => { ... },
    type: 'sync' | 'async'
  }
};
```

### Phase 5: State Management (Factor 5)

**Step 5.1**: Create `src/agents/{name}/state/thread.ts`
```typescript
// Thread/event management
export class Thread {
  events: Event[] = [];
  append(event: Event): void { ... }
  toContext(): string { ... }
}
```

**Step 5.2**: Create `src/agents/{name}/state/persistence.ts`
```typescript
// Save/load thread state (Factor 6)
export async function saveThread(thread: Thread): Promise<string> { ... }
export async function loadThread(id: string): Promise<Thread> { ... }
```

### Phase 6: Control Flow (Factor 8)

**Step 6.1**: Create `src/agents/{name}/control/loop.ts`
```typescript
// Main agent loop from PRP Section 6
export async function runAgentLoop(thread: Thread): Promise<AgentResult> {
  while (true) {
    const context = buildContext(thread);
    const nextStep = await determineNextStep(context);
    
    // Handle based on intent type
    switch (nextStep.intent) {
      case 'sync_tool':
        // Execute and continue
        break;
      case 'async_tool':
        // Save state and break
        break;
      case 'done':
        return result;
    }
  }
}
```

**Step 6.2**: Create `src/agents/{name}/control/errors.ts`
```typescript
// Error handling from PRP Section 9 (Factor 9)
export function handleError(error: Error, thread: Thread, retryCount: number): ErrorAction { ... }
```

### Phase 7: Human Interaction (Factor 7)

**Step 7.1**: Create `src/agents/{name}/human/contact.ts`
```typescript
// Human contact tools from PRP Section 7
export async function requestHumanInput(request: HumanRequest): Promise<void> { ... }
export async function notifyHuman(message: string, channel: string): Promise<void> { ... }
```

**Step 7.2**: Create `src/agents/{name}/human/approval.ts`
```typescript
// Approval workflows
export async function requestApproval(action: HighStakesAction): Promise<void> { ... }
```

### Phase 8: Triggers (Factor 11)

**Step 8.1**: Create trigger handlers from PRP Section 8
```typescript
// src/agents/{name}/triggers/slack.ts
// src/agents/{name}/triggers/api.ts
// src/agents/{name}/triggers/cron.ts
// etc.
```

### Phase 9: Entry Point (Factor 12)

**Step 9.1**: Create `src/agents/{name}/index.ts`
```typescript
// Agent entry point - stateless reducer
export async function handleTrigger(trigger: Trigger): Promise<AgentResult> {
  // 1. Load or create thread
  // 2. Pre-fetch context
  // 3. Run agent loop
  // 4. Return result
}
```

---

## ✅ Implementation Checklist

After each file, verify:

- [ ] Follows PRP specification exactly
- [ ] No black box abstractions (Factor 2)
- [ ] Types are strict (no `any`)
- [ ] File under 500 lines
- [ ] Tests planned/created

---

## 🧪 Testing Strategy

Create tests for:

1. **Unit Tests**: Each tool, prompt builder, context builder
2. **Integration Tests**: Full agent loop with mocked LLM
3. **E2E Tests**: Complete flows with real triggers

---

## 🔄 Next Steps

After implementation:
```bash
/agent-validate       # Validate against all 12 factors
/validate             # Run standard SeedFW validation
/commit      # Commit changes
```

