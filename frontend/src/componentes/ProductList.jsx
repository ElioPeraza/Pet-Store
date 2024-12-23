import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getProductList(); // Cargar productos al montar
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {store.filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.nombre}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </Link>
            <h3>{product.nombre}</h3>
            <p>{product.descripcion}</p>
            <p>Precio: ${product.precio}</p>
            <button onClick={() => actions.addToCart(product)}>
              Agregar al carrito
            </button>
            <Link to={`/product/${product.id}`} style={{ display: "block", marginTop: "10px", color: "blue" }}>
              Ver más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
