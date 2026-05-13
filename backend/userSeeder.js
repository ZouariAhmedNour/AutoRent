const mongoose = require("mongoose");

const dotenv = require("dotenv");

const bcrypt = require("bcryptjs");

const User = require("./models/User");

// charger variables .env
dotenv.config();

// connexion MongoDB
mongoose.connect(process.env.MONGO_URI);

// fonction insertion utilisateurs
const importUsers = async () => {
  try {
    // supprimer anciens utilisateurs
    await User.deleteMany();

    // crypter mots de passe
    const adminPassword = await bcrypt.hash("admin123", 10);

    const userPassword = await bcrypt.hash("user123", 10);

    // créer admin
    const admin = {
      name: "Admin AutoRent",
      email: "admin@autorent.com",
      password: adminPassword,
      role: "admin",
    };

    // créer utilisateur simple
    const user = {
      name: "Ahmed User",
      email: "user@autorent.com",
      password: userPassword,
      role: "user",
    };

    // insérer utilisateurs
    await User.insertMany([admin, user]);

    console.log("Users ajoutés avec succès");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

// lancer fonction
importUsers();