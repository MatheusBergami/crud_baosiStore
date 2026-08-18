package com.baozi.baozi_store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.baozi.baozi_store.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);
}