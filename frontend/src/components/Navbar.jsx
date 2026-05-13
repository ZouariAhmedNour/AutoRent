import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  // récupérer utilisateur connecté
  const user = localStorage.getItem("user");

  const navigate = useNavigate();

  // fonction logout
  const handleLogout = () => {
    // supprimer token
    localStorage.removeItem("token");

    // supprimer user
    localStorage.removeItem("user");

    // redirection login
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>AutoRent</h2>

      <div>
        {/* si utilisateur connecté */}
        {user ? (
          <>
            <Link to="/">Home</Link>

            <Link to="/cars">Cars</Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;