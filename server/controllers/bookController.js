const Book = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books",
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch book",
    });
  }
};

const addReview = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({
        message: "All review fields are required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters",
      });
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    if (comment.trim().length < 10) {
      return res.status(400).json({
        message: "Review must be at least 10 characters",
      });
    }

    const newReview = {
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    };

    book.reviews.push(newReview);

    const updatedBook = await book.save();

    res.status(201).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add review",
    });
  }
};

module.exports = {
  getBooks,
  getBookById,
  addReview,
};