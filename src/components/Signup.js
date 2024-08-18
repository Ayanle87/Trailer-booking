import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../Firebase";
import { updateProfile } from "firebase/auth";

function Signup() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });
  const { signUp } = useUserAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegistrationPassword, setShowRegistrationPassword] =
    useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signUp(userData.email, userData.password);
      const user = userCredential.user;

      // Sätt användarens profil med förnamn och efternamn
      await updateProfile(user, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      });

      navigate("/Login");
      console.log("Användaren har registrerats och displayName satt!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  console.log(userData);

  return (
    <div className="signup-container">
      <h1 className="signup-h1">Registrera här</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-names">
          <input
            className="signup-input name-input"
            type="text"
            placeholder="Förnamn"
            required
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
          <input
            className="signup-input name-input"
            type="text"
            placeholder="Efternamn"
            required
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          className="signup-input"
          type="tel"
          placeholder="Mobil"
          required
          name="mobile"
          value={userData.mobile}
          onChange={handleChange}
        />
        <input
          className="signup-input"
          type="text"
          placeholder="Adress"
          required
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          required
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          className="signup-input"
          type={showRegistrationPassword ? "text" : "password"}
          placeholder="Lösenord"
          required
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="passwordRegistration-toggle"
          onClick={() => setShowRegistrationPassword(!showRegistrationPassword)}
        >
          <FontAwesomeIcon
          className="eyeLash"
            icon={showRegistrationPassword ? faEyeSlash : faEye}
          />
        </button>
        {loading ? (
          <button className="signup-button" disabled>
            Laddar...
          </button>
        ) : (
          <button className="signup-button">
            Skapa konto
            <FontAwesomeIcon className="rightArrow" icon={faArrowRight} />
          </button>
        )}
      </form>
    </div>
  );
}

export default Signup;
