# Run the GitHub → EC2 pipeline on your instance

I cannot log into your AWS account or EC2 from here. Follow these steps once; after that, **Deploy EC2** in GitHub Actions updates the app.

## 1. On EC2 (SSH as `ec2-user`)

Copy this repo’s `deploy/ec2-setup-amazon-linux.sh` to the server, or paste its contents, then:

```bash
chmod +x ec2-setup-amazon-linux.sh
./ec2-setup-amazon-linux.sh
```

Complete **`pm2 startup`** using the `sudo` command it prints, then:

```bash
pm2 save
```

Create **`~/Entangle/server/.env`** with at least:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT` (e.g. `8000`)
- `CORS_ORIGINS` (your admin + client URLs, comma-separated)
- `FRONTEND_URL`

## 2. Deploy SSH key

On your PC you should have **`entangle-deploy`** (private) and **`entangle-deploy.pub`** (public).

Append the **one line** from `.pub` to:

`~/.ssh/authorized_keys` on EC2 for **`ec2-user`**

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys   # paste public key line
chmod 600 ~/.ssh/authorized_keys
```

Test from your PC:

```bash
ssh -i path/to/entangle-deploy ec2-user@YOUR_PUBLIC_IP
```

## 3. Security group

Allow **TCP 22** from your IP and/or from ranges GitHub Actions uses (or temporarily `0.0.0.0/0` while testing—tighten later).

## 4. GitHub repository secrets

**Settings → Secrets and variables → Actions**

| Secret | Example |
|--------|---------|
| `EC2_HOST` | Public IPv4 of the instance |
| `EC2_USER` | `ec2-user` |
| `EC2_SSH_KEY` | Full private key file (`entangle-deploy`), including BEGIN/END lines |

Optional:

| Secret | Use |
|--------|-----|
| `VITE_API_URL` | Public API URL for built SPAs (e.g. `https://api.yourdomain.com`) |
| `EC2_DEPLOY_PATH` | Only if not using `~/Entangle` (e.g. `/home/ec2-user/Entangle`) |

## 5. Run the pipeline

**Actions → Deploy EC2 → Run workflow** (branch `master`).

On EC2 after a good run:

```bash
pm2 status
pm2 logs entangle
```

## 6. Static sites (client + admin)

The workflow drops **`client-dist`** and **`admin-dist`** under `~/Entangle/`. Point **nginx** (or ALB) at those folders and proxy **`/api`** to `http://127.0.0.1:YOUR_PORT`. See `nginx-entangle.conf.example`.

## 7. Schema changes

Deploy only runs **`prisma generate`**. When you change the Prisma schema, SSH in and run:

```bash
cd ~/Entangle/server && npx prisma db push
```

(Or migrations when you adopt them.)
