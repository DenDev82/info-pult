import React from "react";
import "../Menu.css";
//TODO: JEBI BOGU MATER
function MenuButton(props) {
  const redirect = () => {
    window.location.href = `/${
      //ako je stranica pocetna samo vrati na root
      props.stranica === "pocetna" ? "" : props.stranica
    }`;
  };
  //ako je stranica o_projektu u pathu stoji tako a na p se pokazuje O projektu
  return (
    <div className="menu-button" onClick={redirect}>
      <p>{props.ime}</p>
    </div>
  );
}

export default MenuButton;
