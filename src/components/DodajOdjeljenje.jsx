import React, { useState } from "react";
import firebaseServices from "../firebase";
import { ref as dbRef, set, get } from "firebase/database";
const { v4: uuidv4 } = require("uuid");
const database = firebaseServices.database;
function DodajOdjeljenje({ onSubmit }) {
  const [br, setBr] = useState("");
  const [smjer, setSmjer] = useState("");

  const getNextId = async () => {
    const odjeljenjaRef = dbRef(database, "odjeljenja");
    const snapshot = await get(odjeljenjaRef);
    const data = snapshot.val();

    if (data) {
      const ids = Object.keys(data).map((key) => parseInt(key, 10)); // Convert string keys to numbers
      const maxId = Math.max(...ids); // Get the highest ID in the database
      return maxId + 1; // Increment the highest ID by 1
    }

    return 1; // If no data exists, start with ID 1
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!smjer || !br) {
      console.log("No smjer or br found");
    } else {
      try {
        const nextID = await getNextId();
        const newOdjeljenjeRef = dbRef(database, `odjeljenja/${nextID}`);
        await set(newOdjeljenjeRef, {
          br: `${br}`,
          smjer: `${smjer}`,
          id: uuidv4(),
        });
        alert("Odjeljenje uspjesno dodano");
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }

    if (onSubmit) onSubmit(); // Pass the form submission logic to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Odjeljenje:</p>
      <input
        type="text"
        id="br"
        value={br}
        onChange={(e) => setBr(e.target.value)}
      />
      <p>Smjer:</p>
      <input
        type="text"
        id="smjer"
        value={smjer}
        onChange={(e) => setSmjer(e.target.value)}
      />
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default DodajOdjeljenje;
