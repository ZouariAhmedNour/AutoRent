import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Reservations() {
  const [reservations, setReservations] = useState([]);

  // Calculer le nombre de jours entre deux dates
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // minimum 1 jour
    return diffDays > 0 ? diffDays : 1;
  };

  // Récupérer les réservations de l'utilisateur connecté
  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/reservations/my-reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Payer une réservation
  const handlePay = async (reservation) => {
    try {
      const token = localStorage.getItem("token");

      // Calcul du montant total
      const days = calculateDays(reservation.startDate, reservation.endDate);
      const amount = days * reservation.car.pricePerDay;

      await API.post(
        "/payments",
        {
          reservation: reservation._id,
          amount,
          method: "Carte",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Paiement effectué avec succès");

      // Recharger les réservations
      fetchReservations();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Erreur lors du paiement");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Mes Réservations</h2>

        {reservations.length === 0 ? (
          <p>Aucune réservation trouvée.</p>
        ) : (
          reservations.map((reservation) => {
            const days = calculateDays(
              reservation.startDate,
              reservation.endDate
            );
            const amount = days * reservation.car.pricePerDay;

            return (
              <div key={reservation._id} className="reservation-card">
                <h3>
                  {reservation.car.brand} {reservation.car.model}
                </h3>

                <p>
                  Début : {new Date(reservation.startDate).toLocaleDateString()}
                </p>

                <p>
                  Fin : {new Date(reservation.endDate).toLocaleDateString()}
                </p>

                <p>Jours : {days}</p>

                <p>Montant : {amount} DT</p>

                <p>
                  Statut paiement :{" "}
                  <strong>{reservation.paymentStatus}</strong>
                </p>

                {reservation.paymentStatus === "Non payé" ? (
                  <button onClick={() => handlePay(reservation)}>
                    Payer
                  </button>
                ) : (
                  <p className="paid-text">Déjà payé</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Reservations;