export const dashboardAdminData = {
  user: {
    name: "Administrador Principal",
    initials: "AD",
    role: "SuperAdmin",
  },
  
  metrics: [
    {
      id: "m1",
      label: "Usuarios Totales",
      value: "14.250",
      change: "+12% esta semana",
      variant: "purple",
    },
    {
      id: "m2",
      label: "Transacciones Hoy",
      value: "$ 4.830.200",
      change: "En tiempo real",
      variant: "green",
    },
    
    {
      id: "m3",
      label: "Alertas del Sistema",
      value: "2",
      change: "Requieren atención",
      variant: "expense", // Reutilizamos el color rojo/rosa que ya tenés en CSS
    },
  ],
  pendingApprovals: [
    {
      id: "u1",
      name: "Tobias Benjamin Vitale",
      dni: "45.123.456",
      date: "Hoy, 18:24",
      email: "tobias@correo.com",
    },
    {
      id: "u2",
      name: "Martín Edgardo Gómez",
      dni: "38.987.654",
      date: "Ayer, 11:05",
      email: "martin.gomez@correo.com",
    },
    {
      id: "u3",
      name: "Lucía Fernández",
      dni: "42.345.890",
      date: "10 jun, 09:15",
      email: "lucia.f@correo.com",
    },
  ],
  systemLogs: [
    {
      id: "l1",
      action: "Usuario TVitales cambió contraseña",
      time: "Hace 5 min",
      type: "security",
      status: "success",
    },
    {
      id: "l2",
      action: "Error de conexión en BD Nodo Norte",
      time: "Hace 22 min",
      type: "error",
      status: "critical",
    },
    {
      id: "l3",
      action: "Respaldo de seguridad completado",
      time: "Hoy, 04:00",
      type: "system",
      status: "success",
    },
    {
      id: "l4",
      action: "Nueva solicitud de alta de cuenta",
      time: "Ayer, 23:14",
      type: "user",
      status: "info",
    },
  ],
};