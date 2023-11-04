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
 * tabela acesso
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Entity
@SequenceGenerator(name = "acesso_SEQ", sequenceName = "acesso_seq", allocationSize = 1)
@Data
public class Acesso {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "visualizar", nullable = false)
  private Boolean visualizar;

  @Column(name = "cadastrar", nullable = false)
  private Boolean cadastrar;

  @Column(name = "alterar", nullable = false)
  private Boolean alterar;

  @Column(name = "deletar", nullable = false)
  private Boolean deletar;

  @ManyToOne
  @JoinColumn(name = "modulo_id", nullable = false)
  private Modulo modulo;

  @ManyToOne
  @JoinColumn(name = "perfil_id", nullable = false)
  private Perfil perfil;

  private LocalDateTime created_at;
  private LocalDateTime deleted_at;
  private LocalDateTime updated_at;

  @PrePersist
  protected void onCreate() {
    created_at = LocalDateTime.now();
  }

}