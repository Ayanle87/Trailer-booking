import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDates = location.state?.bookingDates || [];

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/"); // Omdirigera till startsidan efter utloggning
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="confirmation-container">
        <div className="confirmation-top">
          <h1>Bekräftelse</h1>
          <FontAwesomeIcon icon={faCircleCheck} size="2x" />
        </div>
        {user && (
          <p>
            Välkommen, {user.email}. Din bokning är bekräftad för följande
            datum:
          </p>
        )}

        <ul>
          {bookingDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
        <div className="logout-container">
          <Link to="/">
            <button onClick={handleLogout}>Logga ut</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
