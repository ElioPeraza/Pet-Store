import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Home from "./pages/Home";
import CatPage from "./pages/CatPage";
import DogPage from "./pages/DogPage";
import FishPage from "./pages/FishPage";
import ProductDetail from "./componentes/ProductDetail"; // Importamos ProductDetail
import CartPage from "./pages/CartPage";
import Login from "./componentes/Login"; // Importamos la página de Login
import Registro from "./componentes/Registro"; // Importamos la página de Registro
import Footer from "./componentes/Footer";
import NotFound from "./componentes/NotFound";
import injectContext from "./store/appContext";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar siempre visible */}
        <Navbar />

        {/* Contenido principal con las rutas */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gatos" element={<CatPage />} />
            <Route path="/perros" element={<DogPage />} />
            <Route path="/peces" element={<FishPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetail />} /> {/* Ruta para el detalle del producto */}
            <Route path="/login" element={<Login />} /> {/* Ruta de Login */}
            <Route path="/registro" element={<Registro />} /> {/* Ruta de Registro */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Footer siempre visible */}
        <Footer />
      </div>
    </Router>
  );
};

export default injectContext(App);
