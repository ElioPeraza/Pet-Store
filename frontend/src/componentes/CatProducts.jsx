import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../style/productGrid.css";

// Importar explícitamente las imágenes de productos para gatos
import img1 from "../assets/img/catproducts/Arena-premiun-para-gatos.png";
import img2 from "../assets/img/catproducts/Cama-para-gatos.png";
import img3 from "../assets/img/catproducts/Cama-para-gatos2.png";
import img4 from "../assets/img/catproducts/Casita-para-gatos.png";
import img5 from "../assets/img/catproducts/Comedero-doble-para-gatos.png";
import img6 from "../assets/img/catproducts/Comida-para-gatos.png";
import img7 from "../assets/img/catproducts/Fuente-automatica-de-agua.png";
import img8 from "../assets/img/catproducts/Juguete-interactivo-para-gatos.png";
import img9 from "../assets/img/catproducts/Rascador-de-lujo.png";
import img10 from "../assets/img/catproducts/Snacks-saludables-para-gatos.png";

// Mapeo de imágenes según el nombre del producto
const productImages = {
  "Arena premium para gatos": img1,
  "Cama para gatos": img2,
  "Cama para gatos2": img3,
  "Casita para gatos": img4,
  "Comedero doble para gatos": img5,
  "Comida para gatos": img6,
  "Fuente automática de agua": img7,
  "Juguete interactivo para gatos": img8,
  "Rascador de lujo": img9,
  "Snacks saludables para gatos": img10,
};

const CatProducts = () => {
  const { store, actions } = useContext(Context);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    actions.getProductList();
  }, []); // Removida la dependencia de actions

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (value) {
      const filtered = store.filteredProducts.filter(
        (product) =>
          product.tipo === "gato" &&
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

  const handleAddToCart = (product) => {
    console.log('Adding product to cart:', product); // Debug log
    actions.addToCart(product);
  };

  return (
    <div className="product-feed">
      <h1>Productos para Gatos</h1>

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
              product.tipo === "gato" &&
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
                  onClick={() => handleAddToCart(product)}
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

export default CatProducts;