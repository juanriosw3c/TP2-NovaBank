import {
  ArrowLeftRight,
  BadgeDollarSign,
  CreditCard,
  Landmark,
} from "lucide-react";


export const dashboardData = {
  user: {
    name: "Federico García",
    initials: "FG",
    status: "Cuenta activa",
  },
  balance: "$ 1.248.370,50",
  monthlyChange: "+$14.200 este mes",
  updatedAt: "Actualizado hace 2 min",
  stats: [
    { label: "Ingresos", value: "+$85.000", variant: "income" },
    { label: "Gastos", value: "-$70.800", variant: "expense" },
    { label: "Invertido", value: "$320.000", variant: "invested" },
  ],
  quickActions: [
    { label: "Inversiones", icon: Landmark, tone: "purple", path: "/inversiones" },
    { label: "Comprar dólar", icon: BadgeDollarSign, tone: "green", path: "/comprar-dolar" },
    { label: "Tarjetas", icon: CreditCard, tone: "yellow" },
    { label: "Transferir", icon: ArrowLeftRight, tone: "blue" },
    { label: "Mis movimientos", icon: ArrowLeftRight, tone: "violet" },
  ],
  movements: [
    {
      title: "Acreditación sueldo",
      date: "Hoy, 09:14",
      amount: "+$85.000",
      type: "income",
      icon: "salary",
    },
    {
      title: "Mercado Libre",
      date: "Ayer, 18:52",
      amount: "-$12.490",
      type: "expense",
      icon: "shopping",
    },
    {
      title: "Pedidos Ya",
      date: "Ayer, 13:30",
      amount: "-$4.200",
      type: "expense",
      icon: "shopping",
    },
    {
      title: "Transferencia a Martín",
      date: "10 jun, 11:05",
      amount: "-$20.000",
      type: "transfer",
      icon: "transfer",
    },
    {
      title: "Renta FCI Conservador",
      date: "9 jun, 08:00",
      amount: "+$5.840",
      type: "income",
      icon: "fci",
    },
  ],
  card: {
    type: "Débito NovaBank",
    number: "•••• •••• •••• 3456",
    holder: "Federico García",
    expires: "08/28",
  },
  credit: {
    used: "$38.000",
    total: "$100.000",
    percent: 38,
  },
  investments: [
    { name: "FCI Conservador", value: "$200.000", tone: "purple" },
    { name: "Dólar MEP", value: "USD 120", tone: "green" },
    { name: "Plazo fijo", value: "$120.000", tone: "yellow" },
  ],
};

