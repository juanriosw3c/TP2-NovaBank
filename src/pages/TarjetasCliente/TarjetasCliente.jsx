import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, LogOut, Settings, ShieldCheck, User } from "lucide-react";

import CardSummary from "../../components/Dashboard/CardSummary";
import logo from "../../assets/logo.png";
import navbarStyles from "../../components/Dashboard/styles/DashboardNavbar.module.css";
import { getCurrentClient } from "../../services/novabankStore";
import "./TarjetasCliente.css";

const cardsByClient = {
  "cliente-1": [
    {
      id: 1,
      type: "Débito NovaBank",
      number: "4509123412343456",
      holder: "Federico Garcia",
      expires: "08/28",
      cvv: "583",
      frozen: false,
    },
    {
      id: 2,
      type: "Crédito NovaBank",
      number: "5364123498761122",
      holder: "Federico Garcia",
      expires: "11/29",
      cvv: "214",
      frozen: false,
    },
  ],
  "cliente-2": [
    {
      id: 3,
      type: "Débito NovaBank",
      number: "4509777711112222",
      holder: "Martina Ruiz",
      expires: "05/28",
      cvv: "739",
      frozen: false,
    },
  ],
  "cliente-3": [
    {
      id: 4,
      type: "Débito NovaBank",
      number: "4509888833334444",
      holder: "Nicolas Perez",
      expires: "02/29",
      cvv: "462",
      frozen: false,
    },
    {
      id: 5,
      type: "Crédito NovaBank",
      number: "5364555566667777",
      holder: "Nicolas Perez",
      expires: "09/30",
      cvv: "905",
      frozen: false,
    },
  ],
};

function getCardsKey(clientId) {
  return `novabank-client-cards-${clientId}`;
}

function getStoredCards(clientId) {
  const storedCards = localStorage.getItem(getCardsKey(clientId));

  if (!storedCards) {
    return cardsByClient[clientId] || [];
  }

  try {
    return JSON.parse(storedCards);
  } catch {
    return cardsByClient[clientId] || [];
  }
}

function TarjetasCliente() {
  const client = getCurrentClient();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cards, setCards] = useState(() => getStoredCards(client.id));
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(getCardsKey(client.id), JSON.stringify(cards));
  }, [cards, client.id]);

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
            {client.initials}
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

        <CardSummary
          cards={cards}
          setCards={setCards}
          clientPassword={client.password}
          cardHolder={client.name}
        />
      </section>

      <footer className="cards-page-footer">
        <ShieldCheck size={15} />
        Tu seguridad es nuestra prioridad. Cifrado de extremo a extremo.
      </footer>
    </main>
  );
}

export default TarjetasCliente;
