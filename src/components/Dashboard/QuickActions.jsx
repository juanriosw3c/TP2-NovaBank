import styles from "../Dashboard/styles/QuickActions.module.css"; // 1. Importamos el módulo

function QuickActions({ actions }) {
  return (
    <section className={styles.dashboardSection}>
      <h2 className={styles.sectionTitle}>Accesos rápidos</h2>
      
      <div className={styles.quickActions}>
        {actions.map((action) => {
          // Si pasás los componentes de Lucide en la data, los recuperamos acá
          const Icon = action.icon; 

          return (
            <button 
              key={action.id || action.label} 
              type="button" 
              className={styles.quickAction}
            >
              {/* Combinamos la clase base del ícono con su color dinámico */}
              <div className={`${styles.quickActionIcon} ${styles[action.tone]}`}>
                <Icon size={24} />
              </div>
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;