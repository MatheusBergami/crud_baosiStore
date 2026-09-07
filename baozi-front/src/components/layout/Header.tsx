import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import type { AuthUser } from "../../features/auth/types";
import { logout } from "../../features/auth/auth";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/clientes": "Clientes",
  "/produtos": "Produtos",
  "/pedidos": "Pedidos",
};

interface HeaderProps { user: AuthUser; onLogout: () => void; }

export default function Header({ user, onLogout }: HeaderProps) {
  const location = useLocation();

  const title = pageTitles[location.pathname] ?? "Baozi Store";

  return (
    <header className="h-18.25 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-4">
        <div className="text-right text-sm"><p className="font-medium text-gray-800">{user.email}</p><p className="text-xs text-gray-500">{user.role === "ADMIN" ? "Administrador" : "Usuário comum"}</p></div>
        <button aria-label="Sair" className="text-gray-500 hover:text-red-600" onClick={() => { logout(); onLogout(); }}><LogOut size={19} /></button>
      </div>
    </header>
  );
}
