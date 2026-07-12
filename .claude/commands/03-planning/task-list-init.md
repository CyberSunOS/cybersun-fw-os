---
description: "Create a comprehensive, ordered task checklist in PRPs/checklist.md for a PRP"
---

# Task List Init

Create a comprehensive task list in `PRPs/checklist.md` for PRP: $ARGUMENTS

Ingest the information, then dig deep into the existing codebase and the PRP. When done:

ULTRATHINK about the PRP task and create the plan, adhering to project conventions (AGENTS.md / CLAUDE.md), then extract and refine detailed tasks following this principle:

### List of tasks to be completed to fulfill the PRP, in the order they should be completed, using information-dense keywords

- Information-dense keyword examples:
  ADD, CREATE, MODIFY, MIRROR, FIND, EXECUTE, KEEP, PRESERVE etc

Mark done tasks with: STATUS [DONE], if not done leave empty

```yaml
Task 1:
STATUS [ ]
MODIFY src/existing_module.py:
  - FIND pattern: "class OldImplementation"
  - INJECT after line containing "def __init__"
  - PRESERVE existing method signatures

STATUS [ ]
CREATE src/new_feature.py:
  - MIRROR pattern from: src/similar_feature.py
  - MODIFY class name and core logic
  - KEEP error handling pattern identical

...(...)

Task N:
...

```

Each task should have unit test coverage, make tests pass on each task

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

