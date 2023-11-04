package com.felipe_borges.gf_pneus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.felipe_borges.gf_pneus.model.Servico;

/**
 * Classe responsável por intermediar a comunicação entre banco de dados e
 * aplicação referente a tabela servico
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */

public interface ServicoRepository extends JpaRepository<Servico, Long> {

  @Query("SELECT s FROM Servico s WHERE s.deleted_at IS NULL")
  List<Servico> findAllNonDeleted();

  @Query("SELECT s FROM Servico s WHERE s.id = :id and s.deleted_at IS NULL")
  Servico findByIdNonDeleted(@Param("id") Long id);

  @Query("SELECT s FROM Servico s WHERE s.nome = :nome and s.deleted_at IS NULL")
  Servico findByNomeNonDeleted(@Param("nome") String nome);
}
