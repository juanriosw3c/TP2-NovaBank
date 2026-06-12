import { useState } from "react";
import { Bell, Menu, LogOut, User, Settings, X, Home, ArrowLeftRight, CreditCard, BarChart3 } from "lucide-react";
import logo from "../../assets/logo.png";

// 1. IMPORTAMOS EL MÓDULO CSS COMO UN OBJETO JS
import styles from "../Dashboard/styles/DashboardNavbar.module.css"; 

function DashboardNavbar({ userInitials = "FG" }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    // 2. USAMOS LAS PROPIEDADES DEL OBJETO STYLES
    <header className={styles.dashboardNavbar}>
      <div className={styles.dashboardBrand}>
        <button 
          className={styles.iconButton} 
          type="button" 
          aria-label="Abrir menu"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <X size={22} /> : <Menu size={22} />}
        </button>
        <img src={logo} alt="NovaBank" />
      </div>

      <div className={styles.dashboardActions}>
        <button
          className={styles.notificationButton}
          type="button"
          aria-label="Notificaciones"
          onClick={() => setUnreadNotifications(false)}
        >
          <Bell size={21} />
          {unreadNotifications && <span />}
        </button>

        <div className={styles.profileContainer}>
          <button 
            className={styles.profileButton} 
            type="button" 
            aria-label="Perfil"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {userInitials}
          </button>

          {showProfileMenu && (
            <div className={styles.profileDropdown}>
              <button type="button">
                <User size={16} /> Mi perfil
              </button>
              <button type="button">
                <Settings size={16} /> Configuración
              </button>
              <hr />
              <button type="button" className={styles.logoutBtn}>
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {showSidebar && (
        <aside className={styles.sidebarMenu}>
          <nav>
            <a href="#inicio" className={styles.active}>
              <Home size={18} style={{ marginRight: '12px' }} /> Inicio
            </a>
            <a href="#transferencias">
              <ArrowLeftRight size={18} style={{ marginRight: '12px' }} /> Transferencias
            </a>
            <a href="#tarjetas">
              <CreditCard size={18} style={{ marginRight: '12px' }} /> Mis Tarjetas
            </a>
            <a href="#inversiones">
              <BarChart3 size={18} style={{ marginRight: '12px' }} /> Inversiones
            </a>
          </nav>
        </aside>
      )}
    </header>
  );
}

export default DashboardNavbar;