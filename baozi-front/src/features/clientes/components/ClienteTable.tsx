import type { Cliente } from "../types/Cliente";

interface ClienteTableProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
}

export default function ClienteTable({
  clientes,
  onEdit,
  onDelete,
}: ClienteTableProps) {
  if (clientes.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        Nenhum cliente encontrado.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 font-medium">ID</th>

            <th className="px-6 py-3 font-medium">Nome</th>

            <th className="px-6 py-3 font-medium">Cliente desde</th>

            <th className="px-6 py-3 font-medium">Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente) => (
            <tr
              key={cliente.id}
              className="border-b border-gray-50 hover:bg-gray-50"
            >
              <td className="px-6 py-3 text-gray-500">#{cliente.id}</td>

              <td className="px-6 py-3 font-medium text-gray-900">
                {cliente.nome}
              </td>

              <td className="px-6 py-3 text-gray-600">
                {new Date(
                  cliente.clienteDesde + "T00:00:00",
                ).toLocaleDateString("pt-BR")}
              </td>

              <td className="px-6 py-3">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(cliente)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Editar cliente"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(cliente)}
                    className="text-red-500 hover:text-red-700"
                    title="Excluir cliente"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
