import { useEffect, useState } from "react";

import { getClientes } from "../clientes/api/clienteApi";
import { getProdutos } from "../produtos/api/produtoApi";
import { getPedidos } from "../pedidos/api/pedidoApi";

import type { Cliente } from "../clientes/types/Cliente";
import type { Produto } from "../produtos/types/Produto";
import type { Pedido } from "../pedidos/types/Pedido";

export default function DashboardPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [clientesData, produtosData, pedidosData] = await Promise.all([
          getClientes(),
          getProdutos(),
          getPedidos(),
        ]);

        setClientes(clientesData);
        setProdutos(produtosData);
        setPedidos(pedidosData);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const valorTotal = pedidos.reduce((total, pedido) => {
    const produto = produtos.find((produto) => produto.id === pedido.produtoId);

    if (!produto) {
      return total;
    }

    return total + produto.preco * pedido.quantidade;
  }, 0);

  const pedidosRecentes = [...pedidos].reverse().slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Clientes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total de Clientes</p>

              <p className="text-2xl font-bold text-gray-900">
                {clientes.length}
              </p>
            </div>

            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">👥</span>
            </div>
          </div>
        </div>

        {/* Produtos */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total de Produtos</p>

              <p className="text-2xl font-bold text-gray-900">
                {produtos.length}
              </p>
            </div>

            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-lg">📦</span>
            </div>
          </div>
        </div>

        {/* Pedidos */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total de Pedidos</p>

              <p className="text-2xl font-bold text-gray-900">
                {pedidos.length}
              </p>
            </div>

            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg">🛒</span>
            </div>
          </div>
        </div>

        {/* Valor */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Valor Total</p>

              <p className="text-2xl font-bold text-gray-900">
                {valorTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <span className="text-amber-600 text-lg">R$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pedidos recentes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">
          Pedidos Recentes
        </h3>

        {pedidosRecentes.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            Nenhum pedido registrado.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">ID</th>

                  <th className="pb-3 font-medium">Cliente</th>

                  <th className="pb-3 font-medium">Produto</th>

                  <th className="pb-3 font-medium">Quantidade</th>

                  <th className="pb-3 font-medium">Total</th>
                </tr>
              </thead>

              <tbody>
                {pedidosRecentes.map((pedido) => {
                  const produto = produtos.find(
                    (produto) => produto.id === pedido.produtoId,
                  );

                  const total = produto ? produto.preco * pedido.quantidade : 0;

                  return (
                    <tr key={pedido.id} className="border-b border-gray-50">
                      <td className="py-3 text-gray-500">#{pedido.id}</td>

                      <td className="py-3 font-medium text-gray-900">
                        {pedido.clienteNome}
                      </td>

                      <td className="py-3 text-gray-600">
                        {pedido.produtoNome}
                      </td>

                      <td className="py-3 text-gray-600">
                        {pedido.quantidade}
                      </td>

                      <td className="py-3 text-gray-600">
                        {total.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
