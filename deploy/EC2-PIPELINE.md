# GitHub Actions to EC2 — Entangle server as root

Your Entangle API runs on EC2 as **root** under **`/root/Entangle`**. Workflow **Deploy EC2** targets that path when you set the secrets below.

## GitHub secrets (root server)

- **EC2_HOST** — public IP or DNS of the instance  
- **EC2_USER** — **`root`**  
- **EC2_SSH_KEY** — **private** key only (the file you use with `ssh -i`, e.g. `entangle-deploy` or `standard-key.pem`). Full `-----BEGIN … PRIVATE KEY-----` … `-----END …` with **real line breaks**. Do **not** paste the `.pub` line (`ssh-ed25519` / `ssh-rsa`). The workflow writes this to a file and uses `key_path` for SCP (Docker cannot reliably pass multiline keys via `key:`).  
- **EC2_SSH_KEY_B64** — optional **alternative** to `EC2_SSH_KEY`: one line, no line breaks. On Linux/WSL: `base64 -w0 < entangle-deploy` and paste the output into this secret (leave `EC2_SSH_KEY` empty or delete it to avoid confusion). Use this if Actions keeps mangling multiline secrets.  
- **EC2_SSH_PASSPHRASE** — only if that private key is **encrypted**; must match the key you put in `EC2_SSH_KEY` / `EC2_SSH_KEY_B64`.  

### If SCP logs `getKeyFile error: ssh: no key found`

That means **the file was read** but **the bytes are not a valid SSH private key** (or passphrase is wrong). Check in order:

1. **Same key as on the server** — the **public** line from **this** private key must be in **`~/.ssh/authorized_keys`** for **`EC2_USER`** (`root` → `/root/.ssh/authorized_keys`).  
2. **Full key** — not truncated; first line `BEGIN…PRIVATE KEY`, last line `END…PRIVATE KEY`. Re-paste the secret from the `.pem` file on disk.  
3. **Private vs public** — `.pub` is one line starting with `ssh-…`; private key is many lines.  
4. **Passphrase** — if `ssh-keygen` asked for a passphrase when you created the key, set **EC2_SSH_PASSPHRASE** to that exact passphrase.  
5. **Prove it locally** — `ssh -i /path/to/same-private-key EC2_USER@EC2_HOST` must work **without** password; if it does not, fix the server key setup before CI.  
6. **Try `EC2_SSH_KEY_B64`** — avoids GitHub’s multiline secret quirks.  
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
