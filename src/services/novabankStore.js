const STORAGE_KEY = "novabank_data_v1";
const SESSION_KEY = "novabank_session";

const seedData = {
  clients: [
    {
      id: "cliente-1",
      name: "Federico Garcia",
      initials: "FG",
      email: "cliente@novabank.com",
      password: "cliente123",
      status: "Cuenta activa",
    },
    {
      id: "cliente-2",
      name: "Martina Ruiz",
      initials: "MR",
      email: "martina@novabank.com",
      password: "martina123",
      status: "Cuenta activa",
    },
    {
      id: "cliente-3",
      name: "Nicolas Perez",
      initials: "NP",
      email: "nicolas@novabank.com",
      password: "nicolas123",
      status: "Cuenta activa",
    },
  ],
  accounts: [
    {
      id: "cuenta-1",
      clientId: "cliente-1",
      alias: "fede.nova.bank",
      cbu: "0000003100012345678901",
      bank: "NovaBank",
      balance: 1248370.5,
    },
    {
      id: "cuenta-2",
      clientId: "cliente-2",
      alias: "martina.nova.bank",
      cbu: "0000003100098765432109",
      bank: "NovaBank",
      balance: 485000,
    },
    {
      id: "cuenta-3",
      clientId: "cliente-3",
      alias: "nicolas.nova.bank",
      cbu: "0000003100044455566677",
      bank: "NovaBank",
      balance: 350000,
    },
  ],
  contacts: [
    {
      id: "contacto-1",
      ownerClientId: "cliente-1",
      accountId: "cuenta-2",
      reference: "Martina facultad",
      isFavorite: true,
    },
  ],
  transfers: [
    {
      id: "mov-1",
      fromAccountId: "cuenta-1",
      toAccountId: "cuenta-2",
      amount: 20000,
      message: "Pago compartido",
      createdAt: "2026-06-10T11:05:00.000Z",
    },
  ],
};

export function ensureBankData() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  }

  const data = JSON.parse(saved);
  let changed = false;

  seedData.clients.forEach((seedClient) => {
    if (!data.clients.some((client) => client.id === seedClient.id)) {
      data.clients.push(seedClient);
      changed = true;
    }
  });

  seedData.accounts.forEach((seedAccount) => {
    if (!data.accounts.some((account) => account.id === seedAccount.id)) {
      data.accounts.push(seedAccount);
      changed = true;
    }
  });

  if (changed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  return data;
}

function saveBankData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("novabank:data-changed"));
  return data;
}

export function loginClient(email, password) {
  const data = ensureBankData();
  const client = data.clients.find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
  );

  if (!client) return null;

  localStorage.setItem(SESSION_KEY, JSON.stringify({ clientId: client.id }));
  return client;
}

export function getCurrentClient() {
  const data = ensureBankData();
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  const clientId = session?.clientId || "cliente-1";
  return data.clients.find((client) => client.id === clientId) || data.clients[0];
}

export function getAccountByClient(clientId) {
  const data = ensureBankData();
  return data.accounts.find((account) => account.clientId === clientId);
}

export function formatMoney(value) {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
}

export function getDashboardData() {
  const data = ensureBankData();
  const client = getCurrentClient();
  const account = data.accounts.find((item) => item.clientId === client.id);
  const accountTransfers = data.transfers
    .filter((transfer) => transfer.fromAccountId === account.id || transfer.toAccountId === account.id)
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const movements = accountTransfers.map((transfer) => {
    const isIncome = transfer.toAccountId === account.id;
    const otherAccount = data.accounts.find((item) =>
      isIncome ? item.id === transfer.fromAccountId : item.id === transfer.toAccountId
    );
    const otherClient = data.clients.find((item) => item.id === otherAccount?.clientId);

    return {
      title: isIncome ? `Transferencia de ${otherClient?.name || "Cliente"}` : `Transferencia a ${otherClient?.name || "Cliente"}`,
      date: new Date(transfer.createdAt).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      amount: `${isIncome ? "+" : "-"}${formatMoney(transfer.amount)}`,
      type: isIncome ? "income" : "transfer",
      icon: "transfer",
    };
  });

  return {
    client,
    account,
    balance: formatMoney(account.balance),
    movements,
  };
}

export function getContacts(ownerClientId) {
  const data = ensureBankData();

  return data.contacts
    .filter((contact) => contact.ownerClientId === ownerClientId)
    .map((contact) => {
      const account = data.accounts.find((item) => item.id === contact.accountId);
      const client = data.clients.find((item) => item.id === account?.clientId);

      return {
        ...contact,
        name: client?.name || "Contacto",
        alias: account?.alias || "",
        cbu: account?.cbu || "",
        bank: account?.bank || "NovaBank",
        account,
      };
    });
}

export function findRecipient(query, ownerClientId) {
  const data = ensureBankData();
  const normalized = query.trim().toLowerCase();

  if (!normalized) return null;

  const account = data.accounts.find(
    (item) =>
      item.clientId !== ownerClientId &&
      (item.alias.toLowerCase() === normalized || item.cbu.toLowerCase() === normalized)
  );

  if (!account) return null;

  const client = data.clients.find((item) => item.id === account.clientId);

  return {
    account,
    name: client?.name || "Cliente NovaBank",
    alias: account.alias,
    bank: account.bank,
  };
}

export function upsertContact(ownerClientId, accountId, reference, isFavorite = false) {
  const data = ensureBankData();
  const current = data.contacts.find(
    (contact) => contact.ownerClientId === ownerClientId && contact.accountId === accountId
  );

  if (current) {
    current.reference = reference || current.reference;
    current.isFavorite = current.isFavorite || isFavorite;
  } else {
    data.contacts.push({
      id: `contacto-${Date.now()}`,
      ownerClientId,
      accountId,
      reference,
      isFavorite,
    });
  }

  saveBankData(data);
}

export function updateContactReference(contactId, reference) {
  const data = ensureBankData();
  const contact = data.contacts.find((item) => item.id === contactId);

  if (contact) {
    contact.reference = reference;
    saveBankData(data);
  }
}

export function toggleFavorite(contactId) {
  const data = ensureBankData();
  const contact = data.contacts.find((item) => item.id === contactId);

  if (contact) {
    contact.isFavorite = !contact.isFavorite;
    saveBankData(data);
  }
}

export function deleteContact(contactId) {
  const data = ensureBankData();
  data.contacts = data.contacts.filter((contact) => contact.id !== contactId);
  saveBankData(data);
}

export function confirmClientPassword(clientId, password) {
  const data = ensureBankData();
  return data.clients.some((client) => client.id === clientId && client.password === password);
}

export function executeTransfer({ fromAccountId, toAccountId, amount, message }) {
  const data = ensureBankData();
  const fromAccount = data.accounts.find((account) => account.id === fromAccountId);
  const toAccount = data.accounts.find((account) => account.id === toAccountId);

  if (!fromAccount || !toAccount || fromAccount.balance < amount) {
    return false;
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;
  data.transfers.push({
    id: `mov-${Date.now()}`,
    fromAccountId,
    toAccountId,
    amount,
    message,
    createdAt: new Date().toISOString(),
  });

  saveBankData(data);
  return true;
}
