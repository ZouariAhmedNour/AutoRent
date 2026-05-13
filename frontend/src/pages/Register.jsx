import { useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

function Register() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // fonction inscription
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Compte créé avec succès");
    } catch (error) {
      console.log(error);

      alert("Erreur inscription");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="form-container">
        <h2>Créer un compte</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;