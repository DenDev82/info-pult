import React from "react";
import "../Slikulja.css";
import { useAdminStore } from "../admin-store";

function Slika({ filename, name, onRemove, id }) {
  const { isAdmin } = useAdminStore();

  return (
    <div className="slikav">
      <img src={filename} alt="slika" id="img" />
      <br></br>
      {isAdmin && (
        <>
          <button className="remove-btn" onClick={() => onRemove(id)}>
            Уклони
          </button>
        </>
      )}
    </div>
  );
}

export default Slika;
