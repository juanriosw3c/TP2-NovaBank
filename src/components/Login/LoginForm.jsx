function LoginForm() {
  return (
    <div className="login-form">
      <h2>Iniciar sesión</h2>
      <p>Ingresá a tu cuenta de NovaBank.</p>

      <form>
        <label>Correo electrónico</label>
        <input type="email" placeholder="ejemplo@correo.com" />

        <label>Contraseña</label>
        <input type="password" placeholder="Ingresá tu contraseña" />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default LoginForm;