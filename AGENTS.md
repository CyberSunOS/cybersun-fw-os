# SeedFW Instructions for AI Assistants

**Purpose**: Always-loaded router for AI assistants using SeedFW. Keep this file lean; load detailed docs on demand (see "Load on Demand" below).

---

## What SeedFW Is

SeedFW is a unified AI-assisted development framework combining PRP (Product Requirement Prompts), spec-driven development, Vertical Slice Architecture, and the Intent Translator clarification protocol. It is a **reference methodology, not project code**: clone it to a separate reference folder, apply its patterns to the user's project, and never copy SeedFW files into (or merge them with) the user's repository. Project-specific files (`TECH_STACK.md`, `project.md`, PRPs, specs) are created inside the user's project following SeedFW patterns.

## Auto-Start Behavior

On a fresh project (right after `seedfw init`), do NOT wait for a command:

1. Greet the user and explain you'll run a short guided setup (5-10 min).
2. Silently load context: `docs/GOLDEN_RULES.md`, `docs/VERTICAL_SLICE_ARCHITECTURE.md`, and from the user's project `TECH_STACK.md` and `project.md` if they exist.
3. Start the Intent Translator workflow: ask what they want to build, who it's for, and the main goal — one question at a time.
4. If the answer describes an AI agent/bot/assistant/automation, branch to the Agent Creation path (`/agent-intent` → `/agent-prp-create` → `/agent-prp-execute` → `/agent-validate`, per `docs/12-FACTOR-AGENTS.md`).
5. Confirm the tech stack with the user (never assume; propose from `TECH_STACK.md` if the project has none), echo back your understanding, show a 3-5 step blueprint, and wait for approval before implementing.

Full script and examples: `docs/AUTO_START_WORKFLOW.md`.

## Core Workflow (5 Steps)

```
/intent-translator → /create-prp → /create-plan → /execute-plan → /validate
```

Quick paths (skip planning for small work):
- **Small task (30 min - 2 h)**: `/prp-task` → `/prp-task-execute` → `/validate`
- **User story (2-8 h)**: `/prp-story` → `/prp-story-execute` → `/validate`

Always match create/execute variants: `/create-prp`→`/execute-prp`, `/create-plan`→`/execute-plan`, `/prp-story`→`/prp-story-execute`, `/prp-task`→`/prp-task-execute`, `/prp-spec-create`→`/prp-spec-execute`.

## Command Index (37 commands, `.claude/commands/`)

### Step 0: Context Loading
| Command | Purpose |
|---|---|
| `/prime-context` | Prime AI context with project-specific information (quick, start of session) |
| `/onboarding` | Onboard to a new project and understand its structure (thorough) |

### Step 1: Intent Clarification
| Command | Purpose |
|---|---|
| `/intent-translator` | Turn rough ideas into iron-clad work orders through systematic clarification |

### Step 2: PRP Creation
| Command | Purpose |
|---|---|
| `/create-prp` | Comprehensive PRP with deep codebase analysis (large features, 8+ h) |
| `/prp-story` | Convert a user story into an executable PRP (2-8 h of work) |
| `/prp-task` | Lightweight, validated TASK PRP for small focused changes (30 min - 2 h) |
| `/create-prp-parallel` | BASE PRP via parallel research agents; optional competing strategies |
| `/create-planning` | Transform rough ideas into a PRD using parallel research agents |
| `/prp-spec-create` | SPEC PRP for specification-driven transformations (advanced) |
| `/api-contract-define` | Define API contract (endpoints, DTOs, errors) between backend and frontend |
| `/hackathon-prp-parallel` | Generate and execute a hackathon implementation with parallel agents |
| `/hackathon-research` | Multi-option research for hackathon approaches |
| `/prp-poc-create-parallel` | Create parallel React POC variants |

### Step 2a: Agent Creation (12-Factor)
| Command | Purpose |
|---|---|
| `/agent-intent` | Clarify agent requirements with 12-factor questions |
| `/agent-prp-create` | Create a comprehensive Agent PRP |
| `/agent-prp-execute` | Implement the agent from its PRP |
| `/agent-validate` | Validate the agent against all 12 factors |

### Step 3: Planning
| Command | Purpose |
|---|---|
| `/create-plan` | Detailed implementation plan with spec tasks |
| `/task-list-init` | Create an ordered task checklist in `PRPs/checklist.md` for a PRP |

