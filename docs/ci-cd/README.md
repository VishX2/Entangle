# Entangle — CI/CD documentation

This folder records the **continuous integration and deployment** setup for the Entangle monorepo (server, client, admin) targeting **AWS EC2 (Amazon Linux)** with **GitHub Actions** and **PM2**.

| Document | Description |
|----------|-------------|
| [entangle-cicd-deliverable.md](./entangle-cicd-deliverable.md) | Full deliverable: scope, artifacts, workflows, secrets, EC2, runbook |

**Repository artifacts (code)**

- `.github/workflows/ci.yml` — CI on push/PR
- `.github/workflows/deploy-ec2.yml` — deploy to EC2
- `deploy/ecosystem.config.cjs` — PM2 (`entangle`)
- `deploy/nginx-entangle.conf.example` — optional reverse proxy
- `deploy/SETUP-EC2.txt` — operator setup (plain text)

---

*Status: documented as implemented; apply secrets and EC2 one-time setup per deliverable.*
