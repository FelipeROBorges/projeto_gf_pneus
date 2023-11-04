package com.felipe_borges.gf_pneus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.felipe_borges.gf_pneus.model.Perfil;

/**
 * Classe responsavel por intermidiar a comunicação entre banco de dados e
 * aplicação referente a tabela perfil
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
public interface PerfilRepository extends JpaRepository<Perfil, Long> {
  @Query("SELECT p FROM Perfil p WHERE p.nome = :nome and p.deleted_at IS NULL")
  Perfil findByNome(@Param("nome") String nome);

  @Query("SELECT p FROM Perfil p WHERE p.id = :id and p.deleted_at IS NULL")
  Perfil findByIdNonDeleted(@Param("id") Long id);

  @Query("SELECT p FROM Perfil p WHERE p.deleted_at IS NULL")
  List<Perfil> findAllNonDeleted();

}
