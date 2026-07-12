---
description: "Clarify AI agent requirements through guided questions mapped to the 12-factor agents methodology"
---

# Agent Intent Clarification (12-Factor)

**Purpose**: Clarify agent requirements using 12-factor methodology  
**Usage**: `/agent-intent`

---

## 🎯 Overview

This command guides you through defining an AI agent using the 12-factor agents methodology. Each question maps to one or more factors.

---

## 📋 Agent Intent Questions (Ask One at a Time)

### Phase 1: Core Identity (Factors 1, 10)

**Q1 - Purpose** (Factor 10: Small, Focused):
```
🤖 What is the ONE main task this agent should accomplish?

Be specific. Examples:
- "Process incoming support tickets and route them"
- "Deploy backend services to staging/production"
- "Generate weekly reports from sales data"

Your answer:
```

**Q2 - Scope** (Factor 10: Small, Focused):
```
How many steps should this agent typically take to complete its task?

Ideal: 3-10 steps
Warning: >10 steps = consider splitting into multiple agents

Estimate:
```

---

### Phase 2: Tools & Capabilities (Factors 1, 4)

**Q3 - Tools** (Factor 4: Tools Are Structured Outputs):
```
What external systems/APIs will this agent need to interact with?

Examples:
- Database (read/write)
- External APIs (Stripe, GitHub, Linear, etc.)
- File system
- Email/Slack/SMS
- Other internal services

List the tools needed:
```

**Q4 - Tool Categories** (Factor 8: Own Your Control Flow):
```
For each tool, is it:
- SYNC: Fast, return immediately (e.g., fetch data)
- ASYNC: Slow, needs to pause and wait (e.g., human approval)

Categorize your tools:
- Sync tools:
- Async tools:
```

---

### Phase 3: Human Interaction (Factor 7)

**Q5 - Human Contact Points** (Factor 7: Contact Humans with Tools):
```
When should this agent contact a human?

Common scenarios:
- [ ] Request clarification when instructions unclear
- [ ] Get approval before high-stakes actions
- [ ] Escalate after repeated errors
- [ ] Report completion/results
- [ ] Other: _______________

Select all that apply:
```

**Q6 - Approval Requirements** (Factor 7):
```
Which actions require human approval before execution?

Examples:
- Deploying to production
- Sending external emails
- Modifying customer data
- Financial transactions

List actions needing approval:
```

---

### Phase 4: Triggers & Entry Points (Factor 11)

**Q7 - Triggers** (Factor 11: Trigger From Anywhere):
```
How will this agent be triggered?

- [ ] User message (Slack, chat, email)
- [ ] API call
- [ ] Scheduled (cron)
- [ ] Event (webhook, system event)
- [ ] Another agent
- [ ] Other: _______________

Select all that apply:
```

**Q8 - Response Channels** (Factor 11):
```
Where should the agent send its responses/results?

- [ ] Same channel as trigger (Slack → Slack)
- [ ] Email
- [ ] API response
- [ ] Dashboard/UI
- [ ] Database record
- [ ] Other: _______________

Select all that apply:
```

---

### Phase 5: State & Persistence (Factors 5, 6)

**Q9 - Pause/Resume** (Factor 6: Launch/Pause/Resume):
```
Does this agent need to pause and resume later?

Reasons to pause:
- Waiting for human approval
- Waiting for external API callback
- Long-running background task
- Rate limiting

Does it need pause/resume? (yes/no):
If yes, what are the pause points?
```

**Q10 - State Persistence** (Factor 5: Unify Execution State):
```
What information needs to persist between sessions?

Examples:
- Conversation history
- Task progress
- User preferences
- External IDs (ticket IDs, order IDs)

List persistent state:
```

---

### Phase 6: Context & Data (Factors 3, 13)

**Q11 - Pre-fetch Data** (Factor 13: Pre-fetch Context):
```
What data will the agent ALWAYS need at the start?

Pre-fetch this to reduce round-trips:
- User profile/preferences
- Available options (tags, users, products)
- Current system status
- Recent history

List data to pre-fetch:
```

**Q12 - Context Limits** (Factor 3: Own Your Context Window):
```
What information should NEVER go into the context?

Security considerations:
- API keys / secrets
- Full database records
- PII that's not needed
- Large file contents

List excluded data:
```

---

### Phase 7: Error Handling (Factor 9)

**Q13 - Error Recovery** (Factor 9: Compact Errors):
```
How should the agent handle errors?

- Max retry attempts per tool: _____ (default: 3)
- After max retries: 
  - [ ] Escalate to human
  - [ ] Skip and continue
  - [ ] Abort task
  - [ ] Other: _____

Error handling strategy:
```

---

## ✅ Echo Check

After all questions, summarize:

```markdown
## Agent Summary

**Name**: [Agent Name]
**Purpose**: [One sentence]
**Scope**: [X steps typical]

### Tools
- Sync: [list]
- Async: [list]

### Human Contact
- Approval needed for: [list]
- Escalate when: [conditions]

### Triggers
- Entry: [list]
- Response: [list]

### State
- Pause points: [list]
- Persistent data: [list]

### Context
- Pre-fetch: [list]
- Exclude: [list]

### Errors
- Max retries: [X]
- After failure: [action]

---
Does this accurately describe your agent? (yes/edit/restart)
```

---

## 🔄 Next Steps

After confirmation:
1. Run `/agent-prp-create` to generate the full Agent PRP
2. Review and approve the PRP
3. Run `/agent-prp-execute` to implement
4. Run `/agent-validate` to check all 12 factors

