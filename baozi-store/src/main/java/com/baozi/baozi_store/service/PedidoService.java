package com.baozi.baozi_store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baozi.baozi_store.dto.pedido.*;
import com.baozi.baozi_store.exception.ClienteNotFoundException;
import com.baozi.baozi_store.exception.PedidoNotFoundException;
import com.baozi.baozi_store.exception.ProdutoNotFoundException;
import com.baozi.baozi_store.model.Cliente;
import com.baozi.baozi_store.model.Pedido;
import com.baozi.baozi_store.model.Produto;
import com.baozi.baozi_store.repository.ClienteRepository;
import com.baozi.baozi_store.repository.PedidoRepository;
import com.baozi.baozi_store.repository.ProdutoRepository;

@Service
public class PedidoService {

        private final PedidoRepository pedidoRepository;
        private final ClienteRepository clienteRepository;
        private final ProdutoRepository produtoRepository;

        public PedidoService(
                        PedidoRepository pedidoRepository,
                        ClienteRepository clienteRepository,
                        ProdutoRepository produtoRepository) {

                this.pedidoRepository = pedidoRepository;
                this.clienteRepository = clienteRepository;
                this.produtoRepository = produtoRepository;
        }

        public List<PedidoResponse> getAllPedidos() {

                return pedidoRepository.findAll()
                                .stream()
                                .map(PedidoResponse::new)
                                .toList();
        }

        public PedidoResponse getPedidoById(Long id) {

                Pedido pedido = pedidoRepository.findById(id)
                                .orElseThrow(() -> new PedidoNotFoundException(id));

                return new PedidoResponse(pedido);
        }

        public PedidoResponse createPedido(
                        PedidoRequest request) {

                Cliente cliente = clienteRepository
                                .findById(request.getClienteId())
                                .orElseThrow(() -> new ClienteNotFoundException(request.getClienteId()));

                Produto produto = produtoRepository
                                .findById(request.getProdutoId())
                                .orElseThrow(() -> new ProdutoNotFoundException(request.getProdutoId()  ));

                Pedido pedido = new Pedido();

                pedido.setCliente(cliente);
                pedido.setProduto(produto);
                pedido.setQuantidade(request.getQuantidade());

                Pedido pedidoSalvo = pedidoRepository.save(pedido);

                return new PedidoResponse(pedidoSalvo);
        }

        public PedidoResponse updatePedido(
                        Long id,
                        PedidoRequest request) {

                Pedido pedido = pedidoRepository.findById(id)
                                .orElseThrow(() -> new PedidoNotFoundException(id));

                Cliente cliente = clienteRepository
                                .findById(request.getClienteId())
                                .orElseThrow(() -> new ClienteNotFoundException(request.getClienteId()));

                Produto produto = produtoRepository
                                .findById(request.getProdutoId())
                                .orElseThrow(() -> new ProdutoNotFoundException(request.getProdutoId()));

                pedido.setCliente(cliente);
                pedido.setProduto(produto);
                pedido.setQuantidade(request.getQuantidade());

                Pedido pedidoAtualizado = pedidoRepository.save(pedido);

                return new PedidoResponse(pedidoAtualizado);
        }

        public void deletePedido(Long id) {

                Pedido pedido = pedidoRepository.findById(id)
                                .orElseThrow(() -> new PedidoNotFoundException(id));

                pedidoRepository.delete(pedido);
        }
}