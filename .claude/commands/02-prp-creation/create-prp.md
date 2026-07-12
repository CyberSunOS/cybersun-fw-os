---
description: "Create comprehensive Product Requirement Prompt with deep codebase analysis"
---

# Create PRP

## Feature: $ARGUMENTS

## Mission

Transform a feature request into a **comprehensive implementation PRP** through systematic codebase analysis, external research, and strategic planning.

**Core Principle**: We do NOT write code in this phase. Our goal is to create a battle-tested, context-rich implementation plan that enables one-pass implementation success.

**Key Philosophy**: Context is King. The PRP must contain ALL information needed for implementation - patterns, gotchas, documentation, validation commands - so the execution agent succeeds on the first attempt.

**Critical Understanding**: The executing AI agent only receives the PRP content you create, its training data, and access to codebase files (but needs guidance on which ones). Your research and context curation directly determines implementation success. Incomplete context = implementation failure.

---

## Prerequisites

**Before running this command:**
1. ✅ Complete `/intent-translator` first
2. ✅ Have `PRPs/[feature-name]/0-intent.md` created
3. ✅ User has approved the intent clarification

---

## Planning Process

> During research, create clear tasks and spawn as many agents and subagents as needed using the batch tools. The deeper the research here, the better the PRP. We optimize for chance of success, not speed.

### Phase 1: Feature Understanding

**Load Intent Clarification:**
- Read `PRPs/[feature-name]/0-intent.md`
- Extract refined understanding
- Review success criteria
- Note constraints and risks

**Deep Feature Analysis:**
- Extract the core problem being solved
- Identify user value and business impact
- Determine feature type: New Capability/Enhancement/Refactor/Bug Fix
- Assess complexity: Low/Medium/High
- Map affected systems and components

**Create User Story:**
```
As a <type of user>
I want to <action/goal>
So that <benefit/value>
```

### Phase 2: Codebase Intelligence Gathering

**1. Project Structure Analysis**
- Detect primary language(s), frameworks, and runtime versions
- Map directory structure and architectural patterns
- Identify service/component boundaries and integration points
- Locate configuration files (package.json, pyproject.toml, etc.)
- Find environment setup and build processes
- **Check for Vertical Slice Architecture** (see `/docs/VERTICAL_SLICE_ARCHITECTURE.md`)

**2. Pattern Recognition** (use specialized subagents when beneficial)
- Search for similar implementations in codebase
- Identify coding conventions:
  - Naming patterns (PascalCase, camelCase, snake_case)
  - File organization and module structure
  - Error handling approaches
  - Logging patterns and standards
- Extract common patterns for the feature's domain
- Document anti-patterns to avoid
- Check CLAUDE.md for project-specific rules and conventions
- **Follow GOLDEN_RULES.md** (see `/docs/GOLDEN_RULES.md`)

**3. Dependency Analysis**
- Catalog external libraries relevant to feature
- Understand how libraries are integrated (check imports, configs)
- Find relevant documentation in `PRPs/ai_docs/` if available
- Note library versions and compatibility requirements
- **Use package managers** (never manually edit package.json)

**4. Testing Patterns**
- Identify test framework and structure (pytest, jest, vitest, etc.)
- Find similar test examples for reference
- Understand test organization (unit vs integration)
- Note coverage requirements and testing standards

**5. Integration Points**
- Identify existing files that need updates
- Determine new files that need creation and their locations
- Map router/API registration patterns
- Understand database/model patterns if applicable
- Identify authentication/authorization patterns if relevant
- **Plan for Vertical Slice** (all feature code in one directory)

**Clarify Ambiguities:**
- If requirements are unclear, ask the user to clarify before continuing
- Get specific implementation preferences (libraries, approaches, patterns)
- Resolve architectural decisions before proceeding

### Phase 3: Tech Stack Validation

**Load Tech Stack:**
1. **Check project stack**: Read `TECH_STACK.md`
   - If exists → Use project-specific stack
   - If missing/incomplete → Follow TECH_STACK.md's own instructions to consult the tech-stack repository; if unavailable (offline), ask the user for their stack directly. Never proceed on an assumed stack.

