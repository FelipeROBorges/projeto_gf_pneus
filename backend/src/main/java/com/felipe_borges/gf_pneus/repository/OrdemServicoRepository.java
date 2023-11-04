package com.felipe_borges.gf_pneus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.felipe_borges.gf_pneus.model.OrdemServico;

/**
 * Classe responsável por intermediar a comunicação entre banco de dados e
 * aplicação referente a tabela ordem_servico
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {

  @Query("SELECT os FROM OrdemServico os WHERE os.id = :id and os.deleted_at IS NULL")
  OrdemServico findByIdNonDeleted(@Param("id") Long id);

  @Query("SELECT os FROM OrdemServico os WHERE os.deleted_at IS NULL")
  List<OrdemServico> findAllNonDeleted();

  @Query("SELECT os FROM OrdemServico os WHERE os.status = :status and os.deleted_at IS NULL")
  List<OrdemServico> findByStatusAllNonDeleted(@Param("status") Boolean status);
}
