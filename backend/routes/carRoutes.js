const express = require("express");

const router = express.Router();

const {
  getCars,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");

const authMiddleware = require("../middleware/authMiddleware");

// Récupérer voitures
router.get("/", getCars);

// Ajouter voiture
router.post("/", authMiddleware, createCar);

// Modifier voiture
router.put("/:id", authMiddleware, updateCar);

// Supprimer voiture
router.delete("/:id", authMiddleware, deleteCar);

module.exports = router;