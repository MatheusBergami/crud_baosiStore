package com.baozi.baozi_store.dto.cliente;

import java.time.LocalDate;

import com.baozi.baozi_store.model.Cliente;

public class ClienteResponse {

    private Long id;
    private String nome;
    private LocalDate clienteDesde;

    public ClienteResponse() {
    }

    public ClienteResponse(
            Long id,
            String nome,
            LocalDate clienteDesde) {

        this.id = id;
        this.nome = nome;
        this.clienteDesde = clienteDesde;
    }

    public ClienteResponse(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.clienteDesde = cliente.getClienteDesde();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public LocalDate getClienteDesde() {
        return clienteDesde;
    }
}