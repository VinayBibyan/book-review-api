const Review = require('../models/Review');

// POST /books/:id/reviews
exports.addReview = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user;
  const { rating, comment } = req.body;
  try {
    const exists = await Review.findOne({ book: bookId, user: userId });
    if (exists) return res.status(400).json({ message: 'Review already exists' });
    const review = new Review({ book: bookId, user: userId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /reviews/:id
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    let review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user) return res.status(403).json({ message: 'Not allowed' });
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /reviews/:id
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user) return res.status(403).json({ message: 'Not allowed' });
    await review.remove();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};