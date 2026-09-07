import { useEffect, useState } from "react";

import type { Cliente } from "../../clientes/types/Cliente";
import type { Produto } from "../../produtos/types/Produto";

import type { Pedido, PedidoRequest } from "../types/Pedido";

import { getClientes } from "../../clientes/api/clienteApi";
import { getProdutos } from "../../produtos/api/produtoApi";

import "../../../components/Form/Form.css";

interface PedidoFormProps {
  pedido?: Pedido | null;
  onSubmit: (data: PedidoRequest) => Promise<void>;
  onCancel: () => void;
}

export default function PedidoForm({
  pedido,
  onSubmit,
  onCancel,
}: PedidoFormProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [clienteId, setClienteId] = useState(
    pedido ? String(pedido.clienteId) : "",
  );

  const [produtoId, setProdutoId] = useState(
    pedido ? String(pedido.produtoId) : "",
  );

  const [quantidade, setQuantidade] = useState(
    pedido ? String(pedido.quantidade) : "1",
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [clientesData, produtosData] = await Promise.all([
          getClientes(),
          getProdutos(),
        ]);

        setClientes(clientesData);
        setProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao carregar dados do pedido:", error);
      }
    }

    loadData();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        clienteId: Number(clienteId),
        produtoId: Number(produtoId),
        quantidade: Number(quantidade),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="pedido-cliente">
          Cliente *
        </label>

        <select
          id="pedido-cliente"
          value={clienteId}
          onChange={(event) => setClienteId(event.target.value)}
          required
        >
          <option value="">
            Selecionar cliente
          </option>

          {clientes.map((cliente) => (
            <option
              key={cliente.id}
              value={cliente.id}
            >
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="pedido-produto">
          Produto *
        </label>

        <select
          id="pedido-produto"
          value={produtoId}
          onChange={(event) => setProdutoId(event.target.value)}
          required
        >
          <option value="">
            Selecionar produto
          </option>

          {produtos.map((produto) => (
            <option
              key={produto.id}
              value={produto.id}
            >
              {produto.nome} — R${" "}
              {produto.preco.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="pedido-quantidade">
          Quantidade *
        </label>

        <input
          id="pedido-quantidade"
          type="number"
          min="1"
          value={quantidade}
          onChange={(event) =>
            setQuantidade(event.target.value)
          }
          required
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="button-secondary"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="button-primary"
        >
          {loading
            ? "Salvando..."
            : pedido
              ? "Salvar alterações"
              : "Criar Pedido"}
        </button>
      </div>
    </form>
  );
}