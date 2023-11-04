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
 * Classe responsável pela modelagem de dados e entidade no banco referente a
 * tabela servico
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */

@Entity
@SequenceGenerator(name = "servico_SEQ", sequenceName = "servico_seq", allocationSize = 1)
@Data
public class Servico {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nome", nullable = false, length = 50, columnDefinition = "VARCHAR(50)")
  private String nome;

  private LocalDateTime created_at;
  private LocalDateTime deleted_at;
  private LocalDateTime updated_at;

  @PrePersist
  protected void onCreate() {
    created_at = LocalDateTime.now();
  }
}
