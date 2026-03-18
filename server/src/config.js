/**
 * Server configuration - all env variables accessed via config
 */
require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT, 10) || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
    : ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
};

function validate() {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required env: ${key}`);
    }
  }
}

if (config.nodeEnv === 'production') {
  validate();
}

module.exports = config;
