import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Osoblje from "./pages/Osoblje";
import Slike from "./pages/Slike";
import Autor from "./pages/Autor";
import Odjeljenja from "./pages/Odjeljenja";
import OSSC from "./pages/OSSC";
import Menu from "./pages/Menu";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/osoblje" element={<Osoblje />}></Route>
          <Route path="/slike" element={<Slike />} />
          <Route path="/autor" element={<Autor />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/odjeljenja" element={<Odjeljenja />} />
          <Route path="/ossc" element={<OSSC />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
