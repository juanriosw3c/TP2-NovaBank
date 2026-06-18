import { useState } from "react";
import { Bell, Menu, LogOut, User, Settings, X } from "lucide-react";
import logo from "../../assets/logo.png";
import styles from "../Dashboard/styles/DashboardNavbar.module.css";
import { useNavigate } from "react-router-dom";

function DashboardNavbar({
  userInitials = "FG",
  onToggleSidebar,
  isSidebarOpen,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ficticiamente acá se borrarían tokens o sesiones en el futuro
    navigate("/login");
  };

  return (
    <header className={styles.dashboardNavbar}>
      <div className={styles.dashboardBrand}>
        <button
          className={styles.iconButton}
          type="button"
          aria-label="Abrir menu"
          onClick={onToggleSidebar} // 2. Ejecuta la acción del padre
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
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
              <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;
