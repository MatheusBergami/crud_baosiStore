package com.baozi.baozi_store.exception;

public class ProdutoNotFoundException extends RuntimeException {

    public ProdutoNotFoundException(Long id) {
        super("Produto não encontrado: " + id);
    }
}