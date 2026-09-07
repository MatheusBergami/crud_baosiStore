export interface Pedido {
  id: number;
  clienteId: number;
  clienteNome: string;
  produtoId: number;
  produtoNome: string;
  quantidade: number;
}

export interface PedidoRequest {
  clienteId: number;
  produtoId: number;
  quantidade: number;
}
