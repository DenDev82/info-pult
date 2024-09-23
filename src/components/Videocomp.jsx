import React from "react";
import "../Slika.css";
import { useAdminStore } from "../admin-store";

function VideoComp({ filename, onRemove, id }) {
  const { isAdmin } = useAdminStore();

  return (
    <div className="slika">
      <video width={800} height={600} autoPlay>
        <source src={filename} type="video/mp4" />
      </video>
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

export default VideoComp;
