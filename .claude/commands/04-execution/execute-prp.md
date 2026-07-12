---
description: "Execute a PRP into working code until fully complete and all validation passes"
---

# Execute PRP

## PRP File: $ARGUMENTS

## Mission: One-Pass Implementation Success

PRPs enable working code on the first attempt through:

- **Context Completeness**: Everything needed, nothing guessed
- **Progressive Validation**: Layered gates catch errors early
- **Pattern Consistency**: Follow existing codebase approaches
- Read the PRP fully before starting

**Your Goal**: Transform the PRP into working code that passes all validation gates. Don't stop until the entire plan is fulfilled and all validation passes.

## Execution Process

1. **Load PRP**
   - Read the specified PRP file completely
   - Absorb all context, patterns, requirements and gather codebase intelligence
   - Use the provided documentation references and file patterns; consume the right documentation before the appropriate todo/task
   - Trust the PRP's strategic direction, but verify tactical details (imports, paths, names) — it's designed for one-pass success
   - If the PRP has errors in details, fix them and note in the report
   - Do additional codebase exploration and research as needed

2. **ULTRATHINK & Plan**
   - Ultrathink before you execute. Create a comprehensive implementation plan following the PRP's task order
   - Break down into clear todos using the TodoWrite tool
   - Use subagents for parallel work when beneficial. **Important**: always give subagents extremely clear tasks with referenced context, and make sure each subagent reads the PRP and understands its context
   - Follow the patterns referenced in the PRP
   - Use specific file paths, class names, and method signatures from PRP context
   - Never guess about imports, file names, or function names — always be based in reality and verify the codebase patterns yourself

3. **Execute Implementation**
   - Follow the PRP's STEP-BY-STEP TASKS sequentially, adding more detail as needed (especially when using subagents)
   - Use the patterns and examples referenced in the PRP
   - Create files in locations specified by the desired codebase tree
   - Apply naming conventions from the task specifications, `TECH_STACK.md`, and CLAUDE.md
   - Validate after each task using the task's validation command; if validation fails, fix and re-validate before proceeding

4. **Progressive Validation**

   Execute the level validation system from the PRP, following SeedFW's validation model:
   - **Level 0 — Build Test (MANDATORY)**: The build must pass before anything else
   - **Level 1 — Quality & Static Analysis**: Run syntax, type-check, lint, and style validation commands from the PRP
   - **Level 2 — Tests**: Execute unit and integration test validation from the PRP
   - **Level 3 — Functional**: Run functional/integration testing and any domain-specific validation from the PRP

   **Each level must pass before proceeding to the next.**

5. **Completion Verification**
   - Work through the COMPLETION CHECKLIST in the PRP
   - Verify all items in the PRP's ACCEPTANCE CRITERIA section are met
   - Confirm the pitfalls listed in the PRP's "Gotchas and Considerations" section were avoided
   - Re-read the PRP to ensure everything is implemented
   - Implementation is ready and working

**Failure Protocol**: When validation fails, use the patterns and gotchas from the PRP to fix issues, then re-run validation until passing.

### TypeScript projects

When the PRP targets TypeScript/React/Next.js, apply this additional guidance:

- Pay special attention to TypeScript interfaces, component patterns, and (where used) Next.js App Router structure
- Consider compilation dependencies in task order: types before components, components before pages
- Ensure proper typing throughout (interfaces, props, return types) — strict mode, no `any` (use `unknown` if truly unknown)
- Follow file-based routing patterns and maintain proper Server/Client component separation
- Level 1 validation: ESLint, `tsc`, Prettier. Level 3: dev server, API routes, production build, plus E2E/performance/accessibility where specified
- On failure, watch for TypeScript compilation errors and type mismatches, React hydration issues between server and client, App Router requirements, and component prop interface violations

## Completion

Once all validation passes, leave the PRP directory in place at `PRPs/[feature-name]/` — the documented next step, `/validate [feature-name]`, reads it from there. Archiving happens during `/validate`, which archives the change and moves the PRP to `PRPs/completed/[feature-name]/` as its final step.

## Report

After completion, produce a summary:

**Summary:**
- Feature: {name}
- Tasks completed: {count}
- Files created/modified: {list}

**Validation:**
```bash
✓ Level 0 Build: Passed
✓ Type checking: Passed
✓ Linting: Passed
✓ Tests: X/X passed
✓ Functional: Passed
```

**Adjustments** (if any):
- Note any PRP details that were incorrect and how you fixed them

**Files Changed:**
```bash
git diff --stat
```

---

## Quality Standards

- **Follow**: All rules in `docs/GOLDEN_RULES.md`
- **Build Test**: Must pass before any commit (Level 0)
- **Package Manager**: Use npm/pnpm/yarn commands only — never edit `package.json` manually
- **TypeScript**: Strict mode, no `any` types
- **Security**: No secrets in code, validate all input

## Architecture Guidelines

- **Follow**: Vertical Slice Architecture (see `docs/VERTICAL_SLICE_ARCHITECTURE.md`)
- **Organize**: By feature, not by layer
- **Example**: `features/user-auth/` contains all layers for that feature
- **File Size**: Maximum 500 lines per file; if exceeded, split into smaller modules with clear boundaries

## Implementation Pattern

- **Task-by-Task**: Execute one task at a time
- **Validate**: Test after each task
- **Commit**: Atomic commits (one logical change per commit)
