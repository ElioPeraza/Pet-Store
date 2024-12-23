import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import "../style/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = store.productList.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, store.productList]);

  return product ? (
    <div style={{ padding: "20px" }}>
      <h2>{product.nombre}</h2>
      <img
        src={product.image || "https://via.placeholder.com/400"}
        alt={product.nombre}
        style={{ width: "400px", marginBottom: "20px" }}
      />
      <p>{product.descripcion}</p>
      <p>Precio: ${product.precio}</p>
      <button onClick={() => navigate(-1)} style={{ marginRight: "10px" }}>
        Volver
      </button>
      <button onClick={() => console.log("Producto agregado al carrito")}>
        Agregar al carrito
      </button>
    </div>
  ) : (
    <p>Cargando producto...</p>
  );
};

export default ProductDetail;
