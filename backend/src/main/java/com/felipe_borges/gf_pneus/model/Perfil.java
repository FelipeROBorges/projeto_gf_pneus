package com.felipe_borges.gf_pneus.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

/**
 * Classe responsavel pela modelagem de dados e entidade no banco referente a
 * tabela perfil
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Entity
@SequenceGenerator(name = "perfil_SEQ", sequenceName = "perfil_seq", allocationSize = 1)
@Data
public class Perfil {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nome", nullable = false, length = 30, columnDefinition = "VARCHAR(30)")
  private String nome;

  @Column(name = "descricao", nullable = false, length = 255, columnDefinition = "VARCHAR(255)")
  private String descricao;

  private LocalDateTime created_at;
  private LocalDateTime deleted_at;
  private LocalDateTime updated_at;

  @PrePersist
  protected void onCreate() {
    created_at = LocalDateTime.now();
  }

}