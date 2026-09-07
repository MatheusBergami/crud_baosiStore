import type { Pedido } from "../types/Pedido";

interface PedidoTableProps {
  pedidos: Pedido[];
  onEdit: (pedido: Pedido) => void;
  onDelete: (id: number) => void | Promise<void>;
  canManage: boolean;
}

export default function PedidoTable({
  pedidos,
  onEdit,
  onDelete,
  canManage,
}: PedidoTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 font-medium">ID</th>
            <th className="px-6 py-3 font-medium">Cliente</th>
            <th className="px-6 py-3 font-medium">Produto</th>
            <th className="px-6 py-3 font-medium">Quantidade</th>
            {canManage && <th className="px-6 py-3 font-medium">Ações</th>}
          </tr>
        </thead>

        <tbody>
          {pedidos.map((pedido) => (
            <tr
              key={pedido.id}
              className="border-b border-gray-50 hover:bg-gray-50"
            >
              <td className="px-6 py-3 text-gray-500">#{pedido.id}</td>

              <td className="px-6 py-3 font-medium text-gray-900">
                {pedido.clienteNome}
              </td>

              <td className="px-6 py-3 text-gray-600">{pedido.produtoNome}</td>

              <td className="px-6 py-3 text-gray-600">{pedido.quantidade}</td>

              {canManage && <td className="px-6 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(pedido)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(pedido.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Excluir
                  </button>
                </div>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>

      {pedidos.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          Nenhum pedido encontrado.
        </p>
      )}
    </div>
  );
}
