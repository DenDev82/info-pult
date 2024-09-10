import React from "react";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import database from "../firebase";
import Slika from "../components/Slika";
import "../Osoblje.css";

const Osoblje = () => {
  const [osoblje, setOsoblje] = useState([]);

  useEffect(() => {
    // Initialize the Realtime Database
    const osobljeRef = ref(database, "osoblje"); // Create a reference to 'osoblje'

    // Listen for data changes
    onValue(osobljeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object to an array
        const formattedData = Object.keys(data).map((key) => ({
          firebaseId: key,
          ...data[key],
        }));
        setOsoblje(formattedData);
      }
    });
  }, []);
  const removePerson = async (firebaseId) => {
    const personRef = ref(database, `osoblje/${firebaseId}`);

    try {
      await remove(personRef);
      console.log(`Person with id: ${firebaseId} removed successfully`);
      setOsoblje((prevOsoblje) =>
        prevOsoblje.filter((person) => person.firebaseId !== firebaseId)
      );
    } catch (error) {
      console.error("Error removing person: ", error);
    }
  };
  return (
    <div className="osoblje">
      {osoblje.map((osoblje) => (
        <Slika
          key={osoblje.firebaseId}
          id={osoblje.firebaseId}
          filename={`/Profesori/${osoblje.filename}`}
          name={osoblje.name}
          onRemove={removePerson}
        />
      ))}
    </div>
  );
};

export default Osoblje;
