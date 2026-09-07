import { useEffect, useState } from "react";

import type { Produto, ProdutoRequest } from "../types/Produto";
import { ProdutoModal } from "../components/ProdutoModal";

import {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from "../api/produtoApi";

import ProdutoTable from "../components/ProdutoTable";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null,
  );

  const [mostrarForm, setMostrarForm] = useState(false);

  const [busca, setBusca] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  async function carregarProdutos() {
    try {
      setLoading(true);
      setError(null);

      const data = await getProdutos();

      setProdutos(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao carregar produtos.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleSubmit(data: ProdutoRequest) {
    try {
      if (produtoSelecionado) {
        const produtoAtualizado = await updateProduto(
          produtoSelecionado.id,
          data,
        );

        setProdutos((produtosAtuais) =>
          produtosAtuais.map((produto) =>
            produto.id === produtoAtualizado.id ? produtoAtualizado : produto,
          ),
        );
      } else {
        const novoProduto = await createProduto(data);

        setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);
      }

      setProdutoSelecionado(null);
      setMostrarForm(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao salvar produto.");

      throw error;
    }
  }

  function handleEdit(produto: Produto) {
    setProdutoSelecionado(produto);
    setMostrarForm(true);
  }

  async function handleDelete(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?",
    );

    if (!confirmar) {
      return;
    }

    try {
      await deleteProduto(id);

      setProdutos((produtosAtuais) =>
        produtosAtuais.filter((produto) => produto.id !== id),
      );
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Erro ao excluir produto.",
      );
    }
  }

  function handleNovoProduto() {
    setProdutoSelecionado(null);
    setMostrarForm(true);
  }

  function handleCancelar() {
    setProdutoSelecionado(null);
    setMostrarForm(false);
  }

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <input
            type="text"
            placeholder="Pesquisar produtos..."
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
        </div>

        <button
          onClick={handleNovoProduto}
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
          + Novo Produto
        </button>
      </div>

      {/* Modal */}
      <ProdutoModal
        isOpen={mostrarForm}
        produto={produtoSelecionado}
        onClose={handleCancelar}
        onSubmit={handleSubmit}
      />

      {loading && (
        <div className="text-center py-8 text-gray-500">
          Carregando produtos...
        </div>
      )}

      {error && !loading && (
        <div
          className="
        bg-red-50
        border border-red-200
        text-red-700
        rounded-lg
        px-4 py-3
      "
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        <ProdutoTable
          produtos={produtosFiltrados}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
