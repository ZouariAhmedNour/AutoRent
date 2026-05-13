import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>AutoRent</h2>

      <div>
        <Link to="/">Home</Link>

        <Link to="/cars">Cars</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;