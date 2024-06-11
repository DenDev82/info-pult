import React from "react";
import { useEffect, useState } from "react";
import imageList from "../imagelist.json";
import Slika from "../components/Slika";
import "../Osoblje.css";

const Osoblje = () => {
  const [osoblje, setOsoblje] = useState([]);

  useEffect(() => {
    setOsoblje(imageList);
  }, []);
  return (
    <div className="osoblje">
      {osoblje.map((osoblje) => (
        <Slika
          key={osoblje.filename}
          filename={`/Profesori/${osoblje.filename}`}
          name={osoblje.name}
        />
      ))}
    </div>
  );
};

export default Osoblje;