2. **Validate for feature**:
   - Present stack to user: "Your project uses [stack]. Is this correct for this specific feature?"
   - If building RAG feature → Suggest RAG tools from TECH_STACK.md if not in stack
   - If adding auth → Suggest auth tools from TECH_STACK.md if not in stack
   - If adding payments → Suggest payment tools from TECH_STACK.md if not in stack
   - If adding observability → Suggest monitoring tools from TECH_STACK.md if not in stack

3. **Context-aware suggestions**:
   - Match feature requirements to relevant categories in TECH_STACK.md
   - Present alternatives if current stack doesn't fit feature needs
   - Explain trade-offs and "when to use" guidance

4. **Confirm with user**:
   - ✅ Use current stack
   - 🔄 Add/modify technologies for this feature
   - 💡 Show alternatives from TECH_STACK.md

5. **Document decision**: Record confirmed tech stack in PRP

### Phase 4: External Research & Documentation

**Documentation Gathering Strategy** (use specialized subagents when beneficial):

1. **Identify Required Documentation**
   - List all libraries/frameworks from tech stack
   - Identify specific features needed from each
   - Note version numbers

2. **Fetch Documentation** (use both sources)

   **Option A: Context7 MCP Server** (Preferred for supported libraries, if the Context7 MCP server is available in this session — otherwise go straight to Option B)
   ```
   Use Context7 to fetch up-to-date documentation:
   - Resolve library ID: resolve-library-id_Context_7
   - Fetch docs: get-library-docs_Context_7
   - Focus on specific topics needed
   ```

   **Option B: Official Documentation** (for libraries not in Context7, or when Context7 is unavailable)
   - Research latest library versions and best practices
   - Find official documentation with specific section anchors
   - Locate implementation examples and tutorials
   - Identify common gotchas and known issues
   - Check for breaking changes and migration guides
   - For critical pieces of documentation, add a `.md` file to `PRPs/ai_docs/` and reference it in the PRP with clear reasoning and instructions

3. **Confirm Documentation with User**
   - Present fetched documentation sources
   - Ask: "I've gathered documentation from [sources]. Is this the right documentation for your needs?"
   - Wait for confirmation before proceeding

4. **Technology Trends Research**
   - Research current best practices for the technology stack
   - Find relevant blog posts, guides, or case studies (GitHub/StackOverflow/blogs)
   - Identify performance optimization patterns
   - Document security considerations

**Compile Research References:**
```markdown
## Relevant Documentation

### From Context7
- [Library Name] (v[version])
  - Topic: [Specific feature]
  - Why: Needed for X functionality

### From Official Sources
- [Library Official Docs](https://example.com/docs#section)
  - Specific feature implementation guide
  - Why: Needed for X functionality
- [Framework Guide](https://example.com/guide#integration)
  - Integration patterns section
  - Why: Shows how to connect components

### Additional Resources
- [Blog post / Tutorial]
  - Why: Shows real-world implementation
```

### Phase 5: Deep Strategic Thinking

**ULTRATHINK — think harder about:**
- How does this feature fit into the existing architecture?
- What are the critical dependencies and order of operations?
- What could go wrong? (Edge cases, race conditions, errors)
- How will this be tested comprehensively?
- What performance implications exist?
- Are there security considerations?
- How maintainable is this approach?
- **Does it follow Vertical Slice Architecture?**
- **Are files under 500 lines?**

**Design Decisions:**
- Choose between alternative approaches with clear rationale
- Design for extensibility and future modifications
- Plan for backward compatibility if needed
- Consider scalability implications

Apply the **"No Prior Knowledge" test** before writing: _"If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_

---

## PRP Output Structure

Create: `PRPs/[feature-name]/1-prp.md`

