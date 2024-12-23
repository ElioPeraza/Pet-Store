import React from 'react';
import "../style/home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Encabezado */}
      <header className="home-banner">
        <h1>¡Bienvenido a Huella Animal!</h1>
        <p>Todo lo que tus mascotas necesitan en un solo lugar.</p>
      </header>

      {/* Introducción */}
      <section className="home-intro">
        <h2>¿Por qué elegirnos?</h2>
        <p>
          En Huella Animal, nos preocupamos por el bienestar de tus mascotas.
          Ofrecemos productos de calidad para gatos, perros y peces, con un servicio excepcional.
        </p>
      </section>

      {/* Galería de Imágenes */}
      <section className="home-gallery">
        <h2>Nuestras Mascotas Felices</h2>
        <div className="gallery-grid">
          <img src="https://via.placeholder.com/300x200" alt="Gato feliz" />
          <img src="https://via.placeholder.com/300x200" alt="Perro jugando" />
          <img src="https://via.placeholder.com/300x200" alt="Peces nadando" />
          <img src="https://via.placeholder.com/300x200" alt="Mascota feliz" />
        </div>
      </section>
    </div>
  );
};

export default Home;
