const express = require("express");

const router = express.Router();

const {
  createReservation,
  getUserReservations,
} = require("../controllers/reservationController");

const authMiddleware = require("../middleware/authMiddleware");

// Créer réservation
router.post("/", authMiddleware, createReservation);

// Voir mes réservations
router.get(
  "/my-reservations",
  authMiddleware,
  getUserReservations
);

module.exports = router;