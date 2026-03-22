# Entangle — CI/CD documentation

This folder records the **continuous integration and deployment** setup for the Entangle monorepo (server, client, admin) targeting **AWS EC2 (Amazon Linux)** with **GitHub Actions** and **PM2**.

## Workflows (by design)

| Workflow | When it runs | Purpose |
|----------|----------------|--------|
| **CI** (`ci.yml`) | Every push/PR to `main` / `master` / `develop` | `npm ci`, Prisma validate, build client + admin — **should stay green** without EC2 or extra secrets |
| **CI API tests** (`ci-api-tests.yml`) | **Manual only** (Actions → Run workflow) | Postgres + seed + `npm test` — optional deeper checks |
| **Deploy EC2** (`deploy-ec2.yml`) | **Manual only** | Deploy to EC2 (requires `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`) |

Push-triggered deploy was removed so missing EC2 secrets do not mark every commit as failed.

**Repository paths**

- `.github/workflows/ci.yml`
- `.github/workflows/ci-api-tests.yml`
- `.github/workflows/deploy-ec2.yml`
- `deploy/ecosystem.config.cjs` — PM2 (`entangle`)
- `deploy/nginx-entangle.conf.example` — optional reverse proxy
