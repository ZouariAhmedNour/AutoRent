import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import Loader from "../components/Loader";

import CarCard from "../components/CarCard";

function Cars() {
  const [cars, setCars] = useState([]);

  const [loading, setLoading] = useState(true);

  // récupérer voitures
  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");

      setCars(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  // charger voitures au démarrage
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Nos Voitures</h2>

           {/* afficher loader */}
        {loading ? (
          <Loader />
        ) : (
          <div className="cars-grid">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export default Cars;