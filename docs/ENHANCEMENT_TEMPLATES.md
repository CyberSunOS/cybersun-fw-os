# SeedFW Enhancement Templates

**Purpose**: Lightweight enhancement sections to add to commands

**Date**: 2025-10-29

---

## 📋 Template Overview

These templates provide lightweight references to SeedFW features without bloating commands with full content.

**Key Principle**: Commands reference documentation files; AI loads them during execution.

---

## 🎯 Template A: PRP Creation Commands

**Use for**: Commands in `02-prp-creation/`

**Add this section**:

```markdown
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
- **Follow**: Vertical Slice Architecture (see `VERTICAL_SLICE_ARCHITECTURE.md`)
- **Organize**: By feature, not by layer
- **Example**: `features/user-auth/` not `controllers/`, `services/`

### 4. Quality Standards
- **Follow**: All rules in `GOLDEN_RULES.md`
- **File Size**: 500 lines maximum per file
- **Package Manager**: Never edit package.json manually
- **TypeScript**: Strict mode, no `any` types

### 5. Spec Integration
- **Save to**: `spec/proposals/` for proposals
- **Two-Folder Model**: 
  - `spec/current/` = Current truth (what IS built)
  - `spec/proposals/` = Proposals (what SHOULD change)
```

---

## ⚙️ Template B: Execution Commands

**Use for**: Commands in `04-execution/`

**Add this section**:

```markdown
---

## 🌱 SeedFW Enhancements

### 1. Quality Standards
- **Follow**: All rules in `GOLDEN_RULES.md`
- **Build Test**: Must pass before any commit
- **Package Manager**: Use npm/pnpm/yarn commands only
- **TypeScript**: Strict mode, no `any` types
- **Security**: No secrets in code, validate all input

### 2. Architecture Guidelines
- **Follow**: Vertical Slice Architecture (see `VERTICAL_SLICE_ARCHITECTURE.md`)
- **Organize**: By feature, not by layer
- **Example**: `features/user-auth/` contains all layers for that feature

### 3. File Size Limits
- **Maximum**: 500 lines per file
- **If Exceeded**: Split into smaller modules with clear boundaries
- **Benefit**: Better AI comprehension and maintainability

### 4. Implementation Pattern
- **Task-by-Task**: Execute one task at a time
- **Validate**: Test after each task
- **Commit**: Atomic commits (one logical change per commit)
```

---

## ✅ Template C: Validation Commands

**Use for**: Commands in `05-validation/`

**Add this section**:

```markdown
---

## 🌱 SeedFW Enhancements

### 1. Quality Checklist
Review against `GOLDEN_RULES.md`:
- ✅ Build test passes
- ✅ Package manager used (no manual package.json edits)
- ✅ TypeScript strict mode (no `any` types)
- ✅ Atomic commits
- ✅ Security best practices (no secrets, input validation)

### 2. File Size Verification
- **Check**: All files under 500 lines
- **If Exceeded**: Recommend splitting into smaller modules
- **Report**: List any files exceeding limit

### 3. Architecture Verification
- **Check**: Follows Vertical Slice Architecture (see `VERTICAL_SLICE_ARCHITECTURE.md`)
- **Verify**: Code organized by feature, not by layer
- **Report**: Any violations of architecture principles

### 4. Documentation Verification
- **Check**: Code is self-documenting
- **Verify**: Complex logic has comments
- **Report**: Areas needing better documentation
```

---

## 🔀 Template D: Git Operations Commands

**Use for**: Commands in `06-git-operations/`

**Add this section**:

```markdown
---

## 🌱 SeedFW Enhancements

### 1. Pre-Commit Requirements
- **Build Test**: Must pass before commit (see `GOLDEN_RULES.md`)
- **Run**: Execute build command and verify success
- **Block**: Do not commit if build fails

### 2. Commit Guidelines
- **Atomic**: One logical change per commit
- **Message**: Clear, descriptive commit messages
- **Format**: Follow conventional commits if project uses them
- **Reference**: See `GOLDEN_RULES.md` for commit standards

### 3. Branch Naming
- **Convention**: Check project conventions in `project.md` if exists
- **Pattern**: `feature/`, `fix/`, `refactor/` prefixes
- **Descriptive**: Clear indication of what branch contains

### 4. PR Requirements
- **Description**: Clear description of changes
- **Tests**: All tests passing
- **Review**: Request appropriate reviewers
- **Link**: Link to related issues/tickets
```

---

## 🛠️ Template E: Context/Utility Commands

**Use for**: Commands in `00-context-loading/`, `01-intent-clarification/`, `07-utilities/`

**Add this section**:

```markdown
---

## 🌱 SeedFW Enhancements

### 1. Documentation Loading
- **Load**: Read relevant documentation files:
  - `TECH_STACK.md` - Canonical tech stack
  - `GOLDEN_RULES.md` - Development standards
  - `VERTICAL_SLICE_ARCHITECTURE.md` - Architecture guidelines
  - `project.md` - Project-specific conventions (if exists)

### 2. Context Awareness
- **Understand**: Project structure and conventions
- **Respect**: Existing patterns and standards
- **Follow**: All guidelines in loaded documentation
```

---

## 📊 Template Application Matrix

| Directory | Template | Enhancements |
|-----------|----------|--------------|
| 00-context-loading | E | Documentation loading |
| 01-intent-clarification | E | Documentation loading |
| 02-prp-creation | A | Full (Tech Stack, Docs, Architecture, Quality, Spec) |
| 03-planning | A | Full (same as PRP creation) |
| 04-execution | B | Quality, Architecture, File Size, Implementation |
| 05-validation | C | Quality Checklist, File Size, Architecture, Docs |
| 06-git-operations | D | Pre-Commit, Commit Guidelines, Branch, PR |
| 07-utilities | E | Documentation loading |

---

## 🎯 Implementation Strategy

### Step 1: Apply Templates
For each command, add the appropriate template section at the end of the file.

### Step 2: Customize if Needed
Some commands may need slight customization of the template.

### Step 3: Test
Test a few commands to ensure the enhancements work as expected.

### Step 4: Document
Update COMMAND_GUIDE.md to reference these enhancements.

---

## ✅ Benefits

1. **Maintainable**: Change TECH_STACK.md once, all commands reference it
2. **Lean**: Commands stay focused, no bloat
3. **Consistent**: All commands follow same enhancement pattern
4. **Flexible**: Easy to add new enhancements in the future
5. **Clear**: AI knows exactly what to load and when

---

## 📝 Notes

- Templates are **references**, not full content
- AI **loads** referenced files during execution
- Keep templates **lightweight** and **actionable**
- Update templates as framework evolves


