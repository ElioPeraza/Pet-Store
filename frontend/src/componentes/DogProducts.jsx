import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const DogProducts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductList(); // Obtener productos al cargar el componente
  }, []);

  return (
    <div className="product-feed">
      <h1>Productos para Perros</h1>
      <div className="product-grid">
        {store.filteredProducts
          .filter((product) => product.tipo === "perro")
          .map((product) => (
            <div key={product.id} className="product-card">
              <img
                src="https://via.placeholder.com/200"
                alt={product.nombre}
                className="card-image"
              />
              <div className="card-body">
                <h2 className="card-title">{product.nombre}</h2>
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


  

