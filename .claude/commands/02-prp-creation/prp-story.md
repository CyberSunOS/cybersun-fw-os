---
description: Convert a user story into an executable PRP through deep codebase analysis (2-8 hours of work)
---

# PRP Story

## Story: $ARGUMENTS

## Mission

Transform a user story into a **tactical, executable implementation PRP** through systematic codebase analysis and task decomposition. Best for user-facing features and medium-sized stories that can be completed in **2-8 hours**.

**When to use**: User-facing features, user stories, medium-sized features.
**When NOT to use**: Small tasks (use `/prp-task`); large features (use `/create-prp`).

We do not write any code in this step. The goal is a context-engineered implementation plan that an execution agent can complete in one pass. Gather context about the story *before* analyzing the codebase, then dig deep to identify patterns and integration points.

> Subagents only receive what you give them — the user cannot interact with them. Pass all relevant context in each subagent prompt and TODO. Create detailed todos and spawn parallel subagents where appropriate.

---

## Pre-Flight: SeedFW Setup

1. **Tech Stack Awareness** — Read `TECH_STACK.md`. Confirm with the user: "Is this tech stack correct for this feature?" (Confirm / Modify / Add). Document changes.
2. **Documentation Fetching** — Prefer Context7 (`resolve-library-id` then `get-library-docs`); fall back to official docs. Show sources and get approval.
3. **Architecture** — Follow Vertical Slice Architecture (`docs/VERTICAL_SLICE_ARCHITECTURE.md`): all code for the story lives in one feature directory.
4. **Quality** — Follow `docs/GOLDEN_RULES.md`: 500 lines max per file, never edit `package.json` manually, TypeScript strict mode with no `any`.

---

## Analysis Process

### Phase 1: Story Decomposition

Define the user story and determine:

```
As a [type of user]
I want to [action/goal]
So that [benefit/value]
```

- **Story Type**: Feature / Bug / Enhancement / Refactor
- **Complexity**: Low / Medium / High
- **Affected Systems**: components/services needing changes
- **Acceptance Criteria**: clear, checkable definition of done

Understand the story deeply before proceeding.

### Phase 2: Codebase Intelligence Gathering

1. **Project Structure** — Detect language(s)/frameworks; map directory structure and conventions; identify service/component boundaries and config/env setup.
2. **Pattern Recognition** — Find similar implementations; extract conventions from `CLAUDE.md`/`AGENTS.md`/`.cursorrules`; identify UI/UX patterns and anti-patterns to avoid.
3. **Dependency Analysis** — Catalog relevant external libraries (`package.json`, `pyproject.toml`, `go.mod`); review `PRPs/ai_docs/` for additional context; check auth/authorization needs.
4. **Testing Patterns** — Identify test framework, setup, and similar test examples; suggest test cases and scenarios.
5. **Integration Points** — Identify files to update, new files to create (and where), router/API registration patterns, and database/model patterns. Note mobile responsiveness and accessibility needs.

### Phase 3: Think Harder

Reflect deeply on everything learned during research before generating tasks.

### Phase 4: Task Generation

Read and follow `PRPs/templates/prp_story_task.md`. Break work into Backend, Frontend, Integration, and Testing tasks.

**Task Rules**:
1. Each task is atomic and independently testable.
2. Tasks are ordered by dependency.
3. Use information-dense action verbs: CREATE, UPDATE, ADD, REMOVE, REFACTOR, MIRROR.
4. Include specific implementation details from codebase analysis.
5. Every task has an executable validation command.

### Phase 5: Validation Design

For each task, design validation that runs immediately after completion, gives clear pass/fail feedback, and uses project-specific commands discovered during analysis.

---

## Output

Save as: `PRPs/[story-name]/story.md`

**Template:**

```markdown
# User Story: [story-name]

## User Story
As a [type of user]
I want to [action/goal]
So that [benefit/value]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Current State
[How it works now, if applicable]

## Proposed Solution
[How we'll implement this]

## Architecture
**Vertical Slice**: `features/[story-name]/`

## Implementation Plan

### Backend Tasks
- [ ] CREATE `features/[story-name]/api/[endpoint].ts` — [purpose]
- [ ] CREATE `features/[story-name]/services/[service].ts` — [purpose]

### Frontend Tasks
- [ ] CREATE `features/[story-name]/components/[Component].tsx` — [purpose]

### Integration Tasks
- [ ] [Connect frontend to backend]

### Testing Tasks
- [ ] Unit tests for services
- [ ] Component tests
- [ ] Integration tests
- [ ] Manual testing scenarios

## UI/UX Considerations
- Accessibility: [WCAG compliance notes]
- Mobile: [responsive design notes]
- Loading states / Error states: [how to handle]

## Dependencies
- External libraries / Internal dependencies: [list]

## Validation
\`\`\`bash
pnpm build
pnpm type-check
pnpm test
pnpm test:integration
\`\`\`

## Time Estimate
[2-8 hours]

## Next Steps
Execute: `/prp-story-execute [story-name]`
```

---

## Quality Criteria

### Task Clarity
- [ ] PRP is clear, concise, and follows KISS
- [ ] Each task has a clear action and target
- [ ] Implementation details reference specific patterns
- [ ] Validation commands are executable

### Context Completeness
- [ ] All necessary patterns identified
- [ ] External library usage documented
- [ ] Integration points mapped
- [ ] External context references populated

### Story Coverage
- [ ] All acceptance criteria addressed
- [ ] Edge cases considered
- [ ] Error handling included where needed
- [ ] User flow is testable (manual testing is critical)

## Success Metrics

- **Implementation Ready**: Another developer could execute these tasks without additional context.
- **Validation Complete**: Every task has at least one working validation command.
- **Pattern Consistent**: Tasks follow existing codebase conventions.

## Next Command

```
/prp-story-execute [story-name]
```

Or use the full workflow: `/create-plan` → `/execute-plan` → `/validate`.
