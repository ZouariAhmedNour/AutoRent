const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Car = require("./models/Car");

// charger .env
dotenv.config();

// connexion MongoDB
mongoose.connect(process.env.MONGO_URI);

// données voitures
const cars = [
  {
    brand: "BMW",
    model: "X5",
    pricePerDay: 300,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e",
  },

  {
    brand: "Mercedes",
    model: "C220",
    pricePerDay: 250,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },

  {
    brand: "Audi",
    model: "A6",
    pricePerDay: 280,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
  },
];

// fonction insertion
const importData = async () => {
  try {
    // supprimer anciennes données
    await Car.deleteMany();

    // ajouter nouvelles données
    await Car.insertMany(cars);

    console.log("Voitures ajoutées");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importData();