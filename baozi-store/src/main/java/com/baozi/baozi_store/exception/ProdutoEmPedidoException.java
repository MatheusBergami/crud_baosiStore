package com.baozi.baozi_store.exception;

public class ProdutoEmPedidoException extends RuntimeException {

    public ProdutoEmPedidoException(Long id) {
        super(
            "Não é possível excluir o produto " +
            id +
            " porque ele está associado a um ou mais pedidos."
        );
    }
}