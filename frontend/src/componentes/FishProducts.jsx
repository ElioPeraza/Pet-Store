import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Para manejar rutas
import "../style/productGrid.css";
const FishProducts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductList(); // Obtener productos al cargar el componente
  }, []);

  return (
    <div className="product-feed">
      <h1>Productos para Peces</h1>
      <div className="product-grid">
        {store.filteredProducts
          .filter((product) => product.tipo === "pez")
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

export default FishProducts;
