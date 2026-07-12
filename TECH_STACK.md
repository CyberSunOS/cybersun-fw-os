# Tech Stack

**Purpose**: Define the technologies this project uses, so AI assistants apply
your stack consistently instead of guessing or researching each time.

Fill this in for your project. The AI reads it during `/intent-translator` and
`/create-prp` and confirms it with you before writing any code.

---

## How AI assistants should use this file

1. **Read this file** at the start of intent clarification and PRP creation.
2. **Confirm the stack with the user** category-by-category before implementing.
3. **Stay within the defined stack** — don't introduce new technologies unless
   the user explicitly asks for alternatives.
4. **If this file is empty or incomplete**, ask the user what they're building
   and propose a stack; then record the confirmed choices here.

---

## Project stack

Replace the placeholders below with your project's real choices.

| Category | Choice |
|---|---|
| Language / runtime | `<e.g. TypeScript / Node 20>` |
| Framework | `<e.g. Next.js 15>` |
| Package manager | `<e.g. pnpm>` |
| Database | `<e.g. Postgres / Convex>` |
| Auth | `<e.g. Better Auth>` |
| Payments | `<e.g. Stripe>` |
| Styling / UI | `<e.g. Tailwind + shadcn/ui>` |
| Testing | `<e.g. Vitest + Playwright>` |
| Hosting / deploy | `<e.g. Vercel / Coolify>` |
| Analytics / observability | `<e.g. PostHog>` |

Add rows for anything else the project depends on (queues, storage, email, AI
providers, etc.).

---

## Optional: a shared tech-stack repository

If you maintain a set of curated, reusable stacks across projects, you can point
to that repository here and have the AI read the relevant stack file from it:

```
Tech-stack repository: <your-org>/<tech-stack-repo>   # optional
Relevant stack file:   <e.g. my-stacks/WEB_APP_PRIMARY_STACK.md>
```

This is optional — a curated repo keeps stacks consistent across many projects,
but a project-local stack (defined above) works fine on its own. If the repo is
unavailable (e.g. offline), define the stack directly above and continue.

See `TECH_STACK_EXAMPLE.md` for an example of a fully filled-in stack.
