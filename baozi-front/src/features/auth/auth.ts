import { API_URL, apiFetch } from "../../api/api";
import type { AuthUser, LoginResponse } from "./types";

const USER_KEY = "baozi_user";
const TOKEN_KEY = "baozi_token";

export async function login(email: string, senha: string): Promise<AuthUser> {
  const response = await apiFetch<LoginResponse>(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });

  const user: AuthUser = { email: response.email, role: response.role };
  localStorage.setItem(TOKEN_KEY, response.token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export async function register(email: string, senha: string): Promise<void> {
  await apiFetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
}

export function getCurrentUser(): AuthUser | null {
  const value = localStorage.getItem(USER_KEY);
  if (!value || !localStorage.getItem(TOKEN_KEY)) return null;

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    logout();
    return null;
  }
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
