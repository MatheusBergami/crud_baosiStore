package com.baozi.baozi_store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baozi.baozi_store.dto.produto.*;
import com.baozi.baozi_store.exception.ProdutoEmPedidoException;
import com.baozi.baozi_store.exception.ProdutoNotFoundException;
import com.baozi.baozi_store.model.Produto;
import com.baozi.baozi_store.repository.PedidoRepository;
import com.baozi.baozi_store.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final PedidoRepository pedidoRepository;

    public ProdutoService(ProdutoRepository produtoRepository, PedidoRepository pedidoRepository) {
        this.produtoRepository = produtoRepository;
        this.pedidoRepository = pedidoRepository;
    }

    public List<ProdutoResponse> getAllProdutos() {

        return produtoRepository.findAll()
                .stream()
                .map(ProdutoResponse::new)
                .toList();
    }

    public ProdutoResponse getProdutoById(Long id) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ProdutoNotFoundException(id));

        return new ProdutoResponse(produto);
    }

    public ProdutoResponse createProduto(
            ProdutoRequest request) {

        Produto produto = new Produto();

        produto.setNome(request.getNome());
        produto.setPreco(request.getPreco());

        Produto produtoSalvo = produtoRepository.save(produto);

        return new ProdutoResponse(produtoSalvo);
    }

    public ProdutoResponse updateProduto(
            Long id,
            ProdutoRequest request) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ProdutoNotFoundException(id));

        produto.setNome(request.getNome());
        produto.setPreco(request.getPreco());

        Produto produtoAtualizado = produtoRepository.save(produto);

        return new ProdutoResponse(produtoAtualizado);
    }

    public void deleteProduto(Long id) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ProdutoNotFoundException(id));

        if (pedidoRepository.existsByProdutoId(id)) {
            throw new ProdutoEmPedidoException(id);
        }

        produtoRepository.delete(produto);
    }
}