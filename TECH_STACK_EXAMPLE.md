# Example: A Completed TECH_STACK.md

> **This is one illustrative example** of a filled-in `TECH_STACK.md` for a
> self-hosted SaaS. It shows the level of detail an AI or developer needs to
> scaffold and deploy from a PRD. **Your stack will differ** — use this as a
> shape to follow, not a prescription. All hostnames, IPs, and paths below are
> placeholders.

Purpose: provide a precise, machine-actionable specification that an AI or
developer can use to scaffold, configure, and deploy a new app (PRD → scaffold).

Contract (short):
- Inputs: a PRD describing the app's core features, user roles, required
  integrations (payments, AI, email, etc.), and non-functional requirements
  (scale, region, compliance).
- Outputs: a scaffolded repository (e.g. Next.js + Convex) with working auth,
  billing/webhook wiring, a CI pipeline, a deploy manifest, analytics
  instrumentation, and a README covering local dev and deploy.
- Constraints: do not change host-level facts (provider, proxy paths, cert
  paths). Use existing domain names unless the PRD provides alternatives.

---

## Canonical choices (example)

- **Host / Platform**: a cloud VPS (ARM64 or x86), Ubuntu LTS. Keep as primary
  infra for production and staging.
- **Containerization**: Docker + Docker Compose for production; Coolify for
  app-level orchestration.
- **Reverse Proxy / TLS**: Traefik as reverse proxy and ACME manager.
- **Identity & Auth**: Better Auth for application-level auth (passwordless,
  social, sessions); an SSO/admin identity provider (e.g. Authentik) for admin
  flows where applicable.
- **Backend / Database**: Convex (reactive DB + backend) as the canonical app
  backend; Convex File Storage / UploadThing / MinIO for uploads.
- **Frontend**: Next.js + TypeScript + Tailwind CSS + shadcn/ui + Lucide.
  Package manager: pnpm. Monorepo via Turbo optional.
- **State**: Convex hooks for server state; Zustand for client UI state.
- **Payments**: Stripe (webhook endpoint + local emulator for tests).
- **Analytics & Observability**: PostHog (product analytics); an API-analytics
  layer (e.g. Helicone) with toggles to forward to external services.
- **CI/CD**: GitHub Actions to build images, run tests, push to a registry, and
  trigger the deploy platform.
- **Testing**: Unit (Vitest/Jest), E2E (Playwright); ship sample tests.

---

## Environment facts (example — replace with your own, use placeholders)

Record the facts your deploy depends on so an AI doesn't invent them. Keep real
secrets and identifiers OUT of this file — use placeholders and store actual
values in your secrets manager.

- Host: `<cloud-provider>` VPS, `<arch>`, `<RAM>`, `<OS version>`
- Access: key-based SSH as `<deploy-user>`
- Proxy: Traefik, config under `<proxy-config-path>`
- Orchestration: Coolify (`<image:tag>`)
- Identity: Authentik (`<image:tag>`), Postgres + Redis backends
- Databases: Postgres `<version>`; managed DB host `<db-host>` if applicable
- Integrations: `<list the external services this app uses>`
- Paths: `<app-path>`, `<backup-path>`, `<scripts-path>`

---

## AI-ready scaffold contract — what the AI must produce from a PRD

A single repository named `{project-slug}` containing:
- `apps/frontend/` — Next.js app with the chosen UI stack and sample pages from
  the PRD (auth flow, billing pages, webhook demo).
- `apps/backend/` — Convex project implementing core APIs from the PRD.
- `infrastructure/` — docker-compose.yml, Traefik dynamic snippet, deploy
  manifest folder, `.env.example`.
- `ci/` — GitHub Actions: `build-and-test.yml`, `deploy.yml`.
- `ops/` — backup scripts, DB dump/restore, monitoring starter.
- `README.md` — run locally, run tests, deploy.

Detailed requirements:
- **Auth**: Better Auth + Convex for user creation, login, sessions; optional
  social login; an admin area protected by the SSO provider.
- **Payments**: Stripe checkout + webhooks with idempotency keys and webhook
  secret verification; local emulator instructions and a `test-cards.md`.
- **Analytics**: PostHog frontend snippet + server-side event endpoint; an
  API-analytics SDK placeholder.
- **CI/CD**: build images, run tests, and on push to `main` push to registry
  and trigger deploy.
- **Observability & backups**: a monitoring compose file and DB backup scripts.

Acceptance criteria:
- All apps build and pass `pnpm test` and `pnpm build` locally.
- Docker Compose spins up frontend, backend, DB, proxy, and a mock webhook
  receiver.
- README documents local dev, tests, deploy, and required env vars.

---

## Operational notes & runbooks (short)

- **Backups**: nightly DB dumps to `<backup-path>`, retention as needed; follow
  Convex backup docs for self-hosted instances.
- **Security**: proxy manages TLS via Let's Encrypt; back up ACME storage;
  store secrets in CI secrets and the runtime vault — never in this file.
- **Scaling**: move databases to a managed service and add a caching layer as
  load grows.
