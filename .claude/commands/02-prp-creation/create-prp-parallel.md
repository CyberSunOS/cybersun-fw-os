---
description: Create a BASE PRP using parallel research agents, with an optional mode for generating multiple competing implementation strategies
---

# Create PRP with Parallel Research

## Feature: $ARGUMENTS

Generate a comprehensive PRP using parallel research agents for maximum context-gathering efficiency and depth. Multiple AI agents work simultaneously to research different aspects of the feature, ensuring rich context is passed to enable self-validation and one-pass implementation success.

This command supports **two modes**:

- **Mode A — Deep Research (default)**: 4 specialized agents research one feature in depth (codebase, external docs, testing, project docs), then synthesize into a single high-quality PRP.
- **Mode B — Multiple Strategies**: N agents each produce a complete PRP for the same feature from a different architectural angle (performance, security, maintainability, rapid, enterprise), enabling comparative selection.

Choose Mode B when the user explicitly wants competing approaches or passes a count of variations; otherwise default to Mode A.

---

## Pre-Flight: SeedFW Setup (both modes)

Before launching agents:

1. **Tech Stack Awareness** — Read `TECH_STACK.md` from the project root. Present the stack to the user and confirm: "Is this tech stack correct for this feature?" (Confirm / Modify / Add technology). Note any changes in the PRP.
2. **Documentation Fetching** — Prefer Context7 (`resolve-library-id` then `get-library-docs`) for always-current docs; fall back to official documentation. Show sources and get user approval.
3. **Architecture** — Follow Vertical Slice Architecture (`docs/VERTICAL_SLICE_ARCHITECTURE.md`): organize by feature (`features/user-auth/`) not by layer.
4. **Quality** — Follow `docs/GOLDEN_RULES.md`: 500 lines max per file, never edit `package.json` manually, TypeScript strict mode with no `any`.

---

## Mode A — Deep Research (default)

**IMPORTANT**: Launch the following 4 research agents simultaneously using multiple Agent tool calls in a single response. Do not wait for one to complete before starting the next.

### Agent 1: Codebase Pattern Analysis

```
Task: Codebase Context Research
Prompt: Analyze the codebase for patterns relevant to "$ARGUMENTS". Identify:
- Similar features/patterns already implemented
- Files containing relevant examples or patterns to reference
- Existing conventions, architectural patterns, and code styles to follow
- Test patterns and validation approaches used in similar features
- Integration points and dependencies to consider
- File structure and organization patterns to mirror (favor existing vertical slices)

Explore only — do not write code. Use Glob, Grep, and Read extensively. Return a comprehensive analysis of existing patterns with specific file paths and code examples to reference in the PRP.
```

### Agent 2: External Technical Research

```
Task: External Technical Research
Prompt: Research external technical resources for "$ARGUMENTS". Investigate:
- Library documentation and API references (include specific URLs)
- Implementation examples from GitHub, StackOverflow, and technical blogs
- Best practices and architectural patterns for similar features
- Common pitfalls, gotchas, and solutions
- Performance and security considerations

Research only — do not write code. Use web search extensively. Return comprehensive technical research with specific URLs, code examples, and implementation guidance.
```

### Agent 3: Testing & Validation Strategy

```
Task: Testing Strategy Research
Prompt: Research testing and validation approaches for "$ARGUMENTS". Analyze:
- Test patterns used in the current codebase
- Unit and integration testing strategies and frameworks
- Validation gates and quality checks
- Error handling and edge case patterns
- Performance testing considerations

Research only — no test implementation. Use codebase analysis and web search. Return a detailed testing strategy with specific patterns to follow and validation commands to include in the PRP.
```

### Agent 4: Documentation & Context Research

```
Task: Documentation Context Research
Prompt: Research documentation and context for "$ARGUMENTS". Gather:
- Relevant files under PRPs/ai_docs/
- Configuration examples and setup patterns
- Environment and dependency requirements
- Known issues and workarounds
- Related feature documentation and implementation notes

Research only. Use Read to examine the ai_docs directory. Return documentation context with specific file references and configuration examples to include in the PRP.
```

### Research Synthesis & PRP Generation

Once all agents complete, synthesize the findings and generate a single comprehensive PRP using `PRPs/templates/prp_base.md` as the foundation.

- **Codebase Patterns**: file paths and code examples (Agent 1)
- **Technical Documentation**: URLs and sections (Agent 2)
- **Testing Strategies**: validation approaches and patterns (Agent 3)
- **Project Documentation**: ai_docs and configuration (Agent 4)

Build the implementation blueprint from real discovered patterns: pseudocode informed by existing code, error handling from similar implementations, and tasks ordered by dependency.

