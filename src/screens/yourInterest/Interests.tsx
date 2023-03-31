import React from "react";
import CardInterest from "../../components/card_interest/CardInterest";
import Logo from "../../components/logo/Logo";
import "./Interests.css";

function Interests() {
  return (
    <div>
     <Logo />
      <div className="interest_container">
        <div className="contain">
          <CardInterest />
        </div>
      </div>
    </div>
  );
}

export default Interests;
