import { Home, User, Activity, ArrowLeftRight, CreditCard, BarChart3, X } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./styles/DashboardNavbar.module.css";

function Sidebar({ isOpen, onClose, isAdmin = false }) {
  if (!isOpen) return null; // Si no está abierta, no dibuja nada

  return (
    <aside className={styles.sidebarMenu}>
      {/* Botón para cerrar la sidebar en móviles si es necesario */}
      <button type="button" onClick={onClose} className={styles.closeSidebarBtn} style={{ display: 'none' }}>
        <X size={20} />
      </button>

      <nav>
        {isAdmin ? (
          <>
            <a href="#inicio" className={styles.active}>
              <Home size={18} style={{ marginRight: '12px' }} /> Panel Principal
            </a>
            <a href="#usuarios">
              <User size={18} style={{ marginRight: '12px' }} /> Gestión de Usuarios
            </a>
            <a href="#logs">
              <Activity size={18} style={{ marginRight: '12px' }} /> Logs del Sistema
            </a>
          </>
        ) : (
          <>
            <a href="#inicio" className={styles.active}>
              <Home size={18} style={{ marginRight: '12px' }} /> Inicio
            </a>
            <a href="#transferencias">
              <ArrowLeftRight size={18} style={{ marginRight: '12px' }} /> Transferencias
            </a>
            <Link to="/tarjetas" onClick={onClose}>
              <CreditCard size={18} style={{ marginRight: '12px' }} /> Mis Tarjetas
            </Link>
            <a href="#inversiones">
              <BarChart3 size={18} style={{ marginRight: '12px' }} /> Inversiones
            </a>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
