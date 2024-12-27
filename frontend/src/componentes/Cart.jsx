import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../style/cart.css";

const Cart = () => {
    const { store, actions } = useContext(Context);

    const handleRemove = (productId) => {
        actions.removeFromCart(productId); // Elimina el producto del carrito
    };

    const handleClearCart = () => {
        actions.clearCart(); // Vacía el carrito
    };

    const total = actions.calculateCartTotal(); // Calcula el total del carrito

    return (
        <div className="cart-container">
            <h1>Carrito de Compras</h1>
            {store.cart.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {store.cart.map((product) => (
                            <li key={product.id} className="cart-item">
                                <img
                                    src={product.image || "https://via.placeholder.com/100"}
                                    alt={product.nombre}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3>{product.nombre}</h3>
                                    <p>{product.descripcion}</p>
                                    <p>Precio: ${product.precio}</p>
                                    <button
                                        onClick={() => handleRemove(product.id)}
                                        className="cart-item-remove-btn"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <h2>Total: ${total.toFixed(2)}</h2>
                    </div>
                    <button onClick={handleClearCart} className="clear-cart-btn">
                        Vaciar Carrito
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
