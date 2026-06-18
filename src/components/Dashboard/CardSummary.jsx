import { useState } from "react";
import {
  CreditCard,
  Eye,
  EyeOff,
  Snowflake,
  TriangleAlert,
} from "lucide-react";
import styles from "./styles/CardSummary.module.css";

const CLIENT_PASSWORD = "cliente123";

function CardSummary({ cards, setCards }) {
  const [visibleNumbers, setVisibleNumbers] = useState({});
  const [visibleCvvs, setVisibleCvvs] = useState({});
  const [cvvPassword, setCvvPassword] = useState("");
  const [freezePassword, setFreezePassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [newCardType, setNewCardType] = useState("debito");

  const formatNumber = (number) => number.replace(/(.{4})/g, "$1 ").trim();

  const generateDigits = (length) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

  const generateUniqueValue = (length, usedValues, prefix = "") => {
    let value = `${prefix}${generateDigits(length - prefix.length)}`;

    while (usedValues.has(value)) {
      value = `${prefix}${generateDigits(length - prefix.length)}`;
    }

    return value;
  };

  const toggleNumber = (cardId) => {
    setVisibleNumbers((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const openCVV = (cardId) => {
    setSelectedCard(cardId);
    setCvvPassword("");
    setShowPasswordModal(true);
  };

  const hideCVV = (cardId) => {
    setVisibleCvvs((prev) => ({
      ...prev,
      [cardId]: false,
    }));
  };

  const verifyPassword = () => {
    if (cvvPassword === CLIENT_PASSWORD) {
      setVisibleCvvs((prev) => ({
        ...prev,
        [selectedCard]: true,
      }));

      setShowPasswordModal(false);
      setCvvPassword("");
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  const openFreezeConfirmation = (cardId) => {
    setSelectedCard(cardId);
    setFreezePassword("");
    setShowFreezeModal(true);
  };

  const confirmFreeze = () => {
    if (freezePassword !== CLIENT_PASSWORD) {
      alert("Contraseña incorrecta.");
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === selectedCard
          ? {
              ...card,
              frozen: !card.frozen,
            }
          : card
      )
    );

    setShowFreezeModal(false);
    setFreezePassword("");
  };

  const openDeleteConfirmation = (cardId) => {
    setSelectedCard(cardId);
    setDeletePassword("");
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletePassword !== CLIENT_PASSWORD) {
      alert("Contraseña incorrecta.");
      return;
    }

    setCards((prevCards) => prevCards.filter((card) => card.id !== selectedCard));
    setVisibleNumbers((prev) => ({
      ...prev,
      [selectedCard]: false,
    }));
    setVisibleCvvs((prev) => ({
      ...prev,
      [selectedCard]: false,
    }));
    setShowDeleteModal(false);
    setDeletePassword("");
  };

  const requestNewCard = () => {
    const usedNumbers = new Set(cards.map((card) => card.number));
    const usedCvvs = new Set(cards.map((card) => card.cvv));
    const isCredit = newCardType === "credito";
    const numberPrefix = isCredit ? "5364" : "4509";
    const newNumber = generateUniqueValue(16, usedNumbers, numberPrefix);
    const newCvv = generateUniqueValue(3, usedCvvs);
    const today = new Date();
    const expirationYear = String(today.getFullYear() + 4).slice(-2);
    const expirationMonth = String(today.getMonth() + 1).padStart(2, "0");

    setCards((prevCards) => [
      ...prevCards,
      {
        id: Date.now(),
        type: isCredit ? "Crédito NovaBank" : "Débito NovaBank",
        number: newNumber,
        holder: "Federico García",
        expires: `${expirationMonth}/${expirationYear}`,
        cvv: newCvv,
        frozen: false,
      },
    ]);

    setVisibleNumbers({});
    setVisibleCvvs({});
    setShowRequestModal(false);
    setNewCardType("debito");
  };

  const selectedFreezeCard = cards.find((card) => card.id === selectedCard);
  const selectedDeleteCard = cards.find((card) => card.id === selectedCard);

  return (
    <section className={styles.cardPanel}>
      <div className={styles.cardsList}>
        {cards.map((card) => {
          const hiddenNumber = `**** **** **** ${card.number.slice(-4)}`;

          return (
            <div key={card.id} className={styles.cardRow}>
              <div
                className={`${styles.debitCard} ${
                  card.frozen ? styles.frozen : ""
                }`}
              >
                <p>{card.type}</p>

                <div className={styles.cardNumber}>
                  <strong>
                    {visibleNumbers[card.id]
                      ? formatNumber(card.number)
                      : hiddenNumber}
                  </strong>

                  <button
                    className={styles.eyeButton}
                    onClick={() => toggleNumber(card.id)}
                    type="button"
                    aria-label="Ver u ocultar número de tarjeta"
                  >
                    {visibleNumbers[card.id]
                      ? <EyeOff size={18} />
                      : <Eye size={18} />}
                  </button>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.cardInfo}>
                    <span>{card.holder}</span>
                    <span>Vence {card.expires}</span>
                  </div>

                  <div className={styles.cvvContainer}>
                    <span>CVV: {visibleCvvs[card.id] ? card.cvv : "***"}</span>

                    <button
                      className={styles.eyeButton}
                      onClick={() => {
                        if (visibleCvvs[card.id]) {
                          hideCVV(card.id);
                        } else {
                          openCVV(card.id);
                        }
                      }}
                      type="button"
                      aria-label="Ver u ocultar CVV"
                    >
                      {visibleCvvs[card.id]
                        ? <EyeOff size={18} />
                        : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {card.frozen && (
                  <div className={styles.frozenLabel}>TARJETA CONGELADA</div>
                )}
              </div>

              <div className={styles.cardActions}>
                <button
                  className={styles.freezeButton}
                  onClick={() => openFreezeConfirmation(card.id)}
                  type="button"
                >
                  <Snowflake size={18} />
                  <span>
                    {card.frozen
                      ? "Descongelar tarjeta"
                      : "Congelar tarjeta"}
                  </span>
                </button>

                <button
                  className={styles.deleteButton}
                  onClick={() => openDeleteConfirmation(card.id)}
                  type="button"
                >
                  <TriangleAlert size={18} />
                  <span>Dar de baja</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className={styles.requestButton}
        onClick={() => setShowRequestModal(true)}
        type="button"
      >
        <CreditCard size={18} />
        Solicitar nueva tarjeta
      </button>

      {showPasswordModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Ver CVV</h3>
            <p>
              Por seguridad, ingresá nuevamente la contraseña con la que
              iniciaste sesión.
            </p>

            <input
              type="password"
              placeholder="Contraseña"
              value={cvvPassword}
              onChange={(e) => setCvvPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  verifyPassword();
                }
              }}
            />

            <p className={styles.warning}>No compartas estos datos.</p>

            <div className={styles.modalButtons}>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordModal(false);
                  setCvvPassword("");
                }}
              >
                Cancelar
              </button>

              <button type="button" onClick={verifyPassword}>
                Ver CVV
              </button>
            </div>
          </div>
        </div>
      )}

      {showFreezeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>¿Está seguro?</h3>
            <p>
              Ingresá tu contraseña para confirmar que querés{" "}
              {selectedFreezeCard?.frozen ? "descongelar" : "congelar"} esta
              tarjeta.
            </p>

            <input
              type="password"
              placeholder="Contraseña"
              value={freezePassword}
              onChange={(e) => setFreezePassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  confirmFreeze();
                }
              }}
            />

            <div className={styles.modalButtons}>
              <button
                type="button"
                onClick={() => {
                  setShowFreezeModal(false);
                  setFreezePassword("");
                }}
              >
                Cancelar
              </button>

              <button type="button" onClick={confirmFreeze}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>¿Está seguro?</h3>
            <p>
              Ingresá tu contraseña para confirmar la baja de{" "}
              {selectedDeleteCard?.type}. Esta acción eliminará la tarjeta de
              tu listado.
            </p>

            <input
              type="password"
              placeholder="Contraseña"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  confirmDelete();
                }
              }}
            />

            <div className={styles.modalButtons}>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                }}
              >
                Cancelar
              </button>

              <button type="button" onClick={confirmDelete}>
                Dar de baja
              </button>
            </div>
          </div>
        </div>
      )}

      {showRequestModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Solicitar nueva tarjeta</h3>
            <p>Elegí el tipo de tarjeta que querés solicitar.</p>

            <div className={styles.cardTypeOptions}>
              <button
                className={newCardType === "debito" ? styles.selectedType : ""}
                onClick={() => setNewCardType("debito")}
                type="button"
              >
                Débito
              </button>

              <button
                className={newCardType === "credito" ? styles.selectedType : ""}
                onClick={() => setNewCardType("credito")}
                type="button"
              >
                Crédito
              </button>
            </div>

            <p className={styles.warning}>
              El número de tarjeta y el CVV se generarán automáticamente.
            </p>

            <div className={styles.modalButtons}>
              <button
                type="button"
                onClick={() => {
                  setShowRequestModal(false);
                  setNewCardType("debito");
                }}
              >
                Cancelar
              </button>

              <button type="button" onClick={requestNewCard}>
                Solicitar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CardSummary;
