const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware pour protéger les routes privées
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Vérifier si le header Authorization existe
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Récupérer le token
      token = req.headers.authorization.split(" ")[1];

      // Vérifier le token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Chercher utilisateur sans mot de passe
      req.user = await User.findById(decoded.id).select("-password");

      // Passer à la suite
      next();
    } else {
      return res.status(401).json({
        message: "Accès refusé, token manquant",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token invalide",
    });
  }
};

module.exports = authMiddleware;