const Payment = require("../models/Payment");

// ==============================
// CREATE PAYMENT
// ==============================
const createPayment = async (req, res) => {
  try {
    // Récupérer données
    const {
      reservation,
      amount,
      method,
    } = req.body;

    // Créer paiement
    const payment = await Payment.create({
      reservation,
      amount,
      method,
    });

    res.status(201).json({
      message: "Paiement effectué",
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
    // Récupérer paiements
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