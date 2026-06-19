import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginClient } from "../../services/novabankStore";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "admin@novabank.com" && password === "admin123") {
      navigate("/admin");
      return;
    }

    if (loginClient(email, password)) {
      navigate("/cliente");
      return;
    }

    alert("Credenciales incorrectas");
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
