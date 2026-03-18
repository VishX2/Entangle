const express = require('express');
const { auth, optionalAuth, requireAdmin } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../validators/authValidators');
const { createCompanySchema, updateCompanySchema } = require('../validators/companyValidators');
const { createReviewSchema, updateReviewSchema } = require('../validators/reviewValidators');
const { updateReportSchema } = require('../validators/reportValidators');
const { createConnectionRequestSchema, updateConnectionRequestSchema } = require('../validators/connectionRequestValidators');
const authController = require('../controllers/authController');
const dashboard = require('../controllers/dashboardController');
const companies = require('../controllers/companiesController');
const reviews = require('../controllers/reviewsController');
const users = require('../controllers/usersController');
const roles = require('../controllers/rolesController');
const reports = require('../controllers/reportsController');
const matchmaking = require('../controllers/matchmakingController');
const connectionRequests = require('../controllers/connectionRequestController');
const documents = require('../controllers/documentsController');
const messages = require('../controllers/messagesController');
const notifications = require('../controllers/notificationsController');
const profileGuidance = require('../controllers/profileGuidanceController');
const contentScan = require('../controllers/contentScanController');
const { upload } = require('../middleware/upload');

const router = express.Router();

// ----- Auth (public) - validation + rate limit applied in index.js -----
router.post('/auth/register', validate(registerSchema), authController.register);
router.post('/auth/login', validate(loginSchema), authController.login);
router.post('/auth/login-admin', validate(loginSchema), authController.loginAdmin);
router.post('/auth/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/auth/reset-password', validate(resetPasswordSchema), authController.resetPassword);

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
router.post('/companies', auth, requireAdmin, validate(createCompanySchema), companies.create);
router.patch('/companies/:id', auth, requireAdmin, validate(updateCompanySchema), companies.update);
router.delete('/companies/:id', auth, requireAdmin, companies.remove);

// ----- Reviews -----
router.get('/reviews', auth, requireAdmin, reviews.list);
router.get('/reviews/:id', reviews.getById);
router.post('/reviews', auth, reviews.create);
router.patch('/reviews/:id', auth, reviews.update);
router.delete('/reviews/:id', auth, reviews.remove);
router.post('/reviews/:id/helpful', reviews.helpful);

// ----- Connection Requests -----
router.post('/connection-requests', auth, validate(createConnectionRequestSchema), connectionRequests.create);
router.get('/connection-requests/sent', auth, connectionRequests.listSent);
router.get('/connection-requests', auth, requireAdmin, connectionRequests.listAll);
router.patch('/connection-requests/:id', auth, requireAdmin, validate(updateConnectionRequestSchema), connectionRequests.updateStatus);

// ----- Reports (admin) -----
router.get('/reports', auth, requireAdmin, reports.list);
router.get('/reports/:id', auth, requireAdmin, reports.getById);
router.patch('/reports/:id', auth, requireAdmin, validate(updateReportSchema), reports.update);

// ----- AI Matchmaking -----
router.get('/matchmaking/investors-for-startup/:startupId', optionalAuth, matchmaking.investorsForStartup);
router.get('/matchmaking/startups-for-investor/:investorId', optionalAuth, matchmaking.startupsForInvestor);
router.get('/matchmaking/investors-for-entrepreneur/:entrepreneurId', optionalAuth, matchmaking.investorsForEntrepreneur);
router.get('/matchmaking/entrepreneurs-for-investor/:investorId', optionalAuth, matchmaking.entrepreneursForInvestor);
router.post('/matchmaking/search', optionalAuth, matchmaking.searchByPrompt);
router.get('/matchmaking/search', optionalAuth, matchmaking.searchByPrompt);

// ----- Documents (upload) -----
router.post('/documents/upload', auth, upload.single('file'), documents.upload);
router.post('/documents/upload-public', upload.single('file'), documents.uploadPublic);

// ----- Messaging -----
router.get('/conversations', auth, messages.listConversations);
router.post('/conversations', auth, messages.getOrCreateConversation);
router.get('/conversations/:conversationId/messages', auth, messages.listMessages);
router.post('/conversations/:conversationId/messages', auth, messages.sendMessage);

// ----- Notifications -----
router.get('/notifications', auth, notifications.list);
router.patch('/notifications/:id/read', auth, notifications.markRead);
router.patch('/notifications/read-all', auth, notifications.markAllRead);

// ----- Profile guidance (AI) -----
router.get('/profile/guidance', auth, profileGuidance.getGuidance);

// ----- Content scan (PII detection) -----
router.post('/content/scan', optionalAuth, contentScan.scanContent);

// ----- Users -----
router.get('/users/me', auth, users.getMe);
router.patch('/users/me', auth, users.updateMe);
router.get('/users', auth, requireAdmin, users.list);
router.get('/users/:id', auth, requireAdmin, users.getById);
router.patch('/users/:id', auth, requireAdmin, users.update);

module.exports = router;
