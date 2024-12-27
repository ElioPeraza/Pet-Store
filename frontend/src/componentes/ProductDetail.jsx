import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../style/productDetail.css";

// Importar imágenes de productos
import img1 from "../assets/img/catproducts/Arena-premiun-para-gatos.png";
import img2 from "../assets/img/catproducts/Cama-para-gatos.png";
import img3 from "../assets/img/catproducts/Cama-para-gatos2.png";
import img4 from "../assets/img/catproducts/Casita-para-gatos.png";
import img5 from "../assets/img/catproducts/Comida-para-gatos.png";
import img6 from "../assets/img/catproducts/Comedero-doble-para-gatos.png";
import img7 from "../assets/img/catproducts/Fuente-automatica-de-agua.png";
import img8 from "../assets/img/catproducts/Juguete-interactivo-para-gatos.png";
import img9 from "../assets/img/catproducts/Rascador-de-lujo.png";
import img10 from "../assets/img/catproducts/Snacks-saludables-para-gatos.png";

import dogImg1 from "../assets/img/dogproducts/abrigo-impermeable-para-perros.png";
import dogImg2 from "../assets/img/dogproducts/botella-portatil-de-agua.png";
import dogImg3 from "../assets/img/dogproducts/cama-ortopedica.png";
import dogImg4 from "../assets/img/dogproducts/collar-ajustable.png";
import dogImg5 from "../assets/img/dogproducts/comida-premium-para-perros.png";
import dogImg6 from "../assets/img/dogproducts/correa-extensible.png";
import dogImg7 from "../assets/img/dogproducts/juguete-interactivo-para-perros.png";
import dogImg8 from "../assets/img/dogproducts/juguete-masticable.png";
import dogImg9 from "../assets/img/dogproducts/snack-para-entrenamiento.png";
import dogImg10 from "../assets/img/dogproducts/trasportadora-para-perros.png";

import fishImg1 from "../assets/img/fishproducts/acondicionador-de-agua.png";
import fishImg2 from "../assets/img/fishproducts/calentador-de-agua.png";
import fishImg3 from "../assets/img/fishproducts/comida-premium-para-peces.png";
import fishImg4 from "../assets/img/fishproducts/decoracion-para-pecera.png";
import fishImg5 from "../assets/img/fishproducts/filtro-para-pecera.png";
import fishImg6 from "../assets/img/fishproducts/luz-led-para-pecera.png";
import fishImg7 from "../assets/img/fishproducts/pecera-de-vidrio.png";
import fishImg8 from "../assets/img/fishproducts/plantas-artificales.png";
import fishImg9 from "../assets/img/fishproducts/red-para-peces.png";
import fishImg10 from "../assets/img/fishproducts/termometro-para-peces.png";

// Mapeo de imágenes según el nombre del producto
const productImages = {
  "Arena premium para gatos": img1,
  "Cama para gatos": img2,
  "Cama para gatos2": img3,
  "Casita para gatos": img4,
  "Comida para gatos": img5,
  "Comedero doble para gatos": img6,
  "Fuente automática de agua": img7,
  "Juguete interactivo para gatos": img8,
  "Rascador de lujo": img9,
  "Snacks saludables para gatos": img10,
  "Abrigo impermeable para perros": dogImg1,
  "Botella portátil de agua": dogImg2,
  "Cama ortopédica": dogImg3,
  "Collar ajustable": dogImg4,
  "Comida premium para perros": dogImg5,
  "Correa extensible": dogImg6,
  "Juguete interactivo para perros": dogImg7,
  "Juguete masticable": dogImg8,
  "Snack para entrenamiento": dogImg9,
  "Trasportadora para perros": dogImg10,
  "Acondicionador de agua": fishImg1,
  "Calentador de agua": fishImg2,
  "Comida premium para peces": fishImg3,
  "Decoración para pecera": fishImg4,
  "Filtro para pecera": fishImg5,
  "Luz LED para pecera": fishImg6,
  "Pecera de vidrio": fishImg7,
  "Plantas artificiales": fishImg8,
  "Red para peces": fishImg9,
  "Termómetro para peces": fishImg10,
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = store.productList.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, store.productList]);

  const relatedProducts = product
    ? store.productList.filter((item) => item.tipo === product.tipo && item.id !== product.id)
    : [];

  return product ? (
    <div className="product-detail">
      <h2>{product.nombre}</h2>
      <img
        src={productImages[product.nombre] || "https://via.placeholder.com/400"}
        alt={product.nombre}
        className="product-image"
      />
      <p>{product.descripcion}</p>
      <p>Precio: ${product.precio}</p>
      <div className="button-container">
        <button onClick={() => navigate(-1)} className="back-button">
          Volver
        </button>
        <button onClick={() => actions.addToCart(product)} className="add-to-cart-button">
          Agregar al carrito
        </button>
      </div>

      <div className="related-products">
        <h3>Artículos Relacionados</h3>
        <div className="related-products-grid">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="related-product-card">
              <Link to={`/product/${relatedProduct.id}`}>
                <img
                  src={productImages[relatedProduct.nombre] || "https://via.placeholder.com/150"}
                  alt={relatedProduct.nombre}
                  className="related-product-image"
                />
              </Link>
              <h4>{relatedProduct.nombre}</h4>
              <p>${relatedProduct.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p className="loading-text">Cargando producto...</p>
  );
};

export default ProductDetail;
