import type { Produto, ProdutoRequest } from "../types/Produto";

import { API_URL, apiFetch } from "../../../api/api";

const PRODUTOS_URL = `${API_URL}/produtos`;

export function getProdutos(): Promise<Produto[]> {
  return apiFetch<Produto[]>(PRODUTOS_URL);
}

export function getProduto(id: number): Promise<Produto> {
  return apiFetch<Produto>(`${PRODUTOS_URL}/${id}`);
}

export function createProduto(data: ProdutoRequest): Promise<Produto> {
  return apiFetch<Produto>(PRODUTOS_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduto(
  id: number,
  data: ProdutoRequest,
): Promise<Produto> {
  return apiFetch<Produto>(`${PRODUTOS_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProduto(id: number): Promise<void> {
  return apiFetch<void>(`${PRODUTOS_URL}/${id}`, {
    method: "DELETE",
  });
}
