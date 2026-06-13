import { Link } from "react-router-dom";

function BookCard({ book }) {
  const shortDescription =
    book.description.length > 110
      ? `${book.description.slice(0, 110)}...`
      : book.description;

  return (
    <article className="book-card">
      <div className="book-card-top">
        <p className="card-category">{book.category}</p>
        <span className="book-rating">{book.rating}/5</span>
      </div>

      <h3>{book.title}</h3>

      <p className="book-author">by {book.author}</p>

      <p className="book-preview">{shortDescription}</p>

      <div className="card-footer">
        <span>{book.publishedYear}</span>

        <Link to={`/books/${book._id}`} className="book-link">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default BookCard;