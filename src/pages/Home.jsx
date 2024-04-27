import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../App.css";
import Osoblje from "./Osoblje";
function Home() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/osoblje" element={<Osoblje />}></Route>
        </Routes>
      </Router>
      <button className="glavno-dugme">
        <Link to="/osoblje">&nbsp;</Link>
      </button>
    </>
  );
}

export default Home;
