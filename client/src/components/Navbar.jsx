import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="logo"
        onClick={() => {
          setTimeout(() => {
            const topSection = document.getElementById("top");

            if (topSection) {
              topSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }}
      >
        BookNest
      </Link>

      <div className="nav-links">
        <button onClick={() => scrollToSection("top")}>Home</button>
        <button onClick={() => scrollToSection("books")}>Books</button>
        <button onClick={() => scrollToSection("reviews")}>Reviews</button>
        <button onClick={() => scrollToSection("about")}>About</button>
      </div>
    </nav>
  );
}

export default Navbar;