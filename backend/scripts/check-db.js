#!/usr/bin/env node
/**
 * Quick DB connection check. Run: node scripts/check-db.js
 * Ensure .env has correct DATABASE_URL first.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { prisma } = require('../src/lib/prisma');

async function main() {
  try {
    await prisma.$connect();
    console.log('OK: Database connected.');
    const count = await prisma.role.count();
    console.log('Roles in DB:', count);
    process.exit(0);
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
