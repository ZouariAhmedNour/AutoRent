import Navbar from "../components/Navbar";

function AdminDashboard() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>Dashboard Admin</h1>

        <p>
          Gestion des voitures et réservations.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;