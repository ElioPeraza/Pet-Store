import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../style/navbar.css";
import logo from "../assets/img/logo.jpg";

const Navbar = () => {
  const { store } = useContext(Context);
  const [user, setUser] = useState(null);

  // Verificar si hay un usuario almacenado en localStorage al cargar el componente
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Establecer el usuario desde localStorage
    }
  }, []);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("user"); // Eliminar el usuario del localStorage
    setUser(null); // Restablecer el estado del usuario
    window.location.href = "/"; // Redirigir al home
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo Huella Animal" className="navbar-logo" />
          Huella Animal
        </Link>
      </div>
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
      <div className="navbar-right">
        <Link to="/carrito" className="navbar-cart">
          🛒 <span className="cart-count">{store.cart.length}</span>
        </Link>
        {user ? (
          <>
            <span className="navbar-user">Hola, {user.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="navbar-link">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
