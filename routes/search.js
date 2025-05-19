const router = require('express').Router();
const { searchBooks } = require('../controllers/searchController');

router.get('/', searchBooks);
module.exports = router;