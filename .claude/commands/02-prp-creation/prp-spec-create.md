---
description: "Create a SPEC PRP defining a transformation from current state to desired state"
---

# Create SPEC PRP (Advanced)

Generate a comprehensive specification-driven PRP with clear transformation goals.

## Specification: $ARGUMENTS

## Analysis Process

1. **Current State Assessment**
   - Map existing implementation
   - Identify pain points
   - Document technical debt
   - Note integration points

2. **Desired State Research**
   - Best practices for target state
   - Implementation examples
   - Migration strategies
   - Risk assessment
   - Dependency mapping

3. **User Clarification**
   - Confirm transformation goals
   - Priority of objectives
   - Acceptable trade-offs

## PRP Generation

Using /PRPs/templates/prp_spec.md:

### State Documentation

```yaml
current_state:
  files: [list affected files]
  behavior: [how it works now]
  issues: [specific problems]

desired_state:
  files: [expected structure]
  behavior: [target functionality]
  benefits: [improvements gained]
```

### Hierarchical Objectives

1. **High-Level**: Overall transformation goal
2. **Mid-Level**: Major milestones
3. **Low-Level**: Specific tasks with validation

### Task Specification with information dense keywords

#### Information dense keywords:

- MIRROR: Mirror the state of existing code to be mirrored to another use case
- COPY: Copy the state of existing code to be copied to another use case
- ADD: Add new code to the codebase
- MODIFY: Modify existing code
- DELETE: Delete existing code
- RENAME: Rename existing code
- MOVE: Move existing code
- REPLACE: Replace existing code
- CREATE: Create new code

#### Example:

```yaml
task_name:
  action: MODIFY/CREATE
  file: path/to/file
  changes: |
    - Specific modifications
    - Implementation details
    - With clear markers
  validation:
    - command: "test command"
    - expect: "success criteria"
```

### Implementation Strategy

- Identify dependencies
- Order tasks by priority and implementation order and dependencies logic
- Include rollback plans
- Progressive enhancement

## User Interaction Points

1. **Objective Validation**
   - Review hierarchical breakdown
   - Confirm priorities
   - Identify missing pieces

2. **Risk Review**
   - Document identified risks
   - Find mitigations
   - Set go/no-go criteria

## Context Requirements

- Current implementation details
- Target architecture examples
- Migration best practices
- Testing strategies

## Output

Save as: `SPEC_PRP/PRPs/{spec-name}.md`

## Quality Checklist

- [ ] Current state fully documented
- [ ] Desired state clearly defined
- [ ] All objectives measurable
- [ ] Tasks ordered by dependency
- [ ] Each task has validation that AI can run
- [ ] Risks identified with mitigations
- [ ] Rollback strategy included
- [ ] Integration points noted

Remember: Focus on the transformation journey, not just the destination.

---

## 🌱 SeedFW Enhancements

### 1. Tech Stack Awareness
- **Load**: Read `TECH_STACK.md` from project root
- **Confirm**: Present stack to user and ask: "Is this tech stack correct for this feature?"
- **Options**: ✅ Confirm / 🔄 Modify / ➕ Add technology
- **Document**: Note any changes in PRP

### 2. Documentation Fetching
- **Context7 First** (Preferred - always up-to-date):
  - Use `resolve-library-id_Context_7` to get library ID
  - Use `get-library-docs_Context_7` to fetch docs
  - Focus on relevant topics for this feature
- **Fallback**: Official documentation if Context7 unavailable
- **Confirm**: Show sources found, get user approval

### 3. Architecture Guidelines
- **Follow**: Vertical Slice Architecture (see `docs/VERTICAL_SLICE_ARCHITECTURE.md`)
- **Organize**: By feature, not by layer
- **Example**: `features/user-auth/` not `controllers/`, `services/`

### 4. Quality Standards
- **Follow**: All rules in `docs/GOLDEN_RULES.md`
- **File Size**: 500 lines maximum per file
- **Package Manager**: Never edit package.json manually
- **TypeScript**: Strict mode, no `any` types

### 5. Spec Integration
- **Save to**: `spec/proposals/` for proposals
- **Two-Folder Model**: 
  - `spec/current/` = Current truth (what IS built)
  - `spec/proposals/` = Proposals (what SHOULD change)

