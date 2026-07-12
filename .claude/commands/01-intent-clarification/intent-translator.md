---
description: "Turn rough ideas into iron-clad work orders through systematic clarification"
---

# Intent Translator

## Mission

Turn your rough idea into an iron-clad work order, then deliver the work only after both of us agree it's right.

**This is Step 1 of the workflow** (Step 0 is context loading) - Always start here for any feature work.

---

## Protocol

### 0. SILENT SCAN

Privately list every fact or constraint you still need to understand:
- What is the core problem being solved?
- Who is the audience/user?
- What are the must-include facts?
- What are the success criteria?
- What is the expected length/format?
- What is the tech stack (if code)?
- What are the edge cases?
- What are the risk tolerances?

### 1. CLARIFY LOOP

Ask **one question at a time** until you estimate ≥ 95% confidence you can ship the correct result.

**Cover these areas:**
- **Purpose**: Why is this needed? What problem does it solve?
- **Audience**: Who will use this? What's their technical level?
- **Must-include facts**: What MUST be included?
- **Success criteria**: How will we know it's done correctly?
- **Length/format**: How long? What format? (code, doc, analysis, etc.)
- **Tech stack**: What technologies are involved? (if code) - See Tech Stack Confirmation below
- **Edge cases**: What unusual scenarios must be handled?
- **Risk tolerances**: What can go wrong? What's acceptable?

### Tech Stack Confirmation (for code projects)

If this is a code project, confirm the tech stack:

1. **Check for project stack**: Read `TECH_STACK.md`
   - If exists and complete → Use as baseline
   - If missing or incomplete → Follow TECH_STACK.md's own instructions to consult the tech-stack repository; if unavailable (offline), ask the user for their stack directly. Never proceed on an assumed stack.

2. **Analyze project type**:
   - AI agent project? → Highlight AI agent stack from TECH_STACK.md
   - RAG project? → Highlight RAG stack from TECH_STACK.md
   - Web app? → Highlight full stack development from TECH_STACK.md
   - API only? → Highlight backend stack from TECH_STACK.md

3. **Present to user**:

   **If TECH_STACK.md exists:**
   ```
   I see your project uses:
   - [List key technologies from TECH_STACK.md]

   Are these correct for this feature?
   ```

   **If TECH_STACK.md missing/incomplete:**
   ```
   Based on your [project type], I recommend:
   - [List relevant technologies from the tech-stack repository, or gathered from the user if offline]

   These are proven recommendations from the SeedFW preferred stack.
   Should we use these?
   ```

4. **Options**:
   - ✅ **Use recommended stack** - Proceed with stack from file
   - 🔄 **Modify specific technologies** - User specifies changes
   - 🆕 **Use completely different stack** - User specifies alternative stack
   - 💡 **Explain recommendations** - Show why these technologies are recommended
   - 📚 **Show alternatives** - Display alternatives from TECH_STACK.md

5. **If showing alternatives**:
   - Present alternatives from TECH_STACK.md
   - Explain "when to use" for each option
   - Show trade-offs (pros/cons)
   - Wait for user decision

6. **Document decision**:
   - Record final tech stack in intent clarification
   - If TECH_STACK.md was missing, offer to create it with confirmed choices

**Rules:**
- ✅ Ask ONE question at a time
- ✅ Wait for answer before next question
- ✅ Build on previous answers
- ❌ Don't ask multiple questions at once
- ❌ Don't make assumptions

### 2. ECHO CHECK

Reply with **one crisp sentence** stating:
- Deliverable
- #1 must-include fact
- Hardest constraint

**Example:**
> "I will create a user authentication feature with JWT tokens, ensuring password hashing meets OWASP standards, with the constraint that it must work with your existing PostgreSQL database."

**End with:**
- ✅ **YES** to lock and proceed
- ❌ **EDITS** if something is wrong
- 🔷 **BLUEPRINT** to see the plan first
- ⚠️ **RISK** to see failure scenarios first

### 3. BLUEPRINT (if asked)

Produce a short plan:
- Key steps
- Interface or outline
- Sample I/O or section headers
- File structure (if code)
- Dependencies (if code)

