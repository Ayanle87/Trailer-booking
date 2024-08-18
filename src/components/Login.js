import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

function Signin() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { logIn } = useUserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/CalendarView";

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await logIn(userData.email, userData.password);
      navigate(from);
      console.log("Användaren har loggat in!");
    } catch (error) {
      setError("Felaktigt användarnamn eller lösenord");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signin-container">
      <h1 className="login">Logga in</h1>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          placeholder="email"
          required
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <div className="password-container">
          <input
            className="login-input"
            type={showPassword ? "text" : "password"}
            placeholder="lösenord"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        <input
          className="third-input"
          type="submit"
          value="Logga in"
          disabled={loading}
        />
        {/* <p>Glömt lösenord?</p> */}
        <p>eller</p>
        <Link to="/Signup">
          <input className="input4" type="button" value="Registrera" />
        </Link>
      </form>
    </div>
  );
}

export default Signin;
