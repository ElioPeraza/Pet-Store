import React, { useState } from "react";
import Swal from "sweetalert2";
import "../style/register.css";

const Registro = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registro exitoso:", data.usuario);

        // Alerta de éxito
        Swal.fire({
          title: "¡Registro exitoso!",
          text: "Ahora puedes iniciar sesión",
          icon: "success",
          confirmButtonText: "Iniciar Sesión",
        }).then(() => {
          // Redirige al login
          window.location.href = "/login";
        });
      } else {
        const error = await response.json();
        Swal.fire({
          title: "Error al registrarse",
          text: error.message || "No se pudo completar el registro",
          icon: "error",
          confirmButtonText: "Reintentar",
        });
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema al registrarte",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Ingresa tu nombre de usuario"
          required
        />
        <label>Correo:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa tu correo"
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Ingresa tu contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
