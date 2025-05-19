const Book = require('../models/Book');
const Review = require('../models/Review');

// POST /books
exports.addBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  try {
    const book = new Book({ title, author, genre, description, createdBy: req.user });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /books
exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = new RegExp(genre, 'i');
  try {
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /books/:id
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const reviews = await Review.find({ book: id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const avg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    res.json({ book, averageRating: avg[0]?.avgRating || 0, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};