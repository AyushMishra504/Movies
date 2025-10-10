import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./css/App.css";
import { MovieProvider } from "./contexts/MovieContext";
import Home from "./pages/Home";
import Tv_Shows from "./pages/Tv_Shows";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tvshows" element={<Tv_Shows />} />
          <Route path="/favorites" element={<Favorites></Favorites>} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
