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
 * tabela modulo
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Entity
@SequenceGenerator(name = "modulo_SEQ", sequenceName = "modulo_seq", allocationSize = 1)
@Data
public class Modulo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nome", nullable = false, length = 100, columnDefinition = "VARCHAR(100)")
  private String nome;

  @Column(name = "sigla", nullable = false, length = 10, columnDefinition = "VARCHAR(10)")
  private String sigla;

  private LocalDateTime created_at;
  private LocalDateTime deleted_at;
  private LocalDateTime updated_at;

  @PrePersist
  protected void onCreate() {
    created_at = LocalDateTime.now();
  }

}