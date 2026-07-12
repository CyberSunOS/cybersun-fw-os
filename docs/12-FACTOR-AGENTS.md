# 12-Factor Agents for SeedFW

**Purpose**: Guidelines for building production-grade AI agents using the 12-factor methodology  
**Source**: [HumanLayer 12-Factor Agents](https://github.com/humanlayer/12-factor-agents)  
**Version**: 1.0.0  
**Date**: 2025-12-02

---

## 🎯 Overview

The 12-Factor Agents methodology provides best practices for building reliable, maintainable, and production-ready AI agents. This document integrates these principles into SeedFW's workflow.

### Core Insight: Agents as Loops

```
┌─────────────────────────────────────────────────────────┐
│                    AGENT LOOP                            │
│                                                          │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│   │ Context  │ → │   LLM    │ → │  Tool    │          │
│   │ Window   │    │ Decision │    │  Call    │          │
│   └──────────┘    └──────────┘    └────┬─────┘         │
│        ↑                               │                │
│        └───────────────────────────────┘                │
│              (Result appended to context)               │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 The 12+1 Factors

### Factor 1: Natural Language to Tool Calls
**Principle**: Convert natural language into structured tool calls

**SeedFW Integration**:
- Use Intent Translator to clarify user intent
- Define tools as JSON schemas in Agent PRP
- Map intents to specific tool definitions

```python
# User: "Create a payment link for $750 to Terri"
# → Structured output:
{
  "intent": "create_payment_link",
  "parameters": {"amount": 750, "customer": "Terri"}
}
```

---

### Factor 2: Own Your Prompts
**Principle**: Don't outsource prompt engineering to frameworks. Treat prompts as first-class code.

**SeedFW Integration**:
- Store prompts in `src/agents/{agent-name}/prompts/`
- Version control all prompts
- Test prompts like code
- NO black-box abstractions

**Anti-pattern** (avoid):
```python
agent = Agent(role="...", goal="...", personality="...")  # Black box!
```

**Correct pattern**:
```python
SYSTEM_PROMPT = """
You are a deployment assistant. You:
- Check deployment environment (staging vs production)
- Verify the tag/version exists
- Request approval for production deployments
"""
```

---

### Factor 3: Own Your Context Window
**Principle**: Context engineering is everything. Control what goes into the LLM.

**SeedFW Integration**:
- Design context structure in Agent PRP
- Use XML/YAML format for clarity
- Pre-fetch predictable data (Factor 13)
- Filter sensitive information

**Context includes**:
- System prompt and instructions
- RAG documents / external data
- Tool call history and results
- Memory from previous conversations

```xml
<slack_message>
    From: @alex
    Channel: #deployments  
    Text: Deploy backend v1.2.3 to production
</slack_message>

<available_tags>
    - v1.2.3 (latest)
    - v1.2.2
    - v1.2.1
</available_tags>
```

---

### Factor 4: Tools Are Structured Outputs
**Principle**: Tools are just JSON that triggers deterministic code

**SeedFW Integration**:
- Define all tools as TypeScript interfaces
- Tools = intent + parameters
- Deterministic code executes the action

```typescript
interface CreateIssue {
  intent: "create_issue";
  title: string;
  description: string;
  assignee_id: string;
}

interface SearchIssues {
  intent: "search_issues";
  query: string;
}

type AgentOutput = CreateIssue | SearchIssues | DoneForNow;
```

---

### Factor 5: Unify Execution State and Business State
**Principle**: Keep one source of truth. Infer execution state from context.

**SeedFW Integration**:
- Store everything in `Thread.events[]`
- No separate "current step" tracking
- Serialize/deserialize easily
- Recovery = load thread and continue

```typescript
interface Thread {
  id: string;
  events: Event[];  // Everything is here
}

// Execution state IS the events list
// No separate: currentStep, waitingFor, retryCount, etc.
```

---

### Factor 6: Launch/Pause/Resume with Simple APIs
**Principle**: Agents should pause for long operations and resume via webhooks

**SeedFW Integration**:
- Design pause points in Agent PRP
- Save thread state before pausing
- Resume via webhook with thread ID
- Support cron/event triggers

```python
# Pause
await save_thread(thread)
return {"status": "paused", "thread_id": thread.id}

# Resume (webhook)
@app.post("/webhook/{thread_id}")
async def resume(thread_id: str, response: dict):
    thread = await load_thread(thread_id)
    thread.events.append({"type": "human_response", "data": response})
    return await continue_agent(thread)
```

---

### Factor 7: Contact Humans with Tool Calls
**Principle**: Human interaction is just another tool call

**SeedFW Integration**:
- Define `request_human_input` as a tool
- Specify urgency, format, choices
- Break loop and wait for response
- Support approval workflows

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

---

### Factor 8: Own Your Control Flow
**Principle**: Build custom control structures for your use case

**SeedFW Integration**:
- Design loop structure in Agent PRP
- Define when to break/continue
- Handle sync vs async tools differently
- Implement custom retry logic

```python
while True:
    next_step = await determine_next_step(thread)

    if next_step.intent == "request_clarification":
        await notify_human(next_step)
        await save_thread(thread)
        break  # Async - wait for webhook

    elif next_step.intent == "fetch_data":
        result = await fetch_data(next_step)
        thread.events.append(result)
        continue  # Sync - keep looping

    elif next_step.intent == "high_stakes_action":
        await request_approval(next_step)
        await save_thread(thread)
        break  # Async - wait for approval
```

---

### Factor 9: Compact Errors into Context Window
**Principle**: Errors go back into context for self-healing

**SeedFW Integration**:
- Append errors to thread.events
- Limit consecutive retries (3 max)
- Escalate to human after threshold
- Clean up resolved errors from context

```python
try:
    result = await execute_tool(next_step)
    consecutive_errors = 0
except Exception as e:
    consecutive_errors += 1
    thread.events.append({
        "type": "error",
        "data": format_error(e)
    })
    if consecutive_errors >= 3:
        await escalate_to_human(thread)
        break
```

---

### Factor 10: Small, Focused Agents
**Principle**: Build agents that do ONE thing well (3-10 steps max)

**SeedFW Integration**:
- One agent per vertical slice
- Max 10 tools per agent
- Clear, single responsibility
- Compose agents for complex workflows

**Why?**: As context grows, LLMs lose focus. Keep it small.

```
❌ BAD: "Universal assistant that can do anything"
✅ GOOD: "Deployment agent for backend services"
✅ GOOD: "Issue triage agent for support tickets"
✅ GOOD: "Invoice processing agent"
```

---

### Factor 11: Trigger From Anywhere
**Principle**: Meet users where they are (Slack, email, SMS, API, cron)

**SeedFW Integration**:
- Design triggers in Agent PRP
- Support multiple entry points
- Respond via same channel
- Enable event/cron triggers

```typescript
interface AgentTriggers {
  slack?: { channels: string[]; keywords?: string[] };
  email?: { addresses: string[] };
  api?: { endpoint: string };
  cron?: { schedule: string };
  events?: { types: string[] };
}
```

---

### Factor 12: Make Your Agent a Stateless Reducer
**Principle**: `(state, event) => newState` - pure function

**SeedFW Integration**:
- Agent = function that takes thread, returns next action
- No hidden state
- Deterministic given same input
- Easy to test and debug

```python
def agent_step(thread: Thread) -> AgentAction:
    """Pure function: thread in, action out"""
    context = build_context(thread)
    return llm.determine_next_step(context)
```

---

### Factor 13 (Appendix): Pre-fetch Context
**Principle**: If you know the agent will need data, fetch it upfront

**SeedFW Integration**:
- Identify predictable data needs
- Fetch before first LLM call
- Include in initial context
- Reduce round-trips

```python
# Instead of letting agent call list_git_tags...
git_tags = await fetch_git_tags()  # Pre-fetch

thread.events.append({
    "type": "available_git_tags",
    "data": git_tags
})

# Now agent has data in first context window
next_step = await determine_next_step(thread)
```

---

## 🔗 SeedFW + 12-Factor Mapping

| SeedFW Step | 12-Factor Alignment |
|-------------|---------------------|
| Step 0: Context Loading | Factor 3, 13 (Context Engineering) |
| Step 1: Intent Clarification | Factor 1, 7 (NL→Tools, Human Contact) |
| Step 2: PRP Creation | Factor 2, 4 (Own Prompts, Tools) |
| Step 3: Planning | Factor 5, 10 (Unified State, Focus) |
| Step 4: Execution | Factor 6, 8, 12 (Control Flow) |
| Step 5: Validation | Factor 9 (Error Handling) |
| Step 6: Git Operations | Factor 11 (Trigger Anywhere) |

---

## 📁 Agent File Structure (Vertical Slice)

```
src/agents/{agent-name}/
├── prompts/
│   ├── system.ts          # System prompt (Factor 2)
│   └── templates.ts       # Prompt templates
├── tools/
│   ├── index.ts           # Tool definitions (Factor 4)
│   └── schemas.ts         # JSON schemas
├── context/
│   ├── builder.ts         # Context engineering (Factor 3)
│   └── pre-fetch.ts       # Pre-fetch logic (Factor 13)
├── state/
│   ├── thread.ts          # Thread/state management (Factor 5)
│   └── persistence.ts     # Save/load (Factor 6)
├── control/
│   ├── loop.ts            # Main agent loop (Factor 8)
│   └── errors.ts          # Error handling (Factor 9)
├── triggers/
│   ├── slack.ts           # Slack trigger (Factor 11)
│   ├── api.ts             # API trigger
│   └── cron.ts            # Cron trigger
├── human/
│   ├── contact.ts         # Human contact (Factor 7)
│   └── approval.ts        # Approval workflows
└── index.ts               # Agent entry point (Factor 12)
```

---

## ✅ Agent Validation Checklist

Use `/agent-validate` to check against all 12 factors:

- [ ] **Factor 1**: Tools defined as structured outputs
- [ ] **Factor 2**: Prompts are first-class code (no black box)
- [ ] **Factor 3**: Context window is engineered and optimized
- [ ] **Factor 4**: All tools have JSON schemas
- [ ] **Factor 5**: State is unified in thread.events
- [ ] **Factor 6**: Pause/resume points defined
- [ ] **Factor 7**: Human contact tools defined
- [ ] **Factor 8**: Control flow is explicit and owned
- [ ] **Factor 9**: Error handling with retry limits
- [ ] **Factor 10**: Agent is focused (≤10 tools, ≤10 steps)
- [ ] **Factor 11**: Triggers configured
- [ ] **Factor 12**: Agent is stateless reducer
- [ ] **Factor 13**: Predictable data is pre-fetched

---

## 🚀 Quick Start

```bash
# 1. Start agent creation workflow
/agent-intent

# 2. Create agent PRP (covers all 12 factors)
/agent-prp-create

# 3. Execute implementation
/agent-prp-execute

# 4. Validate against 12 factors
/agent-validate
```

