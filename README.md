# Entangle

Monorepo for the Entangle platform:

| Package | Stack | Role |
|---------|--------|------|
| **`server/`** | Express.js, Prisma, PostgreSQL | REST API, auth, companies, messaging, admin APIs, background jobs |
| **`client/`** | Vite, React | Main web app for users |
| **`admin/`** | Vite, React | Admin dashboard |

**Production:** API on **AWS EC2** (Amazon Linux, **PM2**, **Node 24**). PostgreSQL runs **on the same EC2 instance** (cost control). Frontends are often hosted separately (**Vercel**, **AWS Amplify**, etc.). Media may use **ImageKit**. Email: **SendGrid**. **Cloudflare Tunnel (cloudflared)** on EC2 serves **HTTPS** to users without exposing a raw HTTP API on the public internet.

---

## Prerequisites

- **Node.js** ≥ 18 (24 for production EC2)
- **PostgreSQL** (local for dev; on EC2 for current production layout)
- **npm**
- **Git**

---

## Repository layout

```
Entangle/
├── server/          # API — see server/README.md for deep detail
├── client/          # Vite + React (user app)
├── admin/           # Vite + React (admin)
├── deploy/          # PM2 ecosystem, EC2 bootstrap script, nginx example, EC2-PIPELINE.md
└── .github/workflows/
    ├── ci.yml              # CI on push/PR
    ├── ci-api-tests.yml    # Manual integration tests
    └── deploy-ec2.yml      # Manual deploy to EC2
```

---

## Local development

### Server

```bash
cd server
npm ci
cp .env.example .env   # edit DATABASE_URL, JWT_SECRET, PORT, etc.
npx prisma db push
npm run seed           # optional: admin user + sample data
npm run dev            # nodemon
```

See **`server/README.md`** for env variables, scripts, and API overview.

### Client

```bash
cd client
npm ci
npm run dev
```

Point the client at your API (e.g. `VITE_*` env vars as configured in the project).

### Admin

```bash
cd admin
npm ci
npm run dev
```

---

## High-level architecture

- **VPC** with a **public subnet** containing **one EC2** instance: **Node API (PM2)**, **PostgreSQL** on **localhost**, **cloudflared** for **Cloudflare Tunnel** (users → **HTTPS** → tunnel → app).
- **Private subnet(s)** are **empty** today — reserved for **future RDS** or other private tiers.
- **Internet Gateway** + **route tables**: public subnet uses **0.0.0.0/0 → IGW** for internet reachability (SSH deploy, outbound updates, tunnel).
- **Security groups**: firewall on the instance (e.g. SSH from known sources; avoid exposing Postgres to `0.0.0.0/0`).
- **CI** does not change this topology; **Deploy EC2** pushes new application bits onto the existing instance.

ASCII sketch:

```
[ Client ] ──HTTPS──► [ Cloudflare ] ──tunnel──► [ EC2: PM2 + API + Postgres ]
     │                                                      │
     ├──► [ Amplify / Vercel: React apps ]                  ├──► [ ImageKit, SendGrid, … ]
     └──► [ ImageKit CDN ]
```

---

## EC2 production setup (summary)

Default layout: **`EC2_USER=root`**, app path **`/root/Entangle`**.

1. **Bootstrap (once):** as root, run **`deploy/ec2-setup-amazon-linux.sh`** (Node 24, PM2, directories). Run **`pm2 startup`** then **`pm2 save`** as instructed.
2. **Secrets on the server:** create **`/root/Entangle/server/.env`** (`DATABASE_URL`, `JWT_SECRET`, `PORT`, `CORS_ORIGINS`, `FRONTEND_URL`, …). Never commit `.env`.
3. **Deploy SSH key:** add the **public** key for your GitHub deploy key to **`/root/.ssh/authorized_keys`**. **`PermitRootLogin`** / **`PubkeyAuthentication`** must allow key login.
4. **Prisma on server after schema changes:** `cd /root/Entangle/server && npx prisma db push` (or your migration flow).

More detail: **`deploy/EC2-PIPELINE.md`**.

---

## CI/CD and GitHub Actions

### Workflows

| Workflow | When | What it does |
|----------|------|----------------|
| **CI** (`.github/workflows/ci.yml`) | Push/PR to `main`, `master`, `develop` | `npm ci` in **server**, Prisma validate; build **client** and **admin**. No deploy. |
| **CI API tests** (`ci-api-tests.yml`) | **Manual** only | Postgres service + seed + `npm test` in server. |
| **Deploy EC2** (`deploy-ec2.yml`) | **Manual** only | Build on GitHub → tarball → SCP to EC2 → extract under `$HOME/Entangle` → `npm ci --omit=dev` → `prisma generate` → **PM2** restart app **`entangle`**. |

Push-triggered deploy is **not** enabled so missing EC2 secrets do not fail every commit.

### How to run **Deploy EC2**

1. Repo → **Settings → Secrets and variables → Actions** → set **repository secrets** (see below).
2. **Actions** → **Deploy EC2** → **Run workflow** → choose branch (e.g. `master`).

### Required repository secrets

| Secret | Description |
|--------|-------------|
| `EC2_HOST` | Public IP or DNS of the instance (must be reachable from GitHub). |
| `EC2_USER` | e.g. **`root`** for `/root/Entangle`. |
| `EC2_SSH_KEY` | Full **private** key (multiline PEM). Workflow writes it to a file for SCP/SSH. |

Optional: `VITE_API_URL` (baked into client/admin at build time), `EC2_DEPLOY_PATH`, `EC2_SSH_KEY_B64` (single-line base64 key), `EC2_SSH_PASSPHRASE` (if key is encrypted).

**Troubleshooting SSH:** from your PC, `ssh -i <private-key> <EC2_USER>@<EC2_HOST>` must succeed before Actions will. On Windows, lock down key ACLs: `icacls <keyfile> /inheritance:r` then `icacls <keyfile> /grant:r "%USERNAME%:F"`.

### What runs on EC2 after deploy

- **`/root/Entangle/server`** — production `node_modules` from `npm ci --omit=dev`
- **`/root/Entangle/client-dist`** and **`admin-dist`** — static builds from the workflow
- **`deploy/ecosystem.config.cjs`** at repo root on server — PM2 runs **`node`** on **`server/src/index.js`** (not `nodemon`)

Related files: **`deploy/ecosystem.config.cjs`**, **`deploy/nginx-entangle.conf.example`**, **`deploy/ec2-setup-amazon-linux.sh`**.

---

## Further reading

- **`server/README.md`** — API, env, Prisma, scripts, testing  
- **`deploy/EC2-PIPELINE.md`** — EC2 secrets, SSH, nginx, Prisma on server  
