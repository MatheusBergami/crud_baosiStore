export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export function getAuthToken(): string | null {
  return localStorage.getItem("baozi_token");
}

export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let message = `Erro HTTP: ${response.status}`;

    try {
      const error = await response.json();

      if (error.message) {
        message = error.message;
      }
    } catch {
      // A resposta não possui JSON
    }

    throw new Error(message);
  }

  // DELETE pode retornar 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
