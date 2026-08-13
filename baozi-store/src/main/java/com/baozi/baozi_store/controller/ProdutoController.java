package com.baozi.baozi_store.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.baozi.baozi_store.dto.produto.*;
import com.baozi.baozi_store.service.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponse>> getAllProdutos() {

        return ResponseEntity.ok(
                produtoService.getAllProdutos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponse> getProdutoById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                produtoService.getProdutoById(id));
    }

    @PostMapping
    public ResponseEntity<ProdutoResponse> createProduto(
            @RequestBody ProdutoRequest request) {

        ProdutoResponse response = produtoService.createProduto(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponse> updateProduto(
            @PathVariable Long id,
            @RequestBody ProdutoRequest request) {

        ProdutoResponse response = produtoService.updateProduto(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(
            @PathVariable Long id) {

        produtoService.deleteProduto(id);

        return ResponseEntity.noContent().build();
    }
}