**Template:**
```markdown
# Feature: [feature-name]

## Feature Description
[Detailed description of the feature, its purpose, and value to users]

## User Story
As a [type of user]
I want to [action/goal]
So that [benefit/value]

## Problem Statement
[Clearly define the specific problem or opportunity this feature addresses]

## Solution Statement
[Describe the proposed solution approach and how it solves the problem]

## Feature Metadata
**Feature Type**: [New Capability/Enhancement/Refactor/Bug Fix]
**Estimated Complexity**: [Low/Medium/High]
**Primary Systems Affected**: [List of main components/services]
**Dependencies**: [External libraries or services required]

## Architecture
**Vertical Slice**: `features/[feature-name]/`
- api/ - API endpoints
- components/ - UI components
- services/ - Business logic
- models/ - Data models
- tests/ - Tests

Adapt the slice layout and gate commands to the confirmed stack — a CLI or Python project won't have `components/`; keep the vertical-slice principle, not these exact folders or commands.

## Technical Approach
[Detailed technical approach, including:]
- Technology stack (confirmed in Phase 3)
- Key libraries and versions
- Integration points
- Data flow
- Error handling strategy

---

## CONTEXT REFERENCES

### Relevant Codebase Files
[List files with line numbers and relevance]
- `path/to/file.ts` (lines 15-45) - Why: Contains pattern for X that we'll mirror
- `path/to/model.ts` (lines 100-120) - Why: Data model structure to follow
- `path/to/test.ts` - Why: Test pattern example

### New Files to Create
- `features/[feature-name]/api/[endpoint].ts` - [Purpose]
- `features/[feature-name]/services/[service].ts` - [Purpose]
- `features/[feature-name]/components/[Component].tsx` - [Purpose]
- `features/[feature-name]/models/[model].ts` - [Purpose]
- `features/[feature-name]/tests/[test].test.ts` - [Purpose]

### Files to Modify
- `[existing-file].ts` - [What to change and why]

### Dependencies to Add
\```bash
pnpm install [package]@[version]
\```

### Relevant Documentation
- [Documentation Link](https://example.com/doc#section)
  - Specific section: [topic]
  - Why: [reason it is needed]

### Patterns to Follow
[Specific patterns extracted from codebase - include actual code examples from the project]
- **Naming Conventions:** [example]
- **Error Handling:** [example]
- **Logging Pattern:** [example]

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

Use information-dense keywords for clarity:
- **CREATE**: New files or components
- **UPDATE**: Modify existing files
- **ADD**: Insert new functionality into existing code
- **REMOVE**: Delete deprecated code
- **REFACTOR**: Restructure without changing behavior
- **MIRROR**: Copy pattern from elsewhere in codebase

### {ACTION} {target_file}
- **IMPLEMENT**: {Specific implementation detail}
- **PATTERN**: {Reference to existing pattern - file:line}
- **IMPORTS**: {Required imports and dependencies}
- **GOTCHA**: {Known issues or constraints to avoid}
- **VALIDATE**: `{executable validation command}`

[Continue with all tasks in dependency order...]

---

## VALIDATION COMMANDS

Execute every command to ensure zero regressions and 100% feature correctness.

Run the project's own gates as defined by its stack (package.json scripts / Makefile / the PRP's validation commands). For TS/web projects these are typically `pnpm build`, `pnpm type-check`, `pnpm lint`. If a gate doesn't exist for the confirmed stack, substitute the closest equivalent (e.g. `node --check`, `ruff`, `go vet`) and record the substitution. Level 0 (build) may never be skipped — only adapted.

### Level 0: Build Test (MANDATORY)
\```bash
pnpm build
\```

### Level 1: Code Quality & Static Analysis
\```bash
pnpm lint
pnpm type-check
\```

### Level 2: Tests (Unit + Integration)
\```bash
pnpm test features/[feature-name]
pnpm test:integration
\```

### Level 3: Functional/Manual Validation
[Feature-specific manual testing steps - API calls, UI testing, etc.]

Additional validation (optional): any stack-specific extras (MCP server checks, CLI smoke tests, etc.) belong here, not as extra numbered levels.

---

## ACCEPTANCE CRITERIA
- [ ] Feature implements all specified functionality
- [ ] All validation commands pass with zero errors
- [ ] Unit test coverage meets requirements (80%+)
- [ ] Integration tests verify end-to-end workflows
- [ ] Code follows project conventions and patterns
- [ ] No regressions in existing functionality
- [ ] Documentation updated (if applicable)
- [ ] Performance meets requirements (if applicable)
- [ ] Security considerations addressed (if applicable)

## COMPLETION CHECKLIST
- [ ] All files created in `features/[feature-name]/`
- [ ] All files under 500 lines
- [ ] All tasks completed in order; each task validation passed immediately
- [ ] Build passes with no errors
- [ ] Full test suite passes (unit + integration)
- [ ] No linting or type checking errors
- [ ] Manual testing confirms feature works as specified in intent
- [ ] Acceptance criteria all met
- [ ] Code reviewed for quality and maintainability

## Gotchas and Considerations
- [Known issue 1 and how to avoid it]
- [Performance consideration]
- [Security consideration]

## Notes
[Additional context, design decisions, trade-offs]

## Next Steps
Proceed to: `/create-plan [feature-name]`
```

