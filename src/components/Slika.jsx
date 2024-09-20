import React from "react";
import "../Slika.css";
import { useAdminStore } from "../admin-store";

function Slika({ filename, name, onRemove, id }) {
  const { isAdmin } = useAdminStore();

  return (
    <div className="slika">
      <img src={filename} alt="slika" id="img" />
      <br></br>
      <h2>{name}</h2>
      {isAdmin && (
        <>
          <button className="remove-btn" onClick={() => onRemove(id)}>
            remove
          </button>
        </>
      )}
    </div>
  );
}

export default Slika;
