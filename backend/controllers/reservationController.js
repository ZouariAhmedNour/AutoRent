const Reservation = require("../models/Reservation");

// ==============================
// CREATE RESERVATION
// ==============================
const createReservation = async (req, res) => {
  try {
    // Récupérer données
    const {
      car,
      startDate,
      endDate,
    } = req.body;

    // Créer réservation
    const reservation = await Reservation.create({
      user: req.user.id,
      car,
      startDate,
      endDate,
    });

    res.status(201).json({
      message: "Réservation créée",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// GET USER RESERVATIONS
// ==============================
const getUserReservations = async (req, res) => {
  try {
    // Chercher réservations utilisateur
    const reservations = await Reservation.find({
      user: req.user.id,
    }).populate("car");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
};