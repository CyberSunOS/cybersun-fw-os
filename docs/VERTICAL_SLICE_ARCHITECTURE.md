# Vertical Slice Architecture for AI-Assisted Development

**Core Architecture Pattern in SeedFW**

---

## What is Vertical Slice Architecture?

**Traditional Layered Architecture** (Horizontal):
```
app/
├── controllers/     # All controllers
├── services/        # All services
├── models/          # All models
├── views/           # All views
└── utils/           # All utilities
```

**Problem**: To add a feature, you touch files in 4-5 different directories. AI loses context jumping between layers.

---

**Vertical Slice Architecture** (Feature-Based):
```
app/
├── features/
│   ├── user-auth/           # Everything for user authentication
│   │   ├── api/             # Auth API endpoints
│   │   ├── components/      # Auth UI components
│   │   ├── services/        # Auth business logic
│   │   ├── models/          # Auth data models
│   │   └── tests/           # Auth tests
│   ├── product-catalog/     # Everything for product catalog
│   │   ├── api/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── tests/
│   └── shopping-cart/       # Everything for shopping cart
│       └── ...
├── core/                    # Cross-cutting concerns
│   ├── auth/                # Authentication infrastructure
│   ├── logging/             # Logging infrastructure
│   └── database/            # Database infrastructure
└── shared/                  # Shared utilities
    ├── ui/                  # Shared UI components
    ├── utils/               # Shared utilities
    └── types/               # Shared type definitions
```

**Benefit**: To add a feature, all code is in ONE directory. AI maintains perfect context.

---

## Why Vertical Slices for AI Coding?

### Problem with Horizontal Layers

**AI loses context when jumping between layers:**

```
AI: "Let me add user registration..."

Step 1: Create controller in controllers/user-controller.ts
Step 2: Create service in services/user-service.ts
Step 3: Create model in models/user-model.ts
Step 4: Create view in views/register.tsx
Step 5: Create validation in utils/user-validation.ts

Result: AI forgets what it did in Step 1 by Step 5
```

### Solution with Vertical Slices

**AI works in ONE directory:**

```
AI: "Let me add user registration..."

Working in: features/user-auth/

Step 1: Create api/register.ts
Step 2: Create services/registration-service.ts
Step 3: Create models/user.ts
Step 4: Create components/RegisterForm.tsx
Step 5: Create tests/registration.test.ts

Result: AI maintains perfect context - everything is in features/user-auth/
```

---

## Complete Project Structure

```
your-project/
│
├── seedfw/                     # SeedFW Framework (guidance)
│   ├── .claude/commands/       # 58 slash commands
│   ├── PRPs/                   # Planning documents
│   ├── spec/               # Spec management
│   └── docs/                   # Framework documentation
│
├── app/                        # Your application (generated code)
│   ├── features/               # ⭐ Vertical slices by feature
│   │   │
│   │   ├── user-auth/          # User authentication feature
│   │   │   ├── api/            # API endpoints
│   │   │   │   ├── login.ts
│   │   │   │   ├── register.ts
│   │   │   │   └── logout.ts
│   │   │   ├── components/     # UI components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── AuthGuard.tsx
│   │   │   ├── services/       # Business logic
│   │   │   │   ├── auth-service.ts
│   │   │   │   └── token-service.ts
│   │   │   ├── models/         # Data models
│   │   │   │   ├── user.ts
│   │   │   │   └── session.ts
│   │   │   ├── hooks/          # React hooks (if applicable)
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useSession.ts
│   │   │   ├── types/          # TypeScript types
│   │   │   │   └── auth-types.ts
│   │   │   └── tests/          # Tests
│   │   │       ├── login.test.ts
│   │   │       └── register.test.ts
│   │   │
│   │   ├── product-catalog/    # Product catalog feature
│   │   │   ├── api/
│   │   │   │   ├── products.ts
│   │   │   │   └── categories.ts
│   │   │   ├── components/
│   │   │   │   ├── ProductList.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   └── CategoryFilter.tsx
│   │   │   ├── services/
│   │   │   │   └── product-service.ts
│   │   │   ├── models/
│   │   │   │   ├── product.ts
│   │   │   │   └── category.ts
│   │   │   └── tests/
│   │   │       └── products.test.ts
│   │   │
│   │   ├── shopping-cart/      # Shopping cart feature
│   │   │   └── ...
│   │   │
│   │   └── checkout/           # Checkout feature
│   │       └── ...
│   │
│   ├── core/                   # Cross-cutting concerns
│   │   ├── auth/               # Authentication infrastructure
│   │   │   ├── middleware.ts
│   │   │   └── jwt-utils.ts
│   │   ├── logging/            # Logging infrastructure
│   │   │   └── logger.ts
│   │   ├── database/           # Database infrastructure
│   │   │   ├── client.ts
│   │   │   └── migrations/
│   │   └── config/             # Configuration
│   │       └── env.ts
│   │
│   └── shared/                 # Shared utilities
│       ├── ui/                 # Shared UI components
│       │   ├── Button.tsx
│       │   ├── Input.tsx
│       │   └── Modal.tsx
│       ├── utils/              # Shared utilities
│       │   ├── validation.ts
│       │   ├── formatting.ts
│       │   └── api-client.ts
│       └── types/              # Shared type definitions
│           └── common-types.ts
│
├── database/                   # Database files
│   ├── schema/
│   ├── migrations/
│   └── seeds/
│
├── public/                     # Static assets
├── tests/                      # Integration/E2E tests
├── scripts/                    # Utility scripts
├── docs/                       # Project documentation
└── config files                # package.json, tsconfig.json, etc.
```

