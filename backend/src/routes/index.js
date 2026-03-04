const express = require('express');
const router = express.Router();

const reviews = require('../controllers/reviewsController');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

// ----- Companies -----
router.get('/companies/:companyId/reviews', reviews.listByCompany);

// ----- Reviews -----
router.get('/reviews', auth, requireAdmin, reviews.list);
router.get('/reviews/:id', reviews.getById);
router.post('/reviews', auth, reviews.create);
router.patch('/reviews/:id', auth, reviews.update);
router.delete('/reviews/:id', auth, reviews.remove);
router.post('/reviews/:id/helpful', reviews.helpful);

module.exports = router;