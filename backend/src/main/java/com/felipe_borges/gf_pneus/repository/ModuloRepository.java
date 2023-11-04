package com.felipe_borges.gf_pneus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.felipe_borges.gf_pneus.model.Modulo;

/**
 * Classe responsavel por intermidiar a comunicação entre banco de dados e
 * aplicação referente a tabela modulo
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
public interface ModuloRepository extends JpaRepository<Modulo, Long> {
  @Query("SELECT m FROM Modulo m WHERE m.id = :id and m.deleted_at IS NULL")
  Modulo findByIdNonDeleted(@Param("id") Long id);

  @Query("SELECT m FROM Modulo m WHERE m.sigla = :sigla and m.deleted_at IS NULL")
  Modulo findBySiglaNonDeleted(@Param("sigla") String sigla);

  @Query("SELECT m FROM Modulo m WHERE m.deleted_at IS NULL")
  List<Modulo> findAllNonDeleted();
}
