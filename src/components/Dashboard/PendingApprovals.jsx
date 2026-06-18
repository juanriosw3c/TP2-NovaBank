import { Check, X } from "lucide-react";
import styles from ".//styles/PendingApprovals.module.css";

function PendingApprovals({ approvals }) {
  return (
    <section className={styles.panel}>
      <h2>Usuarios pendientes de aprobación</h2>
      <div className={styles.list}>
        {approvals.map((user) => (
          <article className={styles.item} key={user.id}>
            <div>
              <h3>{user.name}</h3>
              <p>DNI: {user.dni} • {user.email}</p>
              <span>Registrado: {user.date}</span>
            </div>
            
            <div className={styles.actions}>
              <button type="button" className={styles.btnCheck}>
                <Check size={18} />
              </button>
              <button type="button" className={styles.btnCross}>
                <X size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PendingApprovals;