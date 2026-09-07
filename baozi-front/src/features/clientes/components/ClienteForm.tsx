import { useState } from "react";
import "../../../components/Form/Form.css";
import type { Cliente, ClienteRequest } from "../types/Cliente";

interface ClienteFormProps {
  cliente?: Cliente;
  onSubmit: (data: ClienteRequest) => Promise<void>;
  onCancel: () => void;
}

export default function ClienteForm({ cliente, onSubmit, onCancel }: ClienteFormProps) {
  const [nome, setNome] = useState(cliente?.nome ?? "");

  const [clienteDesde, setClienteDesde] = useState(cliente?.clienteDesde ?? "");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        nome,
        clienteDesde,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nome">Nome *</label>

        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
          placeholder="Nome do cliente"
        />
      </div>

      <div className="form-group">
        <label htmlFor="clienteDesde">Cliente desde *</label>

        <input
          id="clienteDesde"
          type="date"
          value={clienteDesde}
          onChange={(event) => setClienteDesde(event.target.value)}
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
