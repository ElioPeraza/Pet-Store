import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import '../style/navbar.css';

const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Huella Animal
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
