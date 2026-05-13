import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

function Reservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      // récupérer token
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/reservations/my-reservations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReservations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Mes Réservations</h2>

        {reservations.map((reservation) => (
          <div
            key={reservation._id}
            className="reservation-card"
          >
            <h3>
              {reservation.car.brand}
              {" "}
              {reservation.car.model}
            </h3>

            <p>
              Début :
              {" "}
              {reservation.startDate}
            </p>

            <p>
              Fin :
              {" "}
              {reservation.endDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservations;