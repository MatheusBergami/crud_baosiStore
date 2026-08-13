package com.baozi.baozi_store.exception;

public class PedidoNotFoundException extends RuntimeException {

    public PedidoNotFoundException(Long id) {
        super("Pedido não encontrado: " + id);
    }
}