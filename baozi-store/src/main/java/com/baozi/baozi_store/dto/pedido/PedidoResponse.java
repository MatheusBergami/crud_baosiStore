package com.baozi.baozi_store.dto.pedido;

import com.baozi.baozi_store.model.Pedido;

public class PedidoResponse {

    private Long id;

    private Long clienteId;
    private String clienteNome;

    private Long produtoId;
    private String produtoNome;

    private Integer quantidade;

    public PedidoResponse() {
    }

    public PedidoResponse(Pedido pedido) {

        this.id = pedido.getId();

        this.clienteId = pedido.getCliente().getId();
        this.clienteNome = pedido.getCliente().getNome();

        this.produtoId = pedido.getProduto().getId();
        this.produtoNome = pedido.getProduto().getNome();

        this.quantidade = pedido.getQuantidade();
    }

    public Long getId() {
        return id;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public Long getProdutoId() {
        return produtoId;
    }

    public String getProdutoNome() {
        return produtoNome;
    }

    public Integer getQuantidade() {
        return quantidade;
    }
}