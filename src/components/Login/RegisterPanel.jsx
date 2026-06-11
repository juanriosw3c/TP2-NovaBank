function RegisterPanel({ showRegister, setShowRegister }) {
  if (showRegister) {
    return (
      <div className="register-panel">
        <h2>Crear cuenta</h2>
        <p>Completá tus datos para abrir tu cuenta NovaBank.</p>

        <form>
          <label>Nombre completo</label>
          <input type="text" placeholder="Juan Pérez" />

          <label>Correo electrónico</label>
          <input type="email" placeholder="ejemplo@correo.com" />

          <label>DNI</label>
          <input type="text" placeholder="12345678" />

          <label>Contraseña</label>
          <input type="password" placeholder="Creá una contraseña" />

          <button type="submit">Crear cuenta</button>
        </form>

        <button
          className="secondary-button"
          type="button"
          onClick={() => setShowRegister(false)}
        >
          Ya tengo cuenta
        </button>
      </div>
    );
  }

  return (
    <div className="register-panel">
      <h2>¿No tenés cuenta?</h2>
      <p>Creá tu cuenta en segundos y empezá a disfrutar NovaBank.</p>

      <ul>
        <li>Apertura 100% online</li>
        <li>Sin costo de mantenimiento</li>
        <li>Transferencias ilimitadas</li>
        <li>Soporte 24/7</li>
      </ul>

      <button type="button" onClick={() => setShowRegister(true)}>
        Registrarme
      </button>
    </div>
  );
}

export default RegisterPanel;