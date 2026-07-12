# SeedFW Complete Workflow Guide

**From idea to production - the complete flow**

---

## 🎯 Overview

SeedFW provides different workflows for different types of work:

1. **Large Features** (8+ hours) → Full workflow with Intent Translator
2. **Medium Features** (2-8 hours) → Story workflow
3. **Small Tasks** (30 min - 2 hours) → Task workflow
4. **Quick Fixes** (< 30 min) → Direct implementation

---

## 🚀 Workflow 1: Large Features (8+ hours)

**Use for**: New features, major changes, architectural work

### Step 0: Onboarding (First time only)

```bash
/onboarding
```

**AI will:**
- Analyze project structure
- Identify tech stack
- Document patterns and conventions
- Create onboarding document

**Output**: `PRPs/onboarding/[project]-onboarding.md`

---

### Step 1: Intent Clarification

```bash
/intent-translator
```

**AI will ask about:**
1. **Purpose** - Why is this needed?
2. **Audience** - Who will use this?
3. **Must-include facts** - What MUST be included?
4. **Success criteria** - How will we know it's done?
5. **Tech stack** - What technologies? (References TECH_STACK.md)
6. **Edge cases** - What unusual scenarios?
7. **Risks** - What could go wrong?

**Tech Stack Confirmation:**
- AI loads `/TECH_STACK.md` (if exists)
- Presents canonical stack
- Options:
  - ✅ Use canonical stack
  - 🔄 Modify stack
  - 🆕 Different stack
  - 💡 Suggest alternatives (AI researches and compares)
- User confirms final stack

**Documentation Fetching:**
- AI identifies required docs
- Fetches from Context7 MCP server (preferred)
- Falls back to official docs
- Confirms with user: "Is this the right documentation?"

**Output**: `PRPs/[feature-name]/0-intent.md`

**Time**: 10-30 minutes

---

### Step 2: Create Comprehensive PRP

```bash
/create-prp [feature-name]
```

**AI will:**
1. **Load intent** from Step 1
2. **Analyze codebase**:
   - Project structure
   - Patterns and conventions
   - Similar implementations
   - Testing patterns
   - Integration points
3. **Research externally**:
   - Fetch documentation (Context7 + official)
   - Best practices
   - Common gotchas
   - Security considerations
4. **Create comprehensive PRP**:
   - Feature description
   - Technical approach
   - Files to create/modify
   - Code examples
   - Validation commands
   - Gotchas to avoid

**Output**: `PRPs/[feature-name]/1-prp.md`

**Time**: 30-60 minutes

---

### Step 3: Create Implementation Plan

```bash
/create-plan [feature-name]
```

**AI will:**
1. **Load PRP** from Step 2
2. **Break into atomic tasks**
3. **Create spec change proposal**
4. **Create detailed task list**
5. **Create spec delta**

**Output**:
- `spec/proposals/[feature-name]/proposal.md`
- `spec/proposals/[feature-name]/tasks.md`
- `spec/proposals/[feature-name]/delta.md`

**Time**: 15-30 minutes

---

### Step 4: Execute Implementation

```bash
/execute-plan [feature-name]
```

**AI will:**
1. **Load all context** (intent, PRP, plan)
2. **Execute tasks one by one**:
   - Implement task
   - Self-validate
   - Mark complete
   - Move to next
3. **Follow GOLDEN_RULES.md**:
   - Vertical Slice Architecture
   - Files under 500 lines
   - Use package managers
   - TypeScript strict mode
   - Proper error handling
4. **Create tests**
5. **Run validation commands**

**Output**: Complete implementation in `features/[feature-name]/`

**Time**: Varies (4-40+ hours depending on feature)

---

### Step 5: Validate

```bash
/validate [feature-name]
```

**AI will run 4-gate validation (Levels 0-3):**

**Level 0: Build Test (MANDATORY)**
```bash
npm run build
```
Must pass before proceeding.

**Level 1: Code Quality**
- Type check
- Lint
- File size check (< 500 lines)
- TypeScript quality
- Code organization
- Error handling
- Security checks
- Documentation

**Level 2: Tests**
```bash
npm test
npm test features/[feature-name]
```
All tests must pass.

**Level 3: Manual Testing**
- Feature works as specified
- All success criteria met
- No regressions
- Performance acceptable
- User experience good

**Output**:
- `spec/proposals/[feature-name]/validation-report.md`
- Archive in `spec/archive/[date]-[feature-name]/`
- Updated specs in `spec/current/`

**Time**: 30-60 minutes

---

## 📖 Workflow 2: Medium Features (2-8 hours)

**Use for**: User stories, medium-sized features

### Quick Flow

```bash
# 1. Create story PRP
/prp-story [story-name]

# 2. Execute (can use full workflow or direct)
/execute-plan [story-name]

# 3. Validate
/validate [story-name]
```

