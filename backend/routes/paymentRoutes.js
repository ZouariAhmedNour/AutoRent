const express = require("express");

const router = express.Router();

const {
  createPayment,
  getPayments,
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

// Créer paiement
router.post("/", authMiddleware, createPayment);

// Voir paiements
router.get("/", authMiddleware, getPayments);

module.exports = router;