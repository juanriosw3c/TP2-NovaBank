import styles from "./styles/CardSummary.module.css";

function CardSummary({ card, credit }) {
  return (
    <section className={styles.cardPanel}>
      <h2>Mi tarjeta</h2>

      <div className={styles.debitCard}>
        <p>{card.type}</p>
        <strong>{card.number}</strong>
        <div>
          <span>{card.holder}</span>
          <span>Vence {card.expires}</span>
        </div>
      </div>

      <div className={styles.creditUsage}>
        <div>
          <span>Límite usado</span>
          <strong>{credit.used} / {credit.total}</strong>
        </div>
        <progress value={credit.percent} max="100" />
        <p>{credit.percent}% del límite utilizado</p>
      </div>
    </section>
  );
}

export default CardSummary;