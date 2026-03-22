# GitHub Actions to EC2 — Entangle server as root

Your Entangle API runs on EC2 as **root** under **`/root/Entangle`**. Workflow **Deploy EC2** targets that path when you set the secrets below.

## GitHub secrets (root server)

- **EC2_HOST** — public IP or DNS of the instance  
- **EC2_USER** — **`root`**  
- **EC2_SSH_KEY** — full private key PEM (matches a key in `/root/.ssh/authorized_keys`)  
- **EC2_DEPLOY_PATH** — leave **unset** (uses `$HOME/Entangle` → `/root/Entangle`)  
- **VITE_API_URL** — optional, public API URL for client/admin builds  

## What the pipeline does

Uploads `deploy.tar.gz` → extracts to **`/root/Entangle`** → `npm ci` in **`/root/Entangle/server`** → `prisma generate` → **`pm2 startOrReload`** for app name **`entangle`**.

## One-time on EC2 (as root)

```bash
sudo su -
```

Run **`deploy/ec2-setup-amazon-linux.sh`** (creates **`/root/Entangle/server`**, installs Node 24 + PM2). Complete **`pm2 startup`**, then **`pm2 save`**.

Add **`/root/Entangle/server/.env`** (`DATABASE_URL`, `JWT_SECRET`, `PORT`, `CORS_ORIGINS`, `FRONTEND_URL`, …).

Put the deploy **public** key in **`/root/.ssh/authorized_keys`**. Ensure **`sshd`** allows root key login (`PermitRootLogin prohibit-password` or `yes`), then **`systemctl reload sshd`**.

## Test SSH from your PC

```text
ssh -i path/to/entangle-deploy root@YOUR_PUBLIC_IP
```

## Run deploy

GitHub → **Actions** → **Deploy EC2** → **Run workflow**.

On server: **`pm2 status`**, **`pm2 logs entangle`**.

## Nginx

Point `root` at **`/root/Entangle/client-dist`** and **`/root/Entangle/admin-dist`** (see **`nginx-entangle.conf.example`**).

## Prisma schema changes

```bash
cd /root/Entangle/server && npx prisma db push
```

## ec2-user instead

Use **EC2_USER=ec2-user** and leave **EC2_DEPLOY_PATH** unset → **`/home/ec2-user/Entangle`**.
