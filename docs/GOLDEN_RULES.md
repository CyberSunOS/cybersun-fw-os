# GOLDEN RULES - Universal Development Standards

**Project-Agnostic Development Rules and Best Practices**
**Last Updated**: October 28, 2025

---

## 📋 TABLE OF CONTENTS

### Part I: AI & Workflow
1. [AI Operational Guidelines](#ai-operational-guidelines)
2. [Architecture & Organization](#architecture--organization)
3. [PRP Methodology](#prp-methodology)
4. [Spec-Driven Development](#spec-driven-development)

### Part II: Code Quality
5. [Core Development Principles](#core-development-principles)
6. [Git & Version Control](#git--version-control)
7. [Code Quality & TypeScript](#code-quality--typescript)
8. [Testing Requirements](#testing-requirements)

### Part III: Project Structure
9. [File Structure & Organization](#file-structure--organization)
10. [Naming Conventions](#naming-conventions)
11. [Database Conventions](#database-conventions)

### Part IV: Implementation
12. [API Development](#api-development)
13. [UI/Component Development](#uicomponent-development)
14. [Package Management](#package-management)

### Part V: Deployment & Security
15. [Build & Deployment](#build--deployment)
16. [Documentation Requirements](#documentation-requirements)
17. [Security & Environment Variables](#security--environment-variables)

---

---

## 🤖 AI OPERATIONAL GUIDELINES

### **Context Preservation**
1. ✅ **Never reset context** - Maintain conversation history unless explicitly instructed
2. ✅ **Reference previous decisions** - When continuing work, reference earlier decisions and rationale
3. ✅ **Create checkpoints** - In long conversations, periodically summarize progress
4. ✅ **Document assumptions** - When proceeding with incomplete information, document what you assumed

### **Task Management**
1. ✅ **One task at a time** - Complete one task fully before moving to the next
2. ✅ **Break down complex tasks** - Split large tasks into smaller, manageable subtasks
3. ✅ **Track progress** - Maintain clear record of completed and remaining work
4. ✅ **Verify completion criteria** - Ensure all acceptance criteria are met before marking complete
5. ✅ **Use task management tools** - For complex work, use task tracking to maintain visibility

### **Communication Guidelines**
1. ✅ **Clarity over brevity** - Be thorough in explanations of complex topics
2. ✅ **Code-first responses** - For implementation questions, lead with code examples
3. ✅ **Proactive clarification** - Ask questions when requirements are ambiguous
4. ✅ **Adapt technical level** - Adjust explanation depth based on user's demonstrated knowledge
5. ❌ **No flattery** - Skip "good/great/excellent" responses, be direct and factual

### **Information Hierarchy (Source of Truth Priority)**
1. **Explicit user instructions** in current conversation (highest priority)
2. **Project specifications** in `PRPs/` or `spec/current/` directories
3. **Architecture guidelines** in `docs/VERTICAL_SLICE_ARCHITECTURE.md`
4. **Codebase context** from retrieval tools
5. **General best practices** for the technology stack (lowest priority)

### **When Information Conflicts**
1. ✅ **Ask for clarification** when requirements appear contradictory
2. ✅ **Prioritize newer specifications** over older ones
3. ✅ **Document assumptions** made when proceeding with incomplete information
4. ✅ **Explain reasoning** when making decisions between conflicting sources

### **Learning and Improvement**
1. ✅ **Recognize patterns** - Identify recurring patterns in the project
2. ✅ **Apply feedback** - Integrate feedback from previous interactions to future work
3. ✅ **Acknowledge limitations** - Be honest about knowledge gaps and suggest resources
4. ✅ **Adapt to project style** - Match existing code style, naming conventions, and patterns

---

## 🏗️ ARCHITECTURE & ORGANIZATION

### **Vertical Slice Architecture**

**Organize code by FEATURE, not by technical layer**

#### Traditional Layered (❌ Don't Use)
```
app/
├── controllers/     # All controllers
├── services/        # All services
├── models/          # All models
└── views/           # All views
```

#### Vertical Slice (✅ Use This)
```
app/
├── features/
│   ├── user-auth/           # Everything for authentication
│   │   ├── api/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── tests/
│   ├── product-catalog/     # Everything for products
│   │   └── ...
│   └── shopping-cart/       # Everything for cart
│       └── ...
├── core/                    # Cross-cutting concerns
│   ├── auth/
│   ├── logging/
│   └── database/
└── shared/                  # Shared utilities
    ├── ui/
    ├── utils/
    └── types/
```

### **Vertical Slice Rules**
1. ✅ **All code for a feature in ONE directory** - Easy to find and understand
2. ✅ **Features are self-contained** - Can be understood without looking elsewhere
3. ✅ **Features can be deleted by removing ONE directory** - Clean removal
4. ❌ **No dependencies between features** - Use `shared/` or `core/` instead
5. ✅ **Keep files under 500 lines** - Better AI comprehension and maintainability

### **What Goes in Each Directory**

**`features/[feature-name]/`** - Feature-specific code
- API endpoints specific to this feature
- UI components specific to this feature
- Business logic specific to this feature
- Data models specific to this feature
- Tests specific to this feature
- Types specific to this feature

**`core/`** - Infrastructure and cross-cutting concerns
- Authentication/authorization middleware
- Logging infrastructure
- Database connection and configuration
- Error handling
- Caching
- Rate limiting

**`shared/`** - Reusable code across features
- UI component library (Button, Input, Modal)
- Utility functions (validation, formatting, date handling)
- API client
- Common types and interfaces
- Constants

### **File Size Limits**
- ✅ **Keep files under 500 lines** - Better for AI comprehension
- ✅ **Split large files** - Break into smaller, focused modules
- ✅ **One responsibility per file** - Single purpose principle
- ❌ **Don't create monolithic files** - Harder to maintain and understand

> 🔒 **Machine-enforced**: When using Claude Code, SeedFW's `check-file-size` hook (`.claude/hooks/`) warns the AI whenever an edited source file exceeds 500 lines. Set `SEEDFW_SKIP_HOOKS=1` to temporarily disable all SeedFW enforcement hooks.

### **Feature Communication**
❌ **Bad** - Features importing from each other:
```typescript
// In features/shopping-cart/services/cart-service.ts
import { getUserById } from '../../user-auth/services/user-service';
```

✅ **Good** - Features using shared services:
```typescript
// In features/shopping-cart/services/cart-service.ts
import { getUserById } from '@/shared/services/user-service';
// OR
import { getUserById } from '@/core/user/user-service';
```

---

## 📝 PRP METHODOLOGY

### **What is PRP?**

**Product Requirement Prompt (PRP)** = PRD + curated codebase intelligence + agent runbook

A PRP supplies an AI coding agent with everything it needs to deliver a vertical slice of working software—no more, no less.

### **PRP vs Traditional PRD**

| Aspect | Traditional PRD | PRP |
|--------|----------------|-----|
| **Focus** | What and why | What, why, AND how |
| **Context** | High-level requirements | Precise file paths, code snippets, library versions |
| **Audience** | Human developers | AI coding agents |
| **Detail Level** | Deliberately avoids implementation | Includes implementation guidance |
| **Goal** | Clarify product requirements | Enable one-pass implementation |

### **PRP Structure**

A complete PRP includes:

1. **Phase 0: Intent Clarification**
   - User's original request
   - Clarifying questions and answers
   - Refined understanding of requirements
   - Success criteria

2. **Phase 1: Vibe Planning**
   - Freeform exploration of the problem space
   - Brainstorming approaches
   - Identifying constraints and opportunities

3. **Phase 2: INITIAL.md**
   - High-level requirements
   - Feature description
   - User stories
   - Acceptance criteria
   - Technical approach

4. **Phase 3: PLAN.md**
   - Detailed implementation plan
   - File structure
   - Code snippets and examples
   - Library documentation
   - Validation commands
   - Step-by-step tasks

### **Context Engineering**

**The key to successful PRPs is rich context:**

1. ✅ **Precise file paths** - Exact locations, not vague descriptions
2. ✅ **Code snippets** - Real examples from the codebase
3. ✅ **Library versions** - Specific versions being used
4. ✅ **Library documentation** - Relevant docs in `PRPs/ai_docs/`
5. ✅ **Validation commands** - How to verify the implementation works
6. ✅ **Gotchas and patterns** - Known issues and established patterns

### **PRP Best Practices**

1. ✅ **Start with Intent Translator** - Clarify requirements before planning
2. ✅ **Include codebase examples** - Show, don't just tell
3. ✅ **Document validation steps** - How to verify success
4. ✅ **Reference existing patterns** - Maintain consistency
5. ✅ **Keep PRPs focused** - One feature per PRP
6. ✅ **Update PRPs as you learn** - Capture new insights
7. ✅ **Archive completed PRPs** - Maintain history

### **PRP Directory Structure**
```
PRPs/
├── templates/              # PRP templates
├── ai_docs/               # Library documentation for AI
├── [feature-name]/        # Feature-specific PRPs
│   ├── 0-intent.md       # Intent clarification
│   ├── 1-vibe.md         # Vibe planning
│   ├── 2-initial.md      # High-level requirements
│   └── 3-plan.md         # Detailed implementation plan
└── archive/              # Completed PRPs
```

---

## 🎯 SPEC-DRIVEN DEVELOPMENT

### **Spec Methodology**

**Align humans and AI with specifications before writing code**

### **Core Principles**
1. ✅ **Specs are source of truth** - All requirements live in specs
2. ✅ **Change tracking** - Proposals → Tasks → Archive
3. ✅ **Explicit scope** - What's changing is always clear
4. ✅ **Reviewable** - Changes can be reviewed before implementation
5. ✅ **Auditable** - History of all changes is preserved

### **Spec Workflow**

```
1. Draft Change Proposal
   ↓
2. Review & Align (feedback loop)
   ↓
3. Implement Tasks
   ↓
4. Archive & Update Specs
```

### **Directory Structure**
```
spec/
├── specs/                 # Source of truth (current state)
│   ├── architecture.md
│   ├── features/
│   └── api/
├── changes/              # Proposed changes (active work)
│   ├── [change-id]/
│   │   ├── proposal.md   # What's changing and why
│   │   ├── tasks.md      # Implementation tasks
│   │   └── delta.md      # Spec changes (ADDED/MODIFIED/REMOVED)
│   └── ...
└── archive/              # Completed changes
    └── [date]-[change-id]/
```

### **Change Proposal Format**

```markdown
# Change Proposal: [Feature Name]

## Context
Why this change is needed

## Proposed Changes
What will change

## Affected Specs
Which specs will be updated

## Tasks
- [ ] Task 1
- [ ] Task 2

## Success Criteria
How to verify success
```

### **Delta Format**

```markdown
# Spec Delta

## ADDED
New requirements being added

## MODIFIED
Existing requirements being changed
- Before: ...
- After: ...

## REMOVED
Requirements being removed
```

### **Best Practices**
1. ✅ **Keep specs up to date** - Archive changes to update specs
2. ✅ **Small, focused changes** - One feature per change proposal
3. ✅ **Review before implementation** - Align on specs first
4. ✅ **Document rationale** - Explain why changes are needed
5. ✅ **Link to PRPs** - Connect specs to implementation plans

---

## 📋 CORE DEVELOPMENT PRINCIPLES

### **Work Style**
1. ✅ **Autonomous work until completion** - Don't ask for permission on standard tasks
2. ✅ **Always push to git after code changes** that user approves
3. ✅ **Use stable solutions over experimental ones**
4. ❌ **Don't mention AI in UI text** - Use neutral language like "Ready to send" instead of "AI-generated"
5. ❌ **No demo/test data in production** - Only real data that passes validation filters
6. ❌ **No flattery** - Skip "good/great/excellent" responses, be direct and factual

### **Development Mindset**
- **Prefer explicit errors over fallbacks** - Fail fast with clear error messages
- **Prioritize stability over experimental features** - Production reliability first
- **Ask for clarification if requirements conflict** - Don't make assumptions
- **Always suggest writing/updating tests after code changes** - Quality assurance is mandatory
- **Focus on doing what the user asks - nothing more, nothing less** - Avoid scope creep
- **Document complex logic inline** - Future developers (including AI) need context

---

## 🌳 GIT & VERSION CONTROL

### **Branch Strategy**
- **Development Branch**: Active feature/fix development
- **Production Branch**: Production-ready code only (typically `main` or `master`)
- **Branch Naming**: Use descriptive names (e.g., `feature/auth`, `fix/api-error`, `refactor/database`)

### **Commit Rules**
1. ✅ **Commit frequently** with descriptive messages
2. ✅ **Always push to current working branch**
3. ❌ **Never push directly to production branch** without testing
4. ❌ **Never merge untested code to production branch**
5. ✅ **Keep commits atomic** - One logical change per commit

### **Commit Message Format**
```bash
# Good examples:
git commit -m "Fix user authentication flow"
git commit -m "Add diagnostic script for API health check"
git commit -m "Refactor database query optimization"

# Use conventional commits (optional but recommended):
feat: Add new feature
fix: Fix bug
docs: Update documentation
refactor: Refactor code
test: Add or update tests
chore: Maintenance tasks
```

### **Git Workflow**
```bash
# Daily work
git add -A
git commit -m "Descriptive message"
git push origin <current-branch>

# Before pushing to production
npm run build  # MANDATORY - verify build passes
git push origin <production-branch>  # Only when ready
```

---

## 🔧 CODE QUALITY & TYPESCRIPT

### **TypeScript Configuration Standards**
- **Strict Mode**: ALWAYS enable (`"strict": true`)
- **Target**: Use modern ES standards (ES2020+)
- **Module Resolution**: Configure based on framework requirements
- **Path Aliases**: Use path aliases for cleaner imports (e.g., `@/lib/...` instead of `../../../lib/...`)

### **TypeScript Rules**
1. ❌ **NO `any` types without proper justification** - Use `unknown` or proper types
2. ✅ **ALL database queries must be properly typed** - No untyped data access
3. ✅ **ALL API responses must have proper type definitions** - Define interfaces/types
4. ✅ **Resolve all TypeScript errors before deployment** - Zero tolerance for type errors
5. ✅ **Use proper interfaces for component props** - Document component contracts
6. ✅ **Prefer `interface` over `type` for object shapes** - Better error messages
7. ✅ **Use `const` assertions for literal types** - Improve type inference

### **ESLint Configuration**
- **Always use ESLint** for code quality enforcement
- **Recommended Plugins**:
  - TypeScript ESLint parser and plugin
  - Import/export validation
  - Accessibility checks (for web apps)
  - Framework-specific plugins (React, Vue, etc.)

### **Code Style Standards**
- **Strict Mode**: Enable framework strict mode (React, Vue, etc.)
- **Formatting**: Use consistent formatting (Prettier recommended)
- **Imports**:
  - Use path aliases for internal imports
  - Group imports logically (external → internal → types)
  - Remove unused imports
- **Components**:
  - Use TypeScript interfaces for props
  - Document complex components with JSDoc
  - Keep components focused and single-purpose

---

## ✅ TESTING REQUIREMENTS

### **Testing Rules**
1. ✅ **Build test is MANDATORY before every push** - Verify production build succeeds
2. ✅ **Always suggest writing/updating tests after code changes** - Quality assurance
3. ✅ **Test critical paths** - Authentication, payments, data integrity
4. ✅ **Write tests that provide value** - Don't test for the sake of testing

> 🔒 **Machine-enforced**: When using Claude Code, SeedFW's `guard-commit` hook blocks `git commit` if the project build fails — this rule is enforced by the harness, not just documented.

### **Build Test Command**
```bash
# For Node.js/npm projects
npm run build

# For other build systems
yarn build
pnpm build
make build
```

### **Expected Build Result**
- ✅ Build completed successfully with no errors
- ✅ No TypeScript/type errors
- ✅ No compilation errors
- ✅ No critical warnings
- ✅ All assets generated correctly

### **Testing Best Practices**
- **Unit Tests**: Test individual functions/components in isolation
- **Integration Tests**: Test how components work together
- **E2E Tests**: Test critical user flows end-to-end
- **Test Coverage**: Aim for high coverage on critical paths, not 100% everywhere
- **Test Naming**: Use descriptive names that explain what is being tested

---

## 📁 FILE STRUCTURE & ORGANIZATION

### **General Project Structure Principles**
```
project-root/
├── src/                       # Source code
│   ├── app/ or pages/        # Application routes/pages
│   │   ├── api/              # API routes (if applicable)
│   │   └── [features]/       # Feature-specific pages
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   └── [feature]/        # Feature-specific components
│   ├── lib/                  # Utilities and libraries
│   │   ├── api/              # API clients
│   │   ├── utils/            # Helper functions
│   │   └── config/           # Configuration files
│   ├── types/                # TypeScript type definitions
│   ├── hooks/                # Custom hooks (React/Vue)
│   ├── stores/               # State management (if applicable)
│   └── styles/               # Global styles
├── database/                 # Database-related files
│   ├── schema/               # Database schema
│   ├── migrations/           # Database migrations
│   └── seeds/                # Database seeding
├── scripts/                  # Utility scripts
├── tests/                    # Test files
├── public/                   # Static assets
├── docs/                     # Documentation (all CAPITALIZED .md files)
├── config files              # Framework/tool configurations
└── package.json              # Dependencies
```

### **Key Directory Purposes**
- **`src/`**: All application source code
- **`src/lib/`**: Shared utilities, API clients, configuration
- **`src/components/`**: Reusable UI components
- **`database/`**: Database schema, migrations, seeds
- **`scripts/`**: One-time scripts, utilities, automation
- **`tests/`**: All test files (unit, integration, e2e)
- **`docs/`**: All documentation files (CAPITALIZED .md files)
- **`public/`**: Static assets (images, fonts, etc.)

---

## 🏷️ NAMING CONVENTIONS

### **Files**
- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **API Routes**: kebab-case (e.g., `sync-data/route.ts`, `user-auth.ts`)
- **Utilities**: kebab-case (e.g., `data-validator.ts`, `api-client.ts`)
- **Types**: kebab-case (e.g., `api-types.ts`, `user-types.ts`)
- **Documentation**: UPPER_SNAKE_CASE (e.g., `README.md`, `API_DOCUMENTATION.md`, `GOLDEN_RULES.md`)

### **Variables & Functions**
- **Variables**: camelCase (e.g., `userEmail`, `isProcessing`, `dataCount`)
- **Functions**: camelCase (e.g., `fetchUserData`, `validateInput`, `processRequest`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **Classes**: PascalCase (e.g., `UserService`, `DataProcessor`, `ApiClient`)
- **Components**: PascalCase (e.g., `Button`, `UserProfile`, `DataTable`)

### **Database**
- **Tables**: snake_case (e.g., `users`, `system_config`, `audit_logs`)
- **Columns**: snake_case or camelCase (consistent within project)
- **Indexes**: `idx_<table>_<column>` (e.g., `idx_users_email`)
- **Foreign Keys**: `fk_<table>_<referenced_table>` (e.g., `fk_orders_users`)

### **API Endpoints**
- **REST**: kebab-case (e.g., `/api/user-profile`, `/api/sync-data`)
- **GraphQL**: camelCase (e.g., `getUserProfile`, `syncData`)
- **Versioning**: Include version in path (e.g., `/api/v1/users`, `/api/v2/users`)

---

## 🗄️ DATABASE CONVENTIONS

### **Schema Design Rules**
1. ✅ **Use consistent naming** - snake_case or camelCase (pick one per project)
2. ✅ **Always include timestamp fields** - `created_at`, `updated_at` (or `createdAt`, `updatedAt`)
3. ✅ **Use proper primary keys** - UUID or auto-increment integers
4. ✅ **Define foreign key relationships** - Maintain referential integrity
5. ✅ **Add indexes for frequently queried fields** - Optimize query performance
6. ✅ **Use appropriate data types** - Don't store JSON when relational is better
7. ✅ **Document complex schemas** - Add comments for non-obvious fields

### **Common Table Patterns**
- **users**: User accounts and authentication
- **system_config**: Application settings (key-value pairs)
- **audit_logs**: Action tracking and history
- **sessions**: User session management
- **api_keys**: API authentication tokens

### **Database Operations Best Practices**
```typescript
// Always use ORM/query builder
import { db } from '@/lib/database';

// Upsert pattern (create or update)
await db.users.upsert({
  where: { email: 'user@example.com' },
  create: { ...newData },
  update: { ...updateData }
});

// Always handle errors
try {
  await db.records.create({ data });
} catch (error) {
  console.error('[Database Error]:', error);
  throw new Error('Failed to create record');
}

// Use transactions for multi-step operations
await db.transaction(async (tx) => {
  await tx.users.create({ data: userData });
  await tx.profiles.create({ data: profileData });
});
```

### **Migration Best Practices**
1. ✅ **Never edit existing migrations** - Create new ones for changes
2. ✅ **Test migrations on staging first** - Verify before production
3. ✅ **Backup database before migrations** - Safety first
4. ✅ **Write reversible migrations** - Include rollback logic
5. ✅ **Document breaking changes** - Communicate with team

---

## 🔌 API DEVELOPMENT

### **API Route Structure (Framework-Agnostic)**
```typescript
// Example: Next.js API route
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // 1. Validate authentication
    const user = await validateAuth(request);

    // 2. Validate input
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }

    // 3. Process request
    const data = await db.records.findUnique({ where: { id } });

    // 4. Return response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[API Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### **API Conventions**
1. ✅ **Always use try-catch blocks** - Handle all errors gracefully
2. ✅ **Return proper HTTP status codes** - 200, 201, 400, 401, 403, 404, 500, etc.
3. ✅ **Log errors with descriptive prefixes** - e.g., `[API]`, `[Database]`, `[Auth]`
4. ✅ **Validate input parameters** - Never trust client input
5. ✅ **Return consistent JSON structure** - Same format across all endpoints
6. ✅ **Implement rate limiting** - Protect against abuse
7. ✅ **Use authentication middleware** - Secure protected endpoints
8. ✅ **Document API endpoints** - OpenAPI/Swagger or similar

### **HTTP Status Codes**
- **200 OK**: Successful GET request
- **201 Created**: Successful POST request (resource created)
- **204 No Content**: Successful DELETE request
- **400 Bad Request**: Invalid input
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server-side error

### **Response Format Standards**
```typescript
// Success response
{
  success: true,
  data: { /* response data */ },
  meta?: { /* pagination, etc. */ }
}

// Error response
{
  error: 'Human-readable error message',
  code?: 'ERROR_CODE',
  details?: { /* additional error info */ }
}

// Paginated response
{
  success: true,
  data: [ /* items */ ],
  meta: {
    page: 1,
    pageSize: 20,
    total: 100,
    totalPages: 5
  }
}
```

---

## 🎨 UI/COMPONENT DEVELOPMENT

### **Component Structure (React Example)**
```typescript
// src/components/ui/button.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
```

### **UI Development Conventions**
1. ✅ **Use component library** - Shadcn, Material-UI, Ant Design, etc.
2. ✅ **Use utility-first CSS** - Tailwind CSS, UnoCSS, etc.
3. ✅ **Use className merging utility** - `cn()`, `clsx()`, `classnames()`
4. ✅ **Use forwardRef for reusable components** - Better ref handling
5. ✅ **Set displayName for debugging** - Easier to identify in DevTools
6. ✅ **Keep components small and focused** - Single responsibility principle
7. ✅ **Extract reusable logic to hooks** - Don't repeat yourself
8. ✅ **Use TypeScript for props** - Type safety and autocomplete

### **Styling Best Practices**
- **Consistent Design System**: Use design tokens (colors, spacing, typography)
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Dark Mode**: Support dark mode if applicable
- **Performance**: Avoid inline styles, use CSS-in-JS efficiently

### **Component Organization**
```
components/
├── ui/                    # Base UI components (Button, Input, etc.)
├── layout/                # Layout components (Header, Footer, Sidebar)
├── features/              # Feature-specific components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── settings/         # Settings components
└── shared/                # Shared components across features
```

---

## 📦 PACKAGE MANAGEMENT

### **Package Manager Rules**
1. ✅ **ALWAYS use package managers** - npm, yarn, pnpm, bun
2. ❌ **NEVER manually edit package.json for dependencies** - Use CLI commands
3. ✅ **Use lock files** - Commit `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
4. ✅ **Keep dependencies up to date** - Regular security updates
5. ✅ **Use exact versions for critical dependencies** - Avoid breaking changes

> 🔒 **Machine-enforced**: When using Claude Code, SeedFW's `guard-package-json` hook blocks manual dependency additions/changes in `package.json` and instructs the AI to use the package manager instead. Creating a brand-new `package.json` and non-dependency edits (scripts, version, metadata) are allowed.

### **Common Package Manager Commands**
```bash
# npm
npm install <package>           # Add dependency
npm install -D <package>        # Add dev dependency
npm uninstall <package>         # Remove dependency
npm update                      # Update dependencies
npm audit                       # Check for vulnerabilities

# yarn
yarn add <package>              # Add dependency
yarn add -D <package>           # Add dev dependency
yarn remove <package>           # Remove dependency
yarn upgrade                    # Update dependencies

# pnpm
pnpm add <package>              # Add dependency
pnpm add -D <package>           # Add dev dependency
pnpm remove <package>           # Remove dependency
pnpm update                     # Update dependencies
```

### **Common Project Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production (MANDATORY before push)
npm start            # Start production server
npm run lint         # Run linter
npm run type-check   # Check TypeScript errors
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run format       # Format code (Prettier)
```

---

## 🚀 BUILD & DEPLOYMENT

### **Pre-Push Checklist** (MANDATORY)
1. ✅ **Run build locally** - `npm run build` or equivalent
2. ✅ **Verify build passes** - NO TypeScript/compilation errors
3. ✅ **Check for warnings** - Review build output
4. ✅ **Run linter** - `npm run lint` or equivalent
5. ✅ **Check for type errors** - `npm run type-check` or equivalent
6. ✅ **Verify all imports** - No unused or missing imports
7. ✅ **Test critical paths** - Ensure core functionality works
8. ✅ **Review changed files** - `git diff` before committing
9. ✅ **Update documentation** - If logic changed

### **Build Configuration Best Practices**
- **Output Format**: Configure for deployment target (standalone, static, etc.)
- **Environment Variables**: Use build-time and runtime variables appropriately
- **Optimization**: Enable minification, tree-shaking, code splitting
- **Source Maps**: Enable for debugging, disable for production (optional)
- **Asset Optimization**: Compress images, fonts, etc.

### **Docker Best Practices**
```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### **Deployment Process**
1. ✅ **Build passes locally** - Verify before pushing
2. ✅ **Push to branch** - Use descriptive commit messages
3. ✅ **CI/CD pipeline runs** - Automated tests and builds
4. ✅ **Deploy to staging** - Test in staging environment first
5. ✅ **Monitor deployment logs** - Check for errors
6. ✅ **Verify production functionality** - Smoke tests
7. ✅ **Rollback plan ready** - Know how to revert if needed

### **Deployment Checklist**
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Static assets uploaded (if separate CDN)
- [ ] Health check endpoint working
- [ ] Monitoring/logging configured
- [ ] Backup strategy in place
- [ ] SSL/TLS certificates valid
- [ ] DNS records configured

---

## 📝 DOCUMENTATION REQUIREMENTS

### **Code Documentation Standards**
1. ✅ **Add comments for complex logic** - Explain WHY, not WHAT
2. ✅ **Document functions with JSDoc/TSDoc** - Parameters, return types, examples
3. ✅ **Update documentation when logic changes** - Keep docs in sync
4. ✅ **Document breaking changes** - Communicate with team
5. ✅ **Add README to each major directory** - Explain purpose and structure

### **Documentation File Naming**
- ✅ **ALL documentation files MUST be CAPITALIZED** - e.g., `README.md`, `API_DOCUMENTATION.md`
- ✅ **Use underscores for multi-word files** - e.g., `GOLDEN_RULES.md`, `PRE_PUSH_CHECKLIST.md`
- ✅ **Use `.md` extension** - Markdown format

### **Essential Documentation Files**
- **README.md**: Project overview, setup instructions, tech stack
- **GOLDEN_RULES.md**: Development rules and conventions (this file)
- **PRE_PUSH_CHECKLIST.md**: Pre-push verification steps
- **API_DOCUMENTATION.md**: API endpoints, request/response formats
- **ARCHITECTURE.md**: System architecture and design decisions
- **DEPLOYMENT.md**: Deployment process and configuration
- **TROUBLESHOOTING.md**: Common issues and solutions

### **Documentation Style Guidelines**
- **Clear Headings**: Use hierarchical structure (H1 → H2 → H3)
- **Code Examples**: Include practical examples with syntax highlighting
- **Concise**: Keep documentation factual and to the point
- **Up-to-Date**: Update documentation with code changes
- **Searchable**: Use descriptive headings and keywords
- **Visual Aids**: Use diagrams, tables, and lists for clarity

### **JSDoc/TSDoc Example**
```typescript
/**
 * Fetches user data from the database
 *
 * @param userId - The unique identifier of the user
 * @param includeProfile - Whether to include profile data
 * @returns User object with optional profile data
 * @throws {NotFoundError} If user doesn't exist
 *
 * @example
 * const user = await fetchUser('123', true);
 * console.log(user.email);
 */
async function fetchUser(
  userId: string,
  includeProfile: boolean = false
): Promise<User> {
  // Implementation
}
```

---

## 🔒 SECURITY & ENVIRONMENT VARIABLES

### **Environment Variables Best Practices**
1. ❌ **NEVER commit `.env` files to git** - Add to `.gitignore`
2. ✅ **Use `.env.example` for documentation** - Template without secrets
3. ✅ **Store production secrets securely** - Use deployment platform secrets
4. ✅ **Type environment variables** - Validate at runtime
5. ✅ **Use different values per environment** - Dev, staging, production
6. ✅ **Rotate secrets regularly** - Security best practice

### **Environment Variable Structure**
```bash
# .env.example (commit this)
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
AUTH_CLIENT_ID=your_client_id
AUTH_CLIENT_SECRET=your_client_secret
AUTH_SECRET=your_secret_key

# External APIs
API_KEY=your_api_key
API_BASE_URL=https://api.example.com

# Application
NODE_ENV=development
PORT=3000
```

### **Environment Variable Validation**
```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_CLIENT_ID: z.string().min(1),
  AUTH_CLIENT_SECRET: z.string().min(1),
  API_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.coerce.number().default(3000),
});

export const env = envSchema.parse(process.env);
```

### **Security Rules**
1. ❌ **NEVER expose API keys in client-side code** - Server-side only
2. ❌ **NEVER log sensitive data** - Passwords, tokens, API keys
3. ❌ **NEVER trust user input** - Always validate and sanitize
4. ✅ **Use HTTPS in production** - Encrypt data in transit
5. ✅ **Implement authentication** - Protect sensitive endpoints
6. ✅ **Implement authorization** - Role-based access control
7. ✅ **Use parameterized queries** - Prevent SQL injection
8. ✅ **Implement rate limiting** - Prevent abuse
9. ✅ **Hash passwords** - Use bcrypt, argon2, or similar
10. ✅ **Use CSRF protection** - For state-changing operations
11. ✅ **Set security headers** - CSP, HSTS, X-Frame-Options, etc.
12. ✅ **Keep dependencies updated** - Regular security patches

> 🔒 **Machine-enforced**: When using Claude Code, SeedFW's `guard-commit` hook blocks `git commit` if staged changes contain secret-like strings (AWS keys, private keys, GitHub/Slack tokens, API keys, JWTs).

### **Common Security Headers**
```typescript
// Example: Next.js middleware
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=()');

  return response;
}
```

---

## 🎯 CRITICAL RULES SUMMARY

### **MUST DO** ✅
1. ✅ **Run build before every push** - `npm run build` or equivalent
2. ✅ **Fix all type errors before deployment** - Zero tolerance
3. ✅ **Use package managers for dependencies** - Never manual edits
4. ✅ **Push to git after approved changes** - Version control everything
5. ✅ **Follow naming conventions** - Consistency is key
6. ✅ **Document complex logic** - Help future developers
7. ✅ **Handle errors properly** - Try-catch, logging, user feedback
8. ✅ **Use proper types** - TypeScript strict mode
9. ✅ **Validate user input** - Never trust client data
10. ✅ **Test critical paths** - Authentication, payments, data integrity
11. ✅ **Keep dependencies updated** - Security patches
12. ✅ **Use environment variables** - Never hardcode secrets
13. ✅ **Implement authentication** - Protect sensitive endpoints
14. ✅ **Write atomic commits** - One logical change per commit
15. ✅ **Review code before pushing** - `git diff` is your friend

### **MUST NOT DO** ❌
1. ❌ **Push code that doesn't build** - Always verify locally first
2. ❌ **Use `any` types without justification** - Defeats TypeScript purpose
3. ❌ **Manually edit package.json for dependencies** - Use package manager CLI
4. ❌ **Commit sensitive data to git** - API keys, passwords, tokens
5. ❌ **Mention AI in UI text** - Use neutral language
6. ❌ **Create demo/test data in production** - Real data only
7. ❌ **Push directly to production branch without testing** - Use staging
8. ❌ **Merge untested code** - Test before merge
9. ❌ **Expose API keys in client-side code** - Server-side only
10. ❌ **Trust user input** - Always validate and sanitize
11. ❌ **Log sensitive data** - Passwords, tokens, API keys
12. ❌ **Ignore TypeScript errors** - Fix them, don't suppress
13. ❌ **Skip documentation** - Document as you code
14. ❌ **Use inline styles excessively** - Use CSS classes
15. ❌ **Hardcode configuration** - Use environment variables

---

## 📚 ADDITIONAL BEST PRACTICES

### **Code Review Checklist**
- [ ] Code builds successfully
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No console.log statements (use proper logging)
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Documentation updated
- [ ] No sensitive data exposed
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met (for UI)

### **Performance Best Practices**
- ✅ **Lazy load components** - Load on demand
- ✅ **Optimize images** - Compress and use appropriate formats
- ✅ **Use pagination** - Don't load all data at once
- ✅ **Implement caching** - Reduce redundant operations
- ✅ **Minimize bundle size** - Tree-shaking, code splitting
- ✅ **Use database indexes** - Optimize query performance
- ✅ **Avoid N+1 queries** - Use joins or batch loading

### **Accessibility Best Practices**
- ✅ **Use semantic HTML** - `<button>`, `<nav>`, `<main>`, etc.
- ✅ **Add ARIA labels** - For screen readers
- ✅ **Keyboard navigation** - All interactive elements accessible
- ✅ **Color contrast** - WCAG AA compliance minimum
- ✅ **Focus indicators** - Visible focus states
- ✅ **Alt text for images** - Descriptive alternative text

---

**This document contains universal development rules and best practices applicable to any project.**
**Adapt these rules to your specific project requirements while maintaining the core principles.**


