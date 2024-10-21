import React from 'react';

// Suponiendo que recibes un array de productos como props
const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return <div>No hay productos disponibles.</div>;
    }

    return (
        <div>
            <h2>Lista de Productos</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Precio: ${product.price}</p>
                        {/* Agrega más detalles del producto según sea necesario */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