### Step 4: Execution
| Command | Purpose |
|---|---|
| `/execute-plan` | Execute implementation plan task by task |
| `/execute-prp` | Execute a PRP until complete and all validation passes |
| `/prp-story-execute` | Execute a Story PRP with focused task implementation |
| `/prp-task-execute` | Execute a TASK PRP |
| `/prp-spec-execute` | Execute a SPEC PRP |
| `/prp-poc-execute-parallel` | Execute parallel React POCs |
| `/prp-analyze-run` | Analyze PRP results after execution to improve future PRPs |

### Step 5: Validation
| Command | Purpose |
|---|---|
| `/validate` | 4-gate validation (Levels 0-3) and archiving of completed feature (default) |
| `/code-review` | Comprehensive code review with actionable, prioritized feedback |
| `/review-staged` | Review all staged and unstaged changes before commit |
| `/user-story-rapid` | Rapid user-story analysis and implementation plan |

### Step 6: Git Operations
| Command | Purpose |
|---|---|
| `/commit` | Smart, atomic git commit following conventional commits |
| `/new-branch` | New branch from develop with a conventional name |
| `/create-pr` | Create a pull request |
| `/resolve-conflict` | Intelligently resolve merge conflicts |

### Step 7: Utilities (anytime)
| Command | Purpose |
|---|---|
| `/prp-core-run-all` | Run all core commands in sequence, feature request to PR |
| `/debug-rca` | Systematic root cause analysis and debugging |
| `/refactor` | Safe, incremental refactoring with vertical-slice checks |

## Golden Rules (Non-Negotiable Summary)

Full standards: `docs/GOLDEN_RULES.md`.

1. **Build test is mandatory** before every commit/push — production build must succeed.
2. **Vertical Slice Architecture** — organize code by feature, never by technical layer.
3. **Files under 500 lines** — split anything larger.
4. **Package managers only** — never manually edit `package.json` dependencies; commit lock files (pnpm is the default).
5. **No secrets in code or git** — use environment variables; keep `.env.example` as a template.
6. **TypeScript strict mode** — no `any` types.
7. **Atomic commits** — one logical change per commit, clear messages.
8. **Validate all input** — never trust client data.
9. **Clarify before building** — run `/intent-translator` before creating any PRP; never execute without user-approved PRP.
10. **Validate before commit** — run `/validate` (Levels 0-3: build, code quality, tests, functional).

## Spec Two-Folder Model

- `spec/current/` — current truth: what IS built. Specs are the source of truth for requirements.
- `spec/proposals/[change-id]/` — proposals: what SHOULD change (`proposal.md`, `tasks.md`, `delta.md`).
- After implementing and validating, archive the change and update `spec/current/` to reflect the new truth.

Details and workflows: `docs/WORKFLOW.md`.

## Load on Demand

| Doc | Load when |
|---|---|
| `TECH_STACK.md` | Choosing or confirming technologies (points to the tech-stack repository) |
| `docs/GOLDEN_RULES.md` | Full development standards (code quality, testing, DB, API, security) |
| `docs/VERTICAL_SLICE_ARCHITECTURE.md` | Organizing code / deciding where files go |
| `docs/COMMAND_GUIDE.md` | Full command reference with details |
| `docs/WORKFLOW.md` | Complete step-by-step workflows per feature size |
| `docs/AUTO_START_WORKFLOW.md` | Full auto-start script for fresh projects |
| `docs/12-FACTOR-AGENTS.md` | Building AI agents |
| `docs/ENHANCEMENT_TEMPLATES.md` | Command enhancement conventions |

Situational: `docs/DEPLOYMENT_SUPABASE.md` (Supabase), `docs/ENV_VARS_MANAGEMENT.md` (env vars tracking).

## Session Rules

- **Start of session**: load context with `/prime-context` (or `/onboarding` if new to the project). Check `spec/current/` and `spec/proposals/` for existing capabilities and pending work.
- **User asks for a feature**: run `/intent-translator` first — clarify, confirm tech stack, echo understanding, show blueprint, get approval. Then pick the PRP command by size (task / story / full PRP).
- **Never assume the stack**: read the project's `TECH_STACK.md` and confirm with the user; if missing, propose options from the framework `TECH_STACK.md` and create the file with their choices.
- **Execute task by task**: implement, test, validate against standards, mark complete, move on. One conversational question at a time when clarifying.
- **Before commit**: build test passes, `/validate` passes, files under 500 lines, atomic commit via `/commit`.
- **project.md** (if it exists in the user's project) holds project-specific conventions — it overrides framework defaults.
