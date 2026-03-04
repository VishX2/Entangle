require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { prisma } = require('./lib/prisma');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'entangle-api' }));

app.use('/api', routes);
app.use('/', routes);

app.use(errorHandler);

async function start() {
  try {
    await prisma.$connect();
    console.log('PostgreSQL connected (Prisma)');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`Entangle API: http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
