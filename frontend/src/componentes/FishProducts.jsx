import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../style/productGrid.css";

// Importar imágenes de productos para peces
import img1 from "../assets/img/fishproducts/acondicionador-de-agua.png";
import img2 from "../assets/img/fishproducts/calentador-de-agua.png";
import img3 from "../assets/img/fishproducts/comida-premium-para-peces.png";
import img4 from "../assets/img/fishproducts/decoracion-para-pecera.png";
import img5 from "../assets/img/fishproducts/filtro-para-pecera.png";
import img6 from "../assets/img/fishproducts/luz-led-para-pecera.png";
import img7 from "../assets/img/fishproducts/pecera-de-vidrio.png";
import img8 from "../assets/img/fishproducts/plantas-artificales.png";
import img9 from "../assets/img/fishproducts/red-para-peces.png";
import img10 from "../assets/img/fishproducts/termometro-para-peces.png";

// Mapeo de imágenes según el nombre del producto
const productImages = {
  "Acondicionador de agua": img1,
  "Calentador de agua": img2,
  "Comida premium para peces": img3,
  "Decoración para pecera": img4,
  "Filtro para pecera": img5,
  "Luz LED para pecera": img6,
  "Pecera de vidrio": img7,
  "Plantas artificiales": img8,
  "Red para peces": img9,
  "Termómetro para pecera": img10,
};

const FishProducts = () => {
  const { store, actions } = useContext(Context);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    actions.getProductList();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (value) {
      const filtered = store.filteredProducts.filter(
        (product) =>
          product.tipo === "pez" &&
          product.nombre.toLowerCase().includes(value)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (nombre) => {
    setSearchText(nombre);
    setSuggestions([]);
  };

  return (
    <div className="product-feed">
      <h1>Productos para Peces</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((product) => (
              <li
                key={product.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(product.nombre)}
              >
                {product.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="product-grid">
        {store.filteredProducts
          .filter(
            (product) =>
              product.tipo === "pez" &&
              product.nombre.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img
                  src={productImages[product.nombre] || "https://via.placeholder.com/200"}
                  alt={product.nombre}
                  className="card-image"
                />
              </Link>
              <div className="card-body">
                <Link to={`/product/${product.id}`}>
                  <h2 className="card-title">{product.nombre}</h2>
                </Link>
                <p className="card-text">{product.descripcion}</p>
                <p className="current-price">Precio: ${product.precio}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => actions.addToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FishProducts;
