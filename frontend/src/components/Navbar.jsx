import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>AutoRent</h2>

      <div>
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/reservations">Reservations</Link>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;