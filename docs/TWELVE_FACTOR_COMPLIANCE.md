# Twelve-Factor App Compliance Guide

**Purpose:** This guide explains how SeedFW implements and enforces the [Twelve-Factor App](https://12factor.net/) methodology to ensure all applications built with this framework are production-ready, scalable, and maintainable.

**Last Updated:** 2025-11-04

---

## 🎯 Overview

The Twelve-Factor App is a methodology for building software-as-a-service apps that:
- Use declarative formats for setup automation
- Have a clean contract with the underlying operating system
- Are suitable for deployment on modern cloud platforms
- Minimize divergence between development and production
- Can scale up without significant changes

**SeedFW enforces these principles by design.**

---

## 📋 The Twelve Factors

### I. Codebase
**Principle:** One codebase tracked in revision control, many deploys

#### How SeedFW Implements This:
- ✅ Every project uses Git for version control
- ✅ Single repository per application
- ✅ Multiple deploys (dev, staging, production) from same codebase
- ✅ Branches represent different states, not different codebases

#### Validation Checklist:
- [ ] Project is in Git repository
- [ ] `.gitignore` excludes build artifacts and secrets
- [ ] Same codebase deploys to all environments
- [ ] No environment-specific code branches

#### Common Pitfalls:
- ❌ Creating separate repos for dev/staging/prod
- ❌ Maintaining different codebases for different customers
- ❌ Using branches as long-lived environment-specific code

---

### II. Dependencies
**Principle:** Explicitly declare and isolate dependencies

#### How SeedFW Implements This:
- ✅ Package manager required (pnpm/npm/yarn for Node.js, pip for Python, etc.)
- ✅ Dependency manifest (package.json, requirements.txt, Cargo.toml, etc.)
- ✅ Lock files committed (pnpm-lock.yaml, package-lock.json, poetry.lock, etc.)
- ✅ No reliance on system-wide packages

#### Validation Checklist:
- [ ] All dependencies declared in manifest file
- [ ] Lock file committed to repository
- [ ] No system tools assumed (ImageMagick, curl, etc.)
- [ ] Dependency isolation (node_modules, venv, etc.)
- [ ] Deterministic builds (same input = same output)

#### Common Pitfalls:
- ❌ Manually editing package.json instead of using package manager
- ❌ Assuming system tools exist
- ❌ Not committing lock files
- ❌ Using global packages

#### SeedFW Golden Rule:
**ALWAYS use package managers. NEVER manually edit package files.**

---

### III. Config
**Principle:** Store config in the environment

#### How SeedFW Implements This:
- ✅ All config in environment variables
- ✅ `.env.example` template provided
- ✅ `.env` files in `.gitignore`
- ✅ No hardcoded credentials or config

#### Validation Checklist:
- [ ] All config in environment variables
- [ ] `.env.example` documents all required vars
- [ ] `.env` files never committed
- [ ] No hardcoded URLs, API keys, or credentials
- [ ] Config varies by deploy, code does not

#### Environment Variables to Externalize:
- Database URLs and credentials
- API keys and secrets
- Service endpoints
- Feature flags
- Per-deploy values (hostname, port)

#### Common Pitfalls:
- ❌ Hardcoding config in code
- ❌ Using config files (config/database.yml)
- ❌ Grouping config by environment name
- ❌ Committing secrets to repository

#### Litmus Test:
**Could you open-source the codebase right now without compromising credentials?**

---

### IV. Backing Services
**Principle:** Treat backing services as attached resources

#### How SeedFW Implements This:
- ✅ All services referenced via connection strings in config
- ✅ No distinction between local and third-party services
- ✅ Services can be attached/detached without code changes

#### Validation Checklist:
- [ ] Database accessed via DATABASE_URL
- [ ] Cache accessed via REDIS_URL or similar
- [ ] External APIs accessed via configurable URLs
- [ ] Services swappable without code changes
- [ ] No hardcoded service locations

#### Examples of Backing Services:
- Databases (PostgreSQL, MySQL, MongoDB)
- Caching systems (Redis, Memcached)
- Message queues (RabbitMQ, SQS)
- SMTP services (SendGrid, Postmark)
- Storage services (S3, Cloudinary)
- API services (Stripe, Twilio)

#### Common Pitfalls:
- ❌ Hardcoding database connection details
- ❌ Treating local services differently than third-party
- ❌ Requiring code changes to swap services

---

### V. Build, Release, Run
**Principle:** Strictly separate build and run stages

#### How SeedFW Implements This:
- ✅ Build stage: Convert code to executable bundle
- ✅ Release stage: Combine build with config
- ✅ Run stage: Execute release in environment
- ✅ CI/CD pipeline enforces separation

#### The Three Stages:

**Build:**
```bash
pnpm install
pnpm build
# Creates: dist/, .next/, build/
```

**Release:**
```bash
# Combine build artifact + config
docker build -t app:v123 .
# Tag with unique version
```

**Run:**
```bash
# Execute with environment config
docker run -e DATABASE_URL=$DATABASE_URL app:v123
```

#### Validation Checklist:
- [ ] Build creates deployable artifact
- [ ] Releases have unique IDs (git SHA, timestamp)
- [ ] Runtime cannot modify code
- [ ] Rollback possible (deploy previous release)
- [ ] Build once, deploy many times

#### Common Pitfalls:
- ❌ Building in production
- ❌ Modifying code at runtime
- ❌ No release versioning
- ❌ Cannot rollback deployments

---

### VI. Processes
**Principle:** Execute the app as one or more stateless processes

#### How SeedFW Implements This:
- ✅ Processes are stateless and share-nothing
- ✅ Session data in backing services (Redis, database)
- ✅ No sticky sessions required
- ✅ Vertical Slice Architecture supports stateless design

#### Validation Checklist:
- [ ] No in-memory session storage
- [ ] No local filesystem for persistent data
- [ ] Processes can be killed and restarted safely
- [ ] No assumptions about previous requests
- [ ] Shared state in backing services only

#### Where to Store State:
- ✅ Database (persistent data)
- ✅ Redis (sessions, cache)
- ✅ S3/Object Storage (files)
- ❌ Process memory (lost on restart)
- ❌ Local filesystem (lost on scale/restart)

#### Common Pitfalls:
- ❌ Storing sessions in memory
- ❌ Caching in process memory
- ❌ Writing files to local disk
- ❌ Assuming single-server deployment

---

### VII. Port Binding
**Principle:** Export services via port binding

#### How SeedFW Implements This:
- ✅ App exports HTTP via port binding
- ✅ Port configured via environment variable
- ✅ Self-contained (no runtime injection)
- ✅ Can become backing service for other apps

#### Validation Checklist:
- [ ] App binds to port specified by PORT env var
- [ ] No dependency on runtime web server injection
- [ ] App is self-contained and executable
- [ ] Can run standalone or behind reverse proxy

#### Example:
```typescript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Common Pitfalls:
- ❌ Hardcoding port numbers
- ❌ Requiring Apache/Nginx to run
- ❌ Not being self-contained

---

### VIII. Concurrency
**Principle:** Scale out via the process model

#### How SeedFW Implements This:
- ✅ Horizontal scaling (more processes)
- ✅ Process types (web, worker, scheduler)
- ✅ Stateless design enables scaling
- ✅ Load balancing across processes

#### Process Types:
- **web**: HTTP requests
- **worker**: Background jobs
- **scheduler**: Cron-like tasks
- **websocket**: Real-time connections

#### Validation Checklist:
- [ ] Can run multiple instances
- [ ] No shared state between processes
- [ ] Process types clearly defined
- [ ] Horizontal scaling strategy documented

#### Scaling Example:
```bash
# Scale web processes
web: 4 instances
worker: 2 instances
scheduler: 1 instance
```

#### Common Pitfalls:
- ❌ Vertical scaling only (bigger servers)
- ❌ Shared state preventing horizontal scaling
- ❌ Single-threaded bottlenecks

---

### IX. Disposability
**Principle:** Maximize robustness with fast startup and graceful shutdown

#### How SeedFW Implements This:
- ✅ Fast startup (< 10 seconds target)
- ✅ Graceful shutdown on SIGTERM
- ✅ Crash recovery without data loss
- ✅ Minimal initialization

#### Validation Checklist:
- [ ] Startup time < 10 seconds
- [ ] SIGTERM handler for graceful shutdown
- [ ] In-flight requests complete before shutdown
- [ ] Background jobs return to queue on shutdown
- [ ] Crashes don't corrupt data

#### Graceful Shutdown Example:
```typescript
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await server.close();
  await db.disconnect();
  process.exit(0);
});
```

#### Common Pitfalls:
- ❌ Long startup times
- ❌ No shutdown handlers
- ❌ Losing in-flight work on shutdown
- ❌ Corrupting data on crash

---

### X. Dev/Prod Parity
**Principle:** Keep development, staging, and production as similar as possible

#### How SeedFW Implements This:
- ✅ Same backing services in all environments
- ✅ Same dependencies (lock files)
- ✅ Same build process
- ✅ Docker for environment consistency

#### The Three Gaps:

**Time Gap:** Deploy frequently (hours, not months)
**Personnel Gap:** Developers deploy their own code
**Tools Gap:** Same tools in dev and prod

#### Validation Checklist:
- [ ] Same database type in dev and prod
- [ ] Same dependency versions
- [ ] Same build process
- [ ] Docker/containers for consistency
- [ ] Frequent deployments (daily/weekly)

#### Common Pitfalls:
- ❌ SQLite in dev, PostgreSQL in prod
- ❌ Different dependency versions
- ❌ Manual deployment process
- ❌ Long time between deploys

---

### XI. Logs
**Principle:** Treat logs as event streams

#### How SeedFW Implements This:
- ✅ Write logs to stdout/stderr
- ✅ No log files or log rotation
- ✅ Execution environment captures streams
- ✅ Centralized logging in production

#### Validation Checklist:
- [ ] All logs to stdout/stderr
- [ ] No log files written
- [ ] Structured logging (JSON)
- [ ] Log aggregation in production
- [ ] No log rotation in app code

#### Logging Example:
```typescript
// ✅ Good: stdout
console.log(JSON.stringify({ level: 'info', message: 'User logged in', userId: 123 }));

