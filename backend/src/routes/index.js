const express = require('express');
const { auth, optionalAuth, requireAdmin } = require('../middleware/auth');
const authController = require('../controllers/authController');
const dashboard = require('../controllers/dashboardController');
const companies = require('../controllers/companiesController');
const reviews = require('../controllers/reviewsController');
const users = require('../controllers/usersController');
const roles = require('../controllers/rolesController');
const reports = require('../controllers/reportsController');

const router = express.Router();

// ----- Auth (public) -----
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/login-admin', authController.loginAdmin);

// ----- Dashboard (admin) -----
router.get('/dashboard/stats', auth, requireAdmin, dashboard.stats);

// ----- Roles (public read) -----
router.get('/roles', roles.list);
router.get('/roles/:id', roles.getById);

// ----- Companies -----
router.get('/companies', optionalAuth, companies.list);
router.get('/companies/summary', companies.summary);
router.get('/companies/:companyId/reviews', reviews.listByCompany);
router.get('/companies/:id', optionalAuth, companies.getById);
router.post('/companies', auth, requireAdmin, companies.create);
router.patch('/companies/:id', auth, requireAdmin, companies.update);
router.delete('/companies/:id', auth, requireAdmin, companies.remove);

// ----- Reviews -----
router.get('/reviews', auth, requireAdmin, reviews.list);
router.get('/reviews/:id', reviews.getById);
router.post('/reviews', auth, reviews.create);
router.patch('/reviews/:id', auth, reviews.update);
router.delete('/reviews/:id', auth, reviews.remove);
router.post('/reviews/:id/helpful', reviews.helpful);

// ----- Reports (admin) -----
router.get('/reports', auth, requireAdmin, reports.list);
router.get('/reports/:id', auth, requireAdmin, reports.getById);
router.patch('/reports/:id', auth, requireAdmin, reports.update);

// ----- Users -----
router.get('/users/me', auth, users.getMe);
router.patch('/users/me', auth, users.updateMe);
router.get('/users', auth, requireAdmin, users.list);
router.get('/users/:id', auth, requireAdmin, users.getById);
router.patch('/users/:id', auth, requireAdmin, users.update);

module.exports = router;
