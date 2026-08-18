package com.baozi.baozi_store.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.baozi.baozi_store.dto.cliente.*;
import com.baozi.baozi_store.service.ClienteService;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponse>> getAllClientes() {

        return ResponseEntity.ok(
                clienteService.getAllClientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> getClienteById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                clienteService.getClienteById(id));
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> createCliente(
            @RequestBody ClienteRequest request) {

        ClienteResponse response = clienteService.createCliente(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> updateCliente(
            @PathVariable Long id,
            @RequestBody ClienteRequest request) {

        ClienteResponse response = clienteService.updateCliente(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(
            @PathVariable Long id) {

        clienteService.deleteCliente(id);

        return ResponseEntity.noContent().build();
    }
}