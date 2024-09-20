import React from "react";
import { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { useAdminStore } from "../admin-store";
import Slika from "../components/Slika";
import DodajOsoblje from "../components/DodajOsoblje";
import "../Osoblje.css";
import firebaseServices from "../firebase";
const database = firebaseServices.database;

const Osoblje = () => {
  const [osoblje, setOsoblje] = useState([]);
  const [addPress, setAddPress] = useState(false);
  const { isAdmin } = useAdminStore();

  useEffect(() => {
    const osobljeRef = ref(database, "osoblje"); // Create a reference to 'osoblje' table

    // Listen for data changes onValue()
    onValue(osobljeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object to an array
        const formattedData = Object.keys(data).map((key) => ({
          firebaseId: key, //Differentiates from an 'id' in the db
          ...data[key],
        }));
        setOsoblje(formattedData);
      }
    });
  }, []);

  //Arrow function for removing personel from the db
  const removePerson = async (firebaseId) => {
    const personRef = ref(database, `osoblje/${firebaseId}`); //Reference to a specific person in osoblje table

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

  const addOsoblje = () => {
    setAddPress(true);
    console.log(addPress);
  };
  const handleFormSubmit = (event) => {
    console.log("Form submitted"); // Add your logic for form submission here
    setAddPress(false); // Reset the state to hide the form after submission
  };
  return (
    <>
      <div className="osoblje">
        {osoblje.map((osoblje) => (
          <Slika
            key={osoblje.firebaseId}
            id={osoblje.firebaseId}
            filename={osoblje.filename}
            name={osoblje.name}
            onRemove={removePerson}
          />
        ))}
        {/*osoblje.map((osoblje) => {
          console.log(osoblje.filename);
        })*/}
        <div className="btnAdd">
          {isAdmin && !addPress ? (
            <button onClick={addOsoblje}>Dodaj Osoblje</button>
          ) : (
            <DodajOsoblje onSubmit={handleFormSubmit}></DodajOsoblje>
          )}
        </div>
      </div>
    </>
  );
};

export default Osoblje;
