import React, { useContext } from "react";
import { Context } from "../store/appContext";

const CartPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      {/* Mostrar mensaje si el carrito está vacío */}
      {store.cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {/* Iterar sobre los productos en el carrito */}
          {store.cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img
                src="https://via.placeholder.com/100"
                alt={product.nombre}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h2>{product.nombre}</h2>
                <p>{product.descripcion}</p>
                <p>Precio: ${product.precio}</p>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => actions.removeFromCart(product.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Botón para vaciar el carrito */}
      {store.cart.length > 0 && (
        <button className="clear-cart-btn" onClick={actions.clearCart}>
          Vaciar Carrito
        </button>
      )}
    </div>
  );
};

export default CartPage;
