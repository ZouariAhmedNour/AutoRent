const Payment = require("../models/Payment");
const Reservation = require("../models/Reservation");

// ==============================
// CREATE PAYMENT
// ==============================
const createPayment = async (req, res) => {
  try {
    // Récupérer les données envoyées depuis le front
    const { reservation, amount, method } = req.body;

    // Vérifier si la réservation existe
    const reservationFound = await Reservation.findById(reservation);

    if (!reservationFound) {
      return res.status(404).json({
        message: "Réservation introuvable",
      });
    }

    // Vérifier si la réservation est déjà payée
    if (reservationFound.paymentStatus === "Payé") {
      return res.status(400).json({
        message: "Cette réservation est déjà payée",
      });
    }

    // Créer le paiement
    const payment = await Payment.create({
      reservation,
      amount,
      method,
    });

    // Mettre à jour la réservation
    reservationFound.paymentStatus = "Payé";
    reservationFound.status = "Confirmée";
    await reservationFound.save();

    res.status(201).json({
      message: "Paiement effectué avec succès",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// GET PAYMENTS
// ==============================
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("reservation");

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPayments,
};