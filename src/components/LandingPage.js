import React from "react";
import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <img src={"../images/trailer.jpeg"} className="trailer-img" />
      <div className="border-text">
        <h2>Låna släpvagn </h2>
        <p className="landingPage-text">
          Kostnadsfritt för Kortedala egnahemsföreningens medlemmar.
        </p>
        <p>Modell: Standard 250 med gallergrindar.</p>
        <p className="landingPage-text">
          Läs mer för{" "}
          <Link to="/Info">
            <span>info & villkor</span>
          </Link>
        </p>
      </div>
      <Link to="/CalendarView">
        <button className="boka">Boka här</button>
      </Link>
    </div>
  );
};
export default LandingPage;
