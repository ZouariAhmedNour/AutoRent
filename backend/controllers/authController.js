const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==============================
// REGISTER USER
// ==============================
const registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    console.log("userExists =", userExists);

    if (userExists) {
      return res.status(400).json({
        message: "Utilisateur existe déjà",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// LOGIN USER
// ==============================
const loginUser = async (req, res) => {
  try {
    // Récupérer données
    const { email, password } = req.body;

    // Vérifier utilisateur
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    // Vérifier mot de passe
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Mot de passe incorrect",
      });
    }

    // Générer token JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Réponse
    res.status(200).json({
      message: "Connexion réussie",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};