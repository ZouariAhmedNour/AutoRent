require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

// charger .env
dotenv.config();

// connexion mongo
connectDB();

const app = express();

// middleware JSON
app.use(express.json());

// cors
app.use(cors());

// routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/cars", require("./routes/carRoutes"));

app.use(
  "/api/reservations",
  require("./routes/reservationRoutes")
);

app.use(
  "/api/payments",
  require("./routes/paymentRoutes")
);

// route test
app.get("/", (req, res) => {
  res.send("API fonctionne");
});

// port
const PORT = process.env.PORT || 5000;

// lancer serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur ${PORT}`);
});