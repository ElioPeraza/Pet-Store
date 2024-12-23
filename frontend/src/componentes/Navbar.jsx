import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import '../style/navbar.css';
import logo from '../assets/img/logo.jpg'; // Asegúrate de tener el logo en esta ruta

const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo Huella Animal" className="navbar-logo" />
          <span>Huella Animal</span>
        </Link>
      </div>

      {/* Enlaces */}
      <div className="navbar-center">
        <Link to="/gatos" className="navbar-link">
          Gatos
        </Link>
        <Link to="/perros" className="navbar-link">
          Perros
        </Link>
        <Link to="/peces" className="navbar-link">
          Peces
        </Link>
      </div>

      {/* Carrito e inicio de sesión */}
      <div className="navbar-right">
        <Link to="/carrito" className="navbar-cart">
          🛒 <span className="cart-count">{store.cart.length}</span>
        </Link>
        <Link to="/login" className="navbar-link">
          Iniciar Sesión
        </Link>
        <Link to="/registro" className="navbar-link">
          Registrarse
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
