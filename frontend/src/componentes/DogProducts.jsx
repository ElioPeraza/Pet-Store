import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Importamos Link para manejar rutas
import "../style/productGrid.css";

const DogProducts = () => {
  const { store, actions } = useContext(Context);
  const [searchText, setSearchText] = useState(""); // Texto de búsqueda
  const [suggestions, setSuggestions] = useState([]); // Sugerencias para autocompletar

  useEffect(() => {
    actions.getProductList(); // Obtener productos al cargar el componente
  }, []);

  // Manejar cambios en la barra de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (value) {
      // Filtrar sugerencias según el texto ingresado
      const filtered = store.filteredProducts.filter(
        (product) =>
          product.tipo === "perro" &&
          product.nombre.toLowerCase().includes(value)
      );
      setSuggestions(filtered.slice(0, 5)); // Mostrar un máximo de 5 sugerencias
    } else {
      setSuggestions([]);
    }
  };

  // Seleccionar un producto desde las sugerencias
  const handleSuggestionClick = (nombre) => {
    setSearchText(nombre);
    setSuggestions([]); // Limpiar sugerencias al seleccionar
  };

  return (
    <div className="product-feed">
      <h1>Productos para Perros</h1>

      {/* Barra de búsqueda */}
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

      {/* Lista de productos */}
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
                  src="https://via.placeholder.com/200"
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
