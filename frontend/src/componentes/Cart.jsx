import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../styles/cart.css";

const Cart = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {store.cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="cart-grid">
          {store.cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img
                src={product.image || "https://via.placeholder.com/100"}
                alt={product.nombre}
              />
              <div className="cart-item-content">
                <h3>{product.nombre}</h3>
                <p>{product.descripcion}</p>
                <p className="price">Precio: ${product.precio}</p>
                <button onClick={() => actions.removeFromCart(product.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {store.cart.length > 0 && (
        <button onClick={actions.clearCart} className="clear-cart-btn">
          Vaciar Carrito
        </button>
      )}
    </div>
  );
};

export default Cart;
