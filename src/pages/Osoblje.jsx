import React from "react";
import { useEffect, useState } from "react";
import imageList from "../imagelist.json";
import Slika from "../components/Slika";
import "../Osoblje.css";
import { useAdminStore } from "../admin-store";

const Osoblje = () => {
  const [osoblje, setOsoblje] = useState([]);
  const { isAdmin } = useAdminStore((state) => ({
    isAdmin: state.isAdmin,
    setAdmin: state.setAdmin,
  }));
  useEffect(() => {
    setOsoblje(imageList);
  }, []);
  const removePerson = (id) => {
    setOsoblje(osoblje.filter((person) => person.id !== id));
  };
  return (
    <div className="osoblje">
      {osoblje.map((osoblje) => (
        <Slika
          key={osoblje.id}
          id={osoblje.id}
          filename={`/Profesori/${osoblje.filename}`}
          name={osoblje.name}
          onRemove={removePerson}
        />
      ))}
      {isAdmin ? <p>ISUS</p> : <p>NIJE ISUS</p>}
    </div>
  );
};

export default Osoblje;
