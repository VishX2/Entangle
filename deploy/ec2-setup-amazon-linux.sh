#!/usr/bin/env bash
# One-time EC2 prep for Entangle + GitHub Actions deploy (Amazon Linux 2023).
# Run as the SAME user GitHub Actions will SSH as.
#
# Entangle on EC2 as root (your setup):   sudo su -   then run this script → /root/Entangle
# As ec2-user:                            run as ec2-user → /home/ec2-user/Entangle
#
#   chmod +x ec2-setup-amazon-linux.sh && ./ec2-setup-amazon-linux.sh
#
set -euo pipefail

echo "==> Running as: $(whoami)  (HOME=$HOME → Entangle will use ${HOME}/Entangle)"

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

echo "==> Deploy directory (pipeline default: \$HOME/Entangle → ${HOME}/Entangle for this user)"
mkdir -p "${HOME}/Entangle/server"
touch "${HOME}/Entangle/server/.env.example"
echo "    Create ${HOME}/Entangle/server/.env with DATABASE_URL, JWT_SECRET, PORT, CORS_ORIGINS, FRONTEND_URL"

echo "==> PM2 startup on reboot"
echo "    Run the sudo command printed below, then: pm2 save"
pm2 startup || true

echo ""
echo "GitHub Actions secrets for root on this box:"
echo "  EC2_USER=root"
echo "  EC2_DEPLOY_PATH=   (leave empty — uses /root/Entangle)"
echo "  Add deploy public key to: ${HOME}/.ssh/authorized_keys"
