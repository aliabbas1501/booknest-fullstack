import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import BookCard from "../components/BookCard";

function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const booksPerPage = 3;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/books`,
        );

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchText = searchTerm.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.category.toLowerCase().includes(searchText)
    );
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  const visibleBooks = filteredBooks.slice(startIndex, endIndex);

  const allReviews = books.flatMap((book) =>
    book.reviews.map((review) => ({
      ...review,
      bookTitle: book.title,
    })),
  );

  const featuredReviews = allReviews.slice(0, 3);

  return (
    <div id="top">
      <Hero />

      <section className="books-section" id="books">
        <div className="section-header">
          <p>Curated Collection</p>
          <h2>Books Worth Reading</h2>
          <span>
            Search through selected books by title, author, or category.
          </span>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search books, authors, or categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {loading && <p className="loading">Loading books...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && filteredBooks.length === 0 && (
          <p className="no-reviews">No books matched your search.</p>
        )}

        {!loading && !error && filteredBooks.length > 0 && (
          <>
            <div className="books-summary">
              <span>
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredBooks.length)} of{" "}
                {filteredBooks.length} books
              </span>
            </div>

            <div className="books-grid">
              {visibleBooks.map((book) => (
                <BookCard book={book} key={book._id} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((page) => page - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((page) => page + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="home-reviews-section" id="reviews">
        <div className="section-header">
          <p>Reader Voices</p>
          <h2>What Readers Are Saying</h2>
          <span>
            A quick look at reviews shared by readers across the BookNest
            collection.
          </span>
        </div>

        <div className="home-reviews-grid">
          {featuredReviews.map((review) => (
            <div className="home-review-card" key={review._id}>
              <div className="review-header">
                <h3>{review.name}</h3>
                <span>{review.rating}/5</span>
              </div>

              <p>{review.comment}</p>

              <small>{review.bookTitle}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-content">
          <p className="about-label">About BookNest</p>

          <h2>A calm space for readers to discover and review books.</h2>

          <p>
            BookNest is a full stack book review website built with React,
            Node.js, Express, and MongoDB. Users can browse books, search by
            title or category, open book details, and submit reviews that are
            stored permanently in a real database.
          </p>
        </div>

        <div className="about-stats">
          <div>
            <strong>{books.length}</strong>
            <span>Books</span>
          </div>

          <div>
            <strong>MongoDB</strong>
            <span>Database</span>
          </div>

          <div>
            <strong>Full Stack</strong>
            <span>Project</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
