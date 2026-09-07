import { LayoutDashboard, Users, Package, ShoppingCart } from "lucide-react";

import { NavLink } from "react-router-dom";
import type { AuthUser } from "../../features/auth/types";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Clientes",
    path: "/clientes",
    icon: Users,
  },
  {
    label: "Produtos",
    path: "/produtos",
    icon: Package,
  },
  {
    label: "Pedidos",
    path: "/pedidos",
    icon: ShoppingCart,
  },
];

export default function Sidebar({ user }: { user: AuthUser }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shrink-0 flex flex-col">
      {/* Cabeçalho */}
      <div className="h-18.25 px-6 flex items-center border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">Baozi Store</h1>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.filter((item) => user.role === "ADMIN" || !["/clientes", "/produtos"].includes(item.path)).map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "w-full",
                    "flex",
                    "items-center",
                    "gap-3",
                    "px-4",
                    "py-3",
                    "rounded-lg",
                    "text-sm",
                    "font-medium",
                    "transition-colors",
                    "duration-150",

                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100",
                  ].join(" ")
                }
              >
                <Icon size={18} strokeWidth={2} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
