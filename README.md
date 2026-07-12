# SeedFW-OS — AI-Assisted Development Framework

_The public edition of the SeedFW framework._

**A comprehensive framework for AI-assisted software development that actually works in production.**

---

## What is SeedFW?

SeedFW is a complete, battle-tested framework for AI-assisted development that combines:
- **PRP (Product Requirement Prompts)** - Context engineering from Rasmus Widing's framework
- **OpenSpec** - Spec-driven development from Fission AI
- **CyberSun Framework** - Vertical Slice Architecture
- **Intent Translator** - 7-step clarification protocol
- **37 Commands** - Organized by workflow step
- **3-Level Validation** - Ensure quality

**Result**: Production-ready code on the first pass.

**Total Commands**: 37 commands organized by workflow step (0-7)

---

## Quick Start

### 1. Initialize SeedFW in Your Project

```bash
# Scaffold everything with the CLI
npx @cybersunos/seedfw init
# Or, if installed globally: seedfw init
```

`seedfw init` creates `.claude/`, `docs/`, `spec/`, `TECH_STACK.md`, `AGENTS.md`, and the other framework files for you — including the enforcement hooks in `.claude/hooks/` and `.claude/settings.json`.

**Alternative: install as a Claude Code plugin (beta)**

```bash
# In Claude Code (requires git access to the private repo)
/plugin marketplace add CyberSunOS/cybersun-fw-os
/plugin install seedfw@seedfw
```

This delivers all commands (namespaced, e.g. `/seedfw:create-prp`) and the enforcement hooks via Claude Code's plugin system, with updates via `/plugin marketplace update seedfw`. You still run `seedfw init` for per-project scaffolding (`spec/`, `TECH_STACK.md`, `PRPs/`, docs). Note: the plugin manifests are new and not yet validated in a live Claude Code session — treat this path as beta until a first-install test. See **INSTALL.md** (Method D) for details.

### 2. Start Building

```bash
# In your AI assistant (Claude Code, Cursor, etc.)
/intent-translator

# AI will ask questions to clarify your requirements
# Then follow the workflow:
/create-prp [feature-name]
/create-plan [feature-name]
/execute-plan [feature-name]
/validate [feature-name]
```

### 3. Organize Your Code

Follow Vertical Slice Architecture:

```
your-project/
├── features/              # All features here
│   ├── user-auth/        # Everything for authentication
│   ├── product-catalog/  # Everything for products
│   └── shopping-cart/    # Everything for cart
├── core/                 # Infrastructure
├── shared/               # Reusable code
└── ...
```

---

## Core Workflow

### The 5-Step Process

```
1. /intent-translator      → Clarify requirements
2. /create-prp [feature]   → Create comprehensive plan
3. /create-plan [feature]  → Break into tasks
4. /execute-plan [feature] → Implement
5. /validate [feature]     → 4-gate validation (Levels 0-3)
```

### Example

```
User: I want to add user authentication

AI: /intent-translator
AI: What authentication method do you prefer?
User: JWT with httpOnly cookies

AI: [asks more questions...]
AI: ✅ ECHO CHECK: I will create JWT-based auth...
User: YES

AI: /create-prp user-auth
AI: [analyzes codebase, creates comprehensive PRP]
AI: ✅ PRP created

AI: /create-plan user-auth
AI: [creates detailed task list]
AI: ✅ Plan created

AI: /execute-plan user-auth
AI: [implements feature task by task]
AI: ✅ All tasks complete

AI: /validate user-auth
AI: [runs 4-gate validation (Levels 0-3)]
AI: ✅ Feature validated and ready!
```

---

## Key Features

### 1. Intent Translator

**Problem**: You don't know what you don't know.

**Solution**: AI asks systematic questions to clarify requirements before any work begins.

**Result**: Clear, unambiguous requirements that lead to correct implementations.

### 2. Context Engineering (PRP)

**Problem**: AI doesn't have enough context to succeed.

**Solution**: Product Requirement Prompt (PRP) = PRD + codebase intelligence + implementation guide.

**Result**: AI has everything it needs for one-pass implementation.

### 3. Vertical Slice Architecture

**Problem**: Traditional layered architecture makes AI lose context.

**Solution**: Organize code by feature, not by technical layer.

