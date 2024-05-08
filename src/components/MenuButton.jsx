import React from "react";
import "../Menu.css";
function MenuButton(props) {
  const redirect = () => {
    window.location.href = `/${
      props.stranica === "pocetna" ? "" : props.stranica
    }`;
  };
  return (
    <div className="menu-button" onClick={redirect}>
      <p>{props.stranica}</p>
    </div>
  );
}

export default MenuButton;
