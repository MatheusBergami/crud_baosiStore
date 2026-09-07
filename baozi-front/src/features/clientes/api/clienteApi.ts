import type { Cliente, ClienteRequest } from "../types/Cliente";

import { API_URL, apiFetch } from "../../../api/api";

const CLIENTES_URL = `${API_URL}/clientes`;

export function getClientes(): Promise<Cliente[]> {
  return apiFetch<Cliente[]>(CLIENTES_URL);
}

export function getCliente(id: number): Promise<Cliente> {
  return apiFetch<Cliente>(`${CLIENTES_URL}/${id}`);
}

export function createCliente(data: ClienteRequest): Promise<Cliente> {
  return apiFetch<Cliente>(CLIENTES_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCliente(
  id: number,
  data: ClienteRequest,
): Promise<Cliente> {
  return apiFetch<Cliente>(`${CLIENTES_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteCliente(id: number): Promise<void> {
  return apiFetch<void>(`${CLIENTES_URL}/${id}`, {
    method: "DELETE",
  });
}
