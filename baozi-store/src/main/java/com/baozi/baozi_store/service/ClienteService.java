package com.baozi.baozi_store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baozi.baozi_store.dto.cliente.*;
import com.baozi.baozi_store.exception.ClienteNotFoundException;
import com.baozi.baozi_store.model.Cliente;
import com.baozi.baozi_store.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<ClienteResponse> getAllClientes() {

        return clienteRepository.findAll()
                .stream()
                .map(ClienteResponse::new)
                .toList();
    }

    public ClienteResponse getClienteById(Long id) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        return new ClienteResponse(cliente);
    }

    public ClienteResponse createCliente(
            ClienteRequest request) {

        Cliente cliente = new Cliente();

        cliente.setNome(request.getNome());
        cliente.setClienteDesde(request.getClienteDesde());

        Cliente clienteSalvo = clienteRepository.save(cliente);

        return new ClienteResponse(clienteSalvo);
    }

    public ClienteResponse updateCliente(
            Long id,
            ClienteRequest request) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ClienteNotFoundException(id));

        cliente.setNome(request.getNome());
        cliente.setClienteDesde(request.getClienteDesde());

        Cliente clienteAtualizado = clienteRepository.save(cliente);

        return new ClienteResponse(clienteAtualizado);
    }

    public void deleteCliente(Long id) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ClienteNotFoundException(id));

        clienteRepository.delete(cliente);
    }
}