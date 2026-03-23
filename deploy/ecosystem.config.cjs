/**
 * PM2 — process name "entangle" (match: pm2 startOrReload ... --only entangle)
 * Lives next to server/, client-dist/, admin-dist/ after deploy (e.g. ~/Entangle/ecosystem.config.cjs)
 */
const path = require("path");
const serverDir = path.join(__dirname, "server");
// Absolute path so PM2 always runs `node …/index.js`, never a stale `npm run dev` / nodemon.
const entry = path.join(serverDir, "src", "index.js");

module.exports = {
  apps: [
    {
      name: "entangle",
      cwd: serverDir,
      script: entry,
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      env: { NODE_ENV: "production" },
    },
  ],
};
