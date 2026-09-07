import { Modal } from "../../../components/Modal/Modal";

import ProdutoForm from "./ProdutoForm";

import type { Produto, ProdutoRequest } from "../types/Produto";

interface ProdutoModalProps {
  isOpen: boolean;
  produto: Produto | null;
  onClose: () => void;
  onSubmit: (data: ProdutoRequest) => Promise<void>;
}

export function ProdutoModal({
  isOpen,
  produto,
  onClose,
  onSubmit,
}: ProdutoModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={produto ? "Editar Produto" : "Novo Produto"}
      onClose={onClose}
    >
      <ProdutoForm produto={produto} onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}
