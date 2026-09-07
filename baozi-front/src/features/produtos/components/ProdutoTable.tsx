import type { Produto } from "../types/Produto";

interface ProdutoTableProps {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onDelete: (id: number) => void | Promise<void>;
}

export default function ProdutoTable({
  produtos,
  onEdit,
  onDelete,
}: ProdutoTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 font-medium">ID</th>
            <th className="px-6 py-3 font-medium">Nome</th>
            <th className="px-6 py-3 font-medium">Preço</th>
            <th className="px-6 py-3 font-medium">Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto) => (
            <tr
              key={produto.id}
              className="border-b border-gray-50 hover:bg-gray-50"
            >
              <td className="px-6 py-3 text-gray-500">
                #{produto.id}
              </td>

              <td className="px-6 py-3 font-medium text-gray-900">
                {produto.nome}
              </td>

              <td className="px-6 py-3 text-gray-600">
                R$ {produto.preco.toFixed(2).replace(".", ",")}
              </td>

              <td className="px-6 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(produto)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(produto.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {produtos.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          Nenhum produto encontrado.
        </p>
      )}
    </div>
  );
}