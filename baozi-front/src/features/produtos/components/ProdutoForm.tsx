import { useState } from "react";

import type { Produto, ProdutoRequest } from "../types/Produto";

import "../../../components/Form/Form.css";

interface ProdutoFormProps {
  produto: Produto | null;
  onSubmit: (data: ProdutoRequest) => Promise<void>;
  onCancel: () => void;
}

export default function ProdutoForm({ produto, onSubmit, onCancel }: ProdutoFormProps) {
  const [nome, setNome] = useState(produto?.nome ?? "");

  const [preco, setPreco] = useState(produto?.preco?.toString() ?? "");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        nome,
        preco: Number(preco),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="produto-nome">Nome *</label>

        <input
          id="produto-nome"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Nome do produto"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="produto-preco">Preço *</label>

        <input
          id="produto-preco"
          type="number"
          step="0.01"
          min="0"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
          placeholder="0,00"
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

        <button type="submit" disabled={loading} className="button-primary">
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
