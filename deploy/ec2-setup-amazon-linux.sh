#!/usr/bin/env bash
# One-time EC2 prep for Entangle + GitHub Actions deploy (Amazon Linux 2023).
# Run as the SAME Linux user GitHub will SSH as (recommended: ec2-user).
#
#   chmod +x ec2-setup-amazon-linux.sh && ./ec2-setup-amazon-linux.sh
#
set -euo pipefail

echo "==> Node.js 20 (NodeSource) + npm"
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v 2>/dev/null || true)" != v20* ]]; then
  curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
  sudo dnf install -y nodejs
else
  echo "    Node already present: $(node -v)"
fi

echo "==> PM2 (global)"
if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm install -g pm2
else
  echo "    pm2 already installed"
fi

echo "==> Deploy directory (GitHub default: \$HOME/Entangle)"
mkdir -p "${HOME}/Entangle/server"
touch "${HOME}/Entangle/server/.env.example"
echo "    Created ${HOME}/Entangle/server — add .env (copy from .env.example on your laptop, never commit)"

echo "==> PM2 startup on reboot"
echo "    Run the command printed below (it will start with sudo), then: pm2 save"
pm2 startup || true

echo ""
echo "Next steps:"
echo "  1. nano ${HOME}/Entangle/server/.env   # DATABASE_URL, JWT_SECRET, PORT, CORS_ORIGINS, FRONTEND_URL, ..."
echo "  2. Add deploy SSH public key to: ${HOME}/.ssh/authorized_keys"
echo "  3. Security group: TCP 22 allowed for GitHub Actions (or your IP for testing)"
echo "  4. GitHub repo → Settings → Secrets: EC2_HOST, EC2_USER, EC2_SSH_KEY (+ optional VITE_API_URL, EC2_DEPLOY_PATH)"
echo "  5. Actions → Deploy EC2 → Run workflow"