**Difference from large features:**
- Lighter planning (no intent translator)
- Focused on user story format
- Faster turnaround

---

## ⚡ Workflow 3: Small Tasks (30 min - 2 hours)

**Use for**: Bug fixes, small improvements, quick refactors

### Quick Flow

```bash
# 1. Create task PRP
/prp-task [task-name]

# 2. Execute directly
/execute-plan [task-name]

# 3. Quick validation
npm run build && npm test
```

**Difference from features:**
- Minimal planning
- No intent clarification
- Quick execution
- Lighter validation

---

## 🔧 Utility Workflows

### Prime Context (Start of session)

```bash
/prime-context
```

**Loads:**
- Project overview
- Tech stack
- Recent work
- Active work

**Use**: Start of every work session

---

### Code Review

```bash
# Review specific files
/code-review features/user-auth/

# Review staged changes
/code-review --staged

# Review entire project
/code-review .
```

**Checks:**
- Code quality
- Architecture
- Security
- Performance
- Testing
- Documentation

**Use**: Before PR, periodic quality checks

---

### Debug / Root Cause Analysis

```bash
/debug-rca [issue-name]
```

**Process:**
1. Define problem
2. Gather evidence
3. Generate hypotheses
4. Investigate
5. Identify root cause
6. Design solution

**Use**: Bug investigation, production issues

---

## 📊 Decision Tree: Which Workflow?

```
Start
  │
  ├─ First time on project?
  │   └─ YES → /onboarding
  │
  ├─ Start of session?
  │   └─ YES → /prime-context
  │
  ├─ How big is the work?
  │   │
  │   ├─ Large feature (8+ hours)
  │   │   └─ /intent-translator → /create-prp → /create-plan → /execute-plan → /validate
  │   │
  │   ├─ Medium feature (2-8 hours)
  │   │   └─ /prp-story → /execute-plan → /validate
  │   │
  │   ├─ Small task (30 min - 2 hours)
  │   │   └─ /prp-task → /execute-plan → build & test
  │   │
  │   └─ Quick fix (< 30 min)
  │       └─ Direct implementation → build & test
  │
  ├─ Need to review code?
  │   └─ /code-review [target]
  │
  ├─ Need to debug?
  │   └─ /debug-rca [issue]
  │
  └─ Need to refactor?
      └─ /prp-task refactor-[component]
```

---

## 🎓 Best Practices

### 1. Always Start with Context

```bash
# First time
/onboarding

# Every session
/prime-context
```

### 2. Use the Right Workflow

- **Don't over-engineer** - Small tasks don't need full workflow
- **Don't under-plan** - Large features need proper planning

### 3. Follow the Rules

- **Reference**: `/docs/GOLDEN_RULES.md`
- **Architecture**: `/docs/VERTICAL_SLICE_ARCHITECTURE.md`
- **Decisions**: `/docs/DECISION_FLOW.md`

### 4. Validate Everything

- **Build test is MANDATORY** - Always run before push
- **4-gate validation (Levels 0-3)** - For features
- **Quick validation** - For tasks

### 5. Document as You Go

- **Intent clarifications** - Capture requirements
- **PRPs** - Comprehensive plans
- **RCAs** - Debug findings
- **Onboarding** - Project knowledge

---

## 📝 Example: Complete Feature Flow

```bash
# Day 1: Planning
/intent-translator
# AI asks questions, confirms tech stack, fetches docs
# User answers, confirms decisions
# Output: PRPs/user-auth/0-intent.md

/create-prp user-auth
# AI analyzes codebase, researches, creates comprehensive PRP
# Output: PRPs/user-auth/1-prp.md

/create-plan user-auth
# AI breaks into tasks
# Output: spec/proposals/user-auth/*.md

# Day 2-3: Implementation
/execute-plan user-auth
# AI implements task by task
# Output: features/user-auth/* (all code)

# Day 3: Validation
/validate user-auth
# AI runs 4-gate validation (Levels 0-3)
# Output: validation report, archived change, updated specs

# Result: Production-ready feature! 🎉
```

---

## 🚀 Quick Reference

### Core Workflow Commands
- `/intent-translator` - Clarify requirements
- `/create-prp [feature]` - Create comprehensive PRP
- `/create-plan [feature]` - Create implementation plan
- `/execute-plan [feature]` - Execute implementation
- `/validate [feature]` - 4-gate validation (Levels 0-3)

### Quick Commands
- `/prp-task [task]` - Quick task (30 min - 2 hours)
- `/prp-story [story]` - User story (2-8 hours)

### Utilities
- `/onboarding` - Onboard to project
- `/prime-context` - Prime AI context
- `/code-review [target]` - Code review
- `/debug-rca [issue]` - Root cause analysis

---

**Ready to build production-ready software with AI!** 🚀


