const router = require('express').Router();
const auth = require('../middleware/auth');
const { addBook, getBooks, getBookById } = require('../controllers/bookController');

router.post('/', auth, addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
module.exports = router;