#### Required PRP Sections

```yaml
## Goal
[Specific, measurable outcome based on research]

## Why
- Business value and user impact
- Integration with existing features (from codebase analysis)
- Problems this solves and for whom

## What
[User-visible behavior and technical requirements]

## All Needed Context
### Documentation & References
- url: [specific URLs from external research]
- file: [specific file paths from codebase analysis]
- docfile: [relevant PRPs/ai_docs/ files]

### Current Codebase Context
[Tree structure and relevant files]

### Implementation Patterns
[Specific patterns to follow]

### Known Gotchas
[Library quirks and caveats]

## Implementation Blueprint
### Data Models and Structure
[Type-safe models following existing patterns]

### Task List
[Ordered tasks based on dependency analysis]

### Pseudocode
[Implementation approach with critical details]

### Integration Points
[Database, config, routes based on existing patterns]

## Validation Loop
### Level 1: Syntax & Style
[Commands specific to this codebase]

### Level 2: Unit Tests
[Test patterns from codebase analysis]

### Level 3: Integration Tests
[End-to-end validation approach]

## Final Validation Checklist
[Comprehensive quality gates]
```

### Output (Mode A)

Save to `PRPs/[feature-name]/` following SeedFW numbered-stage conventions. For spec-tracked work, save proposals under `spec/proposals/` (current truth lives in `spec/current/`).

---

## Mode B — Multiple Implementation Strategies

Generate N parallel PRP variations for the same feature so the optimal approach can be selected through comparison.

### Execution Parameters

```
PRP_NAME: $ARGUMENTS[0]
IMPLEMENTATION_DETAILS: $ARGUMENTS[1]
NUMBER_OF_PARALLEL_PRPS: $ARGUMENTS[2]   # recommended 2-5
```

**CRITICAL**: Launch all N agents simultaneously in a single response. Agents operate independently (no inter-agent communication), all use `PRPs/templates/prp_base.md`, and each produces both a PRP and a results file.

### Agent Specialization Matrix

```yaml
Agent 1: Performance-Optimized   # scalability, caching, async, indexing, load testing
Agent 2: Security-First          # auth, validation, encryption, defense-in-depth, security scans
Agent 3: Maintainability-Focused # SOLID, modularity, type safety, comprehensive testing
Agent 4: Rapid-Development       # minimal complexity, reuse, framework leverage, fast feedback
Agent 5: Enterprise-Grade        # resilience, monitoring, observability, operational procedures
```

For each agent, instruct it to:

1. **Research** the codebase (Glob/Grep/Read), external sources (WebSearch), and `PRPs/ai_docs/` through the lens of its focus area.
2. **Create a complete PRP** using the base template, with the implementation blueprint and validation gates tailored to its strategy.
3. **Save outputs**: PRP as `PRPs/[feature-name]/${PRP_NAME}-{N}.md`; analysis as `PRPs/[feature-name]/RESULTS_${PRP_NAME}-{N}.md`.
4. **Do NOT** run servers, builds, or executables — research and PRP creation only.

Each results file should cover: approach summary, research findings (codebase/external/docs), implementation strategy and key differentiators, trade-offs (advantages/disadvantages/complexity), validation strategy, recommendations, and a comparative analysis (strengths vs. alternatives, ideal use cases).

### Comparative Analysis & Selection

After all agents complete, synthesize a comparison across: implementation complexity, performance characteristics, maintenance burden, and risk. Recommend an approach based on project requirements, team capabilities, timeline constraints, maintenance goals, and performance needs.

---

## Quality Assurance (both modes)

### Research Quality
- [ ] All research agents completed successfully
- [ ] Codebase patterns thoroughly analyzed
- [ ] External documentation properly referenced
- [ ] Testing strategies aligned with existing patterns
- [ ] Documentation context comprehensive

### PRP Quality
- [ ] All necessary context included from research
- [ ] Validation gates are executable and specific
- [ ] References existing patterns and conventions
- [ ] Clear implementation path with dependencies
- [ ] Error handling documented with examples
- [ ] Integration points clearly defined (Mode B: strategy clearly differentiated)

### Context Completeness
- [ ] Specific file paths and examples included
- [ ] URLs with relevant sections specified
- [ ] Library versions and dependencies noted
- [ ] Configuration examples provided
- [ ] Known issues and workarounds documented

## Success Metrics

Score the PRP(s) 1-10 on Context Richness, Implementation Clarity, Validation Completeness, and One-Pass Success Probability. Target 8+ across all metrics.

Remember: the goal is one-pass implementation success through comprehensive parallel research and context gathering.
