function Hero() {
  return (
    <header className="hero">
      <div className="hero-content">
        <p className="hero-tag">Book reviews for thoughtful readers</p>

        <h1>Find Your Next Meaningful Read</h1>

        <p className="hero-description">
          Browse selected books, read simple reader reviews, and share your own
          thoughts in a calm reading space.
        </p>

        <div className="hero-actions">
          <a href="#books" className="primary-btn">
            Explore Books
          </a>
          <a href="#reviews" className="secondary-btn">
            Read Reviews
          </a>
        </div>
      </div>

      <div className="hero-panel">
        <p className="panel-label">Featured Pick</p>
        <h3>Atomic Habits</h3>
        <p>
          A practical guide to building better habits through small daily
          improvements.
        </p>
        <span>4.8 rating</span>
      </div>
    </header>
  );
}

export default Hero;