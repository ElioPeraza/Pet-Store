import React, { useContext } from 'react';
import { Context } from './store/AppContext';

const CatProducts = () => {
    const { store } = useContext(Context);
    const catProducts = store.products.filter(product => product.category === 'cat'); // Filtrar por categoría

    return (
        <div>
            <h2>Productos para Gatos</h2>
            <ul>
                {catProducts.length > 0 ? (
                    catProducts.map((product) => (
                        <li key={product.id}>
                            {product.name} - ${product.price}
                        </li>
                    ))
                ) : (
                    <p>No hay productos disponibles para gatos.</p>
                )}
            </ul>
        </div>
    );
};

export default CatProducts;
