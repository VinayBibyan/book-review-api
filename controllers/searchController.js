const Book = require('../models/Book');

// GET /search
exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  try {
    const results = await Book.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { author: new RegExp(q, 'i') }
      ]
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};