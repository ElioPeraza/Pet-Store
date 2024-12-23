import React from 'react';
import "../style/home.css";
import pecesNadando from '../assets/img/peces_nadando.jpeg';
import perrito from '../assets/img/perrito.jpeg';
import gatito from '../assets/img/gatito.jpeg';
import perrosygatos from '../assets/img/perrogatos.jpeg';
import logo from '../assets/img/logo.jpg';
// Importar Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
  return (
    <div className="home">
      {/* Encabezado */}
      <header className="home-banner">
        <h1>¡Bienvenido a Huella Animal!</h1>
        <p>Todo lo que tus mascotas necesitan en un solo lugar.</p>
      </header>

      {/* Introducción con Carrusel */}
      <section className="home-intro">
        <h2>¿Por qué elegirnos?</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className="ad-slide">
              <h3>Calidad Garantizada</h3>
              <p>Todos nuestros productos son seleccionados para cuidar la salud de tus mascotas.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="ad-slide">
              <h3>Envío Rápido</h3>
              <p>Recibe tus pedidos en tiempo récord directamente en tu puerta.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="ad-slide">
              <h3>Atención Personalizada</h3>
              <p>Nuestro equipo está listo para ayudarte con cualquier consulta.</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Galería de Imágenes como Carrusel */}
      <section className="home-gallery">
        <h2>Nuestras Mascotas Felices</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img src={logo} alt="Logo" className="gallery-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={perrito} alt="Perrito" className="gallery-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={pecesNadando} alt="Peces nadando" className="gallery-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={perrosygatos} alt="Perros y gatos" className="gallery-image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={gatito} alt="Gatito" className="gallery-image" />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default Home;
