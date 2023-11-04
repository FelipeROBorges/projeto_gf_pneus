package com.felipe_borges.gf_pneus.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

/**
 * Classe responsavel pela modelagem de dados e entidade no banco referente a
 * tabela ordem_servico
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Entity
@SequenceGenerator(name = "ordem_servico_SEQ", sequenceName = "ordem_servico_seq", allocationSize = 1)
@Data
public class OrdemServico {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "status", nullable = false)
  private Boolean status;

  @Column(name = "placa", nullable = false, length = 25, columnDefinition = "VARCHAR(25)")
  private String placa;

  @Column(name = "modelo", nullable = false, length = 50, columnDefinition = "VARCHAR(50)")
  private String modelo;

  @ManyToOne
  @JoinColumn(name = "servico_id", nullable = false)
  private Servico servico;

  private LocalDateTime created_at;
  private LocalDateTime deleted_at;
  private LocalDateTime updated_at;

  @PrePersist
  protected void onCreate() {
    created_at = LocalDateTime.now();
  }
}
