import BalanceCard from "../../components/Dashboard/BalanceCard";
import CardSummary from "../../components/Dashboard/CardSummary";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import InvestmentsList from "../../components/Dashboard/InvestmentsList";
import MovementsList from "../../components/Dashboard/MovementsList";
import QuickActions from "../../components/Dashboard/QuickActions";
import { Eye } from "lucide-react";
import { dashboardData } from "../../mocks/dashboardClienteData";
import "./DashboardCliente.css";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useState } from "react";

function DashboardCliente() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="client-dashboard">
      <DashboardNavbar
        userInitials={dashboardData.user.initials}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isAdmin={true}
      />

      <div className="dashboard-shell">
        <section className="dashboard-hero">
          <div>
            <p>Buen día,</p>
            <h1>
              {dashboardData.user.name} <span>👋</span>
            </h1>
          </div>

          <span className="account-status">
            <span />
            {dashboardData.user.status}
          </span>
        </section>

        <BalanceCard
          balance={dashboardData.balance}
          monthlyChange={dashboardData.monthlyChange}
          updatedAt={dashboardData.updatedAt}
          stats={dashboardData.stats}
        />

        <QuickActions actions={dashboardData.quickActions} />

        <section className="dashboard-grid">
          <MovementsList movements={dashboardData.movements} />

          <div className="dashboard-side">
            <CardSummary
              card={dashboardData.card}
              credit={dashboardData.credit}
            />
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
