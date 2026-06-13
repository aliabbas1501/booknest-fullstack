import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/books/${id}`
        );

        if (!response.ok) {
          throw new Error("Book not found");
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    setFormMessage("");

    if (name.trim().length < 2) {
      setFormMessage("Name must be at least 2 characters.");
      return;
    }

    if (!rating || Number(rating) < 1 || Number(rating) > 5) {
      setFormMessage("Rating must be between 1 and 5.");
      return;
    }

    if (comment.trim().length < 10) {
      setFormMessage("Review must be at least 10 characters.");
      return;
    }

    const reviewData = {
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    };

    try {
      setSubmitting(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/books/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      setBook(data);
      setName("");
      setRating("");
      setComment("");
      setFormMessage("Review submitted successfully.");
    } catch (error) {
      setFormMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="loading">Loading book...</p>;
  }

  if (error) {
    return (
      <section className="details-section">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <p className="error-message">{error}</p>
      </section>
    );
  }

  return (
    <section className="details-section">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="details-card">
        <p className="book-category">{book.category}</p>

        <h1>{book.title}</h1>

        <div className="book-meta">
          <span>Author: {book.author}</span>
          <span>Published: {book.publishedYear}</span>
          <span>Rating: {book.rating}</span>
        </div>

        <p className="details-text">{book.description}</p>
      </div>

      <div className="review-form-section">
        <h2>Add Your Review</h2>

        {formMessage && <p className="form-message">{formMessage}</p>}

        <form className="review-form" onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Rating out of 5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />

          <textarea
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      <div className="reviews-section">
        <h2>Reader Reviews</h2>

        {book.reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review.</p>
        ) : (
          book.reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <div className="review-header">
                <h3>{review.name}</h3>
                <span>{review.rating}/5</span>
              </div>

              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default BookDetails;