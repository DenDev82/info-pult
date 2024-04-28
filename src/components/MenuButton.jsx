import React from "react";

function MenuButton(props) {
  return (
    <div className="menu-button">
      <a href={`/${props.stranica}`}>{props.stranica}</a>
    </div>
  );
}

export default MenuButton;
