import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">
          <h1>Huella Animal</h1>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/gatos">Gatos</Link>
        </li>
        <li>
          <Link to="/perros">Perros</Link>
        </li>
        <li>
          <Link to="/peces">Peces</Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i> {store.cart.length}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
