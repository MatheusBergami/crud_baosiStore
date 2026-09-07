import type { Pedido, PedidoRequest } from "../types/Pedido";

import { API_URL, apiFetch } from "../../../api/api";

const PEDIDO_URL = `${API_URL}/pedidos`;

export function getPedidos(): Promise<Pedido[]> {
  return apiFetch<Pedido[]>(PEDIDO_URL);
}

export function getPedido(id: number): Promise<Pedido> {
  return apiFetch<Pedido>(`${PEDIDO_URL}/${id}`);
}

export function createPedido(data: PedidoRequest): Promise<Pedido> {
  return apiFetch<Pedido>(PEDIDO_URL, {
    method: "POST",

    body: JSON.stringify(data),
  });
}

export function updatePedido(
  id: number,
  data: PedidoRequest,
): Promise<Pedido> {
  return apiFetch<Pedido>(`${PEDIDO_URL}/${id}`, {
    method: "PUT",

    body: JSON.stringify(data),
  });
}

export function deletePedido(id: number): Promise<void> {
  return apiFetch<void>(`${PEDIDO_URL}/${id}`, {
    method: "DELETE",
  });
}
