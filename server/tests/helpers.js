/**
 * Test helpers for API integration tests
 */
const request = require('supertest');
const { app } = require('../src/index');

/**
 * Get auth token by logging in. Uses seeded demo user or creates one.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string|null>}
 */
async function getAuthToken(email, password) {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password });
  return res.body?.token || null;
}

/**
 * Get admin auth token (uses ADMIN_EMAIL, ADMIN_PASSWORD from env)
 */
async function getAdminToken() {
  const email = process.env.ADMIN_EMAIL || 'admin@entangle.local';
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';
  const res = await request(app)
    .post('/api/auth/login-admin')
    .send({ email, password });
  return res.body?.token || null;
}

module.exports = { getAuthToken, getAdminToken };