---

## Rules for Vertical Slices

### 1. Feature Boundaries

**Each feature is self-contained:**
- ✅ All code for the feature in ONE directory
- ✅ Feature can be understood without looking elsewhere
- ✅ Feature can be deleted by removing ONE directory
- ❌ No dependencies between features (use shared/ instead)

### 2. What Goes in a Feature?

**Include:**
- ✅ API endpoints specific to this feature
- ✅ UI components specific to this feature
- ✅ Business logic specific to this feature
- ✅ Data models specific to this feature
- ✅ Tests specific to this feature
- ✅ Types specific to this feature

**Don't Include:**
- ❌ Shared UI components (put in shared/ui/)
- ❌ Shared utilities (put in shared/utils/)
- ❌ Infrastructure code (put in core/)
- ❌ Database migrations (put in database/migrations/)

### 3. Cross-Cutting Concerns (core/)

**Use core/ for infrastructure:**
- Authentication/authorization middleware
- Logging infrastructure
- Database connection
- Configuration management
- Error handling
- Caching
- Rate limiting

### 4. Shared Code (shared/)

**Use shared/ for reusable code:**
- UI component library (Button, Input, Modal)
- Utility functions (validation, formatting, date handling)
- API client
- Common types
- Constants

### 5. Feature Communication

**Features should NOT import from each other:**

❌ **Bad:**
```typescript
// In features/shopping-cart/services/cart-service.ts
import { getUserById } from '../../user-auth/services/user-service';
```

✅ **Good:**
```typescript
// In features/shopping-cart/services/cart-service.ts
import { getUserById } from '@/shared/services/user-service';
// OR
import { getUserById } from '@/core/user/user-service';
```

---

## File Size Limits

**Keep files under 500 lines:**

✅ **Good:**
```
features/user-auth/
├── api/
│   ├── login.ts           (150 lines)
│   ├── register.ts        (180 lines)
│   └── logout.ts          (50 lines)
```

❌ **Bad:**
```
features/user-auth/
├── api/
│   └── auth.ts            (800 lines) ← TOO BIG
```

**Why 500 lines?**
- AI can comprehend entire file at once
- Easier code reviews
- Better maintainability
- Forces good separation of concerns

---

## How SeedFW Uses Vertical Slices

### Step 1: Intent Translator
```
User: I want to add user authentication

AI: [asks questions]
AI: Creates intent clarification
```

### Step 2: Create PRP
```
/create-prp user-auth

AI: Creates PRP with:
- Feature: user-auth
- Architecture: Vertical slice in features/user-auth/
- Structure: api/, components/, services/, models/, tests/
```

### Step 3: Create Plan
```
/create-plan user-auth

AI: Creates tasks.md with:
Task 1: Create features/user-auth/api/login.ts
Task 2: Create features/user-auth/services/auth-service.ts
Task 3: Create features/user-auth/components/LoginForm.tsx
...
```

### Step 4: Execute Plan
```
/execute-plan user-auth

AI: Implements in features/user-auth/
- All code in ONE directory
- Perfect context maintained
- No jumping between layers
```

### Step 5: Validate
```
/validate user-auth

AI: Validates:
- All files in features/user-auth/ < 500 lines
- Tests in features/user-auth/tests/ pass
- No cross-feature dependencies
```

---

## Benefits for AI Coding

### 1. Context Preservation
AI works in ONE directory → maintains perfect context

### 2. Parallel Development
Multiple features can be developed simultaneously without conflicts

### 3. Easy Deletion
Remove a feature = delete ONE directory

### 4. Clear Boundaries
AI knows exactly where code belongs

### 5. Better Testing
All tests for a feature are in ONE place

### 6. Easier Debugging
All code for a feature is in ONE place

---

## Migration from Layered Architecture

**If you have existing layered code:**

```bash
# Old structure
app/
├── controllers/
│   ├── user-controller.ts
│   └── product-controller.ts
├── services/
│   ├── user-service.ts
│   └── product-service.ts
└── models/
    ├── user.ts
    └── product.ts

# New structure
app/
├── features/
│   ├── user-auth/
│   │   ├── api/user-controller.ts
│   │   ├── services/user-service.ts
│   │   └── models/user.ts
│   └── product-catalog/
│       ├── api/product-controller.ts
│       ├── services/product-service.ts
│       └── models/product.ts
```

**Migration strategy:**
1. Create features/ directory
2. Move related files into feature directories
3. Update imports
4. Test thoroughly
5. Delete old directories

---

## Summary

**Vertical Slice Architecture is CRITICAL for AI coding:**

✅ **All code for a feature in ONE directory**
✅ **AI maintains perfect context**
✅ **Files under 500 lines**
✅ **Clear boundaries**
✅ **Easy to understand, modify, delete**

**This is the core architecture pattern that makes SeedFW complete.**


