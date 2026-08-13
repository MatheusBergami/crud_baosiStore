package com.baozi.baozi_store.dto.produto;

import java.math.BigDecimal;

public class ProdutoRequest {

    private String nome;
    private BigDecimal preco;

    public ProdutoRequest() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }
}