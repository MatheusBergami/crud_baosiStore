package com.baozi.baozi_store.dto.cliente;

import java.time.LocalDate;

public class ClienteRequest {

    private String nome;
    private LocalDate clienteDesde;

    public ClienteRequest() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getClienteDesde() {
        return clienteDesde;
    }

    public void setClienteDesde(LocalDate clienteDesde) {
        this.clienteDesde = clienteDesde;
    }
}