import type { Produto } from "../types/Produto";

interface ProdutoCardProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (id: number) => void;
}

export function ProdutoCard({ produto, onEdit, onDelete }: ProdutoCardProps) {
  const preco = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(produto.preco);

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <span className="text-sm text-gray-500">Produto #{produto.id}</span>

        <h2 className="mt-1 text-xl font-semibold text-gray-900">
          {produto.nome}
        </h2>

        <p className="mt-2 text-lg font-medium text-gray-700">{preco}</p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(produto)}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onDelete(produto.id)}
          className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
