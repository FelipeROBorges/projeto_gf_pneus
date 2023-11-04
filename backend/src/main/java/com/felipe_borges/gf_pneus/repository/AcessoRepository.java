package com.felipe_borges.gf_pneus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.felipe_borges.gf_pneus.model.Acesso;

/**
 * Classe responsavel por intermidiar a comunicação entre banco de dados e
 * aplicação referente a tabela acesso
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
public interface AcessoRepository extends JpaRepository<Acesso, Long> {
  @Query("SELECT a FROM Acesso a WHERE a.id = :id and a.deleted_at IS NULL")
  Acesso findByIdNonDeleted(@Param("id") Long id);

  @Query("SELECT a FROM Acesso a WHERE a.deleted_at IS NULL")
  List<Acesso> findAllNonDeleted();

  @Query("SELECT a FROM Acesso a WHERE a.perfil.id = :perfil_id and a.deleted_at IS NULL")
  List<Acesso> findByPerfilNonDeleted(@Param("perfil_id") Long perfil_id);

  @Query("SELECT a FROM Acesso a WHERE a.perfil.id = :perfil_id and a.modulo.id = :modulo_id and a.deleted_at IS NULL")
  Acesso findByPerfilAndModuloNonDeleted(@Param("perfil_id") Long perfil_id, @Param("modulo_id") Long modulo_id);
}
