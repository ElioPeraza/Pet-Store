import React, { useState } from "react";
import Swal from "sweetalert2";
import "../style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data.usuario);

        // Guarda al usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data.usuario));

        // Alerta de éxito
        Swal.fire({
          title: "¡Inicio de sesión exitoso!",
          text: `Bienvenido, ${data.usuario.username}`,
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          // Redirige después de la alerta
          window.location.href = "/";
        });
      } else {
        const error = await response.json();
        Swal.fire({
          title: "Error al iniciar sesión",
          text: error.message || "Correo o contraseña incorrectos",
          icon: "error",
          confirmButtonText: "Reintentar",
        });
      }
    } catch (error) {
      console.error("Error en el login:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema al iniciar sesión",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <label>Correo:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
