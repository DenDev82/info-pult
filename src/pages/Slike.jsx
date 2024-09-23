import React from "react";
import { useState, useEffect } from "react";
import firebaseServices from "../firebase";
import { useAdminStore } from "../admin-store";
import VelikeSlike from "../components/VelikeSlike";
import DodajSlike from "../components/DodajSlike";
import { ref as dbRef, onValue, remove } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const { v4: uuidv4 } = require("uuid");
const database = firebaseServices.database;
const storage = firebaseServices.storage;

function Slike() {
  const [slike, setSlike] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addPress, setAddPress] = useState(false);
  const { isAdmin } = useAdminStore();

  useEffect(() => {
    const slikeRef = dbRef(database, "slike"); // Create a reference to 'osoblje' table

    // Listen for data changes onValue()
    onValue(slikeRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = await Promise.all(
          Object.keys(data).map(async (key) => {
            const fileRef = ref(storage, data[key].filename);
            const downloadURL = await getDownloadURL(fileRef);
            return {
              firebaseId: key,
              ...data[key],
              downloadURL, // Store the image URL
            };
          })
        );
        setSlike(formattedData);
      }
    });
  }, []);

  const removeSlike = async (firebaseId) => {
    const slikeRef = dbRef(database, `slike/${firebaseId}`); //Reference to a specific person in osoblje table

    try {
      await remove(slikeRef);
      console.log(`Person with id: ${firebaseId} removed successfully`);
      setSlike((prevSlike) =>
        prevSlike.filter((slika) => slika.firebaseId !== firebaseId)
      );
    } catch (error) {
      console.error("Error removing slika: ", error);
    }
  };

  const addSlika = () => {
    setAddPress(true);
  };
  const handleFormSubmit = (event) => {
    console.log("Form submitted"); // Add your logic for form submission here
    setAddPress(false); // Reset the state to hide the form after submission
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === slike.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? slike.length - 1 : prevIndex - 1;
    });
  };

  return (
    <div>
      {slike.length > 0 ? (
        <div className="image-slider-container">
          {/* Row 1: Buttons and Image */}
          <div className="slider-row">
            <button className="nav-button" onClick={handlePrevious}>
              {"🡸"}
            </button>
            <VelikeSlike
              key={slike[currentIndex].firebaseId}
              id={slike[currentIndex].firebaseId}
              filename={slike[currentIndex].filename}
              name={slike[currentIndex].name}
              imageUrl={slike[currentIndex].downloadURL} // Show the image from Firebase Storage
              onRemove={removeSlike}
            />
            <button className="nav-button" onClick={handleNext}>
              {"🡺"}
            </button>
          </div>

          {/* Row 2: Ukloni button */}
          {/* <div className="remove-row">
            <button
              className="remove-btn"
              onClick={() => removeSlike(slike[currentIndex].firebaseId)}
            >
              Уклони
            </button>
          </div> */}

          {/* Row 3: Add Slike button */}
          <div className="add-row">
            {isAdmin && !addPress ? (
              <button className="add-btn" onClick={addSlika}>
                Додај Слике
              </button>
            ) : isAdmin && addPress ? (
              <DodajSlike onSubmit={handleFormSubmit}></DodajSlike>
            ) : null}
          </div>
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
}

export default Slike;
