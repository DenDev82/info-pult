import React from "react";
import MenuButton from "../components/MenuButton";
import "../Menu.css";
function Menu() {
  return (
    <div className="menu-div">
      <MenuButton stranica="osoblje" ime="Особље" />
      <MenuButton stranica="o_projektu" ime="О пројекту" />
      <MenuButton stranica="video" ime="Видео" />
      <MenuButton stranica="odjeljenja" ime="Одјељења" />
      <MenuButton stranica="slike" ime="Слике" />
      <MenuButton stranica="OSSC" ime="ОСШЦ" />
    </div>
  );
}

export default Menu;
