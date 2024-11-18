import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Home from "./pages/Home";
import CatPage from "./pages/CatPage";
import DogPage from "./pages/DogPage";
import FishPage from "./pages/FishPage";
import NotFound from "./componentes/NotFound";
import injectContext from "./store/appContext"
import CartPage from "./pages/CartPage";


import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gatos" element={<CatPage />} />
          <Route path="/perros" element={<DogPage />} />
          <Route path="/peces" element={<FishPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default injectContext(App);





