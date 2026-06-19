import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import BalanceCard from "../../components/Dashboard/BalanceCard";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import InvestmentsList from "../../components/Dashboard/InvestmentsList";
import MovementsList from "../../components/Dashboard/MovementsList";
import QuickActions from "../../components/Dashboard/QuickActions";
import Sidebar from "../../components/Dashboard/Sidebar";
import { dashboardData } from "../../mocks/dashboardClienteData";
import { getDashboardData } from "../../services/novabankStore";
import "./DashboardCliente.css";

function DashboardCliente() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clientData, setClientData] = useState(() => getDashboardData());

  useEffect(() => {
    const refreshData = () => setClientData(getDashboardData());

    window.addEventListener("novabank:data-changed", refreshData);
    return () => window.removeEventListener("novabank:data-changed", refreshData);
  }, []);

  const movements = clientData.movements.length > 0 ? clientData.movements : dashboardData.movements;

  return (
    <main className="client-dashboard">
      <DashboardNavbar
        userInitials={clientData.client.initials}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isAdmin={false}
      />

      <div className="dashboard-shell">
        <section className="dashboard-hero">
          <div>
            <p>Buen día,</p>
            <h1>
              {clientData.client.name} <span>👋</span>
            </h1>
          </div>

          <span className="account-status">
            <span />
            {clientData.client.status}
          </span>
        </section>

        <BalanceCard
          balance={clientData.balance}
          monthlyChange={dashboardData.monthlyChange}
          updatedAt={dashboardData.updatedAt}
          stats={dashboardData.stats}
        />

        <QuickActions actions={dashboardData.quickActions} />

        <section className="dashboard-grid">
          <MovementsList movements={movements} />

          <div className="dashboard-side">
            <InvestmentsList investments={dashboardData.investments} />
          </div>
        </section>
      </div>

      <footer className="dashboard-footer">
        <Eye size={16} />
        Tu seguridad es nuestra prioridad. Cifrado de extremo a extremo CLIENTE.
      </footer>
    </main>
  );
}

export default DashboardCliente;
