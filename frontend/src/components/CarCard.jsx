function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.brand} />

      <h3>
        {car.brand} {car.model}
      </h3>

      <p>{car.pricePerDay} DT / jour</p>

      <button>Réserver</button>
    </div>
  );
}

export default CarCard;