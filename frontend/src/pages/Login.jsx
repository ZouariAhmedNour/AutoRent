import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // navigation React Router
  const navigate = useNavigate();

  // fonction connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // sauvegarder token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // sauvegarder user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Connexion réussie");

      // redirection vers home
      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Erreur connexion"
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div className="form-container">
        <h2>Connexion</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;