**Result**: All code for a feature in ONE directory - AI maintains perfect context.

### 4. Spec-Driven Development

**Problem**: Requirements drift during implementation.

**Solution**: Spec-driven methodology - specs are the source of truth, changes are tracked. (Spec workflow inspired by OpenSpec.)

**Result**: Always know what's changing and why.

### 5. 3-Level Validation

**Problem**: Code works but isn't production-ready.

**Solution**: 
- Level 0: Build test (MANDATORY)
- Level 1: Code quality & static analysis
- Level 2: Unit & integration tests
- Level 3: Functional & manual testing

**Result**: Production-ready code with confidence.

### 6. Enforcement Hooks

**Problem**: Golden rules were prose the AI could ignore.

**Solution**: Claude Code hooks (shipped in `.claude/hooks/`, wired up via `.claude/settings.json` by `seedfw init`) enforce the rules deterministically at the harness level:
- **guard-commit** - Blocks `git commit` if the build fails (Golden Rule #1) or staged changes contain secret-like strings (AWS keys, private keys, GitHub/Slack tokens, API keys, JWTs)
- **guard-package-json** - Blocks manual dependency edits in `package.json` (use the package manager instead)
- **check-file-size** - Warns when a source file exceeds 500 lines

Escape hatch: set `SEEDFW_SKIP_HOOKS=1` to disable all gates.

**Result**: Rules are enforced, not just documented.

---

## Commands

### Core Workflow (5 commands)
- `/intent-translator` - Clarify requirements
- `/create-prp [feature]` - Create comprehensive PRP
- `/create-plan [feature]` - Create implementation plan
- `/execute-plan [feature]` - Execute implementation
- `/validate [feature]` - 4-gate validation (Levels 0-3)

### Quick Commands
- `/prp-task [task]` - Quick task (30 min - 2 hours)
- `/prp-story [story]` - User story (2-8 hours)

### Utilities
- `/onboarding` - Onboard to project
- `/prime-context` - Prime AI context
- `/debug-rca` - Root cause analysis
- `/refactor` - Safe, incremental refactoring

---

## Documentation

### Essential Reading
1. **`docs/GOLDEN_RULES.md`** - Universal development standards
2. **`docs/VERTICAL_SLICE_ARCHITECTURE.md`** - Architecture guide
3. **`docs/WORKFLOW.md`** - Complete workflow guide

### Templates
- **`PRPs/templates/`** - PRP templates for different scenarios

---

## Architecture

### Vertical Slice Structure

```
your-project/
├── features/              # ⭐ Organize by feature
│   ├── user-auth/
│   │   ├── api/          # API endpoints
│   │   ├── components/   # UI components
│   │   ├── services/     # Business logic
│   │   ├── models/       # Data models
│   │   └── tests/        # Tests
│   └── ...
├── core/                 # Infrastructure
│   ├── auth/
│   ├── logging/
│   └── database/
├── shared/               # Reusable code
│   ├── ui/
│   ├── utils/
│   └── types/
└── ...
```

**Benefits:**
- ✅ All code for a feature in ONE directory
- ✅ AI maintains perfect context
- ✅ Easy to understand and modify
- ✅ Delete feature = delete ONE directory

---

## 37 Commands Organized by Workflow

SeedFW includes 37 commands organized by workflow step (when they're used):

### Step 0: Context Loading (2 commands)
- `/prime-context` - Quick context loading (5 min)
- `/onboarding` - Comprehensive onboarding (15 min)

### Step 1: Intent Clarification (1 command)
- `/intent-translator` - 7-step clarification protocol

### Step 2: PRP Creation (10 commands)
- `/create-prp` - Comprehensive PRP with deep codebase analysis
- `/create-prp-parallel` - PRP using parallel research agents
- `/prp-story` - User story PRP (2-8 hours)
- `/prp-task` - Quick task PRP (30 min - 2 hours)
- Plus 6 more PRP creation commands

### Step 2a: Agent Creation (4 commands)
- `/agent-intent` - Clarify agent requirements (12-Factor)
- `/agent-prp-create` - Create comprehensive Agent PRP
- `/agent-prp-execute` - Implement the agent
- `/agent-validate` - Validate against all 12 factors

### Step 3: Planning (2 commands)
- `/create-plan` - spec-style change proposal
- `/task-list-init` - Initialize task list

### Step 4: Execution (7 commands)
- `/execute-plan` - Execute with task tracking
- `/execute-prp` - Execute a PRP to working code
- `/prp-story-execute` - Execute user story
- Plus 4 more execution commands

### Step 5: Validation (4 commands)
- `/validate` - 4-gate validation (Levels 0-3)
- `/code-review` - Comprehensive code review
- `/review-staged` - Review staged/unstaged changes
- `/user-story-rapid` - Rapid user-story analysis

### Step 6: Git Operations (4 commands)
- `/commit` - Smart, atomic commit
- `/new-branch` - Create feature branch
- `/create-pr` - Create pull request
- `/resolve-conflict` - Resolve git merge conflicts

### Step 7: Utilities (3 commands)
- `/prp-core-run-all` - Run entire workflow
- `/debug-rca` - Root cause analysis
- `/refactor` - Safe refactoring

**See**: `docs/COMMAND_GUIDE.md` for complete command reference

---

## Rules

### Golden Rules

**See**: `docs/GOLDEN_RULES.md` for complete rules.

**Key principles:**
1. ✅ **Follow Vertical Slice Architecture** - Feature-based organization
2. ✅ **Keep files under 500 lines** - Better AI comprehension
3. ✅ **Use package managers** - NEVER manually edit package.json
4. ✅ **Build test MANDATORY** - Must pass before push
5. ✅ **TypeScript strict mode** - No `any` types
6. ✅ **Atomic commits** - One logical change per commit
7. ✅ **No secrets in code** - Use environment variables
8. ✅ **Validate all input** - Never trust user input

---

## Credits & Inspiration

SeedFW is built on the shoulders of giants. We are deeply grateful to:

### Core Methodologies

**PRP (Product Requirement Prompts)** by Rasmus Widing
- Repository: https://github.com/Wirasm/PRPs-agentic-eng
- Contribution: PRP methodology, context engineering, command structure
- Author: Rasmus Widing (https://www.rasmuswiding.com/)

**OpenSpec** by Fission AI
- Repository: https://github.com/Fission-AI/OpenSpec
- Contribution: Spec-driven development, change tracking methodology
- Team: Fission AI (https://fission.ai/)

**CyberSun Framework** by CyberianSun
- Repository: https://github.com/CyberianSun/cybersun-framework
- Contribution: Vertical Slice Architecture, AI operational guidelines
- Author: CyberianSun

### What SeedFW Adds

- **Unified workflow** - Combines all three methodologies into one coherent process
- **Intent Translator** - 7-step systematic requirement clarification
- **37 Commands** - All PRP commands + SeedFW enhancements, organized by workflow step
- **Workflow-Based Organization** - Commands organized by when they're used (Steps 0-7)
- **Enhancement Templates** - Lightweight references to TECH_STACK.md, GOLDEN_RULES.md, etc.
- **Complete documentation** - AGENTS.md, COMMAND_GUIDE.md, GOLDEN_RULES.md, and more
- **Production focus** - 4-gate validation (Levels 0-3) ensures quality
- **CLI Tool Design** - Complete design for seedfw CLI tool

---

## Support This Work

If you find value in SeedFW, please:

1. ⭐ **Star this repository**
2. 🔗 **Share with your team**
3. 💬 **Provide feedback** - Open issues or discussions
4. 🤝 **Contribute** - PRs welcome!

**Also support the original creators:**
- ☕ **Buy Rasmus a coffee**: https://coff.ee/wirasm
- 🎯 **Book a workshop**: https://www.rasmuswiding.com/
- 🌟 **Star OpenSpec**: https://github.com/Fission-AI/OpenSpec
- 🌟 **Star CyberSun**: https://github.com/CyberianSun/cybersun-framework

---

## License

MIT License - See LICENSE file for details.

---

## Get Started

```bash
# 1. Initialize SeedFW in your project (scaffolds .claude/, docs/, spec/, etc.)
npx @cybersunos/seedfw init

# 2. Start building
# In your AI assistant:
/intent-translator
```

**Welcome to production-ready AI-assisted development!** 🚀


