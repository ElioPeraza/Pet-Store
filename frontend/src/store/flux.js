const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        productList: [],
        apiUrlProduct: 'http://127.0.0.1:5000/productos', // URL de tu API
      },
      actions: {
        getProductList: async () => {
          const { apiUrlProduct } = getStore();
          try {
            const response = await fetch(apiUrlProduct);
            const data = await response.json();
  
            if (response.ok) {
              setStore({ productList: data }); // Asegúrate de que la respuesta sea un array de productos
            } else {
              console.log('Error al obtener la lista de productos:', response.statusText);
            }
          } catch (error) {
            console.log('Error en getProductList:', error);
          }
        },
        createProduct: async (product) => {
          const { apiUrlProduct } = getStore();
          try {
            const response = await fetch(apiUrlProduct, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(product),
            });
  
            if (response.ok) {
              console.log('Producto creado con éxito!');
              await getActions().getProductList(); // Actualizar la lista de productos
              return true;
            } else {
              console.log('Error al crear producto:', response.status, response.statusText);
              return false;
            }
          } catch (error) {
            console.log('Error en createProduct:', error);
            return false;
          }
        },
        deleteProduct: async (id) => {
          const { apiUrlProduct } = getStore();
          try {
            const response = await fetch(`${apiUrlProduct}/${id}`, {
              method: 'DELETE',
            });
  
            if (response.ok) {
              console.log('Producto eliminado con éxito!');
              await getActions().getProductList(); // Actualizar la lista de productos
              return true;
            } else {
              console.log('Error al eliminar producto:', response.status, response.statusText);
              return false;
            }
          } catch (error) {
            console.log('Error en deleteProduct:', error);
            return false;
          }
        },
        updateProduct: async (id, product) => {
          const { apiUrlProduct } = getStore();
          try {
            const response = await fetch(`${apiUrlProduct}/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(product),
            });
  
            if (response.ok) {
              console.log('Producto actualizado con éxito!');
              await getActions().getProductList(); // Actualizar la lista de productos
              return true;
            } else {
              console.log('Error al actualizar producto:', response.status, response.statusText);
              return false;
            }
          } catch (error) {
            console.log('Error en updateProduct:', error);
            return false;
          }
        },
      },
    };
  };
  
  export default getState;
  