import { Modal } from "../../../components/Modal/Modal";

import PedidoForm from "./PedidoForm";

import type {
  Pedido,
  PedidoRequest,
} from "../types/Pedido";

interface PedidoModalProps {
  isOpen: boolean;
  pedido?: Pedido | null;
  onClose: () => void;
  onSubmit: (data: PedidoRequest) => Promise<void>;
}

export function PedidoModal({
  isOpen,
  pedido,
  onClose,
  onSubmit,
}: PedidoModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={pedido ? "Editar Pedido" : "Novo Pedido"}
      onClose={onClose}
    >
      <PedidoForm
        pedido={pedido}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}