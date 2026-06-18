import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "../Dashboard/styles/BalanceCard.module.css"; // 1. Importamos el módulo

function BalanceCard({ balance, monthlyChange, updatedAt, stats }) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <section className={styles.balanceCard}>
      <div className={styles.balanceGlow} />

      <div className={styles.balanceContent}>
        <div className={styles.balanceHeaderRow}>
          <p className={styles.eyebrow}>Saldo disponible</p>
          <button 
            type="button" 
            className={styles.toggleBalanceBtn}
            onClick={() => setShowBalance(!showBalance)}
            aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        <h2>{showBalance ? balance : "$ ••••••••"}</h2>

        <div className={styles.balanceMeta}>
          <span className={styles.positivePill}>{monthlyChange}</span>
          <span>{updatedAt}</span>
        </div>

        <div className={styles.balanceStats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.balanceStat}>
              <span>{stat.label}</span>
              {/* Mapeamos la variante (income, expense, invested) dinámicamente desde el objeto styles */}
              <strong className={styles[stat.variant]}>
                {showBalance ? stat.value : "••••"}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BalanceCard;