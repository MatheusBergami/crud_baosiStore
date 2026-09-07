import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../auth";

export default function AdminRoute() {
  return getCurrentUser()?.role === "ADMIN" ? <Outlet /> : <Navigate to="/pedidos" replace />;
}
