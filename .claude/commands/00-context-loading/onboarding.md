---
description: "Onboard to a new project and understand its structure"
---

# Onboarding

## Mission

Systematically onboard a developer to a new project, understanding its structure, tech stack, patterns, and conventions. Assume the developer is experienced but completely new to this codebase. Focus on clarity and actionability.

**When to use**: First time working on a project, returning after long break, joining new team

**Arguments**: `$ARGUMENTS` (optional: focus area, e.g. a specific subsystem or feature)

---

## Prerequisites: Load SeedFW Context

Before analyzing the codebase, read the framework documentation so your analysis respects existing standards:
- `TECH_STACK.md` - Canonical project tech stack (if exists)
- `TECH_STACK.md` - Framework-level recommendations (fallback)
- `docs/GOLDEN_RULES.md` - Development standards
- `docs/VERTICAL_SLICE_ARCHITECTURE.md` - Architecture guidelines
- `project.md` / `CLAUDE.md` - Project-specific conventions (if they exist)

Understand the project structure and conventions, respect existing patterns and standards, and follow all guidelines in the loaded documentation.

---

## Onboarding Process

### Phase 1: Project Overview

**Gather high-level information:**
1. **Read README.md** - Project description, setup instructions
2. **Check package.json / pyproject.toml** - Dependencies, scripts, tech stack
3. **Review directory structure** - How code is organized
4. **Check for documentation** - docs/, CONTRIBUTING.md, ARCHITECTURE.md

**Questions to answer:**
- What does this project do? Who are the users?
- What's the tech stack and architecture pattern?
- How is the code organized?
- What are the key dependencies and their purposes?

### Phase 2: Tech Stack Analysis

**Load tech stack information:**
1. **Check for project stack**: Read `TECH_STACK.md` (if exists)
2. **Load preferred stack**: Read `TECH_STACK.md` (framework-level recommendations)

**Identify technologies:**
- **Frontend**: Framework, styling, UI library, state management
- **Backend**: Runtime, database, authentication, APIs
- **Infrastructure**: Hosting, containerization, CI/CD
- **Testing**: Test framework, coverage tools
- **Development**: Package manager, linting, formatting

**Compare to stacks**:
- **If TECH_STACK.md exists**: What's in the project stack? How does it compare to TECH_STACK.md? Why the differences? Are there missing technologies that should be added?
- **If TECH_STACK.md missing**: What technologies are actually used in the codebase? Do they align with TECH_STACK.md? Should we create TECH_STACK.md based on findings?

### Phase 3: Repository Structure & Code Patterns

**Map the codebase organization:**
- List all top-level directories with their purposes
- Identify where different types of code live (models, controllers, utils, tests)
- Highlight non-standard or unique organizational patterns
- Note any monorepo structures or submodules

**Analyze codebase patterns:**
1. **Naming conventions** - Files (PascalCase/camelCase/kebab-case), variables, functions, components
2. **Code organization** - Is it Vertical Slice Architecture? Layered? How are features organized? Where do tests live?
3. **Common patterns** - Error handling, logging, API patterns, state management, authentication
4. **Anti-patterns to avoid** - What NOT to do, known issues, technical debt areas

### Phase 4: Development Workflow

**Understand the workflow:**
1. **Local development** - How to run locally, environment variables, database setup, external services
2. **Testing** - How to run tests, coverage requirements, testing patterns
3. **Git workflow** - Branch naming, commit message format, PR process, code review
4. **Deployment** - How to deploy, staging vs production, CI/CD pipeline

### Phase 5: Key Files & Entry Points

**Identify important files:**
- **Entry points**: main.ts, index.ts, app.tsx
- **Core business logic**: Most important modules
- **Database models/schemas**
- **API endpoints or routes**
- **Configuration**: .env.example, config files
- **Tests**: Test structure and examples
- **Documentation**: Where to find answers

### Phase 6: Common Tasks & Gotchas

**Document frequent development tasks with examples:**
- How to add a new API endpoint
- How to create a new database model
- How to add a new test
- How to debug common issues
- How to update dependencies

**List potential gotchas that might trip up new developers:**
- Non-obvious configurations
- Required environment variables
- External service dependencies
- Known issues or workarounds
- Performance bottlenecks and areas of technical debt

---

## Output

Create the primary onboarding document at: `PRPs/onboarding/[project-name]-onboarding.md`

