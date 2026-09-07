import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import type { AuthUser } from "../../features/auth/types";

interface LayoutProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function Layout({ user, onLogout }: LayoutProps) {
  return (
    <div className="w-full min-h-screen flex bg-gray-50">
      <Sidebar user={user} />

      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        <Header user={user} onLogout={onLogout} />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
