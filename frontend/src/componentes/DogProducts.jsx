import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../style/productGrid.css";

// Importar imágenes de productos para perros
import img1 from "../assets/img/dogproducts/abrigo-impermeable-para-perros.png";
import img2 from "../assets/img/dogproducts/botella-portatil-de-agua.png";
import img3 from "../assets/img/dogproducts/cama-ortopedica.png";
import img4 from "../assets/img/dogproducts/collar-ajustable.png";
import img5 from "../assets/img/dogproducts/comida-premium-para-perros.png";
import img6 from "../assets/img/dogproducts/correa-extensible.png";
import img7 from "../assets/img/dogproducts/juguete-interactivo-para-perros.png";
import img8 from "../assets/img/dogproducts/juguete-masticable.png";
import img9 from "../assets/img/dogproducts/snack-para-entrenamiento.png";
import img10 from "../assets/img/dogproducts/trasportadora-para-perros.png";

// Mapeo de imágenes según el nombre del producto
const productImages = {
  "Abrigo impermeable para perros": img1,
  "Botella portátil de agua": img2,
  "Cama ortopédica": img3,
  "Collar ajustable": img4,
  "Comida premium para perros": img5,
  "Correa extensible": img6,
  "Juguete interactivo para perros": img7,
  "Juguete masticable": img8,
  "Snack para entrenamiento": img9,
  "Transportadora para perros": img10,
};

const DogProducts = () => {
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
          product.tipo === "perro" &&
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
      <h1>Productos para Perros</h1>

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
              product.tipo === "perro" &&
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

export default DogProducts;
