import { useEffect, useState } from "react";

import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../api/clienteApi";

import type { Cliente, ClienteRequest } from "../types/Cliente";

import ClienteForm from "../components/ClienteForm";
import ClienteTable from "../components/ClienteTable";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null,
  );

  const [modalAberto, setModalAberto] = useState(false);

  const [busca, setBusca] = useState("");

  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    try {
      setLoading(true);
      setErro("");

      const data = await getClientes();

      setClientes(data);
    } catch (error) {
      console.error(error);

      setErro("Não foi possível carregar os clientes.");
    } finally {
      setLoading(false);
    }
  }

  function abrirNovoCliente() {
    setClienteSelecionado(null);
    setModalAberto(true);
  }

  function abrirEditarCliente(cliente: Cliente) {
    setClienteSelecionado(cliente);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setClienteSelecionado(null);
  }

  async function salvarCliente(data: ClienteRequest) {
    if (clienteSelecionado) {
      await updateCliente(clienteSelecionado.id, data);
    } else {
      await createCliente(data);
    }

    fecharModal();

    await carregarClientes();
  }

  async function excluirCliente(cliente: Cliente) {
    const confirmar = window.confirm(
      `Deseja realmente excluir o cliente "${cliente.nome}"?`,
    );

    if (!confirmar) {
      return;
    }

    try {
      await deleteCliente(cliente.id);

      await carregarClientes();
    } catch (error) {
      console.error(error);

      setErro("Não foi possível excluir o cliente.");
    }
  }

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div>
      {/* Cabeçalho da página */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <input
            type="text"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Pesquisar clientes..."
            className="pl-4 pr-4 py-2 border border-gray-200
                       rounded-lg text-sm w-64
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={abrirNovoCliente}
          className="bg-blue-600 hover:bg-blue-700
                     text-white px-4 py-2 rounded-lg
                     text-sm font-medium transition-colors"
        >
          + Novo Cliente
        </button>
      </div>

      {/* Erro */}
      {erro && (
        <div
          className="mb-4 bg-red-50 border border-red-200
                        text-red-700 rounded-lg px-4 py-3 text-sm"
        >
          {erro}
        </div>
      )}

      {/* Tabela */}
      <div
        className="bg-white rounded-xl shadow-sm
                      border border-gray-100 overflow-hidden"
      >
        {loading ? (
          <div className="text-gray-500 text-center py-8">
            Carregando clientes...
          </div>
        ) : (
          <ClienteTable
            clientes={clientesFiltrados}
            onEdit={abrirEditarCliente}
            onDelete={excluirCliente}
          />
        )}
      </div>

      {/* Modal */}
      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center
                     justify-center p-4 bg-black/40"
        >
          <div
            className="bg-white rounded-xl shadow-xl
                       w-full max-w-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">
              {clienteSelecionado ? "Editar Cliente" : "Novo Cliente"}
            </h3>

            <ClienteForm
              cliente={clienteSelecionado ?? undefined}
              onSubmit={salvarCliente}
              onCancel={fecharModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
