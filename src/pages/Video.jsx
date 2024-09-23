import React from "react";
import { useState, useEffect } from "react";
import firebaseServices from "../firebase";
import { useAdminStore } from "../admin-store";
import VideoComp from "../components/Videocomp";
import DodajVideo from "../components/DodajVideo.jsx";
import { ref as dbRef, onValue, remove } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const { v4: uuidv4 } = require("uuid");
const database = firebaseServices.database;
const storage = firebaseServices.storage;

function Video() {
  const [video, setVideo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addPress, setAddPress] = useState(false);
  const { isAdmin } = useAdminStore();

  useEffect(() => {
    const videoRef = dbRef(database, "video"); // Create a reference to 'osoblje' table

    // Listen for data changes onValue()
    onValue(videoRef, async (snapshot) => {
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
        setVideo(formattedData);
      }
    });
  }, []);

  const removeVideo = async (firebaseId) => {
    const videoRef = dbRef(database, `video/${firebaseId}`); //Reference to a specific person in osoblje table

    try {
      await remove(videoRef);
      console.log(`Person with id: ${firebaseId} removed successfully`);
      setVideo((prevVideo) =>
        prevVideo.filter((video) => video.firebaseId !== firebaseId)
      );
    } catch (error) {
      console.error("Error removing slika: ", error);
    }
  };

  const addVideo = () => {
    setAddPress(true);
  };
  const handleFormSubmit = (event) => {
    console.log("Form submitted"); // Add your logic for form submission here
    setAddPress(false); // Reset the state to hide the form after submission
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === video.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? video.length - 1 : prevIndex - 1;
    });
  };

  return (
    <div>
      {video.length > 0 ? (
        <div className="image-slider-container">
          {/* Row 1: Buttons and Image */}
          <div className="slider-row">
            <button className="nav-button" onClick={handlePrevious}>
              {"🡸"}
            </button>
            <VideoComp
              key={video[currentIndex].firebaseId}
              id={video[currentIndex].firebaseId}
              filename={video[currentIndex].filename}
              name={video[currentIndex].name}
              imageUrl={video[currentIndex].downloadURL} // Show the image from Firebase Storage
              onRemove={removeVideo}
            />
            <button className="nav-button" onClick={handleNext}>
              {"🡺"}
            </button>
          </div>
        </div>
      ) : (
        <p>Нема доступних видеа</p>
      )}
      <div className="add-row">
        {isAdmin && !addPress ? (
          <button className="add-btn" onClick={addVideo}>
            Додај Видео
          </button>
        ) : isAdmin && addPress ? (
          <DodajVideo onSubmit={handleFormSubmit}></DodajVideo>
        ) : null}
      </div>
    </div>
  );
}

export default Video;