Optionally, also produce:
- A `QUICKSTART.md` with just the essential setup steps
- Suggested updates to `README.md` if it's missing critical information (suggest only — do NOT edit the README directly)

**Template:**
```markdown
# Onboarding: [Project Name]

## Project Overview
**Description**: [What the project does]
**Users**: [Who uses it]
**Repository**: [Link]
**Architecture Pattern**: [Vertical Slice / Layered / Microservices / Other]

## Tech Stack

### Frontend
- Framework: [Next.js, React, etc.]
- Styling: [Tailwind, CSS Modules, etc.]
- UI Library: [shadcn/ui, Material UI, etc.]
- State: [Zustand, Redux, Context, etc.]

### Backend
- Runtime: [Node.js, Bun, etc.]
- Database: [PostgreSQL, Convex, MongoDB, etc.]
- Auth: [Better Auth, Clerk, Auth.js, etc.]
- APIs: [List of external APIs]

### Infrastructure
- Hosting: [Coolify, Vercel, etc.]
- Containerization: [Docker, Docker Compose]
- CI/CD: [GitHub Actions, etc.]

### Development
- Package Manager: [pnpm, npm, yarn]
- TypeScript: [Yes/No]
- Testing: [Vitest, Jest, Playwright]
- Linting: [ESLint, Prettier]

## Code Organization

**Architecture**: [Vertical Slice / Layered / Other]

**Directory Structure**:
\`\`\`
project/
├── features/          # [Description]
├── core/              # [Description]
├── shared/            # [Description]
└── ...
\`\`\`

## Naming Conventions
- Files: [PascalCase / camelCase / kebab-case]
- Components: [PascalCase]
- Functions: [camelCase]
- Constants: [UPPER_SNAKE_CASE]

## Common Patterns
### Error Handling
[How errors are handled]
### Logging
[How logging is done]
### API Patterns
[How APIs are structured]
### State Management
[How state is managed]
### Authentication
[How auth works]

## Anti-Patterns to Avoid
- [Anti-pattern 1]
- [Anti-pattern 2]

## Development Workflow

### Local Setup
\`\`\`bash
# Clone repo
git clone [repo-url]

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Run database migrations (if applicable)
pnpm db:migrate

# Start development server
pnpm dev
\`\`\`

### Running Tests
\`\`\`bash
pnpm test              # Unit tests
pnpm test:integration  # Integration tests
pnpm test:e2e          # E2E tests
pnpm test:coverage     # Coverage
\`\`\`

### Git Workflow
- Branch naming: [feature/*, bugfix/*, etc.]
- Commit format: [Conventional Commits]
- PR process: [Description]

### Deployment
- Staging: [How to deploy to staging]
- Production: [How to deploy to production]

## Key Files

### Entry Points
- \`[path/to/main.ts]\` - [Description]
- \`[path/to/app.tsx]\` - [Description]

### Core Modules
- \`[path/to/core-module.ts]\` - [Description]

### Configuration
- \`.env.example\` - Environment variables template
- \`[config-file]\` - [Description]

## Common Tasks
- **Add an API endpoint**: [Steps]
- **Add a database model**: [Steps]
- **Add a test**: [Steps]
- **Debug common issues**: [Steps]

## Potential Gotchas
- [Non-obvious config / required env var / external dependency / known issue]

## Resources
- Documentation: [Link to docs]
- API Docs: [Link to API docs]
- Design System: [Link to design system]

## Next Steps
- [ ] Set up local development environment
- [ ] Run the project locally
- [ ] Run the test suite
- [ ] Read key files
- [ ] Make a small change to verify setup
- [ ] Understand the main user flow
- [ ] Identify an area to start contributing
- [ ] Ask team for code review

## Questions to Ask Team
- [Question 1]
- [Question 2]
```

---

## Rules to Follow

**Reference**: `docs/GOLDEN_RULES.md`

### Key Rules for Onboarding
1. **Be thorough** - Don't skip steps
2. **Document everything** - Write it down
3. **Ask questions** - Better to ask than assume
4. **Verify setup** - Make sure everything works
5. **Learn patterns** - Understand the "why"

---

## Usage

```
/onboarding $ARGUMENTS

AI: [Loads SeedFW context and analyzes project]
AI: [Gathers information across all phases]
AI: [Creates onboarding document]
AI: Created: PRPs/onboarding/[project]-onboarding.md
AI: You're now onboarded! Ready to start working.
```
