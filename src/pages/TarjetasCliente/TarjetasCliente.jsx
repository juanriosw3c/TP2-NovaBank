import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, LogOut, Settings, ShieldCheck, User } from "lucide-react";
import CardSummary from "../../components/Dashboard/CardSummary";
import { dashboardData } from "../../mocks/dashboardClienteData";
import logo from "../../assets/logo.png";
import navbarStyles from "../../components/Dashboard/styles/DashboardNavbar.module.css";
import "./TarjetasCliente.css";

const CARDS_STORAGE_KEY = "novabank-client-cards";

function getStoredCards() {
  const storedCards = localStorage.getItem(CARDS_STORAGE_KEY);

  if (!storedCards) {
    return dashboardData.cards;
  }

  try {
    return JSON.parse(storedCards);
  } catch {
    return dashboardData.cards;
  }
}

function TarjetasCliente() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cards, setCards] = useState(getStoredCards);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <main className="cards-page">
      <header className="cards-page-header">
        <Link to="/cliente" className="cards-back-button" aria-label="Volver al dashboard">
          <ChevronLeft size={20} />
        </Link>

        <img src={logo} alt="NovaBank" className="cards-logo" />

        <div className={navbarStyles.profileContainer}>
          <button
            className={navbarStyles.profileButton}
            type="button"
            aria-label="Perfil"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {dashboardData.user.initials}
          </button>

          {showProfileMenu && (
            <div className={navbarStyles.profileDropdown}>
              <button type="button">
                <User size={16} /> Mi perfil
              </button>
              <button type="button">
                <Settings size={16} /> Configuración
              </button>
              <hr />
              <button
                type="button"
                className={navbarStyles.logoutBtn}
                onClick={handleLogout}
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <section className="cards-page-shell">
        <div className="cards-title">
          <h1>Tarjetas</h1>
        </div>

        <CardSummary cards={cards} setCards={setCards} />
      </section>

      <footer className="cards-page-footer">
        <ShieldCheck size={15} />
        Tu seguridad es nuestra prioridad. Cifrado de extremo a extremo.
      </footer>
    </main>
  );
}

export default TarjetasCliente;
