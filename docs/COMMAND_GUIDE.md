# SeedFW Command Guide

**Purpose**: Complete reference for all SeedFW slash commands.

**Total Commands**: 37 commands organized by workflow step (0-7).

Commands live in `.claude/commands/` and are exposed as slash commands by AI assistants that read that directory. Each command below shows its `/name` and what it does.

---

## How Commands Are Organized

Commands are grouped by the step in the workflow where they are used:

| Step | Directory | Purpose | Commands |
|------|-----------|---------|----------|
| 0 | `00-context-loading/` | Prime AI with project context | 2 |
| 1 | `01-intent-clarification/` | Clarify requirements | 1 |
| 2 | `02-prp-creation/` | Create implementation plans (PRPs) | 10 |
| 2a | `02a-agent-creation/` | Build AI agents (12-Factor) | 4 |
| 3 | `03-planning/` | Break PRPs into executable tasks | 2 |
| 4 | `04-execution/` | Implement the plan | 7 |
| 5 | `05-validation/` | Review and validate code | 4 |
| 6 | `06-git-operations/` | Commit, branch, PR | 4 |
| 7 | `07-utilities/` | Debug, refactor, run full workflow | 3 |

**Total: 37 commands**

---

## Step 0: Context Loading (2 commands)

| Command | Description |
|---------|-------------|
| `/onboarding` | Onboard to a new project and understand its structure |
| `/prime-context` | Prime AI context with project-specific information |

**When to use**: Start of a session (`/prime-context`) or when new to a project / starting a major feature (`/onboarding`).

---

## Step 1: Intent Clarification (1 command)

| Command | Description |
|---------|-------------|
| `/intent-translator` | Turn rough ideas into iron-clad work orders through systematic clarification |

**Always run this before creating a PRP.**

---

## Step 2: PRP Creation (10 commands)

| Command | Description |
|---------|-------------|
| `/api-contract-define` | Define API contract between backend and frontend |
| `/create-planning` | Transform rough ideas into a comprehensive PRD using parallel research agents and rich visual documentation |
| `/create-prp` | Create comprehensive Product Requirement Prompt with deep codebase analysis |
| `/create-prp-parallel` | Create a BASE PRP using parallel research agents, with an optional mode for generating multiple competing implementation strategies |
| `/hackathon-prp-parallel` | Generate and execute a hackathon implementation using massive parallel agents for maximum speed |
| `/hackathon-research` | Hackathon multi-option research |
| `/prp-poc-create-parallel` | Create parallel React POCs |
| `/prp-spec-create` | Create SPEC PRP (advanced) |
| `/prp-story` | Convert a user story into an executable PRP through deep codebase analysis (2-8 hours of work) |
| `/prp-task` | Create a lightweight, validated TASK PRP for small focused changes (30 min - 2 hours) |

**Decision guide**:
- Large feature → `/create-prp`
- User story (2-8 hours) → `/prp-story`
- Quick task (30 min - 2 hours) → `/prp-task`
- API design → `/api-contract-define`
- Need speed → `/hackathon-prp-parallel`

---

## Step 2a: Agent Creation (4 commands)

12-Factor Agents workflow for building production-ready AI agents.

| Command | Description |
|---------|-------------|
| `/agent-intent` | Agent intent clarification (12-Factor) |
| `/agent-prp-create` | Create a comprehensive Agent PRP (12-Factor) |
| `/agent-prp-execute` | Implement the agent (12-Factor) |
| `/agent-validate` | Validate the agent against all 12 factors |

---

## Step 3: Planning (2 commands)

| Command | Description |
|---------|-------------|
| `/create-plan` | Create detailed implementation plan with spec tasks |
| `/task-list-init` | Initialize the task list for a change |

---

## Step 4: Execution (7 commands)

| Command | Description |
|---------|-------------|
| `/execute-plan` | Execute implementation plan task by task |
| `/execute-prp` | Execute a PRP into working code until fully complete and all validation passes |
| `/prp-analyze-run` | Analyze PRP results |
| `/prp-poc-execute-parallel` | Execute parallel React POCs |
| `/prp-spec-execute` | Execute SPEC PRP |
| `/prp-story-execute` | Execute a Story PRP with focused task implementation |
| `/prp-task-execute` | Execute TASK PRP |

**Match your creation command**:
- `/create-prp` → `/execute-prp`
- `/create-plan` → `/execute-plan`
- `/prp-story` → `/prp-story-execute`
- `/prp-task` → `/prp-task-execute`

---

## Step 5: Validation (4 commands)

| Command | Description |
|---------|-------------|
| `/code-review` | Comprehensive code review with actionable, prioritized feedback |
| `/review-staged` | List and review all staged and unstaged changes before commit |
| `/user-story-rapid` | Analyze a user story and create an implementation plan |
| `/validate` | 4-gate validation (Levels 0-3) and archiving of a completed feature |

---

## Step 6: Git Operations (4 commands)

| Command | Description |
|---------|-------------|
| `/commit` | Analyze changes and create a smart, atomic git commit following conventional commits |
| `/create-pr` | Create a pull request |
| `/new-branch` | Create a new git branch from develop with a conventional branch name |
| `/resolve-conflict` | Intelligently resolve git merge conflicts with deep understanding of the codebase |

---

## Step 7: Utilities (3 commands)

| Command | Description |
|---------|-------------|
| `/debug-rca` | Systematic root cause analysis and debugging of an issue |
| `/prp-core-run-all` | Run all PRP core commands in sequence from feature request to PR |
| `/refactor` | Safe, incremental refactoring with vertical-slice checks and validation |

**Use anytime during development.**

---

## Common Workflows

### Quick Bug Fix (< 1 hour)
```
/prime-context → /intent-translator → /prp-task → /prp-task-execute → /validate → /commit
```

### User Story (1-3 days)
```
/prime-context → /intent-translator → /prp-story → /create-plan → /prp-story-execute → /code-review → /validate → /commit → /create-pr
```

### Large Feature (1+ weeks)
```
/onboarding → /intent-translator → /create-prp → /create-plan → /execute-plan → /code-review → /validate → /commit → /create-pr
```

### AI Agent (12-Factor)
```
/agent-intent → /agent-prp-create → /agent-prp-execute → /agent-validate
```

---

**See also**: `README.md` (overview), `AGENTS.md` (AI instructions), `docs/WORKFLOW.md` (complete workflows).
