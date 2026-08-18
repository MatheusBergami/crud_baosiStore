package com.baozi.baozi_store.config;

import com.baozi.baozi_store.model.Usuario;
import com.baozi.baozi_store.model.Role;
import com.baozi.baozi_store.repository.UsuarioRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsuario(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            Usuario usuario = usuarioRepository.findByEmail("admin@baozi.com")
                    .orElseGet(Usuario::new);

            if (usuario.getId() == null) {
                usuario.setEmail("admin@baozi.com");
                usuario.setSenha(passwordEncoder.encode("123456"));

                System.out.println(
                        "Usuário de teste criado: admin@baozi.com");
            }

            usuario.setRole(Role.ADMIN);
            usuarioRepository.save(usuario);
        };
    }
}