// ❌ Bad: file
fs.appendFileSync('/var/log/app.log', 'User logged in');
```

#### Common Pitfalls:
- ❌ Writing to log files
- ❌ Implementing log rotation
- ❌ Unstructured logs
- ❌ No centralized logging

---

### XII. Admin Processes
**Principle:** Run admin/management tasks as one-off processes

#### How SeedFW Implements This:
- ✅ Admin tasks as separate scripts
- ✅ Same environment as regular processes
- ✅ Same codebase and dependencies
- ✅ REPL access for debugging

#### Examples of Admin Processes:
- Database migrations
- One-off data fixes
- Console/REPL sessions
- Scheduled maintenance tasks

#### Validation Checklist:
- [ ] Migrations run as one-off processes
- [ ] Admin scripts in repository
- [ ] Same environment as app processes
- [ ] REPL available for debugging
- [ ] No admin tasks in app code

#### Running Admin Tasks:
```bash
# Database migration
pnpm run migrate

# One-off script
pnpm run script:fix-data

# REPL
pnpm run console
```

#### Common Pitfalls:
- ❌ Running admin tasks in app processes
- ❌ Different environment for admin tasks
- ❌ No migration system
- ❌ Manual database changes

---

## ✅ Compliance Checklist

Use this checklist to validate twelve-factor compliance:

- [ ] **I. Codebase**: Single repo, multiple deploys
- [ ] **II. Dependencies**: Explicit declaration, lock files
- [ ] **III. Config**: Environment variables, no secrets in code
- [ ] **IV. Backing Services**: Connection strings, swappable
- [ ] **V. Build, Release, Run**: Separate stages, versioned releases
- [ ] **VI. Processes**: Stateless, share-nothing
- [ ] **VII. Port Binding**: Self-contained, configurable port
- [ ] **VIII. Concurrency**: Horizontal scaling, process types
- [ ] **IX. Disposability**: Fast startup, graceful shutdown
- [ ] **X. Dev/Prod Parity**: Same tools, frequent deploys
- [ ] **XI. Logs**: stdout/stderr, event streams
- [ ] **XII. Admin Processes**: One-off scripts, same environment

---

## 🎯 Quick Reference

| Factor | Key Action | Validation |
|--------|-----------|------------|
| Codebase | Use Git | One repo, many deploys |
| Dependencies | Use package manager | Lock files committed |
| Config | Use .env | No secrets in code |
| Backing Services | Use URLs | Swappable without code changes |
| Build/Release/Run | Use CI/CD | Separate stages |
| Processes | Design stateless | No in-memory state |
| Port Binding | Use PORT env var | Self-contained |
| Concurrency | Scale horizontally | Multiple instances |
| Disposability | Handle SIGTERM | Fast startup/shutdown |
| Dev/Prod Parity | Use same tools | Same backing services |
| Logs | Use stdout | No log files |
| Admin Processes | Use scripts | One-off execution |

---

## 📚 Resources

- [The Twelve-Factor App](https://12factor.net/)
- [Twelve-Factor App (Updated)](https://github.com/twelve-factor/twelve-factor)
- [Beyond the Twelve-Factor App](https://www.oreilly.com/library/view/beyond-the-twelve-factor/9781492042631/)

---

**This guide is part of SeedFW. All applications built with SeedFW should follow these principles.**

