import styles from "./styles/InvestmentsList.module.css"; // 

function InvestmentsList({ investments }) {
  return (
    <section className={styles.investmentsPanel}>
      <h2>Inversiones activas</h2>

      <div className={styles.investmentList}>
        {investments.map((investment) => (
          <div className={styles.investmentItem} key={investment.name}>
            {/* Buscamos el color del círculo de forma dinámica */}
            <span className={styles[investment.tone]} />
            <p>{investment.name}</p>
            <strong>{investment.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InvestmentsList;