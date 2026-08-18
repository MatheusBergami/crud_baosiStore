package com.baozi.baozi_store.dto.produto;

import java.math.BigDecimal;

import com.baozi.baozi_store.model.Produto;

public class ProdutoResponse {

    private Long id;
    private String nome;
    private BigDecimal preco;

    public ProdutoResponse() {
    }

    public ProdutoResponse(Long id, String nome, BigDecimal preco) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }

    public ProdutoResponse(Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.preco = produto.getPreco();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }
}