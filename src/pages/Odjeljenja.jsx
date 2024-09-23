import React from "react";
import { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { useAdminStore } from "../admin-store";
import "../Osoblje.css";
import firebaseServices from "../firebase";
import DodajOdjeljenje from "../components/DodajOdjeljenje";
const database = firebaseServices.database;

const Odjeljenja = () => {
  const [odjeljenja, setOdjeljenja] = useState([]);
  const [addPress, setAddPress] = useState(false);
  const { isAdmin } = useAdminStore();

  useEffect(() => {
    const odjeljenjaRef = ref(database, "odjeljenja"); // Create a reference to 'odjeljenja' table

    // Listen for data changes onValue()
    onValue(odjeljenjaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object to an array
        const formattedData = Object.keys(data).map((key) => ({
          firebaseId: key, //Differentiates from an 'id' in the db
          ...data[key],
        }));
        setOdjeljenja(formattedData);
      }
    });
  }, []);

  //Arrow function for removing personel from the db
  const removeOdj = async (firebaseId) => {
    const odjeljenjeRef = ref(database, `odjeljenja/${firebaseId}`); //Reference to a specific person in osoblje table

    try {
      await remove(odjeljenjeRef);
      console.log(`Odjeljenje with id: ${firebaseId} removed successfully`);
      setOdjeljenja((prevOdjeljenja) =>
        prevOdjeljenja.filter(
          (odjeljenje) => odjeljenje.firebaseId !== firebaseId
        )
      );
    } catch (error) {
      console.error("Error removing odjeljenje: ", error);
    }
  };

  const addOdjeljenje = () => {
    setAddPress(true);
  };
  const handleFormSubmit = (event) => {
    setAddPress(false); // Reset the state to hide the form after submission
  };
  return (
    <>
      <div className="odjeljenja">
        {odjeljenja.map((odjeljenja) => (
          <>
            <p>{`${odjeljenja.br} - ${odjeljenja.smjer}`}</p>

            {isAdmin ? (
              <button
                className="remove-btn"
                onClick={() => removeOdj(odjeljenja.firebaseId)}
              >
                Уклони
              </button>
            ) : null}
          </>
        ))}
        <div className="btnAdd">
          {isAdmin && !addPress ? (
            <button style={{ width: "230px" }} onClick={addOdjeljenje}>
              Додај Одјељење
            </button>
          ) : isAdmin && addPress ? (
            <DodajOdjeljenje onSubmit={handleFormSubmit}></DodajOdjeljenje>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Odjeljenja;
