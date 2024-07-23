import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Osoblje from "./pages/Osoblje";
import Slike from "./pages/Slike";
import Odjeljenja from "./pages/Odjeljenja";
import OSSC from "./pages/OSSC";
import Menu from "./pages/Menu";
import OProjektu from "./pages/OProjektu";
import Admin from "./pages/Admin";
import Video from "./pages/Video";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/video" element={<Video />}></Route>
          <Route path="/osoblje" element={<Osoblje />}></Route>
          <Route path="/slike" element={<Slike />} />
          <Route path="/o_projektu" element={<OProjektu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/odjeljenja" element={<Odjeljenja />} />
          <Route path="/ossc" element={<OSSC />} />
          <Route path="/tajnastranica" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
