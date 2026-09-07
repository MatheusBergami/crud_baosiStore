import { useState, type FormEvent } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { login, register } from "../auth";
import type { AuthUser } from "../types";

interface AuthPageProps {
  onAuthenticated: (user: AuthUser) => void;
}

export default function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (mode === "register" && senha !== confirmacao) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      if (mode === "login") {
        onAuthenticated(await login(email, senha));
      } else {
        await register(email, senha);
        setMode("login");
        setSenha("");
        setConfirmacao("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível concluir a ação.");
    } finally {
      setLoading(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            {isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Baozi Store</h1>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin ? "Entre para acessar sua conta." : "Crie sua conta para fazer pedidos."}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Senha
            <input className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="password" minLength={6} value={senha} onChange={(event) => setSenha(event.target.value)} required />
          </label>
          {!isLogin && <label className="block text-sm font-medium text-slate-700">
            Confirmar senha
            <input className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="password" minLength={6} value={confirmacao} onChange={(event) => setConfirmacao(event.target.value)} required />
          </label>}
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60">
            {loading ? "Aguarde..." : isLogin ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {isLogin ? "Ainda não possui uma conta?" : "Já possui uma conta?"}{" "}
          <button className="font-semibold text-blue-600 hover:text-blue-700" onClick={() => { setMode(isLogin ? "register" : "login"); setError(""); }}>
            {isLogin ? "Criar conta" : "Entrar"}
          </button>
        </p>
      </section>
    </main>
  );
}
