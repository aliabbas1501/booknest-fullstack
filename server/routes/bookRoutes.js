const express = require("express");
const {
  getBooks,
  getBookById,
  addReview,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/:id/reviews", addReview);

module.exports = router;