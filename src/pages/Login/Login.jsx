import { useState } from "react";
import { Shield, Zap, BarChart3 } from "lucide-react";

import LoginForm from "../../components/Login/LoginForm";
import RegisterPanel from "../../components/Login/RegisterPanel";
import logo from "../../assets/logo.png";
import "./Login.css";

function Login() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="login-page">
      <section className="login-brand">
        <div className="brand-logo">
          <img src={logo} alt="NovaBank logo" />
        </div>

        <h1>
          Tu banco, <br />
          siempre <span>cerca.</span>
        </h1>

        <p>
          Gestioná tus cuentas, realizá transferencias y administrá tus
          finanzas de forma segura y simple.
        </p>

        <div className="brand-features">
          <div className="brand-feature">
            <div className="feature-icon">
              <Shield size={26} />
            </div>
            <div>
              <h3>Seguridad de nivel bancario</h3>
              <p>Protegemos tus datos y operaciones con tecnología de punta.</p>
            </div>
          </div>

          <div className="brand-feature">
            <div className="feature-icon">
              <Zap size={26} />
            </div>
            <div>
              <h3>Operaciones en segundos</h3>
              <p>Hacé transferencias y pagos de forma rápida y sin complicaciones.</p>
            </div>
          </div>

          <div className="brand-feature">
            <div className="feature-icon">
              <BarChart3 size={26} />
            </div>
            <div>
              <h3>Control total de tus finanzas</h3>
              <p>Visualizá tus movimientos y administrá tus cuentas en un solo lugar.</p>
            </div>
          </div>
        </div>

      <div className="bank-card">
  <div className="card-chip"></div>

  <p className="card-number">
    1234 5678 9012 3456
  </p>

  <div className="card-footer">
    <span>08/28</span>
    <strong>NOVABANK</strong>
  </div>
</div>
      </section>

      

      <section className="login-card">
        {showRegister ? (
          <>
            <div className="register-panel">
              <h2>¿Ya tenés cuenta?</h2>
              <p>Ingresá con tus datos para volver a operar en NovaBank.</p>

              <ul>
                <li>Acceso seguro</li>
                <li>Control total de tus cuentas</li>
                <li>Historial de operaciones</li>
                <li>Soporte 24/7</li>
              </ul>

              <button type="button" onClick={() => setShowRegister(false)}>
                Iniciar sesión
              </button>
            </div>

            <RegisterPanel
              showRegister={showRegister}
              setShowRegister={setShowRegister}
            />
          </>
        ) : (
          <>
            <LoginForm />

            <RegisterPanel
              showRegister={showRegister}
              setShowRegister={setShowRegister}
            />
          </>
        )}
      </section>

      <footer className="security-footer">
  🔒 Tu seguridad es nuestra prioridad. Utilizamos cifrado de extremo a extremo para proteger tu información.
</footer>
    </main>
  );
}

export default Login;