**Pause for:**
- ✅ **YES** to proceed
- ❌ **EDITS** to revise
- ⚠️ **RISK** to see failure scenarios

### 4. RISK (if asked)

List the top three failure scenarios:
- **Logic failures**: What could break?
- **Legal/compliance**: Any regulatory issues?
- **Security**: What are the vulnerabilities?
- **Performance**: What could be slow?

**Pause for:**
- ✅ **YES** to proceed
- ❌ **EDITS** to revise

### 5. FINALIZE INTENT DOCUMENT

Only after **YES–GO**, produce the deliverable of this command: the finalized intent document.

**NO code is written in this step.** Implementation happens later in the pipeline (`/execute-prp`).

- Compile all clarified answers into `PRPs/[feature-name]/0-intent.md` (see Output below)
- Self-review the document:
  - Success criteria are specific and testable
  - Constraints and risks are captured
  - Tech stack decision is recorded with rationale
  - Alignment with `docs/GOLDEN_RULES.md`
- Fix anything you find

**Then deliver the intent document and hand off to `/create-prp [feature-name]`.**

### 6. RESET

If user types **RESET**, forget everything and restart at Step 0.

---

## Rules to Follow

**Reference**: `/docs/GOLDEN_RULES.md`

### Key Rules for Intent Translator
1. ✅ **One question at a time** - Don't overwhelm the user
2. ✅ **Build on previous answers** - Show you're listening
3. ✅ **Clarify ambiguities** - Don't make assumptions
4. ✅ **Document assumptions** - If you must assume, state it clearly
5. ✅ **Wait for YES** - Don't proceed without explicit approval

---

## Output

After completing Intent Translator, create:

**File**: `PRPs/[feature-name]/0-intent.md`

**Contents:**
```markdown
# Intent Clarification: [Feature Name]

## Original Request
[User's original rough idea]

## Clarifying Questions & Answers
Q1: [Question]
A1: [Answer]

Q2: [Question]
A2: [Answer]

...

## Refined Understanding
[One crisp sentence from Echo Check]

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Constraints
- Constraint 1
- Constraint 2
- Constraint 3

## Tech Stack (if code project)
**Decision**: [Using canonical stack / Modified stack / Different stack]

**Stack**:
- Frontend: [Framework, styling, UI library]
- Backend: [Runtime, database, auth]
- Infrastructure: [Hosting, containerization]
- External APIs: [List of services]

**Rationale**: [Why this stack was chosen]

**Alternatives considered**: [If any]

## Risks Identified
1. [Risk 1]
2. [Risk 2]
3. [Risk 3]

## Next Steps
Proceed to: `/create-prp [feature-name]`
```

---

## Usage

```
User: I want to add user authentication

AI: [Runs Intent Translator protocol]
AI: What authentication method do you prefer? (OAuth, JWT, session-based, or other?)

User: JWT

AI: Should the JWT tokens be stored in localStorage, sessionStorage, or httpOnly cookies?

User: httpOnly cookies

AI: [Continues clarifying...]

AI: ✅ ECHO CHECK:
I will create a JWT-based authentication system using httpOnly cookies for token storage, 
with bcrypt password hashing, ensuring OWASP compliance, with the constraint that it must 
integrate with your existing PostgreSQL database.

✅ YES to lock / ❌ EDITS / 🔷 BLUEPRINT / ⚠ RISK… WAIT.

User: BLUEPRINT

AI: [Shows blueprint...]

User: YES

AI: [Creates PRPs/user-auth/0-intent.md]
AI: Intent clarification complete! Next: /create-prp user-auth
```

---

## Next Command

After Intent Translator completes:
```
/create-prp [feature-name]
```

---

**Ready—what do you need?**



---

## 🌱 SeedFW Enhancements

### 1. Documentation Loading
- **Load**: Read relevant documentation files:
  - `TECH_STACK.md` - Canonical tech stack
  - `docs/GOLDEN_RULES.md` - Development standards
  - `docs/VERTICAL_SLICE_ARCHITECTURE.md` - Architecture guidelines
  - `project.md` - Project-specific conventions (if exists)

### 2. Context Awareness
- **Understand**: Project structure and conventions
- **Respect**: Existing patterns and standards
- **Follow**: All guidelines in loaded documentation

