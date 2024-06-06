import React from "react";
import MenuButton from "../components/MenuButton";
import "../Menu.css";
function Menu() {
  return (
    <div className="menu-div">
      <MenuButton stranica="osoblje" />
      <MenuButton stranica="o_projektu" />
      <MenuButton stranica="pocetna" />
      <MenuButton stranica="odjeljenja" />
      <MenuButton stranica="slike" />
      <MenuButton stranica="OSSC" />
    </div>
  );
}

export default Menu;
