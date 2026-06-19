import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  MoreVertical,
  Search,
  Send,
  Star,
  X,
} from "lucide-react";

import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import {
  confirmClientPassword,
  deleteContact,
  executeTransfer,
  findRecipient,
  formatMoney,
  getAccountByClient,
  getContacts,
  getCurrentClient,
  toggleFavorite,
  updateContactReference,
  upsertContact,
} from "../../services/novabankStore";
import "./Transferir.css";

const initialDraft = {
  query: "",
  recipient: null,
  addContact: false,
  reference: "",
  amount: "",
  message: "",
  password: "",
};

function Transferir() {
  const navigate = useNavigate();
  const client = getCurrentClient();
  const account = getAccountByClient(client.id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [contacts, setContacts] = useState(() => getContacts(client.id));
  const [activeTab, setActiveTab] = useState("contacts");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState("search");
  const [draft, setDraft] = useState(initialDraft);
  const [error, setError] = useState("");

  const refreshContacts = () => setContacts(getContacts(client.id));

  const filteredContacts = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return contacts.filter((contact) => {
      if (activeTab === "favorites" && !contact.isFavorite) return false;
      if (!normalized) return true;

      return [contact.name, contact.alias, contact.cbu, contact.reference]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [activeTab, contacts, search]);

  const openNewTransfer = () => {
    setDraft(initialDraft);
    setStep("search");
    setError("");
    setModalOpen(true);
  };

  const startContactTransfer = (contact) => {
    setDraft({
      ...initialDraft,
      recipient: {
        account: contact.account,
        name: contact.name,
        alias: contact.alias,
        bank: contact.bank,
      },
    });
    setStep("amount");
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDraft(initialDraft);
    setError("");
  };

  const handleSearchRecipient = () => {
    const recipient = findRecipient(draft.query, client.id);

    if (!recipient) {
      setError("No se encontró ninguna cuenta con ese CBU, CVU o Alias.");
      return;
    }

    setDraft((current) => ({ ...current, recipient, reference: recipient.name }));
    setError("");
    setStep("verify");
  };

  const confirmRecipient = () => {
    if (draft.addContact) {
      upsertContact(client.id, draft.recipient.account.id, draft.reference || draft.recipient.name);
      refreshContacts();
    }

    setError("");
    setStep("amount");
  };

  const confirmAmount = () => {
    const amount = Number(draft.amount);

    if (!amount || amount <= 0) {
      setError("Ingresá un monto válido.");
      return;
    }

    if (amount > account.balance) {
      setError("Saldo insuficiente.");
      return;
    }

    setError("");
    setStep("message");
  };

  const finishTransfer = () => {
    if (!confirmClientPassword(client.id, draft.password)) {
      setError("La contraseña ingresada es incorrecta.");
      return;
    }

    const done = executeTransfer({
      fromAccountId: account.id,
      toAccountId: draft.recipient.account.id,
      amount: Number(draft.amount),
      message: draft.message.trim(),
    });

    if (!done) {
      setError("Saldo insuficiente.");
      return;
    }

    setError("");
    setStep("success");
  };

  const handleReferenceEdit = (contact) => {
    const nextReference = window.prompt("Nueva referencia o apodo", contact.reference);

    if (nextReference && nextReference.trim()) {
      updateContactReference(contact.id, nextReference.trim());
      refreshContacts();
    }
  };

  const handleDelete = (contact) => {
    const shouldDelete = window.confirm(`¿Eliminar a ${contact.reference || contact.name} de tus contactos?`);

    if (shouldDelete) {
      deleteContact(contact.id);
      refreshContacts();
    }
  };

  return (
    <main className="client-dashboard transfer-page">
      <DashboardNavbar
        userInitials={client.initials}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isAdmin={false} />

      <div className="dashboard-shell transfer-shell">
        <button type="button" className="transfer-back" onClick={() => navigate("/cliente")}>
          <ArrowLeft size={18} />
          Volver
        </button>

        <section className="transfer-panel">
          <div className="transfer-heading">
            <div>
              <h1>Transferir</h1>
            </div>

            <button type="button" className="transfer-primary" onClick={openNewTransfer}>
              <Send size={18} />
              Transferir a una nueva cuenta
            </button>
          </div>

          <div className="transfer-tabs" role="tablist">
            <button
              type="button"
              className={activeTab === "contacts" ? "active violet" : ""}
              onClick={() => setActiveTab("contacts")}
            >
              Contactos
            </button>
            <button
              type="button"
              className={activeTab === "favorites" ? "active gold" : "gold"}
              onClick={() => setActiveTab("favorites")}
            >
              <Star size={16} />
              Favoritos
            </button>
          </div>

          <label className="transfer-search">
            <Search size={18} />
            <input
              type="text"
              name="novabank_contact_search"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nombre, alias, CBU/CVU o referencia"
            />
          </label>

          <div className="contacts-list">
            {filteredContacts.length === 0 ? (
              <div className="empty-state">No hay contactos para mostrar.</div>
            ) : (
              filteredContacts.map((contact) => (
                <article
                  className="contact-row"
                  key={contact.id}
                  onClick={() => startContactTransfer(contact)}
                  tabIndex={0}
                >
                  <div>
                    <h3>{contact.reference || contact.name}</h3>
                    <p>{contact.name}</p>
                    <span>{contact.alias}</span>
                    <small>{contact.bank}</small>
                  </div>

                  <div className="contact-actions">
                    <button
                      type="button"
                      className={contact.isFavorite ? "star-button active" : "star-button"}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFavorite(contact.id);
                        refreshContacts();
                      }}
                      aria-label="Marcar favorito"
                    >
                      <Star size={21} fill={contact.isFavorite ? "currentColor" : "none"} />
                    </button>

                    <div className="contact-menu">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setMenuOpen(menuOpen === contact.id ? null : contact.id);
                        }}
                        aria-label="Opciones"
                      >
                        <MoreVertical size={22} />
                      </button>

                      {menuOpen === contact.id && (
                        <div className="contact-dropdown" onClick={(event) => event.stopPropagation()}>
                          <button type="button" onClick={() => handleReferenceEdit(contact)}>
                            Modificar referencia
                          </button>
                          <button type="button" onClick={() => handleDelete(contact)}>
                            Eliminar contacto
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      {modalOpen && (
        <div className="transfer-modal-backdrop" role="dialog" aria-modal="true">
          <section className="transfer-modal">
            <button type="button" className="modal-close" onClick={closeModal} aria-label="Cerrar">
              <X size={20} />
            </button>

            {step === "search" && (
              <>
                <h2>Transferir a una nueva cuenta</h2>
                <label className="modal-field">
                  Ingrese CBU, CVU o Alias
                  <input
                    type="text"
                    name="novabank_recipient_lookup"
                    autoComplete="off"
                    value={draft.query}
                    onChange={(event) => setDraft((current) => ({ ...current, query: event.target.value }))}
                    placeholder="alias o CBU/CVU"
                  />
                </label>
                {error && <p className="form-error">{error}</p>}
                <button type="button" className="transfer-primary full" onClick={handleSearchRecipient}>
                  Continuar
                </button>
              </>
            )}

            {step === "verify" && (
              <>
                <h2>Verificá los datos</h2>
                <div className="recipient-card">
                  <p>Nombre</p>
                  <strong>{draft.recipient.name}</strong>
                  <p>Alias</p>
                  <strong>{draft.recipient.alias}</strong>
                  <p>Banco</p>
                  <strong>{draft.recipient.bank}</strong>
                </div>

                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={draft.addContact}
                    onChange={(event) => setDraft((current) => ({ ...current, addContact: event.target.checked }))}
                  />
                  Agendar contacto
                </label>

                {draft.addContact && (
                  <label className="modal-field">
                    Referencia o apodo
                    <input
                      type="text"
                      name="novabank_contact_reference"
                      autoComplete="off"
                      value={draft.reference}
                      onChange={(event) => setDraft((current) => ({ ...current, reference: event.target.value }))}
                    />
                  </label>
                )}

                <div className="modal-actions">
                  <button type="button" className="transfer-secondary" onClick={() => setStep("search")}>
                    Volver
                  </button>
                  <button type="button" className="transfer-primary" onClick={confirmRecipient}>
                    Confirmar
                  </button>
                </div>
              </>
            )}

            {step === "amount" && (
              <>
                <h2>Ingresá el monto</h2>
                <div className="available-balance">
                  <span>Saldo disponible</span>
                  <strong>{formatMoney(account.balance)}</strong>
                </div>
                <label className="modal-field">
                  Monto
                  <input
                    type="number"
                    name="novabank_transfer_amount"
                    autoComplete="off"
                    min="1"
                    step="1"
                    value={draft.amount}
                    onChange={(event) =>
                      setDraft((current) => ({ ...current, amount: event.target.value.replace(/\D/g, "") }))
                    }
                    placeholder="0"
                  />
                </label>
                {error && <p className="form-error">{error}</p>}
                <button type="button" className="transfer-primary full" onClick={confirmAmount}>
                  Continuar
                </button>
              </>
            )}

            {step === "message" && (
              <>
                <h2>Agregar un mensaje (opcional)</h2>
                <label className="modal-field">
                  Mensaje
                  <textarea
                    value={draft.message}
                    onChange={(event) => setDraft((current) => ({ ...current, message: event.target.value }))}
                    rows="4"
                    placeholder="Escribí un mensaje"
                  />
                </label>
                <button type="button" className="transfer-primary full" onClick={() => setStep("summary")}>
                  Continuar
                </button>
              </>
            )}

            {step === "summary" && (
              <>
                <h2>Verificá los datos</h2>
                <div className="summary-list">
                  <span>Destinatario</span>
                  <strong>{draft.recipient.name}</strong>
                  <span>Alias</span>
                  <strong>{draft.recipient.alias}</strong>
                  <span>Banco</span>
                  <strong>{draft.recipient.bank}</strong>
                  <span>Monto</span>
                  <strong>{formatMoney(Number(draft.amount))}</strong>
                  {draft.message.trim() && (
                    <>
                      <span>Mensaje</span>
                      <strong>{draft.message.trim()}</strong>
                    </>
                  )}
                </div>
                <button type="button" className="transfer-primary full" onClick={() => setStep("password")}>
                  Confirmar transferencia
                </button>
              </>
            )}

            {step === "password" && (
              <>
                <h2>Confirmá tu contraseña</h2>
                <label className="modal-field">
                  Contraseña
                  <input
                    type="password"
                    name="novabank_transfer_password"
                    autoComplete="current-password"
                    value={draft.password}
                    onChange={(event) => setDraft((current) => ({ ...current, password: event.target.value }))}
                    placeholder="Ingresá tu contraseña"
                  />
                </label>
                {error && <p className="form-error">{error}</p>}
                <button type="button" className="transfer-primary full" onClick={finishTransfer}>
                  Confirmar
                </button>
              </>
            )}

            {step === "success" && (
              <div className="success-state">
                <CheckCircle2 size={58} />
                <h2>Transferencia realizada con éxito.</h2>
                <button type="button" className="transfer-primary full" onClick={() => navigate("/cliente")}>
                  Aceptar
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export default Transferir;
