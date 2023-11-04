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
 * tabela usuario
 * 
 * @author Felipe Borges
 * @version 1.0.0
 * @date 04-11-2023
 * @lastUpdate
 */
@Entity
@SequenceGenerator(name = "usuario_SEQ", sequenceName = "usuario_seq", allocationSize = 1)
@Data
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "senha", nullable = false, length = 100, columnDefinition = "VARCHAR(100)")
  private String senha;

  @Column(name = "nome", nullable = false, length = 100, columnDefinition = "VARCHAR(100)")
  private String nome;

  @Column(name = "email", nullable = false, length = 50, columnDefinition = "VARCHAR(50)")
  private String email;

  @ManyToOne
  @JoinColumn(name = "perfil_id", nullable = false)
  private Perfil perfil;

  @Column(name = "token", nullable = false, length = 36, columnDefinition = "VARCHAR(36)")
  private String token;

  @Column(name = "status", nullable = false)
  private Boolean status;

  private LocalDateTime created_at;
  private LocalDateTime deleted_at;
  private LocalDateTime updated_at;

  @PrePersist
  protected void onCreate() {
    created_at = LocalDateTime.now();
  }
}
