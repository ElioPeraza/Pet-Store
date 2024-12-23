import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Importamos Link para las rutas
import "../style/productGrid.css";


const CatProducts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductList().catch((error) => {
      console.error("Error al cargar productos:", error);
    });
  }, []);

  return (
    <div className="product-feed">
      <h1>Productos para Gatos</h1>
      <div className="product-grid">
        {store.filteredProducts
          .filter((product) => product.tipo === "gato")
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

export default CatProducts;
