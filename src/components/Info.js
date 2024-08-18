import React from "react";
import "./Info.css";

const Info = () => {
  return (
    <>
      <div className="info-container">
        <h1 className="Info-titel">Information om släpet</h1>
        <p>
          <strong>Modell:</strong> WT-trailer standard 250
          <br />
          <strong>Obromsad släpvagn med tippfunktion.</strong>
          <br />
          <strong>Maxlast:</strong> 490 kg.
          <br />
          <br />
          <strong>Hyresvillkor:</strong>
          <br />
          - Släpet kan hyras året om (vinterdäck finns).
          <br />
          - Bokningen sker genom att logga in eller registrera ett konto.
          <br />
          - När du bokat i kalendern ska det godkännas av ansvariga.
          <br />
          - Du får sedan en bekräftelse på att din bokning gått igenom på din
          inloggningsida
          <br />
          Admin smsar information om hur du hämtar släpet.
          <br />
          <br />
          <strong>Ansvaret:</strong>
          <br />
          - Släpet kan bokas max 24 h, och du är ansvarig från det att
          <br />
          du hämtar släpet tills dess att du lämnar tillbaka det till ansvarig.
          <br />
          - När du hämtar släpet kommer du att få skriva under ett avtal med
          <br />
          uthyrningsregler. Ni skriver också under när släpet är återlämnat.
          <br />
          - Om du behöver lämna släpet utan uppsikt under uthyrningstiden - lås
          det!
          <br />
          <br />
          <strong>Kontroll:</strong>
          <br />
          - Kontrollera släpet innan ni åker så att lampor m.m. fungerar.
          <br />
          - Notera eventuella fel eller skador i avtalet.
          <br />
          - Släpet kontrolleras när det lämnas tillbaka, och se till att lämna
          tillbaka
          <br />
          släpet i samma skick som det lämnades till er.
          <br />
          <br />
          <strong>Försäkring:</strong>
          <br />
          - Du som hyr släpet behöver ha din bil försäkrad.
          <br />
          - Om det skulle hända något med släpet när du kör, så går det på
          bilens
          <br />
          försäkring.
        </p>
      </div>
    </>
  );
};

export default Info;
