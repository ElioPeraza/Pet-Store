import React, { useContext } from 'react';
import { Context } from './store/AppContext';

const DogProducts = () => {
    const { store } = useContext(Context);
    const dogProducts = store.products.filter(product => product.category === 'dog'); // Filtrar por categoría

    return (
        <div>
            <h2>Productos para Perros</h2>
            <ul>
                {dogProducts.length > 0 ? (
                    dogProducts.map((product) => (
                        <li key={product.id}>
                            {product.name} - ${product.price}
                        </li>
                    ))
                ) : (
                    <p>No hay productos disponibles para perros.</p>
                )}
            </ul>
        </div>
    );
};

export default DogProducts;
