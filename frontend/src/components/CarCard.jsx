import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CarCard({ car }) {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Fonction pour créer une réservation
  const handleReserve = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Si l'utilisateur n'est pas connecté
      if (!token) {
        alert("Tu dois te connecter pour réserver.");
        navigate("/login");
        return;
      }

      // Vérifier les dates
      if (!startDate || !endDate) {
        alert("Choisis les dates de réservation.");
        return;
      }

      if (new Date(endDate) <= new Date(startDate)) {
        alert("La date de fin doit être après la date de début.");
        return;
      }

      setLoading(true);

      // Créer la réservation
      await API.post(
        "/reservations",
        {
          car: car._id,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Réservation créée avec succès. Tu peux payer depuis 'Mes Réservations'.");

      // Réinitialiser le formulaire
      setStartDate("");
      setEndDate("");
      setShowForm(false);

      // Aller vers la page réservations
      navigate("/reservations");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="car-card">
      <img src={car.image} alt={car.brand} />

      <h3>
        {car.brand} {car.model}
      </h3>

      <p>{car.pricePerDay} DT / jour</p>

      <p className={car.available ? "available" : "not-available"}>
        {car.available ? "Disponible" : "Non disponible"}
      </p>

      <button onClick={() => setShowForm(!showForm)}>
        Réserver
      </button>

      {showForm && (
        <form onSubmit={handleReserve} className="reserve-form">
          <label>Date début</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>Date fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Réservation..." : "Confirmer réservation"}
          </button>
        </form>
      )}
    </div>
  );
}

export default CarCard;