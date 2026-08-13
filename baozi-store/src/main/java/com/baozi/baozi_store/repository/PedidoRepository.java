package com.baozi.baozi_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baozi.baozi_store.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    boolean existsByProdutoId(Long produtoId);
}
