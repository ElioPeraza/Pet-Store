import React, { useContext } from 'react';
import { Context } from './store/AppContext';

const FishProducts = () => {
    const { store } = useContext(Context);
    const fishProducts = store.products.filter(product => product.category === 'fish'); // Filtrar por categoría

    return (
        <div>
            <h2>Productos para Peces</h2>
            <ul>
                {fishProducts.length > 0 ? (
                    fishProducts.map((product) => (
                        <li key={product.id}>
                            {product.name} - ${product.price}
                        </li>
                    ))
                ) : (
                    <p>No hay productos disponibles para peces.</p>
                )}
            </ul>
        </div>
    );
};

export default FishProducts;
