const Car = require("../models/Car");

// ==============================
// GET ALL CARS
// ==============================
const getCars = async (req, res) => {
  try {
    // Récupérer toutes les voitures
    const cars = await Car.find();

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// CREATE CAR
// ==============================
const createCar = async (req, res) => {
  try {
    // Récupérer données
    const {
      brand,
      model,
      pricePerDay,
      image,
    } = req.body;

    // Créer voiture
    const car = await Car.create({
      brand,
      model,
      pricePerDay,
      image,
    });

    res.status(201).json({
      message: "Voiture ajoutée avec succès",
      car,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// UPDATE CAR
// ==============================
const updateCar = async (req, res) => {
  try {
    // Récupérer ID
    const carId = req.params.id;

    // Modifier voiture
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Voiture modifiée",
      updatedCar,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// DELETE CAR
// ==============================
const deleteCar = async (req, res) => {
  try {
    // Chercher voiture
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Voiture non trouvée",
      });
    }

    // Supprimer voiture
    await car.deleteOne();

    res.status(200).json({
      message: "Voiture supprimée",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCars,
  createCar,
  updateCar,
  deleteCar,
};