---

## TypeScript Projects

When the target is a TypeScript/JavaScript/React codebase, sharpen the PRP with these specifics (use `PRPs/templates/prp_base_typescript.md` if `PRPs/templates/` exists in the project):

- **Conventions**: Note existing TypeScript/React patterns — interface definitions, component prop types, hook patterns, and API route patterns. Use exact naming conventions (PascalCase components, camelCase props).
- **Component model**: For React/Next.js, specify Server vs Client component usage and follow App Router / Server Component patterns.
- **Type safety**: Specify interface/type definitions comprehensively; strict mode, no `any` types.
- **Order tasks**: types → components → pages → tests.
- **Validation gates** (must be executable by the AI agent):
  ```bash
  pnpm type-check   # or: tsc --noEmit
  pnpm lint         # eslint with TypeScript rules
  pnpm test             # Jest / Vitest / React Testing Library
  pnpm build
  pnpm test:integration   # if applicable
  ```
- **Gotchas to research**: TypeScript compilation issues, React hydration, Next.js-specific quirks, library version compatibility.

---

## Quality Criteria

### Context Completeness
- [ ] Passes "No Prior Knowledge" test
- [ ] All necessary patterns identified and documented
- [ ] External library usage documented with links (section anchors, not just domains)
- [ ] Integration points clearly mapped
- [ ] Gotchas and anti-patterns captured
- [ ] Every task has an executable validation command

### Implementation Ready
- [ ] Another developer could execute without additional context
- [ ] Tasks ordered by dependency (can execute top-to-bottom)
- [ ] Each task is atomic and independently testable
- [ ] Pattern references include specific file:line numbers

### Pattern Consistency
- [ ] Tasks follow existing codebase conventions
- [ ] New patterns justified with clear rationale
- [ ] No reinvention of existing patterns or utils
- [ ] Testing approach matches project standards

### Information Density
- [ ] No generic references (all specific and actionable)
- [ ] URLs include section anchors when applicable
- [ ] Task descriptions use codebase keywords
- [ ] Validation commands are non-interactive and executable

---

## Confidence Score & Report

After creating the PRP, provide:
- Summary of feature and approach
- Full path to created PRP file (`PRPs/[feature-name]/1-prp.md`)
- Complexity assessment
- Key implementation risks or considerations
- **Confidence Score**: #/10 that execution will succeed on first attempt (target: 8/10 minimum before approval)

---

## Rules to Follow

**Reference**: `/docs/GOLDEN_RULES.md`

1. ✅ **No code in this phase** - Planning only
2. ✅ **Context is king** - Include ALL needed information
3. ✅ **Follow Vertical Slice Architecture** - Feature-based organization (`features/user-auth/`, not `controllers/`, `services/`)
4. ✅ **Keep files under 500 lines** - Plan for splitting if needed
5. ✅ **Use package managers** - Never manually edit package files
6. ✅ **Include validation commands** - How to verify success
7. ✅ **Document gotchas** - Known issues and how to avoid them
8. ✅ **Reference existing patterns** - Maintain consistency
9. ✅ **Spec two-folder model** - `spec/current/` = current truth (what IS built); `spec/proposals/` = proposals (what SHOULD change)

---

## Usage

```
# After completing /intent-translator
/create-prp user-auth

AI: [Loads PRPs/user-auth/0-intent.md]
AI: [Analyzes codebase, validates tech stack, gathers docs]
AI: [Creates comprehensive PRP]
AI: Created: PRPs/user-auth/1-prp.md (Confidence: 9/10)
AI: Next: /create-plan user-auth
```

---

## Next Command

After PRP creation completes:
```
/create-plan [feature-name]
```
