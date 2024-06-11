import React from "react";
import "../Slika.css";
function Slika(props) {
  return (
    <div className="slika">
      <img src={props.filename} alt="slika" />
      <h2>{props.name}</h2>
      <p>Profesija</p>
    </div>
  );
}

export default Slika;
