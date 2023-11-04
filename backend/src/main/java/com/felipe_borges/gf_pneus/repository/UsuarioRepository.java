package com.felipe_borges.gf_pneus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.felipe_borges.gf_pneus.model.Usuario;

/**
 * Classe responsavel por intermidiar a comunicação entre banco de dados e
 * aplicação referente a tabela usuario
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  @Query("SELECT u FROM Usuario u WHERE u.deleted_at IS NULL")
  List<Usuario> findAllNonDeleted();

  @Query("SELECT u FROM Usuario u WHERE u.id = :id and u.deleted_at IS NULL")
  Usuario findByIdNonDeleted(@Param("id") Long id);

  @Query("SELECT u FROM Usuario u WHERE u.id = :id and u.status = TRUE")
  Usuario findByIdNonInactive(@Param("id") Long id);

  @Query("SELECT u FROM Usuario u WHERE u.token = :token and u.status = TRUE")
  Usuario findByTokenNonInactive(@Param("token") String token);

  @Query("SELECT u FROM Usuario u WHERE u.email = :email and u.status = TRUE and u.deleted_at IS NULL")
  Usuario findByEmailNonDeleted(@Param("email") String email);

}
