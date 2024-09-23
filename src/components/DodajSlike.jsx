import React, { useState } from "react";
import firebaseServices from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, get } from "firebase/database";
const { v4: uuidv4 } = require("uuid");
const database = firebaseServices.database;
const storage = firebaseServices.storage;
function DodajSlike({ onSubmit }) {
  const [slika, setSlika] = useState(null);

  const handleFileChange = (e) => {
    setSlika(e.target.files[0]);
  };
  const getNextId = async () => {
    const slikeRef = dbRef(database, "slike");
    const snapshot = await get(slikeRef);
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

    if (!slika) {
      console.log("No image found");
    } else {
      const storageRef = ref(storage, `slike/${slika.name}`);
      try {
        const nextID = await getNextId();
        await uploadBytes(storageRef, slika);
        const downloadUrl = await getDownloadURL(storageRef);
        const newSlikaRef = dbRef(database, `slike/${nextID}`);
        await set(newSlikaRef, {
          filename: downloadUrl,
          name: `${slika.name}`,
          id: uuidv4(),
        });
        alert("Slika uspjesno dodana");
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }

    if (onSubmit) onSubmit(); // Pass the form submission logic to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Слика:</p>
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleFileChange}
      />
      <button type="submit">Додај</button>
    </form>
  );
}

export default DodajSlike;
