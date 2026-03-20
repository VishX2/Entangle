const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const { prisma } = require('./lib/prisma');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Trust proxy when behind Amplify/nginx - use X-Forwarded-* headers
app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || config.corsOrigins.includes(origin)) return cb(null, true);
    cb(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'entangle-api' }));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authLimiter);
app.use('/api', routes);

app.use(errorHandler);

async function start() {
  try {
    await prisma.$connect();
    console.log('PostgreSQL connected (Prisma)');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  app.listen(config.port, () => console.log(`Entangle API: http://localhost:${config.port}`));
}

if (require.main === module) {
  start().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { app };
