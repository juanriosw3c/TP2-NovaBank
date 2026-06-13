import styles from "./styles/AdminMetricCard.module.css";

function AdminMetricCard({ metrics }) {
  return (
    <div className={styles.metricGrid}>
      {metrics.map((metric) => (
        <div key={metric.id} className={styles.metricCard}>
          <p>{metric.label}</p>
          <h3 className={styles[metric.variant]}>{metric.value}</h3>
          <span>{metric.change}</span>
        </div>
      ))}
    </div>
  );
}

export default AdminMetricCard;