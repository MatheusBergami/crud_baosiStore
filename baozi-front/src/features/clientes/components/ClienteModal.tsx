import { Modal } from "../../../components/Modal/Modal";

import  ClienteForm  from "./ClienteForm";

import type {
  Cliente,
  ClienteRequest,
} from "../types/Cliente";

interface ClienteModalProps {
  isOpen: boolean;
  cliente?: Cliente;
  onClose: () => void;
  onSubmit: (data: ClienteRequest) => Promise<void>;
}

export function ClienteModal({
  isOpen,
  cliente,
  onClose,
  onSubmit,
}: ClienteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={cliente ? "Editar Cliente" : "Novo Cliente"}
      onClose={onClose}
    >
      <ClienteForm
        cliente={cliente}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}