---
description: "Comprehensive code review with actionable, prioritized feedback"
---

# Code Review

## Target: $ARGUMENTS

Optionally provide:
- `$1` — scope for review (files, directory, PR, or whole codebase)
- `$2` — link to the PRP file if a PRP was used for the implementation (skip if empty)

## Mission

Perform a comprehensive code review focusing on quality, maintainability, security, performance, and best practices.

**When to use**: Before PR, after implementation, or periodic code-quality checks.

---

## Review Process

**Understand the changes first:**
- Reviewing staged changes: `git diff --staged`
- Reviewing specific files: Read the specified files
- Reviewing a PR: `gh pr view --json files,additions,deletions`
- Reviewing a local working tree: `git diff`
- Reviewing a branch: `git diff main...HEAD` (or `git diff origin/main...HEAD` if a remote exists)
- Reviewing the entire codebase: review the source tree directly (read the files; no diff)

If a PRP was referenced, read it first so the review can verify the implementation against its requirements.

## Review Focus Areas

### Level 1: Code Quality
- Clear, descriptive, consistently-named identifiers (no unclear abbreviations)
- Single Responsibility Principle and DRY; proper separation of concerns
- Clear logic flow, consistent formatting, appropriate (non-obvious) comments
- Proper error handling and meaningful error messages
- No stray debug output (use logging, not `print()`/`console.log`)

### Level 2: Architecture & Design
- **Vertical Slice Architecture** (see `docs/VERTICAL_SLICE_ARCHITECTURE.md`): all feature code in one directory, no cross-feature dependencies, proper use of `shared/`/`core/`
- File size: files under 500 lines; flag large files that should be split
- Each feature self-contained with its own models, service, and tools; shared components only when used by multiple features
- Minimal dependencies, no circular dependencies
- Consistent with codebase patterns; appropriate design patterns; no anti-patterns

### Level 3: Security
- Input validation on all endpoints / user input; proper sanitization
- Authentication and authorization checks present (role-based access where needed)
- No hardcoded secrets — environment variables used
- SQL injection prevention: parameterized queries / ORM, no string concatenation
- XSS prevention: proper output encoding, Content Security Policy, no unsafe HTML rendering

### Level 4: Performance
- Efficient algorithms and data structures; no N+1 queries or unnecessary loops
- Appropriate caching with a sensible invalidation strategy
- Proper async usage; database indexes and efficient queries

### Level 5: Testing
- New code has tests; unit tests for logic, integration tests for flows
- Edge cases and error cases covered; external dependencies mocked
- Clear test names, proper assertions, no flaky tests

### Level 6: Documentation
- Complex logic explained; JSDoc/TSDoc (or google-style docstrings) for public APIs; no obvious or outdated comments
- README updated for new features and setup
- CLAUDE.md updated with any new important utils/dependencies for future Claude Code instances

### Framework-specific checks (when applicable)

Apply additional checks that match the project's framework/stack. The global rules above (e.g. the 500-line file limit) remain authoritative.

**Example — Astro projects:**

- **TypeScript quality**: strict mode compliance, explicit typing, no `any` (use `unknown` if truly unknown), `import type { }` for type-only imports, component props interfaces, Astro built-in types (`HTMLAttributes`, `ComponentProps`)
- **Astro patterns**: correct hydration directives (`client:load`, `client:visible`, `client:idle`), static-first with selective hydration, Astro components for static content and framework components only for interactivity, server islands where appropriate
- **Performance/bundle**: no unnecessary client-side JS, no over-hydration of static content, image optimization via Astro's `Image` component
- **Content management**: content collections configured with Zod schemas, type-safe content queries
- **Package management**: pnpm (not npm/yarn), no unused dependencies, correct dev vs runtime split
- **Size limits**: functions under 50 lines; the Astro community recommends components under 200 lines, but the global 500-line file limit is the authoritative rule
- **Build validation**: `astro check` passes, `pnpm lint` zero warnings, Prettier applied, `pnpm build` succeeds, `pnpm test` at 80%+ coverage, no hydration mismatches

---

## Review Output

Create a concise review report:

```markdown
# Code Review: [Target] #[number]

## Summary
[2-3 sentence overall assessment]

## Issues Found

### 🔴 Critical (Must Fix)
1. [Issue]
   - Location: [file:line]
   - Problem: [description]
   - Fix: [how to fix]

### 🟡 Important (Should Fix)
1. [Issue]
   - Location: [file:line]
   - Problem: [description]
   - Suggestion: [how to improve]

### 🟢 Minor (Consider)
1. [Issue]
   - Location: [file:line]
   - Suggestion: [how to improve]

## Positive Highlights ✅
- [What was done well]

## Test Coverage
Current: X% | Required: 80%
Missing tests: [list]

## Metrics
- Files reviewed: [count]
- Critical / Important / Minor issues: [counts]

## Next Steps
- [ ] Fix critical issues
- [ ] Address important issues
- [ ] Consider minor improvements
- [ ] Re-review after fixes
```

Save the report to `PRPs/[feature-name]/code-review.md` when reviewing a specific feature. For general (non-feature) reviews, save to `PRPs/code_reviews/[date]-review.md` instead (create the directory if needed).

---

## Rules to Follow

**Reference**: `docs/GOLDEN_RULES.md`

Key review principles:
1. ✅ **Be constructive** — suggest improvements, don't just criticize
2. ✅ **Be specific** — point to exact `file:line` locations
3. ✅ **Prioritize** — critical vs important vs minor
4. ✅ **Explain why** — help the author understand the reasoning
5. ✅ **Highlight good** — acknowledge good practices

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

---

## Usage

```
# Review specific files
/code-review features/user-auth/

# Review staged changes
/code-review --staged

# Review entire project
/code-review .
```
