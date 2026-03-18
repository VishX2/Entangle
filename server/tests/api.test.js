/**
 * API integration tests (Supertest)
 * Run: npm test (from server directory)
 * Requires: DATABASE_URL and JWT_SECRET in .env
 * Requires: Seeded DB (npm run seed) for auth/connection tests
 */
const { describe, it } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { app } = require('../src/index');
const { getAuthToken, getAdminToken } = require('./helpers');

describe('API', () => {
  describe('GET /health', () => {
    it('returns 200 and ok status', async () => {
      const res = await request(app).get('/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, 'ok');
      assert.strictEqual(res.body.service, 'entangle-api');
    });
  });

  describe('Auth', () => {
    it('POST /api/auth/register - rejects invalid email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'invalid', password: 'password123', first_name: 'Test' });
      assert.strictEqual(res.status, 400);
      assert.ok(res.body.error);
    });

    it('POST /api/auth/register - rejects short password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: '123', first_name: 'Test' });
      assert.strictEqual(res.status, 400);
      assert.ok(res.body.error && res.body.error.length > 0);
    });

    it('POST /api/auth/login - rejects invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'wrong' });
      assert.strictEqual(res.status, 401);
    });

    it('POST /api/auth/login - succeeds with demo user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'investor@demo.com', password: 'Test123!' });
      assert.strictEqual(res.status, 200);
      assert.ok(res.body.token);
      assert.ok(res.body.user);
      assert.strictEqual(res.body.user.email, 'investor@demo.com');
    });

    it('POST /api/auth/register - creates user and returns token', async () => {
      const email = `test-${Date.now()}@example.com`;
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email,
          password: 'Password123!',
          first_name: 'Test',
          last_name: 'User',
        });
      assert.strictEqual(res.status, 201);
      assert.ok(res.body.token);
      assert.ok(res.body.user);
      assert.strictEqual(res.body.user.email, email);
    });
  });

  describe('Companies', () => {
    it('GET /api/companies - returns list', async () => {
      const res = await request(app).get('/api/companies');
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.body));
    });

    it('GET /api/companies?type=investor - filters by type', async () => {
      const res = await request(app).get('/api/companies?type=investor');
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.body));
      res.body.forEach((c) => assert.strictEqual(c.company_type, 'investor'));
    });

    it('GET /api/companies/:id - returns company by id', async () => {
      const listRes = await request(app).get('/api/companies');
      assert.strictEqual(listRes.status, 200);
      if (listRes.body.length > 0) {
        const id = listRes.body[0].id;
        const res = await request(app).get(`/api/companies/${id}`);
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.id, id);
      }
    });
  });

  describe('Connection Requests', () => {
    it('POST /api/connection-requests - requires auth', async () => {
      const res = await request(app)
        .post('/api/connection-requests')
        .send({ to_company_id: 1 });
      assert.strictEqual(res.status, 401);
    });

    it('GET /api/connection-requests/sent - requires auth', async () => {
      const res = await request(app).get('/api/connection-requests/sent');
      assert.strictEqual(res.status, 401);
    });

    it('POST /api/connection-requests - rejects missing to_company_id', async () => {
      const token = await getAuthToken('investor@demo.com', 'Test123!');
      if (!token) return; // skip if demo user not seeded
      const res = await request(app)
        .post('/api/connection-requests')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      assert.strictEqual(res.status, 400);
      assert.ok(res.body.error?.includes('to_company_id'));
    });

    it('GET /api/connection-requests/sent - returns list when authenticated', async () => {
      const token = await getAuthToken('investor@demo.com', 'Test123!');
      if (!token) return;
      const res = await request(app)
        .get('/api/connection-requests/sent')
        .set('Authorization', `Bearer ${token}`);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.body));
    });
  });

  describe('Roles', () => {
    it('GET /api/roles - returns roles', async () => {
      const res = await request(app).get('/api/roles');
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.body));
    });
  });
});
