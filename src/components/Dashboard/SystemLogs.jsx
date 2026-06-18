import { Shield, AlertTriangle, Cpu, UserCheck } from "lucide-react";
import styles from "./styles/SystemLogs.module.css";

const logIconMap = {
  security: Shield,
  error: AlertTriangle,
  system: Cpu,
  user: UserCheck,
};

function SystemLogs({ logs }) {
  return (
    <section className={styles.panel}>
      <h2>Logs e Historial del Sistema</h2>
      <div className={styles.list}>
        {logs.map((log) => {
          const LogIcon = logIconMap[log.type] || Shield;
          
          return (
            <article className={styles.item} key={log.id}>
              <span className={`${styles.icon} ${styles[log.status]}`}>
                <LogIcon size={21} />
              </span>
              
              <div>
                <h3>{log.action}</h3>
                <p>{log.time}</p>
              </div>
              
              <strong className={`${styles.statusText} ${styles[log.status]}`}>
                {log.status.toUpperCase()}
              </strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SystemLogs;