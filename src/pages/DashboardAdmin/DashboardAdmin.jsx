import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import AdminMetricCard from "../../components/Dashboard/AdminMetricCard";
import PendingApprovals from "../../components/Dashboard/PendingApprovals";
import SystemLogs from "../../components/Dashboard/SystemLogs";
import { dashboardAdminData } from "../../mocks/dashboardAdminData";
import "../DashboardCliente/DashboardCliente.css"; // Solo para layout estructural global
import { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";

function DashboardAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="client-dashboard" style={{ paddingTop: "92px" }}>
      <DashboardNavbar
        userInitials={dashboardAdminData.user.initials}
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
            <p>Bienvenido de vuelta,</p>
            <h1>
              {dashboardAdminData.user.name} <span>⚙️</span>
            </h1>
          </div>
          <span
            className="account-status"
            style={{
              borderColor: "rgba(139, 92, 246, 0.35)",
              color: "#a78bfa",
              background: "rgba(124, 58, 237, 0.12)",
            }}
          >
            <span style={{ backgroundColor: "#a78bfa" }} />
            {dashboardAdminData.user.role}
          </span>
        </section>

        {/* 1. Tarjetas de Métricas */}
        <AdminMetricCard metrics={dashboardAdminData.metrics} />

        {/* 2. Grilla de Gestión Separada */}
        <div className="dashboard-grid">
          <PendingApprovals approvals={dashboardAdminData.pendingApprovals} />
          <SystemLogs logs={dashboardAdminData.systemLogs} />
        </div>
      </div>
    </main>
  );
}

export default DashboardAdmin;
