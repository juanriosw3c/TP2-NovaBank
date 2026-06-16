import { createBrowserRouter } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardCliente from "../pages/DashboardCliente/DashboardCliente";
import DashboardAdmin from "../pages/DashboardAdmin/DashboardAdmin";
import Inversiones from "../pages/Inversiones/Inversiones";
import ComprarDolar from "../pages/ComprarDolar/ComprarDolar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/cliente",
    element: <DashboardCliente />,
  },
  {
    path: "/admin",
    element: <DashboardAdmin />,
  },
  {
    path: "/inversiones",
    element: <Inversiones />,
  },
  {
    path: "/comprar-dolar",
    element: <ComprarDolar />,
  }
]);