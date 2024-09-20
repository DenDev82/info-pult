import React, { useState } from "react";
import firebaseServices from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, get } from "firebase/database";
const { v4: uuidv4 } = require("uuid");
const database = firebaseServices.database;
const storage = firebaseServices.storage;
function DodajOsoblje({ onSubmit }) {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [slika, setSlika] = useState(null);

  const handleFileChange = (e) => {
    setSlika(e.target.files[0]);
  };
  const getNextId = async () => {
    const osobljeRef = dbRef(database, "osoblje");
    const snapshot = await get(osobljeRef);
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

    if (!slika || !ime || !prezime) {
      console.log("No image, name or surname found");
    } else {
      const extension = slika.name.split(".").pop();
      const storageRef = ref(storage, `${ime}_${prezime}.${extension}`);
      try {
        const nextID = await getNextId();
        await uploadBytes(storageRef, slika);
        const downloadUrl = await getDownloadURL(storageRef);
        const newPersonRef = dbRef(database, `osoblje/${nextID}`);
        await set(newPersonRef, {
          filename: downloadUrl,
          name: `${ime} ${prezime}`,
          id: uuidv4(),
        });
        alert("Osoba uspjesno dodana");
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }

    if (onSubmit) onSubmit(); // Pass the form submission logic to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Ime:</p>
      <input
        type="text"
        id="ime"
        value={ime}
        onChange={(e) => setIme(e.target.value)}
      />
      <p>Prezime:</p>
      <input
        type="text"
        id="prezime"
        value={prezime}
        onChange={(e) => setPrezime(e.target.value)}
      />
      <p>Slika:</p>
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleFileChange}
      />
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default DodajOsoblje;
