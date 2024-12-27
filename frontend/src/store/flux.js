const getState = ({ getStore, getActions, setStore }) => {
  return {
      store: {
          productList: [], // Lista completa de productos
          filteredProducts: [], // Productos filtrados por la barra de búsqueda
          cart: [], // Carrito de compras
          apiUrlProduct: "http://127.0.0.1:5000/productos", // URL base de la API para productos
      },
      actions: {
          /**
           * Obtener la lista completa de productos desde la API.
           */
          getProductList: async () => {
              const { apiUrlProduct } = getStore();
              try {
                  const response = await fetch(apiUrlProduct);
                  const data = await response.json();

                  if (response.ok) {
                      setStore({ productList: data, filteredProducts: data });
                  } else {
                      console.error("Error al obtener la lista de productos:", response.statusText);
                  }
              } catch (error) {
                  console.error("Error en getProductList:", error);
              }
          },

          /**
           * Buscar productos por nombre.
           * @param {string} searchTerm - Término de búsqueda.
           */
          searchProducts: (searchTerm) => {
              const { productList } = getStore();
              const filtered = productList.filter((product) =>
                  product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
              );
              console.log("Productos filtrados:", filtered); // Depuración
              setStore({ filteredProducts: filtered });
          },

          /**
           * Crear un nuevo producto en la API.
           * @param {Object} product - Datos del producto a crear.
           */
          createProduct: async (product) => {
              const { apiUrlProduct } = getStore();
              try {
                  const response = await fetch(apiUrlProduct, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(product),
                  });

                  if (response.ok) {
                      console.log("Producto creado con éxito!");
                      await getActions().getProductList(); // Actualizar lista de productos
                      return true;
                  } else {
                      console.error(
                          "Error al crear producto:",
                          response.status,
                          response.statusText
                      );
                      return false;
                  }
              } catch (error) {
                  console.error("Error en createProduct:", error);
                  return false;
              }
          },

          /**
           * Actualizar un producto existente en la API.
           * @param {number} id - ID del producto a actualizar.
           * @param {Object} product - Datos actualizados del producto.
           */
          updateProduct: async (id, product) => {
              const { apiUrlProduct } = getStore();
              try {
                  const response = await fetch(`${apiUrlProduct}/${id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(product),
                  });

                  if (response.ok) {
                      console.log("Producto actualizado con éxito!");
                      await getActions().getProductList(); // Actualizar lista de productos
                      return true;
                  } else {
                      console.error(
                          "Error al actualizar producto:",
                          response.status,
                          response.statusText
                      );
                      return false;
                  }
              } catch (error) {
                  console.error("Error en updateProduct:", error);
                  return false;
              }
          },

          /**
           * Eliminar un producto de la API.
           * @param {number} id - ID del producto a eliminar.
           */
          deleteProduct: async (id) => {
              const { apiUrlProduct } = getStore();
              try {
                  const response = await fetch(`${apiUrlProduct}/${id}`, {
                      method: "DELETE",
                  });

                  if (response.ok) {
                      console.log("Producto eliminado con éxito!");
                      await getActions().getProductList(); // Actualizar lista de productos
                      return true;
                  } else {
                      console.error(
                          "Error al eliminar producto:",
                          response.status,
                          response.statusText
                      );
                      return false;
                  }
              } catch (error) {
                  console.error("Error en deleteProduct:", error);
                  return false;
              }
          },

          /**
           * Agregar un producto al carrito.
           * @param {Object} product - Producto a agregar al carrito.
           */
          addToCart: (product) => {
              const { cart } = getStore();
              const updatedCart = [...cart, product]; // Agrega el producto al carrito
              setStore({ cart: updatedCart });
              console.log("Producto agregado al carrito:", product);
          },

          /**
           * Eliminar un producto del carrito.
           * @param {number} productId - ID del producto a eliminar del carrito.
           */
          removeFromCart: (productId) => {
              const { cart } = getStore();
              const updatedCart = cart.filter((item) => item.id !== productId);
              setStore({ cart: updatedCart });
              console.log("Producto eliminado del carrito:", productId);
          },

          /**
           * Vaciar el carrito de compras.
           */
          clearCart: () => {
              setStore({ cart: [] });
              console.log("Carrito vaciado");
          },

          /**
           * Calcular el total del carrito.
           * @returns {number} Total del carrito.
           */
          calculateCartTotal: () => {
              const { cart } = getStore();
              const total = cart.reduce((acc, item) => acc + item.precio, 0); // Suma los precios
              return total;
          },
      },
  };
};

export default getState;
