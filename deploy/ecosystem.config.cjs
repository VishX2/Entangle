/**
 * PM2 — process name "entangle" (match: pm2 startOrReload ... --only entangle)
 * Lives next to server/, client-dist/, admin-dist/ after deploy (e.g. ~/Entangle/ecosystem.config.cjs)
 */
const path = require("path");
const serverDir = path.join(__dirname, "server");

module.exports = {
  apps: [
    {
      name: "entangle",
      cwd: serverDir,
      script: "src/index.js",
      instances: 1,
      exec_mode: "fork",
      env: { NODE_ENV: "production" },
    },
  ],
};
