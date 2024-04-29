import React from "react";
import "../Menu.css";

function MenuButton(props) {
  return (
    <div className="menu-button">
      <a href={`/${props.stranica === "pocetna" ? "" : props.stranica}`}>
        {props.stranica}
      </a>
    </div>
  );
}

export default MenuButton;
