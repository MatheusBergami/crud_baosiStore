package com.baozi.baozi_store.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.baozi.baozi_store.dto.pedido.*;
import com.baozi.baozi_store.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public ResponseEntity<List<PedidoResponse>> getAllPedidos() {

        return ResponseEntity.ok(
                pedidoService.getAllPedidos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> getPedidoById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                pedidoService.getPedidoById(id)
        );
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> createPedido(
            @RequestBody PedidoRequest request) {

        PedidoResponse response =
                pedidoService.createPedido(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoResponse> updatePedido(
            @PathVariable Long id,
            @RequestBody PedidoRequest request) {

        PedidoResponse response =
                pedidoService.updatePedido(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(
            @PathVariable Long id) {

        pedidoService.deletePedido(id);

        return ResponseEntity.noContent().build();
    }
}