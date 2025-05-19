const router = require('express').Router();
const auth = require('../middleware/auth');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');

router.post('/books/:id/reviews', auth, addReview);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);
module.exports = router;