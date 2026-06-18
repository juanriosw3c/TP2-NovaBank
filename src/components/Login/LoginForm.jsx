import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Intentando login con:", email, password); // <-- Línea de control

    if (email.trim() === "admin@novabank.com" && password === "admin123") {
      console.log("¡Entró como Admin!");
      navigate("/admin");
    } else if (email.trim() === "cliente@novabank.com" && password === "cliente123") {
      console.log("¡Entró como Cliente!");
      navigate("/cliente");
    } else {
      console.log("No coincidió ninguna credencial");
    }
  };

  return (
    <div className="login-form">
      <h2>Iniciar sesión</h2>
      <p>Ingresá a tu cuenta de NovaBank.</p>

      <form onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresá tu contraseña"
        />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default LoginForm;
