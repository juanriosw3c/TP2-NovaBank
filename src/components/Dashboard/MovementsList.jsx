import { BanknoteArrowDown, ShoppingBag, ArrowLeftRight, WalletCards, HelpCircle } from "lucide-react";
import styles from "./styles/MovementsList.module.css";

const iconMap = {
  salary: BanknoteArrowDown,
  shopping: ShoppingBag,
  transfer: ArrowLeftRight,
  fci: WalletCards,
};

function MovementsList({ movements }) {
  return (
    <section className={styles.movementsPanel}>
      <div className={styles.panelHeader}>
        <h2>Últimos movimientos</h2>
        <button type="button">Ver todos</button>
      </div>

      <div className={styles.movementList}>
        {movements.map((movement, index) => {
          const IconComponent = iconMap[movement.icon] || HelpCircle;

          return (
            <article className={styles.movementItem} key={`${movement.title}-${index}`}>
              {/* Combinamos clase fija y la variante de color de fondo */}
              <span className={`${styles.movementIcon} ${styles[movement.type]}`}>
                <IconComponent size={21} />
              </span>

              <div>
                <h3>{movement.title}</h3>
                <p>{movement.date}</p>
              </div>

              <strong className={styles[movement.type]}>{movement.amount}</strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default MovementsList;