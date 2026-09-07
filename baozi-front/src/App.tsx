import Layout from "./components/layout/Layout";
import { useState } from "react";
import AuthPage from "./features/auth/pages/AuthPage";
import { getCurrentUser } from "./features/auth/auth";
import type { AuthUser } from "./features/auth/types";

function App() {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());

  if (!user) return <AuthPage onAuthenticated={setUser} />;

  return <Layout user={user} onLogout={() => setUser(null)} />;
}

export default App;
