const reviews = require('../controllers/reviewsController');

// ----- Companies -----
router.get('/companies/:companyId/reviews', reviews.listByCompany);


// ----- Reviews -----
router.get('/reviews', auth, requireAdmin, reviews.list);
router.get('/reviews/:id', reviews.getById);
router.post('/reviews', auth, reviews.create);
router.patch('/reviews/:id', auth, reviews.update);
router.delete('/reviews/:id', auth, reviews.remove);
router.post('/reviews/:id/helpful', reviews.helpful);