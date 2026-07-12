---
description: "List and review all staged and unstaged changes before commit"
---

# Review Staged & Unstaged Changes

List and review any files in the staging area — both staged and unstaged. Ensure you look at both new files and modified files.

Check the diff of each file to see what has changed:

```bash
git status
git diff            # unstaged changes
git diff --staged   # staged changes
```

Previous review report: $ARGUMENTS

(May or may not be provided — ignore the previous review if not specified.)

## Review Focus Areas

1. **Code Quality**
   - Proper types/type hints on all functions and classes
   - Data validation models for inputs (e.g. Pydantic v2, Zod)
   - No stray debug output (use logging, not `print()`/`console.log`)
   - Proper error handling
   - Consistent style/formatting conventions
   - Docstrings/JSDoc for public APIs

2. **Validation Patterns**
   - Idiomatic, current API usage for the validation library in use
   - Type-safe parsing and serialization

3. **Security**
   - Input validation on all endpoints
   - No injection vulnerabilities (parameterized queries / ORM)
   - Secrets and passwords handled correctly (hashed, no hardcoded secrets)

4. **Structure**
   - Unit tests co-located with the code they test
   - Each feature self-contained with its own models, service, and tools (Vertical Slice Architecture)
   - Shared components are only things used by multiple features
   - Integration tests at the root level (e.g. `tests/integration/`)

5. **Linting** — run the project's linters/type-checkers (e.g. `ruff check --fix` + `mypy`, or `eslint` + `tsc`)

6. **Testing**
   - New code has tests
   - Edge cases covered
   - External dependencies mocked

7. **Performance**
   - No N+1 queries
   - Efficient algorithms
   - Proper async usage

8. **Documentation**
   - Clear README with setup instructions
   - CLAUDE.md up to date with any new important utils/dependencies for future Claude Code instances

### TypeScript / Astro projects

When reviewing TypeScript/Astro changes, additionally check:

- **TypeScript quality**: strict mode, explicit types, no `any` (use `unknown` if truly unknown), `import type { }` for type-only imports, component props interfaces, Astro built-in types (`HTMLAttributes`, `ComponentProps`)
- **Astro patterns**: correct hydration directives (`client:load`, `client:visible`, `client:idle`), static-first with selective hydration, Astro for static content / framework components only for interactivity, server islands where appropriate
- **Performance & bundle**: no unnecessary client-side JS, no over-hydration of static content, image optimization via Astro's `Image` component
- **Content management**: content collections with Zod schemas, type-safe content queries
- **Package management**: pnpm (not npm/yarn), no unused dependencies, correct dev vs runtime split
- **Size limits**: components under 200 lines (500 hard limit), functions under 50 lines
- **Security/validation**: input validation with Zod, env vars typed via `astro:env`, CSP implemented, no hardcoded secrets in client-side code, API route validation with proper error handling
- **Build validation**: `astro check` passes with zero errors, `pnpm lint` zero warnings, Prettier applied, production build succeeds, no hydration mismatches

## Review Output

Create a concise review report:

```markdown
# Code Review #[number]

## Summary
[2-3 sentence overview]

## Issues Found

### 🔴 Critical (Must Fix)
- [Issue with file:line and suggested fix]

### 🟡 Important (Should Fix)
- [Issue with file:line and suggested fix]

### 🟢 Minor (Consider)
- [Improvement suggestions]

## Good Practices
- [What was done well]

## Test Coverage
Current: X% | Required: 80%
Missing tests: [list]
```

For TypeScript/Astro reviews, also add an **Astro-Specific Findings** section (hydration strategy, bundle-size impact, content collection usage, performance optimizations) and a **Build Validation** checklist (`astro check`, `pnpm lint`, `pnpm build`, `pnpm test` at 80%+ coverage).

Save the report to `PRPs/code_reviews/review[#].md` (check existing files first to pick the next number).

---

## SeedFW Quality Checklist

Review against `docs/GOLDEN_RULES.md`:
- ✅ Build test (Level 0) passes
- ✅ Package manager used (no manual `package.json` edits)
- ✅ TypeScript strict mode (no `any` types)
- ✅ Atomic commits
- ✅ Security best practices (no secrets, input validation)
- ✅ All files under 500 lines (report any that exceed the limit)
- ✅ Follows Vertical Slice Architecture — code organized by feature, not by layer
- ✅ Self-documenting code with comments for complex logic
