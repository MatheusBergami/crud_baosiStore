import { useEffect, useState } from "react";

import type { Pedido, PedidoRequest } from "../types/Pedido";

import {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido,
} from "../api/pedidoApi";


import PedidoTable from "../components/PedidoTable";
import { PedidoModal } from "../components/PedidoModal";
import { getCurrentUser } from "../../auth/auth";

export default function PedidosPage() {
  const canManage = getCurrentUser()?.role === "ADMIN";
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(
    null,
  );

  const [mostrarForm, setMostrarForm] = useState(false);

  const [busca, setBusca] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  async function carregarPedidos() {
    try {
      setLoading(true);
      setError(null);

      const data = await getPedidos();

      setPedidos(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao carregar pedidos.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function handleSubmit(data: PedidoRequest) {
    try {
      if (pedidoSelecionado) {
        const atualizado = await updatePedido(pedidoSelecionado.id, data);

        setPedidos((pedidosAtuais) =>
          pedidosAtuais.map((pedido) =>
            pedido.id === atualizado.id ? atualizado : pedido,
          ),
        );
      } else {
        const novoPedido = await createPedido(data);

        setPedidos((pedidosAtuais) => [...pedidosAtuais, novoPedido]);
      }

      setPedidoSelecionado(null);
      setMostrarForm(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao salvar pedido.");

      throw error;
    }
  }

  function handleEdit(pedido: Pedido) {
    setPedidoSelecionado(pedido);
    setMostrarForm(true);
  }

  async function handleDelete(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este pedido?",
    );

    if (!confirmar) {
      return;
    }

    try {
      await deletePedido(id);

      setPedidos((pedidosAtuais) =>
        pedidosAtuais.filter((pedido) => pedido.id !== id),
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao excluir pedido.");
    }
  }

  function handleNovoPedido() {
    setPedidoSelecionado(null);
    setMostrarForm(true);
  }

  function handleCancelar() {
    setPedidoSelecionado(null);
    setMostrarForm(false);
  }

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const termo = busca.toLowerCase();

    return (
      pedido.clienteNome.toLowerCase().includes(termo) ||
      pedido.produtoNome.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Pesquisar pedidos..."
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          className="
          w-64
          border border-gray-200
          rounded-lg
          px-3 py-2
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
        />

        <button
          onClick={handleNovoPedido}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4 py-2
          rounded-lg
          text-sm
          font-medium
        "
        >
          + Novo Pedido
        </button>
      </div>

      {/* MODAL */}
      <PedidoModal
        isOpen={mostrarForm}
        pedido={pedidoSelecionado}
        onClose={handleCancelar}
        onSubmit={handleSubmit}
      />

      {/* Tabela */}
      {!loading && !error && (
        <PedidoTable
          pedidos={pedidosFiltrados}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canManage={canManage}
        />
      )}
    </div>
  );
}
