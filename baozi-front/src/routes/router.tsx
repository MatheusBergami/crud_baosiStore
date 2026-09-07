import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import ClientesPage from "../features/clientes/pages/ClientesPage";
import ProdutosPage from "../features/produtos/pages/ProdutosPage";
import PedidosPage from "../features/pedidos/pages/PedidosPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import AdminRoute from "../features/auth/components/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage/>,
      },
      { element: <AdminRoute />, children: [
        { path: "clientes", element: <ClientesPage /> },
        { path: "produtos", element: <ProdutosPage /> },
      ] },
      {
        path: "pedidos",
        element: <PedidosPage />,
      },
    ],
  },
]);
